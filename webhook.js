const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json());

app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

app.get('/webhook', (req, res) => {

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = "<testb0t>"

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let action = req.body.queryResult.action;
    let responseJson = {};

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            if (action === 'facebook.card') {
                let richResponses = [
                    {
                        "card": {
                            "title": "this is a title",
                            "subtitle": "this is subtitle",
                            "imageUrl": "url for a image",
                            "buttons": [
                                {
                                    "text": "Button 1",
                                    "postback": "some postback"
                                }
                            ]
                        },
                        "platfrom": "FACEBOOK"
                    }
                ];

                responseJson.fulfillmentMessages = richResponses;
            }

            res.json(responseJson);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});