<template>
  <v-card>
    <v-card-text>
      <div>
        <v-textarea
          v-model="comment.comment"
          name="input-7-1"
          solo
          flat
          outlined
          label="Deixe um comentario"
          auto-grow
        ></v-textarea>
      </div>
      <div class="d-flex justify-center">
        <v-btn @click="addComment" color="primary">Comentar</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'AddComment',
  computed: {
    ...mapState({
      comment: (state) => state.comment.comment
    })
  },
  methods: {
    ...mapActions('comment', ['createComment']),

    addComment() {
      const id = this.$route.params.idIssue;
      const comment = this.comment;
      this.createComment({ id, comment });
    }
  }
};
</script>

<style></style>
