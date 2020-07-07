<template>
  <v-chip small v-bind:color="color">{{ status }}</v-chip>
</template>

<script>
export default {
  name: 'StatusChip',
  props: ['status'],
  data() {
    return {
      color: ''
    };
  },
  methods: {
    colorChange() {
      switch (this.status) {
        case 'new':
          this.color = 'primary';
          break;
        case 'open':
        case 'reopen':
          this.color = 'green';
          break;
        case 'fixed':
          this.color = 'secondary';
          break;
        case 'in-progress':
          this.color = 'orange';
          break;
        case 'closed':
        case 'rejected':
          this.color = 'red';
          break;
        default:
          this.color = 'default';
      }
    }
  },
  mounted() {
    this.colorChange();
  }
};
</script>
