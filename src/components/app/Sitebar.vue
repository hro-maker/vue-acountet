<template>
       <ul class="sidenav app-sidenav forr" :class="{open : value}" >
      <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="activee"
      :to="link.url"
      exact
      >
        <a href="#" class="waves-effect forc pointer"> {{link.title}} </a>
      </router-link>
     
    </ul>
</template>
<style lang="scss" scoped>
.activee{
    background-color: #ccc;
    color: #000;
}
.forr{
  background-color: #000;
}
.forc{
  color: #ffffff;
}
  
</style>
<script>
export default {
    props:['value'],
    data:()=>({
        links:[
             {title:'Счет',url:'/'},
             {title:'История',url:'/history'},
             {title:'Планирование',url:'/planning'},
             {title:'Новая запись',url:'/record'},
             {title:'Категории',url:'/categories'},
        ]
       
    })
}
</script>