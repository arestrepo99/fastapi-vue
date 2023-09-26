<template>
  <section>
    <!-- Margin sides  -->
    <div style="margin-left: 15%; margin-right: 15%;">
      <form @submit.prevent="submit">
        <q-input 
          type="text" 
          name="username" 
          v-model="user.username"
          label="Username" 
          required 
          :error="registerError!=null"
          style="width:100%"
          />
        <q-input
          type="text"
          name="full_name"
          v-model="user.full_name"
          label="Full Name"
          required
          :error="registerError!=null"
          style="width:100%"
        />
        <q-input 
          type="password" 
          name="password" 
          v-model="user.password" 
          label="Password" 
          required
          :error="registerError!=null"
          style="width:100%"
        />

        
        <span style="color:red padding: 10px;">
          {{ registerError }}
        </span>
        <q-btn type="submit" style="width:100%" label="Register" ></q-btn>

      </form>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
  name: 'RegisterView',
  data() {
    return {
      user: {
        username: '',
        full_name: '',
        password: '',
      },
      registerError: null,
    };
  },
  methods: {
    ...mapActions(['register']),
    async submit() {
      try {
        await this.register(this.user);
        this.$router.push('/dashboard');
      } catch (error) {
        this.registerError = error.response.data.detail;
      }
    },
  },
  beforeUnmount() {

  },
});
</script>
