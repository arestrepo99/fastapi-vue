<template>
	<section>
		<h2>Productos</h2>

		<hr/><br/>
		<div v-if="notes.length" class="fit row wrap justify-center items-start content-start center" style="overflow: hidden;">
			<div v-for="note in notes" :key="note.id" style="margin: 10px; width: 100%; max-width: 250px;">
				<q-card class="my-card">
				<q-img :src="note.img_url||'https://cdn.quasar.dev/img/parallax2.jpg'">
					<div class="absolute-bottom row" style="font-size: 0.5em;">
						<div class="col">
							<div class="text-h6">{{ note.title }}</div>
							<div class="text-subtitle2">{{ note.content }}</div>
						</div>
						<div class="col">
							<!-- <q-btn flat label="Order" icon="add_shopping_cart" style="font-size: 4em;"/> -->
							<q-btn flat label="Add to Cart" icon="add_shopping_cart" style="font-size: 1.4em;" />
						</div>
						<!-- <div class="col"> -->
							
						<!-- </div> -->
					</div>
				</q-img>

				<q-card-actions align="right"  v-if="user.is_superuser" >
					<q-btn flat label="Edit" icon="edit" @click="dialog.open = true; dialog.component= 'editProduct'; this.form = note" />
					<q-btn flat label="Delete" icon="delete" @click="dialog.open = true; dialog.component= 'deleteProduct'; this.form = note" />
				</q-card-actions>
				</q-card>
			</div>
		</div>
		<div v-else>
			<p>Nothing to see. Check back later.</p>
		</div>
		<!-- ALIGHT RIGHT -->
		<div class="row justify-end">
			<q-btn v-if="user.is_superuser" @click="dialog.open = true; dialog.component= 'addProduct'; this.form = {title: '', content: ''}" label="Add Product" icon="add" />
		</div>
	</section>
	<q-dialog v-model="dialog.open">
		<q-card v-if="dialog.component === 'addProduct'">
			<q-card-section>
				<q-card-section>Add Product</q-card-section>
				<q-card-section>
					<q-input v-model="form.title" label="Title" required />
					<q-input v-model="form.content" label="Content"  required />
					<q-input v-model="form.img_url" label="Image URL"  required />
				</q-card-section>
				<q-card-actions align="right">
					<q-btn flat label="Cancel" v-close-popup />
					<q-btn flat label="Submit" @click="createNote(form);" v-close-popup />
				</q-card-actions>
			</q-card-section>
		</q-card>
		<q-card v-if="dialog.component === 'editProduct'">
			<q-card-section>
				<q-card-section>Edit Product</q-card-section>
				<q-card-section>
					<q-input v-model="form.title" label="Title" required />
					<q-input v-model="form.content" label="Content"  required />
					<q-input v-model="form.img_url" label="Image URL"  required />
				</q-card-section>
				<q-card-actions align="right">
					<q-btn flat label="Cancel" v-close-popup />
					<q-btn flat label="Submit" @click="updateNote(form);" v-close-popup />
				</q-card-actions>
			</q-card-section>
		</q-card>
		<q-card v-if="dialog.component === 'deleteProduct'">
			<q-card-section>
				<q-card-section>Delete Product</q-card-section>
				<q-card-section>
					<p>Are you sure you want to delete this product?</p>
				</q-card-section>
				<q-card-actions align="right">
					<q-btn flat label="Cancel" v-close-popup />
					<q-btn flat label="Submit" @click="deleteNote(form.id);" v-close-popup />
				</q-card-actions>
			</q-card-section>
		</q-card>
	</q-dialog>
	
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
				img_url: null,
			},
			dialog: {
				open: false,
				component: 'addProduct',
			},
		};
	},
	created: function() {
		return this.$store.dispatch('getNotes');
	},
	computed: {
		...mapGetters({ notes: 'stateNotes', user: 'stateUser'}),
	},
	methods: {
		...mapActions(['createNote', 'updateNote', 'deleteNote']),
	},
});
</script>
