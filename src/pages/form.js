require('dotenv').config()
import React, { useState } from 'react'
import Layout from '../components/layout'
import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/firebase-functions'
const nodemailer = require('nodemailer')
const cors = require('cors')({origin: true})

const serviceAccount = require('../../serviceAccountKey.json')

firebase.initializeApp({ serviceAccount, projectId: 'secret-beacon-274315' })

const db = firebase.firestore() 

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MY_DOIT_EMAIL,
    pass: process.env.MY_EMAIL_PSWD
  }
})

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const mailOptions = {
      from: process.env.MY_DOIT_EMAIL,
      to: process.env.MY_DOIT_EMAIL,
      subject: 'Notification from Test App',
      text: 'This is some text I\'m sending',
      html: `<h1>Wow</h1><p>How about that! ${name} sent an email</p>`,
    }
    //return result
    return transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.send(err.toSting())
      }
      return res.send('Sent')
    })
  })
})

db.collection('members').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    console.log(doc.data())
  })
})

const Form = () => {
  const [email, setEmail] = useState('')
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [subscribe, setSubscribe] = useState(true)
  const [thanks, setThanks] = useState('Subscribe')
  
  let formdata

  const resetForm = () => {
    setEmail('')
    setFirst('')
    setLast('')
    setSubscribe(true)
  }

  const validateFirst = (ev) => {
    ev.preventDefault()
    let emailVerifyRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^,.()[\]\\.;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim
    console.log('Valid?', email.match(emailVerifyRegex))
    // let emailVal = () => {
      if (email.match(emailVerifyRegex) === null) {
        alert('Invalid email! Please try again.')
        setEmail('')
        return
      } else {
        handleSubmit(ev)
        console.log('Great! It worked')
    }
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    let nd = new Date()
    let lDate = nd.toLocaleDateString()
    let lTime = nd.toLocaleTimeString()
    formdata = {
      date: lDate, lTime,
      email: email,
      first: first,
      last: last,
      subscribe: subscribe,
    }
    setMember(formdata)
  }
  
  const setMember = (formdata) => {
    let membersRef = db.collection('members')
    console.log('email:', formdata.email, 'subs', formdata.subscribe)
  if (formdata.subscribe === false) {
    membersRef.where('email', '==', `${formdata.email}`).get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('sorry not found')
          setThanks('Sorry that email address was not found. Please try again.')
          return
        }
        snapshot.forEach(doc => {
          console.log(doc.id, ':=>:', doc.data())
          membersRef.doc(doc.id).delete()
        })
        setThanks(`You are now Unsubscribed`)
      })
      .catch(err => {
        console.log('Error getting docs:', err)
      })
    } else {
       membersRef.add(formdata)
       setThanks(`Thank You ${first} for Subscribing!`)
      }
      goForIt()
      resetForm()
  }

return (
  <Layout>
  <h1>Test Form</h1>
  <em style={{display: 'block', fontWeight: 600, fontSize: '1.125rem', marginBottom: '0.5rem'}}>{subscribe ? `${thanks}` : 'Sorry to see you go'}</em>
  <form onSubmit={(ev) => validateFirst(ev)} style={{display: 'flex', flexDirection: 'column'}}>
    <input type="text" placeholder="Email" value={email} id="name" name="email" onChange={(ev) => setEmail(ev.target.value)} required="required" />
    <label htmlFor="email">Email</label>
    <input type="text" placeholder="First Name" value={first} id="first" name="first" onChange={(ev) => setFirst(ev.target.value)} required="required" />
    <label htmlFor="first">First Name</label>
    <input type="text" placeholder="Last Name" value={last} id="last" name="last" onChange={(ev) => setLast(ev.target.value)} required="required" />
    <label htmlFor="last">Last Name</label>
    <input type="checkbox" id="subscribe" value="Subscribe" name="subscribe" checked={subscribe} onChange={(ev) => setSubscribe((prevSub) => !prevSub)} />
    <label htmlFor="subscribe">
      {subscribe ? 'Subscribe' : 'Unsubscribe'}
    </label>
    <input type="submit" />
  </form>
  </Layout>
)}

export default Form