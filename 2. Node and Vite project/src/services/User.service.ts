import { manageError } from "./API/api";
import { UserApi, type Signup} from "./API/User.api";
import { failed, success, type Result } from "./Result";

const date = new Date

export interface SignupInput {
    email:string
    username:string | null
    password: string
    passwordRepeat: string
}

class UserService {

  signup = async (request:SignupInput): Promise<Result<Signup.Response>> => {
    if (request.password.trim() != request.passwordRepeat.trim())
    {
      return failed("L10N:Password and Password Repeat should be the same.")
    }

    return await UserApi.signup({
      email: request.email.trim(),
      username: request.username?.trim() || null,
      password: request.password.trim()
    })
    .then(result => result)
    .catch(manageError)
  }
}

export default UserService
