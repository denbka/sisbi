<template>
  <div
  class="root"
  :data-role="role">
    <header-component
    :routeName="routeName"
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
    loading: true,
    recipient_user_id: null
  }),
  mounted() {
    // console.log(this.$connection)
    this.$connection.on('Notification', res => {
        console.log('ReceiveMessage', res)
        console.log(res.recipient_user_id, this.user.id)
        if (res.recipient_user_id !== this.user.id) return
        this.recipient_user_id = res.recipient_user_id
        let message, color
        if (res.status === 'sended') {
          if (res.sender === 'Worker' && this.role === 'applicant') {
            message = this.sendedMessageFrom
          }
          if (res.sender === 'Employer' && this.role === 'applicant') {
            message = this.sendedMessageTo
          }
          if (res.sender === 'Worker' && this.role === 'employer') {
            message = this.sendedMessageTo
          }
          if (res.sender === 'Employer' && this.role === 'employer') {
            message = this.sendedMessageFrom
          }
          color = 'teal'
        }
        if (res.status === 'accepted') {
          if (res.sender === 'Worker' && this.role === 'applicant') {
            message = this.acceptedMessageFrom
          }
          if (res.sender === 'Employer' && this.role === 'applicant') {
            message = this.acceptedMessageTo
          }
          if (res.sender === 'Worker' && this.role === 'employer') {
            message = this.acceptedMessageTo
          }
          if (res.sender === 'Employer' && this.role === 'employer') {
            message = this.acceptedMessageFrom
          }
          color = 'green'
        }
        if (res.status === 'rejected') {
          if (res.sender === 'Worker' && this.role === 'applicant') {
            message = this.rejectedMessageFrom
          }
          if (res.sender === 'Employer' && this.role === 'applicant') {
            message = this.rejectedMessageTo
          }
          if (res.sender === 'Worker' && this.role === 'employer') {
            message = this.rejectedMessageTo
          }
          if (res.sender === 'Employer' && this.role === 'employer') {
            message = this.rejectedMessageFrom
          }
          color = 'red'
        }
        this.recipient_user_id = null
        const h = this.$createElement
        this.$notify({
          title: 'Новый отклик',
          message: h('i', { style: `color: ${color}` }, message),
          duration: 0
        })
    })
    // this.$notify({
    //     title: 'Новый отклик',
    //     message: h('i', { style: 'color: teal' }, 'Пользователь')
    //   });
    // this.$connection.send('SendMessage', 'valera', 'loh')
  },
  computed: {
    ...mapState({
      user: state => state.user,
      role: state => state.role
    }),
    sendedMessageTo() {
      return `Пользователь ${this.recipient_user_id} отправил вам отклик`
    },
    sendedMessageFrom() {
      return `Отклик успешно отправлен`
    },
    rejectedMessageTo() {
      return `Пользователь ${this.recipient_user_id} отклонил ваш отклик`
    },
    rejectedMessageFrom() {
      return `Отклик закрыт`
    },
    acceptedMessageTo() {
      return `Пользователь ${this.recipient_user_id} принял отклик`
    },
    acceptedMessageFrom() {
      return `Отклик принят`
    },
    routeName() {
      return !!this.$route.meta.name && this.$route.meta.name
    },
    isFooterVisible() {
      return this.$route.path.includes('register') ||  this.$route.path.includes('login')
    }
  },
}
</script>


<style lang="sass">
.root[data-role='employer']
  .el-slider__bar, .carousel-wrapper__handlers button, .status
    background: $primaryColorEmployer
  .el-button--primary, .el-slider__button
    border-color: $primaryColorEmployer
  .el-button--primary, .r-button, .search__button, .card__on-response-button, .icon-container--active
    cursor: pointer !important
    background: $primaryColorEmployer !important
    color: #fff
  .r-button--disabled, .search__button:disabled, .card__on-response-button:disabled, .el-button:disabled
    cursor: not-allowed !important
    background: $disabledColorEmployer !important
    color: #fff
  .nav-active
    color: $primaryColorEmployer !important
  .el-button--info
    background: transparent !important
    color: $primaryColorEmployer
    border: none
  .footer__contacts__contact--contacts--showed-contacts__item i
    color: $primaryColorEmployer
  .bordering-button, .nav-profile .el-input__inner
    border-color: $primaryColorEmployer !important

.root[data-role='applicant']
  .el-slider__bar, .carousel-wrapper__handlers button, .status
    background: $primaryColorApplicant
  .el-button--primary, .el-slider__button
    border-color: $primaryColorApplicant
  .el-button--primary, .r-button, .search__button, .card__on-response-button
    cursor: pointer !important
    background: $primaryColorApplicant !important
    color: #fff !important
  .r-button--disabled, .r-button--info, .search__button:disabled, .card__on-response-button:disabled, .el-button:disabled
    cursor: not-allowed !important
    background: $disabledColorApplicant !important
    color: #fff
  .nav-active
    color: $primaryColorApplicant !important
  .el-button--info
    background: transparent !important
    color: $primaryColorApplicant !important
    border: none
  .footer__contacts__contact--contacts--showed-contacts__item i
    color: $primaryColorApplicant
  .bordering-button, .nav-profile .el-input__inner
    border-color: $primaryColorApplicant !important

// .el-button--default
//   background: transparent !important
  

.wrapper
  width: 100%
  max-width: 1250px
  padding: 0 15px
  margin: 0 auto
  display: flex

@media screen and (max-width: 1365px)
  .wrapper
    width: 968px

@media screen and (max-width: 1024px)
  .wrapper
    width: 100%
    /* max-width: 100% */
    padding: 0 30px

@media screen and (max-width: 560px)
  .wrapper
    padding: 0 20px

.layout
  min-height: 90vh
</style>