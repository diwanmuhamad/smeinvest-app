import {useState} from 'react';
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';

const SignUp = () => {
   
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
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

        if (userData.password.length < 8) {
            toast.error("Password must at least 8 character")
            return false
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(userData.email))
        {
            toast.error("Your Email Address is Wrong")
            return false
        }
        
        if (userData.password !== userData.confirmPassword) {
            toast.error("Your confirm password not match your password")
            return false
        }
        return true
    }

    const signUpUser = () => {
       if (isValid()) {
        //submit data to api
        Axios.post(`${import.meta.env.VITE_REACT_API_URL}/auth/signup`, userData)
          .then(function (response) {
            navigate('/login', { state: {signup: true}})
            toast.success("Sign Up Success")
          })
          .catch(function (error) {
            console.log(error);
            toast.error("Something Wrong")
          });
       }
    }

    return (
        <div className="bg-primary w-full overflow-hidden p-10">
             <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full border-solid border-2 border-white-600">
                        <h1 className="mb-8 text-xl text-center font-poppins"><Link className='appearance-none cursor-pointer' to={{pathname:'/'}}><span className='text-gradient text-2xl'>casablanca</span></Link><br className='mt-3'></br> Sign up</h1>
                        <input 
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="firstname"
                            placeholder="Firstname" 
                            onChange={(e)=>setUserData({...userData, firstName: e.target.value})}    
                        />
                        <input 
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="lastname"
                            placeholder="Lastname" 
                            onChange={(e)=>setUserData({...userData, lastName: e.target.value})}    
                        />
                            
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
                        <input 
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="confirm_password"
                            placeholder="Confirm Password" 
                            onChange={(e)=>setUserData({...userData, confirmPassword: e.target.value})}      
                        />

                        <button
                            type="button"
                            className="font-poppins w-full text-center py-3 rounded bg-red-gradient text-white text-poppins hover:cursor-pointer focus:outline-none my-1"
                            onClick={signUpUser}
                        >Create Account</button>

                        <div className="text-center text-sm text-grey-dark mt-4">
                            <p>
                                By signing up, you agree to the <a href='#' className='text-red-300 underline'>Term of Service</a> and <a href="#" className='text-red-300 underline'>Privacy Policy</a>
                            </p>
                        </div>
                    </div>

                    <div className="text-black mt-6">
                        Already have an account? <Link to={{pathname:'/login'}} className='text-red-300 underline'>Login</Link>
                    </div>
                    <ToastContainer/>
                </div>
            </div>
        </div>
       
    )
}

export default SignUp;