import React, { useState } from 'react';
import useCreateUser from '../hooks/useCreateUserQuery';
import { Table, Button, Modal, Form, Input, } from 'antd';
import useDeleteUser from '../hooks/useDeleteUserQuery';
import useUpdateUsers from '../hooks/useUpdateUserQueryTask';
import useFetchUsers from '../hooks/useFetchUserQuery';
import 'react-datepicker/dist/react-datepicker.css';


const { TextArea } = Input;
// const Description = styled.div`
//   width: 20ch; /* Sets width to 20 characters */
//   overflow: hidden; /* Hides overflow */
//   white-space: nowrap; /* Prevents text from wrapping */
//   text-overflow: ellipsis;
// `;

const User = () => {


    const [isEdit, setIsEdit] = useState(false)
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({
        id: '',
        first_name: '',
        last_name: '',
        password: '',
        role: ''
    })


    const deleteUserById = useDeleteUser();
    const updateUsersById = useUpdateUsers();
    const createUserMutation = useCreateUser();
    const deleteUser = async (id) => {
        await deleteUserById(id)
        refetch()
    }
    const updateUser = async () => {

        if (isEdit) {
            await updateUsersById(user)
        } else {
            await createUserMutation.mutateAsync(user);
        }
        setOpen(false)
        refetch()

    }



    const columns = [{
        title: "Id",
        dataIndex: 'id',
        key: 'id'
    }, {
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
    }, {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name'
    }, {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
    }, {
        title: 'Role',
        dataIndex: 'role',
        key: 'role'
    }, {
        title: 'Action',
        render: (row) => (
            <div>
                <Button type="primary" onClick={() => {
                    setIsEdit(true)
                    setOpen(true)
                    setUser({
                        id: row.id,
                        first_name: row.first_name,
                        last_name: row.last_name,
                        password: row.password,
                        role: row.role
                    })
                }}>Edit</Button>
                <Button style={{ margin: '5px' }} danger onClick={() => deleteUser(row.id)}>Delete</Button>
            </div>
        )
    }]


    const { data, refetch } = useFetchUsers();

    return (
        <>

            <div>
                <Button type='primary' onClick={() => {
                    setIsEdit(false)
                    setOpen(true)
                    setUser({
                        id: '',
                        first_name: '',
                        last_name: '',
                        password: '',
                        role: ''
                    }

                    )
                }}>Create</Button>
                <Table dataSource={data} columns={columns} />
            </div>
            <Modal
                title={`${isEdit ? 'Update' : 'Create'} Task`}
                open={open}
                onCancel={() => setOpen(false)}
                onOk={updateUser}
                okText={isEdit ? 'Save' : 'Create'}
            >
                <Form layout="vertical">
                    <Form.Item label="First Name">
                        <Input name="first_name" value={user.first_name} onChange={(e) => setUser({ ...user, first_name: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Last Name">
                        <TextArea name="last_name" value={user.last_name} onChange={(e) => setUser({ ...user, last_name: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Email">
                        <TextArea name="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Password">
                        <TextArea name="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Role">
                        <TextArea name="role" value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })} />
                    </Form.Item>

                </Form>
            </Modal>
        </>

    )
}

export default User;
