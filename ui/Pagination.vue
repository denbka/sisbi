<template>
    <el-pagination
    background
    layout="prev, pager, next"
    prev-text="назад"
    next-text="вперед"
    @current-change="currentPage => $emit('confirm-params', currentPage)"
    :page-size="limit"
    :total="total">
    </el-pagination>
</template>

<script>
export default {
    props: {
        total: {
            type: Number,
            required: true
        },
        itemsInPage: {
            type: Number,
            required: true
        }
    },
    computed: {
        limit() {
            return this.$store.state.limitPagination
        }
    }
}
</script>

<style lang="sass" scoped>
    .el-pagination
        margin-top: 50px
</style>