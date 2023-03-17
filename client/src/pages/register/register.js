import {
    Button,
    Form,
    Input,
    Card,
    message
} from 'antd';
import './register.scss'
import logo from '@/assets/logo.png'
import { useStore } from '@/store'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Register = () => {
    const { userStore } = useStore()
    const [formIssuer, formReceiver] = Form.useForm();
    const [userIdentifier, setUserIdentifier] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const parts = window.location.href.split('/')
        setUserIdentifier(parts[parts.length - 1])
    })
    

    const onFinishIssuer = async (values) => {
        const res = await userStore.registerIssuer({
            username: values.username,
            password: values.password,
            email: values.email,
            position: values.position
        })

        if(res.status === true){
            message.success(res.message)
            navigate('/login')
        } else if(res.status === false){
            message.error(res.message)
        }
    }

    const onFinishReceiver = async (values) => {
        const res = await userStore.registerReceiver({
            username: values.username,
            password: values.password,
            email: values.email,
            fullName: values.fullName,
            accessCode: values.accessCode
        })

        if(res.status === true){
            message.success(res.message)
            navigate('/login')
        } else if(res.status === false){
            message.error(res.message)
        }
    }

    return (
        <div className='register'>
            {/* display the following if user is issuer */}
            {(userIdentifier === 'issuer' ? true : false) &&
                <Card className="register-container-issuer">
                    <img className="blocksume-logo" src={logo} alt="" />
                    <Form
                        {...formItemLayout}
                        form={formIssuer}
                        name="register"
                        onFinish={onFinishIssuer}
                        style={{
                            maxWidth: 600,
                        }}
                    >

                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Company email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid email!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your company email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="position"
                            label="Job position"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your position!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            }

            {/* display the following if user is receiver */}
            {(userIdentifier === 'receiver' ? true : false) &&
                <Card className="register-container-receiver">
                    <img className="blocksume-logo" src={logo} alt="" />
                    <Form
                        {...formItemLayout}
                        form={formReceiver}
                        name="register"
                        onFinish={onFinishReceiver}
                        style={{
                            maxWidth: 600,
                        }}
                    >

                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid email!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="fullName"
                            label="Your full name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="accessCode"
                            label="Access code for verifier"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your access code!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            }
        </div>

    );
};

export default Register