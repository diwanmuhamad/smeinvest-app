import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';

const Login = () => {
    const navigate = useNavigate()
    const params = useLocation()
    let signup = false
    if (params && params.state) {
        signup = params.state.signup
    }
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })

    const isValid = () => {
        const empty = Object.entries(userData).filter((el) => el[1] === "")
        if (empty.length > 0) {
            let text = ""
            for (let j = 0; j < empty.length; j++) {
                if (j < empty.length - 1) {
                    text += empty[j][0] + ", "
                }
                else {
                    text += empty[j][0]
                }
            }
            toast.error(text + " can't be empty")
            return false
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(userData.email))
        {
            toast.error("Your Email Address is Wrong")
            return false
        }

        return true
    }

    const loginUser = () => {
       if (isValid()) {
        //submit data to api to check
        Axios.post(`${import.meta.env.VITE_REACT_API_URL}/auth/login`, userData)
        .then(function (response) {
          navigate('/', { state: {login: true}})
          localStorage.setItem("token", response.data.data.token);
          toast.success("Login Success")
        })
        .catch(function (error) {
          console.log(error);
          toast.error("Something Wrong")
        });
       }
    }

    useEffect(()=> {
        if (signup) {
            toast.success("Signup Success, Please Login to Continue")
        }
    }, [])
    return (
        <div className="bg-primary w-full overflow-hidden p-10">
             <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full border-solid border-2 border-white-600">
                        <h1 className="font-poppins mb-8 text-xl text-center"><Link className='appearance-none cursor-pointer' to={{pathname:'/'}}><span className='text-gradient text-2xl'>casablanca</span></Link><br className='mt-3'></br>Login</h1>

                        <input 
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email" 
                            onChange={(e)=>setUserData({...userData, email: e.target.value})}     
                        />

                        <input 
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password" 
                            onChange={(e)=>setUserData({...userData, password: e.target.value})}     
                        />

                        <button
                            type="button"
                            className="font-poppins w-full text-center py-3 rounded bg-red-gradient text-white text-poppins hover:cursor-pointer focus:outline-none my-1"
                            onClick={loginUser}
                        >Login</button>

                    </div>

                    <div className="text-black mt-6">
                        Don't have an account? <Link to={{pathname:'/signup'}} className='text-red-300 underline'>Sign Up</Link>
                    </div>
                    <ToastContainer/>
                </div>
            </div>
        </div>
       
    )
}

export default Login;