<template>
   <div>
  <div class="page-title">
    <h3>Планирование</h3>
    <h4>{{info.bill | currency}}</h4>
  </div>
    <Loader v-if="loading"/>
    <p v-else-if="!categoryes.length" class="center"> категории нет <router-link active-class="flow-text" to="/categories" >добавить категорию </router-link> </p>
  <section v-else >
    <div class="bg" v-for="cat of categoryes" :key="cat.id" >
      <p class="ft" style="font-size:25px">
        <strong >{{cat.title}}:</strong>
        {{cat.spend | currency}} из {{cat.limite| currency}}
      </p>
      <div style="heigth:40px" class="progress white" v-tooltip="cat.tooltipe">
        
        <div
            class="determinate"
            style="heigth:40px"
            :class="[cat.progrescolor]"
            :style="{width:cat.progrespercent+'%'}"
        ></div>
      </div>
    </div>
  </section>
</div>
</template>
<style lang="scss" >
  .bg{
    background-color: rgb(58, 44, 44);
    color: white;
    padding-bottom: 1px;
  }
  .ft{
    color: rgb(212, 156, 156);
    opacity: 1;
  }
</style>
<script>
import {mapGetters}from 'vuex'
import currencyfilter from '../filters/currency.filter'
export default {
  metaInfo:{
        title:'Планирование'
    },
  name:'planning',
  data() {
    return {
      loading:true,
      categoryes:[]                                                             
    }
  },
  computed:{
      ...mapGetters(['info'])
  },

  async mounted() {
    const records= await this.$store.dispatch('fetchRecorts')
    const categoryes= await this.$store.dispatch('fetchcategory')
    this.categoryes=categoryes.map(cat=>{
          const spend= records
    .filter(rec =>rec.categoryid===cat.id)
    .filter(rec=>rec.type==='outcome')
    .reduce((total,am)=>{
        return total += +am.amount
    },0)
    const percent= 100*spend/cat.limite
    const progrespercent= percent>100?100:percent
    const progrescolor=percent<60?'green':percent<100?'yellow':'red'
    const tooltipeValue=cat.limite-spend
    const tooltipe=`${tooltipeValue<0?'превышение':'осталась'} ${currencyfilter( Math.abs(tooltipeValue))}`

    return{
      ...cat,
      progrespercent,
      progrescolor,
      spend,
      tooltipe
    }
    })
   this.loading=false
  },
}
</script>