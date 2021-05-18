import React, {useState} from 'react';
class C extends React.PureComponent {
    render(){
        console.log('c cocos render');
        return null
    }
}
function BCocos ({c: Comp}) {
    console.log('b cocos render');
    const [n, setN] = useState(0);
    setTimeout(() => {
        setN(1);
    }, 1000);
    return <Comp name="BCocos" y={-40} string={`${n} BCocos content 2`}>
        <C />
    </Comp>
}
export default BCocos;

