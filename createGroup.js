const fetch = require('../utils/fetch')

module.exports = async ({ apiUrl, token }, phones, groupName, messageText) => {
    if (typeof phones === 'string' || typeof phones === 'number') {
        phones = [phones]
    }

    const url = `${apiUrl}/group?token=${token}`
    const data = {
        phones, groupName, messageText
    }
    return (await fetch(url, 'POST', data)).data
}