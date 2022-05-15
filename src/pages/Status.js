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
            title: 'SerialNumber',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            sorter: (a, b) => (parseInt(a.serialNumber) - parseInt(b.serialNumber)),
            sortOrder: sortedInfo.columnKey === 'serialNumber' && sortedInfo.order,
            ellipsis: false,
          },
          {
            title: 'ProjectName',
            dataIndex: 'projectName',
            key: 'projectName',
            sorter: (a, b) => a.projectName.length - b.projectName.length,
            sortOrder: sortedInfo.columnKey === 'projectName' && sortedInfo.order,
            ellipsis: false,
          },
          {
            title: 'TargetSoftware',
            dataIndex: 'targetSoftware',
            key: 'targetSoftware',
            ellipsis: false,
          },
          {
            title: 'PrincipalContact',
            dataIndex: 'principalContact',
            key: 'principalContact',
            ellipsis: false,
          },
          {
            title: 'TrusteeContact',
            dataIndex: 'trusteeContact',
            key: 'trusteeContact',
            ellipsis: false,
          },
          {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            filters: [
              { text: '小于50', value: [0.0, 50.0]},
              { text: '50~100', value: [50.0, 100.0]},
            ],
            filteredValue: filteredInfo.price || null,
            onFilter: (value, record) => (value[0]<=record.price && record.price <value[1]),
            sorter: (a, b) => a.price - b.price,
            sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
            ellipsis: false,
          },
          {
            title: 'Action',
            dataIndex: '',
            key: 'open',
            render: (a) => <a href={"contract/"+a.id}>open</a>
          },
        ];
        return (
          <>
            <Title>合同</Title>
            <Space style={{ marginBottom: 16 }}>
              <Button onClick={this.clearFilters}>Clear filters</Button>
              <Button onClick={this.clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table columns={columns} dataSource={this.state.data} onChange={this.handleChange} rowKey={record=>record.id} bordered title={()=>'用户名'} footer={()=>'合同列表'}/>
          </>
        );
      }
}