import React from 'react';
import logo1 from './image/nju.png'
import code1 from './image/code.png'
import alipay1 from './image/A_-wAhRYnWQscAAAAAAAAAAABkARQnAQ.png'
import alipay2 from './image/A_CTp8T7RT-VkAAAAAAAAAAABkARQnAQ.png'
import alipay3 from './image/e339fc34-b022-4cde-9607-675ca9e05231.svg'
export const Nav30DataSource = {
  wrapper: { className: 'header3 home-page-wrapper jzih1dpqqrg-editor_css' },
  page: { className: 'home-page' },
  logo: {
    className: 'header3-logo jzjgnya1gmn-editor_css',
    children: logo1,
  },
  Menu: {
    className: 'header3-menu',
    children: [
      {
        name: 'item1',
        className: 'header3-item',
        children: {
          href: '#',
          children: [
            {
              children: (
                <span>
                  <span>
                    <p>移动端下载</p>
                  </span>
                </span>
              ),
              name: 'text',
            },
          ],
        },
        subItem: [
          {
            className: 'item-sub l599y698ic-editor_css',
            children: {
              className: 'item-sub-item jzj8295azrs-editor_css',
              children: [
                {
                  name: 'image0',
                  className: 'item-image jzj81c9wabh-editor_css',
                  children: code1,
                },
              ],
            },
            name: 'sub~jzj8hceysgj',
          },
        ],
      },
      {
        name: 'item2',
        className: 'header3-item',
        children: {
          href: '/~docs',
          children: [
            {
              children: (
                <span>
                  <p>帮助中心</p>
                </span>
              ),
              name: 'text',
            },
          ],
          target: '',
        },
      },
    ],
  },
  mobileMenu: { className: 'header3-mobile-menu' },
};
export const Banner50DataSource = {
  wrapper: { className: 'home-page-wrapper banner5' },
  page: { className: 'home-page banner5-page l53vo7ix2gl-editor_css' },
  childWrapper: {
    className: 'banner5-title-wrapper',
    children: [
      {
        name: 'title',
        children: (
          <span>
            <p>南京大学测试中心</p>
          </span>
        ),
        className: 'banner5-title',
      },
      {
        name: 'explain',
        className: 'banner5-explain',
        children: (
          <span>
            <span>
              <p>国家级测试中心</p>
            </span>
          </span>
        ),
      },
      {
        name: 'content',
        className: 'banner5-content',
        children: (
          <span>
            <p>为企业、实验室、政府单位的软件提供全面的检测</p>
          </span>
        ),
      },
      {
        name: 'button',
        className: 'banner5-button-wrapper',
        children: {
          href: 'https://www.nju.edu.cn/',
          className: 'banner5-button',
          type: 'primary',
          children: (
            <span>
              <p>了解更多</p>
            </span>
          ),
          target: '_blank',
        },
      },
    ],
  },
  image: {
    className: 'banner5-image l599txbq0o-editor_css',
    children:
      alipay1,
  },
};
export const Feature70DataSource = {
  wrapper: { className: 'home-page-wrapper feature7-wrapper' },
  page: { className: 'home-page feature7' },
  OverPack: { playScale: 0.3 },
  titleWrapper: {
    className: 'feature7-title-wrapper',
    children: [
      {
        name: 'title',
        className: 'feature7-title-h1',
        children: (
          <span>
            <p>报告生成服务</p>
          </span>
        ),
      },
      {
        name: 'content',
        className: 'feature7-title-content',
        children: (
          <span>
            <p>了解测试报告的样例</p>
          </span>
        ),
      },
    ],
  },
  blockWrapper: {
    className: 'feature7-block-wrapper',
    gutter: 24,
    children: [
      {
        md: 6,
        xs: 24,
        name: 'block0',
        className: 'feature7-block',
        children: {
          className: 'feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'feature7-block-image',
              children:
                alipay3,
            },
            {
              name: 'title',
              className: 'feature7-block-title',
              children: (
                <span>
                  <span>
                    <p>JS001</p>
                  </span>
                </span>
              ),
            },
            {
              name: 'content',
              className: 'feature7-block-content',
              children: (
                <span>
                  <span>
                    <p>BALABALA</p>
                  </span>
                </span>
              ),
            },
          ],
        },
      },
      {
        md: 6,
        xs: 24,
        name: 'block1',
        className: 'feature7-block',
        children: {
          className: 'feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'feature7-block-image',
              children:
                alipay3,
            },
            {
              name: 'title',
              className: 'feature7-block-title',
              children: (
                <span>
                  <p>JS002</p>
                </span>
              ),
            },
            {
              name: 'content',
              className: 'feature7-block-content',
              children: (
                <span>
                  <p>BALABALA</p>
                </span>
              ),
            },
          ],
        },
      },
      {
        md: 6,
        xs: 24,
        name: 'block2',
        className: 'feature7-block',
        children: {
          className: 'feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'feature7-block-image',
              children:
                alipay3,
            },
            {
              name: 'title',
              className: 'feature7-block-title',
              children: (
                <span>
                  <p>JS003</p>
                </span>
              ),
            },
            {
              name: 'content',
              className: 'feature7-block-content',
              children: (
                <span>
                  <p>BALABALA</p>
                </span>
              ),
            },
          ],
        },
      },
      {
        md: 6,
        xs: 24,
        name: 'block3',
        className: 'feature7-block',
        children: {
          className: 'feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'feature7-block-image',
              children:
                alipay3,
            },
            {
              name: 'title',
              className: 'feature7-block-title',
              children: (
                <span>
                  <p>JS004</p>
                </span>
              ),
            },
            {
              name: 'content',
              className: 'feature7-block-content',
              children: (
                <span>
                  <p>BALABALA</p>
                </span>
              ),
            },
          ],
        },
      },
      {
        md: 6,
        xs: 24,
        name: 'block4',
        className: 'feature7-block',
        children: {
          className: 'feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'feature7-block-image',
              children:
                alipay3,
            },
            {
              name: 'title',
              className: 'feature7-block-title',
              children: (
                <span>
                  <p>JS005</p>
                </span>
              ),
            },
            {
              name: 'content',
              className: 'feature7-block-content',
              children: (
                <span>
                  <p>BALABALA</p>
                </span>
              ),
            },
          ],
        },
      },
      {
        md: 6,
        xs: 24,
        name: 'block5',
        className: 'feature7-block',
        children: {
          className: 'feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'feature7-block-image',
              children:
                alipay3,
            },
            {
              name: 'title',
              className: 'feature7-block-title',
              children: (
                <span>
                  <p>JS006</p>
                </span>
              ),
            },
            {
              name: 'content',
              className: 'feature7-block-content',
              children: (
                <span>
                  <p>BALABALA</p>
                </span>
              ),
            },
          ],
        },
      },
      {
        md: 6,
        xs: 24,
        name: 'block6',
        className: 'feature7-block',
        children: {
          className: 'feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'feature7-block-image',
              children:
                alipay3,
            },
            {
              name: 'title',
              className: 'feature7-block-title',
              children: (
                <span>
                  <p>JS007</p>
                </span>
              ),
            },
            {
              name: 'content',
              className: 'feature7-block-content',
              children: (
                <span>
                  <p>BALABALA</p>
                </span>
              ),
            },
          ],
        },
      },
      {
        md: 6,
        xs: 24,
        name: 'block7',
        className: 'feature7-block',
        children: {
          className: 'feature7-block-group',
          children: [
            {
              name: 'image',
              className: 'feature7-block-image',
              children:
                alipay3,
            },
            {
              name: 'title',
              className: 'feature7-block-title',
              children: (
                <span>
                  <p>JS008</p>
                </span>
              ),
            },
            {
              name: 'content',
              className: 'feature7-block-content',
              children: (
                <span>
                  <p>BALABALA</p>
                </span>
              ),
            },
          ],
        },
      },
    ],
  },
};
export const Feature00DataSource = {
  wrapper: { className: 'home-page-wrapper content0-wrapper' },
  page: { className: 'home-page content0' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [{ name: 'title', children: '产品与服务' }],
  },
  childWrapper: {
    className: 'content0-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'jzjn8afnsxb-editor_css content0-block',
        md: 6,
        xs: 24,
        children: {
          className: 'content0-block-item jzjgrrupf2c-editor_css',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon jzjgrlz134-editor_css',
              children:
                alipay2,
            },
            {
              name: 'title',
              className: 'content0-block-title jzj8xt5kgv7-editor_css',
              children: (
                <span>
                  <span>
                    <span>
                      <span>
                        <span>
                          <p>委托申请服务</p>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              ),
            },
            {
              name: 'content',
              children: (
                <span>
                  <span>
                    <span>
                      <span>
                        <span>
                          <span>
                            <p>平台对客户新申请的处理服务。</p>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              ),
              className: 'jzj8z9sya9-editor_css',
            },
          ],
        },
      },
      {
        name: 'block1',
        className: 'content0-block',
        md: 6,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon jzjncn210ql-editor_css',
              children:
                alipay2,
            },
            {
              name: 'title',
              className: 'content0-block-title jzjne54fwqm-editor_css',
              children: (
                <span>
                  <span>
                    <span>
                      <p>测试项目服务</p>
                    </span>
                  </span>
                </span>
              ),
            },
            {
              name: 'content',
              children: (
                <span>
                  <span>
                    <span>
                      <span>
                        <span>
                          <p>
                            平台对已签订合同的委托申请进行实际测试工作服务。
                          </p>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              ),
            },
          ],
        },
      },
      {
        name: 'block2',
        className: 'content0-block',
        md: 6,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon jzjndq0dueg-editor_css',
              children:
                alipay2,
            },
            {
              name: 'title',
              className: 'content0-block-title jzjne24af8c-editor_css',
              children: (
                <span>
                  <span>
                    <p>文档服务</p>
                  </span>
                </span>
              ),
            },
            {
              name: 'content',
              children: (
                <span>
                  <span>
                    <span>
                      <p>平台对流程中某处需要用到生成pdf功能时的服务。</p>
                    </span>
                  </span>
                </span>
              ),
            },
          ],
        },
      },
      {
        name: 'block~jzjn87bmyc7',
        className: 'content0-block',
        md: 6,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon jzjndsyw8sf-editor_css',
              children:
                alipay2,
            },
            {
              name: 'title',
              className: 'content0-block-title jzjndw5oerk-editor_css',
              children: (
                <span>
                  <span>
                    <p>样品服务</p>
                  </span>
                </span>
              ),
            },
            {
              name: 'content',
              children: (
                <span>
                  <span>
                    <span>
                      <span>
                        <p>
                          平台对所有委托对应需要测试的样品集进行维护管理及更新的服务。
                        </p>
                      </span>
                    </span>
                  </span>
                </span>
              ),
            },
          ],
        },
      },
    ],
  },
};
export const Footer10DataSource = {
  wrapper: { className: 'home-page-wrapper footer1-wrapper' },
  OverPack: { className: 'footer1 l53wk33bd8u-editor_css', playScale: 0.2 },
  block: {
    className: 'home-page',
    gutter: 0,
    children: [
      {
        name: 'block0',
        xs: 24,
        md: 8,
        className: 'block',
        title: {
          className: 'logo jzl0qcpyjra-editor_css',
          children: logo1,
        },
        childWrapper: {
          className: 'slogan',
          children: [
            {
              name: 'content0',
              children: (
                <span>
                  <p>南京大学测试平台</p>
                </span>
              ),
            },
          ],
        },
      },
      {
        name: 'block2',
        xs: 24,
        md: 8,
        className: 'block',
        title: { children: <p>联系我们</p> },
        childWrapper: {
          children: [
            {
              href: 'https://github.com/ZFirozen/SE-Project-Front',
              name: 'link0',
              children: (
                <span>
                  <p>地址</p>
                </span>
              ),
              className: 'jzl0u1bko6-editor_css',
              target: '_blank',
            },
            {
              href: 'https://github.com/ZFirozen/SE-Project-Front',
              name: 'link1',
              children: '联系我们',
              target: '_blank',
            },
          ],
        },
      },
      {
        name: 'block3',
        xs: 24,
        md: 8,
        className: 'block',
        title: { children: '资源' },
        childWrapper: {
          children: [
            {
              href: 'https://github.com/ZFirozen/SE-Project-Front',
              name: 'link0',
              children: 'Ant Design',
            },
            {
              href: 'https://github.com/ZFirozen/SE-Project-Front',
              name: 'link1',
              children: 'Ant Motion',
            },
          ],
        },
      },
    ],
  },
  copyrightWrapper: { className: 'copyright-wrapper' },
  copyrightPage: { className: 'home-page' },
  copyright: {
    className: 'copyright',
    children: (
      <span>
        <span>
          <a href="https://github.com/ZFirozen/SE-Project-Front">隐私权政策</a>&nbsp;
          &nbsp; &nbsp; |&nbsp; &nbsp; &nbsp;{' '}
          <a href="https://github.com/ZFirozen/SE-Project-Front">
            权益保障承诺书
          </a>&nbsp; &nbsp; &nbsp;&nbsp;ICP证:XXX&nbsp; &nbsp; &nbsp; Copyright
          © 2021 南京大学<br />
        </span>
      </span>
    ),
  },
};
