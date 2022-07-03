import 'antd/dist/antd.css';
import React, { useEffect, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Input, message, Row, Select, Space, Spin, Typography, Statistic, Checkbox, TreeSelect } from 'antd';
import { BorderBottomOutlined, PlusOutlined } from '@ant-design/icons';
import { ProForm, ProFormText, FormComponents, ProFormCascader, ProFormSelect, ProFormDateRangePicker, ProFormGroup, ProFormCheckbox, ProFormRadio, ProFormTextArea, ProFormDatePicker, ProFormTreeSelect } from '@ant-design/pro-form';
import { ProCard } from '@ant-design/pro-card'
import { ProTable } from '@ant-design/pro-table'
import axios from 'axios';
import { Color } from '@antv/l7-react/lib/component/LayerAttribute';
import BasicLayout, { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { SmileOutlined } from '@ant-design/icons';
import { EditableProTable } from '@ant-design/pro-table';
import { useRefFunction } from '@ant-design/pro-utils';
import { dateSend, dateReceived } from './components/dateTranslate';
import { history, useLocation } from "umi";
import moment from 'moment';

const whitecolor = '#ffffff'
const graycolor = '#d6d6d6'
const rowbegingap = 20
const formitemheight = 70
const basewidth = 1500
const { Title, Paragraph } = Typography
const { Divider } = ProCard

const defaultModificationData = [];
const moduleFunctionColumns = [
    {
        title: '功能名称',
        dataIndex: 'functionName',
        width: '20%',
    },
    {
        title: '功能说明',
        dataIndex: 'functionDescription',
        valueType: 'textarea',
    },
]
const moduleColumns = [
    {
        title: '模块名称',
        dataIndex: 'moduleName',
        width: '10%',
    },
    {
        title: '模块功能列表',
        dataIndex: 'functions',
        renderFormItem: (dataSource) => {
            return (
                <ProTable
                    columns={moduleFunctionColumns}
                    search={false}
                    rowKey="id"
                    dataSource={dataSource}
                />
            )
        }
    },
];

const multipleValueRender = (array) => {
    var ret = ''
    for (var i in array) {
        if (i !== "0") {
            ret += ' | '
        }
        ret += array[i]
    }
    return ret
}

const operatingSystemRender = (OS) => {
    var renderResult = []
    for (var i in OS) {
        if (i % 2 === 0) {
            renderResult.push(<Divider type={'vertical'} />)
            renderResult.push(
                <ProCard>
                    <Statistic title={OS[i]} value={OS[i+1]} />
                </ProCard>
            )
        }
    }
    return renderResult
}

const EntrustmentViewer = () => {
    const location = useLocation();
    const entrustId = location.query.entrustId;

    const [moduleEditableKeys, setModuleEditableRowKeys] = useState(() => defaultModificationData.map((item) => item.id));

    const [cardLoading, setCardLoadingState] = useState(true);

    const [part1, setPart1] = useState({
        testType: [' '],
        principal: {
            account: " ",
            accountName: " ",
            bankName: " ",
            companyAddress: " ",
            companyCH: " ",
            companyEN: " ",
            companyPhone: " ",
            companyWebsite: " ",
            contact: " ",
            contactEmail: " ",
            contactPhone: " ",
            fax: " ",
            representative: " ",
            sigDate: " ",
            zipCode: " "
        }
    })
    const [part2, setPart2] = useState({
        clientMemoryRequirement: " ",
        clientOS: ['Windows _0641#toReplaceA1C1_1_0641#toReplaceA2C2_1', 'Linux _0641#toReplaceA1C1_2_0641#toReplaceA2C2_2', '_0641#toReplaceA1C1_3_0641#toReplaceA2C2_3'],
        clientOtherRequirement: " ",
        codeLine: " ",
        developer: " ",
        developerType: " ",
        functionIntro: " ",
        functionNums: " ",
        functionPoint: " ",
        name: " ",
        networkEnvironment: " ",
        servHardDiskRequirement: " ",
        servHardMemoryRequirement: " ",
        servHardOtherRequirement: " ",
        servSoftArch: [' '],
        servSoftDatabase: " ",
        servSoftMiddleware: " ",
        servSoftOS: " ",
        servSoftProgramLang: " ",
        servSoftVersion: " ",
        serverHardArch: [' ', 'UNIX/Linux服务器', '_0641#toReplaceA1C1_4_0641#toReplaceA2C2_4'],
        serverSideOtherSupport: " ",
        type: " ",
        userDescription: " ",
        version: " "
    })
    const [part3, setPart3] = useState({
        testStandard: [' '],
        techIndex: [' '],
        softwareMedium: " ",
        document: " ",
        sampleHandling: " ",
        expectedTime: " "
    })

    console.log(entrustId)
    if (typeof entrustId !== "undefined" && (typeof part1.haveRefreshed === "undefined" || !part1.haveRefreshed)) {
        axios.get("/api/entrust/" + entrustId).then(detail => {
            setCardLoadingState(true)
            console.log(detail.data.content)

            setModuleEditableRowKeys(detail.data.content.software.modules)
            
            for (var i in detail.data.content.testType) {
                if (detail.data.content.testType[i].substr(0, 21) === "_0641#toReplaceA1C1_0") {
                    if (typeof detail.data.content.toreplace_0 !== "undefined") {
                        detail.data.content.testType[i] = detail.data.content.toreplace_0
                    } else {
                        detail.data.content.testType.splice(i, 1)
                    }
                }
            }
            setPart1({
                haveRefreshed: true,
                testType: detail.data.content.testType,
                principal: detail.data.content.principal
            })

            let clientOS = []
            for (var i in detail.data.content.software.clientOS) {
                if (detail.data.content.software.clientOS[i].substr(0, 7) === "Windows") {
                    clientOS.push("Windows")
                    if (typeof detail.data.content.toreplace_1 !== "undefined") {
                        clientOS.push(detail.data.content.toreplace_1)
                    }
                    else {
                        clientOS.push(" ")
                    }
                }
                else if (detail.data.content.software.clientOS[i].substr(0, 5) === "Linux") {
                    clientOS.push("Linux")
                    if (typeof detail.data.content.toreplace_2 !== "undefined") {
                        clientOS.push(detail.data.content.toreplace_2)
                    }
                    else {
                        clientOS.push(" ")
                    }
                }
                else {
                    clientOS.push("其他操作系统")
                    if (typeof detail.data.content.toreplace_3 !== "undefined") {
                        clientOS.push(detail.data.content.toreplace_3)
                    }
                    else {
                        clientOS.push(" ")
                    }
                }
            }
            detail.data.content.software.clientOS = clientOS
            for (var i in detail.data.content.software.serverHardArch) {
                if (detail.data.content.software.serverHardArch[i].substr(0, 21) === "_0641#toReplaceA1C1_4") {
                    if (typeof detail.data.content.toreplace_4 !== "undefined") {
                        detail.data.content.software.serverHardArch[i] = detail.data.content.toreplace_4
                    } else {
                        detail.data.content.software.serverHardArch.splice(i, 1)
                    }
                }
            }
            delete detail.data.content.software.modules
            setPart2(detail.data.content.software)

            for (var i in detail.data.content.testStandard) {
                if (detail.data.content.testStandard[i].substr(0, 21) === "_0641#toReplaceA1C1_5") {
                    if (typeof detail.data.content.toreplace_5 !== "undefined") {
                        detail.data.content.testStandard[i] = detail.data.content.toreplace_5
                    } else {
                        detail.data.content.testStandard.splice(i, 1)
                    }
                }
            }
            for (var i in detail.data.content.techIndex) {
                if (detail.data.content.techIndex[i].substr(0, 21) === "_0641#toReplaceA1C1_6") {
                    if (typeof detail.data.content.toreplace_6 !== "undefined") {
                        detail.data.content.techIndex[i] = detail.data.content.toreplace_6
                    } else {
                        detail.data.content.techIndex.splice(i, 1)
                    }
                }
            }
            if (detail.data.content.softwareMedium.substr(0, 21) === "_0641#toReplaceA1C1_7") {
                if (typeof detail.data.content.toreplace_7 !== "undefined") {
                    detail.data.content.softwareMedium = detail.data.content.toreplace_7
                } else {
                    detail.data.content.softwareMedium = "其他"
                }
            }
            setPart3({
                testStandard: detail.data.content.testStandard,
                techIndex: detail.data.content.techIndex,
                softwareMedium: detail.data.content.softwareMedium,
                document: detail.data.content.document,
                sampleHandling: detail.data.content.sampleHandling,
                expectedTime: detail.data.content.expectedTime,
            })
            
            setCardLoadingState(false)
        }).catch(Error => {
            console.log(Error)
            setCardLoadingState(false)
        })
    } else if (typeof entrustId === "undefined") {
        console.log("No Entrust ID was given!")
    }

    return (
        <>
            <div style={{ margin: 70 }}>
                {/* <PageContainer title="输入表单"> */}
                <ProCard title="委托预览" loading={cardLoading}>
                    <ProCard.Group direction={'column'}>
                        <ProCard title="委托单位信息">
                            <ProCard.Group direction={'column'}>
                                <ProCard.Group direction={'row'}>
                                    <ProCard>
                                        <Statistic title="测试类型" value={multipleValueRender(part1.testType)} />
                                    </ProCard>
                                </ProCard.Group>
                                <Divider type={'horizontal'} />
                                <ProCard.Group direction={'column'}>
                                    <ProCard>
                                        <Statistic title="委托单位" value={part1.principal.companyCH} />
                                    </ProCard>
                                    <Divider type={'horizontal'} />
                                    <ProCard>
                                        <Statistic title="Trustor" value={part1.principal.companyEN} />
                                    </ProCard>
                                </ProCard.Group>
                                <Divider type={'horizontal'} />
                                <ProCard.Group direction={'row'}>
                                    <ProCard>
                                        <Statistic title="单位电话" value={part1.principal.companyPhone} />
                                    </ProCard>
                                    <Divider type={'vertical'} />
                                    <ProCard>
                                        <Statistic title="单位网址" value={part1.principal.companyWebsite} />
                                    </ProCard>
                                </ProCard.Group>
                                <Divider type={'horizontal'} />
                                <ProCard.Group direction={'column'}>
                                    <ProCard>
                                        <Statistic title="单位地址" value={part1.principal.companyAddress} />
                                    </ProCard>
                                </ProCard.Group>
                                <Divider type={'horizontal'} />
                                <ProCard.Group direction={'row'}>
                                    <ProCard>
                                        <Statistic title="联系人名称" value={part1.principal.contact} />
                                    </ProCard>
                                    <Divider type={'vertical'} />
                                    <ProCard>
                                        <Statistic title="联系人电话" value={part1.principal.contactPhone} />
                                    </ProCard>
                                </ProCard.Group>
                                <Divider type={'horizontal'} />
                                <ProCard.Group direction={'column'}>
                                    <ProCard>
                                        <Statistic title="联系人邮箱" value={part1.principal.contactEmail} />
                                    </ProCard>
                                    <Divider type={'horizontal'} />
                                    <ProCard>
                                        <Statistic title="授权代表" value={part1.principal.representative} />
                                    </ProCard>
                                    <Divider type={'horizontal'} />
                                    <ProCard>
                                        <Statistic title="签章日期" value={part1.principal.sigDate} />
                                    </ProCard>
                                </ProCard.Group>
                                <Divider type={'horizontal'} />
                                <ProCard.Group direction={'row'}>
                                    <ProCard>
                                        <Statistic title="邮编" value={part1.principal.zipCode} />
                                    </ProCard>
                                    <Divider type={'vertical'} />
                                    <ProCard>
                                        <Statistic title="传真" value={part1.principal.fax} />
                                    </ProCard>
                                </ProCard.Group>
                                <Divider type={'horizontal'} />
                                <ProCard.Group direction={'column'}>
                                    <ProCard>
                                        <Statistic title="开户银行" value={part1.principal.bankName} />
                                    </ProCard>
                                    <Divider type={'horizontal'} />
                                    <ProCard>
                                        <Statistic title="银行账号" value={part1.principal.account} />
                                    </ProCard>
                                    <Divider type={'horizontal'} />
                                    <ProCard>
                                        <Statistic title="银行户名" value={part1.principal.accountName} />
                                    </ProCard>
                                </ProCard.Group>
                            </ProCard.Group>
                        </ProCard>
                        <Divider type={'horizontal'} />

                        <ProCard title="软件详情">
                            <ProCard.Group direction={'column'}>
                                <ProCard.Group direction={'row'}>
                                    <ProCard>
                                        <Statistic title="软件名称" value={part2.name} />
                                    </ProCard>
                                    <Divider type={'vertical'} />
                                    <ProCard>
                                        <Statistic title="版本号" value={part2.version} />
                                    </ProCard>
                                </ProCard.Group>
                                <Divider type={'horizontal'} />
                                <ProCard.Group direction={'column'}>
                                    <ProCard>
                                        <Statistic title="开发单位" value={part2.developer} />
                                    </ProCard>
                                    <Divider type={'horizontal'} />
                                    <ProCard>
                                        <Statistic title="开发单位性质" value={part2.developerType} />
                                    </ProCard>
                                    <Divider type={'horizontal'} />
                                    <ProCard>
                                        <Statistic title="软件用户对象描述" value={part2.userDescription} />
                                    </ProCard>
                                    <Divider type={'horizontal'} />
                                    <ProCard>
                                        <Statistic title="主要功能简介" value={part2.functionIntro} />
                                    </ProCard>
                                </ProCard.Group>
                                <Divider type={'horizontal'} />
                                <ProCard.Group direction={'row'}>
                                    <ProCard>
                                        <Statistic title="功能数" value={part2.functionNums} />
                                    </ProCard>
                                    <Divider type={'vertical'} />
                                    <ProCard>
                                        <Statistic title="功能点数" value={part2.functionPoint} />
                                    </ProCard>
                                    <Divider type={'vertical'} />
                                    <ProCard>
                                        <Statistic title="代码行数" value={part2.codeLine} />
                                    </ProCard>
                                </ProCard.Group>
                                <Divider type={'horizontal'} />
                                <ProCard.Group direction={'column'}>
                                    <ProCard>
                                        <Statistic title="软件类型" value={part2.type} />
                                    </ProCard>
                                </ProCard.Group>
                            </ProCard.Group>
                        </ProCard>
                        <Divider type={'horizontal'} />

                        <ProCard title="运行环境">
                            <ProCard.Group direction={'column'}>
                                <ProCard title="客户端">
                                    <ProCard.Group direction={'column'}>
                                        <ProCard.Group title="操作系统" direction={'row'}>
                                            {operatingSystemRender(part2.clientOS)}
                                        </ProCard.Group>
                                        <Divider type={'horizontal'} />
                                        <ProCard>
                                            <Statistic title="内存要求" value={part2.clientMemoryRequirement} />
                                        </ProCard>
                                        <Divider type={'horizontal'} />
                                        <ProCard>
                                            <Statistic title="其他要求" value={part2.clientOtherRequirement} />
                                        </ProCard>
                                    </ProCard.Group>
                                </ProCard>
                                <Divider type={'horizontal'} />
                                <ProCard title="服务端">
                                    <ProCard.Group direction={'column'}>
                                        <ProCard title="硬件">
                                            <ProCard.Group direction={'column'}>
                                                <ProCard>
                                                    <Statistic title="架构" value={multipleValueRender(part2.serverHardArch)} />
                                                </ProCard>
                                                <Divider type={'horizontal'} />
                                                <ProCard>
                                                    <Statistic title="内存要求" value={part2.servHardMemoryRequirement} />
                                                </ProCard>
                                                <Divider type={'horizontal'} />
                                                <ProCard>
                                                    <Statistic title="硬盘要求" value={part2.servHardDiskRequirement} />
                                                </ProCard>
                                                <Divider type={'horizontal'} />
                                                <ProCard>
                                                    <Statistic title="其他要求" value={part2.servHardOtherRequirement} />
                                                </ProCard>
                                            </ProCard.Group>
                                        </ProCard>
                                        <Divider type={'horizontal'} />
                                        <ProCard title="软件">
                                            <ProCard.Group direction={'column'}>
                                                <ProCard.Group direction={'row'}>
                                                    <ProCard>
                                                        <Statistic title="操作系统" value={part2.servSoftOS} />
                                                    </ProCard>
                                                    <Divider type={'vertical'} />
                                                    <ProCard>
                                                        <Statistic title="版本" value={part2.servSoftVersion} />
                                                    </ProCard>
                                                </ProCard.Group>
                                                <Divider type={'horizontal'} />
                                                <ProCard>
                                                    <Statistic title="编程语言" value={part2.servSoftProgramLang} />
                                                </ProCard>
                                                <Divider type={'horizontal'} />
                                                <ProCard>
                                                    <Statistic title="构架" value={multipleValueRender(part2.servSoftArch)} />
                                                </ProCard>
                                                <Divider type={'horizontal'} />
                                                <ProCard>
                                                    <Statistic title="数据库" value={part2.servSoftDatabase} />
                                                </ProCard>
                                                <Divider type={'horizontal'} />
                                                <ProCard>
                                                    <Statistic title="中间件" value={part2.servSoftMiddleware} />
                                                </ProCard>
                                                <Divider type={'horizontal'} />
                                                <ProCard>
                                                    <Statistic title="其他支撑软件" value={part2.serverSideOtherSupport} />
                                                </ProCard>
                                            </ProCard.Group>
                                        </ProCard>
                                        <Divider type={'horizontal'} />
                                        <ProCard>
                                            <Statistic title="网络环境" value={part2.networkEnvironment} />
                                        </ProCard>
                                    </ProCard.Group>
                                </ProCard>
                            </ProCard.Group>
                        </ProCard>
                        <Divider type={'horizontal'} />

                        <ProCard title="附表: NST-04-JS003-2011-委托测试软件功能列表">
                            <ProCard.Group direction={'column'}>
                                <ProTable
                                    headerTitle="模块列表"
                                    columns={moduleColumns}
                                    search={false}
                                    rowKey="id"
                                    dataSource={moduleEditableKeys}
                                />
                                <Divider type={'horizontal'} />
                                <ProCard>
                                    <Statistic title="测试依据" value={multipleValueRender(part3.testStandard)} />
                                </ProCard>
                                <Divider type={'horizontal'} />
                                <ProCard>
                                    <Statistic title="测试指标" value={multipleValueRender(part3.techIndex)} />
                                </ProCard>
                                <Divider type={'horizontal'} />
                                <ProCard>
                                    <Statistic title="软件介质" value={part3.softwareMedium} />
                                </ProCard>
                                <Divider type={'horizontal'} />
                                <ProCard>
                                    <Statistic title="文档资料" value={part3.document} />
                                </ProCard>
                                <Divider type={'horizontal'} />
                                <ProCard>
                                    <Statistic title="提交样品（硬拷贝资料、硬件）五年保存期满后:" value={part3.sampleHandling} />
                                </ProCard>
                                <Divider type={'horizontal'} />
                                <ProCard>
                                    <Statistic title="希望完成时间" value={part3.expectedTime} />
                                </ProCard>
                            </ProCard.Group>
                        </ProCard>
                    </ProCard.Group>
                </ProCard>
            {/* </PageContainer> */}
        </div>
        </>
    );
}

export default EntrustmentViewer;