<template>
  <div>
    <v-card>
      <v-card-title>Assinar issue</v-card-title>
      <v-card-text>
        <v-combobox
          v-model="persons"
          :items="team"
          item-text="name"
          item-value="id"
          label="Selecione"
          @change="create"
          multiple
          hide-selected
          chips
        >
          <template v-slot:selection="data">
            <v-chip
              :key="JSON.stringify(data.item)"
              v-bind="data.attrs"
              :input-value="data.selected"
              @click="data.select"
              @click:close="remove(data.item)"
              close
            >
              <v-avatar left>
                <Avatar :avatar="data.item.avatar" />
              </v-avatar>
              {{ data.item.name }}
            </v-chip>
          </template>
          <template v-slot:item="data">
            <v-list-item-avatar>
              <Avatar :avatar="data.item.avatar" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.name"></v-list-item-title>
            </v-list-item-content>
          </template>
        </v-combobox>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import Avatar from '../material/Avatar.vue';

export default {
  name: 'AddAssigments',
  components: { Avatar },
  computed: {
    ...mapGetters('team', ['getPerson']),
    ...mapState({
      team: (state) => state.team.team,
      assignedIds: (state) => state.issue.issue.assigned,
      assigments: (state) => state.assigment.assigments
    }),
    persons: {
      get() {
        return this.assigments;
      },
      set(val) {
        this.setAssigment(val);
      }
    }
  },
  created() {
    this.persons = this.getPerson(this.assignedIds);
    const id = this.$route.params.idProject;
    const page = 1;
    this.getTeam({ id, page });
  },
  methods: {
    ...mapActions('assigment', ['createAssigment', 'deleteAssigment']),
    ...mapActions('team', ['getTeam']),
    ...mapMutations('assigment', ['setAssigment']),

    create() {
      const issueId = this.$route.params.idIssue;
      const assigned = this.persons;
      this.createAssigment({ issueId, assigned });
    },
    remove(userId) {
      const issueId = this.$route.params.idIssue;
      this.deleteAssigment({ issueId, userId });
    }
  }
};
</script>

<style></style>
