<template>
  <div>
    <header-component
    :user="user">
    </header-component>
    <div class="layout">
      <Nuxt />
    </div>
    <footer-component
    v-if="!isFooterVisible">
    </footer-component>
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header'
import FooterComponent from '@/components/Footer'
import { mapState } from 'vuex'
export default {
  components: {
    HeaderComponent,
    FooterComponent
  },
  data: () => ({
    loading: true
  }),
  computed: {
    ...mapState({
      user: state => state.user
    }),
    isFooterVisible() {
      return this.$route.path.includes('register') ||  this.$route.path.includes('login')
    }
  },
}
</script>


<style>
.wrapper {
  margin: 0 auto;
  width: 80%;
  display: flex;
}

.layout {
  min-height: 90vh;
}
</style>