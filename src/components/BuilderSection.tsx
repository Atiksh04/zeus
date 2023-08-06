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


const BuilderSection = ({ createNewNode, updateNodeText, resetCreateNewNodeValue, messageNodeClicked, checkSaveSettings, updateSavedSetting }: { createNewNode: string, updateNodeText: NodeData, resetCreateNewNodeValue: () => void, messageNodeClicked: (nodeData: NodeData) => void, checkSaveSettings: boolean, updateSavedSetting: (val: boolean) => void }) => {
    const [allNodes, setAllNodes] = useState<Node[]>(initNodes);
    const [allEdges, setAllEdges] = useState<Edge[]>([]);

    // function to handle addition of a new node. Caching this function with useCallback
    const onNodeChangeHandler: OnNodesChange = useCallback(
        (changes: NodeChange[]) => {
            setAllNodes((node: Node[]) => applyNodeChanges(changes, node))
        },
        [setAllNodes]
    );

    // if source exists in the connection the for the valid node adding isDisableSource which will disable new edge creation
    const updateSingleConnectionForNode = (connection: Connection) => {
        if (connection.source) {
            const updatedNodes = allNodes.map((node: Node) => {
                if (node.id === connection.source) {
                    node.data.isDisableSource = true
                }

                return node;
            });
            setAllNodes(updatedNodes);
        }
    }

    // handles on connect event and calls updateSingleConnectionForNode function to add isDisable source to limit edges
    const onConnectHandler: OnConnect = useCallback(
        (connection: Connection) => {
            updateSingleConnectionForNode(connection);
            const newConnection = {
                ...connection,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                },
            }
            setAllEdges((edges: Edge[]) => addEdge(newConnection, edges))
        },
        [setAllEdges, allNodes]
    );


    // function to handle edge changes. Also calling checkAndUpdateIsDisableSource function to remove isDisableSource from node
    const onEdgesChangeHandler: OnEdgesChange = useCallback(
        (changes: EdgeChange[]) => {
            checkAndUpdateIsDisableSource(changes)
            setAllEdges((edge: Edge[]) => applyEdgeChanges(changes, edge))
        },
        [setAllEdges, allNodes]
    );

    // checks if the event type in remove and updates the required node
    const checkAndUpdateIsDisableSource = (changes: EdgeChange[]) => {
        const edge = changes[0];
        if (edge.type === "remove") {
            // computing the node ID by splitting
            const nodes = edge.id.split("-");
            const nodeId = `node-${nodes[2]}`;

            // for valid node setting isDisableSource to be false. So that pointer a new edge can be created.
            const updatedNodes = allNodes.map((node: Node) => {
                if (`${node.id}b` === nodeId) {
                    node.data.isDisableSource = false
                }

                return node;
            });
            setAllNodes(updatedNodes);
        }
    }

    // if createNewNode props changes and has value as messageNode then creating a node and updating allNodes
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

    // if updateNodeText props changes then updating the valid node textValue
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

    // on checkSaveSettings prop change, checking if the save settings are valid
    useEffect(() => {
        if (checkSaveSettings === true) {
            let result = false;
            if (allNodes.length !== 1) {
                // adding all nodes ids to an array
                const nodeIds = allNodes.map((node: Node) => { return node.id });
                const mapping = {};
                // iterating on all edges and if target exist in the nodeIds array then adding an entry to mapping
                allEdges.forEach((edge: Edge) => {
                    if (nodeIds.indexOf(edge.target) > -1)
                        mapping[edge.target] = nodeIds.indexOf(edge.target);
                });
                result = Object.keys(mapping).length === (allNodes.length - 1);
            }
            // updating parent component with the result
            updateSavedSetting(result);
            resetCreateNewNodeValue();
        }
    }, [checkSaveSettings])

    // handling node click event to open settings panel
    const onNodeClickHandler = (_: React.MouseEvent, currentNode: Node) => {
        if (currentNode?.type === "messageNode") {
            const data: NodeData = {
                id: currentNode?.id,
                textValue: currentNode?.data?.textValue
            }
            messageNodeClicked(data);
        }
    }

    return (
        // rendering builder section with zoom-in, zoom-out controls
        <ReactFlow
            nodes={allNodes}
            edges={allEdges}
            onNodesChange={onNodeChangeHandler}
            onEdgesChange={onEdgesChangeHandler}
            onConnect={onConnectHandler}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClickHandler}
        >
            <Background />
            <Controls
                showInteractive={false}
            />
        </ReactFlow>
    );
}

export default BuilderSection;
