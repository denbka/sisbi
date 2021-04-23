<template>
    <div class="wrapper">
        <div class="search">
            <input
            class="search__input"
            placeholder="Какую работу ищем?">
            <div class="search__filter">
                <el-input
                placeholder="Фильтры">
                </el-input>
            </div>
            <button class="search__button">
                <i class="el-icon-search"></i>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        
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
</style>