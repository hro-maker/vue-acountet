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
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Войти
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Нет аккаунта?
      <router-link to="/register">Зарегистрироваться</router-link>
    </p>
  </div>
</form>
</template>
<script>
import {email,required,minLength} from 'vuelidate/lib/validators'
import messages from '../utils/messages';
export default {
  metaInfo:{
        title:'вход'
    },
  data() {
    return {
      email:'',
      password:''
    }
  },
  validations:{
      email:{email,required},
      password:{required,minLength:minLength(6)}
  },
  mounted(){
    if(messages[this.$route.query.message]){
           this.$message(messages[this.$route.query.message])
    }
   
  },
  methods:{
   async submitform(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const formData={
        email:this.email,
        password:this.password
      }
      try {
      await this.$store.dispatch('login',formData)
      this.$router.push('/')
      } catch (e) {
        
      }
      this.email=''
      this.password=''
    }
  }
}
</script>