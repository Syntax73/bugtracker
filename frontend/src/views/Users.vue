<template>
  <v-row aling="start">
    <v-col cols="12">
      <h1>Usuarios</h1>
    </v-col>
    <v-col>
      <EditUsers />
    </v-col>
    <v-col cols="12">
      <ListUsers />
    </v-col>
  </v-row>
</template>

<script>
import ListUsers from '@/components/users/ListUsers';
import EditUsers from '@/components/users/EditUsers';

export default {
  name: 'Users',
  components: { ListUsers, EditUsers }
};
</script>

<style></style>
