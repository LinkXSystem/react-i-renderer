import ReactReconciler from 'react-reconciler';

const HostConfig = {};
const ReactReconcilerInst = ReactReconciler(HostConfig)

export default {
    render: (reactElement, domElement, callback) => {
        if (!domElement._rootContainer) {
            domElement._rootContainer = ReactReconcilerInst.createContainer(domElement, false);
        }

        return ReactReconcilerInst.updateContainer(reactElement, domElement._rootContainer, null, callback)
    }
}