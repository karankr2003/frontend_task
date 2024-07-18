import { React, useState } from "react";
import { Button, Modal} from 'antd';

const SimpleTable = ({ deleteUser, dataSource, editMode }) => {
  const [open, setOpen] = useState(false);
  const { confirm } = Modal;
  const handleEdit = (e, item) => {
    e.preventDefault();
    editMode(true, item);
  };


  const showConfirm = (e, item) => {
    let user = item;
    confirm({
      title: 'Do you want to delete these items?',
      onOk() {
        deleteUser(user);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <div>
      {dataSource.length ? (
        <>
          <table>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ACTIONS</th>
                </tr>
          {dataSource.map((item, index) => {
            return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                  <div >
                    <Button type="primary"  onClick={(e)=>handleEdit(e,item)}>
                      edit
                    </Button>
                    <Button type="danger"  style={{ marginLeft:10 }} onClick={(e)=>showConfirm(e,item)}>
                      delete
                    </Button>
                  </div>
                  </td>
                </tr>
              
            );
          })}
        </table>
        </>
      ) : (
        "No user data"
      )}
      
    </div>
  );
};

export default SimpleTable;
