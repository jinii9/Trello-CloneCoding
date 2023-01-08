import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:3000'
const UNAUTHORIZED = 401
const onUnauthorized = () => {
  router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`)
}

const request = (method, url, data) => {
  return axios({
    method, 
    url: DOMAIN + url, 
    data
  }).then(result => result.data)
    .catch(result => {
      const {status} = result.response
      if (status === UNAUTHORIZED) onUnauthorized()
      throw result.response
    })
}

// 토큰 정보 받아서 모든 request 날리기 전에 헤더값을 토큰 정보로 설정하기 
export const setAuthInHeader = token => {
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
}

export const board = {
  fetch() {
    return request('get', '/boards')
  }
}

export const auth = {
    login(email, password) {
        return request('post', '/login', {email, password})
    }
}