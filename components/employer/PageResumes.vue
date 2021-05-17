<template>
    <div class="applicant">
        <div class="search-container">
            <search-component
            @confirm-params="$emit('confirm-params', {})"
            :filters="filters"
            :role="role">
            </search-component>
        </div>
        <section class="resumes">
            <div class="wrapper">
                <Sorts
                :stats="resumes"
                :role="role"
                @on-sort="sort_by => $emit('confirm-params', { sort_by })">
                </Sorts>
                <div class="wrapper-block">
                    <component-list
                    @confirm-params="currentPage => $emit('confirm-params', { currentPage })"
                    class="list-parent"
                    :data="resumes"
                    :onResponse="onResponse">
                    </component-list>
                    <Filters
                    class="wrapper-block__filters"
                    @confirm-params="isDrop => $emit('confirm-params', { isDrop })"
                    :filters="filters"
                    :cities="cities">
                    </Filters>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import SearchComponent from '@/components/SearchComponent'
import ComponentList from '@/components/ComponentList'
import Sorts from '@/components/Sorts'
import Filters from '@/components/Filters'
import { mapState } from 'vuex'
export default {
    components: {
        SearchComponent,
        ComponentList,
        Filters,
        Sorts
    },
    props: {
        filters: {
            type: Object,
            required: true
        },
        resumes: {
            type: Object,
            required: true
        },
        cities: {
            type: Array,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        onResponse: {
            type: Function,
            required: true
        },
    }
}
</script>

<style lang="sass" scoped>
    .search-container
        margin: 150px 0 200px 0
    .resumes
        .wrapper
            flex-direction: column
            &-block
                display: flex
                width: 100%
                .list-parent
                    flex: 0.8
    
    @media screen and (max-width: 1024px)
        .resumes .wrapper-block
            display: flex
            flex-direction: column !important
            .list-parent
                order: 1
            &__filters
                order: 0
    @media screen and (max-width: 1024px)
        .search-container
            margin: 100px 0

</style>