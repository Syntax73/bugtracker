<template>
  <v-row aling="start">
    <v-col cols="12">
      <h1>Projetos</h1>
    </v-col>
    <v-col cols="12">
      <ListProjects v-if="currentUser.role == 'admin'" />
      <MyProjects v-else />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import ListProjects from '@/components/project/ListProjects';
import MyProjects from '@/components/project/MyProjects';

export default {
  name: 'Projects',
  components: {
    ListProjects,
    MyProjects
  },
  computed: {
    ...mapGetters('auth', ['currentUser'])
  }
};
</script>

<style></style>
