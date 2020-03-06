import ReactReconciler from 'react-reconciler';

const RootHostContext = {};
const ChildHostContext = {};

const HostConfig = {
    now: Date.now,
    getRootHostContext: () => {
        return RootHostContext
    },
    prepareForCommit: () => { },
    resetAfterCommit: () => { },
    getChildHostContext: () => {
        return ChildHostContext
    },
    shouldSetTextContent: (type, props) => {
        return typeof props.children === 'string' || typeof props.children === 'number'
    },
    createInstance: (type, newProps, rootContainerInstance, _currentHostContext, workInProgress) => {
        const domElement = document.createElement(type)

        Object.keys(newProps).forEach(propName => {
            const propValue = newProps[propName]

            if (propName === 'children') {
                if (typeof propValue === 'string' || typeof propValue === 'number') {
                    domElement.textContent = propValue
                }
            } else if (propName === 'onClick') {
                domElement.addEventListener('click', propValue)
            } else if (propName === 'className') {
                domElement.setAttribute('class', propValue)
            } else {
                domElement.setAttribute(propName, propValue)
            }
        })

        return domElement;
    },
    createTextInstance: (text) => {
        return document.createTextNode(text)
    },
    appendInitialChild: (parent, child) => {
        parent.appendChild(child)
    },
    appendChild: (parent, child) => {
        parent.appendChild(child);
    },
    finalizeInitialChildren: (domElement, type, props) => { },
    supportsMutation: true,
    appendChildToContainer: (parent, child) => {
        parent.appendChild(child)
    },
    prepareUpdate: (domElement, oldProps, newProps) => {
        return true;
    },
    commitUpdate: (domElement, updatePayload, type, oldProps, newProps) => {
        Object.keys(newProps).forEach(propName => {
            const propValue = newProps[propName]

            if (propName === 'children') {
                if (typeof propValue === 'string' || typeof propValue === 'number') {
                    domElement.textContent = propValue
                }
            } else {
                domElement.setAttribute(propName, propValue)
            }
        })
    },
    commitTextUpdate: (textInstance, oldText, newText) => {
        textInstance.text = newText;
    },
    removeChild: (parentInstance, child) => {
        parentInstance.removeChild(child);
    }
};
const ReactReconcilerInst = ReactReconciler(HostConfig)

export default {
    render: (reactElement, domElement, callback) => {
        if (!domElement._rootContainer) {
            domElement._rootContainer = ReactReconcilerInst.createContainer(domElement, false)
        }

        return ReactReconcilerInst.updateContainer(reactElement, domElement._rootContainer, null, callback)
    }
}