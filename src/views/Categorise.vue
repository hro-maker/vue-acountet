<template>
    <div>
    <div class="page-title">
        <h3>Категории</h3>
    </div>
    <section>
        <Loader v-if="loading"/>
        <div v-else class="row">
             <categoryForm @creted="oncreate" />

        <categoryedit 
        v-if="categories.length"
        :key="categories.length+updatecounter"
        @updated="updatecateg"
        :categories="categories"/>
       <p v-else class="center"> категории нет </p>
        </div>
    </section>
    </div>
</template>
<script>
import categoryForm from '../components/catecoryForm'
import categoryedit from '../components/app/categoryedit'
export default {
    metaInfo:{
        title:'Категории'
    },
    data() {
        return {
           categories:[],
           loading:true,
           updatecounter:0
        }
    },
    components:{
        categoryForm,categoryedit
    },
  async  mounted (){
        this.categories=await this.$store.dispatch('fetchcategory')
        this.loading=false
    },
    methods:{
        oncreate(category){
            this.categories.push(category)
            console.log(this.categories)
        },
        updatecateg(categoridata){
          const idx =this.categories.findIndex(el =>el.id===categoridata.id)
            this.categories[idx].title=categoridata.title
            this.categories[idx].limite=categoridata.limite
            this.updatecounter++
        }
    }
}
</script>