import React from "react";
import BackIcon from "../assets/back-arrow.svg";

const SettingsPanel = ({ updateNodeText, currentText, backClick }: { updateNodeText: (string) => void, currentText: string, backClick: (string) => void }) => {

    const textareaChanged = (event: React.FormEvent<HTMLTextAreaElement>) => {
        updateNodeText(event.currentTarget.value);
    }

    return (
        <div className="h-full w-full text-black border border-left border-slate-300">
            <div className="text-black text-sm w-full h-12 border border-l-0 border-b border-slate-300 flex text-center items-center justify-center relative">
                <img src={BackIcon} alt="message" className="h-4 cursor-pointer absolute left-3" onClick={backClick}/>
                Message
            </div>
            <div className="pt-4 pb-6 px-3 border border-b">
                <div className="text-gray-700 text-sm text-left">
                    Text
                </div>
                <textarea
                    className="mt-3 block p-2.5 w-full text-sm bg-white text-gray-900 rounded-lg border focus:ring-blue-500 focus:border-blue-500"
                    onChange={textareaChanged}
                    value={currentText} 
                />
            </div>
        </div>
    )
};


export default SettingsPanel;