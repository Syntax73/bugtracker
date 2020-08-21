<template>
  <v-snackbar v-model="toggle" :timeout="4000" top :color="alertType">
    <span>{{ message }}</span>
    <v-btn text color="white" @click="toggle = false">Fechar</v-btn>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { SET_SNACKBAR } from '@/store/multation-types';

export default {
  name: 'MessageSnackBar',
  methods: {
    ...mapMutations('app', [SET_SNACKBAR])
  },
  computed: {
    ...mapState({
      snackbar: (state) => state.app.snackbar,
      message: (state) => state.app.snackbarContent.message,
      alertType: (state) => state.app.snackbarContent.alertType
    }),

    toggle: {
      get() {
        return this.snackbar;
      },
      set(value) {
        this.SET_SNACKBAR(value);
      }
    }
  }
};
</script>
