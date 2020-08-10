<template>
  <div>charts</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Statistic',
  methods: {
    ...mapActions('statistic', ['getStatistics'])
  },
  mounted() {
    this.getStatistics();
  }
};
</script>

<style></style>
