import Reconciler from 'react-reconciler';
import * as HostConfig from './ReactCocosHostConfig';

const ReactReconcilerInstance = Reconciler(HostConfig);
ReactReconcilerInstance.injectIntoDevTools({
    bundleType: 1,
    version: '1.0.0',
    rendererPackageName: 'react-cocos',
});

export default ReactReconcilerInstance;
