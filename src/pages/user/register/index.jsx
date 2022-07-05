import { useState, useEffect } from 'react';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Form, Button, Col, Input, Popover, Progress, Row, Select, message, Typography, Tabs } from 'antd';
import { ProFormCaptcha, ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
import { Link, useRequest, history, SelectLang } from 'umi';
import { userRegister } from './service';
import styles from './style.less';
const { Title } = Typography;
const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <span>强度：强</span>
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <span>强度：中</span>
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <span>强度：太短</span>
    </div>
  ),
};
const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const Register = () => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [prefix, setPrefix] = useState('86');
  const [popover, setPopover] = useState(false);
  const confirmDirty = false;
  let interval;
  const [form] = Form.useForm();
  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [interval],
  );

  const onGetCaptcha = () => {
    let counts = 59;
    setCount(counts);
    interval = window.setInterval(() => {
      counts -= 1;
      setCount(counts);

      if (counts === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const getPasswordStatus = () => {
    const value = form.getFieldValue('userPassword');

    if (value && value.length > 9) {
      return 'ok';
    }

    if (value && value.length > 5) {
      return 'pass';
    }

    return 'poor';
  };

  const { loading: submitting, run: register } = useRequest(userRegister, {
    manual: true,
    onSuccess: (response) => {
      console.log(response)
      message.success('注册成功！');
      // history.push({
      //   pathname: '/',
      //   // state: {
      //   //   account: params.email,
      //   // },
      // });
      history.goBack();
    },
    onError: (error) => {
      console.log(error);
      if (error.response.status === 400) {
        message.error('注册失败！用户名重复！');
      }
    }
  });

  const onFinish = (values) => {
    const params = { userName: values.userName, userPassword: values.userPassword };
    // console.log(params);
    register(params);
  };

  const checkConfirm = (_, value) => {
    const promise = Promise;

    if (value && value !== form.getFieldValue('userPassword')) {
      return promise.reject('两次输入的密码不匹配!');
    }

    return promise.resolve();
  };

  const checkPassword = (_, value) => {
    const promise = Promise; // 没有值的情况

    if (!value) {
      setVisible(!!value);
      return promise.reject('请输入密码!');
    } // 有值的情况

    if (!visible) {
      setVisible(!!value);
    }

    setPopover(!popover);

    // if (value.length < 6) {
    //   return promise.reject('');
    // }

    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }

    return promise.resolve();
  };

  const changePrefix = (value) => {
    setPrefix(value);
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('userPassword');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <div className={styles.main}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/01校标.png" />}
          title="南大在线测试平台"
          submitter={{ submitButtonProps: { style: { display: 'none', } } }}
          form={form} name="UserRegister" id="components-form-login" className="login-form" onFinish={onFinish}>
          <br />
          {/* <Title level={4} style={{ textAlign: "center" }}>注册账户</Title> */}
          <Tabs>
            <Tabs.TabPane
              key="register"
              tab="注册账户"
            />
          </Tabs>
          <ProFormText
            name="userName"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder="用户名"
            rules={[
              {
                required: true, message: "请输入用户名！"
              },
              {
                max: 32, message: "名称不得超过32个字符！"
              },
              {
                pattern: new RegExp("^[0-9a-zA-Z_]{1,}$", "g"), message: "只允许包含数字、字母和下划线!"
              }
            ]}
          />
          <Popover
            getPopupContainer={(node) => {
              if (node && node.parentNode) {
                return node.parentNode;
              }

              return node;
            }}
            content={
              visible && (
                <div
                  style={{
                    padding: '4px 0',
                  }}
                >
                  {passwordStatusMap[getPasswordStatus()]}
                  {renderPasswordProgress()}
                  <div
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <span>请不要使用容易被猜到的密码。</span>
                  </div>
                </div>
              )
            }
            overlayStyle={{
              width: 240,
            }}
            placement="right"
            visible={visible}
          >
            <ProFormText.Password
              name="userPassword"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder="输入密码，区分大小写"
              className={
                form.getFieldValue('userPassword') &&
                form.getFieldValue('userPassword').length > 0 &&
                styles.password
              }
              rules={[
                {
                  validator: checkPassword,
                },
              ]}
            />
          </Popover>
          <ProFormText.Password
            name="confirm"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder="确认密码"
            rules={[
              {
                required: true,
                message: '请确认密码！',
              },
              {
                validator: checkConfirm,
              },
            ]}
          />
          {/* <InputGroup compact>
          <Select
            size="large"
            value={prefix}
            onChange={changePrefix}
            style={{
              width: '20%',
            }}
          >
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
          </Select>
          <FormItem
            style={{
              width: '80%',
            }}
            name="mobile"
            rules={[
              {
                required: true,
                message: '请输入手机号!',
              },
              {
                pattern: /^\d{11}$/,
                message: '手机号格式错误!',
              },
            ]}
          >
            <Input size="large" placeholder="手机号" />
          </FormItem>
        </InputGroup>
        <Row gutter={8}>
          <Col span={16}>
            <FormItem
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码!',
                },
              ]}
            >
              <Input size="large" placeholder="验证码" />
            </FormItem>
          </Col>
          <Col span={8}>
            <Button
              size="large"
              disabled={!!count}
              className={styles.getCaptcha}
              onClick={onGetCaptcha}
            >
              {count ? `${count} s` : '获取验证码'}
            </Button>
          </Col>
        </Row> */}
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <span>注册</span>
            </Button>
            <Link className={styles.login} to="/user/login">
              <span>使用已有账户登录</span>
            </Link>
          </FormItem>
        </LoginForm>
      </div>
    </div>
  );
};

export default Register;
