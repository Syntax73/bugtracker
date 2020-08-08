<template>
  <v-navigation-drawer v-model="inputValue" app dark clipped>
    <v-list>
      <v-list-item link>
        <v-list-item-avatar>
          <Avatar :avatar="user.avatar" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title">{{ user.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item-group color="primary">
        <v-list-item router to="/profile">
          <v-list-item-icon>
            <v-icon>mdi-account-card-details-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router to="/dashboard">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="user.role == 'admin'" router to="/users">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Usuários</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router to="/projects">
          <v-list-item-icon>
            <v-icon>mdi-notebook-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Projetos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router to="/issues">
          <v-list-item-icon>
            <v-icon>mdi-clipboard-check-multiple-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Minhas Issues</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import Avatar from '@/components/material/Avatar';

export default {
  name: 'Drawer',
  components: { Avatar },
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
