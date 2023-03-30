import React from 'react'
import Image from 'next/image'

function LoginPage() {
  const styles = {
    page: `w-screen flex justify-center items-center`,
    bgCover: `w-screen h-screen backdrop-blur-sm flex flex-col justify-around items-center`,
    subBg: `w-11/12 h-5/6 flex flex-col justify-center items-center`,
    inputSubBox: `border-2 w-full`,
    inputBox: `w-9/12 flex flex-col justify-center items-start`,
    input: `focus:outline-none border-b-2 placeholder:font-semibold placeholder:text-black placeholder:text-center bg-transparent w-full`,
    btn: `w-10/12 h-full rounded-xl bg-pearl border-2`,
    optionText: `text-2sm font-semibold mt-5 mb-5`,
    bellowBox: `w-10/12 h-16 flex justify-center items-center`,
    round: `w-16 h-16 rounded-full`,
    btnBox: `w-full mt-5 h-8 flex justify-center`
  }

  return (
    <div id="bg-image" className={styles.page}>
      <div className={styles.bgCover}>  
        <div className={styles.subBg}>
          <div>
            <Image
              src={'/images/fow.png'}
              alt=''
              width={150}
              height={150}
              className='w-full h-full'
            />
          </div>
          <div className={styles.inputBox}>
            <span className='font-bold'>Email:</span>
            <div className={styles.inputSubBox}>
              <input type="text" className={styles.input} />
            </div>

            <span className='font-bold'>Password:</span>
            <div className={styles.inputSubBox}>
              <input type="password" className={styles.input} />
            </div>
            <span className='text-sm ml-auto'>forget password</span>
          </div>

          <div className={styles.btnBox}>
            <button className={styles.btn}>Login</button>
          </div>
          <span className={styles.optionText}>or login using</span>
          <div className={styles.bellowBox}>
            <div className={styles.round}>
              <Image
                src={'/images/google-logo.png'}
                alt=''
                width={200}
                height={200}
                className='w-full h-full'
              />
            </div>
            <div className={styles.round}>
              <Image
                src={'/images/facebook-icon.png'}
                alt=''
                width={200}
                height={200}
                className='w-full h-full'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage