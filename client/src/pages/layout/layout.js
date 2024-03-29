import { Layout, Menu, Popconfirm } from 'antd'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import './layout.scss'
import {
    HomeOutlined,
    EditOutlined,
    LogoutOutlined,
    UserOutlined,
    BookOutlined
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
                    <span className="user-name">{userStore.userInfo.username}</span>
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
                        {/* <Menu.Item icon={<HomeOutlined />} key="/">
                            <Link to="/">Home</Link>
                        </Menu.Item> */}

                        <Menu.Item icon={<UserOutlined />} key="/user/info">
                            <Link to="/user/info">User information</Link>
                        </Menu.Item>

                        {/* only display the following detail when it is certificate issuer
                            note that 1 = issuer, 2 = receiver */}
                        {
                            (userStore.userInfo.userIdentifier == 1 ? true : false)
                            &&
                            <Menu.Item icon={<EditOutlined />} key="/cert/assign">
                                <Link to="/cert/assign">Assign certificate</Link>
                            </Menu.Item>

                        }

                        {/* only display the following detail when it is certificate receiver
                            note that 1 = issuer, 2 = receiver */}
                        {
                            (userStore.userInfo.userIdentifier == 2 ? true : false)
                            &&
                            <Menu.Item icon={<BookOutlined />} key="/cert/manage">
                                <Link to="/cert/manage">Manage certificate</Link>
                            </Menu.Item>

                        }

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