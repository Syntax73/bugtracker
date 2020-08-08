<template>
  <div>
    <v-data-table :headers="headers" :items="issues" class="elevation-1" hide-default-footer>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Lista de Issues</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
        </v-toolbar>
      </template>
      <template v-slot:item.status="{ item }">
        <StatusChip :status="item.status" />
      </template>
      <template v-slot:item.type.type="{ item }">
        <TypeChip :type="item.type.type" />
      </template>
      <template v-slot:item.priority.priority="{ item }">
        <PriorityChip :priority="item.priority.priority" />
      </template>
      <template v-slot:item.severity.severity="{ item }">
        <SeverityChip :severity="item.severity.severity" />
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="getItem(item)" class="mr-2">mdi-pencil</v-icon>
        <v-icon small @click="detailsItem(item)">mdi-details</v-icon>
      </template>
    </v-data-table>
    <Paginate store="issue" listMethod="getMyIssues" />
  </div>
</template>

<script>
import Paginate from '../material/Paginate';
import StatusChip from '../material/StatusChip';
import TypeChip from '../material/TypeChip';
import PriorityChip from '../material/PriorityChip';
import SeverityChip from '../material/SeverityChip';
import { mapActions, mapState, mapMutations } from 'vuex';

export default {
  name: 'MyIssues',
  components: { Paginate, StatusChip, TypeChip, PriorityChip, SeverityChip },
  data() {
    return {
      headers: [
        {
          text: 'Codigo',
          align: 'start',
          sortable: true,
          value: 'id'
        },
        { text: 'Titulo', value: 'title', sortable: false },
        { text: 'Status', value: 'status' },
        { text: 'Tipo', value: 'type.type' },
        { text: 'Prioridade', value: 'priority.priority' },
        { text: 'Gravidade', value: 'severity.severity' },
        { text: 'Ações', value: 'actions', sortable: false }
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
    const page = 1;
    this.getMyIssues(page);
  },
  methods: {
    ...mapActions('issue', ['getMyIssues', 'getIssue']),
    ...mapMutations('comment', ['setComments', 'setLoadMore']),

    detailsItem(item) {
      this.getIssue(item);
      this.setComments({ rows: [] });
      this.setLoadMore(true);
      this.$router.push(`/projects/${item.id}/issue`);
    },
    getItem(item) {
      this.getIssue(item);
      this.$router.push(`/projects/${item.project_id}/edit-issue`);
    }
  }
};
</script>

<style></style>
