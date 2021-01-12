import axios from 'axios'

const api = axios.create({
    baseURL: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-statistics"
})

export default api