import { Draggable } from 'react-drag-and-drop'
import MessageIcon from "../assets/message-icon.svg";


const NodesPanel = () => {
    return (
        <div className="h-full w-full text-black border border-left border-slate-300 p-3">
            <div className="text-black font-medium mb-2">Nodes</div>
            <Draggable type="message-node" className="w-40">
                <div className='bg-white text-center text-sm py-3 h-auto text-blue-500 font-medium border border-blue-500 cursor-pointer rounded-md hover:drop-shadow-md'>
                    <img src={MessageIcon} alt="message" className="h-6 mb-1 mx-auto" />
                    Message
                </div>
            </Draggable>
        </div>

    )
};


export default NodesPanel;