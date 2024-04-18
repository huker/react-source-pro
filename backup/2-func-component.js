import React from './react';
import ReactDOM from './react-dom/client';

// import React from 'react';
// import ReactDOM from 'react-dom/client';

function FunctionComponent(props) {
	return (
		<div style={{ color: 'red' }}>
			hello
			<span style={{ color: 'blue' }}> {props.name}</span>
		</div>
	)
}
// 12是等价的，1是jsx的写法，经过webpack babel编译之后就是2这种js写法了
const element1 = <FunctionComponent name='huk' />
// const element2 = React.createElement(FunctionComponent, { name: "huk" });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(element1);