<template>
  <v-chip v-bind:color="color">{{ type }}</v-chip>
</template>

<script>
export default {
  name: 'TypeChipe',
  props: ['type'],
  data() {
    return {
      color: ''
    };
  },
  methods: {
    colorChange() {
      switch (this.type) {
        case 'bug':
          this.color = 'green';
          break;
        case 'feature':
          this.color = 'primary';
          break;
        case 'duplicate':
          this.color = 'secondary';
          break;
        case 'documentation':
          this.color = 'orange';
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
