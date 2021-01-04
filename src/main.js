import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Vuelidate from 'vuelidate'
import store from './store'
import Datefilter from './filters/date.filter'
import 'materialize-css/dist/js/materialize.min'
import MessegPlugin from './utils/MessegPlugin'
import firebase from 'firebase/app'
import Loader from './components/app/Loader'
import 'firebase/auth'
import VueMeta from 'vue-meta'
import Paginate from 'vuejs-paginate'
import 'firebase/database'
import currencyfilter from './filters/currency.filter';
import tooltipdirective from './components/directives/tooltip.directive'
Vue.config.productionTip = false
Vue.filter('date',Datefilter)
Vue.use(MessegPlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.component('Loader',Loader)
Vue.component('Paginate', Paginate)
Vue.filter('currency',currencyfilter)
Vue.directive('tooltip',tooltipdirective)
firebase.initializeApp({
  apiKey: "AIzaSyC-XUcysnpBmIEvJBOands4Pq9ZI5Q577Y",
  authDomain: "acountet-vue.firebaseapp.com",
  projectId: "acountet-vue",
  storageBucket: "acountet-vue.appspot.com",
  messagingSenderId: "638392208619",
  appId: "1:638392208619:web:92e5b8cbcacc6c585202ae"
})
let app
firebase.auth().onAuthStateChanged(()=>{
  if(!app){
    app=new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
 
})


