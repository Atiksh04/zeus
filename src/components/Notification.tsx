import { useEffect } from "react";
import { NotificationData } from "../types/all";


const Notification = ({notificationData, resetNotificationData}: {notificationData: NotificationData, resetNotificationData: ()=>void }) => {
    
    useEffect(()=>{
        setTimeout(()=>{
            resetNotificationData();
        }, 5000)
    },[])
    
    return (
        <div className="absolute top-2 left-0 right-0">
            <div className={`w-44 rounded-md py-4 px-3 text-black mx-auto font-bold ${notificationData?.type === 'error' ? 'bg-rose-300': 'bg-green-300'}`}>
                {
                    notificationData?.type === 'error' ? 
                    'Cannnot save flow'
                    : 'Flow saved!'
                }
            </div>
        </div>
    )
}

export default Notification;