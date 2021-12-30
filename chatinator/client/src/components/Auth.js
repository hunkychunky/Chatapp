import { useState } from "react"
import axios from "axios"
import { useCookies } from "react-cookie";
// import {useCookies} from "react-cookie"
const Auth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [password_checked, setConfirmedPassword] = useState(null);
    const [error, setError] = useState(false);
    console.log(username, password, password_checked);
    
    

    const handleSubmit = async (endpoint) => {
        console.log(endpoint);
        console.log('submitted');
        if (!isLogin && password !== password_checked){
            setError(true)
            return
        }

        const response = await axios.post(`http://localhost:8000/${endpoint}`, {
            username,
            password
        })

        console.log(response);

        setCookie('Name', response.data.username)
        setCookie('HashedPassword', response.data.hashedPassword)
        setCookie('UserId', response.data.userId)
        setCookie('AuthToken', response.data.token)

        window.location.reload()
    }

    return (
        <div className="auth-container">
           <div className="auth-container-box">
               <div className="auth-container-form">
                   <input 
                      type="text" 
                      id="username"
                      name="username" 
                      placeholder="Username" 
                      onChange={(u) => setUsername(u.target.value)}
                   />
                   <input 
                      type="password" 
                      id="password" 
                      name="password"
                      placeholder="password" 
                      onChange={(u) => setPassword(u.target.value)}
                   />
                   {!isLogin && <input 
                      type="password" 
                      id="password_checked" 
                      name="password_checked"
                      placeholder="Confirm Password" 
                      onChange={(u) => setConfirmedPassword(u.target.value)}
                   />}
                   {error && <p> Please make sure the passwords match :)</p>}
                   <button className="standard-button" onClick={handleSubmit( isLogin ? 'login' : 'signup')}> Let's go! </button>
               </div>
               <div className="auth-options">
                   <button 
                   onClick={() => setIsLogin(false)}
                   style={{backgroundColor: !isLogin ? '#151a1f' : '#070a0d'}}
                   > Sign Up</button>
                   <button 
                   onClick={() => setIsLogin(true)}
                   style={{backgroundColor: isLogin ? '#151a1f' : '#070a0d'}}
                   > Login!</button>
               </div>
           </div>
        </div>
    )
} 
export default Auth
