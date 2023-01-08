import axios from "axios";
import router from '../router' // router = this.$router

const DOMAIN = 'http://localhost:3000'
const UNAUTHORIZED = 401
const onUnauthorized = () => {
    router.push('/login')
}


const request = (method, url, data) => {
    return axios({ // axios 함수 호출 말고 객체 형식으로 전달도 가능
        method,
        url: DOMAIN + url,
        data
    }).then(result => result.data) // body 데이터 넘겨주기
      .catch(result => { // 에러 처리
          const {status} = result.response // 에러 상태
          if (status === UNAUTHORIZED) return onUnauthorized()
          throw Error(result) // 처리되지 않은 에러들은 바로 던지도록           
      })
}

export const board = {
    fetch() {
        return request('get', '/boards')
    }
}