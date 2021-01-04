<template>

        <div>
          <Loader v-if="loading" />
          <div v-else class="app-main-layout   forbgg">
            <Navbar @toggle="isopen=!isopen"/>
            <Sitebar v-model="isopen" />
          <main class="app-content" :class=" {full : !isopen} ">
           <div class="app-page">
          <router-view/>


        </div>
        </main>

           <div class="fixed-action-btn" data-position="top" v-tooltip="'добавить запись'">
         <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
        </router-link>
          </div>
</div>
      </div>
    
</template>
<style lang="scss">
      .forbgg{
        background: url(./1.jpg)top center/cover no-repeat;
   
      }
</style>
<script>
import Navbar from '@/components/app/Navbar'
import Sitebar from '@/components/app/Sitebar'
import Loader from '../components/app/Loader'
import messages from '../utils/messages'
name:'main-layout'
export default {
  data() {
    return {
      isopen:true,
      loading:true
    }
    
  },
 async mounted(){
      if(!Object.keys( this.$store.getters.info).length) {
        await this.$store.dispatch('fetchinfo')
      }

    this.loading=false  
  },
  components:{
    Navbar,Sitebar
  },
  computed:{
        error(){
            return this.$store.getters.error
        }
    },
    watch:{
        error(fberror){
            console.log(fberror)
            this.$error(messages[fberror.code]|| 'что то пошло не так')
        }
    }
}
</script>