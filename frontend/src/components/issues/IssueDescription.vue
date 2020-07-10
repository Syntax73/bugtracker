<template>
  <v-card>
    <v-card-title>{{ issue.title }}</v-card-title>
    <v-card-text>{{ issue.description }}</v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'IssueDescription',
  computed: {
    ...mapState({
      issue: (state) => state.issue.issue
    })
  }
};
</script>

<style></style>
