import { apiInstance, cookies } from "../instance/instance"


export const masters = {

  async getList () {

    const telegram_id = 70

    const { data } = await apiInstance.post('/users/signin', { telegram_id })

    cookies.set('jwt', data.data.jwt)
    cookies.set('rt', data.data.rt)

    return data

  }

}
