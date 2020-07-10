<template>
  <v-btn color="primary" @click="loadMore">Carregar Mais</v-btn>
</template>

<script>
export default {
  name: 'LoadMoreButton',
  props: ['store', 'listMethod', 'idValue'],
  data() {
    return {
      page: 2
    };
  },
  methods: {
    loadMore() {
      const id = this.idValue;
      const page = this.page;
      this.$store.dispatch(`${this.store}/${this.listMethod}`, { id, page });
      this.page++;
    }
  }
};
</script>

<style></style>
