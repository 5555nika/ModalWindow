import { Table } from "antd"
import type { IUser } from "../App"

export interface ITable {
    users: IUser[] | null,
    handleOpen: (users: IUser) => void
}

export const GetTable = ({ users, handleOpen }: ITable) => {
    
    return (
        <Table
        columns={[
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age'
            },
            {
                title: 'Email',
                dataIndex: ['contacts','email'],
                key: 'email'
            },
            {
                title: 'Phone',
                dataIndex: ['contacts','phone'],
                key: 'phone'
            },
            {
                title: 'Actions',
                dataIndex: 'actions',
                render: (_, record) => (
                    <a onClick={() => handleOpen(record)}>Close Modal</a>                   
                ),
            },
        ]} 
        dataSource={users || []}
        rowKey={'id'}
        bordered
        />
        
    )
}