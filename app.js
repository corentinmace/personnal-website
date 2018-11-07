"use strict";
// import * as config from './_config/config.js'
const config = require('./_config/config.js');
const express = require('express');
const app = express();
const path = require("path");
const fs = require('fs');

// external requests
const request = require('request-promise');
const url = require('url');
const querystring = require('querystring');
const http = require('http');

// jsdom
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
app.use('/static', express.static('static'))
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
app.set('trust proxy', true);

app.listen(3000, function () {
    console.log('Server running on port 3000');
});


app.get(/^(?!\/\/)/, (req, res) => {
    let purl = url.parse(req.url, true);
    let pathname = 'pages' + purl.pathname;

    if ((pathname)[pathname.length - 1] === '/') {
        pathname += 'index';
    }
    res.render(pathname, purl.query);
});
