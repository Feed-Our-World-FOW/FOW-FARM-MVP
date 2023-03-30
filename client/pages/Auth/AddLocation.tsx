import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

function AddLocation() {

  const styles = {
    page: `w-screen flex flex-col justify-start items-center`,
    nav: `h-20 w-full bg-pearl flex justify-start items-center p-3`,
    inputBg: `rounded-lg drop-shadow-xl border-1`,
    text: `text-3sm font-semibold mt-5`,
    input: `w-full h-full rounded-lg p-1 focus:outline-none `,
    btn: `border-2 rounded-lg w-9/12 h-full flex justify-center items-center p-1 text-2sm font-semibold bg-pearl`,
    bottomBox: `w-full h-8 mt-12 mb-10 flex justify-center items-center`
  }
  return (
    <div className={styles.page}>
      <div className={styles.nav}>
        <ArrowBackIosIcon fontSize='small' />
        <span className='text-2sm font-semibold'>CANCEL</span>
      </div>
      <div className="w-full flex flex-col p-5">
        <span className='font-semibold mb-10'>Edit your address</span>

        <select name="pets" id="pet-select" className={styles.inputBg}>
          <option value="">--Please choose your country--</option>
          <option value="Goat">Goat</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
          <option value="parrot">Parrot</option>
          <option value="spider">Spider</option>
          <option value="goldfish">Goldfish</option>
        </select>

        <span className={styles.text}>{`Full name (First and Last name)`}</span>
        <div className={styles.inputBg}>
          <input type="text" className={styles.input} />
        </div>

        <span className={styles.text}>{`Mobile Number`}</span>
        <div className={styles.inputBg}>
          <input type="number" className={styles.input} />
        </div>

        <span className={styles.text}>{`Pincode`}</span>
        <div className={styles.inputBg}>
          <input type="text" className={styles.input} />
        </div>

        <span className='text-2sm font-semibold mt-5'>{`Flat, House no., Building Company, Apartment`}</span>
        <div className={styles.inputBg}>
          <input type="text" className={styles.input} />
        </div>

        <span className={styles.text}>{`Landmark`}</span>
        <div className={styles.inputBg}>
          <input type="text" className={styles.input} />
        </div>

        <span className={styles.text}>{`Town/City`}</span>
        <div className={styles.inputBg}>
          <input type="text" className={styles.input} />
        </div>

        <div className={styles.bottomBox}>
          <button className={styles.btn}>{`Deliver to this address`}</button>
        </div>

      </div>
    </div>
  )
}

export default AddLocation