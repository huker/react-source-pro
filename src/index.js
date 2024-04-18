import React from './react';
import ReactDOM from './react-dom/client';

// import React from 'react';
// import ReactDOM from 'react-dom/client';

class ClassComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	parentBubble() {
		console.log('parent Bubble');
	}

	childBubble() {
		console.log('child Bubble');
	}

	parentCapture() {
		console.log('parent Capture');
	}

	childCapture() {
		console.log('child Capture');
	}

	render() {
		return (
			<div id="parent" onClick={this.parentBubble} onClickCapture={this.parentCapture}>
				<button id="child" onClick={this.childBubble} onClickCapture={this.childCapture}>
					click {this.props.name}
				</button>
			</div>
		)
	}
}

const element = <ClassComponent name='huk123'></ClassComponent>;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(element);