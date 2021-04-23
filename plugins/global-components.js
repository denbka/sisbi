import Vue from 'vue'
import rButton from '~/ui/Button'

const components = {
    rButton
}
   
Object.entries(components).map(([name, component]) => {
    Vue.component(name, component)
})