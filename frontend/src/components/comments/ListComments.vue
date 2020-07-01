<template>
  <div>Comments</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ListComments',
  computed: {
    ...mapState({
      project: (state) => state.project.project,
      issue: (state) => state.issue.issue
    })
  },
  methods: {
    ...mapActions('comment', ['getComments']),

    loadComments() {
      const idProject = this.project.id;
      const idIssue = this.issue.id;
      this.getComments({ idProject, idIssue });
    }
  },
  mounted() {
    this.loadComments();
  }
};
</script>

<style></style>
