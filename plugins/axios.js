export default function ({ $axios, store, redirect, route, $cookiz }) {
    // const requestQueue = []

    $axios.onRequest(config => {
      if (!config.url.includes('videos')) config.url = `/api/v1${config.url}`
      // console.log('Making request to ' + config.url)
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
            if ($cookiz.get('access_token')) {
              // await store.dispatch('refreshToken')
            }
            // redirect('/applicant')
          } catch(e) {
            // removeTokens()
            // console.log(route)
            // if (route.path.includes('applicant') || route.path.includes('employer')) redirect('/worker/login')
          }
        // await resendPendingRequests()
      }
      throw new Error(error)
    })
  }