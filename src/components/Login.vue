<template>
  <div class="login">
    <h2>Log in to Trello</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="email">Email</label>
        <input class="form-control" type="text" name="email" 
          v-model="email" autofocus placeholder="e.g., test@test.com" />
      </div>
      <div>
        <label for="password">Passwrod</label>
        <input class="form-control" type="password" 
          v-model="password" placeholder="123123" />
      </div>
      <button  class="btn" :class="{'btn-success': !invalidForm}" type="submit" 
        :disabled="invalidForm">Log In</button>
    </form>
    <p class="error" v-if="error">{{error}}</p>
  </div>
</template>

<script>
import { auth, setAuthInHeader } from '../api'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      rPath: ''
    }
  },
  computed: {
    invalidForm() {
      return !this.email || !this.password // 하나라도 차있지 않으면
    }
  },
  // 로그인 성공 시, 현재 화면으로 리다이렉트 위해
  created() {  
    // route에서 url 파라미터 가져오기
    this.rPath = this.$route.query.rPath || '/' // 없을 시 메인경로로
  },
  methods: {
    onSubmit() {
        auth.login(this.email, this.password)
            .then(data => {
                localStorage.setItem('token', data.accessToken)

                // 로그인 완료 후, 헤더에 토큰값 넣기
                setAuthInHeader(data.accessToken)

                //리다이렉트
                this.$router.push(this.rPath)
            })
            .catch(err => {
                this.error = err.data.error
                
            })
    }
  }
}
</script>

<style>
.login {
  width: 400px;
  margin: 0 auto; 
}
.error {
  color: #f00;
}

</style>
