import { Table } from 'antd';
import React from 'react';
import type { ColumnsType } from 'antd/lib/table';
import { useQuery } from 'react-query';
import { Spin } from 'antd';

import styles from './styles.module.scss';
import { getUsersPending } from 'api/account-users';
import { ACCOUNT_USER_PENDING } from 'constants/account-users';

interface DataType {
  id: React.Key;
  username: string;
  email: string;
}

const Pending = () => {
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
      render: () => (
        <div className="buttonGroup">
          <button className="accept">Accept</button>
          <button className="reject">Reject</button>
        </div>
      ),
    },
  ];

  const {
    data: dataPending,
    isLoading,
    error,
  } = useQuery(ACCOUNT_USER_PENDING, async () => await getUsersPending());

  if (isLoading) {
    return <Spin />
  }

  return (
    <div className="containerPage">
      <div className="container">
        <div className="titleContainer">
          <h3>Users Pending</h3>
        </div>

        <div className="table">
          <Table columns={columns} dataSource={dataPending} pagination={false} size="middle" />
        </div>
      </div>
    </div>
  );
};

export default Pending;
