export interface IGetServicesListPrams {
	search?: string;
	masterId?: number;
}

export interface IGetServicesRes {
	list: List[];
}

export interface List {
	tagName: string;
	services: Service[];
	_count: Count;
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
