import { Layout, Menu, Popconfirm } from 'antd'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import './index.scss'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import { useStore } from '@/store'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

const { Header, Sider } = Layout

const GeekLayout = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { userStore, loginStore } = useStore()

    // get username when first enter this page
    useEffect(() => {
        userStore.getUserInfo()
    }, [userStore]) 

    // logout
    const confirmLogout = () => {
        loginStore.logout()
        navigate('/login')
    }

    return (
    <Layout>
        <Header className="header">
        <div className="logo" />
        <div className="user-info">
            <span className="user-name">{ userStore.userInfo.username }</span>
            <span className="user-logout">
            <Popconfirm title="Are you sure？" 
                okText="yes" cancelText="cancel"
                onConfirm={confirmLogout}
            >
                <LogoutOutlined /> logout
            </Popconfirm>
            </span>
        </div>
        </Header>
        <Layout>
        <Sider width={200} className="site-layout-background">
            <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[pathname]}
            style={{ height: '100%', borderRight: 0 }}
            >
            <Menu.Item icon={<HomeOutlined />} key="/">
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="2">
                Test
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/assignCert">
                <Link to="/assignCert">Assign Certificate</Link>
            </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
            <Outlet /> 
        </Layout>
        </Layout>
    </Layout>
    )
}

export default observer(GeekLayout)