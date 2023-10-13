import { useNavigate } from "react-router-dom"
import { PageContext } from "../../lib/context"
import { RegisterView } from "./view"
import { register } from "../../lib/api"

export const Register = () => {
    const navigate = useNavigate()

    const handleSubmitData = async (e) => {
        try {
            const payload = {
                email : e.email,
                password: e.password,
                firstName: e.firstName,
                lastName: e.lastName,
                role: 'user'
            }
            await register(payload)
            return true
        } catch (error) {
            return false
        }
    }

    const values = {
        handleSubmitData,
        navigate
    }
    
  return (
    <PageContext.Provider value={values}>
        <RegisterView />
    </PageContext.Provider>
  )
}
