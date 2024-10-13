import { apiInstance, objectToForm } from '../instance/instance';
import {
	Booking,
	IGetFreeTimeParams,
	IGetMastersParams,
	IGetMastersRes,
	IUpdateMasterBody,
	Master,
} from './types';

export const mastersApi = {
	async getList(params: IGetMastersParams) {
		return apiInstance.get<IGetMastersRes>('/master', { params: { ...params, search: '' } });
	},

	async getFreeTime(params: IGetFreeTimeParams) {
		return apiInstance.get<{ freeTime: string[] }>('/master/time/freeTime', { params });
	},

	async getOne(id: number) {
		return apiInstance.get<Master>(`/master/${id}`);
	},

	async getOneByTgId(id: number) {
		return apiInstance.get<Master>(`/master/telegram/${id}`);
	},

	async update(id: number | string, body: IUpdateMasterBody) {
		const objectForm = objectToForm(body);
		console.log(objectForm.get('workingDays'));

		const res = await apiInstance.patch<Master>(`/master/${id}`, objectForm);
		return res.data;
	},

	async getBookingByDate(params: { date: Date; masterId: number }) {
		return apiInstance.get<Booking[]>('master/booking/find/byDate', { params: params });
	},
};
