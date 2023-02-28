import { observer } from 'mobx-react-lite'
import { Col, Divider, Row, Card, Avatar } from 'antd'

const UserInfo = () => {
    return (
        <Row>
            <Col span={24}>
                <Card bordered={false} style={{ marginBottom: 24 }}>
                    
                    <div>
                        <div>
                        <img alt="" />
                        <div>username</div>
                        {/* <div>{currentUser.name}</div> */}
                        <div>signature</div>
                        {/* <div>{currentUser?.signature}</div> */}
                        </div>
                        {/* {renderUserInfo(currentUser)} */}
                        <Divider dashed />
                        {/* <TagList tags={currentUser.tags || []} /> */}
                        <Divider style={{ marginTop: 16 }} dashed />
                    </div>
                    
                </Card>
            </Col>
        </Row>
    )
}

export default observer(UserInfo)
