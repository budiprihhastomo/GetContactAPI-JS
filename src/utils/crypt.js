const CryptoJS = require('crypto-js')
const { FINAL_KEY, HMAC_KEY } = require('../config/config.json')

const finalKey = CryptoJS.enc.Hex.parse(FINAL_KEY)
const hmacKey = CryptoJS.enc.Utf8.parse(HMAC_KEY)

const encrypt = (data) => CryptoJS.AES.encrypt(data, finalKey, { mode: CryptoJS.mode.ECB }).toString()
const decrypt = (data) => CryptoJS.AES.decrypt(data.toString(), finalKey, { mode: CryptoJS.mode.ECB }).toString(CryptoJS.enc.Utf8)

const signature = (timestamp, encryptMessage) => {
    const decryptMessage = decrypt(encryptMessage.toString())

    return CryptoJS.HmacSHA256(`${timestamp}-${decryptMessage}`, hmacKey).toString(CryptoJS.enc.Base64)
}

module.exports = {
    encrypt,
    decrypt,
    signature
}