import { Card, Button, Row, Col } from 'antd'
import './systemSelect.scss'
import { useNavigate } from 'react-router-dom'

function SystemSelect() {
    const navigate = useNavigate()

    return (
        <div className="systemSelect">
            <div className="systemSelect-container">
                <h1>Are you a</h1>
                <Row>
                    <Col span={6} offset={4}>
                        <Button type="primary" className="button" onClick={() => navigate("/register/issuer")} ghost>
                            Certificate issuer
                        </Button>
                    </Col>
                    <Col span={6} offset={4}>
                        <Button type="primary" className="button" onClick={() => navigate("/register/receiver")} ghost>
                            Certificate receiver
                        </Button>
                    </Col>

                </Row>
            </div>
        </div>
    )
}

export default SystemSelect