<template>
  <v-pagination v-model="currentPage" :length="pageTotal"></v-pagination>
</template>

<script>
export default {
  name: 'Paginate',
  props: ['store', 'listMethod', 'idValue'],
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
      if (this.idValue) {
        const id = this.idValue;
        this.$store.dispatch(`${this.store}/${this.listMethod}`, { id, page });
      } else {
        this.$store.dispatch(`${this.store}/${this.listMethod}`, page);
      }
    }
  }
};
</script>

<style></style>
