function create(props) {
    return window.cc.instantiate(props.data);
}

function update(node, oldProps, newProps) {
    return {};
}

export default {
    create,
    update,
};
