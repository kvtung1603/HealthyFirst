import { Button, Form, Input, message, Modal, Table } from 'antd';
import React, { useState } from 'react';
import type { ColumnsType } from 'antd/lib/table';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import styles from './styles.module.scss';
import { ADMIN_STORE_RESTAURANT } from 'constants/stores';
import { getStoreRestaurant, postStore } from 'api/store';

interface DataType {
  store_id: React.Key;
  name: string;
  address: string;
  phone: string;
  certificate: string;
}

const Restaurant = () => {
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
  ];

  const { mutate: onFinish, isLoading: isLoadingAdd } = useMutation(async (value: any) => postStore({
    ...value,
    type: 'RESTAURANT'
  }), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(ADMIN_STORE_RESTAURANT);
      handleCancel();
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || 'Login failed!');
      handleCancel();
    },
  });

  const {
    data: dataRestaurant,
    isLoading,
    error,
  } = useQuery(ADMIN_STORE_RESTAURANT, async () => await getStoreRestaurant());

  return (
    <div className="containerPage">
      <div className="container">
        <button className="button-create" onClick={showModal}>
          Create Restaurant
        </button>

        <div className="titleContainer">
          <h3>Restaurant</h3>
        </div>

        <div className="table">
          <Table columns={columns} dataSource={dataRestaurant} pagination={false} size="middle" />
        </div>

        <Modal
          title="Create Manufacturing"
          footer={null}
          visible={isModalVisible}
          onCancel={handleCancel}
        >
          <Form name="basic" onFinish={onFinish} autoComplete="off">
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
            <Form.Item
              label="Phone"
              name="phone"
              className={styles.username}
              rules={[
                {
                  required: true,
                  message: 'Please input your phone!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              className={styles.username}
              rules={[
                {
                  required: true,
                  message: 'Please input your address!',
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
                style={{width: '100%'}}
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Restaurant;
