export interface signInRes extends rootRes {

  data: {

    jwt: string,
    rt: string,

    user: IUser

  }

}

export interface IUser {

  id: number,
  name: string | null,
  telegram_id: string,

}