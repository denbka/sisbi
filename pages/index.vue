<template>
<div class="home-work">
    <div class="wrapper">
        <section-header
        imgname="work-illustration">
            <template slot="title">
                <mark>Работа</mark> найдется <br>
                для каждого
            </template>
            <template slot="subtitle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <br>
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </template>
        </section-header>
    </div>
    <search-component
    @confirm-params="onConfirmParams"
    :filters="filters"
    :role="$cookiz.get('tempRole')">
    </search-component>
    <section class="vacancies">
        <div class="wrapper">
            <h3 class="title">Вакансии</h3>
            <div class="wrapper-block">
                <component-list
                @confirm-params="onConfirmParams"
                class="list-parent"
                :data="vacancies">
                </component-list>
            </div>
        </div>
    </section>
    <section-how></section-how>
</div>
</template>

<router>
    meta:
        name: 'Главная'
</router>

<script>
import SectionHeader from '@/components/SectionHeader'
import ChangeRole from '@/components/ChangeRole'
import SearchComponent from '@/components/SearchComponent'
import ComponentList from '@/components/ComponentList'
import SectionHow from '@/components/SectionHow'
import { mapState } from 'vuex'
export default {
    components: {
        SectionHeader,
        ChangeRole,
        SearchComponent,
        ComponentList,
        SectionHow
    },
    data: () => ({
        filters: {
            position: ''
        }
    }),
    computed: {
        ...mapState(['vacancies'])
    },
    methods: {
        async onConfirmParams() {
            await this.$store.dispatch('getEntities', {
                entityName: 'vacancies',
                params: {
                    ...this.filters
                }
            })
        }
    },
    async asyncData({ store, $axios }) {
        // store.commit('SET_ITEMS', {
        //     entityName: 'view',
        //     response: 'grid'
        // })
        await store.dispatch('getEntities', {
            entityName: 'vacancies',
            $axios,
        })
    }
}
</script>

<style lang="sass" scoped>
    .vacancies
        .wrapper
            flex-direction: column
    .title
        text-align: center
        font-size: 36px
        margin: 200px 0 100px 0

    @media screen and (max-width: 1024px)
        .title
            text-align: center
            font-size: 36px
            margin: 100px 0
            
</style>