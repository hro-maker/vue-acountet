<template>
    <div>
  <div class="page-title">
    <h3>Профиль</h3>
  </div>

  <form class="form" @submit.prevent="onsub" >
    <div class="input-field">
      <input
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
          v-model="name"
          id="description"
          type="text"
      >
      <label for="description">Имя</label>
      <span v-if="$v.name.$dirty && !$v.name.required"
            class="helper-text invalid">поле не должно быть пустым</span>
        <span v-if="$v.name.$dirty && !$v.name.minLength"
         class="helper-text invalid">минимальная длина {{$v.name.$params.minLength.min}}. сейчас он {{name.length}}</span>
    </div>

    

    <button class="btn waves-effect waves-light" type="submit">
      Обновить
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
import {email,required,minLength} from 'vuelidate/lib/validators'
export default {
   metaInfo:{
        title:'Профиль'
    },
    data() {
      return {
        name:''
      }
    },
    mounted(){
        this.name=this.info.name
        setTimeout(() => {
          M.updateTextFields()
        });
         
    },
    methods: {
      ...mapActions(['updateinfo']),
      onsub(){
        if(this.$v.$invalid){
        this.$v.$touch()
        return
      }

      this.updateinfo({
        name:this.name
      })
      }
    },
    validations:{
      name:{required,minLength:minLength(6)}
  },
  computed:{
      ...mapGetters(['info'])
  }
}
</script>
<style lang="scss">
.switch{
  margin-bottom: 7px;
}
</style>