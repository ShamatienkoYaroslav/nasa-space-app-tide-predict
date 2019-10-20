"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var router_1 = require("./router");
var port = process.env.PORT || '5000';
// Create a new express application instance
var app = express_1.default();
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use('/stations', router_1.stations);
app.use('/extremes', router_1.extremes);
app.listen(port, function () {
    console.log("Example app listening on port " + port + "!");
});
