<template>
  <v-row aling="start">
    <v-col cols="12">
      <h1>Projetos</h1>
    </v-col>
    <v-col>
      <EditProject />
    </v-col>
    <v-col cols="12">
      <ListProjects />
    </v-col>
  </v-row>
</template>

<script>
import EditProject from '@/components/project/EditProject';
import ListProjects from '@/components/project/ListProjects';

export default {
  name: 'Projects',
  components: {
    ListProjects,
    EditProject
  }
};
</script>

<style></style>
