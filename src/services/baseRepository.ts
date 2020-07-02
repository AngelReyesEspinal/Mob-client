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

    delete(id: number) {
        return this.axios.delete(`${this.apiUrl}/${id}`)
    }

    /* Subject custom request */

    addSubject(data: any) {
        return this.axios.post(`${this.apiUrl}/subject`, data)
    }

    editSubject(data: any) {
        return this.axios.post(`${this.apiUrl}/updateSubject`, data)
    }

    getSubjectById(id: number) {
        return this.axios.get(`${this.apiUrl}/GetById/${id}`)
    }
}