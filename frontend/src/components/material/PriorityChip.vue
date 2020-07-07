<template>
  <v-chip v-bind:color="color">{{ priority }}</v-chip>
</template>

<script>
export default {
  name: 'TypeChipe',
  props: ['priority'],
  data() {
    return {
      color: ''
    };
  },
  methods: {
    colorChange() {
      switch (this.priority) {
        case 'low':
          this.color = 'yellow';
          break;
        case 'medium':
          this.color = 'amber';
          break;
        case 'high':
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
