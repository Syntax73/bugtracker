<template>
  <main>
    <transition mode="out-in">
      <router-view />
    </transition>
  </main>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'App',
  data: () => ({
    //
  }),
  methods: {
    ...mapActions('auth', ['validateToken'])
  },
  created() {
    this.validateToken();
  }
};
</script>
