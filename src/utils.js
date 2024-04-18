import { Children } from "react";
import { REACT_TEXT } from "./constants";

export function isUndefined(val) {
    return val === undefined || val === null;
}

/**
 * 为了更加语义化 也为了方便后续dom diff，我们把文本节点包装成虚拟dom
 * @param {*} element 
 */
export function wrapToVdom(element) {
    return typeof element === 'string' || typeof element === 'number' ? {
        type: REACT_TEXT,
        props: element
    } : element;
}