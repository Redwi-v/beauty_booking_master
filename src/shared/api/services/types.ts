export interface IGetServicesListPrams {
	search?: string;
	masterId?: number;
}

export interface IGetServicesRes {
  count: number
  list: Array<{
    id: number
    serviceTagId: number
    name: string
    price: number
    duration: number
    bookingId: any
    eventsId: any
    bookingList: Array<any>
    masterAccounts: Array<{
      id: number
      salonBranchId: number
      rating: number
      speciality: string
      about: string
      name: string
      lastName: string
      avatar: string
      canChangeSchedule: boolean
      canChangeBookingTime: boolean
      telegramId: string
    }>
    serviceTag: {
      id: number
      salonId: number
      name: string
      services: Array<{
        id: number
        serviceTagId: number
        name: string
        price: number
        duration: number
        bookingId: any
        eventsId: any
      }>
    }
  }>
}

export interface Service {
	id: number;
	price: number;
	time: number;
	name: string;
	tagName: string;
	salonId: number;
	bookingId: number;
}

export interface Count {
	services: number;
}
