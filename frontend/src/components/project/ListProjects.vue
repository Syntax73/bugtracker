<template>
  <v-data-table :headers="headers" :items="projects" class="elevation-1">
    <template v-slot:item.actions="{ item }">
      <v-icon class="mr-2" small @click="getItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="destroy(item)">mdi-trash-can</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'ListProjects',
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
    ...mapActions('project', ['getProjects', 'destroy', 'getItem'])
  },
  computed: {
    ...mapState({
      projects: (state) => state.project.projects
    })
  },
  mounted() {
    this.getProjects();
  }
};
</script>

<style></style>
