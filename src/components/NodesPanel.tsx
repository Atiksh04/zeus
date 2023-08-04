import MessageIcon from "../assets/message-icon.svg";



const NodesPanel = ({addNewMessage}:{addNewMessage: ()=> void}) => {
    return (
        <div className="h-full w-full text-black border border-left border-slate-300 p-3">
           <div className='bg-white text-center text-sm py-3 w-40 h-auto text-blue-500 font-medium border border-blue-500 cursor-pointer rounded-md hover:drop-shadow-md' onClick={addNewMessage}>
                <img src={MessageIcon} alt="message" className="h-6 mb-1 mx-auto"/>
                Message
            </div>
        </div>
    )
};


export default NodesPanel;