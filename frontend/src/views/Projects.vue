<template>
  <v-row aling="start">
    <v-col cols="12">
      <h1>Projetos</h1>
    </v-col>
    <v-col cols="12">
      <ListProjects />
    </v-col>
  </v-row>
</template>

<script>
import ListProjects from '@/components/project/ListProjects';

export default {
  name: 'Projects',
  components: {
    ListProjects
  }
};
</script>

<style></style>
