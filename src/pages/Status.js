import 'antd/dist/antd.css';

import React from "react"
import { getStatus } from "../requests"
import { Table, Button, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import { now, range, times } from 'lodash';
import localStorage from 'localStorage';

export default class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filteredInfo: null,
      sortedInfo: null,
    }
    this.fetchState = this.fetchState.bind(this);
    this.makefilterArray = this.makefilterArray.bind(this);
  }


  fetchState = () => {
    getStatus().then(Data => {
      this.setState({ data: Data })
    });
  }

  componentDidMount() {
    this.fetchState()
  }



  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  makefilterArray = (dataSource, filterkey) => {
    let filterArray = []
    dataSource.forEach(element => {
      eval('filterArray.push({text:element.' + filterkey + ', value:element.' + filterkey + '})')
    });
    return filterArray
  }

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: '委托ID',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => (parseInt(a.id) - parseInt(b.id)),
        sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
        ellipsis: false,
      },
      {
        title: '客户ID',
        dataIndex: 'customerId',
        key: 'customerId',
        sorter: (a, b) => (a.customerId - b.customerId),
        sortOrder: sortedInfo.columnKey === 'customerId' && sortedInfo.order,
        ellipsis: false,
      },
      {
        title: '市场人员ID',
        dataIndex: 'marketerId',
        key: 'marketerId',
        filters: this.makefilterArray(this.state.data, 'marketerId'),
        filteredValue: filteredInfo.marketerId || null,
        onFilter: (value, record) => record.marketerId === value,
        sorter: (a, b) => a.marketerId - b.marketerId,
        sortOrder: sortedInfo.columnKey === 'marketerId' && sortedInfo.order,
        ellipsis: false,
      },
      {
        title: '测试人员ID',
        dataIndex: 'testerId',
        key: 'testerId',
        filters: this.makefilterArray(this.state.data, 'testerId'),
        filteredValue: filteredInfo.testerId || null,
        onFilter: (value, record) => record.testerId === value,
        sorter: (a, b) => a.testerId - b.testerId,
        sortOrder: sortedInfo.columnKey === 'testerId' && sortedInfo.order,
        ellipsis: false,
      },
      {
        title: '软件名称',
        dataIndex: 'softwareName',
        key: 'softwareName',
        ellipsis: false,
      },
      {
        title: '软件版本号',
        dataIndex: 'softwareVersion',
        key: 'softwareVersion',
        ellipsis: false,
      },
      {
        className: 'status_stage',
        title: '委托状态',
        dataIndex: ['status', 'stage'],
        key: ['status', 'stage'],
        filters: this.makefilterArray(this.state.data, 'status.stage'),
        filteredValue: filteredInfo["status,stage"] || null,
        onFilter: (value, record) => record.status.stage === value,
        ellipsis: false,
      },
      {
        title: '附加信息',
        dataIndex: ['status', 'message'],
        key: ['status', 'message'],
        ellipsis: false,
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'open',
        render: (a) => <a href={"contracts/"}>open</a>
      },
    ];
    return (
      <>
        <Title>委托</Title>
        <Space style={{ marginBottom: 16 }}>
          <Button onClick={this.clearFilters}>Clear filters</Button>
          <Button onClick={this.clearAll}>Clear filters and sorters</Button>
        </Space>
        <Table columns={columns} dataSource={this.state.data} onChange={this.handleChange} rowKey={record => record.id} bordered title={() => localStorage.getItem("userName")} footer={() => '委托列表'} />
      </>
    );
  }
}