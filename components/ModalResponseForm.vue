<template>
    <div class="response-form">
        <div class="header">
            <h3>Выберите вакансию для приглашения</h3>
        </div>
        <el-radio-group
        v-if="vacancies.data"
        v-model="choicedItemId">
            <el-radio
            v-for="item in vacancies.data"
            :key="item.id"
            :label="item.id"
            border>
                {{item.position}}
            </el-radio>
        </el-radio-group>
        <div class="handlers">
            <el-button
            @click="onResponse"
            type="primary">
                Отправить приглашение
            </el-button>
            <el-button
            type="info"
            @click="$modal.hide('ResponseModal')">
                Закрыть
            </el-button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data: () => ({
        choicedItemId: null
    }),
    computed: {
        ...mapState({
            data: state => state.tempForm,
            vacancies: state => state.vacancies
        })
    },
    methods: {
        async onResponse() {
            const data = {
                resume_id: this.data.id,
                vacancy_id: this.choicedItemId,
            }
            await this.$store.dispatch('saveEntity', {
                entityName: 'responses',
                data,
                method: 'post'
            })
        }
    },
    async mounted() {
        if (!this.vacancies.data.length) {
            await this.$store.dispatch('getEntities', {
                entityName: 'profile/vacancies',
                stateName: 'vacancies'
            })
            this.choicedItem = this.vacancies.data[0].id
        }
    },
}
</script>

<style lang="sass" scoped>
    .response-form
        margin: 25px
        min-width: 800px
        min-height: 50vh
        display: flex
        flex-direction: column
        justify-content: space-between
        .handlers
            text-align: center
    @media screen and (max-width: 900px)
        .response-form
            min-width: auto
            height: 100%
            .header h3
                font-size: 18px !important
            .handlers
                width: 100%
                display: flex
                flex-direction: column
                button
                    margin: 0
                button:first-child
                    height: 50px
                    margin-bottom: 25px
</style>