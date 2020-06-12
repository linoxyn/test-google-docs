// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const functions = require('firebase-functions')
const nodemailer = require('nodemailer')

 const emailuser = functions.config().sendmail.user
 const emailpass = functions.config().sendmail.pass

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailuser,
      pass: emailpass,
    },
  })
 
 exports.newMember = functions.firestore.document('members/{memId}')
 .onCreate(async (snapshot, context) => {
    const data = snapshot.data()  
    const mailOptions = {
    from: emailuser,
    to: emailuser,
    subject: `Notification: ${data.first} ${data.last} signed up for Loch mailings`,
    text: `${data.first} ${data.last} at ${data.email} has signed up on ${data.datetime} to recieve gallery emails.`,
    html: `<h2>${data.first} ${data.last}</h2><p>Email: ${data.email} has signed up on ${data.datetime} to recieve gallery emails.</p>`,
    }
      //return result
  try {
    await transporter.sendMail(mailOptions)
  } catch(err) {
    console.log('MAIL ERR:', err)
    }
    return null
  })

