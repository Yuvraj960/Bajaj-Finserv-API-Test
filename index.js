const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Config
const CHITKARA_EMAIL = process.env.CHITKARA_EMAIL || "YOUR_CHITKARA_EMAIL";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Helper Functions
const getFibonacci = (n) => {
    if (typeof n !== 'number' || n < 0) return [];
    if (n === 0) return [];
    const series = [0, 1];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];

    for (let i = 2; i < n; i++) {
        series.push(series[i - 1] + series[i - 2]);
    }
    return series;
};

const isPrime = (num) => {
    if (typeof num !== 'number' || num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const getGCD = (a, b) => {
    return b === 0 ? a : getGCD(b, a % b);
};

const getLCM = (a, b) => {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / getGCD(a, b);
};

const calculateLCM = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return 0;
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = getLCM(result, arr[i]);
    }
    return result;
};

const calculateHCF = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return 0;
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = getGCD(result, arr[i]);
    }
    return result;
};

// Routes

// GET /health
app.get('/health', (req, res) => {
    res.json({
        "is_success": true,
        "official_email": CHITKARA_EMAIL
    });
});

// POST /bfhl
app.post('/bfhl', async (req, res) => {
    try {
        const { fibonacci, prime, lcm, hcf, AI } = req.body;
        let responseData = null;

        if (fibonacci !== undefined) {
            const n = parseInt(fibonacci);
            if (isNaN(n)) throw new Error("Invalid input for fibonacci");
            responseData = getFibonacci(n);
        } else if (prime !== undefined) {
            if (!Array.isArray(prime)) throw new Error("Invalid input for prime: must be array");
            responseData = prime.filter(num => {
                const n = parseInt(num);
                return !isNaN(n) && isPrime(n);
            }).map(num => parseInt(num));
        } else if (lcm !== undefined) {
            if (!Array.isArray(lcm)) throw new Error("Invalid input for lcm: must be array");
            const cleanArr = lcm.map(n => parseInt(n)).filter(n => !isNaN(n));
            responseData = calculateLCM(cleanArr);
        } else if (hcf !== undefined) {
            if (!Array.isArray(hcf)) throw new Error("Invalid input for hcf: must be array");
            const cleanArr = hcf.map(n => parseInt(n)).filter(n => !isNaN(n));
            responseData = calculateHCF(cleanArr);
        } else if (AI !== undefined) {
            if (!GEMINI_API_KEY) {
                throw new Error("Server configuration error: Gemini API Key not set");
            }

            const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

            const prompt = `You are a helpful assistant. Answer the following question in a single word: "${AI}"`;

            try {
                const result = await model.generateContent(prompt);
                const response = await result.response;
                responseData = response.text().trim();
            } catch (aiError) {
                console.error("AI Error:", aiError);
                throw new Error("Failed to generate AI response");
            }
        } else {
            return res.status(400).json({
                "is_success": false,
                "official_email": CHITKARA_EMAIL,
                "message": "Invalid request: missing required key"
            });
        }

        res.json({
            "is_success": true,
            "official_email": CHITKARA_EMAIL,
            "data": responseData
        });

    } catch (error) {
        console.error("Error processing request:", error);
        res.status(400).json({
            "is_success": false,
            "official_email": CHITKARA_EMAIL,
            "message": error.message || "Internal Server Error"
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
