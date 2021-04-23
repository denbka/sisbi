<template>
    <div>
        <span>{{getRoleName}}</span>
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
            console.log(this.getRole)
            return this.roles.find(role => this.getRole === role.pseudo).name
        }
    },
}
</script>

<style lang="sass" scoped>
    .bar
        background: transparent
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
</style>