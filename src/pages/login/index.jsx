import { LoginView } from "./view"
import { useNavigate } from 'react-router-dom'
import { PageContext } from '../../lib/context.js'
import { login } from "../../lib/api"
import { auth } from "../../lib/services"


export const Login = () => {
  const navigate = useNavigate()

  const submitLoginData = async (e) => {
    try {
      const payload = {
        email: e.email,
        password: e.password
      }

      const result = await login(payload)
      const {token} = result.data
      auth.storeToken(token)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const values = {
      navigate,
      submitLoginData,
  }
  
  return (
    <PageContext.Provider value={values}>
        <LoginView />
    </PageContext.Provider>
  )
}
