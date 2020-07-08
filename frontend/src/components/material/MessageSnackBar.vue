<template>
  <v-snackbar v-model="toggle" :timeout="4000" top :color="alertType">
    <span>{{ message }}</span>
    <v-btn text color="white" @click="toggle = false">Fechar</v-btn>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'MessageSnackBar',
  props: ['message', 'alertType'],
  methods: {
    ...mapMutations('app', ['setSnackbar'])
  },
  computed: {
    ...mapState({
      snackbar: (state) => state.app.snackbar
    }),

    toggle: {
      get() {
        return this.snackbar;
      },
      set(value) {
        this.setSnackbar(value);
      }
    }
  }
};
</script>
