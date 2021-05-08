<template>
    <div class="applicant-navigation">
        <nuxt-link active-class="nav-active" exact no-prefetch :to="`/${role}`">Главная</nuxt-link>
        <nuxt-link active-class="nav-active" exact no-prefetch :to="`/${role}/profile`">Профиль</nuxt-link>
        <nuxt-link active-class="nav-active" v-if="isApplicant" exact no-prefetch :to="`/applicant/resumes`">Мои резюме</nuxt-link>
        <nuxt-link active-class="nav-active" v-if="!isApplicant" exact no-prefetch :to="`/employer/vacancies`">Мои вакансии</nuxt-link>
        <!-- <nuxt-link active-class="nav-active" exact no-prefetch to="#">Избранные</nuxt-link>
        <nuxt-link  active-class="nav-active" exact no-prefetch to="#">Подписка</nuxt-link> -->
        <nuxt-link active-class="nav-active"  exact no-prefetch :to="`/${role}/responses`">Отклики</nuxt-link>
    </div>
</template>

<script>
export default {
    computed: {
        role() {
            return this.$store.state.role
        },
        isApplicant() {
            return this.role === 'applicant'
        }
    }
}
</script>

<style lang="sass" scoped>
    .applicant-navigation
        margin-bottom: 100px
        display: flex
        a
            font-weight: bold
            margin-right: 40px
            text-decoration: none
            &:hover
                // color: #F05F3F
        a:last-child
            margin: 0
        .nav-active
            // color: #F05F3F
</style>