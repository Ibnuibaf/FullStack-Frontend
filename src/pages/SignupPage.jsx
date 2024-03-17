import React from 'react'
import SignupSection from '../components/auth/SignupSection'
import useCheckToken from '../hooks/useCheckToken'

function SignupPage() {
  useCheckToken()
  return (
    <div><SignupSection/></div>
  )
}

export default SignupPage