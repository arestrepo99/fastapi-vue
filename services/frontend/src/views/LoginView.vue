<template>
  <section>
    <div style="margin-left: 15%; margin-right: 15%;">
      <form @submit.prevent="submit">
        <q-input 
          type="text" 
          name="username" 
          v-model="form.username"
          label="Username" 
          required 
          :error="logginError!=null"
          style="width:100%"
          />
        <q-input 
          type="password" 
          name="password" 
          v-model="form.password" 
          label="Password" 
          required
          :error="logginError!=null"
          style="width:100%"

        />
        <span style="color:red padding: 10px;">
          {{ logginError }}
        </span>
        <q-btn type="submit" style="width:100%" label="Login"  />
      </form>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
  name: 'LoginView',
  data() {
    return {
      form: {
        username: 'siu',
        password:'vescar-ruTho9-byrsin',
      },
      logginError: null,
      loading: false,
    };
  },
  mounted() {
    // this.submit();
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
        this.logginError = error.response.data.detail;
      }
      this.loading = false;
    }
  },
  beforeUnmount() {
    this.logginError = null;
  },
});
</script>
