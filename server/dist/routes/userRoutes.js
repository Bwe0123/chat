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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../models/User");
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email } = req.body;
        const newUser = new User_1.User({ username, password, email });
        yield newUser.save();
        console.log(`New user registered: ${newUser.username}`);
        res.status(201).json(newUser);
    }
    catch (err) {
        console.error(err);
        if (err instanceof mongoose_1.default.Error && err.message.includes('E11000 duplicate key error')) {
            return res.status(400).json({ error: 'Duplicate email', message: 'Email already exists' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Логика входа пользователя
        console.log('User logged in');
        res.status(200).json({ message: 'Login successful' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.post('/send-message', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Логика отправки сообщения
        const { message } = req.body;
        console.log(`Message sent: ${message}`);
        res.status(200).json({ message: 'Message sent successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = router;
