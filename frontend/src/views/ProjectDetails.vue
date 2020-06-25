<template>
  <v-row>
    <v-col cols="12">
      <ProjectDetails />
    </v-col>
    <v-col cols="6">
      <ListIssues />
    </v-col>
    <v-col cols="6">
      <TeamList />
    </v-col>
  </v-row>
</template>

<script>
import ListIssues from '@/components/issues/ListIssues';
import ProjectDetails from '@/components/project/ProjectDetails';
import TeamList from '@/components/team/TeamList';

export default {
  nome: 'ProjectDetails',
  components: {
    ListIssues,
    ProjectDetails,
    TeamList
  }
};
</script>

<style></style>
