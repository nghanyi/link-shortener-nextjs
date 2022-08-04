import type { NextPage } from 'next'
import { ChangeEvent, Fragment, useState } from 'react'
import { toast } from 'react-toastify';
import Toast from '../components/Toast';

const Home: NextPage = () => {

  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleLongUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLongUrl(e.target.value);
  }

  const handleGenerateShortLink = () => {
    setShortUrl(longUrl);
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.info("Link copied to clipboard");
  }

  const handleReset = () => {
    setLongUrl('');
    setShortUrl('');
  }

  return (
    <div className='flex h-screen'>
      <div className='m-auto space-y-4'>
          <h1 className='text-3xl font-bold'>Welcome to Link Shortener</h1>
          {!shortUrl && (
            <div className='form-control w-full'>
              <div className='input-group'>
                <input type="text" placeholder='Enter link here' className='input input-bordered w-full' value={longUrl} onChange={handleLongUrlChange}/>
                <button className='btn btn-primary' onClick={handleGenerateShortLink}>Generate</button>
              </div>
            </div>
          )}
          {shortUrl && (
            <Fragment>
              <div className='form-control w-full'>
                <div className='input-group'>
                  <input type="text" className='input input-bordered w-full' value={shortUrl} disabled/>
                  <button className='btn btn-success' onClick={handleCopyLink}>Copy Link</button>
                </div>
              </div>
              <button className="btn btn-info w-full" onClick={handleReset}>Reset</button>
            </Fragment>
          )}
      </div>
      <Toast />
    </div>
  )
}

export default Home
