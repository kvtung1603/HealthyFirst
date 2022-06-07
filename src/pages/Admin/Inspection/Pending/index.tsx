import { Spin, Table } from 'antd';
import React from 'react';
import type { ColumnsType } from 'antd/lib/table';

import styles from './styles.module.scss';
import { getInspectionPending } from 'api/inspection';
import { ADMIN_INSPECTION_PENDING } from 'constants/inspection';
import { useQuery } from 'react-query';

interface DataType {
  id: React.Key;
  name: string;
  address: string;
  result: any;
  username: string;
}

const Pending = () => {
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
    data: dataInspectionPending,
    isLoading,
    error,
  } = useQuery(ADMIN_INSPECTION_PENDING, async () => await getInspectionPending());

  if (isLoading) {
    return <Spin />
  }


  return (
    <div className="containerPage">
      <div className="container">
        <div className="titleContainer">
          <h3>Inspection Pending</h3>
        </div>

        <div className="table">
          <Table columns={columns} dataSource={dataInspectionPending} pagination={false} size="middle" />
        </div>
      </div>
    </div>
  );
};

export default Pending;
