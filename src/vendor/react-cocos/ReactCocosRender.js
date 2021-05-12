import ReactReconcilerInstance from './ReconcilerInstance';

export function render(element, canvas, callback) {
    if (!canvas._rootContainer) {
        canvas._rootContainer = ReactReconcilerInstance.createContainer(
            canvas,
            false
        );
    }

    ReactReconcilerInstance.updateContainer(
        element,
        canvas._rootContainer,
        null,
        callback
    );
}

export function findCocosNode(componentOrElement) {
    if (componentOrElement == null) {
        return null;
    }

    if (componentOrElement instanceof window.cc.Node) {
        return componentOrElement;
    }

    return ReactReconcilerInstance.findHostInstance(componentOrElement);
}
