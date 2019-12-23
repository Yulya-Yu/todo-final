import Vue from 'vue'
import App from './App.vue'
import router from './router'
import PrettyCheckbox from 'pretty-checkbox-vue';
import firebase from 'firebase'
import 'firebase/firestore'
import moment from 'moment';

Vue.prototype.$moment = moment;

Vue.config.productionTip = false
Vue.use(PrettyCheckbox);


var firebaseConfig = {
    apiKey: "AIzaSyAfqAR4SG4rDwqlHQBBNjdChcTc2QdS11w",
    authDomain: "todo-app-vue-46463.firebaseapp.com",
    databaseURL: "https://todo-app-vue-46463.firebaseio.com",
    projectId: "todo-app-vue-46463",
    storageBucket: "todo-app-vue-46463.appspot.com",
    messagingSenderId: "758538143861",
    appId: "1:758538143861:web:76ebab33b3b7a23769103c"
};


const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()


Vue.$db = db


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

export default firebaseApp.firestore()