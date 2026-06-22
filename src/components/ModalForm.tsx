import { Layout, Form, Input, Button } from "antd"
import type { IUser } from "../App"
import { useEffect } from "react"

export interface IModalForm {
    user: IUser | null;
    handleClose: () => void;
}

export const ModalForm = ({ user, handleClose }: IModalForm) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (user) {
            form.setFieldsValue(user);
        } else {
            form.resetFields();
        }
    }, [user, form]);

    return (
        <Layout style={{ padding: '20px', background: '#fff' }}>
            <Form form={form} layout="vertical" onFinish={handleClose}>
                <Form.Item label="Name" name="name">
                    <Input readOnly />
                </Form.Item>
                <Form.Item label="Age" name="age">
                    <Input readOnly />
                </Form.Item>
                <Form.Item label="Email" name={['contacts', 'email']}>
                    <Input readOnly />
                </Form.Item>
                <Form.Item label="Phone" name={['contacts', 'phone']}>
                    <Input readOnly />
                </Form.Item>
                <Button type="primary" onClick={handleClose}>Close</Button>
            </Form>
        </Layout>
    )
}