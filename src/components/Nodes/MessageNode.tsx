// import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { MessageNodeData } from '../../types/all';
import MessageIcon from "../../assets/message-icon.svg";
import WhatsappIcon from "../../assets/whatsapp-icon.svg";

const MessageNode = ({ data, isConnectable }:{data: MessageNodeData, isConnectable: boolean}) => {

  // const onChange = useCallback((evt:  React.FormEvent<HTMLInputElement>) => {
  //   console.log(evt.currentTarget.value, data);
  // }, []);

  return (
    <div className="h-20 w-56 drop-shadow-md border rounded-lg">
      <Handle type="target" id="a" position={Position.Left} isConnectable={isConnectable} />
      <div className='h-full w-full'>
        <div className='flex items-center justify-between w-full bg-[#b4efe3] h-7 rounded-t-lg'>
          <div className='text-black text-xs font-semibold flex items-center w-full py-1 '>
            <img src={MessageIcon} alt="message" className="h-3 mr-2 ml-2"/>
            Send Message
          </div>
          <div className='py-0.5 px-1 bg-white rounded-full mr-4'>
            <img src={WhatsappIcon} alt="message" className="h-3"/>
          </div>
        </div>
        <div className='bg-white h-[calc(100%-1.75rem)] rounded-b-lg text-black text-sm truncate text-left pb-1 pt-2 px-2'>
          {data.textValue.length > 0 ?  data.textValue : 'Sample text'} 
        </div>
      </div>
      <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default MessageNode;
