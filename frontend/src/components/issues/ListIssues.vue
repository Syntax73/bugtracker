<template>
  <div>
    <v-card>
      <v-card-title>Bugs</v-card-title>
      <v-data-table :headers="headers" :items="issues" class="elevation-1" hide-default-footer>
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="detailsItem(item)">mdi-details</v-icon>
        </template>
      </v-data-table>
    </v-card>
    <Paginate store="issue" listMethod="getIssues" />
  </div>
</template>

<script>
import Paginate from '../material/Paginate';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ListIssues',
  components: { Paginate },
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
        { text: 'Gravidade', value: 'severity.severity' },
        { text: 'Ações', value: 'actions' }
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
    const id = this.project.id;
    const page = 1;
    this.getIssues({ id, page });
  },
  methods: {
    ...mapActions('issue', ['getIssues', 'getIssue']),

    detailsItem(item) {
      this.getIssue(item);
      this.$router.push(`/projects/${item.id}/issue`);
    }
  }
};
</script>

<style></style>
