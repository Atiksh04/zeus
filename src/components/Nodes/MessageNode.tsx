import { Handle, Position } from 'reactflow';
import { MessageNodeData } from '../../types/all';
import MessageIcon from "../../assets/message-icon.svg";
import WhatsappIcon from "../../assets/whatsapp-icon.svg";

const MessageNode = ({ data, isConnectable }:{data: MessageNodeData, isConnectable: boolean}) => {
  return (
    <div className="h-20 w-56 drop-shadow-md border rounded-lg">
      {/* target handle with id as 'a' */}
      <Handle type="target" id="a" position={Position.Left} isConnectable={isConnectable} style={{ height: '0.5rem', width: '0.5rem' }}/>
      {/* adding custom text and string value */}
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
          {data?.textValue?.length > 0 ?  data.textValue : 'Sample text'} 
        </div>
      </div>
      {/* source handle with id as 'b' which is disabled if value data.isDisableSource is false to limit one edge from source */}
      <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable} isConnectableStart={!data?.isDisableSource}  style={{ height: '0.5rem', width: '0.5rem' }}/>
    </div>
  );
}

export default MessageNode;
