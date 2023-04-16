import React from 'react'

function DebitCard(props: any) {

  const handleContinue = () => {
    try {
      props.setConfirm({
        address: true,
        payment: true,
        debitCard: true,
        order: false,
        value: 3
      })
    } catch (error) {
      console.log(error)
    }
  }

  const styles = {
    card: `w-screen flex flex-col justify-around items-center max-w-md`,
    bigTxt: `font-bold text-lg mr-auto ml-6 mt-10 mb-5`,
    subCards: `w-10/12 h-16 rounded-xl p-2 bg-white drop-shadow-1.5lg p-2 flex justify-start items-center mb-5`,
    input: `w-full h-full rounded-xl p-2 focus:outline-none`,
    smallSubCard: `w-5/12 h-14 rounded-xl p-2 bg-white drop-shadow-1.5lg p-2 flex justify-start items-center mb-5`,
    inputBg: `w-full h-full focus:outline-none`,
    bellowBox: `w-full flex flex-col justify-around items-center`,
    btn: `border-1 rounded-lg h-full w-10/12 p-1 bg-pearl`,
  }

  return (
    <div className={styles.card}>
      <span className={styles.bigTxt}>Enter card details</span>
      <div className={styles.bellowBox}>
        <div className={styles.subCards}>
          <input type="text" placeholder='Card Holder Name' className={styles.input} />
        </div>

        <div className={styles.subCards}>
          <input type="number" placeholder='Card number' className={styles.input} />
        </div>

        <div className="w-10/12">
          <span className='font-semibold text-2sm'>Expiry date</span>
        </div>

        <div className="w-10/12 flex justify-between items-center">
          <div className={styles.smallSubCard}>
            <select name="pets" id="pet-select" className={styles.inputBg}>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>
          <div className={styles.smallSubCard}>
            <select name="pets" id="pet-select" className={styles.inputBg}>
              <option value="2023">2023</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
          </div>
        </div>

        <div className="w-full h-10 mt-8 flex justify-center items-center">
          <button className={styles.btn} onClick={handleContinue}>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default DebitCard