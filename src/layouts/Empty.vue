<template>
   <div class="darken-1 empty-layout forbg">
       <router-view/>
   </div>
</template>
<style lang="scss">
    .forbg{
        background: url(./p.jpg)center center/cover no-repeat;
    }
</style>
<script>
import messages from '../utils/messages'
export default {
    computed:{
        error(){
            return this.$store.getters.error
        }
    },watch:{
        error(fberror){
            console.log(fberror)
            this.$error(messages[fberror.code]|| 'что то пошло не так')
        }
    }
}
</script>