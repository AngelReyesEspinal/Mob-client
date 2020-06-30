import Axios from 'axios'

export default class BaseRepository {
    
    axios: any
    apiUrl: string

    constructor(controller: string) {
        this.axios = Axios
        this.apiUrl = `https://localhost:44340/api/${controller}`
    }

    /* Generic request */

    getAll() {
        return this.axios.get(`${this.apiUrl}`)
    }

    getByUserId(id: number) {
        return this.axios.get(`${this.apiUrl}/userId/${id}`)
    }

    /* Subject custom request */

    post_with_files(data: any) {
        return this.axios.post(`${this.apiUrl}/upload`, data)
    }
}