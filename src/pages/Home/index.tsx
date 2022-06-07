import { Table } from 'antd';
import React from 'react';
import type { ColumnsType } from 'antd/lib/table';

interface DataType {
  id: React.Key;
  name: string;
  age: number;
  address: string;
}

const Home = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const data: DataType[] = [
    {
      id: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      id: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      id: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={false} size="middle" />
    </div>
  );
};

export default Home;
