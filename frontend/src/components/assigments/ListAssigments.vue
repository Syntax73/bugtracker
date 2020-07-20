<template>
  <v-card>
    <v-card-title>Assigment</v-card-title>
    <v-card-text>
      <v-list>
        <div v-if="persons.length === 0">
          <v-list-item-title>Issue ainda não foi assinada</v-list-item-title>
        </div>
        <template v-for="person in persons">
          <v-list-item v-bind:key="person.id">
            <v-list-item-content>
              <v-list-item-title v-html="person.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar>
              <Avatar v-bind:avatar="person.avatar" />
            </v-list-item-avatar>
          </v-list-item>
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Avatar from '../material/Avatar';

export default {
  name: 'ListAssigments',
  components: { Avatar },
  data() {
    return {
      persons: []
    };
  },
  computed: {
    ...mapGetters('team', ['getPerson']),
    ...mapState({
      assignedIds: (state) => state.issue.issue.assigned
    })
  },
  mounted() {
    this.persons = this.getPerson(this.assignedIds);
  }
};
</script>

<style></style>
