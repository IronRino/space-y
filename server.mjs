import * as path from "path";
import fs from "fs";
import express from "express";
import https from "https";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const rootDir = process.cwd();
const port = 3000;
const app = express();

app.use(express.json());
app.use(express.static("spa/build"));
app.use(cookieParser());

app.get("/client.mjs", (_, res) => {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.sendFile(path.join(rootDir, "client.mjs"), {
        maxAge: -1,
        cacheControl: false,
    });
});

app.get('/api/getUser', (req, res) => {
    res.json({
        user: req.cookies.user
    });
});

app.post('/api/loginUser', (req, res) => {
    let user = req.body.user;
    res.cookie('user', user, {
        httpOnly: false,
        secure: true,
        sameSite: 'strict'
    });
    res.json({
        user: user
    });
});

app.post('/api/logoutUser', (req, res) => {
    res.clearCookie('user');
    res.send();
});

app.get('/api', (req, res) => {
    res.json({message: 'API работает'});
});

app.get("/*", (req, res) => {
    res.sendFile(path.resolve("spa/build/index.html"));
});

https
    .createServer(
        {
            key: fs.readFileSync("certs/server.key"),
            cert: fs.readFileSync("certs/server.cert"),
        },
        app
    )
    .listen(port, () => {
        console.log(`App listening on port ${port}`);
    });