<template>
  <v-navigation-drawer v-model="inputValue" app dark clipped>
    <v-list>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="title">{{ user.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item v-for="(item, i) in items" :key="i" router :to="item.route">
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
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Drawer',
  data: () => ({
    item: 0,
    items: [
      {
        text: 'Perfil',
        icon: 'mdi-account-card-details-outline',
        route: '/profile'
      },
      { text: 'Inicio', icon: 'mdi-view-dashboard', route: '/dashboard' },
      {
        text: 'Usuários',
        icon: 'mdi-account-multiple-plus',
        route: '/users'
      },
      { text: 'Projetos', icon: 'mdi-notebook-outline', route: '/projects' },
      {
        text: 'Minhas Issues',
        icon: 'mdi-clipboard-check-multiple-outline',
        route: '/issues'
      }
    ]
  }),
  methods: {
    ...mapMutations('app', ['setDrawer'])
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.userSession
    }),
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
