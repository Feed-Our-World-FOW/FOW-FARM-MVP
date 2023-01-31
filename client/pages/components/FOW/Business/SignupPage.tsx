// import React, { useState } from 'react'
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import Link from 'next/link';
// import PersonIcon from '@mui/icons-material/Person';
// import EmailIcon from '@mui/icons-material/Email';
// import Button from '@mui/material/Button';
// import FoundationIcon from '@mui/icons-material/Foundation';
// import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';


// function SignupPage() {


//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [countryCode, setCountryCode] = useState('')
//   const [phone, setPhone] = useState('')
//   const [farmname, setFarmName] = useState('')

//   const Continue = async () => {
//     try {
//       console.log(name)
//       console.log(email)
//       console.log(countryCode+' '+phone)
//       console.log(farmname)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const styles = {
//     page: `w-screen h-screen flex flex-col justify-between items-center`,
//     navBox: `w-screen h-1/6 bg-slate-300/[.9] shadow-xl border-white-900/75 flex justify-around items-center max-w-screen-sm`,
//     aro: ``,
//     inputBox: `w-11/12 h-3/6 max-w-screen-sm flex flex-col justify-around items-center mt-5`,
//     text: `w-full flex justify-center`,
//     nameBox: `w-full flex justify-between bg-slate-300/[.9] shadow-2xl border-white-900/75 p-2 rounded-md max-w-sm`,
//     name: `focus:outline-none w-full bg-slate-300/[.0] border-white-900/75 ml-5 max-w-sm`,
//     email: `focus:outline-none w-full bg-slate-300/[.0] border-white-900/75 ml-5 max-w-sm`,

//     emailBox: `w-full flex justify-between bg-slate-300/[.9] shadow-2xl border-white-900/75 p-2 rounded-md max-w-sm`,
//     telephone: `flex justify-between w-full max-w-sm`,
//     leftNum: `w-1/6 border-b-4  flex justify-center items-center border-b-sky-500 bt-none border-t-transparent border-l-transparent border-r-transparent rounded-md bg-slate-300/[.9] shadow-2xl`,
//     rightNum: `w-4/5 border-b-4 p-2 border-b-sky-500 border-t-transparent border-l-transparent border-r-transparent rounded-md bg-slate-300/[.9] shadow-2xl`,
//     bottom: `w-11/12 h-2/5 flex flex-col justify-around items-center`,
//     continueBox: `w-full flex flex-col justify-center items-center max-w-sm`,
//     continue: `p-2 w-full max-w-sm`,

//   }

//   return (
//     <div className={styles.page}>
//       <div className={styles.navBox}>
//       <Link href="/components/FOW/Option">
//         <div className={styles.aro}>
//           <ArrowBackIcon color="primary" fontSize='large' />
//         </div>
//       </Link>
//         <span className="text-sm font-semibold">Welcome to the Business with FOW</span>
//       </div>
//       <div className={styles.inputBox}>
//         <div className={styles.text}>
//           <span className='text-xl text-slate-400 font-semibold	flex justify-center items-center'>Sign up to Business! <BusinessCenterIcon/></span>
//         </div>
//         <div className={styles.nameBox}>
//           <PersonIcon color='primary' fontSize='large' />
//           <input type="text" placeholder="John Doe" className={styles.name} onChange={(e) => setName(e.target.value)} value={name} />
//         </div>
//         <div className={styles.emailBox}>
//           <EmailIcon color='primary' fontSize='large' />
//           <input type="email" placeholder='johndoe@gmail.com' className={styles.email} onChange={(e) => setEmail(e.target.value)} value={email} />
//         </div>
//         <div className={styles.telephone}>
//           <div className={styles.leftNum}>
//             <input type="number" placeholder='+1' className='w-full focus:outline-none ml-3 text-sm font-semibold bg-slate-300/[.0] shadow-2xl' onChange={(e) => setCountryCode(e.target.value)} value={countryCode} />
//           </div>
//           <div className={styles.rightNum}>
//             <input type="tel" placeholder='Your Phone' className='w-full focus:outline-none text-sm font-semibold bg-slate-300/[.0] shadow-2xl' onChange={(e) => setPhone(e.target.value)} value={phone}/>
//           </div>
//         </div>
//         <div className={styles.nameBox}>
//           <FoundationIcon color='primary' fontSize='large' />
//           <input type="text" placeholder="John Doe Farm" className={styles.name} onChange={(e) => setFarmName(e.target.value)} value={farmname} />
//         </div>
//       </div>
//       <div className={styles.bottom}>
//         <div className={styles.continueBox}>
//           <Link href="/components/FOW/Business/FarmUpload">
//             <Button variant="contained" className={styles.continue} onClick={Continue}>Continue</Button>
//           </Link>
//           <div className="w-10 h-2 rounded-md bg-blue-300 mt-1.5">
//             <span> </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SignupPage