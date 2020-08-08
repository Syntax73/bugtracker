<template>
  <v-footer app dark>
    &copy;
    <span>{{ year }}</span>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      year: null
    };
  },
  mounted() {
    this.year = new Date().getFullYear();
  }
};
</script>

<style></style>
