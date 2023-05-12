import React from 'react'
import Image from 'next/image'
// import { ImageTypeInterface } from '../../../interface/AllFarmsInterface'


function ImageCard(props: any) {

  const myLoader = () => {
    // return `http://localhost:5000/public/img/${props.type}/${props.image}`
    return `${props.image}`
  }

  const styles = {
    img: `w-full h-full`,
    rounded_img: `w-full h-full rounded-full`,
  }

  return (
    <div className='w-full h-full'>
      <Image
        alt='#'
        crossOrigin="anonymous"
        src={`${props.image}`}
        loader={myLoader}
        width={200}
        height={200}
        className={props.rounded ? styles.rounded_img : styles.img}
        onClick={() => console.log(props.image)}
      />
    </div>
  )
}

export default ImageCard