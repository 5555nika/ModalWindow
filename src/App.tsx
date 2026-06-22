import { Layout, Modal, Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import './App.css'
import { GetTable } from './components/GetTable'
import { ModalForm } from './components/ModalForm'

export interface IUser {
  id: number
  name: string
  age: number,
  contacts: {
    email: string
    phone: string
  }
}

export const App = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [modal, setModal] = useState<IUser | null>(null)
  const [user, setUser] = useState<IUser[] | null>(null)

  useEffect(() => {

    const fetching = async () => {
      setIsLoading(true)
      setError('')
      
      setTimeout( async () => {
      try {
        const response = await fetch('/user.json')
        if (!response.ok) {
          throw new Error(response.statusText)
        }
          const data = await response.json()
          setUser(data.users)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'error')
        console.log(error);
      } finally {setIsLoading(false)}

    }, 2000)

    }
    fetching()

  }, [])

  if (isLoading) {
    return (
      <Layout style={{ padding: '20px' }}>
        <Skeleton active paragraph={{ rows: 5 }} />
      </Layout>
    );
  }

  if (error) {
    return <div style={{ color: 'red'}}>{error}</div>
  } 

  const handleOpen = (user: IUser) => {
    setModal(user)
  }
  const handleClose = () => {
    setModal(null)
  }

  return (
    <Layout>
        <GetTable user={user} handleOpen={handleOpen} />
      <Modal 
      open={!!modal} 
      onCancel={handleClose} 
      footer={null} 
      title="Информация о пользователе">
        <ModalForm user={modal} handleClose={handleClose} />
      </Modal>
    </Layout>
  )
} 