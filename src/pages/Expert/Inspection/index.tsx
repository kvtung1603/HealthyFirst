import { Modal, Table, Form, Button, message, Input, Select } from 'antd';
import React, { useState } from 'react';
import type { ColumnsType } from 'antd/lib/table';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Spin } from 'antd';

import styles from './styles.module.scss';

import { getStoreInHandle, getStoreManufacturing, postStore } from 'api/store';
import { ADMIN_STORE_MANUFACTURING, USER_STORE_IN_HANDLE } from 'constants/stores';
import Cookies from 'js-cookie';
import { USER_INFO } from 'constants/auth';
import { getInspection, postInspection, putInspection } from 'api/inspection';
import { USER_INSPECTION } from 'constants/inspection';

interface DataType {
  store_id: React.Key;
  name: string;
  status: string;
  result: string;
}

const { Option } = Select;

const Manufacturing = () => {
  const queryClient = useQueryClient()
  const [isPassModal, setIsPassModal] = useState(false);
  const [isRejectModal, setIsRejectModal] = useState(false);

  const showPassModal = () => {
    setIsPassModal(true);
  };

  const handleCancelPass = () => {
    setIsPassModal(false);
  };

  const showRejectModal = () => {
    setIsRejectModal(true);
  };

  const handleCancelReject = () => {
    setIsRejectModal(false);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Results',
      dataIndex: 'result',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      render: () => (
        <div className="buttonGroup">
          <button className="accept" onClick={showPassModal}>Pass</button>
          <button className="reject" onClick={showRejectModal}>Reject</button>
        </div>
      ),
    },
  ];

  const { mutate: handlePassInspection, isLoading: isLoadingAdd } = useMutation(async () => {
    const user = JSON.parse(Cookies.get(USER_INFO) || '') || { username: '', email: '' };

    return await putInspection({
      result: 'pass'
    }, user.username)
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(USER_INSPECTION);
      handleCancelPass();
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || 'Login failed!');
      handleCancelPass();
    },
  });

  const { mutate: handleRejectInspection } = useMutation(async () => {
    const user = JSON.parse(Cookies.get(USER_INFO) || '') || { username: '', email: '' };

    return await putInspection({
      result: 'reject'
    }, user.username)
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(USER_INSPECTION);
      handleCancelReject();
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || 'Login failed!');
      handleCancelReject();
    },
  });

  const {
    data: dataInspection,
    isLoading,
    error,
  } = useQuery(USER_INSPECTION, async () => {
    const user = JSON.parse(Cookies.get(USER_INFO) || '') || { username: '', email: '' };

    return await getInspection({ username: user.username });
  });

  if (isLoading) {
    return <Spin />
  }

  return (
    <div className="containerPage">
      <div className="container">
        <div className="titleContainer">
          <h3>Store In Handle</h3>
        </div>

        <div className="table">
          <Table columns={columns} dataSource={dataInspection} pagination={false} size="middle" />
        </div>

        <Modal
          title=""
          footer={null}
          visible={isPassModal}
          onCancel={handleCancelPass}
        >
          <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: "1.2rem" }}>Do you want to pass this inspection?</p>
          <Form.Item>
            <Button
              loading={isLoading}
              className={styles.btnSubmit}
              type="primary"
              htmlType="submit"
              style={{ width: '30%' }}
              onClick={handleCancelPass}
            >
              Cancel
            </Button>

            <Button
              loading={isLoading}
              className={styles.btnSubmit}
              type="primary"
              htmlType="submit"
              style={{ width: '30%' }}
              onClick={() => handlePassInspection()}
            >
              Confirm
            </Button>
          </Form.Item>
        </Modal>

        <Modal
          title=""
          footer={null}
          visible={isRejectModal}
          onCancel={handleCancelReject}
        >
          <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: "1.2rem" }}>Do you want to reject this inspection?</p>
          <Form.Item>
            <Button
              loading={isLoading}
              className={styles.btnSubmit}
              type="primary"
              htmlType="submit"
              style={{ width: '30%' }}
              onClick={handleCancelReject}
            >
              Cancel
            </Button>

            <Button
              loading={isLoading}
              className={styles.btnSubmit}
              type="primary"
              htmlType="submit"
              style={{ width: '30%' }}
              onClick={() => handleRejectInspection()}
            >
              Confirm
            </Button>
          </Form.Item>
        </Modal>
      </div>
    </div>
  );
};

export default Manufacturing;
