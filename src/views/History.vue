<template>
   
   <div>
  <div class="page-title">
    <h3>История записей</h3>
  </div>

  <div class="history-chart">
    <canvas ref="canvas" ></canvas>
  </div>
    <Loader v-if="loading"/>
    <p class="center" v-else-if="!records.length">записей пока нет</p>
  <section v-else>
   <Historytable :records="items"/>
   <Paginate
   class="cl"
   v-model="page"
   :page-count="pageCount"
   :click-handler="pagechangehandler"
   :prev-text="'назад'"
   :next-text="'вперёд'"
   :container-class="'pagination'"
   :page-class="'waves-effect'"
   />
  </section>
</div>
</template>
<script>
import { Pie } from 'vue-chartjs'
import paginationmixins from '../mixins/pagination.mixin'
import Historytable from '../components/Historytable'
import currencyfilter from '../filters/currency.filter'
export default {
   metaInfo:{
        title:'История'
    },
  name:'history',
  extends:Pie,
  mixins:[paginationmixins],
  data() {
    return {
      loading:true,
      records:[],
      categories:[],
      
    
    }
  },
  
  
  async mounted() {
      this.records= await this.$store.dispatch('fetchRecorts')
     this.categories= await this.$store.dispatch('fetchcategory')
   this.setupe()
      this.loading=false
     
  },
  methods: {
    setupe(){
        this.setupPagination( this.records.map(rec =>{
        return{
          ...rec,
          categoriname:this.categories.find(cat => cat.id === rec.categoryid).title,
          typeclass: rec.type === 'income'?'green':'red',
          typetext:rec.type === 'income'?'доход':'расход'
        }
      }))
      this.renderChart(
       {
      labels: this.categories.map(cat => cat.title),
      datasets: [
        {
          label: 'Data One',
          backgroundColor: ['black','white','yellow','#f87979','rgba(51,51,51,.12)'],
          data: this.categories.map(c=>{
            return this.records.reduce((total,r)=>{
              if(r.categoryid === c.id && r.type === 'outcome'){
                total += +r.amount
              }
              return total
            },0)
          })
        }
      ]
    },
    {
      responsive: true,
      maintainAspectRatio: false
    })
    }
  },
  components:{
      Historytable
  }
}
</script>
<style lang="scss" scoped>
.cl{
  background-color: #fff;
  display: flex;
  justify-content: center;
}
</style>