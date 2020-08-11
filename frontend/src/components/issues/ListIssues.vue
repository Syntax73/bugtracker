<template>
  <div>
    <v-card>
      <v-data-table :headers="headers" :items="issues" class="elevation-1" hide-default-footer>
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Lista de Issues</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="newIssue">Nova Issue</v-btn>
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
          <v-icon small @click="detailsItem(item)">mdi-details</v-icon>
        </template>
      </v-data-table>
    </v-card>
    <Paginate store="issue" listMethod="getIssues" :idValue="project.id" />
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
    const id = this.project.id;
    const page = 1;
    this.getIssues({ id, page });
  },
  methods: {
    ...mapActions('issue', ['getIssues', 'getIssue']),
    ...mapMutations('comment', ['setComments', 'setLoadMore']),
    ...mapMutations('issue', ['setIssue']),

    detailsItem(item) {
      this.getIssue(item);
      this.setComments({ rows: [] });
      this.setLoadMore(true);
      const idProject = this.$route.params.id;
      this.$router.push(`/projects/${idProject}/issue/${item.id}`);
    },
    newIssue() {
      const id = this.$route.params.id;
      this.setIssue({});
      this.$router.push(`/projects/${id}/edit-issue`);
    }
  }
};
</script>

<style></style>
