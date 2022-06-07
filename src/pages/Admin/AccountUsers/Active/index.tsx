import { Button, Form, message, Modal, Table } from 'antd';
import React, { useState } from 'react';
import type { ColumnsType } from 'antd/lib/table';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Spin } from 'antd';

import styles from './styles.module.scss';

import { getUsersActive, removeUsersPending } from 'api/account-users';
import { ACCOUNT_USER_ACTIVE } from 'constants/account-users';

interface DataType {
  id: React.Key;
  username: string;
  email: string;
}

const Active = () => {
  const queryClient = useQueryClient()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idUser, setIdUser] = useState(undefined);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Action',
      render: (action: any, record: any) => (
        <div className="buttonGroup">
          <button onClick={() => {
            showModal();
            setIdUser(record.id)
          }} className="reject">
            Reject
          </button>
        </div>
      ),
    },
  ];

  const { mutate: handleRemoveAccount, isLoading: isLoadingAdd } = useMutation(async () => await removeUsersPending(idUser), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(ACCOUNT_USER_ACTIVE);
      handleCancel();
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || 'Login failed!');
      handleCancel();
    },
  });

  const {
    data: dataActive,
    isLoading,
    error,
  } = useQuery(ACCOUNT_USER_ACTIVE, async () => await getUsersActive());

  if (isLoading || isLoadingAdd) {
    return <Spin />
  }

  return (
    <div className="containerPage">
      <div className="container">
        <div className="titleContainer">
          <h3>Users Active</h3>
        </div>

        <div className="table">
          <Table columns={columns} dataSource={dataActive} pagination={false} size="middle" />
        </div>

        <Modal
          title="Create Manufacturing"
          footer={null}
          visible={isModalVisible}
          onCancel={handleCancel}
        >
          <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize:"1.2rem" }}>Do you want to remove this account?</p>
          <Form.Item>
            <Button
              loading={isLoading}
              className={styles.btnSubmit}
              type="primary"
              htmlType="submit"
              style={{ width: '30%' }}
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button
              loading={isLoading}
              className={styles.btnSubmit}
              type="primary"
              htmlType="submit"
              style={{ width: '30%' }}
              onClick={() => handleRemoveAccount()}
            >
              Confirm
            </Button>
          </Form.Item>
        </Modal>
      </div>
    </div>
  );
};

export default Active;
