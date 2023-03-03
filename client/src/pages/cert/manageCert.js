import { observer } from 'mobx-react-lite'
import {
    Row,
    Col,
    Card,
    Breadcrumb,
    Button
} from 'antd'
import { useEffect } from 'react'
import { useStore } from '@/store'

const ManageCert = () => {
    const { certificateStore, userStore } = useStore()

    // get cert list
    useEffect(() => {
        let userId = userStore.userInfo.userId
        certificateStore.getCertificateList(userId)
    }, [certificateStore])

    return (
        <Row style={{ height: '100%' }}>
            <Col span={24}>
                <Card title={
                    <Breadcrumb separator='>'>
                        <Breadcrumb.Item>Manage certificate</Breadcrumb.Item>
                    </Breadcrumb>}
                    style={{ height: '100%' }}
                >

                    <Row className='certificateList'>
                        {certificateStore.certificateList.map(cert => (
                            <Col span={6}>
                                <Card title={cert.certificate_name} bordered={false}>
                                    <p>{cert.certificate_id}</p>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                </Card>
            </Col>
        </Row>
    )
}

export default observer(ManageCert)