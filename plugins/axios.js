export default function ({ $axios, store, redirect, route }) {
    // const requestQueue = []

    $axios.onRequest(config => {
      console.log('Making request to ' + config.url)
      if (store.state.access_token) {
        $axios.setToken(store.state.access_token, 'Bearer')
      }
    })
  
    // const resendPendingRequests = async () => {
    //     await Promise.all(requestQueue.map(async deferredRequest => {
            
    //     }))
    //     requestQueue = []
    // }

    $axios.onError(async error => {
        console.log(error)
      const code = parseInt(error.response && error.response.status)
      if (code === 401) {
          try {
            await store.dispatch('refreshToken')
          } catch(e) {
            // removeTokens()
            // console.log(route)
            // if (route.path.includes('applicant') || route.path.includes('employer')) redirect('/worker/login')
          }
        // await resendPendingRequests()
      }
    })
  }