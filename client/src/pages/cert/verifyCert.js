import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'

const VerifyCert = () => {
    const { certId } = useParams()
    const { certificateStore } = useStore()

    useEffect(() => {
        certificateStore.verifyCertByCertId(certId)
    }, [certificateStore])

    return (
        <div>
            <p>cert ref id: {certificateStore.verifiedCert.certificateRefId}</p>
            <p>cert name: {certificateStore.verifiedCert.certificateName}</p>
            
        </div>

    )
}

export default observer(VerifyCert)