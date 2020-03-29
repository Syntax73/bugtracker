<template>
  <v-app-bar app dark clipped-left>
    <v-app-bar-nav-icon @click="drawer" />
    <v-toolbar-title>Application</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Toolbar',
  data: () => ({}),
  methods: {
    ...mapActions('app', ['toggleDrawer']),
    drawer() {
      this.toggleDrawer();
    },
  },
};
</script>

<style></style>
