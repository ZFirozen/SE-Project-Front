import './index.css';
import React from 'react';
import { Button, Input, List, Space } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Search } = Input;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InputString: '',
      SearchResult: [],

      // drop these data after test
      SearchList: [
        {
          href: 'http://www.baidu.com',
          title: 'Baidu',
          description: 'A search engine website.'
        },
        {
          href: 'http://www.bilibili.com',
          title: 'Bilibili',
          description: 'A video website.'
        }
      ]
    };

    // bind 'this'
    this.fetchSearch = this.fetchSearch.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.showSettings = this.showSettings.bind(this);
    this.titleFilter = this.titleFilter.bind(this);
  }

  componentDidMount() {
    // do nothing now
  }

  componentWillUnmount() {
    // do nothing now
  }

  render() {
    return (
      <div>
        <Search
          placeholder="输入搜索内容..."
          suffix={<SettingOutlined onClick={this.showSettings} />}
          allowClear
          onSearch={this.onSearch}
          enterButton
          style={{ width: 1000 }}
        />
        <List
          itemLayout="vertical"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 5
          }}
          header={ <div>Search Result</div> }
          bordered
          dataSource={this.state.SearchResult}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }

  fetchSearch = () => {
    // use response api to fetch result data
    // here we return local data list
    return this.state.SearchList;
  }
  
  onSearch = (value) => {
    const tempList = this.fetchSearch();
    this.setState({
      SearchResult: tempList.filter(v => v.title.includes(value))
    });
  }
  
  showSettings = () => {
    // do nothing now
  }
  
  titleFilter = (input, title) => {
    return title.search(input) !== -1;
  }
}

export default SearchBar;