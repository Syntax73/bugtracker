<template>
  <v-card>
    <v-card-title>{{ issue.title }}</v-card-title>
    <v-card-text>
      <p>
        {{ issue.description }}
      </p>
      <div>
        <ul class="list">
          <li>Status: {{ issue.status }}</li>
          <li>Tipo: {{ issue.type.type }}</li>
          <li>Priodirade: {{ issue.priority.priority }}</li>
          <li>Gravidade: {{ issue.severity.severity }}</li>
        </ul>
      </div>
      <div>
        Dono:
        <ul class="list">
          <li>{{ issue.reporter.name }}</li>
          <li>{{ issue.reporter.email }}</li>
        </ul>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'IssuesDetails',
  computed: {
    ...mapState({
      issue: (state) => state.issue.issue
    })
  }
};
</script>

<style>
.list {
  list-style: none;
}
</style>
