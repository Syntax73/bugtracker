<template>
  <div>
    <MessageSnackBar />
    <v-card>
      <v-card-title>
        <span class="headline">Atualizar Perfil</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-file-input
            v-if="user.id == null"
            v-model="user.avatar"
            label="Avatar"
            :rules="avatarRuler"
            show-size
            required
          ></v-file-input>
          <v-text-field
            v-model="user.name"
            :counter="60"
            :rules="nameRules"
            label="Nome"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-if="user.id == null"
            type="password"
            v-model="user.password"
            :rules="passwordRules"
            label="Senha"
            required
          ></v-text-field>
          <v-text-field
            v-if="user.id == null"
            type="password"
            v-model="user.confirmPassword"
            :rules="passwordRules.concat(passwordMatch)"
            label="Repita a Senha"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="!valid" color="success" @click="update">Editar</v-btn>
        <v-btn color="error" class="mr-4" @click="reset">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import MessageSnackBar from '../material/MessageSnackBar';

export default {
  name: 'EditUsers',
  components: { MessageSnackBar },
  data: () => ({
    valid: true,
    avatarRuler: [(v) => !!v || 'Avatar é obrigatorio'],
    nameRules: [
      (v) => !!v || 'Nome é obrigatorio',
      (v) => (v && v.length <= 60) || 'Nome deve ter menos que 60 catacteres'
    ],
    emailRules: [
      (v) => !!v || 'E-mail é obrigatorio',
      (v) => /.+@.+\..+/.test(v) || 'E-mail invalido'
    ],
    passwordRules: [
      (v) => !!v || 'Senha é obrigatoria',
      (v) => (v && v.length >= 8) || 'Senha deve ter no minimo 8 catacteres'
    ]
  }),
  methods: {
    ...mapActions('user', ['updateUser', 'showUser']),
    ...mapMutations('user', ['setUser']),

    async update() {
      await this.updateUser(this.user);
      this.$refs.form.reset();
      this.$router.go(-1);
    },
    reset() {
      this.setUser({});
      this.$refs.form.reset();
      this.$router.go(-1);
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user
    }),
    ...mapGetters('auth', ['currentUser']),
    passwordMatch() {
      return () => this.user.password === this.user.confirmPassword || 'Senhas não combinam';
    }
  },
  mounted() {
    this.showUser(this.currentUser.id);
  }
};
</script>

<style></style>
