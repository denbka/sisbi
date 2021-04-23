
import ModalComponent from './Modal'
import PluginCore from './PluginCore'

export const Modal = {
  install(Vue) {
    if (Vue.prototype.$modal) return

    const plugin = PluginCore(Vue)

    Object.defineProperty(Vue.prototype, '$modal', {
      get: () => plugin
    })

    Vue.component('ui-modal', ModalComponent)
  }
}