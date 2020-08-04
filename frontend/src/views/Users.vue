<template>
  <v-row aling="start">
    <v-col cols="12">
      <h1>Usuarios</h1>
    </v-col>
    <v-col cols="12">
      <ListUsers />
    </v-col>
  </v-row>
</template>

<script>
import ListUsers from '@/components/users/ListUsers';

export default {
  name: 'Users',
  components: { ListUsers }
};
</script>

<style></style>
