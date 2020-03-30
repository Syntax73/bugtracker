<template>
  <v-navigation-drawer v-model="inputValue" app dark persistent>
    <v-list>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="title">Usuario do Sistema</v-list-item-title>
          <v-list-item-subtitle>user@email.com</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Drawer",
  data: () => ({
    item: 0,
    items: [
      { text: "Inicio", icon: "mdi-view-dashboard" },
      { text: "Perfil", icon: "mdi-account-card-details-outline" },
      { text: "Projetos", icon: "mdi-notebook-outline" },
      { text: "Issues", icon: "mdi-clipboard-check-multiple-outline" }
    ]
  }),
  methods: {
    ...mapMutations("app", ["setDrawer"])
  },
  computed: {
    inputValue: {
      get() {
        return this.$store.state.app.drawer;
      },
      set(val) {
        this.setDrawer(val);
      }
    }
  }
};
</script>

<style></style>
