<template>
  <v-dialog v-model="dialog" persistent>
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on" @click="userDialog(true)">Novo Usuario</v-btn>
    </template>
    <v-card>
      <v-card-title>Cadastrar Usuarios</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-file-input v-model="user.avatar" label="Avatar" show-size></v-file-input>
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
            type="password"
            v-model="user.password"
            label="Senha"
            required
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="user.confirmPassword"
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
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="createUser(user)"
          >Cadastrar</v-btn
        >
        <v-btn color="error" class="mr-4" @click="reset">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'EditUsers',
  data: () => ({
    valid: true,
    nameRules: [
      (v) => !!v || 'Nome é obrigatorio',
      (v) => (v && v.length <= 60) || 'Name must be less than 60 characters'
    ],
    emailRules: [
      (v) => !!v || 'E-mail é obrigatorio',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    items: [
      { text: 'Admin', value: 'admin' },
      { text: 'Developer', value: 'developer' },
      { text: 'Lider de Teste', value: 'test_lead' },
      { text: 'Lider de Projeto', value: 'project_lead' }
    ]
  }),
  methods: {
    ...mapActions('user', ['userDialog', 'createUser']),
    reset() {
      this.$refs.form.reset();
      this.userDialog(false);
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
      dialog: (state) => state.user.userDialog
    })
  }
};
</script>

<style></style>
