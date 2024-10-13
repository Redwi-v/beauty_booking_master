import { apiInstance } from '../instance/instance';
import { IGetServicesListPrams, IGetServicesRes } from './types';

export const servicesApi = {
	getList(params?: IGetServicesListPrams) {
		return apiInstance.get<IGetServicesRes>('services', { params });
	},
};
