//type Success<T> = {isSuccess:boolean; value:T}
//type Fail = {isSuccess:boolean; error:string}
//export type Result<T> = Success<T> | Fail
//export const success = <T>(value:T):Success<T> => ({isSuccess:true, value})
//export const failed = (error:string):Fail => ({isSuccess:false, error})

export type Result<T> =
  | {isSuccess:true, value:T}
  | {isSuccess:false, error:string}

export const success = <T>(value:T):{isSuccess:true, value:T} => ({isSuccess:true, value})

export const failed = (error:string):{isSuccess:false, error:string} => ({isSuccess:false, error})

// ref 1: https://www.webdevtutor.net/blog/typescript-result-option
