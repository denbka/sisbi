<template>
    <div class="resume-form-container">
        <div class="wrapper">
            <bread-crumb
            :action="action">
            </bread-crumb>
            <h3
            v-if="action === 'create'">
                Обо мне
            </h3>
            <user-form
            v-if="action === 'create'"
            :action="action"
            :form="userForm">
            </user-form>
            <div v-else style="margin-top: 50px"></div>
            <h3 v-if="action === 'create'">О Вакансии</h3>
            <vacancy-form
            @onSubmit="onSubmit"
            :form="form"
            :action="action">
            </vacancy-form>
        </div>
    </div>
</template>

<router>
    meta:
        name: 'Создание вакансии'
</router>

<script>
import VacancyForm from '@/components/employer/vacancies/form'
import UserForm from '@/components/applicant/resumes/userForm'
import BreadCrumb from '@/ui/BreadCrumb'
import moment from 'moment'
export default {
    components: {
        VacancyForm,
        UserForm,
        BreadCrumb
    },
    data: () => ({
        workPlaceForm: null,
        tempPlaceForm: {
            position : null,
            company : null,
            description : null,
            start_date : null,
            end_date : null,
            resume_id : null
        },
        workPlaceType: null,
        id: null
    }),
    methods: {
        async onSubmit() {
            // Нужно будет пикать по кд сфа в мид после каждой тычки жжать f9 и писать оскорбления в чат а потом прожимать zxc и не попадать
            try {
                const response  = await this.$store.dispatch('saveEntity', {
                    entityName: 'vacancies',
                    data: {...this.form, ...this.userForm},
                    method: this.action === 'edit' ? 'put' : 'post',
                    id: this.id
                })
                this.$router.push({ path: `/video`, query: { entity_id: response.id } })
            } catch(e) {
                console.log(e)
            }
        },
    },
    async asyncData({ route, store, params, query, $axios }) {
        const { action } = params
        store.commit('SET_ITEMS', {
            entityName: 'actionForm',
            response: action
        })
        const userForm = JSON.parse(JSON.stringify(store.state.user))
        userForm.bdate = userForm.bdate ? moment(userForm.bdate.split('-').reverse().join('-')) : null
        console.log(userForm.bdate)
        // let form = {
        //     position: null,
        //     salary: null,
        //     city_id: null,
        //     schedule: null,
        //     description: null,
        //     work_experience: null
        // }
        let form = {
            position: 'Тест резюме ',
            salary: 99000,
            city_id: '44f19802-f354-4276-bec7-cff45c2e9dbe',
            schedule: '5/2',
            description: 'Ищем зхс 3с гуля для борьбы с говнокодом',
            work_experience: 0
        }
        const id = query.entity_id

        if (action !== 'create' && id) {
            try {
                form = await store.dispatch('getEntities', {
                    entityName: 'vacancies',
                    id,
                    inStore: false,
                    $axios
                })
                form.city_id = form.city.id
                delete form.city
                await store.dispatch('getEntities', {
                    entityName: 'cities',
                    $axios
                })
                console.log(form)
            } catch(e) {
                console.log(e)
            }
        }

        const getTitle = (action) => {
            switch (action) {
                case 'create': return 'Создание'
                case 'read': return 'Просмотр'
                case 'edit': return 'Редактирование'
            }
        }

        const title = getTitle(action)
        return {
            action,
            form,
            title,
            userForm,
            id
        }
    },
    head() {
        return {
            title: `${this.title} резюме`
        }
    }
}
</script>

<style lang="sass">
.resume-form-container
    .el-form-item
        display: flex
        &__content
            display: flex
            flex: 1
            .el-select, .el-date-editor
                width: 100%
        &__label
            flex: 1
    .wrapper
        flex-direction: column
        h3
            margin: 115px auto
    
    @media screen and (max-width: 768px)
        h3
            margin: 50px auto !important
            font-size: 24px
</style>