<template>
  <v-app light>
    <toolbar />
    <drawer />
    <v-content>
      <v-container class="fill-height" fluid>
        <div>teste</div>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Toolbar from "@/components/template/Toolbar.vue";
import Drawer from "@/components/template/Drawer.vue";
import Footer from "@/components/template/Footer.vue";

export default {
  name: "Dashboard",
  components: {
    Toolbar,
    Drawer,
    Footer
  }
};
</script>

<style></style>
