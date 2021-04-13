export class FetchError extends Error {
    constructor(status, ...params) {
        super(...params)
  
        if (Error.captureStackTrace)
            Error.captureStackTrace(this, FetchError)
  
        this.name = 'FetchError'
        this.status = status
        this.date = new Date()
    }
}