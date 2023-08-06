import './App.css';
import { useState } from 'react';
import { Droppable } from 'react-drag-and-drop';
import BuilderSection from './components/BuilderSection';
import Header from './components/Header';
import SettingsPanel from './components/SettingsPanel';
import NodesPanel from "./components/NodesPanel";
import { NodeData, NotificationData } from './types/all';
import Notification from './components/Notification';

function App() {
  const [panel, setPanel] = useState("nodesPanel");
  const [createNewNode, setCreateNewNode] = useState("");
  const [isSaveClicked, setSaveClicked] = useState(false);
  const [selectedNode, setSelectedNode] = useState<NodeData>({ textValue: "", id: "" });
  const [notificationData, setNotificationData] = useState<NotificationData>({ show: false, type: 'error' })

  // storing node and showing settings panel
  const updateMessageNoteClicked = (nodeData: NodeData) => {
    setSelectedNode(nodeData);
    setPanel("settingPanel")
  }

  // updating text of selected node
  const updateNodeText = (text: string) => {
    const value = { ...selectedNode };
    value.textValue = text;
    setSelectedNode(value);
  }

  // adding new message node on drop event
  const handleOnDrop = (data) => {
    if (Object.keys(data)[0] === "message-node") setCreateNewNode("messageNode");
  }

  // setting notification data
  const areSettingsValid = (val: boolean) => {
    setNotificationData({
      show: true,
      type: val ? 'success' : 'error'
    })
  }

  // resetting data to default
  const resetNotificationData = () => {
    setNotificationData({
      show: false,
      type: 'error'
    })
  }

  // resetting new node values
  const resetNewNodeValue = () => {
    setCreateNewNode("");
    setSaveClicked(false);
  }

  return (
    <div className="bg-slate-50 w-screen h-screen">
      <Header saveClicked={() => setSaveClicked(true)} />
      {
        notificationData?.show ? <Notification notificationData={notificationData} resetNotificationData={resetNotificationData} /> : null
      }
      <div className='h-[calc(100%-4rem)] w-full flex'>
        <Droppable onDrop={handleOnDrop} types={['message-node']} className="w-2/3 h-full">
          <BuilderSection updateNodeText={selectedNode} messageNodeClicked={updateMessageNoteClicked} createNewNode={createNewNode} resetCreateNewNodeValue={resetNewNodeValue} checkSaveSettings={isSaveClicked} updateSavedSetting={areSettingsValid} />
        </Droppable>
        <div className='w-1/3 h-full' id="panel-section">
          {
            panel === "nodesPanel" ?
              <NodesPanel />
              :
              <SettingsPanel currentText={selectedNode.textValue || ""} updateNodeText={updateNodeText} backClick={() => setPanel('nodesPanel')} />
          }
        </div>
      </div>
    </div>
  )
}

export default App
