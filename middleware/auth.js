export default async ({ $axios, store, redirect, route, $cookiz }) => {
    if (!$cookiz.get('tempRole')) {
        const tempRole = route.name === 'index' ? 'applicant' : 'employer'
        $cookiz.set('tempRole', tempRole)
        store.commit('SET_TEMP_ROLE', tempRole)
    } else {
        if (route.path === '/') $cookiz.set('tempRole', 'applicant')
        if (route.path === '/employer') $cookiz.set('tempRole', 'employer')
        store.commit('SET_TEMP_ROLE', $cookiz.get('tempRole'))
    }


    if (!store.state.access_token) {
        const whiteList = [
            '/',
            '/employer',
            '/login',
            '/register',
            '/about'
        ]
        if (whiteList.find(path => route.path === path)) return redirect()
        else {
            if (store.state.tempRole === 'applicant') return redirect('/')
            if (store.state.tempRole === 'employer') return redirect('/employer')
        }
    } else {
        await store.dispatch('getUserInfo', $axios)
        const whiteList = {
            applicant: [
                '/applicant',
                '/video',
                '/microphone',
                '/about'
            ],
            employer: [
                '/employer',
                '/video',
                '/microphone',
                '/about'
            ]
        }
        const { role } = store.state
        if (role && !whiteList[role].find(path => route.path.includes(path))) return redirect(`/${role}`)
    }
}