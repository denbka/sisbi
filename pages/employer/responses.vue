<template>
    <profile-wrapper>
        <div class="responses">
            <carousel-cards
            :role="role"
            :items="vacancies">
            </carousel-cards>
            <div class="responses__offers">
                <!-- <Sorts
                :stats="resumes.data"
                :role="role"
                @on-sort="sort_by => $emit('confirm-params', { sort_by })">
                </Sorts> -->
                <div class="wrapper-block">
                    <h3>Резюме на вакансию</h3>
                    <component-list
                    @confirm-params="currentPage => $emit('confirm-params', { currentPage })"
                    class="list"
                    :data="vacancyResponses">
                    </component-list>
                </div>
            </div>
        </div>
    </profile-wrapper>
</template>

<router>
    meta:
        name: 'Отклики'
</router>

<script>
import ApplicantNav from '@/components/applicant/Navigation'
import ProfileForm from '@/components/applicant/profile/form'
import ProfileWrapper from '@/components/applicant/profile/profileWrapper'
import CarouselCards from '@/components/CarouselCards'
import { mapState, mapGetters } from 'vuex'
export default {
    components: {
        ApplicantNav,
        ProfileForm,
        ProfileWrapper,
        CarouselCards
    },
    computed: {
        ...mapState(['user', 'vacancies', 'vacancyResponses']),
        ...mapGetters([])
    },
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        const role = store.state.role
        await store.dispatch('getEntities', {
            entityName: 'profile/responses',
            stateName: 'responses'
        })

        await store.dispatch('getEntities', {
            entityName: 'profile/vacancies',
            stateName: 'vacancies'
        })
        store.commit('SET_VACANCY_RESPONSES', store.state.vacancies.data[0].id)
        return {
            role
        }
    },
}
</script>

<style lang="sass" scoped>
    .responses
        width: 100%
</style>