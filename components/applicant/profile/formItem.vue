<template>
<el-form-item>
    <span class="title">
        {{field.title}}
    </span>
    <div class="action">
        <input
        v-model="field.value"
        :disabled="field.disabled"
        @keydown.enter="$emit('handleChange')"
        :placeholder="field.title"
        class="form-input">
        <div v-if="field.id !== 'password' && field.id !== 'phone' && field.id !== 'email'">
            <span
            v-if="field.disabled"
            @click="$emit('onDisabled')"
            class="change">
                Изменить
            </span>
            <span
            v-else
            @click="$emit('handleChange')"
            class="change">
                Сохранить
            </span>
        </div>
        <span
        v-else
        @click="$modal.show('profile-modal', field.id)"
        class="change">
            Изменить
        </span>
    </div>
</el-form-item>
</template>

<script>
export default {
    props: {
        field: {
            type: Object,
            required: true
        }
    },
}
</script>

<style lang="sass" scoped>
    input:disabled
        background: #FBFBFB
        cursor: not-allowed
        pointer-events: all !important
</style>