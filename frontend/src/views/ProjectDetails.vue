<template>
  <v-row>
    <v-col cols="12">
      <ProjectDetails />
    </v-col>
    <v-col md="7" xs="12">
      <ListIssues />
    </v-col>
    <v-col md="5" xs="12">
      <ListTeam />
    </v-col>
  </v-row>
</template>

<script>
import ListIssues from '@/components/issues/ListIssues';
import ProjectDetails from '@/components/project/ProjectDetails';
import ListTeam from '@/components/team/ListTeam';

export default {
  nome: 'ProjectDetails',
  components: {
    ListIssues,
    ProjectDetails,
    ListTeam
  }
};
</script>

<style></style>
