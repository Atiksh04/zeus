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
    console.log('--update note text---', nodeData)
    setSelectedNode(nodeData);
    setPanel("settingPanel")
  }

  const updateNodeText = (text: string) => {
    const value = selectedNode;
    value.textValue = text;
    setSelectedNode(value);

    console.log('---inside updaye node text app tsx----', value, selectedNode)

  }

  return (
    <div className="bg-slate-50 w-screen h-screen">
      <Header />
      <div className='h-[calc(100%-4rem)] w-full flex'>
        <div className="w-2/3 h-full">
          <BuilderSection updateNodeText={selectedNode} messageNodeClicked={updateMessageNoteClicked} createNewNode={createNewNode} resetCreateNewNodeValue={resetNewNodeValue}/>
        </div>
        <div className='w-1/3 h-full'>
          {
            panel === "nodesPanel" ? 
            <NodesPanel addNewMessage={addNewMessage} />
            :<SettingsPanel currentText={selectedNode.textValue || ""} updateNodeText={updateNodeText}/>
            }
        </div>
      </div>
    </div>
  )
}

export default App
