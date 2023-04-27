import { Button, FormCheck } from 'react-bootstrap';
import { useUserContext } from "./context";


const Display = () => {

  const {
    strictMode,
    Power,
    StartBtn
  } = useUserContext();

return (<div>
  <div id="title" className="font-effect-emboss">SIMON!</div>
      <div id="switches">
      <label  className="text1">
     <FormCheck type="checkbox" id="on" className="toggle" onChange={Power()} />  POWER 
      </label>
      <Button className="button" id="start" onClick={StartBtn()}>Start</Button>
      <label  className="text1">
      <FormCheck type="checkbox" id="strict" className="toggle" onChange={strictMode()} />  STRICT 
      </label>
      </div>
      <div id="turn"></div>
      <div className="text2">
        COUNT
      </div>
</div>
);
}

export default Display;