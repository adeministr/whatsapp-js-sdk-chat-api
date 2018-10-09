//npm i query-string axios qs --save
const queryString = require('query-string');
const axios = require('axios');
const qs = require('qs')
//modules
//init

axios.interceptors.request.use((request) => {
    if (request.data && request.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        request.data = qs.stringify(request.data);
    }
    return request;
});

module.exports = function (url, method = 'GET', data = {}, postHeader) {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method
    };
    if (['POST', 'PUT', 'PATCH'].indexOf(method) !== -1) {
        options.headers['Content-Type'] = postHeader || module.exports.FORMAT_FORM_URLENCODED
        options.data = data;
    } else {
        url += (url.indexOf('?') === -1) ? '?' : '&';
        url += queryString.stringify(data);
    }
    options.url = url;

    options.timeout = 10 * 60 * 1000;

    return axios(options)
        .then(resp => ({ data: (resp.data), status: resp.status }))
        .catch(e => Promise.reject({
            data: (e.response) ? e.response.data : 'axios:no data in response',
            status: (e.response) ? e.response.status : 'axios:no status in response'
        }));
};
module.exports.FORMAT_JSON = 'application/json'
module.exports.FORMAT_FORM_URLENCODED = 'application/x-www-form-urlencoded'