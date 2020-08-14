<template>
  <v-progress-circular :size="size" indeterminate color="primary"></v-progress-circular>
</template>

<script>
export default {
  name: 'AppLoading',
  props: {
    size: Number
  }
};
</script>
<style scoped>
.v-progress-circular {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -100px;
}
</style>
