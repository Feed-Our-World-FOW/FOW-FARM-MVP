import type { NextPage } from 'next'
import AllFarms from './Components/AllFarms'

const Home: NextPage = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <AllFarms />
    </div>
  )
}

export default Home
