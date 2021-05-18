import BCocos from './B.cocos';

function ACocos ({c: C}) {
    console.log('a cocos render');
    return <C name="ACocos" y={-20} string="ACocos content 1">
        <BCocos c={C}/>
    </C>
}

export default ACocos;
