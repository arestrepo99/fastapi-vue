import axios from 'axios';

const state = {
  notes: null,
  note: null
};

const getters = {
  stateNotes: state => state.notes,
  stateNote: state => state.note,
};

const actions = {
  async createNote({dispatch}, note) {
    await axios.post('notes', note);
    await dispatch('getNotes');
  },
  async getNotes({commit}) {
    let {data} = await axios.get('notes');
    commit('setNotes', data);
  },
  async viewNote({commit}, id) {
    let {data} = await axios.get(`note/${id}`);
    commit('setNote', data);
  },
  // eslint-disable-next-line no-empty-pattern
  async updateNote({dispatch}, note) {
    await axios.patch(`note/${note.id}`, {title: note.title, content: note.content, img_url: note.img_url});
    await dispatch('getNotes');
  },
  // eslint-disable-next-line no-empty-pattern
  async deleteNote({dispatch}, id) {
    await axios.delete(`note/${id}`);
    await dispatch('getNotes');
  }
};

const mutations = {
  setNotes(state, notes){
    state.notes = notes;
  },
  setNote(state, note){
    state.note = note;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
