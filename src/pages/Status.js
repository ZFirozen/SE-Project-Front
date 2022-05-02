import 'antd/dist/antd.css';

import React from "react"
import { getStatus } from "../requests"
import { Table, Button, Space} from 'antd';
import Title from 'antd/lib/typography/Title';

export default class Status extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filteredInfo: null,
            sortedInfo: null,
        }
        this.fetchState = this.fetchState.bind(this);
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
    
    
      render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filters: [
              { text: 'G1000~G1999', value: 'G1' },
              { text: 'G2000~G2999', value: 'G2' },
            ],
            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => parseInt(a.name.slice(1)) > parseInt(b.name.slice(1)),
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
            ellipsis: true,
          },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
              { text: 'Finished', value: 'Finished' },
              { text: 'Testing', value: 'Testing' },
            ],
            filteredValue: filteredInfo.status || null,
            onFilter: (value, record) => record.status.includes(value),
            sorter: (a, b) => a.status.length - b.status.length,
            sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
            ellipsis: true,
          },
        ];
        return (
          <>
            <Title>T1</Title>
            <Space style={{ marginBottom: 16 }}>
              <Button onClick={this.clearFilters}>Clear filters</Button>
              <Button onClick={this.clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table columns={columns} dataSource={this.state.data} onChange={this.handleChange} />
          </>
        );
      }
}