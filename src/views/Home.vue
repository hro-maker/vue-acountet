<template>
      <div>
  <div class="page-title">
    <h3>Счет</h3>

    <button class="btn waves-effect waves-light btn-small">
      <i @click="refresh" class="material-icons" >refresh</i>
    </button>
  </div>
<Loader v-if="loading"/>
  <div v-else class="row">
      <Homebill 
      :rates="currency.conversion_rates"
      />
      <Homecurrency
      :rates="currency.conversion_rates"
      :date="currency.time_last_update_utc"
      />
   
  </div>
</div>
</template>

<script>
import Homebill from '../components/Homebill'
import Homecurrency from '../components/Homecurency'

export default {
  metaInfo:{
        title:'Счет'
    },
  name: 'Home',
  data:()=>({
    loading:true,
    currency:null
  }),
  async mounted(){
        this.currency=await this.$store.dispatch('fetchCurrency')
        this.loading=false
  },
  methods:{
      async refresh(){
        this.loading=true
         setTimeout(()=>{
              console.log('hello')
        },2000)
        this.currency=await this.$store.dispatch('fetchCurrency')
       
        this.loading=false
      }
  },
  components:{
      Homebill,Homecurrency
  }
}
</script>
