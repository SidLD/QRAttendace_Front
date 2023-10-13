import {Content, Header} from 'antd/es/layout/layout'
import {Button, Layout, Menu, Tooltip} from 'antd'
import {Outlet, useNavigate} from 'react-router-dom'
import { auth } from '../lib/services'
import {
  DashboardOutlined,
  TeamOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import Sider from 'antd/es/layout/Sider';

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const user = auth.getUserInfo();
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

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
    {
      key: "attendance-setting",
      label: "Attendance Setting",
      icon: <SettingOutlined />,
    },
  ];

  return (
    <Layout className='h-screen w-screen'>
        <Layout className='relative'>
            <Sider collapsed={collapsed}>
              <Menu
                  onClick={(e) => navigate(e.key)}
                  mode="inline"
                  theme="dark"
                  items={items}
                />
            </Sider>
              
            <Content className='overflow-x-hidden m-0 p-0 bg-slate-200 '>
                <Header>
                  <Button
                    type="primary"
                    onClick={toggleCollapsed}
                    style={{
                      marginBottom: 16,
                    }}
                  >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  </Button>
                  <div className='float-right flex flex-row justify-center items-center gap-4'>
                    <h1 className='uppercase text-slate-50'>
                      {user.role} MODE
                    </h1>
                    <Tooltip color='blue' title="Logout">
                      <Button className='text-slate-50 flex justify-center items-center border-none hover:scale-110' onClick={() => navigate("/logout")}>
                        <LogoutOutlined />
                      </Button>
                    </Tooltip>
                  </div>
                </Header>
              <Outlet/>
            </Content>
        </Layout>
    </Layout>
  )
}
