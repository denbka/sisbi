<template>
    <div class="change-role">
        <span class="change-role__name">{{getRoleName}}</span>
        <div class="navigate">
            <button
            @click="() => onChange(role)"
            v-for="role in roles"
            :key="role.id"
            :class="`bar ${getRole === role.pseudo && 'bar-active'}`">
                <span></span>
            </button>
            
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        roles: [
            {
                id: 'index',
                pseudo: 'applicant',
                path: '/',
                name: 'Соискателям'
            },
            {
                id: 'employer',
                pseudo: 'employer',
                path: '/employer',
                name: 'Работодателям'
            },
        ]
    }),
    methods: {
        onChange({ path, id, pseudo }) {
            this.$cookiz.set('tempRole', pseudo)
            this.$store.commit('SET_TEMP_ROLE', pseudo)
            this.$router.push(path)
        }
    },
    computed: {
        getRole() {
            return this.$store.state.tempRole
        },
        getRoleName() {
            return this.roles.find(role => this.getRole === role.pseudo).name
        }
    },
}
</script>

<style lang="sass" scoped>
    .change-role
        button
            padding: 0
    .bar
        background: transparent !important
        border: none
        margin-right: 10px
        cursor: pointer
        span
            display: inline-block
            width: 40px
            height: 6px
            background: #D0E9FB
            border-radius: 10px
        &-active span
            background: #193FF6
    .bar:last-child
        margin-right: 0
    @media screen and (max-width: 1025px)
        .change-role
            display: flex
            &__name
                margin-right: 50px
</style>