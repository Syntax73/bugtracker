<template>
  <v-card>
    <v-card-title>Assigment:</v-card-title>
    <v-card-text>
      <template v-if="persons.length === 0">
        <div>Bug ainda não foi designado</div>
      </template>
      <template v-for="person in persons">
        <v-chip :key="person.id" class="mr-2">
          <v-avatar left>
            <Avatar :avatar="person.avatar" />
          </v-avatar>
          {{ person.name }}
        </v-chip>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
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
    ...mapGetters('team', ['getPersons']),
    ...mapState({
      assignedIds: (state) => state.issue.issue.assigned
    })
  },
  mounted() {
    this.persons = this.getPersons(this.assignedIds);
  }
};
</script>

<style></style>
