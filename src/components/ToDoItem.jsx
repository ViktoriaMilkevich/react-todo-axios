import { Button, Checkbox, Typography } from 'antd';

export const ToDoItem = (props) => {
  const { item, onCheck, onRemove, onChange } = props;
  const onRemoveItem = (e) => {
    e.preventDefault();

    if (onRemove) {
      onRemove(item.id);
    }
  }

  const onCheckItem = () => {
    if (onCheck) {
      onCheck(item.id);
    }
  }

  const onEditItem = (str) => {
    item.content = str;
    onChange(item.id);
  }

  const { Paragraph } = Typography;

  return (
    <li className="todo-item" key={item.id}>
      <Checkbox 
        checked={item.checked}
        onChange={onCheckItem}
      ></Checkbox>
      <Paragraph editable={{ onChange: onEditItem }}>{item.content}</Paragraph>
      <Button onClick={onRemoveItem}>Remove</Button>
    </li>
  )
}