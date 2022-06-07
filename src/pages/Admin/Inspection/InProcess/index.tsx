import { Spin, Table } from 'antd';
import React from 'react';
import type { ColumnsType } from 'antd/lib/table';
import { useQuery } from 'react-query';

import styles from './styles.module.scss';

import { getUsersActive } from 'api/account-users';
import { getInspectionInProcess } from 'api/inspection';
import { ADMIN_INSPECTION_IN_PROCESS } from 'constants/inspection';

interface DataType {
  id: React.Key;
  name: string;
  address: string;
  result: any;
  username: string;
}

const InProcess = () => {
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
      title: 'Result',
      dataIndex: 'result',
      render:(result: any) => result === 'null' ? 'Chưa hoàn thành' : result === true ? 'Đạt' : 'Không đạt',
     },
    {
      title: 'Username',
      dataIndex: 'username',
    },
  ];

  const {
    data: dataInspection,
    isLoading,
    error,
  } = useQuery(ADMIN_INSPECTION_IN_PROCESS, async () => await getInspectionInProcess());

  if (isLoading) {
    return <Spin />
  }

  return (
    <div className="containerPage">
      <div className="container">
        <div className="titleContainer">
          <h3>Inspection In Process</h3>
        </div>

        <div className="table">
          <Table columns={columns} dataSource={dataInspection} pagination={false} size="middle" />
        </div>
      </div>
    </div>
  );
};

export default InProcess;
