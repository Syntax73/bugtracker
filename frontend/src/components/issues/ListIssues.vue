<template>
  <div>
    <v-card>
      <v-card-title>Bugs</v-card-title>
      <v-data-table :headers="headers" :items="issues" class="elevation-1" hide-default-footer>
        <template v-slot:item.status="{ item }">
          <StatusChip v-bind:status="item.status" />
        </template>
        <template v-slot:item.type.type="{ item }">
          <TypeChip v-bind:type="item.type.type" />
        </template>
        <template v-slot:item.priority.priority="{ item }">
          <PriorityChip v-bind:priority="item.priority.priority" />
        </template>
        <template v-slot:item.severity.severity="{ item }">
          <SeverityChip v-bind:severity="item.severity.severity" />
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="detailsItem(item)">mdi-details</v-icon>
        </template>
      </v-data-table>
    </v-card>
    <Paginate store="issue" listMethod="getIssues" v-bind:idValue="project.id" />
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
  name: 'ListIssues',
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
    ...mapMutations('comment', ['setComments', 'setLoadMore']),

    detailsItem(item) {
      this.getIssue(item);
      this.setComments({ rows: [] });
      this.setLoadMore(true);
      this.$router.push(`/projects/${item.id}/issue`);
    }
  }
};
</script>

<style></style>
