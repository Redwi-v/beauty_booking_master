import { apiInstance, cookies } from "../instance/instance"
import { signInRes } from "./types"


export const UserApi = {

  async signIn () {

    const telegram_id = 70

    const { data } = await apiInstance.post< signInRes >('/users/signin', { telegram_id })

    cookies.set('jwt', data.data.jwt)
    cookies.set('rt', data.data.rt)

    return data

  }

}
