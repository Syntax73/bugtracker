<template>
  <main>
    <transition mode="out-in">
      <AppLoading size="50" v-if="isLoading" />
      <router-view v-else />
    </transition>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppLoading from '@/components/material/AppLoading';

export default {
  name: 'App',
  components: { AppLoading },
  methods: {
    ...mapActions('auth', ['validateToken'])
  },
  created() {
    this.validateToken()
      .then((res) => {
        this.$router.push('/dashboard');
      })
      .catch((err) => {
        this.$router.push('/');
      });
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.app.isAppLoading
    })
  }
};
</script>
