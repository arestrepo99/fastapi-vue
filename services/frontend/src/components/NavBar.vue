<template>
  <!-- <header>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="/">Vuex</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul v-if="isLoggedIn" class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Productos</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin">Admin</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/profile">My Profile</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="logout">Log Out</a>
            </li>
          </ul>
          <ul v-else class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register">Register</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Log In</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header> -->
  <header>
    <q-toolbar class="bg-black text-white">
      <q-toolbar-title>
        Vuex App
      </q-toolbar-title>
      
      <q-btn flat dense class="navBarItem" to="/" v-if="isLoggedIn">Home</q-btn>
      <q-btn flat dense class="navBarItem" to="/productos" v-if="isLoggedIn">Productos</q-btn>
      <q-space />
      <q-btn flat dense class="navBarItem" to="/profile" v-if="isLoggedIn">My Profile</q-btn>
      <q-btn flat dense class="navBarItem" icon="notifications"  v-if="isLoggedIn"><q-badge floating color="red">2</q-badge></q-btn>
      <q-btn flat dense class="navBarItem" to="/admin" v-if="isLoggedIn">Admin</q-btn>
      <q-btn flat dense class="navBarItem" @click="logout" v-if="isLoggedIn">Log Out</q-btn>
      <q-btn flat dense class="navBarItem" to="/register" v-if="!isLoggedIn">Register</q-btn>
      <q-btn flat dense class="navBarItem" to="/login" v-if="!isLoggedIn">Log In</q-btn>

    </q-toolbar>
  </header>

</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NavBar',
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('logOut');
      this.$router.push('/login');
    }
  },
});
</script>

<style scoped>
a {
  cursor: pointer;
}
.navBarItem {
  margin-left: 10px;
}
</style>
