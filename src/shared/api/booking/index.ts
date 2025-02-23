import { apiInstance } from '../instance/instance';
import { ICreateBookingData, IGetBookingListRes } from './types';

export const bookingApi = {
	getListById(telegramId: string | number) {
		return apiInstance.get<IGetBookingListRes[]>('/events', { params: { telegramId } });
	},

	create(data: ICreateBookingData) {
		return apiInstance.post('/events', data);
	},

	delete(id: number) {
		return apiInstance.delete(`/events/${id}`);
	},
};
