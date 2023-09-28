<template>
	<header>
		<q-toolbar class="bg-black text-white" v-if="spaceWidth>0">
			<q-btn flat dense square size="lg" to="/" >Mellosky</q-btn>
			<q-btn flat dense square class="navBarItem" to="/" v-if="isLoggedIn">Home</q-btn>
			<q-btn flat dense square class="navBarItem" to="/dashboard" v-if="isLoggedIn">Productos</q-btn>
			<q-space ref="space"/>
			<q-btn flat dense square class="navBarItem" to="/profile" v-if="isLoggedIn">My Profile</q-btn>

			<q-btn flat dense square class="navBarItem" icon="notifications"  v-if="isLoggedIn">
				<q-badge floating color="red">1</q-badge>
				<q-menu>
				<q-list style="min-width: 200px">
					<q-item clickable>
						<!-- Avatar -->
						<q-item-section avatar>
							<q-avatar icon="notifications"/>
						</q-item-section>
						<q-item-section>Wellcome To MellowSky!</q-item-section>
					</q-item>
					<!-- <q-item clickable>
						<q-item-section>Notification 2</q-item-section>
					</q-item> -->
				</q-list>
				</q-menu>
			</q-btn>
			<!-- <q-btn-dropdown dense square icon="notifications" v-if="isLoggedIn" > -->
<!-- 				
				<q-list>
					<q-item clickable>
						<q-item-section>Notification 1</q-item-section>
					</q-item>
					<q-item clickable>
						<q-item-section>Notification 2</q-item-section>
					</q-item>
				</q-list>
				
			</q-btn-dropdown> -->
			<q-btn flat dense square class="navBarItem" to="/admin" v-if="isLoggedIn&&user.is_superuser">Admin</q-btn>
			<q-btn flat dense square class="navBarItem" @click="logout" v-if="isLoggedIn">Log Out</q-btn>
			<q-btn flat dense square class="navBarItem" to="/register" v-if="!isLoggedIn">Register</q-btn>
			<q-btn flat dense square class="navBarItem" to="/login" v-if="!isLoggedIn">Log In</q-btn>
		</q-toolbar>
		<q-toolbar class="bg-black text-white" v-else>
			<q-btn flat dense square size="lg" to="/" >Vuex App</q-btn>
			<q-space ref="space"/>

			<q-btn-dropdown stretch flat icon="more_vert" class="navBarItem">
				<q-list>
					<q-item v-if="isLoggedIn" clickable @click="$router.push('/')">
						<q-item-section>Home</q-item-section>
					</q-item>
					<q-item v-if="isLoggedIn" clickable @click="$router.push('/dashboard')">
						<q-item-section>Productos</q-item-section>
					</q-item>
					<q-item v-if="isLoggedIn" clickable @click="$router.push('/profile')">
						<q-item-section>My Profile</q-item-section>
					</q-item>
					<q-item v-if="isLoggedIn&& user.is_superuser" clickable @click="$router.push('/admin')">
						<q-item-section>Admin</q-item-section>
					</q-item>
					<q-item v-if="isLoggedIn" clickable @click="logout">
						<q-item-section>Log Out</q-item-section>
					</q-item>
					<q-item v-if="!isLoggedIn" clickable @click="$router.push('/register')">
						<q-item-section>Register</q-item-section>
					</q-item>
					<q-item v-if="!isLoggedIn" clickable @click="$router.push('/login')">
						<q-item-section>Log In</q-item-section>
					</q-item>
				</q-list>
			</q-btn-dropdown>
			<!-- <q-btn flat dense square class="navBarItem" to="/" v-if="isLoggedIn">Home</q-btn>
			<q-btn flat dense square class="navBarItem" to="/dashboard" v-if="isLoggedIn">Productos</q-btn>
			<q-separator />
			<q-btn flat dense square class="navBarItem" to="/profile" v-if="isLoggedIn">My Profile</q-btn>
			<q-btn flat dense square class="navBarItem" icon="notifications"  v-if="isLoggedIn"><q-badge floating color="red">2</q-badge></q-btn>
			<q-btn flat dense square class="navBarItem" to="/admin" v-if="isLoggedIn&&user.is_superuser">Admin</q-btn>
			<q-btn flat dense square class="navBarItem" @click="logout" v-if="isLoggedIn">Log Out</q-btn>
			<q-btn flat dense square class="navBarItem" to="/register" v-if="!isLoggedIn">Register</q-btn>
			<q-btn flat dense square class="navBarItem" to="/login" v-if="!isLoggedIn">Log In</q-btn> -->
		</q-toolbar>
	</header>
</template>

<!-- <template>
	<header>
		<q-toolbar class="bg-black text-white">
			<q-btn flat dense square size="lg" to="/">Vuex App</q-btn>
			<q-space ref="space"/>
			<q-btn flat dense square class="navBarItem" icon="more_vert" @click="toggleDropdown"></q-btn>
			
			<q-menu ref="dropdown" anchor="top right" :offset="[0, 5]">
				<q-list>
					<q-item v-if="isLoggedIn" clickable @click="$router.push('/')">
						<q-item-section>Home</q-item-section>
					</q-item>
					<q-item v-if="isLoggedIn" clickable @click="$router.push('/dashboard')">
						<q-item-section>Productos</q-item-section>
					</q-item>
					<q-item v-if="isLoggedIn" clickable @click="$router.push('/profile')">
						<q-item-section>My Profile</q-item-section>
					</q-item>
					<q-item v-if="isLoggedIn&& user.is_superuser" clickable @click="$router.push('/admin')">
						<q-item-section>Admin</q-item-section>
					</q-item>
					<q-item v-if="isLoggedIn" clickable @click="logout">
						<q-item-section>Log Out</q-item-section>
					</q-item>
					<q-item v-if="!isLoggedIn" clickable @click="$router.push('/register')">
						<q-item-section>Register</q-item-section>
					</q-item>
					<q-item v-if="!isLoggedIn" clickable @click="$router.push('/login')">
						<q-item-section>Log In</q-item-section>
					</q-item>
				</q-list>
			</q-menu>
		</q-toolbar>
	</header>
</template> -->

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
	name: 'NavBar',
	computed: {
		...mapGetters({ user: 'stateUser', isLoggedIn: 'isAuthenticated' }),
	},
	data() {
		return {
			spaceWidth: 1,
		};
	},
	methods: {
		async logout () {
			await this.$store.dispatch('logOut');
			this.$router.push('/login');
		},
		onResize (el) {
			this.spaceWidth = el[0].contentRect.width;
			// console.log(this.$refs.space.$el.offsetWidth);
		},
	},
	mounted() {
		// Add resize observer to the space element
		const resizeObserver = new ResizeObserver(this.onResize);
		resizeObserver.observe(this.$refs.space.$el);
	},
	beforeUnmount() {
		// Remove resize observer from the space element
		const resizeObserver = new ResizeObserver(this.onResize);
		resizeObserver.unobserve(this.$refs.space.$el);
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
