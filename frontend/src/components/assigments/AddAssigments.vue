<template>
  <div>
    <v-card>
      <v-card-title>Assinar issue</v-card-title>
      <v-card-text>
        <v-autocomplete
          v-model="selection"
          :items="team"
          item-text="name"
          item-value="id"
          label="Selecione"
          multiple
        ></v-autocomplete>
        <v-btn @click="create()" color="primary">Adicionar</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AddAssigments',
  data() {
    return {
      selection: []
    };
  },
  computed: {
    ...mapState({
      team: (state) => state.team.team
    })
  },
  methods: {
    ...mapActions('assigment', ['createAssigment']),

    create() {
      const issueId = this.$route.params.idIssue;
      const assigned = this.selection;
      this.createAssigment({ issueId, assigned });
    }
  }
};
</script>

<style></style>
