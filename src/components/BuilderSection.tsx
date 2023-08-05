import { useCallback, useEffect, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Background, Connection, Controls, Edge, EdgeChange, MarkerType, Node, NodeChange, OnConnect, OnEdgesChange, OnNodesChange } from 'reactflow';
import 'reactflow/dist/style.css';

import MessageNode from './Nodes/MessageNode.js';
import { NodeData } from '../types/all.js';


const nodeTypes = { messageNode: MessageNode };

const initNodes: Node[] = [
    { id: 'node-1', type: 'messageNode', position: { x: 50, y: 100 }, data: { textValue: 'Sample Message 1', isDisableSource: false } },
    { id: 'node-2', type: 'messageNode', position: { x: 350, y: 50 }, data: { textValue: 'Sample Message 2', isDisableSource: false } }
];


const BuilderSection = ({ createNewNode, updateNodeText, resetCreateNewNodeValue, messageNodeClicked }: { createNewNode: string, updateNodeText: NodeData, resetCreateNewNodeValue: () => void, messageNodeClicked: (nodeData: NodeData) => void }) => {
    const [allNodes, setAllNodes] = useState<Node[]>(initNodes);
    const [allEdges, setAllEdges] = useState<Edge[]>([]);

    const onNodesChange: OnNodesChange = useCallback(
        (changes: NodeChange[]) => { 
            setAllNodes((node: Node[]) => applyNodeChanges(changes, node))},
        [setAllNodes]
    );
    
    const onEdgesChange: OnEdgesChange = (changes: EdgeChange[]) => { 
        checkAndUpdateisDisableSource(changes)
        edgeChanged(changes)
    }

    const edgeChanged = useCallback((changes: EdgeChange[]) =>{ 
        setAllEdges((edge: Edge[]) => applyEdgeChanges(changes, edge))},[setAllEdges]
    );

    const checkAndUpdateisDisableSource = (changes: EdgeChange[])=>{
        const edge = changes[0];

        if(edge.type === "remove"){
            const nodes = edge.id.split("-");
            const nodeId = `node-${nodes[2]}`; 

            const updatedNodes = allNodes.map((node: Node) => {
                if (`${node.id}b` === nodeId) {
                    node.data.isDisableSource = false
                }

                return node;
            });
            setAllNodes(updatedNodes);
        }
    } 

    const onConnect: OnConnect = (connection: Connection) => { 
        updateSingleConnectionForNode(connection);
        newConnectionAdded(connection);
    }
  
    const newConnectionAdded = useCallback(
        (connection: Connection) => { 
        const newConnection = {
            ...connection,
            markerEnd: {
                type: MarkerType.ArrowClosed,
            },
        }
        setAllEdges((edges: Edge[]) => addEdge(newConnection, edges))
        },
        [setAllEdges]
    );

    const updateSingleConnectionForNode = (connection: Connection)=>{
        if(connection.source){
            const updatedNodes = allNodes.map((node: Node) => {
                if (node.id === connection.source) {
                    node.data.isDisableSource = true
                }

                return node;
            });
            setAllNodes(updatedNodes);
        }
    } 

    useEffect(() => {
        if (createNewNode === "messageNode") {
            const lastCurrentNode = allNodes[allNodes.length - 1];
            const newNode: Node = {
                id: `node-${allNodes.length + 1}`,
                type: "messageNode",
                position: { x: lastCurrentNode.position.x + 10, y: lastCurrentNode.position.y + 100 },
                data: { textValue: `Sample Message ${allNodes.length + 1}`, isDisableSource: false },
                selected: false,

            }
            setAllNodes((nodes) => nodes.concat(newNode));
            resetCreateNewNodeValue();
        }
    }, [createNewNode]);


    useEffect(() => {
        if (updateNodeText.id.length > 0) {
            const updatedNodes = allNodes.map((nodes) => {
                if (nodes.id === updateNodeText.id && nodes.data.textValue !== updateNodeText.textValue) {
                    nodes.data = { textValue: updateNodeText.textValue };
                }

                return nodes;
            });
            setAllNodes(updatedNodes);
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
            <Controls 
                showInteractive={false}
            />
        </ReactFlow>
    );
}

export default BuilderSection;
