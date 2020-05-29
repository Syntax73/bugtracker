<template>
  <v-app dark>
    <v-content>
      <v-container fluid>
        <AuthForm />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AuthForm from '../components/AuthForm';

export default {
  name: 'Auth',
  components: {
    AuthForm
  }
};
</script>

<style></style>
