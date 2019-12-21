import Vue from 'vue'
import App from './App.vue'
import router from './router'
import PrettyCheckbox from 'pretty-checkbox-vue';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import moment from 'moment';

Vue.prototype.$moment = moment;

Vue.config.productionTip = false
Vue.use(PrettyCheckbox);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

const firebaseConfig = {
    apiKey: "AIzaSyAfqAR4SG4rDwqlHQBBNjdChcTc2QdS11w",
    authDomain: "todo-app-vue-46463.firebaseapp.com",
    databaseURL: "https://todo-app-vue-46463.firebaseio.com",
    projectId: "todo-app-vue-46463",
    storageBucket: "todo-app-vue-46463.appspot.com",
    messagingSenderId: "758538143861",
    appId: "1:758538143861:web:9a2333d29b5ae8b369103c"
};


const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp.firestore()
export const db = firebase.firestore();
export { firebase };