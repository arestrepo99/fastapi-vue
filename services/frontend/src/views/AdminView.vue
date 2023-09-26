<template>
  <h1>Admin Page</h1>
</template>

<script>
    import { defineComponent } from 'vue';
    import { mapGetters, mapActions } from 'vuex';
    
    export default defineComponent({
        name: 'DashboardView',
        data() {
        return {
            form: {
            title: '',
            content: '',
            },
        };
        },
        created: function() {
        return this.$store.dispatch('getNotes');
        },
        computed: {
        ...mapGetters({ notes: 'stateNotes'}),
        },
        methods: {
        ...mapActions(['createNote']),
        async submit() {
            await this.createNote(this.form);
        },
        },
    });
</script>
  
<style>
h1, h2, h3, h4, h5, h6 { margin-bottom: 0; margin-top: 0;}
</style>