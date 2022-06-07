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
import { postInspection } from 'api/inspection';

interface DataType {
  store_id: React.Key;
  name: string;
  address: string;
  phone: string;
  type: string;
}

const { Option } = Select;

const Manufacturing = () => {
  const queryClient = useQueryClient()
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
  ];

  const { mutate: onFinish, isLoading: isLoadingAdd } = useMutation(async (value: any) => postInspection({
    name: value.name,
    status: "PENDING",
    result: "0",
  }, value.store),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(USER_STORE_IN_HANDLE);
        handleCancel();
      },
      onError: (error: any) => {
        message.error(error?.response?.data?.message || 'Login failed!');
        handleCancel();
      },
    });

  const {
    data: dataManufaturing,
    isLoading,
    error,
  } = useQuery(USER_STORE_IN_HANDLE, async () => {
    const user = JSON.parse(Cookies.get(USER_INFO) || '') || { username: '', email: '' };

    return await getStoreInHandle(user.username);
  });

  if (isLoading) {
    return <Spin />
  }

  console.log(dataManufaturing);

  return (
    <div className="containerPage">
      <div className="container">
        <button className="button-create" onClick={showModal}>
          Create Inspection
        </button>

        <div className="titleContainer">
          <h3>Store In Handle</h3>
        </div>

        <div className="table">
          <Table columns={columns} dataSource={dataManufaturing} pagination={false} size="middle" />
        </div>
      </div>

      <Modal
        title="Create Inspection"
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="store"
            label="Store"
            rules={[{ required: true, message: 'Please select store name!' }]}
          >
            <Select placeholder="Please select a store">
              {dataManufaturing?.map((store: any) => <Option value={store.name}>{store.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            className={styles.username}
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              loading={isLoading}
              className={styles.btnSubmit}
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Manufacturing;
