<template>
  <div>
    <v-card>
      <v-card-title>Time</v-card-title>
      <v-data-table
        :headers="headers"
        :items="team"
        class="elevation-1"
        hide-default-footer
      ></v-data-table>
    </v-card>
    <Paginate store="team" listMethod="getTeam" v-bind:idValue="project.id" />
  </div>
</template>

<script>
import Paginate from '../material/Paginate';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'TeamList',
  components: { Paginate },
  data() {
    return {
      headers: [
        { text: 'Codigo', value: 'id' },
        { text: 'Nome', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Papel', value: 'role' }
      ]
    };
  },
  computed: {
    ...mapState({
      team: (state) => state.team.team,
      project: (state) => state.project.project
    })
  },
  mounted() {
    const id = this.project.id;
    const page = 1;
    this.getTeam({ id, page });
  },
  methods: {
    ...mapActions('team', ['getTeam'])
  }
};
</script>

<style></style>
