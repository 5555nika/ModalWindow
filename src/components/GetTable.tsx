import { Layout, Table } from "antd"
import type { IUser } from "../App"

export interface ITable {
    user: IUser[] | null;
    handleOpen: (user: IUser) => void;
}

export const GetTable = ({ user, handleOpen }: ITable) => {

    return (
    <Layout>
        <Table
        columns={[
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'Email',
                dataIndex: ['contacts', 'email'],
                key: 'email',
            },
            {
                title: 'Phone',
                dataIndex: ['contacts', 'phone'],
                key: 'phone',
            },
            {
                title: 'Action',
                key: 'action',
                render: (_, record) => (
                    <a onClick={() => handleOpen(record)}>Open Modal</a>
                ),
            }
        ]}
        dataSource={user || []}
        rowKey="id"
        bordered
        />
    </Layout>
    )
}