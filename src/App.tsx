import './App.css';
import { useState } from 'react';
import { Droppable } from 'react-drag-and-drop';
import BuilderSection from './components/BuilderSection';
import Header from './components/Header';
import SettingsPanel from './components/SettingsPanel';
import NodesPanel from "./components/NodesPanel";
import { NodeData } from './types/all';
import Notification from './components/Notification';


function App() {
  const [panel, setPanel] = useState("nodesPanel");
  const [createNewNode, setCreateNewNode] = useState("");
  const [isSaveClicked, setSaveClicked] = useState(false);
  const [selectedNode, setSelectedNode] = useState<NodeData>({ textValue: "", id: "" });

  const saveClicked = () => {
    console.log('---save clicked---')
    setSaveClicked(true);
  }

  const addNewMessage = () => {
    setCreateNewNode("messageNode");
  }

  const resetNewNodeValue = () => {
    setCreateNewNode("");
    setSaveClicked(false);
  }

  const updateMessageNoteClicked = (nodeData: NodeData) => {
    setSelectedNode(nodeData);
    setPanelValue("settingPanel");
  }

  const updateNodeText = (text: string) => {
    const value = { ...selectedNode };
    value.textValue = text;
    setSelectedNode(value);
  }

  const setPanelValue = (text: string) => {
    setPanel(text);
  }

  const handleOnDrop = (data) => {
    if(Object.keys(data)[0] === "message-node") addNewMessage();
  }

  return (
    <div className="bg-slate-50 w-screen h-screen">
      <Header saveClicked={saveClicked}/>
      <Notification/>
      <div className='h-[calc(100%-4rem)] w-full flex'>
        <Droppable onDrop={handleOnDrop} types={['message-node']} className="w-2/3 h-full">
          <BuilderSection updateNodeText={selectedNode} messageNodeClicked={updateMessageNoteClicked} createNewNode={createNewNode} resetCreateNewNodeValue={resetNewNodeValue} checkSaveSettings={isSaveClicked}/>
        </Droppable>
        <div className='w-1/3 h-full' id="panel-section">
          {
            panel === "nodesPanel" ?
              <NodesPanel />
              :
              <SettingsPanel currentText={selectedNode.textValue || ""} updateNodeText={updateNodeText} backClick={() => setPanelValue('nodesPanel')} />
          }
        </div>
      </div>
    </div>
  )
}

export default App
