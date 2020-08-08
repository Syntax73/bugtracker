<template>
  <v-chip small :color="color">{{ severity }}</v-chip>
</template>

<script>
export default {
  name: 'SeverityChip',
  props: ['severity'],
  data() {
    return {
      color: ''
    };
  },
  methods: {
    colorChange() {
      switch (this.severity) {
        case 'minor':
          this.color = 'yellow';
          break;
        case 'moderate':
          this.color = 'amber';
          break;
        case 'major':
          this.color = 'orange';
          break;
        case 'critical':
          this.color = 'deep-orange';
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
