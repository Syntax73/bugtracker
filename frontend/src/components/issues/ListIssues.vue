<template>
  <div>
    <v-card>
      <v-card-title>Bugs</v-card-title>
      <v-data-table
        :headers="headers"
        :items="issues"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ListIssues',
  data() {
    return {
      headers: [
        {
          text: 'Codigo',
          align: 'start',
          sortable: true,
          value: 'id'
        },
        { text: 'Titulo', value: 'title' },
        { text: 'Status', value: 'status' },
        { text: 'Tipo', value: 'type.type' },
        { text: 'Priodirade', value: 'priority.priority' },
        { text: 'Gravidade', value: 'severity.severity' }
      ]
    };
  },
  computed: {
    ...mapState({
      issues: (state) => state.issue.issues,
      project: (state) => state.project.project
    })
  },
  mounted() {
    this.getIssues(this.project.id);
  },
  methods: {
    ...mapActions('issue', ['getIssues'])
  }
};
</script>

<style></style>
