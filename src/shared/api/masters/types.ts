import { Salon } from '../booking/types';

export interface IGetMastersParams {
	salonId: number;
	time?: Date;
	date?: Date;
	servicesIdList?: number[];
}

export interface IGetMastersRes {
	masters: Master[];
	mastersCount: number;
}

export interface Master {
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
  salonBranch: {
    id: number
    salonId: number
    createdAt: string
    updatedAt: string
    isOpen: boolean
    address: string
    latitude: string
    longitude: string
    salon: {
      id: number
      adminAccountUserId: number
      name: string
      logoUrl: string
      isOpen: boolean
      description: string
      createdAt: string
      updatedAt: string
    }
  }
}

export interface SalonBranch {
	id: number;
	salonId: number;
	masterServiceId: any;
	address: Address;
}

export interface Address {
	id: number;
	city: string;
	address: string;
	salonBranchId: number;
}

export interface Booking {
  id: number
  start: string
  duration: number
  title: string
  description: string
  masterAccountId: number
  salonId: number
  salonBranchId: number
  clientNumber: string
  clientName: string
  clientLastName: string
  clientComment: string
  clientAccountId: any
  client: any
  master: {
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
  }
  salon: {
    id: number
    adminAccountUserId: number
    name: string
    logoUrl: string
    isOpen: boolean
    description: string
    createdAt: string
    updatedAt: string
  }
  salonBranch: {
    id: number
    salonId: number
    createdAt: string
    updatedAt: string
    isOpen: boolean
    address: string
    latitude: string
    longitude: string
  }
  services: Array<{
    id: number
    serviceTagId: number
    name: string
    price: number
    duration: number
    bookingId: any
    eventsId: number
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

export interface MasterService {
	id: number;
	price: number;
	time: number;
	name: string;
	tagName: string;
	salonId: number;
	bookingId: number;
}

export interface IGetFreeTimeParams {
	date?: Date;
	masterId?: number | string;
	servicesIdList?: string[];
}

export interface IUpdateMasterBody {
	name?: string;
	lastName?: string;
	rating?: number;
	speciality?: string;
	about?: string;
	servicesIdArray?: number[];
	telegramId?: string;
	salonBranchId?: number;
	avatar?: File;
	email?: string;
	workingDays?: string[];
	endShift?: Date;
	startShift?: Date;
}
