import { Button, Form, Input, message } from 'antd';
import { useContext } from 'react';
import { PageContext } from '../../lib/context';


export const LoginView = () => {
    const {navigate, submitLoginData} = useContext(PageContext)
    const [messageAPI, contextHolder] = message.useMessage();

    const popUpBox = (type, content) => {
      messageAPI.open({
        type,
        content,
      })
    }

    const onFinish = async (values) => {
      if(!await submitLoginData(values)){
        popUpBox('warning', 'Incorrect Email or Password')
      }else{
        navigate('/dashboard');
      }
    };


    return (  
    <div className='flex border-g justify-center w-screen h-screen flex-col'>
      {contextHolder}
        <Form
      className='p-2 m-5 sm:m-auto sm:w-[70%] md:w-[30%]'
     
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>
  
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

  
      <Form.Item
        className='flex gap-3 flex-row'
      >
        <Button  htmlType="submit" >
          Submit
        </Button>
        <Button onClick={() => navigate("/register")}>
         Register
        </Button>
      </Form.Item>
    </Form>
    </div>
    );
}