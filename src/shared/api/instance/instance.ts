import axios, { AxiosError } from 'axios';
import { Cookies } from 'react-cookie';

export const cookies = new Cookies();

export const apiInstance = axios.create({
	baseURL: process.env.API_URL,
	timeout: 10000,
});

export const getFileUrl = (fileName: string) => `${process.env.API_URL}/files/${fileName}`;

apiInstance.interceptors.response.use(
	response => {
		return response;
	},
	(error: AxiosError) => {
		return Promise.reject(error.response?.data);
	},
);

export const objectToForm = (body: { [key: string]: any }) => {
	const dataForm = new FormData();
	for (let key in body) {
		//@ts-ignore

		if (body[key] === undefined) {
		} else {
			dataForm.append(key, body[key]);
		}
	}

	return dataForm;
};
