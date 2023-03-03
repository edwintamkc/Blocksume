import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import logo from '@/assets/logo.png'
import './login.scss'
import { useStore } from '@/store'
import { useNavigate } from 'react-router-dom'

function Login() {
    const { loginStore } = useStore()
    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {
            const res = await loginStore.login({
                username: values.username,
                password: values.password
            })
            console.log(res)
            // login success
            if (res.status === true) {
                // navigate to home page
                navigate('/')
                // show login success msg
                message.success(res.message)

            } else if (res.status === false) {
                message.error(res.message)
            }


        } catch (e) {
            message.error('incorrect username or password')
        }
    };

    return (
        <div className="login">
            <Card className="login-container">
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
                    initialValues={{
                        remember: true,
                        username: "test1",
                        password: "test1"
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 6,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 6,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" style={{ marginRight: '20px' }}>
                            login
                        </Button>

                        Or <a href="/register/system-select">register now!</a>

                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login