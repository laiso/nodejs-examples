import * as functions from 'firebase-functions';
import * as Axios from 'axios'

const USER_NAME = 'laiso'
const config = require('../config')

export const getUserFromTwitter = functions.https.onRequest((request, response) => {
    const client = require('twitter')(config)
    const params = {screen_name: USER_NAME};

    client.get('users/show', params, function (error, user, _) {
        if (error) {
            response.send(error)
        } else {
            postToSlack(user)
            response.send(user)
        }
    })
});

function postToSlack(user) {
    Axios.default.post(config.web_hook_url, {
        text: `${user.name} has ${user.followers_count} followers`
    })
}