"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Axios = require("axios");
admin.initializeApp(functions.config().firebase);
exports.getUserFromTwitter = functions.https.onRequest((request, response) => {
    const config = {
        consumer_key: 'EE2JgKEL0a3Ot8JipeR9yvszy',
        consumer_secret: '2C8R5EXaiTBaUJuJQEF9PqzhH8As7y5awQg8vYXt3nkjMb04iX',
        access_token_key: '14881883-Gmx5S9PAYnUc70iiobZombEAIDqMXfl81AbeM8o32',
        access_token_secret: '55DNCrJ9smdpoPetxOFdykls0y3Q1ASW1W5kTFhK4ionw'
    };
    const client = require('twitter')(config);
    const params = { screen_name: 'laiso' };
    client.get('users/show', params, function (error, user, _) {
        if (error) {
            response.send(error);
        }
        else {
            postToSlack(user);
        }
    });
});
const WEBHOOK_URL = 'https://hooks.slack.com/services/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';
function postToSlack(user) {
    Axios.default.post(WEBHOOK_URL, {
        text: `${user.name} has ${user.followers_count} followers`
    });
}
//# sourceMappingURL=index.js.map