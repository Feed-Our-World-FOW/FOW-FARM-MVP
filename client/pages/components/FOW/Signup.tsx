import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';


function Signup() {
  const URL = `https://fow-api-production.up.railway.app/api/v1/user/signup`

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => setShowPassword(!showPassword)

  const Continue = async () => {
    try {
      if(password !== passwordConfirm) {
        alert("Your Passwords not matched")
        return
      }

      const response = await axios.post(URL, { 
        name: name, 
        email: email, 
        password: password, 
        passwordConfirm: passwordConfirm 
      })

      let token = response.data.token
      console.log("response: ", token)
    } catch (error: any) {
      alert(`${error.response.data.message}`)
    }
  }

  const styles = {
    fullPage: `w-screen h-screen flex flex-col justify-between items-center`,
    top: `w-11/12 h-3/6 flex flex-col justify-around items-center`,
    bottom: `w-11/12 h-2/5 flex flex-col justify-around items-center`,
    aro: `w-full cursor-pointer`,
    text: `w-full flex justify-center`,
    nameBox: `w-full flex justify-between bg-slate-300/[.9] shadow-2xl border-white-900/75 p-2 rounded-md max-w-sm`,
    name: `focus:outline-none w-full bg-slate-300/[.0] border-white-900/75 ml-5 max-w-sm`,
    emailBox: `w-full flex justify-between bg-slate-300/[.9] shadow-2xl border-white-900/75 p-2 rounded-md max-w-sm`,
    email: `focus:outline-none w-full bg-slate-300/[.0] border-white-900/75 ml-5 max-w-sm`,
    telephone: `flex justify-between w-full max-w-sm`,
    leftNum: `w-1/6 border-4 border-b-sky-500 bt-none border-t-transparent border-l-transparent border-r-transparent rounded-md bg-slate-300/[.9] shadow-2xl`,
    rightNum: `w-4/5 border-4 border-b-sky-500 border-t-transparent border-l-transparent border-r-transparent rounded-md bg-slate-300/[.9] shadow-2xl`,
    continueBox: `w-full flex flex-col justify-center items-center max-w-sm`,
    continue: `p-2 w-full max-w-sm`,
    apps: `w-10/12 flex justify-around max-w-sm`,
    app: `w-14`,
    smallText: ``,
    login: `w-screen h-14 flex justify-center items-center bg-sky-400 cursor-pointer hover:bg-sky-500 active:bg-sky-600`,
    logo: `bg-slate-300/[.4] shadow-2xl border-white-900/75 rounded-full cursor-pointer`,
    passwordBox: `w-full flex justify-between bg-slate-300/[.9] shadow-2xl border-white-900/75 p-2 rounded-md max-w-sm`,
  }
  return (
    <div className={styles.fullPage}>
      <div className={styles.top}>
        <div className={styles.aro}>
          <Link href="/">
            <ArrowBackIcon color="primary" fontSize='large' />
          </Link>
        </div>
        <div className={styles.text}>
          <span className='text-xl text-slate-400 font-semibold	'>Sign up to continue!</span>
        </div>
        <div className={styles.nameBox}>
          <PersonIcon color='primary' fontSize='large' />
          <input type="text" placeholder="John Doe" className={styles.name} onChange={(e) => setName(e.target.value)} value={name} />
        </div>
        <div className={styles.emailBox}>
          <EmailIcon color='primary' fontSize='large' />
          <input type="email" placeholder='johndoe@gmail.com' className={styles.email} onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className={styles.passwordBox}>
          {
            showPassword ?
            <VisibilityOffIcon onClick={handleShowPassword} color='primary' fontSize='large' /> :
            <VisibilityIcon onClick={handleShowPassword} color='primary' fontSize='large' /> 
          }
          <input type={showPassword ? "password" : "text"} placeholder='Password*' className={styles.email} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className={styles.passwordBox}>
          <VisibilityOffIcon color='primary' fontSize='large' />
          <input type="password" placeholder='Password Confirm*' className={styles.email} onChange={(e) => setPasswordConfirm(e.target.value)} />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.continueBox}>
          <Link href="/">
            <Button type='submit' variant="contained" className={styles.continue} onClick={Continue}>Continue</Button>
          </Link>
          <div className="w-10 h-2 rounded-md bg-blue-300 mt-1.5">
            <span> </span>
          </div>
        </div>
        <div className={styles.apps}>
          <div className={styles.logo}>
            <img src="/images/facebook-icon.png" className={styles.app} />
          </div>
          <div className={styles.logo}>
            <img src="/images/apple-logo.png" className={styles.app} />
          </div>
          <div className={styles.logo}>
            <img src="/images/google-logo.png" className={styles.app} />
          </div>
        </div>
        <div className={styles.smallText}>
          <Link href="/">
            <span className='text-sky-700 cursor-pointer'>Already have an account?</span>
          </Link>
        </div>
      </div>
        <div className={styles.login}>
          <span className='text-white font-semibold'>LOGIN</span>
        </div>
    </div>
  )
}

export default Signup