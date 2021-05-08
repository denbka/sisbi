<template>
    <div class="info-container">
        <div class="sort-container">
            <el-select v-model="sortType" @change="onSort()">
                <el-option value="date" label="По дате"></el-option>
                <el-option value="salary" label="По зарплате"></el-option>
            </el-select>
            <div class="arrows" v-if="sortType">
                <i v-if="sort_by === 'asc'" @click="onSort('desc')" class="el-icon-arrow-down"></i>
                <i v-if="sort_by === 'desc'" @click="onSort('asc')" class="el-icon-arrow-up"></i>
            </div>
            <div class="view" v-show="windowWidth >= 1366">
                <div @click="$store.commit('SET_VIEW', 'grid')" class="icon-container" :class="{'icon-container--active': view === 'grid'}">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3H3V10H10V3Z" stroke="#F05F3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21 3H14V10H21V3Z" stroke="#F05F3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21 14H14V21H21V14Z" stroke="#F05F3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 14H3V21H10V14Z" stroke="#F05F3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div @click="$store.commit('SET_VIEW', 'row')" class="icon-container" :class="{'icon-container--active': view === 'row'}">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 6H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8 12H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8 18H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 6H3.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 12H3.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 18H3.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
        <div class="info-container--stats">
            Найдено {{stats.total}} {{role === 'applicant' ? 'вакансий' : 'резюме'}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        role: {
            type: String,
            required: true
        },
        stats: {
            type: Object,
            required: true
        },
    },
    data: () => ({
        sortType: 'date',
        sort_by: 'desc'
    }),
    computed: {
        view() {
            return this.$store.state.view
        }
    },
    methods: {
        onSort(pos) {
            this.sort_by = pos ? pos : 'desc'
            this.onRequest()
            
        },
        onRequest() {
            this.$emit('on-sort', `${this.sortType}_${this.sort_by}`)
        }
    }
}
</script>

<style lang="sass" scoped>
    .info-container
        margin-bottom: 50px
        display: flex
        justify-content: space-between
        align-items: center
        &--stats
            flex: 0.2
            text-align: right
        .sort-container
            flex: 0.8
            display: flex
            align-items: center
            .arrows
                margin-left: 25px
                font-size: 20px
                font-weight: bold
                cursor: pointer
        .view
            margin-left: auto
            display: flex
            .icon-container
                cursor: pointer
                display: flex
                padding: 10px
                border-radius: 10px
                align-items: center
                justify-content: center
                background: #e5e5e5
                svg path
                    stroke: #fff
                &--active
                    background: #F05F3F
                    svg path
                        stroke: #fff
            .icon-container:last-child
                margin-left: 15px
    
    @media screen and (max-width: 700px)
        .view
            display: none !important
        .info-container
            &--stats
                flex: 0.5
                text-align: right
                font-size: 14px
            .sort-container
                flex: 0.5
                    
</style>