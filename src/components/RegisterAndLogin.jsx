import {React,useState} from 'react'
import LoginForm from './LoginForm'
import SignUp from './SignUp'
import { Button } from './ui/button'


const RegisterAndLogin = () => {

  const [login,setLogin] = useState(false)

  const handleLogin = ()=> { 
    setLogin(true)
    return
  }
  const handleSignUp = ()=>{
    setLogin(false)
    return
  }
  

  return (
    <>
      <div className="hero w-[100vw] h-[92vh] bg-[#525259] flex items-center justify-center ">
        <div className="formbox w-[80vw] h-[85vh] bg-[#CFF250] opacity-80 flex rounded-2xl shadow-lg overflow-hidden">
          <div className="form-left w-[60%] h-[100%] bg-[#212226] text-white font-bold text-4xl">
           <div className="heading flex items-center justify-center h-[35vh]"> 
             <h1>Explore our brand new collections.<br/> Sign-In or Sign-Up here.</h1>
           </div>
           <div className='h-[50vh]  flex justify-center items-center gap-[4rem]'>
            {!login && <Button className='w-[10vw]'onClick={handleLogin} >Login</Button>}
            {login && <Button className='w-[10vw]' onClick={handleSignUp}>SignUp</Button>}
           </div>
          </div>
          <div className="form-right h-[100%] w-[40%]">
            
            <div className="form-main w-[100%] h-[100%] flex items-center justify-center">
              
              {
                !login && <SignUp/>
              }
              {
                login && <LoginForm/>
              }

            </div>
          
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterAndLogin
