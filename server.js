const Pusher = require('pusher');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config()

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Pusher initialize
const pusher = new Pusher({
    appId: process.env.APP_ID,
    key: process.env.KEY,
    secret: process.env.SECRET,
    cluster: "us3",
    useTLS: true
});

app.set('PORT', process.env.PORT || 5000);

app.post('/message', (req, res) => {
    const payload = req.body;

    // Pass payload to Pusher
    pusher.trigger('my-channel', 'my-event', payload).then(res => {
        console.log(res);


    }).catch((error) => {
        console.log(error)
    });
    res.send(payload);
});

app.listen(app.get('PORT'), () => console.log('Listening at ' + app.get('PORT')));

