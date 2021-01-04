<template>
<div>
  <loader v-if="loading"/>
  <div v-else-if="record">
    <div class="breadcrumb-wrap">
      <router-link to="/history" class="breadcrumb">История</router-link>
      <a @click.prevent class="breadcrumb">
       {{record.type==='income'?'доход':'расход'}}
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div
        :class="record.type==='income'?'green':'red'"
         class="card">
          <div class="card-content white-text">
            <p>Описание:  <span class="sp"> {{record.description}} </span>  </p>
            <p>Сумма:  <span class="sp"> {{record.amount | currency}}</span> </p>
            <p>Категория:  <span class="sp"> {{record.categoriname}}</span> </p>

            <small class="sp">{{record.date|date('datetime')}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p v-else class="center">запись не найдена</p>
</div>
</template>
<script>
import Loader from '../components/app/Loader.vue'
export default {
  components: { Loader },
  metaInfo:{
        title:'Описание'
    },
  name:'detail',
  data() {
    return {
      record:null,
      loading:true
    }
  },
  async mounted() {
    const id=this.$route.params.id
    const record= await this.$store.dispatch('fetchRecortbyid',id)
    const categori=await this.$store.dispatch('fetchcategoribyid',record.categoryid)
    this.record={
      ...record,
      categoriname:categori.title
    }
    
    this.loading=false
  },

}
</script>
<style lang="scss" scopet>
  p{
    font-size: 17px;
    color: black;
  }
  .sp{
    font-size: 20px;
    letter-spacing: 1px;
    font-weight: 500;
    
    text-align: center;
    color: black;
  }
</style>