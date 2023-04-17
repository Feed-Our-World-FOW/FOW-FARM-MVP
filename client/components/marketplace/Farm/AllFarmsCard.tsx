import { Box, Skeleton, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'
import FarmCardComponent from './FarmCardComponent'

function AllFarmsCard(props: any) {
  

  const styles = {
    page: `w-screen flex flex-col justify-around items-center max-w-md`,
    navBox: `w-full px-4 z-50`,

    bannerBox: `w-full h-full border-1 w-11/12 h-44 rounded-xl drop-shadow-lg bg-white flex justify-center items-center`,
    catagorieBox: `w-full h-20 flex items-center`,
    top5: `rounded-xl bg-white ml-5 w-full h-70`,
    catagorieSubImg: `w-16 h-16 ml-3 rounded-lg bg-white drop-shadow-lg active:drop-shadow-0.5lg`,
    // allFarms: `w-full grid grid-cols-2 gap-y-3 gap-x-2 mobile:ml-2 mobileL:ml-4 z-0`,
    filterBox: `border-2 w-full h-20 mb-2 flex justify-start items-center`,
    scrollingBox: `w-full flex flex-col justify-around items-center max-w-md relative z-0 mt-44`,
    allFarms: `w-full flex flex-col justify-center items-center`,
    farmCardBox: `w-full flex justify-center items-center relative z-0 mt-5 mb-10 p-0`,
    filter: `w-20 h-20 rounded-full border-2`
  }
  return (
    <Box className="w-full p-0">
      <Box className={styles.farmCardBox}>
          <Box className={styles.allFarms}>
            {
              props.loading ?
              props.array.map((i: any) => {
                return (
                  <Box 
                    className='w-11/12 h-24 rounded-xl flex justify-between items-center mb-5 border-1 border-light-gray' 
                    key={i}
                  >
                    <Skeleton animation="wave" variant="circular" width={50} height={50} />
                    <Box className='w-8/12 h-full flex flex-col ml-3'>
                      <Skeleton animation="wave" width="70%">
                        <Typography>-</Typography>
                      </Skeleton>
                      <Skeleton animation="wave" width="30%">
                        <Typography>-</Typography>
                      </Skeleton>
                      <Skeleton animation="wave" width="30%">
                        <Typography>-</Typography>
                      </Skeleton>
                      <Skeleton animation="wave" width="70%">
                        <Typography>-</Typography>
                      </Skeleton>
                    </Box>
                    <Box className="h-full w-16 flex justify-center items-center">
                      <Skeleton animation="wave" width={50} height={50} />
                    </Box>
                  </Box>
                )
              })
              :
              props.allFarms.map((farm: any) => {
                const sendData = {
                  data: farm._id
                }
                return (
                  <Link
                    href={{
                      pathname: '/Components/FarmPage',
                      query: sendData
                    }}
                    className='text-black no-underline w-11/12 cursor-pointer'
                    key={farm._id}
                  >
                    <FarmCardComponent
                      key={farm._id}
                      id={farm._id}
                      name={farm.name}
                      images={farm.images}
                      location={farm.location}
                      meat={farm.meat}
                      produce={farm.produce}
                      ratingsAverage={farm.ratingsAverage}
                      loading={props.loading}
                    />
                  </Link>
                )
              })
            }    
          </Box>
        </Box>
      </Box>
  )
}

export default AllFarmsCard