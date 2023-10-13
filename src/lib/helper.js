import { auth } from "./services.js"
export const dataHeader = () => {
    return { headers: { "x-access-token": auth.getToken() } }
}