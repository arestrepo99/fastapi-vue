<template>
  <header>
    <q-toolbar class="bg-black text-white">
      <q-btn flat dense square size="lg" to="/" >Vuex App</q-btn>
      <q-btn flat dense square class="navBarItem" to="/" v-if="isLoggedIn">Home</q-btn>
      <q-btn flat dense square class="navBarItem" to="/dashboard" v-if="isLoggedIn">Productos</q-btn>
      <q-space />
      <q-btn flat dense square class="navBarItem" to="/profile" v-if="isLoggedIn">My Profile</q-btn>
      <q-btn flat dense square class="navBarItem" icon="notifications"  v-if="isLoggedIn"><q-badge floating color="red">2</q-badge></q-btn>
      <q-btn flat dense square class="navBarItem" to="/admin" v-if="isLoggedIn&&user.is_superuser">Admin</q-btn>
      <q-btn flat dense square class="navBarItem" @click="logout" v-if="isLoggedIn">Log Out</q-btn>
      <q-btn flat dense square class="navBarItem" to="/register" v-if="!isLoggedIn">Register</q-btn>
      <q-btn flat dense square class="navBarItem" to="/login" v-if="!isLoggedIn">Log In</q-btn>
    </q-toolbar>
  </header>

</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'NavBar',
  computed: {
    ...mapGetters({ user: 'stateUser', isLoggedIn: 'isAuthenticated' }),
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
