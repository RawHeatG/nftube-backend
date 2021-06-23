const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const { initializeDbConnection } = require('./database/initializeDbConnection');
const { routeNotFound } = require('./middlewares/routeNotFound');
const loginRouter = require("./routers/login.router");
const signupRouter = require("./routers/signup.router");
const videoRouter = require("./routers/video.router");
const playlistRouter = require("./routers/playlist.router");

//DO NOT MOVE, needs to be at top to establish connection before any functions execute
initializeDbConnection();

app.get('/', (req, res) => {
  res.send('NFTube API');
});

app.use("/login", loginRouter)
app.use("/signup", signupRouter)
app.use("/video", videoRouter)
app.use("/playlist", playlistRouter)

//DO NOT MOVE, needs to be at the end to catch all routes that are not being handled by server
app.use(routeNotFound);

app.listen(3000, () => {
	console.log('server started');
});
