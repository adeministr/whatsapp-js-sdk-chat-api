const sendMessage = require('./sendMessage')
const createGroup = require('./createGroup')

const handlers = require('./handlers')
const CredentialsStore = require('./CredentialsStore')
const settings = require('./settings')

const DEBUG = false

class EventEmitter extends require('events') {
    constructor() {
        super()
    }

    emit(e, param) {
        DEBUG && console.log('EMITER:' + e + ' emitted', param || '')
        super.emit(...arguments)
    }
}

module.exports = class {
    constructor(apiUrl, token, activateAck = false) {
        this.emiter = new EventEmitter()
        this.credentials = new CredentialsStore({ apiUrl, token })

        if (activateAck) {
            this.turnOnAck()
        }
    }

    getCredentials(...params) {
        return this.credentials.get(...params)
    }

    sendMessage(phone, text) {
        return sendMessage(this.getCredentials(), ...arguments)
    }

    createGroup(phones, groupName, messageText = '') {
        return createGroup(this.getCredentials(), ...arguments)
    }

    onceMessageViewed(...params) {
        return handlers.onceMessageViewed(this.emiter, ...params)
    }

    onceMessageDelivered(...params) {
        return handlers.onceMessageDelivered(this.emiter, ...params)
    }

    turnOnAck() {
        return settings.set(this.getCredentials(), { ackNotificationsOn: true })
    }

    setWebhookUrl(webhookUrl) {
        return settings.set(this.getCredentials(), { webhookUrl })
    }
}