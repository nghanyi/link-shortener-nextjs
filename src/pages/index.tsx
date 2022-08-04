import type { NextPage } from 'next'
import CreateLink from '../components/create-link';
import Toast from '../components/toast';

const Home: NextPage = () => {

  

  return (
    <div className='flex h-screen'>
      <div className='m-auto'>
          <h1 className='text-3xl font-bold'>Han Yi&apos;s Link Shortener</h1>
          <CreateLink />
      </div>
      <Toast />
    </div>
  )
}

export default Home
