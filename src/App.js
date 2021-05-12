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
    let enqueueUpdate = debounce(RefreshRuntime.performReactRefresh, 30);

    function DOMApp() {
        console.log('dom app render');
        return <div>DomApp 3</div>
    }

    ReactDOM.render(<DOMApp />, document.querySelector('#root'))

    const ReactCocos = require('./vendor/react-cocos').default

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

    const Label = () => <node
        name="Label"
        components={[{
            type: window.cc.Widget,
            props: {
                isAlignTop: true,
                isAlignLeft: true,
                isAlignRight: true,
                isAlignBottom: true,
            }
        }, {
            type: window.cc.Label,
            props: {
                string: 'CocosApp 8',
            }
        }]}
    />

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
            <Label />
        );
    };
    window.$RefreshReg$(App, "App");
    module.hot.accept();
    enqueueUpdate();
} finally {
    window.$RefreshReg$ = prevRefreshReg;
    window.$RefreshSig$ = prevRefreshSig;
}

// function App() {
//   console.log('test x');
//   return (
//       // <Label string="hello world xxxx"/>
//       <div>div xxx</div>
//   );
// }

// export default App;
