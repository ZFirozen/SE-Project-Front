import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Upload, message, Typography } from 'antd';
import ProForm, {
  ProFormDependency,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { queryCurrent } from '../service';
import { queryProvince, queryCity } from '../service';
import styles from './BaseView.less';
import axios from 'axios';
import localStorage from 'localStorage';
import { conversionMomentValue } from '@ant-design/pro-utils';

const { Title } = Typography;

const validatorPhone = (rule, value, callback) => {
  if (!value[0]) {
    callback('Please input your area code!');
  }

  if (!value[1]) {
    callback('Please input your phone number!');
  }

  callback();
}; // 头像组件 方便以后独立，增加裁剪之类的功能

const AvatarView = ({ avatar }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          更换头像
        </Button>
      </div>
    </Upload>
  </>
);

const BaseView = () => {
  const { data: currentUser, loading } = useRequest(() => {
    return queryCurrent();
  });

  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }

      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }

    return '';
  };

  const handleFinish = async () => {
    message.success('更新基本信息成功');
  };

  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <Title level={5}>修改用户名</Title>
            <br />
            <ProForm
              layout="horizontal"
              scrollToFirstError="true"
              submitter={{
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
                // submitButtonProps: {
                //   children: '更新基本信息',
                // },
              }}
              onFinish={(values) => {
                console.log(values.newName);
                axios.post("/api/account/username?newValue=" + values.newName)
                  .then((response) => {
                    console.log(1, response)
                    if (response.status === 200) {
                      localStorage.setItem("userName", values.newName);
                      message.success("用户名修改成功！");
                      location.reload();
                    } else {
                      console.log("用户名修改成功？");
                    }
                  })
                  .catch((error) => {
                    console.log(2, error);
                    if (error.response.status === 400) {
                      message.error("用户名已存在！\n请重新输入新的用户名！");
                    } else {
                      console.log("unknown error!");
                      message.error("用户名修改失败！");
                    }
                  })
              }}
            >
              <ProFormText width="md" required rules={[{ required: true, message: "这是必填项" }]} name={"newName"} placeholder={"请输入新用户名"} />
            </ProForm>
            <br />
            <br />
            <Title level={5}>修改密码</Title>
            <br />
            <ProForm
              layout="horizontal"
              scrollToFirstError="true"
              submitter={{
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
                // submitButtonProps: {
                //   children: '更新基本信息',
                // },
              }}
              onFinish={(values) => {
                console.log(values.oldPassword, values.newPassword);
                axios.post("/api/account/password?oldValue=" + values.oldPassword + "&newValue=" + values.newPassword)
                  .then((response) => {
                    if (response.status === 200) {
                      message.success("密码修改成功！");
                    } else {
                      console.log("密码修改成功？");
                    }
                  })
                  .catch((error) => {
                    message.error("密码修改失败！\n请重新输入密码！");
                    if (error.response.status !== 400) {
                      console.log("unknown error!");
                    }
                  })
              }}
            >
              <ProFormText.Password width="md" required rules={[{ required: true, message: "这是必填项" }]} name={"oldPassword"} placeholder={"请输入旧密码"} />
              <ProFormText.Password width="md" required rules={[{ required: true, message: "这是必填项" }]} name={"newPassword"} placeholder={"请输入新密码"} />
            </ProForm>
            {/* <ProForm
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
                submitButtonProps: {
                  children: '更新基本信息',
                },
              }}
              initialValues={{ ...currentUser, phone: currentUser?.phone.split('-') }}
              hideRequiredMark
            > */}
            {/* <ProFormText
                width="md"
                name="email"
                label="邮箱"
                rules={[
                  {
                    required: true,
                    message: '请输入您的邮箱!',
                  },
                ]}
              /> */}
            {/* <ProFormText
                width="md"
                name="userName"
                label="用户名"
                rules={[
                  {
                    required: true,
                    message: '请输入您的用户名!',
                  },
                ]}
              /> */}
            {/* <ProFormTextArea
                name="profile"
                label="个人简介"
                rules={[
                  {
                    required: true,
                    message: '请输入个人简介!',
                  },
                ]}
                placeholder="个人简介"
              />
              <ProFormSelect
                width="sm"
                name="country"
                label="国家/地区"
                rules={[
                  {
                    required: true,
                    message: '请输入您的国家或地区!',
                  },
                ]}
                options={[
                  {
                    label: '中国',
                    value: 'China',
                  },
                ]}
              />

              <ProForm.Group title="所在省市" size={8}>
                <ProFormSelect
                  rules={[
                    {
                      required: true,
                      message: '请输入您的所在省!',
                    },
                  ]}
                  width="sm"
                  fieldProps={{
                    labelInValue: true,
                  }}
                  name="province"
                  className={styles.item}
                  request={async () => {
                    return queryProvince().then(({ data }) => {
                      return data.map((item) => {
                        return {
                          label: item.name,
                          value: item.id,
                        };
                      });
                    });
                  }}
                />
                <ProFormDependency name={['province']}>
                  {({ province }) => {
                    return (
                      <ProFormSelect
                        params={{
                          key: province?.value,
                        }}
                        name="city"
                        width="sm"
                        rules={[
                          {
                            required: true,
                            message: '请输入您的所在城市!',
                          },
                        ]}
                        disabled={!province}
                        className={styles.item}
                        request={async () => {
                          if (!province?.key) {
                            return [];
                          }

                          return queryCity(province.key || '').then(({ data }) => {
                            return data.map((item) => {
                              return {
                                label: item.name,
                                value: item.id,
                              };
                            });
                          });
                        }}
                      />
                    );
                  }}
                </ProFormDependency>
              </ProForm.Group>
              <ProFormText
                width="md"
                name="address"
                label="街道地址"
                rules={[
                  {
                    required: true,
                    message: '请输入您的街道地址!',
                  },
                ]}
              />
              <ProFormFieldSet
                name="phone"
                label="联系电话"
                rules={[
                  {
                    required: true,
                    message: '请输入您的联系电话!',
                  },
                  {
                    validator: validatorPhone,
                  },
                ]}
              >
                <Input className={styles.area_code} />
                <Input className={styles.phone_number} />
              </ProFormFieldSet> */}
            {/* </ProForm> */}
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
