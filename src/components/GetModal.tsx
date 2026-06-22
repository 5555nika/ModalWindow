import { Form, Input, Button, Row } from "antd"
import type { IUser } from "../App"
import { useEffect } from "react"

export interface IModal {
    users: IUser | null,
    handleClose: () => void
}
export const GetModal = ({ users,  handleClose }: IModal) => {

    const [form] = Form.useForm()

    useEffect(() => {
        if (users) {
            form.setFieldsValue(users)
        } else {
            form.resetFields()
        }

    }, [users, form] )
    
    return (
        <Form form={form}
            layout="vertical"
            style={{ padding: '2rem 0' }}>
            <Form.Item
            label='Name'
            name='name'
            >
                < Input readOnly />
            </Form.Item>

            <Form.Item
            label='Age'
            name='age'
            >
                < Input readOnly />
            </Form.Item>

            <Form.Item
            label='Email'
            name={['contacts','email']}
            >
                < Input readOnly />
            </Form.Item>

            <Form.Item
            label='Phone'
            name={['contacts','phone']}
            >
                < Input readOnly />
            </Form.Item>

            <Row justify="end">
            <Form.Item>
                <Button
                type="primary"
                htmlType="submit"
                onClick={handleClose}
                >Close</Button>
            </Form.Item>
            </Row>

        </Form>
        
    )
}