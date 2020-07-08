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
        <LoadMoreButton
          v-if="loadMore"
          store="comment"
          listMethod="getComments"
          v-bind:idValue="issue.id"
        />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import Avatar from '../material/Avatar';
import LoadMoreButton from '../material/LoadMoreButton';

export default {
  name: 'ListComments',
  components: { Avatar, LoadMoreButton },
  computed: {
    ...mapState({
      issue: (state) => state.issue.issue,
      comments: (state) => state.comment.comments,
      loadMore: (state) => state.comment.loadMore
    })
  },
  methods: {
    ...mapActions('comment', ['getComments']),

    loadComments() {
      const id = this.issue.id;
      const page = 1;
      this.getComments({ id, page });
    }
  },
  mounted() {
    this.loadComments();
  }
};
</script>

<style></style>
