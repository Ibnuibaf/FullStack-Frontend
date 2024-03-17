import React from 'react'
import LoginSection from '../components/auth/LoginSection'
import useCheckToken from '../hooks/useCheckToken'

function LoginPage() {
  useCheckToken()
  return (
    <div><LoginSection/></div>
  )
}

export default LoginPage