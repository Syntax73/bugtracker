<template>
  <v-card>
    <v-card-title>Comentarios</v-card-title>
    <v-card-text>
      <v-list>
        <template v-for="item in comments">
          <v-list-item :key="item.id">
            <v-list-item-avatar>
              <Avatar v-bind:avatar="item.avatar" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="item.name"></v-list-item-title>
              <v-list-item-subtitle v-html="item.comment"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Avatar from '../material/Avatar';

export default {
  name: 'ListComments',
  components: { Avatar },
  computed: {
    ...mapState({
      issue: (state) => state.issue.issue,
      comments: (state) => state.comment.comments
    })
  },
  methods: {
    ...mapActions('comment', ['getComments']),

    loadComments() {
      const idIssue = this.issue.id;
      const page = 1;
      this.getComments({ idIssue, page });
    }
  },
  mounted() {
    this.loadComments();
  }
};
</script>

<style></style>
