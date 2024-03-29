import { useEffect, useState } from 'react';

import { User as UserModel } from '../models';

const modelMap = {
	'User': UserModel,
};

export const useData = (config, dependencies) => {
	console.log('useData');
	const [ data, setData ] = useState([]);
	useEffect(() => {
		console.log('useData.useEffect');
		const models = config.map(dataConfig => {
			const Model = modelMap[dataConfig.model];
			return new Model(dataConfig.params);
		});
		models.forEach(model => {
			model.on('change', () => {
				setData(models);
			});
		});
		setData(models);
	}, dependencies);
	return data;
};