<template>
  <v-dialog v-model="dialog" persistent>
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on" @click="projectDialog(true)">Novo Projeto</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Cadastrar Projeto</span>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="project.name"
                  :counter="10"
                  label="Nome"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="project.description"
                  :counter="60"
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
                  show-select
                ></v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="project.id" color="success" @click="update(project)">Editar</v-btn>
        <v-btn v-else color="success" @click="createProject">Criar</v-btn>
        <v-btn class="ml-2" color="error" @click="reset">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "EditProject",
  data: () => ({
    valid: false,
    headers: [
      { text: "Nome", value: "name" },
      { text: "Tipo", value: "role" }
    ]
  }),
  methods: {
    ...mapActions("project", ["create", "update", "projectDialog", "setTeam"]),
    ...mapActions("user", ["getUsers"]),
    ...mapMutations("project", ["setProject"]),

    createProject() {
      const { project, teamMembers } = this;
      this.create({ project, teamMembers });
    },
    reset() {
      /* this.$refs.form.reset();*/
      this.setProject({});
      this.projectDialog(false);
    }
  },
  computed: {
    ...mapState({
      project: state => state.project.project,
      dialog: state => state.project.projectDialog,
      users: state => state.user.users
    }),
    teamMembers: {
      get() {
        return this.$store.getters.getTeam;
      },
      set(val) {
        this.setTeam(val);
      }
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

<style></style>
