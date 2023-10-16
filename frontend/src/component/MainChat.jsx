import {useEffect, useState} from "react"
import { FaLocationArrow, FaBars, FaPlus } from "react-icons/fa";
import { cblogo } from "../assets";
import { Link } from "react-router-dom";
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainChat = ({chatData, setChatData, setOpenSide, isLoading, setIsLoading}) => {
    const [question, setQuestion] = useState("")

    const submitChat = () => {
        let temp = [...chatData]
        temp.push({user:true, msg: question})
        setChatData(temp)
        setQuestion("")
        setIsLoading(true)
        Axios.post(`${import.meta.env.VITE_REACT_API_URL}/ai/quest-ans`, {
            question: question
          }, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
          }).then(function (response) {
            let temp2 = [...temp]
            temp2.push({...response.data, user: false})
            setChatData(temp2)
          })
          .catch(function (error) {
            console.log(error);
            toast.error("Something Wrong")
          }).finally(()=> setIsLoading(false))
          ;
    }

    useEffect(()=> {
        const input = document.querySelector('#prompt')
        const contPrompt = document.querySelector('#contPrompt')
        function autosize(){
            var el = this;
            setTimeout(function(){
                if (el.scrollHeight <= 126) {
                    el.style.cssText = 'height:auto; padding:0';
                    el.style.cssText = 'height:' + el.scrollHeight + 'px';
                }
            },0);
          }
        input.addEventListener('keydown', autosize)
    },[])
    return (
        <div className="h-full w-full">
            
            <div className="h-[10%] bg-zinc-900 w-full flex justify-between p-3 sm:hidden text-gray-400">
                <FaBars className="mt-1 cursor-pointer"
                onClick={()=>setOpenSide(true)}
                />
                <h2>New Chat</h2>
                <FaPlus
                onClick={()=> {
                    if (!isLoading) {
                        setChatData([])
                    }
                }} 
                className={`mt-1 cursor-pointer ${isLoading? "cursor-not-allowed opacity-50": ""}`}/>
            </div>
            <div className="bg-neutral-800 w-full h-screen px-[10%] py-4">
           
                <div className="overflow-y-auto h-5/6 w-full">
                    {
                        chatData.length === 0 ?
                        <div className="w-full h-full p-4">
                            {/* <Link className='appearance-none cursor-pointer' to={{pathname:'/'}}><img src={cblogo} className="h-[20%] w-[20%] mx-auto"/></Link> */}
                            {/* <h3 className="text-gray-200 text-2xl mx-auto">Casablanca</h3> */}
                            <div className="w-full h-[50%] flex p-3 justify-between">
                                <div className="w-[60%] h-[80%] rounded bg-neutral-600 shadow-xl m-auto p-5">
                                    <div className="text-center">
                                        <Link className="appearance-none cursor-pointer" to={{pathname:'/'}}><h3 className="text-gray-400 text-2xl hover:text-red-400">Casablanca Chatbot</h3></Link>
                                        <ol className="text-left mt-4 text-gray-400">
                                            <li>1. Welcome! &#128075;</li>
                                            <li>2. Start your conversation here</li>
                                            <li>3. Let us assist you to find what you need</li>
                                        </ol>
                                    </div>
                                </div>
                                {/* <div className="w-[30%] h-[60%] rounded py-3 px-2 bg-neutral-600 shadow-xl text-center text-gray-400 text-[12px] sm:text-base">Find Your Best Buyers</div>
                                <div className="w-[30%] h-[60%] rounded py-3 px-2 bg-neutral-600 shadow-xl text-center text-gray-400 text-[12px] sm:text-base">Start The Deal</div>
                                <div className="w-[30%] h-[60%] rounded py-3 px-2 bg-neutral-600 shadow-xl text-center text-gray-400 text-[12px] sm:text-base">Match Your Needs</div> */}
                            </div>
                        </div>
                        :
                        <div>
                            {
                                chatData.map((el) => {
                                    return(
                                        el.user?
                                        <div key={el.msg}
                                        className="w-full flex mb-10"
                                        
                                        >
                                        <p className="text-gray-400">You:</p>
                                        <p className="text-white ml-2">{el.msg}</p></div>
                                        :
                                        <div
                                        className="w-full flex mb-5 bg-zinc-700 p-5 rounded" 
                                        key={el.data}>
                                        <p className="text-gradient">CB: </p>
                                        <p className="text-white ml-2">{el.data}</p></div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
                <div className="relative h-1/6 w-full py-3">
                    <div className={`bg-zinc-700 rounded z-10 absolute top-[-28px] text-[10px] left-[16%] py-3 px-4 xs:left-[24%] ss:left-[30%] sm:left-[36%] sm:text-[12px] sm:top-[-32px] md:text-[14px] md:top-[-34px] ${isLoading? "" : "hidden"}`}>
                        <p className="text-white">Generating Response. Please Wait...</p>
                    </div>
                    <div id="contPrompt" className="relative flex h-[68%] w-full shadow-2xl bg-neutral-600 rounded">
                        <textarea
                        id="prompt"
                        value={question}
                        onChange={(e)=>setQuestion(e.target.value)}
                        className="max-height-full resize-none appearance-none outline-none w-full bg-neutral-600 px-[20px] py-[15px] sm:py-[15px] rounded text-white overflow-hidden" placeholder="Send Message...">
                        </textarea>
            
                        <FaLocationArrow
                            onClick={() => {
                                if (!isLoading) {
                                    submitChat()
                                }
                            }}
                            className={`text-gray-400 cursor-pointer absolute bottom-5 right-5 ${isLoading? "cursor-not-allowed opacity-50": ""}`}
                        />
   
                    </div>
                </div>
                <ToastContainer/>
            </div>
        </div>
       
    )
}

export default MainChat;