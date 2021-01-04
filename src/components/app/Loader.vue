<template>
     <div class="preloader-wrapper center active">
          <div class="spinner-layer" :class="color">
           <div class="circle-clipper left">
            <div class="circle"></div>
             </div><div class="gap-patch">
              <div class="circle"></div>
         </div><div class="circle-clipper right">
         <div class="circle"></div>
             </div>
               </div>
            </div>
</template>
<style lang="scss" scoped>
.center{
    margin-left: 48%;
    margin-top: 10%;
}
</style>
<script>
export default {
  computed:{
        color(){
            const colors=['spinner-red-only','spinner-blue-only','spinner-green-only']
            return colors[Math.floor(Math.random()*3)]
        }
    } 
}
</script>
 
