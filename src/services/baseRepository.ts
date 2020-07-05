import Axios from 'axios'

export default class BaseRepository {
    
    axios: any
    apiUrl: string

    constructor(controller: string) {
        this.axios = Axios
        this.apiUrl = `https://localhost:44340/api/${controller}`
    }

    /* Generic request */

    getById(id: number) {
        return this.axios.get(`${this.apiUrl}/${id}`)
    }
    
    add(data: any) {
        return this.axios.post(`${this.apiUrl}`, data)
    }

    edit(data: any) {
        return this.axios.put(`${this.apiUrl}`, data)
    }

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

    getByIdCustom(id: number) {
        return this.axios.get(`${this.apiUrl}/GetById/${id}`)
    }

    /* Evalation custom request*/

    getEvaluationBySubjectId(id: number) {
        return this.axios.get(`${this.apiUrl}/GetBySubjectId/${id}`)
    }

    getEvaluationBySubjectSecretKey(key: string) {
        return this.axios.get(`${this.apiUrl}/GetBySecretKey/${key}`)
    }

    /* Question custom request */

    addQuestion(data: any) {
        return this.axios.post(`${this.apiUrl}/question`, data)
    }

    addAnswers(data: any) {
        return this.axios.post(`${this.apiUrl}/answers`, data)
    }

    getQuestionByEvaluationId(id: number) {
        return this.axios.get(`${this.apiUrl}/GetByEvaluationId/${id}`)
    }

    /* user */

    valdiateUser(data: any) {
        return this.axios.post(`${this.apiUrl}/validate`, data)
    }

    createIfNotExist(data: any) {
        return this.axios.post(`${this.apiUrl}/CreateIfNotExist`, data)
    }

    /* test */

    validateKey(key: string) {
        return this.axios.get(`${this.apiUrl}/validateKey/${key}`)
    }

    GetByIdFull(id: number) {
        return this.axios.get(`${this.apiUrl}/GetByIdFull/${id}`)
    }
}