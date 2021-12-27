import { useState } from "react"

const Auth = () => {
    const [username, setUsername] = useState(null);
    console.log(username);
    const [password, setPassword] = useState(null);
    console.log(password);
    const [password_check, setConfirmedPassword] = useState(null);
    console.log(password_check);
    const [error, setError] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit =()=> {
        console.log('submitted');
        if (password !== password_check){
            setError(true)
            return
        }
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
                      id="password_check" 
                      name="password_check"
                      placeholder="Confirm Password" 
                      onChange={(u) => setConfirmedPassword(u.target.value)}
                   />}
                   {error && <p> Please make sure the passwords match :)</p>}
                   <button className="standard-button" onClick={handleSubmit}> Let's GO! </button>
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