import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import { Card, Result } from 'antd'
import logo from '@/assets/logo.png'
import './verifyCert.scss'

const VerifyCert = () => {
    const { certId } = useParams()
    const { certificateStore } = useStore()

    useEffect(() => {
        certificateStore.verifyCertByCertId(certId)
    }, [certificateStore])

    return (


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




            {/* only display the following if it is a invalid cert */}
            {!certificateStore.isValidCert &&
                <Card className="verification-container-invalid-cert">
                    <Result status="error" title="This is an invalid certificate" />
                </Card>
            }

        </div>

    )
}

export default observer(VerifyCert)