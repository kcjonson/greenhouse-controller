//console.log('Babel config found in @quivr/settings')
module.exports = { 
	'presets': ['@babel/preset-env', '@babel/preset-react'],
	'plugins': [
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-syntax-dynamic-import',
	],
}