<template>
  <div>
    <v-card>
      <v-card-title>Time</v-card-title>
      <v-data-table
        :headers="headers"
        :items="team"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TeamList',
  data() {
    return {
      headers: [
        { text: 'Nome', value: 'name' },
        { text: 'Tipo', value: 'role' }
      ]
    };
  },
  computed: {
    ...mapState({
      team: (state) => state.project.team
    })
  }
};
</script>

<style></style>
