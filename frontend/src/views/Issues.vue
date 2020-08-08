<template>
  <v-row>
    <v-col cols="12">
      <h1>Minhas Issues</h1>
    </v-col>
    <v-col>
      <MyIssues1 />
    </v-col>
  </v-row>
</template>

<script>
import MyIssues1 from '../components/issues/MyIssues';

export default {
  name: 'Issues',
  components: { MyIssues1 }
};
</script>

<style></style>
