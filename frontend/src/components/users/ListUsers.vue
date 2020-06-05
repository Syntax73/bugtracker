<template>
  <div>
    <v-data-table :headers="headers" :items="users" hide-default-footer class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-icon @click="getItem(item)">mdi-pencil</v-icon>
      </template>
    </v-data-table>
    <div class="text-center">
      <Paginate store="user" listMethod="getUsers" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Paginate from '../material/Paginate';

export default {
  name: 'ListUsers',
  components: { Paginate },
  data() {
    return {
      headers: [
        { text: 'Codigo', sortable: true, value: 'id' },
        { text: 'Nome', sortable: true, value: 'name' },
        { text: 'Email', sortable: true, value: 'email' },
        { text: 'Papel', sortable: true, value: 'role' },
        { text: 'Criação', sortable: true, value: 'createdAt' },
        { text: 'Alterado', sortable: true, value: 'updatedAt' },
        { text: 'Ações', value: 'actions' }
      ]
    };
  },
  methods: {
    ...mapActions('user', ['getUsers', 'getItem', 'destroy'])
  },
  computed: {
    ...mapState({
      users: (state) => state.user.users
    })
  },
  mounted() {
    this.getUsers(1);
  }
};
</script>

<style></style>
