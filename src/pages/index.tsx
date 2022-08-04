import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className='flex h-screen'>
      <div className='m-auto'>
        <h1 className='text-3xl font-bold'>Welcome to Link Shortener</h1>
      </div>
    </div>
  )
}

export default Home
