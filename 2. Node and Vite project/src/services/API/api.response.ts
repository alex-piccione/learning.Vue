export interface Ok<a> { Data: a }
export interface Fail { Error:string}

export type Response<a> = a | string
