function create(props) {
    const scene = new window.cc.Scene();

    scene.autoReleaseAssets = props.autoReleaseAssets;

    return scene;
}

function update(scene, oldProps, newProps) {}

export default { create, update };
