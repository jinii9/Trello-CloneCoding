import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Board from '../components/Board.vue'
import Card from '../components/Card.vue'
import NotFound from '../components/NotFound.vue'

// 추가해줘야 VueRouter 사용 가능
Vue.use(VueRouter)

const requireAuth = (to, from, next) => {
  // 로컬스토리지에 토큰 있는지 확인
  const isAuth = localStorage.getItem('token')
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}` // 로그인페이지에 갔다가 로그인 완료 시, 다시 현재 페이지로 돌아와야하므로 returnPath 지정
  isAuth ? next() : next(loginPath)
}


// 라우터 만들기
const router = new VueRouter({
  mode: 'history', // hash뱅 - 크롬에는 history api 있으므로
  routes : [
    { path:'/', component: Home, beforeEnter: requireAuth },
    { path:'/login', component: Login },
    { path:'/b/:bid', component: Board, beforeEnter: requireAuth, children: [
      { path: 'c/:cid', component: Card, beforeEnter: requireAuth }
    ] },
    { path: '*', component: NotFound } // 차례대로 없으면 마지막인 이게 뜨게 됨
  ]
})


export default router