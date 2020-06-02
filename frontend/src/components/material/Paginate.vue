<template>
  <v-pagination v-model="currentPage" :length="pageTotal"></v-pagination>
</template>

<script>
export default {
  name: 'Paginate',
  props: ['store', 'listMethod'],
  watch: {
    currentPage(newVal) {
      this.paginatePage(newVal);
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.$store.state[this.store].pagination.page;
      },
      set(value) {
        this.$store.commit(`${this.store}/setPage`, value);
      }
    },
    pageTotal: {
      get() {
        return this.$store.state[this.store].pagination.pageCount;
      }
    }
  },
  methods: {
    paginatePage(page) {
      this.$store.dispatch(`${this.store}/${this.listMethod}`, page);
    }
  }
};
</script>

<style></style>
