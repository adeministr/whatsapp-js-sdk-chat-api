module.exports = class {
    constructor({ apiUrl, token }) {
        this.credentials = { apiUrl, token }
    }

    get() {
        return Object.assign({}, this.credentials)
    }
}