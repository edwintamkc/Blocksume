import {
  Card, Breadcrumb, Form, Button, Radio, Input,
  Upload, Space, Select, DatePicker
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'

const { RangePicker } = DatePicker;

const AssignCert = () => {

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
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
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
            label="Issue organization"
            name="issueOrganization"
            rules={[{ required: true, message: "Please input issue organization" }]}
          >
            <Input placeholder="Please input issue organization" style={{ width: 400 }} />
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
            rules={[{ required: true}]}
          >
            <Space>
            <RangePicker />
            </Space>
          </Form.Item>

          <Form.Item
            label="Issue date"
            name="issueDate"
            rules={[{ required: true}]}
          >
            <Space>
              <DatePicker />
            </Space>
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
              <ReactQuill className="assignCert-quill" theme="snow" />
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

export default AssignCert