<template>
    <div class="applicant-navigation">
        <nuxt-link active-class="nav-active" exact no-prefetch to="/applicant">Главная</nuxt-link>
        <nuxt-link active-class="nav-active" exact no-prefetch to="/applicant/profile">Профиль</nuxt-link>
        <nuxt-link active-class="nav-active" exact no-prefetch to="/applicant/resumes">Резюме</nuxt-link>
        <nuxt-link active-class="nav-active" exact no-prefetch to="#">Избранные</nuxt-link>
        <nuxt-link  active-class="nav-active" exact no-prefetch to="#">Подписка</nuxt-link>
        <nuxt-link active-class="nav-active"  exact no-prefetch to="#">Отклики</nuxt-link>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="sass" scoped>
    .applicant-navigation
        margin-bottom: 100px
        display: flex
        a
            color: #363848
            font-weight: bold
            margin-right: 40px
            text-decoration: none
            &:hover
                color: #F05F3F
        a:last-child
            margin: 0
        .nav-active
            color: #F05F3F
</style>