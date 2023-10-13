import { message } from 'antd';
import { auth } from '../../lib/services'
import { Navigate } from 'react-router-dom';

export const Logout = () => {
    const [messageAPI, contextHolder] = message.useMessage();

    const popUpBox = (type, content) => {
      messageAPI.open({
        type,
        content,
      })
    }
    try {
        auth.clear()
        popUpBox('action', 'Logging out')
        return <Navigate to={"/login"} replace/>
    } catch (error) {
        console.log(error)
    }
    return (
        <>
            {contextHolder}
        </>
    )
}
