import React, { useState } from 'react'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Link from 'next/link';

function BottomNav() {
  const [value, setValue] = useState(0);

  const styles = {
    focus: `flex justify-center items-center focus:bg-green focus:rounded-3xl 
            focus:w-12 focus:pl-1 focus:pr-1 focus:pt-0.5 focus:h-8 focus:pb-0.5`,
    box: `flex flex-col justify-center items-center h-full w-12`,
    txt: `text-sm`
  }

  return (
    <Box className="w-full fixed bottom-0 max-w-md ">
      <BottomNavigation
        className='flex justify-around items-center'
        showLabels={true}
        sx={{
          backgroundColor: '#F6FDF7'
        }}
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue);
        }}
      >
        <Box  className={styles.box}>
          <button  className={styles.focus}>
            <ShoppingBagOutlinedIcon fontSize='small' />
          </button>
          <span className={styles.txt}>Consume</span>
        </Box>
        <Box  className={styles.box}>
          <button  className={styles.focus}>
            <FavoriteBorderIcon fontSize='small' />
          </button>
          <span className={styles.txt}>Favorites</span>
        </Box>
        <Box  className={styles.box}>
          <Link href={'/Auth/UserProfile'} className={styles.focus}>
            <PermIdentityIcon fontSize='small' />
          </Link>
          <span className={styles.txt}>Profile</span>
        </Box>
      </BottomNavigation>
    </Box>
  );
}

export default BottomNav