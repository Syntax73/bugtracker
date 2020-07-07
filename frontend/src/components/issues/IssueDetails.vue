<template>
  <v-card>
    <v-card-title>{{ issue.title }}</v-card-title>
    <v-card-text>
      <v-list>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Descrição</v-list-item-title>
            <v-list-item-subtitle>{{ issue.description }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Status</v-list-item-title>
            <v-list-item-subtitle>{{ issue.status }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Tipo</v-list-item-title>
            <v-list-item-subtitle>{{ issue.type.type }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Priodirade</v-list-item-title>
            <v-list-item-subtitle>{{ issue.priority.priority }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Gravidade</v-list-item-title>
            <v-list-item-subtitle>{{ issue.severity.severity }}</v-list-item-subtitle>
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

export default {
  name: 'IssuesDetails',
  components: { Avatar },
  computed: {
    ...mapState({
      issue: (state) => state.issue.issue
    })
  }
};
</script>

<style></style>
