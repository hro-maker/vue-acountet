<template>
       <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#" @click="$emit('toggle')">
            <i class="material-icons black-text">dehaze</i>
          </a>
          <span class="black-text">{{date | date('datetime')}}</span>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a
                class="dropdown-trigger black-text"
                href="#"
                data-target="dropdown"
                ref="dropdawn"
            >
              {{name}}
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id='dropdown' class='dropdown-content'>
              <li>
                <router-link to="/profile" class="black-text">
                  <i class="material-icons">account_circle</i>Профиль
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a href="#" class="black-text" @click.prevent="logaut">
                  <i class="material-icons">assignment_return</i>Выйти
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
</template>
<script>
export default {
  data() {
    return {
      date:new Date(),
      intervall:null,
      dropdown:null
    }
  },
  computed:{
      name(){
        return this.$store.getters.info.name
      }
  },
  methods: {
   async logaut(){
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  },
  mounted(){
   this.interval= setInterval(()=>{
        this.date=new Date()
    },1000)
   this.dropdown=M.Dropdown.init(this.$refs.dropdawn)
  },
  beforeDestroy() {
    clearInterval(this.intervall)
    if(this.dropdown && this.dropdown.destroy){
      this.dropdown.destroy()
    }
  }
}
</script>