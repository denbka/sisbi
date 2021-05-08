export default {
    data: () => ({
        searchLoading: false,
    }),
    methods: {
        async onSearch(query, entityName, params = {}) {
            this.entityName = entityName
            if (!query.length) return
            this.searchLoading = true
            try {
                await this.$store.dispatch('getEntities', {
                    entityName,
                    params: {
                        query
                    }
                })
            } catch(e) {
                console.log(e)
            } finally {
                this.searchLoading = false
            }
        }
    }
}