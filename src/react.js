import { wrapToVdom } from "./utils";

/**
 * 创建React元素，也就是虚拟DOM的工厂方法
 * @param {*} type DOM类型
 * @param {*} config 配置对象（属性
 * @param {*} children 子（们）
 * @returns 
 */
function createElement(type, config, children) {
	const props = { ...config };
	if (arguments.length > 3) {
		// 以arguments为this指针，调用数组的slice方法
		props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
	} else {
		props.children = wrapToVdom(children);
	}
	return {
		type,
		props
	}
}

class Component {
	// 标识这是个类组件而不是函数组件
	static isReactComponent = true;
	constructor(props) {
		this.props = props;
	}
}

const React = {
	createElement,
	Component
}

export default React;