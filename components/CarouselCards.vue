<template>
    <div>
        <el-carousel trigger="click" class="carousel" v-if="items.data.length > 1">
            <el-carousel-item v-for="item in items.data" :key="item.id">
                <component-card
                v-for="item in data.data"
                :key="item.id"
                :data="item">
                </component-card>
            </el-carousel-item>
        </el-carousel>
        <component-card
        v-else-if="items.data.length === 1"
        :data="items.data[0]">
        </component-card>
        <Stub :role="role" v-else>
            <span>Вы еще не добавили вакансию</span>
            <nuxt-link to="vacancies/create">Добавить</nuxt-link>
        </Stub>
    </div>
</template>

<script>
import Stub from '@/components/applicant/Stub'
import ComponentCard from '@/components/ComponentCard'
export default {
    components: {
        ComponentCard,
        Stub
    },
    props: {
        items: {
            type: Object,
            required: true
        },
        role: {
            type: String,
            required: true
        }
    },
}
</script>

<style lang="scss" scoped>

</style>