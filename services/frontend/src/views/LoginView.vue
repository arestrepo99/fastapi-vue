<template>
  <section>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label for="username" class="form-label">Username:</label>
        <input type="text" name="username" v-model="form.username" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input type="password" name="password" v-model="form.password" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </section>
  {{ logginError }}
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
  name: 'LoginView',
  data() {
    return {
      form: {
        username: '',
        password:'',
      }
    };
  },
  computed: {
    ...mapGetters(['logginError'])
  },
  methods: {
    ...mapActions(['logIn']),
    async submit() {
      const User = new FormData();
      User.append('username', this.form.username);
      User.append('password', this.form.password);
      try {
        await this.logIn(User);
        this.$router.push('/dashboard');
      } catch (error) {
        throw 'Username or password is incorrect. Please try again.';
      }
    }
  }
});
</script>
