import { observer } from 'mobx-react-lite'
import {
    Row,
    Col,
    Card,
    Breadcrumb,
    Checkbox,
    Button
} from 'antd'
import { useEffect, useState } from 'react'
import { useStore } from '@/store'

const ManageCert = () => {
    const { certificateStore, userStore, resumeStore } = useStore()
    const [ selectedCertList, setSelectedCertList ] = useState([])

    // get cert list
    useEffect(() => {
        let userId = userStore.userInfo.userId
        certificateStore.getCertificateList(userId)
    }, [certificateStore])

    const checkboxOnChange = (e, cert) => {
        // add cert id into selectedCertList if checked
        // delete it from selectedCertList if unchecked
        if(e.target.checked){
            setSelectedCertList([
                ...selectedCertList,
                cert
            ])
            
        } else {
            setSelectedCertList(
                selectedCertList.filter(item => item.certificate_id != cert.certificate_id)
            )
        }
    }

    const genResume = () => {
        resumeStore.generateDigitalResume(userStore.userInfo.userId, selectedCertList)
    }

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
                                <Card title={cert.certificate_name} bordered={false} actions={[<Checkbox onChange={e => checkboxOnChange(e, cert)}></Checkbox>]}>
                                    <p>Cert id: {cert.certificate_ref_id}</p>
                                    <p>Assigned by: {cert.issue_organization_name}</p>
                                    <p>Assign to: {cert.receiver_name}</p>
                                    <p>Assign date: {cert.issue_date}</p>
                                    <p>Description: {cert.description}</p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        <Col span={4} push={20}>
                            <Button type='primary' onClick={genResume}>Generate digital resume</Button>
                        </Col>
                    </Row>

                </Card>
            </Col>
        </Row>
    )
}

export default observer(ManageCert)