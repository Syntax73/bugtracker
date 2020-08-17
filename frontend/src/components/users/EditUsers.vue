<template>
  <div>
    <MessageSnackBar />
    <v-card>
      <v-card-title>
        <span class="headline">Cadastrar Usuarios</span>
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
          <v-select
            v-model="user.role"
            :items="items"
            :rules="[(v) => !!v || 'Papel do Usuario é Obrigratorio']"
            label="Papel do Usuario"
            required
          ></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="user.id" :disabled="!valid" color="success" @click="update">Editar</v-btn>
        <v-btn v-else :disabled="!valid" color="success" @click="submit">Cadastrar</v-btn>
        <v-btn color="error" class="mr-4" @click="reset">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
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
    ],
    items: [
      { text: 'Admin', value: 'admin' },
      { text: 'Developer', value: 'developer' },
      { text: 'Lider de Teste', value: 'test_lead' },
      { text: 'Lider de Projeto', value: 'project_lead' }
    ]
  }),
  methods: {
    ...mapActions('user', ['createUser', 'updateUser']),
    ...mapActions('app', ['toggleSnackbar']),
    ...mapMutations('user', ['setUser']),

    async submit() {
      try {
        await this.createUser(this.user);
        this.$refs.form.reset();
        this.$router.go(-1);
      } catch (err) {
        this.toggleSnackbar({
          message: err,
          alertType: 'warning'
        });
      }
    },
    async update() {
      try {
        await this.updateUser(this.user);
        this.$refs.form.reset();
        this.$router.go(-1);
      } catch (err) {
        this.toggleSnackbar({
          message: err,
          alertType: 'warning'
        });
      }
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
    passwordMatch() {
      return () => this.user.password === this.user.confirmPassword || 'Senhas não combinam';
    }
  }
};
</script>

<style></style>
