import { observer } from 'mobx-react-lite'
import {
    Row,
    Col,
    Card,
    Breadcrumb
} from 'antd'

const ManageCert = () => {
    return (
        <Row style={{ height: '100%' }}>
            <Col span={24}>
                <Card title={
                    <Breadcrumb separator='>'>
                        <Breadcrumb.Item>Manage certificate</Breadcrumb.Item>
                    </Breadcrumb>}
                    style={{ height: '100%' }}
                >

                    <Row className='certDetail'>
                        <Col span={6}>
                            <Card title="Card title" bordered={false}>
                                <p>Card content</p>
                                <p>Card content2</p>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card title="Card title" bordered={false}>
                                Card content
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card title="Card title" bordered={false}>
                                <p>Card content</p>
                                <p>Card content2</p>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card title="Card title" bordered={false}>
                                Card content
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card title="Card title" bordered={false}>
                                Card content
                            </Card>
                        </Col>
                    </Row>

                </Card>
            </Col>
        </Row>
    )
}

export default observer(ManageCert)