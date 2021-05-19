<template>
    <profile-wrapper v-if="vacancies.data.length">
        <div class="profile-resumes">
            <div class="settings">
                <nuxt-link class="search__button" to="/employer/vacancies/create">Добавить вакансию</nuxt-link>
            </div>
            <component-list
            :handleDelete="handleDelete"
            :tooltips="['edit', 'delete']"
            :data="vacancies"
            :isProfile="true">
            </component-list>
        </div>
    </profile-wrapper>
    <Stub :role="role" v-else>
        <span>Вы еще не добавили вакансию</span>
        <nuxt-link to="vacancies/create">Добавить</nuxt-link>
    </Stub>
</template>

<router>
    meta:
        name: 'Мои вакансии'
</router>

<script>
import Stub from '@/components/applicant/Stub'
import ComponentList from '@/components/ComponentList'
import ProfileWrapper from '@/components/applicant/profile/profileWrapper'
import { mapState } from 'vuex'
export default {
    components: {
        Stub,
        ComponentList,
        ProfileWrapper
    },
    computed: {
        ...mapState(['vacancies', 'role'])
    },
    methods: {
        async handleDelete(id) {
            try {
                await this.$store.dispatch('removeEntity', {
                    entityName: 'resumes',
                    id,
                    inStore: true
                })
            } catch(e) {
                console.log(e)
            }
        }
    },
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error, $axios}) {
        await store.dispatch('getEntities', {
            entityName: 'profile/vacancies',
            stateName: 'vacancies',
            $axios,
        })
    },
}
</script>

<style lang="sass" scoped>
    .profile-resumes
        width: 100%
        display: flex
        flex-direction: column

        .settings
            margin-bottom: 50px
    
    @media screen and (max-width: 500px)
        .search__button
            width: 100% !important


</style>