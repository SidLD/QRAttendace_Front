import { useContext } from "react"
import { PageContext } from "../../lib/context"
import { Button, Form, Input, message } from "antd"

export const RegisterView = () => {
    const {handleSubmitData, navigate} = useContext(PageContext)
    const [messageAPI, contextHolder] = message.useMessage();

    const handleSubmitRegister = async (e) => {
        if(await handleSubmitData(e)){
            popUpBox('success', 'SUCCESS')
        }else{
            popUpBox('warning', 'Something went wrong')
        }
    }

    const popUpBox = (type, content) => {
        messageAPI.open({
          type,
          content,
        })
      }

  return (
    <>
        {contextHolder}
        <Form name="Register"
                        className='h-full  p-5 w-full' 
                        labelCol={
                            {span: 8}
                        }
                        layout="vertical"
                        wrapperCol={
                            {span: 16}
                        }
                        initialValues={
                            {remember: true}
                        }
                        onFinish={handleSubmitRegister}
                        autoComplete="off">
                            <Form.Item 
                                className=""
                                name="firstName" label="First Name"
                                    rules={
                                        [{
                                            required: true,
                                            message: 'Please input your First Name!'
                                        }]
                                }>
                                    <Input placeholder='Enter your First Name' 
                                    className="bg-transparent border-none text-base pb-0" />
                            </Form.Item>
                            <Form.Item 
                                className=""
                                name="lastName" label="Last Name"
                                rules={
                                    [{
                                        required: true,
                                        message: 'Please input your Last Name!'
                                    }]
                                }>
                                <Input placeholder='Enter your Last Name'  
                                className="bg-transparent border-none text-base pb-0"/>
                            </Form.Item>
                            <Form.Item  
                                className=''
                                name="email" label="Email"
                                rules={
                                [{
                                    type: 'email',
                                    required: true,
                                    message: 'Please input your Email'
                                }]
                            }>
                            <Input  placeholder='Enter your Email'  
                                    className="bg-transparent border-none text-base pb-0" />
                            </Form.Item>               
                            <Form.Item  
                                className=''
                                name="password" label="Password"
                                rules={
                                    [{
                                        required: true,
                                        message: 'Please input your password!'
                                    }]
                            }>
                                <Input.Password  placeholder='Enter your password' 
                                    className="bg-transparent border-none text-base pb-0"/>
                            </Form.Item>
                        <div className='w-full flex flex-col justify-center items-center'>
                            <Button className="" htmlType="submit">
                                Submit
                            </Button>
                            <Button onClick={() => navigate('/login')}>
                                Go to Login
                            </Button>
                        </div>
        </Form>
    </>
  )
}
