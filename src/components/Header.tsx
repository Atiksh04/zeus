
const Header = ({saveClicked}:{saveClicked: ()=> void})=>{
    // rendering save button
    return(
        <div className='bg-gray-200 w-full h-16 flex justify-end'>
            <div className="w-1/3 flex items-center justify-center h-full">
                <div className='bg-white text-sm py-3 px-7 h-auto text-blue-500 font-bold w-auto border border-blue-500 cursor-pointer rounded-md hover:drop-shadow-md' onClick={saveClicked}>
                    Save Changes
                </div>
            </div>
        </div>
    )
}



export default Header;