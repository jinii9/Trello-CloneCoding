<template>
    <div>
        Board

        <!-- 로딩 구현 -->
        <div v-if="loading">loading board...</div>
        <div v-else>
            <div>bid: {{ bid }}</div>
            
            <router-link :to="`/b/${bid}/c/1`">Card 1</router-link>
            <router-link :to="`/b/${bid}/c/2`">Card 2</router-link>
        </div>

        <hr />
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                bid: 0, // 변수 만들기
                loading: true
            }
        },

        // Board가 생성될 때 실행되는 훅
        created() {
            this.fetchData() // fetch데이터 호출
        },

        methods: {
            // 백엔드 API 호출 / 데이터 요청하는 함수
            fetchData() {
                this.loading = true
                 setTimeout(() => {
                   this.bid = this.$route.params.bid // this.$route를 통해 라우트 정보 알 수 O (Vue.use(VueRouter)덕분에)
                   this.loading = false
                 }, 500)


            }
        }
    }
</script>

<style>

</style>
