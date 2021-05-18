const prevRefreshReg = window.$RefreshReg$;
const prevRefreshSig = window.$RefreshSig$;
const RefreshRuntime = require("react-refresh/runtime");

window.$RefreshReg$ = (type, id) => {
    const fullId = module.id + " " + id;
    RefreshRuntime.register(type, fullId);
};
window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;

try {
    /// Actual component code
    const React = require("react");
    const ReactDOM = require('react-dom')
    const debounce = require("lodash.debounce");
    const A = require('./A').default;
    const B = require('./B').default;
    let enqueueUpdate = debounce(RefreshRuntime.performReactRefresh, 30);

    function DOMApp() {
        console.log('dom app render');
        return <div>DOM App<A/><B/></div>
    }

    ReactDOM.render(<DOMApp />, document.querySelector('#root'))

    const ReactCocos = require('./vendor/react-cocos').default
    const ACocos = require('./A.cocos').default;
    const BCocos = require('./B.cocos').default;

    const cc = window.cc;
    const options = {
        id: 'GameCanvas',
        scenes: [],
        debugMode: cc.DebugMode.ERROR,
        showFPS: false,
        frameRate: 30,
        jsList: [],
        groupList: ['default'],
        collisionMatrix: [[true]],
        renderMode: 2,
    };
    cc.game.run(options, function() {
        const scene = new cc.Scene();
        cc.director.runScene(
            scene,
            () => {},
            () => {
                ReactCocos.render(<App />, cc.director.getScene());
            }
        );
    });

    const Label = ({name, y = 0, string, children}) => <node
        name={name}
        components={[{
            type: window.cc.Widget,
            props: {
                isAlignTop: true,
                isAlignLeft: true,
                isAlignRight: true,
                isAlignBottom: true,
                top: -y,
            }
        }, {
            type: window.cc.Label,
            props: {
                string,
                fontSize: 12,
            }
        }]}
    >{children}</node>

    // class App extends React.Component{
    //   state = {n: 0}
    //   add = () => {
    //     this.setState({n: this.state.n+1});
    //   }
    //   render(){
    //     console.log('app');
    //     return (
    //         <Label />
    //     );
    //   }
    // }
    const App = () => {
        // const [n, setN] = React.useState(0);
        console.log('cocos app render');
        return (
            <Label name="Root" string="Cocos App">
                <ACocos c={Label} />
                {/*<BCocos c={Label} />*/}
            </Label>
        );
    };
    window.$RefreshReg$(App, "App");
    module.hot.accept();
    enqueueUpdate();
} finally {
    window.$RefreshReg$ = prevRefreshReg;
    window.$RefreshSig$ = prevRefreshSig;
}
