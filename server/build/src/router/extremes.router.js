"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var axios_1 = __importDefault(require("axios"));
var prisma_client_1 = require("../../generated/prisma-client");
var wtApi = 'https://www.worldtides.info/api';
var router = express_1.default.Router();
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, refreshDb, lat, lng, err, response, extremes, _i, extremes_1, _b, dt, height, type, _c, _d, error_1, _e, _f, _g, _h, error_2;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                _a = req.query, refreshDb = _a.refreshDb, lat = _a.lat, lng = _a.lng;
                lat = Number(lat);
                lng = Number(lng);
                err = null;
                if (!refreshDb) return [3 /*break*/, 9];
                _j.label = 1;
            case 1:
                _j.trys.push([1, 8, , 9]);
                return [4 /*yield*/, axios_1.default.get(wtApi, {
                        params: {
                            extremes: true,
                            lat: lat,
                            lon: lng,
                            key: process.env.WORLDTIDES_API_KEY
                        }
                    })];
            case 2:
                response = _j.sent();
                extremes = response.data.extremes;
                _i = 0, extremes_1 = extremes;
                _j.label = 3;
            case 3:
                if (!(_i < extremes_1.length)) return [3 /*break*/, 6];
                _b = extremes_1[_i], dt = _b.dt, height = _b.height, type = _b.type;
                return [4 /*yield*/, prisma_client_1.prisma.createExtreme({
                        dt: new Date(dt * 1000),
                        height: height,
                        type: type,
                        lat: lat,
                        lng: lng
                    })];
            case 4:
                _j.sent();
                _j.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6:
                _d = (_c = res).json;
                return [4 /*yield*/, prisma_client_1.prisma.extremes({ where: { lat: lat, lng: lng } })];
            case 7:
                _d.apply(_c, [_j.sent()]);
                return [3 /*break*/, 9];
            case 8:
                error_1 = _j.sent();
                console.log(error_1);
                err = error_1;
                return [3 /*break*/, 9];
            case 9:
                if (err) {
                    res.json({ error: err });
                    return [2 /*return*/];
                }
                _j.label = 10;
            case 10:
                _j.trys.push([10, 14, , 15]);
                if (!(lat && lng)) return [3 /*break*/, 12];
                _f = (_e = res).json;
                return [4 /*yield*/, prisma_client_1.prisma.extremes({ where: { lat: lat, lng: lng } })];
            case 11:
                _f.apply(_e, [_j.sent()]);
                return [2 /*return*/];
            case 12:
                _h = (_g = res).json;
                return [4 /*yield*/, prisma_client_1.prisma.extremes()];
            case 13:
                _h.apply(_g, [_j.sent()]);
                return [3 /*break*/, 15];
            case 14:
                error_2 = _j.sent();
                console.log({ error: error_2 });
                err = error_2;
                return [3 /*break*/, 15];
            case 15: return [2 /*return*/];
        }
    });
}); });
router.delete('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma_client_1.prisma.deleteManyExtremes()];
            case 1:
                _a.sent();
                res.json([]);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log({ error: error_3 });
                res.json({ error: error_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
