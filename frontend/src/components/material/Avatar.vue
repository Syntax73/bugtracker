<template>
  <v-img :src="newAvatar"></v-img>
</template>

<script>
export default {
  name: 'Avatar',
  props: ['avatar'],
  data() {
    return {
      newAvatar: `${process.env.VUE_APP_API}`
    };
  },
  methods: {
    concatUrl() {
      if (this.avatar) {
        this.newAvatar = `${this.newAvatar}/files/${this.avatar}`;
      } else {
        this.newAvatar = require('@/assets/default_avatar.svg');
      }
    }
  },
  mounted() {
    this.concatUrl();
  }
};
</script>

<style></style>
