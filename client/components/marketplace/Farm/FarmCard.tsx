import React, { useState } from 'react'
import Image from 'next/image'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import { FarmCardInterface } from '../../../interface/AllFarmsInterface'
import ImageCard from './ImageCard'


function FarmCard(props: FarmCardInterface) {

  const styles = {
    wholeCard: `w-36 h-44 bg-white drop-shadow-1.5lg rounded-md`,
    imgBox: `w-full h-24 rounded-xl`,
    infoBox: `flex flex-col p-2`,
    bigText: `text-sm indent-0 font-semibold`,
    smallText: `text-xs`
  }

  return (
    <div className={styles.wholeCard}>
      <div className={styles.imgBox}>
        <ImageCard 
          image={props.images}
          type='farms'
        />
      </div>
      <div className={styles.infoBox}>
        <span className={styles.bigText}>{props.name}</span>
        <span className={styles.smallText}>{props.location?.address}</span>
        <div className="flex w-full">
          <Stack spacing={1}>
            <Rating 
              name="read-only" 
              precision={0.1} 
              size='small' 
              value={props.ratingsAverage} 
            />
          </Stack>
          {
            props.meat &&
            <Image 
              src="/images/nonveg1.png" 
              alt="image" 
              width={25}
              height={15}
            />
          }

          {
            props.produce &&
            <Image 
              src="/images/veg.png" 
              alt="image" 
              width={19}
              height={4}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default FarmCard