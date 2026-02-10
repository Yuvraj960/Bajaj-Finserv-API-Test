# 🚀 Bajaj-Finserv API Test - Chitkara Qualifier

A Node.js API built for the Chitkara 2026 Qualifier, featuring mathematical operations and AI integration powered by Google Gemini.

## ✨ Features

- **Fibonacci Series**: Generate specific number of terms.
- **Prime Number Filtering**: Extract primes from an array.
- **LCM & HCF Calculation**: Compute Least Common Multiple and Highest Common Factor.
- **AI Integration**: Ask questions and get single-word answers using Google Gemini (`gemini-2.5-flash-lite`).
- **Health Check**: Verify API status.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **AI Model**: Google Gemini 2.5 Flash Lite
- **Deployment**: Vercel

---

## 🚀 fast start (Local)

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Yuvraj960/Bajaj-Finserv-API-Test.git
    cd Bajaj-Finserv-API-Test
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory and set the following variables:
    ```env
    PORT=port_number
    GEMINI_API_KEY=your_gemini_api_key_here
    CHITKARA_EMAIL=your_email@chitkara.edu.in
    ```

4.  **Run the Server**
    ```bash
    node index.js
    ```
    The server will start at `http://localhost:3000` by default.

---

## 📚 API Enpoints

### 1. `POST /bfhl`
Process data based on the input key. Send **one** key at a time.

| Key | Type | Description |
| :--- | :--- | :--- |
| `fibonacci` | `Integer` | Returns Fibonacci series up to *n* terms. |
| `prime` | `Array` | Returns prime numbers from the input array. |
| `lcm` | `Array` | Returns the LCM of the numbers in the array. |
| `hcf` | `Array` | Returns the HCF of the numbers in the array. |
| `AI` | `String` | Asks the AI a question and returns a one-word answer. |

#### Example Request (Fibonacci)
```json
POST /bfhl
{
  "fibonacci": 7
}
```

#### Example Response
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": [0, 1, 1, 2, 3, 5, 8]
}
```

### 2. `GET /health`
Check if the API is running.

#### Response
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in"
}
```
