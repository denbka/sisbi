<template>
    <div class="wrapper">
        <div class="search">
            <input
            v-model="filters.position"
            @keydown.enter="$emit('confirm-params')"
            class="search__input"
            :placeholder="renderPlaceholder">
            <!-- <div class="search__filter">
                <el-input
                placeholder="Фильтры">
                </el-input>
            </div> -->
            <button
            :disabled="loading"
            @click="$emit('confirm-params')"
            class="search__button">
                <i v-if="!loading" class="el-icon-search"></i>
                <i v-else class="el-icon-loading"></i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        role: {
            type: String,
            required: true
        },
        filters: {
            type: Object,
            required: true
        }
    },
    computed: {
        renderPlaceholder() {
            return this.role === 'applicant' ? 'Какую работу ищем?' : 'Какое резюме ищем?'
        },
        loading() {
            return this.$store.state.listLoading
        }
    }
}
</script>

<style lang="sass" scoped>
    .search
        display: flex
        width: 100%
        height: 110px
        position: relative
        &__input
            display: flex
            width: 100%
            height: 100%
            border-radius: 100px
            border: 1px solid #e7e7e7
            font-size: 24px
            padding-left: 50px
        &__filter
            position: absolute
            top: 50%
            right: 100px
            transform: translate(-50%, -50%)
        &__button
            position: absolute
            top: 50%
            right: -20px
            transform: translate(-50%, -50%)
            font-size: 24px
            border-radius: 100px
            height: 80px
            width: 80px
            border: 0
            background: #F05F3F
            color: #fff
            cursor: pointer
            &:disabled
                cursor: not-allowed
                background: #5473ff
    @media screen and (max-width: 700px)
        .search
            height: 80px
            &__input
                padding-left: 25px
                font-size: 18px
            &__button
                right: -40px
                // transform: translate(-50%, -50%)
                // top: 10%
    @media screen and (max-width: 369px)
        .search
            height: 60px
            &__input
                padding-left: 25px
                font-size: 14px
            &__button
                right: -30px
                width: 60px
                height: 60px
</style>