import http from "k6/http"

const DEMOQA_DOMAIN = 'https://demoqa.com';
const GENERATE_TOKEN_PATH = '/Account/v1/GenerateToken';
const LOGIN_PATH = '/Account/v1/Login';


export const generateToken = (username: String, password: String) => {
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const payload = {
        userName: `${username}`,
        password: `${password}`
    }

    return http.post(`${DEMOQA_DOMAIN}` + `${GENERATE_TOKEN_PATH}`, JSON.stringify(payload), params)
}

export const loginViaAPI = (username: String, password: String) => {
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const payload = {
        userName: `${username}`,
        password: `${password}`
    }
    return http.post(`${DEMOQA_DOMAIN}` + `${LOGIN_PATH}`, JSON.stringify(payload), params)
}