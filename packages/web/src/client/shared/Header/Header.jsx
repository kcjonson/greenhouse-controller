import React from 'react';
import classnames from 'classnames';
import styles from './Header.less';

import { navigate } from '../../util/nav';

export default function Header({ className }) {
	return <header className={classnames(styles.Header, className)}>Header
		<div className='user'>
			<ol className='menu'>
				<li>Profile</li>
				<li>Settings</li>
				<li><a href='/logout' onClick={navigate}>Logout</a></li>
			</ol>
		</div>
	</header>;
};
