<template>
    <div class="employer-home">
        <div class="wrapper">
            <section-header
            imgname="employer-illustration">
                <template slot="title">
                    <mark>Видео</mark> резюме <br>
                    найдется <br>
                    для каждого
                </template>
                <template slot="subtitle">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <br>
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </template>
                <template slot="handlers">

                </template>
            </section-header>
            <div class="applicant">
                <div class="search-container">
                    <search-component
                    @confirm-params="$emit('confirm-params', {})"
                    :filters="filters"
                    :role="role">
                    </search-component>
                </div>
                <section class="resumes">
                    <div class="resumes__info">
                        <h3>Резюме</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy 
                            nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat
                        </p>
                    </div>
                    <!-- <Sorts
                    :stats="resumes"
                    :role="role"
                    @on-sort="sort_by => $emit('confirm-params', { sort_by })">
                    </Sorts> -->
                    <div class="wrapper-block">
                        <component-list
                        @confirm-params="currentPage => $emit('confirm-params', { currentPage })"
                        class="list-parent"
                        :data="resumes">
                        </component-list>
                        <!-- <Filters
                        class="wrapper-block__filters"
                        @confirm-params="isDrop => $emit('confirm-params', { isDrop })"
                        :filters="filters"
                        :cities="cities">
                        </Filters> -->
                    </div>
                </section>
            </div>
        </div>
        <section-how></section-how>
    </div>
</template>

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
    props: {
        filters: {
            type: Object,
            required: true
        },
        resumes: {
            type: Object,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        cities: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="sass" scoped>
    .employer-home .wrapper
        flex-direction: column
    .search-container
        margin-bottom: 200px
    .resumes
        &__info
            text-align: center
            h3:after
                content: 'Рекомендуем'
                font-size: 14px
                margin-left: 15px
                color: $primaryColorApplicant
            p
                width: 600px
                margin: 25px auto
                margin-bottom: 100px
        .wrapper
            flex-direction: column
            margin-bottom: 100px
            &-block
                display: flex
                width: 100%
                .list-parent
                    flex: 1
    
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
    @media screen and (max-width: 800px)
        .resumes
            &__info
                p
                    width: 100%
                    padding: 0 30px
</style>