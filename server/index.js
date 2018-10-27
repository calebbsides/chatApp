// DEPLOYED AT: https://server-zxjljhbupn.now.sh/pusher/auth
// hosted at zeit.co

const Pusher = require('pusher');
const express = require('express');
const bodyParser = require('body-parser');

var pusher = new Pusher({
  appId: '516005',
  key: '34b5eb49f328341df2f1',
  secret: '6836295a02d92226cd4f',
  cluster: 'us2'
});

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get("/pusher/auth", function (req, res) {
  var query = req.query;
  var socketId = query.socket_id;
  var channel = query.channel_name;
  var callback = query.callback;
  var auth = JSON.stringify(pusher.authenticate(socketId, channel));
  var cb = callback.replace(/\"/g, "") + "(" + auth + ");";
  res.set({
    "Content-Type": "application/javascript"
  });
  res.send(cb);
});
app.post('/pusher/auth', function (req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});
var port = process.env.PORT || 4000;
app.listen(port, () => console.log('Listening on: http://127.0.0.1:' + port));