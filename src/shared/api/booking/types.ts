export interface IGetBookingListRes {
	id: number;
	createdAt: string;
	updatedAt: string;
	time: string;
	masterAccountId: number;
	status: string;
	clientTelegramId: string;
	clientName: string;
	clientPhone: string;
	clientComment?: string;
	masterComment?: string;
	adminComment?: string;
	salonId: number;
	salonBranchId: number;
	master: Master;
	salon: Salon;
	salonBranch: SalonBranch;
	services: Service[];
}

export interface Master {
	id: number;
	name: string;
	lastName: string;
	email: string;
	salonId: number;
	salonBranchId: number;
	rating: number;
	speciality: string;
	about: string;
	avatar: any;
	canChangeSchedule: boolean;
	telegramId: string;
}

export interface Salon {
	salonId: number;
	salonOwnerAccountId: number;
	name: string;
	logoUrl: string;
	isOpen: boolean;
	description: string;
	createdAt: string;
	updatedAt: string;
}

export interface SalonBranch {
	id: number;
	salonId: number;
	masterServiceId: any;
	address: {
		address: string;
		city: string;
		id: number;
		salonBranchId: number;
	};
}

export interface Service {
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
		services: any[]
  }
}

export interface ICreateBookingData {
  start: string
  duration: number
  salonBranch: number
  title: string
  description: string
  masterId: number
  servicesIdArr: Array<number>
  clientNumber: string
  clientName: string
  clientLastName: string
  clientComment: string
}
