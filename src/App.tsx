import './App.css'
import BuilderSection from './components/BuilderSection';
import Header from './components/Header';
import SettingsPanel from './components/SettingsPanel';
import NodesPanel from "./components/NodesPanel";
import { NodeData } from './types/all';
import { useState } from 'react';

function App() {
  const [panel, setPanel] = useState("nodesPanel");
  const [createNewNode, setCreateNewNode] = useState("");
  const [selectedNode, setSelectedNode] = useState<NodeData>({textValue: "", id: ""});


  const addNewMessage = () => {
    setCreateNewNode("messageNode");
  }

  const resetNewNodeValue = () => {
    setCreateNewNode("");
  }

  const updateMessageNoteClicked = (nodeData: NodeData) => {
    setSelectedNode(nodeData);
    setPanelValue("settingPanel");
  }

  const updateNodeText = (text: string) => {
    const value = {...selectedNode};
    value.textValue = text;
    setSelectedNode(value);
  }

  const setPanelValue = (text: string) => {
    setPanel(text);
  }

  return (
    <div className="bg-slate-50 w-screen h-screen">
      <Header />
      <div className='h-[calc(100%-4rem)] w-full flex'>
        <div className="w-2/3 h-full" id="builder-section">
          <BuilderSection updateNodeText={selectedNode} messageNodeClicked={updateMessageNoteClicked} createNewNode={createNewNode} resetCreateNewNodeValue={resetNewNodeValue}/>
        </div>
        <div className='w-1/3 h-full' id="panel-section">
          {
            panel === "nodesPanel" ? 
            <NodesPanel addNewMessage={addNewMessage} />
            :<SettingsPanel currentText={selectedNode.textValue || ""} updateNodeText={updateNodeText} backClick={()=>setPanelValue('nodesPanel')}/>
            }
        </div>
      </div>
    </div>
  )
}

export default App
