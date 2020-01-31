import { RSAA } from "redux-api-middleware";
import { LoginValues } from "../../components/models/LoginValues";
import { RegisterValues } from "../../components/models/RegisterValues";
const domain = process.env.REACT_APP_API_DOMAIN;

export function login(body: LoginValues){
    return {
        [RSAA]: {
            endpoint: domain + "/user/login",
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(body),
            types: ["LOGIN_REQUEST", "LOGIN_SUCCESS", "LOGIN_FAIL"],
            credentials: "include"
        }
    };
}

export function logout(){
    return {
        [RSAA]: {
            endpoint: domain + "/user/logout",
            method: "POST",
            types: ["LOGOUT_REQUEST", "LOGOUT_SUCCESS", "LOGOUT_FAIL"],
            credentials: "include"
        }
    }
}

export function auth(){
    return {
        [RSAA]: {
            endpoint: domain + "/user/auth",
            method: "POST",
            types: ["AUTH_REQUEST", "AUTH_SUCCESS", "AUTH_FAIL"],
            credentials: "include"
        }
    }
}

export function register(body: RegisterValues){
    return {
        [RSAA]: {
            endpoint: domain + "/user/register",
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(body),
            types: ["REGISTER_REQUEST", "REGISTER_SUCCESS", "REGISTER_FAIL"],
            credentials: "include"
        }
    };
}