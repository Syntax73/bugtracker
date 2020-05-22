<template>
  <v-form v-model="valid" ref="form">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="project.name" :counter="10" label="Nome" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="project.description"
            :counter="60"
            label="Descrição"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn v-if="project.id" color="success" @click="update(project)">Editar</v-btn>
          <v-btn v-else color="success" @click="createProject">Criar</v-btn>
          <v-btn color="error" @click="reset">Cancelar</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "EditProject",
  data: () => ({
    valid: false
  }),
  methods: {
    ...mapActions("project", ["create", "update"]),
    ...mapMutations("project", ["setProject"]),
    createProject() {
      this.create(this.project);
    },
    reset() {
      /* this.$refs.form.reset();*/
      this.setProject({});
    }
  },
  computed: {
    ...mapState({
      project: state => state.project.project
    })
  }
};
</script>

<style></style>
