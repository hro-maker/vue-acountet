<template>
    <div class="col s12 m6 bk">
            <div>
            <div class="page-subtitle">
                <h4>Создать</h4>
            </div>

            <form @submit.prevent="onsubmit">
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
                Создать
                <i class="material-icons right">send</i>
                </button>
            </form>
            </div>
        </div>
</template>
<script>
import {required,minValue} from 'vuelidate/lib/validators'
export default {
    data() {
        return {
            title:'',
            limite:100
        }
    },
    methods:{
           async onsubmit(){
                if(this.$v.$invalid){
                    this.$v.$touch()
                    return
                    }
                    try {
                 const category= await  this.$store.dispatch('createcategory',{
                    title:this.title,
                    limite:this.limite
                        })
                    this.title=''
                    this.limite=100
                    this.$v.$reset()
                    this.$message('категориа была создана')
                    this.$emit('creted',category)
                    } catch (e) { 
                    }
            }
    },
    mounted(){
        M.updateTextFields()
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