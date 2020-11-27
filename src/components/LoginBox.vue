<template>
  <div class="container">
    <div class="round-box" style="width:250px !important">
      <div class="blue-background" > <h2> Dashboard Login </h2> </div>

      <input v-model="state.username" id="username" type="text" placeholder="Enter User Name"/>

      <input v-model="state.password" id="password" type="password" placeholder="Enter Password"/>
      <br/>

      <button :disabled="isDisabled" v-on:click="login">Login</button>
    </div>

  </div>

</template>

<script>
import { reactive, computed } from 'vue';
import { loginUser } from '../service/APIservice';
import router from '../router/index';

export default {
  name: "LoginBox",
  setup() {

    const state = reactive({
      username: '',
      password: '',
    })

    const isDisabled = computed(()=>{
      if(state.username === '' || state.password === '') {
        return true
      } else {
        return false
      }
    })

    function login() {
        loginUser(state.username, state.password).then(res=>{
          if(res.token){
            localStorage.setItem('token', res.token)
            router.push('/dashboard/1')
          }
        }, err=>{
          console.log(err);
          alert('Invalid username or password')
        })
    }


    return {
      state,
      isDisabled,
      login
    }
  }
}
</script>
