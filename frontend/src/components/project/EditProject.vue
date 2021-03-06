<template>
  <v-card>
    <v-card-title>
      <span class="headline">Cadastrar Projeto</span>
    </v-card-title>
    <v-card-text>
      <MessageSnackBar />
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="project.name"
                :counter="60"
                :rules="nameRules"
                label="Nome"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="project.description"
                :counter="100"
                :rules="descRules"
                label="Descrição"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-data-table
                v-model="teamMembers"
                :headers="headers"
                :items="users"
                item-key="id"
                show-select
                hide-default-footer
              ></v-data-table>
              <div class="text-center">
                <Paginate store="user" listMethod="getUsers" />
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <div>
        <v-btn v-if="project.id" :disabled="!valid" color="success" @click="updateProject"
          >Editar</v-btn
        >
        <v-btn v-else color="success" :disabled="!valid" @click="createProject">Criar</v-btn>
        <v-btn class="ml-2" color="error" @click="reset">Cancelar</v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex';
import { SET_PROJECT } from '@/store/multation-types';
import Paginate from '../material/Paginate';
import MessageSnackBar from '../material/MessageSnackBar';

export default {
  name: 'EditProject',
  components: { Paginate, MessageSnackBar },
  data: () => ({
    valid: true,
    nameRules: [
      (v) => !!v || 'Nome é obrigatorio',
      (v) => (v && v.length <= 60) || 'Nome deve ter menos que 60 catacteres'
    ],
    descRules: [
      (v) => !!v || 'Descrição é obrigatoria',
      (v) => (v && v.length <= 100) || 'Descrição deve ter menos que 100 catacteres'
    ],
    headers: [
      { text: 'Nome', value: 'name' },
      { text: 'Papel', value: 'role' }
    ]
  }),
  computed: {
    ...mapState({
      project: (state) => state.project.project,
      users: (state) => state.user.users
    }),
    ...mapGetters('project', ['getTeam']),
    teamMembers: {
      get() {
        return this.getTeam;
      },
      set(val) {
        this.setTeam(val);
      }
    }
  },
  mounted() {
    this.getUsers(1);
  },
  methods: {
    ...mapActions('project', ['create', 'update']),
    ...mapActions('app', ['toggleSnackbar']),
    ...mapActions('user', ['getUsers']),
    ...mapMutations('project', [SET_PROJECT, 'setTeam']),

    async createProject() {
      try {
        const { project, teamMembers } = this;
        await this.create({ project, teamMembers });
        this.$refs.form.reset();
        this.$router.go(-1);
      } catch (err) {
        this.toggleSnackbar({
          message: err,
          alertType: 'warning'
        });
      }
    },
    async updateProject() {
      try {
        const { project, teamMembers } = this;
        await this.update({ project, teamMembers });
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
      this.SET_PROJECT({});
      this.setTeam([]);
      this.$refs.form.reset();
      this.$router.go(-1);
    }
  }
};
</script>

<style></style>
