<template>
  <v-card>
    <v-card-title>Detalhes</v-card-title>
    <v-card-text>
      <v-list>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Status</v-list-item-title>
            <v-list-item-subtitle>
              <StatusChip v-bind:status="issue.status" />
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Tipo</v-list-item-title>
            <v-list-item-subtitle>
              <TypeChip v-bind:type="issue.type.type" />
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Priodirade</v-list-item-title>
            <v-list-item-subtitle>
              <PriorityChip v-bind:priority="issue.priority.priority" />
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Gravidade</v-list-item-title>
            <v-list-item-subtitle>
              <SeverityChip v-bind:severity="issue.severity.severity" />
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-avatar>
            <Avatar v-bind:avatar="issue.reporter.avatar" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ issue.reporter.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ issue.reporter.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import Avatar from '../material/Avatar';
import StatusChip from '../material/StatusChip';
import TypeChip from '../material/TypeChip';
import PriorityChip from '../material/PriorityChip';
import SeverityChip from '../material/SeverityChip';

export default {
  name: 'IssuesDetails',
  components: { Avatar, StatusChip, TypeChip, PriorityChip, SeverityChip },
  computed: {
    ...mapState({
      issue: (state) => state.issue.issue
    })
  }
};
</script>

<style></style>
