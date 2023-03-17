import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import { Card, Result, Form, Input, Button, message } from 'antd'
import './verifyCert.scss'
import logo from '@/assets/logo.png'

const VerifyCert = () => {
    const { certId } = useParams()
    const { certificateStore, userStore } = useStore()
    const [isCorrectVerificationCode, setIsCorrectVerificationCode] = useState(false)

    useEffect(() => {
        certificateStore.verifyCertByCertId(certId)
    }, [certificateStore])

    const onFinish = async (values) => {
        try {
            const res = await userStore.checkVerificationAccessCode({
                verificationAccessCode: values.verificationAccessCode,
                certId: certId
            })

            if (res.status === false) {
                message.error(res.message)
            } else {
                setIsCorrectVerificationCode(true)
                message.success(res.message)
            }

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            {/* only display the following if verifier NOT YET input the correct verification code */}
            {!isCorrectVerificationCode &&
                <div className="verification-access">
                    <Card className="verification-access-code-container">
                        <img className="blocksume-logo" src={logo} alt="" />
                        <Form
                            name="basic"
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Access code"
                                name="verificationAccessCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input access code!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 6,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit" style={{ marginRight: '20px' }}>
                                    enter
                                </Button>

                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            }

            {/* only display the following if verifier input the correct verification code */}
            {isCorrectVerificationCode &&
                <div className="verification">
                    {/* only display the following if it is a valid cert */}
                    {certificateStore.isValidCert &&
                        <Card className="verification-container-valid-cert">
                            <Result status="success" title="This is a valid certificate" />
                            <div className="certDetail">
                                <div className="certTitle">
                                    <span class="certName">{certificateStore.verifiedCert.certificateName}</span>
                                    <span class="certRefId">Reference id: {certificateStore.verifiedCert.certificateRefId}</span>
                                </div>
                                <div className='certBody'>
                                    <p>Assigned by: {certificateStore.verifiedCert.issueOrganizationName}</p>
                                    <p>Assign to: {certificateStore.verifiedCert.receiverName}</p>
                                    <p>Assign date: {certificateStore.verifiedCert.issueDate}</p>
                                    <p>Valid until: {certificateStore.verifiedCert.validUntilDate}</p>
                                    <p>Description: {certificateStore.verifiedCert.description}</p>
                                </div>
                            </div>
                        </Card>
                    }

                    {/* only display the following if it is an invalid cert */}
                    {!certificateStore.isValidCert &&
                        <Card className="verification-container-invalid-cert">
                            <Result status="error" title="This is an invalid certificate" />
                        </Card>
                    }

                </div>
            }
        </>
    )
}

export default observer(VerifyCert)