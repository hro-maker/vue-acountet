<template>
    <div>
  <div class="page-title">
    <h3>Новая запись</h3>
  </div>

  <Loader v-if="loading" />
  <p v-else-if="!categoryes.length" class="center"> категории нет <router-link active-class="flow-text" to="/categories" >добавить категорию </router-link> </p>
  <form  v-else class="form bk" @submit.prevent="onsub">
    <div class="input-field" >
      <select ref="select" v-model="category" >
        <option
        v-for="cat in categoryes"
        :key="cat.id"
        :value="cat.id"
        > {{cat.title}} </option>
      </select>
      <label class="strong">Выберите категорию</label>
    </div>

    <p>
      <label>
        <input
            class="with-gap "
            name="type"
            type="radio"
            value="income"
            v-model="type"
        />
        <span>Доход</span>
      </label>
    </p>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
        />
        <span>Расход</span>
      </label>
    </p>

    <div class="input-field">
      <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: ($v.amount.$dirty && !$v.amount.minValue)||($v.amount.$dirty && !$v.amount.required)}"
      >
      <label for="amount">Сумма</label>
      <span
      v-if="($v.amount.$dirty && !$v.amount.minValue)||($v.amount.$dirty && !$v.amount.required)"
       class="helper-text invalid">Минимальная величина {{$v.amount.$params.minValue.min}}</span>
    </div>

    <div class="input-field">
      <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
      >
      <label for="description">Описание</label>
      <span 
      v-if="$v.description.$dirty && !$v.description.required"
       class="helper-text invalid">description пароль</span>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      Создать
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>

</template>
<style lang="scss" scoped>
    .bk{
      background-color: #fff;
      border: 2px solid black;
      padding: 6px;
    }
    button{
      margin-left: 30%;
    }
    .strong{
      font-weight: 500;
      font-size: 17px;
      color: black;
      margin-top: -10px;
    }
   
</style>
<script>
import {required,minValue}from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'
export default {
  metaInfo:{
        title:'Новая запись'
    },
  name:'recort',
  data() {
    return {
      select:null,
      loading:true,
      categoryes:[],
      category:null,
      type:'income',
      amount:100,
      description:''
    }
  },
  computed: {
    ...mapGetters(['info']),
    cancreaterecoret(){
      if(this.type === 'income'){
        return true
      }
      return this.info.bill >= this.amount      
    }
  },
  methods: {
    async  onsub(){
       if(this.$v.$invalid){
                this.$v.$touch()
                return
            }
         if(this.cancreaterecoret){
           try {
           await this.$store.dispatch('createRecord',{
              categoryid:this.category,
              amount:this.amount,
              description:this.description,
              type: this.type,
              date: new Date().toJSON()
              })
             const bill= this.type==='income'?this.info.bill + this.amount:this.info.bill - this.amount
             
            await this.$store.dispatch('updateinfo',{bill})
             this.$message('запись успешна создано')
             this.amount=1
             this.description=''
             this.$v.reset()
             
           } catch (e) {
             
           }
        
         }   else{
           this.$message(`недостаточно средств на счете(${this.amount-this.info.bill})`)
         }
    }
  },
  validations:{
      amount:{required,minValue:minValue(100)},
      description:{required}
  },
 destroyed() {
        if(this.select && this.select.destroy){
            this.select.destroy()
        }
   },
 async mounted (){
    this.categoryes= await this.$store.dispatch('fetchcategory')
    this.loading=false
   
    if(this.categoryes.length){
      this.category=this.categoryes[0].id
      
    }
    setTimeout(() => {
        this.select=M.FormSelect.init(this.$refs.select)
         M.updateTextFields()
    }, 0);
  
  }

}
</script>