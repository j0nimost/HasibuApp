const request = require("supertest");
const app = require('../../app');

// Use signup to get token
module.exports = async function() {
    process.env.SECRET = 'tADAAAAAAAAA'
    const res = await request(app)
                                .post('/api/v1/auth/signup')
                                .send(signupItem)
                                .expect(200);
    return res.body.token;
};

const signupItem = {
    firstName: "Khaled",
    lastName: "Khaled",
    email: "Khaled@Khaled.com",
    password: "WeTheBestMusic"
}
