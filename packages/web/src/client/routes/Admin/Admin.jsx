import React from 'react';
import classnames from 'classnames';

import Header from '../../shared/Header';

import styles from './Admin.less';

export default function Admin({ className }) {
	return <div className={classnames(styles.Header, className)}>
		<Header />
		<h2>Admin</h2>
		<a href='/admin/users'>Users</a>
	</div>;
}