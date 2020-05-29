<template>
  <v-app dark>
    <toolbar />
    <drawer />
    <v-content>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Toolbar from '@/components/template/Toolbar.vue';
import Drawer from '@/components/template/Drawer.vue';
import Footer from '@/components/template/Footer.vue';

export default {
  name: 'Dashboard',
  components: {
    Toolbar,
    Drawer,
    Footer
  }
};
</script>

<style></style>
