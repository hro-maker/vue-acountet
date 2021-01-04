import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import recort from './recort'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error:null
  },
  mutations: {
    setError(state,error){
      state.error=error
    },
    clearError(state){
      state.error=null
    }
  },
  getters:{
    error:s=>s.error
  },
  actions:{
   async fetchCurrency(){
    //  const key=process.env.VUE_APP_FIXER
  //  const res= await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB,GEL`)
   const rek= await fetch(`https://v6.exchangerate-api.com/v6/a24b1c114d9bf7bbf706d305/latest/EUR`)
  return  await rek.json()

  }
  },
  modules: {
    auth,info,category,recort
  }
})
