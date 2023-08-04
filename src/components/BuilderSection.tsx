import { useCallback, useEffect, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Background, Connection, Controls, Edge, EdgeChange, Node, NodeChange } from 'reactflow';
import 'reactflow/dist/style.css';

import MessageNode from './Nodes/MessageNode.js';
import { NodeData } from '../types/all.js';


const nodeTypes = { messageNode: MessageNode };

const initNodes: Node[] = [
    { id: 'node-1', type: 'messageNode', position: { x: 0, y: 0 }, data: { textValue: 'Sample Message 1' } },
    { id: 'node-2', type: 'messageNode', position: { x: 224, y: 100 }, data: { textValue: 'Sample Message 2' } }
];

const initEdges = [
    { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a', animated: true },
];


const BuilderSection = ({ createNewNode, updateNodeText, resetCreateNewNodeValue, messageNodeClicked }: { createNewNode: string, updateNodeText: NodeData, resetCreateNewNodeValue: () => void ,messageNodeClicked: (nodeData: NodeData) => void }) => {
    const [allNodes, setAllNodes] = useState(initNodes);
    const [allEdges, setAllEdges] = useState(initEdges);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setAllNodes((node: any) => applyNodeChanges(changes, node)),
        [setAllNodes]
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setAllEdges((edge: Edge) => applyEdgeChanges(changes, edge)),
        [setAllEdges]
    );
    const onConnect = useCallback(
        (connection: Connection) => setAllEdges((edges: Edge) => addEdge(connection, edges)),
        [setAllEdges]
    );

    useEffect(()=>{
        if(createNewNode === "messageNode"){
            const lastCurrentNode = allNodes[allNodes.length - 1];
            const newNode: Node = {
                id: `node-${allNodes.length + 1}`,
                type: "messageNode",
                position: { x: lastCurrentNode.position.x + 150, y: lastCurrentNode.position.y + 50},
                data: { textValue: `Sample Message ${allNodes.length + 1}`},
                selected: false,

            }
            setAllNodes((nodes) => nodes.concat(newNode));
            resetCreateNewNodeValue();
        }
    }, [createNewNode]);


    useEffect(()=>{
        console.log('---allnodeds updateNodeText----', updateNodeText)
    }, [updateNodeText])

    useEffect(()=>{
        console.log('--inside update nodetext and need to update the value----', updateNodeText)

        if(updateNodeText.id.length > 0){
            console.log('--inside if condtion update nodetext and need to update the value----')
            const currentNode = allNodes.map((nodes)=>{ 
                if( nodes.id === updateNodeText.id && nodes.data.textValue !== updateNodeText.textValue){
                    nodes.data = {textValue: updateNodeText.textValue};
                }

                return nodes;
            });

            console.log('====setting currentnode====', currentNode)

            setAllNodes(currentNode);
        }
    }, [updateNodeText])

    const onNodeClick = (_: React.MouseEvent, currentNode: Node) => {
        if (currentNode?.type === "messageNode") {
            const data: NodeData = {
                id: currentNode?.id,
                textValue: currentNode?.data?.textValue
            }
            messageNodeClicked(data);
        }
    }

    return (
        <ReactFlow
            nodes={allNodes}
            edges={allEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
        >
            <Background />
            <Controls />
        </ReactFlow>
    );
}

export default BuilderSection;
