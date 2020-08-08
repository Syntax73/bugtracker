<template>
  <v-card>
    <v-card-title>Comentarios</v-card-title>
    <v-card-text>
      <v-list>
        <div>
          <div v-if="comments.length === 0">
            <v-list-item-title>Ainda não há comentários</v-list-item-title>
          </div>
          <template v-for="item in comments">
            <v-list-item :key="item.id">
              <v-list-item-avatar>
                <Avatar :avatar="item.user.avatar" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.user.name"></v-list-item-title>
                <v-list-item-subtitle v-html="item.comment"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </div>
        <div class="d-flex justify-center">
          <LoadMoreButton
            v-if="loadMore"
            store="comment"
            listMethod="getComments"
            :idValue="issue.id"
          />
        </div>
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
