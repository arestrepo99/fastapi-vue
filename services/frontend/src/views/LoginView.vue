<template>
  <section>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <q-input 
          type="text" 
          name="username" 
          v-model="form.username"
          label="Username" 
          required 
          :error="logginError!=null"
          :error-message="logginError"
          />
      </div>
      <div class="mb-3">
        <q-input 
          type="password" 
          name="password" 
          v-model="form.password" 
          label="Password" 
          required
          :error="logginError!=null"
        />
      </div>
      <q-btn type="submit" style="width:100%" label="Submit" />
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
      },
      loading: false,
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
      this.loading = true;
      try {
        await this.logIn(User);
        this.$router.push('/dashboard');
      } catch (error) {
        this.loading = false;
        throw 'Username or password is incorrect. Please try again.';
      }
      this.loading = false;
    }
  }
});
</script>
