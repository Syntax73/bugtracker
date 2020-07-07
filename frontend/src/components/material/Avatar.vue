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
      this.newAvatar = `${this.newAvatar}/files/${this.avatar}`;
    }
  },
  mounted() {
    this.concatUrl();
  }
};
</script>

<style></style>
