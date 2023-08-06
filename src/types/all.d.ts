// added custom interface types
export interface MessageNodeData {
    textValue: string,
    isDisableSource: boolean
}

export interface NodeData {
    id: string
    textValue: string
}

export interface NotificationData {
    show: boolean
    type: string
}