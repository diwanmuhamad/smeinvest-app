import React from "react"
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SidebarChat = ({openSide, setOpenSide, setChatData, isLoading, setIsLoading}) => {
    const navigate = useNavigate()
    return (
        <div className={`sm:w-[20%] h-screen p-3 bg-zinc-900 sm:flex sm:flex-col ${openSide?"flex flex-col absolute w-[200px] sm:static z-10":"hidden"}`}>
            <div className="h-1/6 w-full">
                <div className="h-2/4 border-[1px] border-white rounded-lg w-full">
                    <button 
                    onClick={()=>{
                        if (!isLoading) {
                            setChatData([]); 
                            setOpenSide(false)
                        }
                        }}
                    className={`appearance-none h-full w-full text-white hover:bg-stone-800 hover:rounded-lg ${isLoading? "cursor-not-allowed opacity-50": ""}`}>+ New chat</button>
                </div>
            </div>
            <div className="h-4/6 w-full overflow-y-auto p-3">

            </div>
            <div className="w-full h-1/6 border-t-[1px] border-white p-3">
                <div className="w-full flex justify-between">
                    <p className="text-white">Logout</p>
                    <FaSignOutAlt className="text-red-700 cursor-pointer mt-1 text-lg"
                     onClick={()=>{
                        navigate('/')
                        localStorage.removeItem('token')
                      }}
                    />
                </div>
                {
                    openSide && 
                    <h2 
                    onClick={()=>setOpenSide(false)}
                    className="text-white mt-2 cursor-pointer sm:hidden">X</h2>
                }
            </div>

        </div>
    )
}

export default SidebarChat;