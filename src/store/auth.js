import firebase from "firebase/app";

export default {
	state: {},
	mutations: {},
	actions: {
		async login({ commit }, { email, password }) {
			try {
				await firebase.auth().signInWithEmailAndPassword(email, password);
			} catch (e) {
				commit("setError", e);
				throw e;
			}
		},
		async logout({ commit }) {
			await firebase.auth().signOut();
			commit('clearInfo');
		},
		async registr({ commit }, { email, password, name }) {
			try {
				await firebase.auth().createUserWithEmailAndPassword(email, password);
				const user = firebase.auth().currentUser;
				await firebase.database().ref(`/users/${user?.uid}/info`).set({
					bill: 1000,
					name
				});
			} catch (e) {
				commit("setError", e)
				throw e;
			}
		},
	},
	modules: {},
};
