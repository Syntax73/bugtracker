<template>
  <div>
    <v-data-table :headers="headers" :items="projects" hide-default-footer class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-2" small @click="getItem(item)">mdi-pencil</v-icon>
        <v-icon class="mr-2" small @click="destroy(item)">mdi-trash-can</v-icon>
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
    ...mapActions('project', ['getProjects', 'destroy', 'getProject']),
    ...mapMutations('project', ['setPage', 'setLimit', 'setProjectDialog']),

    getItem(item) {
      this.getProject(item);
      this.setProjectDialog(true);
    },
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
    this.getProjects(1);
  }
};
</script>

<style></style>
