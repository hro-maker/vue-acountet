<template>
   <form class="card auth-card" @submit.prevent="submitform">
  <div class="card-content">
    <span class="card-title">Домашняя бухгалтерия</span>
     <div class="input-field">
      <input
          v-model.trim="email"
          id="email"
          type="text"
          :class="{invalid : ($v.email.$dirty && !$v.email.required)||($v.email.$dirty && !$v.email.email )}"
      >
      <label for="email">Email</label>
      <small 
      v-if="$v.email.$dirty && !$v.email.required"
      class="helper-text invalid"
      >поле не должно быть пустым</small>
        <small 
      v-else-if="$v.email.$dirty && !$v.email.email"
      class="helper-text invalid"
      >введите корректны email</small>
    </div>
     <div class="input-field">
      <input
           v-model.trim="password"
          id="password"
          type="password"
          :class="{invalid : ($v.password.$dirty && !$v.password.required)||($v.password.$dirty && !$v.password.minLength )}"
      >
      <label for="password">Пароль</label>
      <small 
      v-if="$v.password.$dirty && !$v.password.required"
      class="helper-text invalid"
      >поле не должно быть пустым</small>
      <small 
      v-else-if="$v.password.$dirty && !$v.password.minLength"
      class="helper-text invalid"
      >минимальная длина {{$v.password.$params.minLength.min}}. сейчас он {{password.length}} </small>
    </div>
    <div class="input-field">
      <input
          v-model.trim="name"
          id="name"
          type="text"
          
      >
      <label for="name">Имя</label>
      
      <small
      v-if="$v.name.$dirty && !$v.name.required"
       class="helper-text invalid">поле не должно быть пустым</small>
    </div>
    <p>
      <label>
        <input v-model="agree" type="checkbox" />
        <span>С правилами согласен</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Зарегистрироваться
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Уже есть аккаунт?
      <router-link to="/login">Войти!</router-link>
    </p>
  </div>
</form>
</template>
<script>
import {email,required,minLength} from 'vuelidate/lib/validators'
export default {
  name:'register',
   metaInfo:{
        title:'регистрация'
    },
  data() {
    return {
      email:'',
      password:'',
      name:'',
      agree:false
    }
  },
  validations:{
      email:{email,required},
      password:{required,minLength:minLength(6)},
      name:{required},
      agree:{cheked: v=>v}
  }
  ,methods:{
  async  submitform(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const formData={
        email:this.email,
        password:this.password,
        name:this.name
      }
      try {
         await this.$store.dispatch('registr',formData)
         this.$router.push('/')
      } catch (e) {
        this.email=''
         this.password=''
         this.name=''
         this.agree=false
      }
    
    }
  }
}
</script>