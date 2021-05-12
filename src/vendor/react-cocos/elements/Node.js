import _ from 'underscore';

const cc = window.cc;
const NODE_PROPS = [
    ['name', 'New Node'],
    ['width', 0],
    ['height', 0],
    ['active', true],
    ['opacity', 255],
    ['cascadeOpacity', true],
    ['groupIndex', 0],
    ['group'],
    ['color', cc.color(255, 255, 255)],
    ['x', 0],
    ['y', 0],
    ['rotation', 0],
    ['rotationX', 0],
    ['rotationY', 0],
    ['scaleX', 1],
    ['scaleY', 1],
    ['anchorX', 0.5],
    ['anchorY', 0.5],
    ['skewX', 0],
    ['skewY', 0],
];

const NODE_EVENTS = [
    ['onTouchStart', cc.Node.EventType.TOUCH_START],
    ['onTouchMove', cc.Node.EventType.TOUCH_MOVE],
    ['onTouchEnd', cc.Node.EventType.TOUCH_END],
    ['onTouchCancel', cc.Node.EventType.TOUCH_CANCEL],
    ['onMouseDown', cc.Node.EventType.MOUSE_DOWN],
    ['onMouseMove', cc.Node.EventType.MOUSE_MOVE],
    ['onMouseEnter', cc.Node.EventType.MOUSE_ENTER],
    ['onMouseLeave', cc.Node.EventType.MOUSE_LEAVE],
    ['onMouseUp', cc.Node.EventType.MOUSE_UP],
    ['onMouseWheel', cc.Node.EventType.MOUSE_WHEEL],
    ['onPositionChanged', 'position-changed'],
    ['onRotationChanged', 'rotation-changed'],
    ['onScaleChanged', 'scale-changed'],
    ['onSizeChanged', 'size-changed'],
    ['onAnchorChanged', 'anchor-changed'],
    ['onChildReorder', 'child-reorder'],
];

function initComponentProps(instance, props = {}) {
    if (instance instanceof cc.Sprite) {
        initSpriteComponentProps(instance, props);
    } else {
        applyComponentProps(instance, props);
    }
}

function updateComponentProps(instance, oldProps, newProps = {}) {
    applyComponentProps(instance, newProps);
}

function applyComponentProps(instance, props = {}) {
    Object.keys(props).forEach(key => {
        instance[key] = props[key];
    });
}

function applyNodeProps(node, props = {}) {
    NODE_PROPS.forEach(([key]) => {
        if (key in props) {
            node[key] = props[key];
        }
    });

    NODE_EVENTS.forEach(([name, type]) => {
        if (props[name]) {
            node.on(type, props[name]);
        }
    });
}

function updateNodeProps(node, oldProps = {}, newProps = {}) {
    NODE_PROPS.forEach(([key, defaultValue]) => {
        if (oldProps[key] !== newProps[key]) {
            if (key in newProps) {
                node[key] = newProps[key];
            } else {
                node[key] = defaultValue;
            }
        }
    });

    NODE_EVENTS.forEach(([name, type]) => {
        const newProp = newProps[name];
        const oldProp = oldProps[name];

        if (newProp === oldProp) {
            return;
        }

        if (oldProp) {
            node.off(type, oldProp);
        }

        if (newProp) {
            node.on(type, newProp);
        }
    });
}

function initSpriteComponentProps(instance, props) {
    const needPresetProps = [
        'spriteFrame',
        'type',
        'sizeMode',
        'fillType',
        'fillCenter',
        'fillStart',
        'fillRange',
        'trim',
    ];
    Object.keys(props).forEach(key => {
        if (needPresetProps.indexOf(key) === -1) {
            instance[key] = props[key];
        } else {
            instance[`_${key}`] = props[key];
        }
    });
}

function create(props = {}) {
    const node = new cc.Node();
    const { components = [] } = props;
    applyNodeProps(node, props);

    for (const { type, props } of components) {
        const instance = node.addComponent(type);
        initComponentProps(instance, props);
    }

    return node;
}

function update(node, oldProps, newProps) {
    const { components: newComps = [] } = newProps;
    const { components: oldComps = [] } = oldProps;
    const newCompTypes = newComps.map(comp => comp.type);
    const oldCompTypes = oldComps.map(comp => comp.type);
    const needUpdateComponents = _.intersection(newCompTypes, oldCompTypes);
    const needRemoveComponents = _.difference(oldCompTypes, newCompTypes);
    const needAppendComponents = _.difference(newCompTypes, oldCompTypes);

    const getPropsByComponentType = (list, type) => {
        for (let comp of list) {
            if (comp.type === type) {
                return comp.props;
            }
        }
        return null;
    };
    updateNodeProps(node, oldProps, newProps);

    for (const type of needUpdateComponents) {
        const oldProps = getPropsByComponentType(oldComps, type);
        const newProps = getPropsByComponentType(newComps, type);

        updateComponentProps(node.getComponent(type), oldProps, newProps);
    }

    for (const type of needRemoveComponents) {
        node.removeComponent(type);
    }

    for (const type of needAppendComponents) {
        const instance = node.addComponent(type);
        const props = getPropsByComponentType(newComps, type);
        initComponentProps(instance, props);
    }
}

export default {
    create,
    update,
};
