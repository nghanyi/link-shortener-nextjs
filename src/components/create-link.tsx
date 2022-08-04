import { NextPage } from 'next';
import React, { ChangeEvent, Fragment, useState } from 'react'
import { toast } from 'react-toastify';

type Url = {
    url: string
}

type ReqError = {
    error: string
}

const CreateLink: NextPage = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleLongUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLongUrl(e.target.value);
  }

  const handleGenerateShortLink = async () => {
    if (!longUrl.trim()) {
        toast.error('Please enter a URL');
        return;
    }

    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/create-url`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: longUrl })
    })
    if (resp.status === 201) {
        const data = await resp.json() as Url;
        setShortUrl(data.url);
    } else {
        const error = await resp.json() as ReqError;
        toast.error(error.error);
    }
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
    <div className='mt-4 space-y-4'>
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
  )
}

export default CreateLink