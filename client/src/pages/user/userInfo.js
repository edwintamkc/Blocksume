import { observer } from 'mobx-react-lite'
import { Col, Row, Card, Breadcrumb } from 'antd'
import avatar from '@/assets/avatar.png'
import './userInfo.scss'
import { useStore } from '@/store'
import {
    UserOutlined,
    ContactsOutlined,
    SolutionOutlined,
    HomeOutlined,
    MailOutlined,
    EnvironmentOutlined
  } from '@ant-design/icons'

const UserInfo = () => {
    const { userStore } = useStore()

    return (
        <Row style={{height: '100%'}}>
            <Col span={24}>
                <Card title={
                        <Breadcrumb separator='>'>
                            <Breadcrumb.Item>User information</Breadcrumb.Item>
                        </Breadcrumb>}
                        style={{height: '100%'}}
                    >
                    <img className="userIcon" src={avatar} alt='' />
                    <div className='userName'>{userStore.userInfo.username}</div>
                    
                    <Row className='userDetail'>
                        <Col span={6} offset={6}>
                            <UserOutlined /> User id: {userStore.userInfo.userId}
                        </Col>
                        <Col span={6} offset={4}>
                            <ContactsOutlined /> User type: {userStore.userInfo.userIdentifier == 1 ? 'Certificate issuer' : 'Certificate receiver'}
                        </Col>

                        {/* only display the following detail when it is certificate issuer
                            note that 1 = issuer, 2 = receiver */}
                        { (userStore.userInfo.userIdentifier == 1 ? true : false) && 
                            <>
                                <Col span={6} offset={6}>
                                    <HomeOutlined /> Company: {userStore.userInfo.companyName}
                                </Col>
                                <Col span={6} offset={4}>
                                    <SolutionOutlined /> Role: {userStore.userInfo.position}
                                </Col>
                            </>
                        }

                        <Col span={6} offset={6}>
                            <MailOutlined /> Email: {userStore.userInfo.email}
                        </Col>
                        <Col span={6} offset={4}>
                            <EnvironmentOutlined /> Ethereum address: {userStore.userInfo.ethAddress}
                        </Col>
                    </Row>
                    
                </Card>
            </Col>
        </Row>
    )
}

export default observer(UserInfo)
