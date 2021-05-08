<template>
    <div class="resume-form-container">
        <div class="wrapper">
            <bread-crumb></bread-crumb>
            <h3>Обо мне</h3>
            <user-form
            :action="action"
            :form="userForm">
            </user-form>
            <h3>О резюме</h3>
            <resume-form
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
            resume_id : null
        },
        workPlaceType: null
    }),
    methods: {
        async onSubmit() {
            // const response  = await this.$store.dispatch('saveEntity', {
            //     entityName: 'resumes',
            //     data: {...this.form, ...this.userForm},
            //     method: 'post'
            // })
            // console.log(response)
            // 3c2360f5-e63b-4051-9d77-d3a6cb762f58
            this.$router.push({ path: `/applicant/video`, query: { resume_id: `3c2360f5-e63b-4051-9d77-d3a6cb762f58` } })
            // const places = await Promise.all(this.places_of_work.map(async place => {
            //     place.resume_id = response.id
            //     return this.$store.dispatch('saveEntity', {
            //         entityName: 'places_of_work',
            //         data: place,
            //         method: 'post'
            //     })
            // }))
            // console.log(places)

        },
        editWorkPlace(place) {
            this.workPlaceType = place ? 'edit' : 'create'
            this.workPlaceForm = this.workPlaceType === 'edit' ? JSON.parse(JSON.stringify(place)) : this.tempPlaceForm
            this.$modal.show('WorkPlaceModal')
        },
        saveWorkPlace(place) {
            if (this.workPlaceType === 'edit') this.places_of_work.splice(place.key, 1, place)
            else this.places_of_work.push(place)
            this.workPlaceForm = null
            this.workPlaceType = null
            this.$modal.hide('WorkPlaceModal')
        }
    },
    asyncData({ route, store, params }) {
        const { action } = params
        const userForm = JSON.parse(JSON.stringify(store.state.user))
        userForm.bdate = moment(userForm.bdate.split('-').reverse().join('-'))
        let form = {
            position: null,
            salary: null,
            city_id: null,
            schedule: null,
            description: null,
        }
        const places_of_work = []

        if (action !== 'create') {

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
            userForm
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