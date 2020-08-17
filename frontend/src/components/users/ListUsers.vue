<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="getUsersFormated"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Lista de Usuarios</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2" router to="/users/edit-user">Novo Usuario</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon @click="editItem(item)">mdi-pencil</v-icon>
      </template>
    </v-data-table>
    <div class="text-center">
      <Paginate store="user" listMethod="getUsers" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
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
    ...mapActions('user', ['getUsers', 'getItem', 'destroy']),

    editItem(item) {
      this.getItem(item);
      this.$router.push('/users/edit-user');
    }
  },
  computed: {
    ...mapState({
      users: (state) => state.user.users
    }),
    ...mapGetters('user', ['getUsersFormated'])
  },
  mounted() {
    this.getUsers(1);
  }
};
</script>

<style></style>
