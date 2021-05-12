import invariant from 'fbjs/lib/invariant';

import Scene from './Scene';
import Node from './Node';
import Prefab from './Prefab';

const COCOS_ELEMENTS = {
    scene: Scene,
    node: Node,
    prefab: Prefab,
};

function createNode(type, props) {
    const creator = COCOS_ELEMENTS[type];

    invariant(!!creator, 'ReactCocos does not support your type "%s"', type);

    return creator.create(props);
}

function updateNode(node, type, oldProps, newProps) {
    const updator = COCOS_ELEMENTS[type];

    invariant(!!updator, 'ReactCocos does not support your type "%s"', type);

    return updator.update(node, oldProps, newProps);
}

export {
    createNode,
    updateNode,
};
