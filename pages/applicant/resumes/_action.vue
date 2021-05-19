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
            <h3
            v-if="action === 'create'">
                О резюме
            </h3>
            <div v-else style="margin-top: 50px"></div>
            <resume-form
            @onRemovePlace="onRemovePlace"
            @editWorkPlace="editWorkPlace"
            @onSubmit="onSubmit"
            :form="form"
            :places_of_work="places_of_work"
            :action="action">
            </resume-form>
            <ui-modal name="WorkPlaceModal">
                <place-at-work-form
                @save="saveWorkPlace"
                :action="workPlaceType"
                :form="workPlaceForm">
                </place-at-work-form>
            </ui-modal>
        </div>
    </div>
</template>

<router>
    meta:
        name: 'Создание резюме'
</router>

<script>
import ResumeForm from '@/components/applicant/resumes/form'
import PlaceAtWorkForm from '@/components/applicant/resumes/placeAtWorkForm'
import UserForm from '@/components/applicant/resumes/userForm'
import BreadCrumb from '@/ui/BreadCrumb'
import moment from 'moment'
export default {
    components: {
        ResumeForm,
        PlaceAtWorkForm,
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
            resume_id : null,
            id: null
        },
        workPlaceType: null
    }),
    methods: {
        async onSubmit() {
            // Нужно будет пикать по кд сфа в мид после каждой тычки жжать f9 и писать оскорбления в чат а потом прожимать zxc и не попадать
            try {

                const response = await this.$store.dispatch('saveEntity', {
                    entityName: 'resumes',
                    data: {...this.form, ...this.userForm},
                    method: this.action === 'edit' ? 'put' : 'post',
                    id: this.id
                })
                await this.requestWorkPlaces(response.id)
                this.$router.push({ path: `/video`, query: { entity_id: response.id } })
            } catch(e) {
                console.log(e)
            }
        },
        async requestWorkPlaces(resume_id) {
            try {
                await Promise.all(this.places_of_work.map(async place => {
                    if (place.id.length === 4) delete place.id
                    const response = this.$store.dispatch('saveEntity', {
                        entityName: `resumes/${resume_id}/places_of_work`,
                        data: {
                            ...place,
                            ...this.renderDate(place.start_date, place.end_date),
                            resume_id
                        },
                        method: place.id ? 'put' : 'post',
                        id: place.id
                    })
                    console.log(response)
                }))
            } catch(e) {
                console.log(e)
            }
        },
        async onRemovePlace(place) {
            if (place.resume_id) {
                await this.$store.dispatch('removeEntity', {
                    entityName: `resumes/${place.resume_id}/places_of_work/${place.id}`
                })
            }
            this.places_of_work.splice(this.places_of_work.findIndex(item => item.id === place.id), 1)
        },
        editWorkPlace(place) {
            this.workPlaceType = place ? 'edit' : 'create'
            this.workPlaceForm = this.workPlaceType === 'edit' ? JSON.parse(JSON.stringify(place)) : this.tempPlaceForm
            this.$modal.show('WorkPlaceModal')
        },
        saveWorkPlace(place) {
            if (this.workPlaceType === 'edit') this.places_of_work.splice(place.key, 1, place)
            else this.places_of_work.push(place)
            this.workPlaceForm = {...this.tempPlaceForm}
            this.workPlaceType = null
            this.$modal.hide('WorkPlaceModal')
        },
        renderDate(startDate, endDate) {
            return {
                start_date: `${this.addZero(Number(startDate.split('-')[0])+1)}-${startDate.split('-')[1]}`,
                end_date: `${this.addZero(Number(endDate.split('-')[0])+1)}-${endDate.split('-')[1]}`
            }
        },
        addZero(date) {
            return date < 10 ? `0${date}` : `${date}`
        }
    },
    async asyncData({ route, query, store, params, $axios }) {
        const { action } = params
        const userForm = JSON.parse(JSON.stringify(store.state.user))
        userForm.bdate = moment(userForm.bdate.split('-').reverse().join('-'))
        // let form = {
        //     position: null,
        //     salary: null,
        //     city_id: null,
        //     schedule: null,
        //     description: null,
        // }
        let form = {
            position: 'Тест резюме ',
            salary: 125000,
            city_id: '44f19802-f354-4276-bec7-cff45c2e9dbe',
            schedule: '2/2',
            description: 'Я гуль зхс 3с ранга, сражающийся с нечестивыми программистами, которые пишут говноCODE',
        }
        let places_of_work = []

        const id = query.entity_id

        if (action !== 'create' && id) {
            try {
                form = await store.dispatch('getEntities', {
                    entityName: 'resumes',
                    id,
                    inStore: false,
                    $axios
                })
                places_of_work = form.places_of_work.map (place => {
                    return {
                        ...place,
                        start_date: `${Number(place.start_date.split('-')[0])-1}-${place.start_date.split('-')[1]}`,
                        end_date: `${Number(place.end_date.split('-')[0])-1}-${place.end_date.split('-')[1]}`,
                    }
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
            places_of_work,
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
            margin: 50px auto
            font-size: 24px
</style>