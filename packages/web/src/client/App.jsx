import React from 'react';
import './App.less';
import { getRoute } from './routes';
import { useNavigation } from './util/nav';

const App = () => {
	const route = useNavigation();
	const routeConfig = getRoute(route);

	let routeComponent;
	if (routeConfig) {
		routeComponent = <routeConfig.component routeParams={routeConfig.params} />;
	} else {
		routeComponent = (<div>Not Found</div>);
	}

	return <div>
		{routeComponent}
	</div>;

};

export default App;