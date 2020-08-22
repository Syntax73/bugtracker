<template>
  <div>
    <v-data-table :headers="headers" :items="projects" hide-default-footer class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Lista de Projetos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="detailsItem(item)">mdi-details</v-icon>
      </template>
    </v-data-table>
    <div class="text-center">
      <Paginate store="project" listMethod="getProjects" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import Paginate from '../material/Paginate';

export default {
  name: 'ListProjects',
  components: { Paginate },
  data() {
    return {
      headers: [
        { text: 'Codigo', sortable: true, value: 'id' },
        { text: 'Nome', sortable: true, value: 'name' },
        { text: 'Descrição', sortable: true, value: 'description' },
        { text: 'Criação', sortable: true, value: 'createdAt' },
        { text: 'Alterado', sortable: true, value: 'updatedAt' },
        { text: 'Ações', value: 'actions' }
      ]
    };
  },
  methods: {
    ...mapActions('project', ['getMyProjects', 'getProject']),

    detailsItem(item) {
      this.getProject(item);
      this.$router.push(`/projects/${item.id}/details`);
    }
  },
  computed: {
    ...mapState({
      projects: (state) => state.project.projects,
      pages: (state) => state.project.pages
    })
  },
  mounted() {
    this.getMyProjects(1);
  }
};
</script>

<style></style>
