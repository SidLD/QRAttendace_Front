import {Content, Header} from 'antd/es/layout/layout'
import {Layout, Menu} from 'antd'
import {Outlet, useNavigate} from 'react-router-dom'
import { auth } from '../lib/services'
import {
  DashboardOutlined,
  TeamOutlined,
  // SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const user = auth.getUserInfo();

  const items = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      key: "record",
      label: "Record",
      icon: <TeamOutlined />,
    },
    // {
    //   key: "setting",
    //   label: "Setting",
    //   icon: <SettingOutlined />,
    // },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];

  return (
    <Layout className='h-screen w-screen'>
        <Layout className='relative'>
            <Header className=' flex justify-between items-center text-black bg-white dark:bg-slate-800'>
              <h1 className='w-1/2 dark:shadow-md dark:shadow-blue-500 px-2 rounded-lg block dark:text-white uppercase text-sm mr-2 bold sm:text-xl '>
                {user.role}
              </h1>
              <Menu 
                className='w-1/2 flex justify-end'
                onClick={({key}) => {
                    navigate(key)
                  }}
                items={items} 
                mode='horizontal'
              />
            </Header>
            <Content className='overflow-x-hidden m-0 p-0 bg-slate-200 dark:bg-slate-950 '>
              <Outlet/>
            </Content>
        </Layout>
    </Layout>
  )
}
