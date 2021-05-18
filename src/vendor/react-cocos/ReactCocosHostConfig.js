import invariant from 'fbjs/lib/invariant';
import emptyObject from 'fbjs/lib/emptyObject';

import { requestIdleCallback, now } from './scheduler';

import { createNode, updateNode } from './elements';

function debug(name, ...args) {
    // console.group(name);
    // for (let arg of args) {
    //     console.log(arg);
    // }
    // console.groupEnd(name);
}

export { now };

// -------------------
//     Basic
// -------------------
export function getPublicInstance(instance) {
    return instance;
}

export function getRootHostContext(/* rootContainerInstance */) {
    return {
        platform: window.CC_JSB ? 'native' : 'web',
    };
}

export function getChildHostContext(/* parentHostContext, type , rootContainerInstance */) {
    return emptyObject;
}

export function prepareForCommit(container) {
    debug('prepareForCommit', container);
    return null;
}

export function resetAfterCommit(container) {
    debug('resetAfterCommit', container);
}

export function createInstance(
    type,
    props,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
) {
    debug('createInstance', type, props, rootContainerInstance, hostContext, internalInstanceHandle);
    return createNode(type, props);
}

export function appendInitialChild(parent, child) {
    debug('appendInitialChild', parent, child);

    if (typeof child === 'string') {
        invariant(
            false,
            'plaint text node is not support. you should use <Node /> with cc.Label instead.'
        );
        return;
    }

    parent.addChild(child);
}

export function finalizeInitialChildren(/* instance, type, props, rootContainerInstance, hostContext */) {
    // noop
}

export function prepareUpdate(
    node,
    type,
    oldProps,
    newProps /*, rootContainerInstance, hostContext */
) {
    debug('prepareUpdate', node, type, oldProps, newProps);

    updateNode(node, type, oldProps, newProps);
}

export function shouldSetTextContent(/* type, props */) {
    return false;
}

export function shouldDeprioritizeSubtree(/* type, props */) {
    return false;
}

export function createTextInstance(
    text /*, rootContainerInstance, hostContext, internalInstanceHandle */
) {
    debug('createTextInstance', text);
    invariant(
        false,
        'plain text node is not supported, use <Node components={[{ type: cc.Label, props: { string: "%s"} }]} /> instead.',
        text.length > 10 ? text.substr(10) + '...' : text
    );
}

// TODO: improve
export const scheduleDeferredCallback = requestIdleCallback;
// export const  cancelDeferredCallback = cancelDeferredCallback;

export const scheduleTimeout = setTimeout;
export const cancelTimeout = clearTimeout;
export const noTimeout = -1;
export const isPrimaryRenderer = true;

// -------------------
//     Mutation
// -------------------
export const supportsMutation = true;

export function appendChild(parent, child) {
    debug('appendChild', parent, child);
    const { children } = parent;
    const index = children.indexOf(child);

    if (index >= 0) {
        children.splice(index, 1);
        children.push(child);

        children.forEach((child, i) => {
            child.zIndex = i;
        });
    } else {
        //防止删除已有节点之前的兄弟节点时，获取parent.children顺序错乱
        //需在此重排children的zIndex
        children.forEach((child, i) => {
            if (child.zIndex !== i) {
                child.zIndex = i;
            }
        })
        parent.addChild(child, children.length)
    }
}

export function appendChildToContainer(parent, child) {
    debug('appendChildToContainer', parent, child);
    const { children } = parent;
    const index = children.indexOf(child);

    if (index >= 0) {
        children.splice(index, 1);
        children.push(child);

        children.forEach((child, i) => {
            child.zIndex = i;
        });
    } else {
        children.forEach((child, i) => {
            if (child.zIndex !== i) {
                child.zIndex = i;
            }
        })
        parent.addChild(child, children.length);
    }
}

export function commitTextUpdate(/* instance, oldText, newText */) {
    // noop
}

export function commitMount(instance, type, props, internalInstanceHandle) {
    debug('commitMount', instance, type, props, internalInstanceHandle);
    // noop
}

export function commitUpdate(
    node,
    updatePayload,
    type,
    oldProps,
    newProps,
    internalInstanceHandle
) {
    debug(
        'commitUpdate',
        node,
        updatePayload,
        type,
        oldProps,
        newProps,
        internalInstanceHandle
    );
    node.attr(newProps);
}

export function insertBefore(parent, child, beforeChild) {
    debug('insertBefore', parent, child, beforeChild);

    const targetIndex = beforeChild.getSiblingIndex();
    const { children } = parent;

    if (child.parent === parent) {
        const currentIndex = child.getSiblingIndex();

        if (currentIndex < targetIndex) {
            child.setSiblingIndex(targetIndex - 1);
        } else {
            child.setSiblingIndex(targetIndex);
        }
    } else {
        parent.insertChild(child, targetIndex);
    }

    children.forEach((child, i) => {
        child.zIndex = i;
    });
}

export function insertInContainerBefore(parent, child, beforeChild) {
    debug('insertInContainerBefore', parent, child, beforeChild);

    const { children } = parent;
    const index = children.indexOf(child);

    if (index >= 0) {
        children.splice(index, 1);
    }

    children.splice(children.indexOf(beforeChild), 0, child);
    children.forEach((child, i) => {
        child.zIndex = i;
    });
}

export function removeChild(parent, child) {
    debug('removeChild', parent, child);
    parent.removeChild(child);
}

export function removeChildFromContainer(parent, child) {
    debug('removeChildFromContainer', parent, child);
    parent.removeChild(child);
}

export function resetTextContent(/* instance */) {
    // noop
}

export function clearContainer(...rest) {
    console.log('clearContainer');
    console.log(rest);
}
