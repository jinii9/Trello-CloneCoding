<template>
    <div>
        Card
        <div v-if="loading">loading card ...</div>
        <div v-else>cid: {{ cid }}</div>
    </div>    
</template>

<script>
export default {
    data() {
        return {
            cid: 0,
            loading: false
        }
    },
    watch: {
        // '$route'() { // 라우트를 감시하고 있다가 변경 시, 작동
        //     // this.cid = this.$route.params.cid
        //     this.fetchData()
        // }
        '$route' : {
            handler: 'fetchData', // fetchData 실행
            immediate: true // 즉시 실행
        }
    },
    // created() {
    //     this.fetchData()
    // },
    methods: {
        fetchData() {
            this.loading = true
            setTimeout(() => {
                this.cid = this.$route.params.cid
                this.loading = false
            }, 500)
        }
    }
}
</script>

<style>

</style>