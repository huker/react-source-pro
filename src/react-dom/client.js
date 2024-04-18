import { REACT_TEXT } from "../constants";
import { isUndefined } from "../utils";

function createRoot(container) {
	return {
		render: (rootVdom) => {
			// 挂载整个虚拟dom转化成真实dom添加到根容器中
			mountVdom(rootVdom, container);
		}
	}
}

function mountVdom(vdom, parentDom) {
	// 虚拟dom变成真实dom
	const domElement = createDOMElement(vdom);
	if (!domElement) return;
	// 真实dom添加到容器中
	parentDom.appendChild(domElement);
}

// 类组件虚拟dom处理
function createDOMElementFromClassComponent(vdom) {
	const { type, props } = vdom;
	const instance = new type(props);
	const classElement = instance.render();
	return createDOMElement(classElement);
}

// 函数组件虚拟dom处理
function createDOMElementFromFunctionComponent(vdom) {
	const { type, props } = vdom;
	const renderVdom = type(props);
	return createDOMElement(renderVdom);
}

// 原生组件虚拟dom处理
function createDOMElementFromNativeComponent(vdom) {
	const { type, props } = vdom;
	// 根据类型创建真实dom
	const domElement = document.createElement(type);
	// 根据属性更新dom元素
	updateProps(domElement, {}, props);
	// 挂载子节点
	mountChildren(vdom, domElement);
	return domElement;
}

/**
 * 把所有子节点也从虚拟dom变成真实dom，并挂在到父节点上
 */
function mountChildren(vdom, domElement) {
	const { props } = vdom;
	// 格式化children数组
	const children = Array.isArray(props.children) ? props.children : [props.children];
	children.forEach((child) => {
		// 挂在到父节点
		mountVdom(child, domElement);
	})
}

/**
 * 根据属性更新dom元素
 * 抽离此方法是为了后面更新的时候可以复用
 * @param {*} domElement  真实dom元素
 * @param {*} oldProps  旧属性
 * @param {*} newProps  更新的新属性
 */
function updateProps(domElement, oldProps = {}, newProps = {}) {
	Object.keys(newProps).forEach((name) => {
		if (name === 'children') {
			return;
		}
		if (name === 'style') {
			Object.assign(domElement.style, newProps.style);
		} else {
			// 事件绑定之类的 暂时不处理
			domElement[name] = newProps[name];
		}
	})
}

/**
 * 虚拟dom转化成真实dom
 * @param {*} vdom 虚拟dom
 * @returns 真实dom
 */
function createDOMElement(vdom) {
	// 如果传递的vdom是空 则直接返回null
	if (isUndefined(vdom)) return null;

	const { type, props } = vdom;

	// 文本节点
	if (type === REACT_TEXT) {
		return document.createTextNode(props);
	} else if (typeof type === 'function') {
		if (type.isReactComponent) {
			return createDOMElementFromClassComponent(vdom);
		} else {
			return createDOMElementFromFunctionComponent(vdom);
		}
	} else {
		return createDOMElementFromNativeComponent(vdom);
	}

	// const domElement = document.createElement(type);
	// Object.keys(props).forEach((name) => {
	// 	if (name === 'children') {
	// 		return;
	// 	}
	// 	if (name === 'style') {
	// 		Object.assign(domElement.style, props.style);
	// 	} else {
	// 		// 事件绑定之类的 暂时不处理
	// 		domElement[name] = props[name];
	// 	}
	// })
	// // 格式化children数组
	// const children = Array.isArray(props.children) ? props.children : [props.children];
	// children.forEach((child) => {
	// 	domElement.appendChild(createDOMElement(child));
	// })
	// return domElement;
}


const ReactDOM = {
	createRoot
}

export default ReactDOM;