<template>
    <profile-wrapper>
        <div class="responses">
            <carousel-cards
            :tooltips="['edit']"
            :role="role"
            :items="resumes"
            :isProfile="true">
            </carousel-cards>
            <div class="responses__offers">
                <!-- <Sorts
                :stats="resumes.data"
                :role="role"
                @on-sort="sort_by => $emit('confirm-params', { sort_by })">
                </Sorts> -->
                <div class="wrapper-block">
                    <component-list
                    @confirm-params="currentPage => $emit('confirm-params', { currentPage })"
                    class="list"
                    :isResponses="true"
                    :role="role"
                    :data="responses"
                    :onRead="onRead"
                    :onVerdict="onVerdict">
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
    mounted() {
        console.log(this.responses)
    },
    computed: {
        ...mapState(['user', 'resumes', 'responses', 'tempForm']),
    },
    methods: {
        async onVerdict(role, response_id, type) {
            try {
                const response = await this.$axios.$post(`/profile/responses/${response_id}/${type}`)
                this.$store.commit('SET_ITEMS', {
                    entityName: 'tempForm',
                    response: JSON.parse(JSON.stringify({...this.tempForm, fullData: {...this.tempForm.fullData, status: `${type}ed`}}))
                })
                console.log(response)
                await this.getResponses()
            } catch(e) {
                console.log(e)
            }
        },
        async onRead(role, response_id) {
            try {
                const response = await this.$axios.$get(`/profile/responses/${response_id}`)
                console.log(response)
            } catch(e) {
                console.log(e)
            }
        },
        async getResponses() {
            try {
                const response = await this.$axios.$get('/profile/responses', {
                    params: {
                        resume_id: this.resumes.data[this.$store.state.initialIndex].id
                    }
                })
                this.$store.commit('SET_ITEMS', {
                    entityName: 'responses',
                    response
                })
            } catch(e) {
                console.log(e)
            }
        }
    },
    async asyncData({isDev, route, store, $axios, env, params, query, req, res, redirect, error}) {
        const role = store.state.role
        try {
            await store.dispatch('getEntities', {
                entityName: 'profile/resumes',
                stateName: 'resumes'
            })

            const response = await $axios.$get('/profile/responses', {
                params: {
                    resume_id: store.state.resumes.data[0].id
                }
            })
            store.commit('SET_ITEMS', {
                entityName: 'responses',
                response
            })

            console.log(response)
        } catch(e) {
            console.log(e)
        }
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