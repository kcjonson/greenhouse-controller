'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);


const srcFolder = 'src';
const buildFolder = 'build';
const clientFolder = 'client';
module.exports = {
	clientBuild: resolveApp(`${buildFolder}/${clientFolder}`),
	clientSrc: resolveApp(`${srcFolder}/${clientFolder}`),
	clientIndexHtml: resolveApp(`${srcFolder}/${clientFolder}/index.html`),
	clientIndexJs: resolveApp(`${srcFolder}/${clientFolder}/index.jsx`),
	publicPath: '/static',
};