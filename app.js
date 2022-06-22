const crypt = require('./src/utils/crypt');
const { post } = require('./src/utils/network');
const { TOKEN } = require('./src/config/config.json')

const numberDetailSchema = (phoneNumber) => ({ "countryCode": "us", "phoneNumber": phoneNumber, "source": "profile", "token": TOKEN })

const a = JSON.stringify(numberDetailSchema("+6282138288669"))
const b = crypt.encrypt(a)

post('/v2.8/number-detail', b).then(res => {
    const response = JSON.parse(crypt.decrypt(res.data.data))
    console.log(parseResponse(response.result.tags))
}).catch((err) => console.log("Error: " + crypt.decrypt(err.response.data.data)))

const parseResponse = (response) => {
    return response.reduce((acc, curr) => {
        acc = [...acc, curr.tag]
        return acc
    }, [])
}