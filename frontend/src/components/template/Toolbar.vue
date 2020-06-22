<template>
  <v-app-bar app dark clipped-left>
    <v-app-bar-nav-icon @click="drawer" />
    <v-toolbar-title>BugTracker</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="onSingout">
      <v-icon>mdi-power</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Toolbar',
  data: () => ({}),
  methods: {
    ...mapActions('app', ['toggleDrawer']),
    ...mapActions('auth', ['singout']),
    onSingout() {
      this.singout();
      this.$router.push('/');
    },
    drawer() {
      this.toggleDrawer();
    }
  }
};
</script>

<style></style>
