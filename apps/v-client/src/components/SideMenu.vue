<script lang="ts">
import { useAuthStore } from "../stores/auth";

export default {
  data: function () {
    const authStore = useAuthStore();
    return {
      title: "Application",
      authStore,
    };
  },

  methods: {
    logout: function () {
      this.authStore.logout();
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<template>
  <v-navigation-drawer>
    <v-list>
      <v-list-item>
        <v-row no-gutters>
          <v-col cols="3">
            <v-avatar image="/src/assets/logo.svg" rounded="0"></v-avatar>
          </v-col>
          <v-col>
            <v-list-item-title>{{ title }} </v-list-item-title>
            <v-list-item-subtitle>Hello!</v-list-item-subtitle>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-item title="Home" value="Home" prepend-icon="mdi-home" to="/">
      </v-list-item>

      <v-list-item
        v-if="!authStore?.auth"
        title="Login"
        value="Login"
        prepend-icon="mdi-login"
        to="/login"
      >
      </v-list-item>

      <v-list-item
        v-if="!authStore?.auth"
        title="Registration"
        value="Registration"
        prepend-icon="mdi-account-plus"
        to="/registration"
      >
      </v-list-item>

      <v-list-item
        v-if="authStore?.auth"
        title="Users"
        value="Users"
        prepend-icon="mdi-account-multiple"
        to="/users-list"
      >
      </v-list-item>

      <!-- <v-list-item
        v-if="authStore?.auth"
        title="Discussions"
        value="Discussions"
        prepend-icon="mdi-message-text"
        to="/discussions"
      >
      </v-list-item> -->
    </v-list>

    <v-divider></v-divider>

    <v-list v-if="authStore?.auth">
      <v-list-item
        title="Logout"
        value="Logout"
        prepend-icon="mdi-logout"
        @click="logout"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
