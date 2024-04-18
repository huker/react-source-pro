import React from './react';
import ReactDOM from './react-dom/client';

const element1 = React.createElement(
	'div', {
	style: { color: 'red' }
},
	'hello',
	React.createElement(
		'span',
		{ style: { color: 'blue' } },
		'world'
	)
)

// 上下完全等价
let jsxElement = (
	<div style={{ color: 'red' }}>
		hello
		<span style={{ color: 'blue' }}>world</span>
	</div>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	jsxElement
);