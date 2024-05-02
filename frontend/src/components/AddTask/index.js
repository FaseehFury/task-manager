import React, { useState } from 'react';
import usefetchTasks from '../hooks/useFetchTaskQuery';
import { Table, Button, Modal, Form, Input, } from 'antd';
import useDeleteTask from '../hooks/useDeleteTaskQuery';
import useUpdateTask from '../hooks/useUpdateTask';
import useCreateTask from '../hooks/useCreateTaskQuery';
import moment from 'moment';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const { TextArea } = Input;
const Description = styled.div`
  width: 20ch; /* Sets width to 20 characters */
  overflow: hidden; /* Hides overflow */
  white-space: nowrap; /* Prevents text from wrapping */
  text-overflow: ellipsis;
`;

const Home = () => {


    const [isEdit, setIsEdit] = useState(false)
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState({
        id: '',
        title: '',
        description: '',
        due_date: new Date(),
    })


    const deleteTaskById = useDeleteTask();
    const updateTaskById = useUpdateTask();
    const createTaskMutation = useCreateTask();
    const deleteTask = async (id) => {
        await deleteTaskById(id)
        refetch()
    }
    const updateTask = async () => {

        if (isEdit) {
            await updateTaskById(task)
        } else {
            await createTaskMutation.mutateAsync(task);
        }
        setOpen(false)
        refetch()

    }



    const columns = [{
        title: 'Title',
        dataIndex: 'title',
        key: 'title'
    }, {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (text) => (
            <Description>{text}</Description>
        )


    }, {
        title: 'Due Date',
        dataIndex: 'due_date',
        key: 'due_date'
    }, {
        title: 'Action',
        render: (row) => (
            <div>
                <Button type="primary" onClick={() => {
                    setIsEdit(true)
                    setOpen(true)
                    setTask({
                        id: row.id,
                        title: row.title,
                        description: row.description,
                        due_date: row.due_date
                    })
                }}>Edit</Button>
                <Button style={{ margin: '5px' }} danger onClick={() => deleteTask(row.id)}>Delete</Button>
            </div>
        )
    }]


    const { data, refetch } = usefetchTasks();

    return (
        <>

            <div>
                <Button type='primary' onClick={() => {
                    setIsEdit(false)
                    setOpen(true)
                    setTask({
                        id: '',
                        title: '',
                        description: '',
                        due_date: new Date(),
                    }

                    )
                }}>Create</Button>
                <Table dataSource={data} columns={columns} />
            </div>
            <Modal
                title={`${isEdit ? 'Update' : 'Create'} Task`}
                open={open}
                onCancel={() => setOpen(false)}
                onOk={updateTask}
                okText={isEdit ? 'Save' : 'Create'}
            >
                <Form layout="vertical">
                    <Form.Item label="Title">
                        <Input name="title" value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Description">
                        <TextArea name="description" value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Due Date">
                        <DatePicker
                            selected={task.due_date}
                            onChange={(date) => {

                                setTask(
                                    { ...task, due_date: moment(date).format("YYYY/MM/DD") }
                                )
                            }

                            }

                            dateFormat="yyyy-MM-dd" // Example format, customize as needed
                            placeholderText="Select a date"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>

    )
}

export default Home;
