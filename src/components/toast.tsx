import { NextPage } from 'next';
import React from 'react'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const Toast: NextPage = () => (<ToastContainer autoClose={1000} theme="colored" />)

export default Toast