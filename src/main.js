import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuelidate from "vuelidate";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import store from "./store";

import Loader from '@/components/app/Loader';

import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import messagePlugin from "@/utils/message.plugin";

import "./registerServiceWorker";

import "materialize-css/dist/js/materialize.min";

Vue.config.productionTip = false;

Vue.use(Vuelidate);

Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.use(messagePlugin);

Vue.component('Loader', Loader);

var firebaseConfig = {
  apiKey: "AIzaSyARiWLPpsH_QSMnOycqCOGegWzxetlF4p0",
  authDomain: "vue-crm-2d0a0.firebaseapp.com",
  projectId: "vue-crm-2d0a0",
  storageBucket: "vue-crm-2d0a0.appspot.com",
  messagingSenderId: "862291012025",
  appId: "1:862291012025:web:474f372c875352d72cee68",
};

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
