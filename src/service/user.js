import axios from "axios"

export const getUserProfile = async (accessToken) => {
    let accesstoken = localStorage.getItem('access_token')
    const response =await  axios.get('https://api.spotify.com/v1/me', {
        headers: {
            Authorization:'Bearer'+accessToken
        }
    })
    const data= response.data
}