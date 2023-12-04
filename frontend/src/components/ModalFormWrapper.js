import {Modal} from "antd"
import { useState } from "react";
import "../index.css";
import { useEffect } from "react";


const ModalFormWrapper = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <Modal visible = {props.visible} 
    footer= {null}
    bodyStyle={{
        backgroundColor: "black"
    }}
    onCancel={()=>{  
      setVisible(false);
      props.cb(visible);
    }}>
    <div
      className='width-[60%] mx-[20%] my-[1%] rounded-[6px] bg-[rgba(0,0,0,0.8)] text-white p-2
  '
    >
      {props.children}
      
    </div>
    </Modal>
  );
};

export default ModalFormWrapper;
