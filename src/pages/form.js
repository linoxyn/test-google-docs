import React, { useState } from 'react'
import Layout from '../components/layout'
import useFirebase from '../../useFirebase'

const Form = () => {
  const firebase = useFirebase()
  const [email, setEmail] = useState('')
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [subscribe, setSubscribe] = useState(true)
  const [thanks, setThanks] = useState('Subscribe')
  // const [listdata, setList] = useState(null)

 

// useEffect(() => {
//   // db
//   if (!firebase) return
//    firebase.firestore()
//   .collection('members')
//   .orderBy('datecode', 'desc')
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//       // console.log(doc.data())
//       return setList(doc.data())
//     })
//     return null
//     // .catch((err) => console.log(err))
//   })
// }, [firebase])

// console.log(listdata)
  
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
    // console.log('Valid?', email.match(emailVerifyRegex))
      if (email.match(emailVerifyRegex) === null) {
        alert('Invalid email! Please try again.')
        setEmail('')
        return
      } else {
        handleSubmit(ev)
    }
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    let nd = new Date()
    let lDate = nd.toLocaleDateString()
    let lTime = nd.toLocaleTimeString()
    formdata = {
      datecode: nd.getTime(),
      datetime: `${lDate} ${lTime}`,
      email: email,
      first: first,
      last: last,
      subscribe: subscribe,
    }
    setMember(formdata)
  }
  
  const setMember = (formdata) => {
    let membersRef = firebase.firestore().collection('members')
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
          // console.log(doc.id, ':=>:', doc.data())
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
      resetForm()
      return null
  }

return (
  <Layout>
  <h1>Test Form</h1>
  <em style={{display: 'block', fontWeight: 600, fontSize: '1.125rem', marginBottom: '0.5rem'}}>{subscribe ? `${thanks}` : 'Sorry to see you go'}</em>
  <form onSubmit={(ev) => validateFirst(ev)} style={{display: 'flex', flexDirection: 'column'}}>
    <label htmlFor="email">
      <input type="text" placeholder="Email" value={email} id="email" aria-label="Email" name="email" onChange={(ev) => setEmail(ev.target.value)} required="required" />
      Email
    </label>
    <label htmlFor="first">
      <input type="text" placeholder="First Name" value={first} id="first" aria-label="First Name" name="first" onChange={(ev) => setFirst(ev.target.value)} required="required" />
      First Name
    </label>
    <label htmlFor="last">
      <input type="text" placeholder="Last Name" value={last} id="last" aria-label="Last Name" name="last" onChange={(ev) => setLast(ev.target.value)} required="required" />
      Last Name
    </label>
    <label htmlFor="subscribe">
      <input type="checkbox" id="subscribe" value="Subscribe" aria-label={subscribe ? 'Subscribe' : 'Unsubscribe'} name="subscribe" checked={subscribe} onChange={(ev) => setSubscribe((prevSub) => !prevSub)} />
      {subscribe ? 'Subscribe' : 'Unsubscribe'}
    </label>
      <input type="submit" aria-label="SUBMIT" value="SUBMIT" />
  </form>
  </Layout>
)}

export default Form