import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';

const { Item } = Form;

export const ToDoForm = (props) => {
    let due_date = '';
    const {onSubmit} = props;
    const finish = (values) => {
        onSubmit(values.name, due_date);
    }

    const onDateChoice = (date, dateString) => {
        due_date = dateString;
    }

    return (
        <Form className={'todo-form'} layout={'inline'} onFinish={finish}>
            <Item name={'name'}><Input />
            </Item>
            <DatePicker onChange={onDateChoice}></DatePicker>
            <Item>
                <Button htmlType={'submit'}>Add</Button>
            </Item>
        </Form>
    )