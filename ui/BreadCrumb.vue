<template>
    <div class="steps">
        <!-- <nuxt-link active-class="nav-active" exact to="/microphone">Проверка микрофона</nuxt-link>
        <span>/</span> -->
        <nuxt-link active-class="nav-active" :to="`/${role}/${getEntity}/${$route.query.entity_id ? 'edit' : 'create'}/${$route.query.entity_id ? `?entity_id=${$route.query.entity_id}` : ''}`">Заполнение формы</nuxt-link>
        <span v-if="$route.query.entity_id">/</span>
        <nuxt-link v-if="$route.query.entity_id" active-class="nav-active" exact :to="`/video?entity_id=${$route.query.entity_id}`">Запись видео</nuxt-link>
    </div>
</template>

<script>
export default {
    computed: {
        role() {
            return this.$store.state.role
        },
        getEntity() {
            return this.role === 'applicant' ? 'resumes' : 'vacancies'
        },
        action() {
            return this.$store.state.actionForm
        }
    }
}
</script>

<style lang="sass">
    .steps
        width: 500px
        margin: 0 auto
        margin-top: 50px
        display: flex
        justify-content: center
        a
            color: #C4C6D5
            margin: auto
            text-decoration: none
            &:hover
                text-decoration: underline
        .nav-active
            color: #636363
            font-weight: bold
        span
            font-weight: bold
            color: #C4C6D5
    @media screen and (max-width: 768px)
        .steps
            margin: 0 auto
            margin-top: 50px
            width: 100%
            a
                font-size: 14px

    @media screen and (max-width: 500px)
        .steps
            a
                font-size: 10px
</style>