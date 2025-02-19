import axios from 'axios'

const api= axios.create ({
    baseURL: 'http://localhost:3000' //onde está o meu servidor do node(backend)
})
export default api
