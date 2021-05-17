<template>
    <profile-wrapper v-if="resumes.data.length">
        <div class="profile-resumes">
            <div class="settings">
                <nuxt-link class="add-resume" to="/applicant/resumes/create">Добавить резюме</nuxt-link>
            </div>
            <component-list
            :tooltips="['edit']"
            :data="resumes">
            </component-list>
        </div>
    </profile-wrapper>
    <Stub :role="role" v-else>
        <span>Вы еще не добавили резюме</span>
        <nuxt-link to="resumes/create">Добавить</nuxt-link>
    </Stub>
</template>

<router>
    meta:
        name: 'Мои резюме'
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
        ...mapState(['resumes', 'role'])
    },
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error, $axios}) {
        await store.dispatch('getEntities', {
            entityName: 'profile/resumes',
            stateName: 'resumes',
            $axios
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
        .add-resume
            display: flex
            height: 50px
            justify-content: center
            align-items: center
            background: #F05F3F
            color: #fff
            width: 300px
            border-radius: 80px
            text-decoration: none
</style>