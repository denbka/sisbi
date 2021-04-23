<template>
    <div class="applicant">
        <div class="search-container">
            <search-component>
            </search-component>
        </div>
        <section class="vacancies">
            <div class="wrapper">
                <component-list
                :data="vacancies">
                </component-list>
            </div>
        </section>
    </div>
</template>

<script>
import SearchComponent from '@/components/SearchComponent'
import ComponentList from '@/components/ComponentList'
import { mapState } from 'vuex'
export default {
    components: {
        SearchComponent,
        ComponentList
    },
    computed: {
        ...mapState(['vacancies'])
    },
    async fetch({ store, $axios }) {
        await store.dispatch('getEntities', {
            entityName: 'vacancies',
            $axios
        })
    }
}
</script>

<style lang="sass" scoped>
    .search-container
        margin: 150px 0 200px 0
    .vacancies
        .wrapper
            flex-direction: column
</style>