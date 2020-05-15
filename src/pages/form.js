import React, { useState } from 'react'
import Layout from '../components/layout'

const Form = () => {
  const [email, setEmail] = useState('')
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  
  let formdata

  const resetForm = () => {
    setEmail('')
    setFirst('')
    setLast('')
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    let nd = new Date()
    let lDate = nd.toLocaleDateString()
    let lTime = nd.toLocaleTimeString()
    formdata = {
      date: `${lDate} ${lTime}`,
      email: email,
      first: first,
      last: last,
    }
    console.log(formdata)
    // let body = {
    //   formdata: formdata,
    // }
    resetForm()
  }



return (
  <Layout>
  <h1>Test Form</h1>
  <form onSubmit={(ev) => handleSubmit(ev)}>
    <input type="text" placeholder="Email" value={email} name="email" onChange={(ev) => setEmail(ev.target.value)} required="required" />
    <input type="text" placeholder="First Name" value={first} name="first" onChange={(ev) => setFirst(ev.target.value)} required="required" />
    <input type="text" placeholder="Last Name" value={last} name="last" onChange={(ev) => setLast(ev.target.value)} required="required" />
    <input type="submit" />
  </form>
  </Layout>
)}

export default Form