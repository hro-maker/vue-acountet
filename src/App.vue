<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
    
  </div>
</template>
<script>
import EmptyLayout from '../src/layouts/Empty'
import MainLayout from '../src/layouts/Main'
export default {
  computed:{
    layout(){
      console.log()
      return (this.$route.meta.layout||'empty')+'-layout'
    }
  },
  components:{
      EmptyLayout,MainLayout
  }
}
</script>
<style lang="scss">
  @import '~materialize-css/dist/css/materialize.min.css';
  @import 'assets/index.css';
</style>
