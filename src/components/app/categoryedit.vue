<template>
   <div class="col s12 m6 bk">
            <div>
            <div class="page-subtitle">
                <h4>Редактировать</h4>
            </div>

            <form @submit.prevent="submittt">
                <div class="input-field" >
                <select ref="select" v-model="current">
                    <option
                    v-for="c in categories"
                    :key="c.id"
                    :value="c.id"
                    >{{c.title}}</option>
                </select>
                <label>Выберите категорию</label>
                </div>

                <div class="input-field">
                <input
                    v-model="title"
                    id="name"
                    type="text"
                    :class="{invalid : $v.title.$dirty && !$v.title.required}"
                >
                <label for="name">Название</label>
                <span
                    v-if="$v.title.$dirty && !$v.title.required"
                 class="helper-text invalid">Введите название категории</span>
                </div>

                <div class="input-field">
                <input
                    v-model.number="limite"
                    id="limit"
                    type="number"
                    :class="{invalid : $v.limite.$dirty && !$v.limite.minValue}"
                >
                <label for="limit">Лимит</label>
                <span 
                v-if="$v.limite.$dirty && !$v.limite.minValue"
                class="helper-text invalid">Минимальная величина {{$v.limite.$params.minValue.min}} </span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                Обновить
                <i class="material-icons right">send</i>
                </button>
            </form>
            </div>
        </div>
</template>
<script>
import {required,minValue} from 'vuelidate/lib/validators'
export default {
    props:{
         categories:{
             type:Array,
             required:true
         }
    },
    data() {
        return {
            select:null,
             title:'',
            limite:100,
            current:null
        }
    },
    watch:{
          current(catid){
             const {title,limite}=  this.categories.find(c => c.id===catid) 
             this.title=title
                this.limite=limite
          }
    },
    methods:{
       async submittt() {
            if(this.$v.$invalid){
                this.$v.$touch()
                return
            }
            try {
                const categoridata ={
                    title:this.title,
                    limite:this.limite,
                    id:this.current
                }
                await this.$store.dispatch('updatecategory',categoridata)
                this.$message('kategoria abnavlena')
                this.$emit('updated',categoridata)
            } catch (e) {
                
            }
        }
    },
    created() {
        const {id,title,limite}=this.categories[0]
        this.current=id
        this.title=title
        this.limite=limite
    },
    mounted(){
       this.select=M.FormSelect.init(this.$refs.select)
        M.updateTextFields()
    },
    destroyed() {
        if(this.select && this.select.destroy){
            this.select.destroy()
        }
    },
    validations:{
        title:{required},
        limite:{minValue:minValue(100)}
    }
}
</script>
<style lang="scss" scoped>
     .bk{
      background-color: #fff;
      border: 2px solid black;
      padding: 6px;
    }
</style>