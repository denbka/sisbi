export default async ({ $axios, store, redirect, route, $cookiz }) => {
    if (!$cookiz.get('tempRole')) {
        const tempRole = route.name === 'index' ? 'applicant' : 'employer'
        $cookiz.set('tempRole', tempRole)
    } else {
        store.commit('SET_TEMP_ROLE', $cookiz.get('tempRole'))
    }
    if (route.path === '/') $cookiz.set('tempRole', 'applicant')
    if (route.path === '/employer') $cookiz.set('tempRole', 'employer')
    store.commit('SET_TEMP_ROLE', $cookiz.get('tempRole'))


    if (!store.state.access_token) {
        const whiteList = [
            '/',
            '/employer',
            '/login',
            '/register'
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
            ],
            employer: [
                '/employer'
            ]
        }
        const { role } = store.state
        console.log(role)
        if (!whiteList[role].find(path => route.path.includes(path))) return redirect(`/${role}`)
    }
}