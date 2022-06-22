const request = require('axios').default;
const { HOST, HEADER, TOKEN } = require('../config/config.json');
const { signature } = require('./crypt');

const parseToUrl = (path) => {
    return HOST + path
}

const parseToHeader = (payload) => {
    const { OS, MOBILE_SERVICE, V_APP, DEVICE_ID, LANG, ENCRYPTED, COUNTRY } = HEADER
    const ts = Date.now().toString()
    const st = signature(ts, payload)
    return {
        "X-Os": OS,
        "X-Mobile-Service": MOBILE_SERVICE,
        "X-App-Version": V_APP,
        "X-Client-Device-Id": DEVICE_ID,
        "X-Lang": LANG,
        "X-Token": TOKEN,
        "X-Req-Timestamp": ts,
        "X-Encrypted": ENCRYPTED,
        "X-Network-Country": COUNTRY,
        "X-Country-Code": COUNTRY,
        "X-Req-Signature": st,
    }
}

module.exports = {
    post: (path, data) => request.post(parseToUrl(path), { data }, { headers: { ...parseToHeader(data) } })
}
