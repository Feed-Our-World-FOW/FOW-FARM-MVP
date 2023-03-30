import React, { useState } from 'react'
import Image from 'next/image'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'

function FarmCard() {

  const [value, setValue] = useState<number | null>(0);

  const styles = {
    wholeCard: `w-36 h-44 bg-white border-1 drop-shadow-1.5lg rounded-md`,
    imgBox: `w-full h-24 rounded-xl`,
    infoBox: `flex flex-col p-2`,
    bigText: `text-sm indent-0 font-semibold`,
    smallText: `text-xs`
  }

  return (
    <div className={styles.wholeCard}>
      <div className={styles.imgBox}>
        <Image 
          src="/images/fow.png" 
          alt="image" 
          width={144}
          height={50}
          className='w-full h-full'
        />
      </div>
      <div className={styles.infoBox}>
        <span className={styles.bigText}>{`Chicago’s Pizza With A Twist`}</span>
        <span className={styles.smallText}>{`2734 United state, 362812...`}</span>
        <div className="flex w-full">
          <Stack spacing={1}>
            <Rating 
              name="half-rating" 
              defaultValue={0} 
              precision={0.1} 
              size='small' 
              value={value} 
              onChange={(event: any, newValue) => {
                setValue(newValue)
                console.log(event.target.value)
              }}
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

export default FarmCard