<template>
<div class="home-work">
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
    <search-component>
    </search-component>
    <section class="vacancies">
        <div class="wrapper">
            <h3 class="title">Вакансии</h3>
            <component-list
            v-if="vacancies"
            :data="vacancies">
            </component-list>
        </div>
    </section>
    <section class="how">
        <div class="wrapper">
            <div class="how-container">
                <h3 class="title">Как это работает</h3>
                <p class="desc">
                    Поиск и отбор талантов — основная задача для каждого бизнеса. <br>
                    Мы знаем, как сделать этот процесс простым и удобным.
                </p>
                <div class="content">
                    <div class="content__item">
                        <div class="content__item__block"></div>
                        <h4>Lorem impsum</h4>
                        <p>Being the savage's bowsman, that is, the person who pulled the bow-oar in his boat (the second one from forwa.</p>
                    </div>
                    <div class="content__item">
                        <div class="content__item__block"></div>
                        <h4>Lorem impsum</h4>
                        <p>Being the savage's bowsman, that is, the person who pulled the bow-oar in his boat (the second one from forwa.</p>
                    </div>
                    <div class="content__item">
                        <div class="content__item__block"></div>
                        <h4>Lorem impsum</h4>
                        <p>Being the savage's bowsman, that is, the person who pulled the bow-oar in his boat (the second one from forwa.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
</template>

<script>
import SectionHeader from '@/components/SectionHeader'
import ChangeRole from '@/components/ChangeRole'
import SearchComponent from '@/components/SearchComponent'
import ComponentList from '@/components/ComponentList'
import { mapState } from 'vuex'
export default {
    components: {
        SectionHeader,
        ChangeRole,
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
    .vacancies
        .wrapper
            flex-direction: column
    .title
        text-align: center
        font-size: 36px
        margin: 200px 0 100px 0
    .how
        margin-bottom: 250px
    .how-container
        width: 100%
        text-align: center
        display: flex
        flex-direction: column
        h3
            margin-bottom: 42px
        .desc
            margin-bottom: 47px
        .content
            display: flex
            width: 100%
            line-height: 40px
            &__item
                display: flex
                flex-direction: column
                align-items: center
                margin-right: 25px
                h4
                    font-size: 24px
                p
                    line-height: 30px
                &__block
                    width: 50px
                    height: 50px
                    background: #62BEFC
                    margin-bottom: 15px
            &__item::last-child
                margin-right: 0

            
</style>