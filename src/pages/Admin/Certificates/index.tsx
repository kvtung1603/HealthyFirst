import { Table } from 'antd';
import React from 'react';
import type { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { useQuery } from 'react-query';
import { Spin } from 'antd';
import { ADMIN_CERTIFICATES } from 'constants/certificates';
import { getAllCertificate } from 'api/certificate';

interface DataType {
  certificate_id: React.Key;
  store: string;
  dated: string;
  expiryDate: string;
}

const Active = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: 'Store',
      dataIndex: 'store',
      render: (store: any) => store?.name
    },
    {
      title: 'Start Date',
      dataIndex: 'dated',
      render: (expiryDate: string) => moment(expiryDate).format('DD/MM/YYYY')
    },
    {
      title: 'Type',
      dataIndex: 'expiryDate',
      render: (expiryDate: string) => (
        <div>
          {new Date(expiryDate).getTime() > new Date().getTime() ? (
            <p>Available</p>
          ) : (
            <p>Expired</p>
          )}
        </div>
      ),
    },
  ];

  const {
    data: dataCertificate,
    isLoading,
    error,
  } = useQuery(ADMIN_CERTIFICATES, async () => await getAllCertificate());

  if (isLoading) {
    return <Spin />
  }

  return (
    <div className="containerPage">
      <div className="container">
        <div className="titleContainer">
          <h3>Certificate Active</h3>
        </div>

        <div className="table">
          <Table columns={columns} dataSource={dataCertificate} pagination={false} size="middle" />
        </div>
      </div>
    </div>
  );
};

export default Active;
