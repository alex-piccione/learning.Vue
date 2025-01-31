import { UserApi, type CreateUserRequest, type CreateUserResponse } from "./API/User.api";
import { failed, success, type Result } from "./Result";

const date = new Date

export interface CreateRequest { 
    email:string
    username:string | null
    password: string
    passwordRepeat: string
}

class UserService {

    create = async (request:CreateRequest): Promise<Result<CreateUserResponse>> => {

        if (request.password.trim() != request.passwordRepeat.trim())
        {
            return failed("L10N:Password and Password Repeat should be the same.")
        }

        return await UserApi.create({
            email: request.email.trim(),
            username: request.username?.trim() || null,
            password: request.password.trim()
            })
            .then(ok => ok)
            .catch(error => error)
    }
}

export default UserService