import React from 'react';
import { Form, Input, Button } from 'antd';

const { Item } = Form;

export const ToDoForm = (props) => {
    const {onSubmit} = props;
    const finish = (values) => {
        onSubmit(values.name);
    }

    return (
        <Form className={'todo-form'} layout={'inline'} onFinish={finish}>
            <Item name={'name'}>
                <Input />
            </Item>
            <Item>
                <Button htmlType={'submit'}>Add</Button>
            </Item>
        </Form>
    )
}