import { readFileSync } from 'fs';
import { resolve } from 'path';
import logger from './logger';


export default function renderPage(staticPath) {
	logger.debug('Rendering Page', staticPath);
	let manifestString, manifest;
	manifestString = readFileSync(resolve(staticPath, 'assets-manifest.json'));
	manifest = JSON.parse(manifestString);


	function makeStaticUrl(path) {
		return `/static/${path}`;
	}

	const mainJS = makeStaticUrl(manifest['main.js']);
	const mainCSS = makeStaticUrl(manifest['main.css']);
	const vendorJS = makeStaticUrl(manifest['vendor.js']);
	const vendorCSS = makeStaticUrl(manifest['vendor.css']);

	return`
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="theme-color" content="#000000">
		<title>Greenhouse</title>
		${manifest['main.css'] ? `<link href="${mainCSS}" rel="stylesheet" type="text/css"></script>`: ''}
		${manifest['vendor.css'] ? `<link href="${vendorCSS}" rel="stylesheet" type="text/css"></script>` : ''}
	</head>
	<body>
		<noscript>
		We're sorry but the Greenhouse app reqires Javacript! Enable Javascript in your browser to run or contact support
		</noscript>
		<div id="app-root"></div>
		<div id="modal-root"></div>
		<script src="${vendorJS}"></script>
		<script src="${mainJS}"></script>
	</body>
	</html>
	`;
}
