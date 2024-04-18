import React from './react';
import ReactDOM from './react-dom/client';

// import React from 'react';
// import ReactDOM from 'react-dom/client';

/**
 * 定义类组件继承父类React.Component
 */
class ClassComponent extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div style={{ color: 'red' }}>hello {this.props.name}</div>
		)
	}
}

const element = <ClassComponent name='huk123'></ClassComponent>;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(element);