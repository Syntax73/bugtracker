<template>
  <v-card>
    <v-card-title v-html="currentUser.name"></v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="3">
          <Avatar :avatar="currentUser.avatar" />
        </v-col>
        <v-col cols="9">
          <v-text-field filled disabled v-model="currentUser.email"></v-text-field>
          <v-text-field filled disabled v-model="currentUser.role"></v-text-field>
          <v-btn router to="/profile/edit-profile" color="primary">Editar</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import Avatar from '../material/Avatar';

export default {
  name: 'CurrentUser',
  components: { Avatar },
  computed: {
    ...mapGetters('auth', ['currentUser'])
  }
};
</script>

<style></style>
