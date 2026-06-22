import { Layout, Skeleton, Modal } from 'antd'
import './App.css'
import {  useState, useEffect } from 'react'
import { GetTable } from './components/GetTable'
import { GetModal } from './components/GetModal'

export interface IUser {
  id: number,
  name: string,
  age: number,
  contacts: {
    email: string,
    phone: string
  }
}

export const App = () => {

  const [users, setUsers] = useState<IUser[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [visible, setVisible] = useState<IUser | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {

      setIsLoading(true)
      setError('')

      setTimeout(async () => {
        try {
        const response = await fetch('/user.json')
        if (!response.ok) {
          throw new Error(response.statusText)         
        }
        const data = await response.json()
        setUsers(data.users)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong')
      } finally {
        setIsLoading(false)
      }
    }, 1000)
  }
    fetchUsers()

  }, [])


  const handleOpen = (users: IUser) => {
    setVisible(users)
  }
  const handleClose = () => {
    setVisible(null)
  }

  if (isLoading) {
    return (
      <Layout style={{ padding: '24px 0' }}>
        <Skeleton active paragraph={{ rows: 5 }} />
      </Layout>
    )
  }

  if (error) {
    return <div style={{color: 'red'}}>{error}</div>
  }

  
  return (
    <Layout>
      <GetTable users={users} handleOpen={handleOpen} />
      <Modal
      footer={null}
      open={!!visible}
      onCancel={handleClose}       
      >
        <GetModal users={visible} handleClose={handleClose} />
      </Modal>
      
    </Layout>
  )
} 