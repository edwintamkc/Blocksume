import {
  Card, Breadcrumb, Form, Button, Radio, Input,
  Upload, Space, Select, DatePicker
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './index.scss'
import 'react-quill/dist/quill.snow.css'
import { useState, useEffect } from 'react'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const AssignCert = () => {
  //const form = Form.useForm()
  const { certificateStore, userStore } = useStore()

  // // set init values for some input fields when first enter this page
  // useEffect(() => {
  //   form.setFieldsValue({
  //     issueOrganization: userStore.userInfo.companyName
  //   })
  // }, []) 

  const onFinish = (fieldsValue) => {
    // format the date first, otherwise it is an object
    const issueDate = fieldsValue['issueDate'].format('YYYY-MM-DD')
    const durationStartDay = fieldsValue['duration'][0].format('YYYY-MM-DD')
    const durationEndDay = fieldsValue['duration'][1].format('YYYY-MM-DD')
    const receiverId = fieldsValue['recipientBlocksumeId']
    const senderId = userStore.userInfo.userId + ''
    const issueOrganizationId = userStore.userInfo.companyId
    const issueOrganizationName = userStore.userInfo.companyName

    const values = {
      ...fieldsValue,
      issueDate,
      durationStartDay,
      durationEndDay,
      senderId,
      receiverId,
      issueOrganizationId,
      issueOrganizationName
    }
    
    certificateStore.assignCert(values)
  }

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      'issueOrganization': userStore.userInfo.companyName,
    })
  }, [userStore])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>Assign certificate</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          form = { form }
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1, /*'issueOrganization': userStore.userInfo.companyName*/ }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Certificate name"
            name="certificateName"
            rules={[{ required: true, message: "Please input certificate name" }]}
          >
            <Input placeholder="Please input certificate name" style={{ width: 400 }} />
          </Form.Item>

          <Form.Item
            label="Recipient name"
            name="recipientName"
            rules={[{ required: true, message: "Please input recipient name" }]}
          >
            <Input placeholder="Please input recipient full name" style={{ width: 400 }} />
          </Form.Item>

          <Form.Item
            label="Recipient blocksume id"
            name="recipientBlocksumeId"
            rules={[{ required: true, message: "Please input recipient blocksume id" }]}
          >
            <Input placeholder="Please input recipient blocksume id" style={{ width: 400 }} />
          </Form.Item>

          <Form.Item
            label="Issue organization"
            name="issueOrganization"
            rules={[{ required: true, message: "Please input issue organization" }]}
          >
            <Input placeholder="Please input issue organization" style={{ width: 400, color: 'black'}} disabled />
          </Form.Item>
          
          <Form.Item
            label="Issuer Ethereum address"
            name="issuerEthereumAddress"
            rules={[{ required: true, message: "Please input issuer Ethereum Address" }]}
          >
            <Input placeholder="Please input issuer Ethereum Address" style={{ width: 400 }} />
          </Form.Item>

          <Form.Item
            label="Recipient Ethereum address"
            name="recipientEthereumAddress"
            rules={[{ required: true, message: "Please input recipient Ethereum Address" }]}
          >
            <Input placeholder="Please input recipient Ethereum Address" style={{ width: 400 }} />
          </Form.Item>

          <Form.Item
            label="Duration"
            name="duration"
            rules={[{ required: true, message: "Please select duration", type: "array" }]}
          >
            <RangePicker />
          </Form.Item>

          <Form.Item
            label="Issue date"
            name="issueDate"
            rules={[{ required: true, message: "Please select issue date" }]}
          >
              <DatePicker />
          </Form.Item>

          <Form.Item
            label="Certificate ID"
            name="certificateId"
            rules={[{ required: true, message: "Please input certificate ID" }]}
          >
            <Input placeholder="Please input certificate ID" style={{ width: 400 }} />
          </Form.Item>

          <Form.Item label="Certificate image">
            <Upload
              name="certificateImage"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList
              maxCount = {1}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
          >
            <TextArea
              placeholder="Please input description (optional)"
              autoSize={{
                minRows: 4,
                maxRows: 10,
              }}
              style={{width: 600}}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                Assign
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(AssignCert)