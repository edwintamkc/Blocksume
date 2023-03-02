import { Card, Button } from 'antd'
import './systemSelect.scss'
import { useNavigate } from 'react-router-dom'

function SystemSelect() {
    const navigate = useNavigate()

    return (
        <div className="systemSelect">
            <Card className="systemSelect-container">
                <h1>Are you a</h1>
                <Button type="primary" className="button" size="large" onClick={() => navigate("/register/issuer")}>
                    Certificate issuer
                </Button>
                <Button type="primary" className="button" size="large">
                    Certificate receiver
                </Button>
            </Card>
        </div>
    )
}

export default SystemSelect