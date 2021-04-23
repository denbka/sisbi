<template>
    <div class="resume-form-container">
        <div class="wrapper">
            <!-- <user-form
            >
            </user-form> -->
            <resume-form
            :form="form"
            :action="action">
            </resume-form>
        </div>
    </div>
</template>

<script>
import ResumeForm from '@/components/applicant/resumes/form'
export default {
    components: {
        ResumeForm
    },
    asyncData({ route, store, params }) {
        const { action } = params
        let form = {
            position: null,
            salary: null,
            city: null,
            schedule: null,
            description: null,
            places_of_work: []
        }
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
            title
        }
    },
    head() {
        return {
            title: `${this.title} резюме`
        }
    }
}
</script>

<style lang="scss" scoped>

</style>