import {useState, useEffect} from 'react';
import { SidebarChat, MainChat } from '../component';
import { useNavigate } from 'react-router-dom';


const Chat = () => {
    const navigate = useNavigate()
   
    const [chatData, setChatData] = useState([])
    const [openSide, setOpenSide] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=> {
        if (!localStorage.getItem('token')) {
            navigate("/login")
        }
    }, [])
    return (
        <div className="bg-primary w-full overflow-hidden flex">
            <SidebarChat openSide={openSide} setOpenSide={setOpenSide} setChatData={setChatData} isLoading={isLoading} setIsLoading={setIsLoading}/>
            <MainChat chatData={chatData} setChatData={setChatData} setOpenSide={setOpenSide} isLoading={isLoading} setIsLoading={setIsLoading}/>
        </div>
    )
}

export default Chat;