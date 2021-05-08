export default (Vue) => {
    const sub = new Vue()
    
    const show = (dialogName, props) => {
      console.log(props)
      if (props?.buttons) {
        props.buttons.map(button => {
          sub.$on(button.title, button.handler)
        })
      }
      sub.$emit('toggle', { dialogName, visible: true, ...props })
    }
  
    const hide = (dialogName) => {
      sub.$emit('toggle', { dialogName, visible: false })
    }
  
    return {
      sub,
      show,
      hide,
    }
  }