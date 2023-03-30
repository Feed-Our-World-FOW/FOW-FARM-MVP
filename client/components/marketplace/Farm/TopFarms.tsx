import React, { useState } from 'react'
import Image from 'next/image'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'

function TopFarms() {

  // const [value, setValue] = useState<number | null>(0);

  const styles = {
    wholeCard: `w-10/12 bg-white border-1 rounded-xl ml-10 flex flex-col justify-center items-center drop-shadow-1.5lg`,
    imgBox: `w-9/12 h-36 rounded-xl flex jsutify-center items-center`,
    infoBox: `flex flex-col p-2 w-10/12`,
    bigText: `text-sm indent-0 font-semibold mr-auto`,
    smallText: `text-xs mr-auto`
  }
  return (
    <div className={styles.wholeCard}>
      <div className={styles.imgBox}>
        <Image 
          src="/images/fow.png" 
          alt="image" 
          width={100}
          height={50}
          className='w-full h-full'
        />
      </div>
      <div className={styles.infoBox}>
        <span className={styles.bigText}>{`Chicago’s Pizza With A Twist`}</span>
        <span className={styles.smallText}>{`2734 United state, 362812...`}</span>
        <div className="flex w-36 h-6">
          <Stack spacing={1}>
            <Rating 
              name="half-rating" 
              defaultValue={0} 
              precision={0.1} 
              size='small' 
              value={4} 
              // onChange={(event: any, newValue) => {
              //   setValue(newValue)
              //   console.log(event.target.value)
              // }}
            />
          </Stack>
          <Image 
            src="/images/veg.png" 
            alt="image" 
            width={19}
            height={4}
          />
          <Image 
            src="/images/nonveg1.png" 
            alt="image" 
            width={25}
            height={15}
          />
        </div>
      </div>
    </div>
  )
}

export default TopFarms