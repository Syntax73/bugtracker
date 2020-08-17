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
    ...mapActions('app', ['toggleSnackbar']),

    async addComment() {
      try {
        const id = this.$route.params.idIssue;
        const comment = this.comment;
        this.createComment({ id, comment });
      } catch (err) {
        this.toggleSnackbar({
          message: err,
          alertType: 'warning'
        });
      }
    }
  }
};
</script>

<style></style>
