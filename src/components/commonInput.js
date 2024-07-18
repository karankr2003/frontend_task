import React, { useEffect, useState } from "react";
import { Button, Flex, Input, Form } from 'antd';
const InputHandler = ({ onSubmit, editMode, selectedUserData, dataSource }) => {

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formLayout, setFormLayout] = useState('vertical');
  const [form] = Form.useForm();
  
  const formItemLayout = formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null;

  const updateName = (e) => {
    setName(e.target.value);
  }

  const updateEmail = (e) => {  
    setEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
      onSubmit({ name, email, id });

      setTimeout(()=>{
        setId("");
        setName("");
        setEmail("");
      },100)
  };

  

  useEffect(() => {
    if(selectedUserData) {
      setId(selectedUserData.id);
      setName(selectedUserData.name);
      setEmail(selectedUserData.email);
    }
    
  }, [dataSource, selectedUserData]);

  return (
    <div className="header-box" >
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        style={{ maxWidth: formLayout === 'inline' ? 'none' : 600, }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            updateName(e);
          }}
        />
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            updateEmail(e);
          }}
          style={{ marginTop: 10 }}
        />
        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button type="primary" onClick={handleSubmit} >
            {!!editMode ? "Edit user" : "Add user"}
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default InputHandler;
