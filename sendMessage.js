const fetch = require('../utils/fetch')

module.exports = async ({ apiUrl, token }, phone, text) => {
    const url = `${apiUrl}/sendMessage?token=${token}`
    const data = {
        phone, body: text
    }
    return (await fetch(url, 'POST', data)).data

}