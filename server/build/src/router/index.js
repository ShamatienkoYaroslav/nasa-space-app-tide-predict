"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var stations_router_1 = __importDefault(require("./stations.router"));
exports.stations = stations_router_1.default;
var extremes_router_1 = __importDefault(require("./extremes.router"));
exports.extremes = extremes_router_1.default;
