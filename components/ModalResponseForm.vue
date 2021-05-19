<template>
    <div class="response-form">
        <div class="header">
            <h3>Выберите {{entity === 'vacancies' ? 'вакансию' : 'резюме'}} для отклика</h3>
        </div>
        <el-radio-group
        v-model="choicedItemId">
            <el-radio
            v-for="item in items"
            :key="item.id"
            :label="item.id"
            border>
                {{item.position}}
            </el-radio>
        </el-radio-group>
        <div class="handlers">
            <el-button
            :disabled="disabled"
            @click="onResponse"
            type="primary">
                Отправить приглашение
            </el-button>
            <el-button
            type="info"
            @click="$modal.hide('ResponseModal')">
                Закрыть
            </el-button>
            <div v-if="error" style="color: red; margin-top: 25px">{{error}}</div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: {
        onConfirmParams: {
            type: Function,
            required: false
        },
    },
    data: () => ({
        choicedItemId: null,
        entity: null,
        items: [],
        disabled: false,
        error: null
    }),
    computed: {
        ...mapState({
            data: state => state.tempForm,
            vacancies: state => state.vacancies,
            resumes: state => state.resumes,
            role: state => state.role
        })
    },
    methods: {
        async onResponse() {
            this.error = null
            this.disabled = true
            const data = {
                resume_id: this.role === 'employer' ? this.data.id : this.choicedItemId,
                vacancy_id: this.role === 'employer' ? this.choicedItemId : this.data.id,
            }
            try {
                await this.$store.dispatch('saveEntity', {
                    entityName: 'responses',
                    data,
                    method: 'post',
                    inStore: false
                })
                await this.onConfirmParams()
                this.$modal.hide('ResponseModal')
            } catch(e) {
                console.log(e)
                this.error = 'Такой отклик уже существует'
            } finally {
                this.disabled = false
            }
        },
        async connect() {
            console.log("Send...");
            this.$connection.invoke("SendMessage", "s", "hello")
            .catch(function (err) {
                return console.error(err.toString())
            })
        },
    },
    async mounted() {
        this.entity = this.role === 'employer' ? 'vacancies' : 'resumes'
        this.items = this.data.itemsWithoutResponse
        this.choicedItem = this.items[0].id
    },
}
</script>

<style lang="sass" scoped>
    .response-form
        margin: 25px
        min-width: 400px
        min-height: 50vh
        display: flex
        flex-direction: column
        justify-content: space-between
        .header h3
                font-size: 24px !important
        .el-radio-group
            margin: 25px 0
            display: flex
            flex-direction: column
            .el-radio
                margin: 5px 0
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