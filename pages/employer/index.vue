<template>
    <page-landing
    v-if="!user"
    @confirm-params="onConfirmParams"
    :filters="filters"
    :cities="cities.data"
    :resumes="resumes"
    :role="tempRole">
    </page-landing>
    <page-resumes
    v-else
    @confirm-params="onConfirmParams"
    :filters="filters"
    :cities="cities.data"
    :resumes="resumesWithResponses"
    :role="role"
    :onResponse="onResponse">
    </page-resumes>
</template>

<router>
    meta:
        name: 'Главная'
</router>

<script>
import PageLanding from '@/components/employer/PageLanding'
import PageResumes from '@/components/employer/PageResumes'
import { mapState, mapGetters } from 'vuex'
export default {
    components: {
        PageLanding,
        PageResumes
    },
    computed: {
        ...mapState(['user', 'resumes', 'cities', 'role', 'tempRole', 'limitPagination']),
        ...mapGetters(['resumesWithResponses'])
    },
    mounted() {
        console.log(this.resumesWithResponses)
    },
    data: () => ({
        filters: {
            salary: [0, 0],
            work_exp: [0, 0],
            cities: [],
            position: '',
        },
        sort: 'date_desc'
    }),
    methods: {
        async onConfirmParams({ sort_by, isDrop, currentPage }) {
            if (sort_by) this.sort = sort_by
            if (isDrop) {
                this.filters = {
                    salary: [0, 0],
                    work_exp: [0, 0],
                    cities: [],
                    position: ''
                }
            }
            const params = {
                position: this.filters.position,
                cities: this.filters.cities,
                min_salary: this.filters.salary[0] ? this.filters.salary[0] : null,
                max_salary: this.filters.salary[1] ? this.filters.salary[1] : null,
                min_work_exp: this.filters.work_exp[0] ? this.filters.work_exp[0] : null,
                max_work_exp: this.filters.work_exp[1] ? this.filters.work_exp[1] : null,
                sort_by: this.sort,
                page: currentPage,
                limit: this.limitPagination,
            }
            
            await this.$store.dispatch('getEntities', {
                entityName: 'resumes',
                params
            })
        },
        onResponse(item) {
            this.$store.commit('SET_ITEMS', {
                entityName: 'tempForm',
                response: JSON.parse(JSON.stringify(item))
            })
            this.$modal.show('ResponseModal')
        }
    },
    async asyncData({ store, $axios }) {
        if (!store.state.user) {
            store.commit('SET_ITEMS', {
                entityName: 'limitPagination',
                response: 4
            })
            store.commit('SET_ITEMS', {
                entityName: 'view',
                response: 'grid'
            })
        }
        try {
            await store.dispatch('getEntities', {
                entityName: 'resumes',
                $axios,
                params: {
                    limit: store.state.limitPagination,
                    page: 1,
                    sort_by: 'date_desc'
                }
            })
            await store.dispatch('getEntities', {
                entityName: 'cities',
                $axios
            })
            if (!store.state.user) return
            await store.dispatch('getEntities', {
                entityName: 'profile/responses',
                stateName: 'responses',
                $axios,
            })
        } catch(e) {
            console.log(e)
        }
        
    },
}
</script>