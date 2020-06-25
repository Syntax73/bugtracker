<template>
  <v-card>
    <v-card-title>Detalhes do Projeto</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>Nome: {{ project.name }}</v-col>
        <v-col>Descirção: {{ project.description }}</v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ProjectDetails',
  computed: {
    ...mapState({
      project: (state) => state.project.project
    })
  }
};
</script>

<style></style>
