// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import "ant-design-vue/dist/antd.css";
import BootstrapVue from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import * as Bootstrap from "bootstrap";
import router from "./router";
import Axios from "axios";
import store from "./store";
import firebase from "firebase";
import "firebase/firebase-analytics";
import "firebase/firebase-app";

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
Vue.config.debug = true;
Vue.config.devtools = true;
Vue.use(BootstrapVue);
Vue.use(Bootstrap);
Vue.router = router;

var firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_ATH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATA_BASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

/* eslint-disable no-new */
let app = "";
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
