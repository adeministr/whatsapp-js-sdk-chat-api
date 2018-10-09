const fetch = require('../utils/fetch')

module.exports = {
    async set({ apiUrl, token }, data) {
        console.log('Set settings', data)
        const url = `${apiUrl}/settings?token=${token}`

        try {
            return (await fetch(url, 'POST', data)).data
        } catch (e) {
            console.error('Settings set error' + e, e)
            throw e
        }

    },
    async get({ apiUrl, token }) {
        const url = `${apiUrl}/settings?token=${token}`

        return (await fetch(url)).data
    }
}