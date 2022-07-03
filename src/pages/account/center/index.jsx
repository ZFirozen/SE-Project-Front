import { PlusOutlined, HomeOutlined, ContactsOutlined, ClusterOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Input, Row, Tag, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Link, useRequest } from 'umi';
import Projects from './components/Projects';
import Articles from './components/Articles';
import Applications from './components/Applications';
import { queryCurrent } from './service';
import styles from './Center.less';

const { Title } = Typography;

// const operationTabList = [
//   {
//     key: 'articles',
//     tab: (
//       <span>
//         文章{' '}
//         <span
//           style={{
//             fontSize: 14,
//           }}
//         >
//           (8)
//         </span>
//       </span>
//     ),
//   },
//   {
//     key: 'applications',
//     tab: (
//       <span>
//         应用{' '}
//         <span
//           style={{
//             fontSize: 14,
//           }}
//         >
//           (8)
//         </span>
//       </span>
//     ),
//   },
//   {
//     key: 'projects',
//     tab: (
//       <span>
//         项目{' '}
//         <span
//           style={{
//             fontSize: 14,
//           }}
//         >
//           (8)
//         </span>
//       </span>
//     ),
//   },
// ];

// const TagList = ({ tags }) => {
//   const ref = useRef(null);
//   const [newTags, setNewTags] = useState([]);
//   const [inputVisible, setInputVisible] = useState(false);
//   const [inputValue, setInputValue] = useState('');

//   const showInput = () => {
//     setInputVisible(true);

//     if (ref.current) {
//       // eslint-disable-next-line no-unused-expressions
//       ref.current?.focus();
//     }
//   };

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleInputConfirm = () => {
//     let tempsTags = [...newTags];

//     if (inputValue && tempsTags.filter((tag) => tag.label === inputValue).length === 0) {
//       tempsTags = [
//         ...tempsTags,
//         {
//           key: `new-${tempsTags.length}`,
//           label: inputValue,
//         },
//       ];
//     }

//     setNewTags(tempsTags);
//     setInputVisible(false);
//     setInputValue('');
//   };

//   return (
//     <div className={styles.tags}>
//       <div className={styles.tagsTitle}>标签</div>
//       {(tags || []).concat(newTags).map((item) => (
//         <Tag key={item.key}>{item.label}</Tag>
//       ))}
//       {inputVisible && (
//         <Input
//           ref={ref}
//           type="text"
//           size="small"
//           style={{
//             width: 78,
//           }}
//           value={inputValue}
//           onChange={handleInputChange}
//           onBlur={handleInputConfirm}
//           onPressEnter={handleInputConfirm}
//         />
//       )}
//       {!inputVisible && (
//         <Tag
//           onClick={showInput}
//           style={{
//             borderStyle: 'dashed',
//           }}
//         >
//           <PlusOutlined />
//         </Tag>
//       )}
//     </div>
//   );
// };

const Center = () => {
  // const [tabKey, setTabKey] = useState('articles'); 

  //  获取用户信息
  const { data: currentUser, loading } = useRequest(async () => {
    const temp = await queryCurrent(); //TODO
    temp.avatar = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
    // console.log(temp);
    const accountInfo = { data: temp };
    return accountInfo;
    // return queryCurrent();
  });

  //  渲染用户信息
  const renderUserInfo = ({ userId, userRole }) => {
    return (
      <div className={styles.detail}>
        <Row>
          {/* <ContactsOutlined
            style={{
              marginRight: 8,
            }}
          /> */}
          <Title level={4} style={{ marginRight: 8 }}>用户ID: {userId}</Title>
        </Row>
        <Row>
          {/* <ClusterOutlined
            style={{
              marginRight: 8,
            }}
          /> */}
          <Title level={4} style={{ marginRight: 8 }}>用户身份: {userRole}</Title>
        </Row>
        {/* <p>
          <HomeOutlined
            style={{
              marginRight: 8,
            }}
          />
          {
            (
              geographic || {
                province: {
                  label: '',
                },
              }
            ).province.label
          }
          {
            (
              geographic || {
                city: {
                  label: '',
                },
              }
            ).city.label
          }
        </p>  */}
      </div>
    );
  }; // 渲染tab切换

  // const renderChildrenByTabKey = (tabValue) => {
  //   // if (tabValue === 'projects') {
  //   //   return <Projects />;
  //   // }

  //   // if (tabValue === 'applications') {
  //   //   return <Applications />;
  //   // }

  //   // if (tabValue === 'articles') {
  //   //   return <Articles />;
  //   // }

  //   return null;
  // };

  // console.log(loading, currentUser)
  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={24} md={24}>
          <Card
            bordered={false}
            style={{
              marginBottom: 24,
            }}
            loading={loading}
          >
            {!loading && currentUser && (
              <div>
                <div className={styles.avatarHolder}>
                  <img alt="" src={currentUser.avatar} />
                  <div className={styles.name}>{currentUser.userName}</div>
                  {/* <div>{currentUser?.signature}</div> */}
                </div>
                <Divider dashed />
                {renderUserInfo(currentUser)}

                {/* <TagList tags={currentUser.tags || []} />
                <Divider
                  style={{
                    marginTop: 16,
                  }}
                  dashed
                />
                <div className={styles.team}>
                  <div className={styles.teamTitle}>团队</div>
                  <Row gutter={36}>
                    {currentUser.notice &&
                      currentUser.notice.map((item) => (
                        <Col key={item.id} lg={24} xl={12}>
                          <Link to={item.href}>
                            <Avatar size="small" src={item.logo} />
                            {item.member}
                          </Link>
                        </Col>
                      ))}
                  </Row>
                </div> */}
              </div>
            )}
          </Card>
        </Col>
        {/* <Col lg={17} md={24}> */}
        {/* <Card
            className={styles.tabsCard}
            bordered={false}
            // tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={(_tabKey) => {
              setTabKey(_tabKey);
            }}
          >
            {renderChildrenByTabKey(tabKey)}
          </Card> */}
        {/* </Col> */}
      </Row>
    </GridContent>
  );
};

export default Center;
