

const Notification = () => {
    return (
        <div className="absolute top-2 left-0 right-0">
            <div className={`w-44 rounded-md py-4 px-3 text-black font-bold ${true ? 'bg-rose-300': 'bg-green-300'}`}>
                {
                    true ? 
                    'Cannnot save flow'
                    : 'Flow saved!'
                }
            </div>
        </div>
    )
}

export default Notification;