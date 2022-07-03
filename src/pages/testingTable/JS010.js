import 'antd/dist/antd.css';
import React, { useEffect, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Form, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect, InputNumber, DatePicker, Radio } from 'antd';
import { ProForm, ProFormText, FormComponents, ProFormCascader, ProFormSelect, ProFormDateRangePicker, ProFormGroup, ProFormCheckbox, ProFormRadio, ProFormTextArea, ProFormDatePicker, ProFormTreeSelect } from "@ant-design/pro-form";
import { history, useLocation } from "umi";
import axios from 'axios';

const whitecolor = '#ffffff'
const graycolor = '#f1f1f1'
const userRole = localStorage.getItem("userRole");
const rowbegingap = 20
const formitemheight = 62
const { Title, Paragraph } = Typography
const gray = { paddingLeft: rowbegingap, backgroundColor: graycolor, height: "100%", paddingTop: 11, paddingBottom: 11, width: "100%", columnGap: 32 }
const white = { paddingLeft: rowbegingap, backgroundColor: whitecolor, height: "100%", paddingTop: 11, paddingBottom: 11, width: "100%", columnGap: 32 }
var reportReviewId = "";

const JS010 = () => {
    const location = useLocation();
    const testId = location.query.testId;
    const [pass, setPass] = useState([true, true, true, true, true, true, true, true, true, true, true, true, true, true]);
    var passed = true;

    return (
        <>
            <div style={{ margin: 70 }}>
                <ProForm
                    size="large"
                    style={{ font: "initial", border: "3px solid" }}
                    layout="horizontal"
                    scrollToFirstError="true"
                    onFinish={async (values) => {
                        values.projectId = testId
                        values.id = reportReviewId
                        console.log(values)
                        if (passed === false)
                            passed = true;
                            for (let i = 0; i < pass.length; i++) {
                                console.log(pass[i]);
                                if (pass[i] === false) {
                                    passed = false;
                                    break;
                                }
                            }
    
                        const newStage = { "stage": passed ? "REPORT_QA_PASSED" : "REPORT_QA_DENIED", "message": "" };
                        console.log("rrid="+reportReviewId)
                        axios.post("/api/review/report/" + reportReviewId, values)
                            .then((response) => {
                                if (response.status === 200) {
                                    message.success("提交成功！");
                                    axios.post("/api/test/" + testId + "/status", newStage)
                                        .then((response) => {
                                            console.log(response);
                                            message.success("成功进入下一阶段！");
                                            history.goBack();
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                            message.error("提交失败，请重试！");
                                        })
                                } else {
                                    message.error("提交失败？");
                                    console.log("Unknown error!");
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                                message.error("提交失败！");
                            });
                    }}
                    request={async () => {
                        return axios.get("/api/test/" + testId)
                            .then((project) => {
                                console.log(project.data)
                                reportReviewId = project.data.projectFormIds.testReportCecklistId
                                console.log("get rrid="+reportReviewId)
                                return {};
                            })
                            .catch((error) => {
                                console.log(error);
                                return {}
                            });
                    }
                    }
                >
                    <Title level={3} style={gray}>测试报告检查表</Title>
                    <Col style={white}>
                        <Row><ProFormText width="md" required rules={[{ required: true, message: "这是必填项" }]} name={"softwareName"} label="软件名称" /></Row>
                        <Row><ProFormText width="md" required rules={[{ required: true, message: "这是必填项" }]} name={"principal"} label="委托单位" /></Row>
                    </Col>
                    <Title level={4} style={gray}>1 报告编号</Title>
                    <Col style={white}>
                        <Row>内容描述：检查报告编号的正确性（是否符合编码规则）与前后的一致性（报告首页与每页页眉）。</Row>
                        <br />
                        <Row>
                            检查结果：
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "通过",
                                        value: true,
                                    },
                                    {
                                        label: "不通过",
                                        value: false,
                                    },
                                ]}
                                onChange={({ target: { value } }) => {
                                    setPass((pre) => {
                                        pre[0] = value;
                                        const passCopy = pre.slice();
                                        return passCopy;
                                    });
                                }}
                                // value={pass[0]}
                                name={["conclusions", 0, "passed"]}
                            />
                        </Row>
                        <br />
                        <Row><ProFormText label="不通过原因" rules={[{ required: !pass[0], message: "这是必填项" }]} disabled={pass[0]} name={["conclusions", 0, "message"]} /></Row>
                    </Col>
                    <Title level={4} style={gray}>2 页码</Title>
                    <Col style={white}>
                        <Row>内容描述：检查页码与总页数是否正确（报告首页与每页页眉）。</Row>
                        <br />
                        <Row>
                            检查结果：
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "通过",
                                        value: true,
                                    },
                                    {
                                        label: "不通过",
                                        value: false,
                                    },
                                ]}
                                onChange={({ target: { value } }) => {
                                    setPass((pre) => {
                                        pre[1] = value;
                                        const passCopy = pre.slice();
                                        return passCopy;
                                    });
                                }}
                                // value={pass[1]}
                                name={["conclusions", 1, "passed"]}
                            />
                        </Row>
                        <br />
                        <Row><ProFormText label="不通过原因" rules={[{ required: !pass[1], message: "这是必填项" }]} disabled={pass[1]} name={["conclusions", 1, "message"]} /></Row>
                    </Col>
                    <Title level={4} style={gray}>3 软件名称</Title>
                    <Col style={white}>
                        <Row>内容描述：是否和确认单一致，是否前后一致（共三处，包括首页、报告页、附件三）。</Row>
                        <br />
                        <Row>
                            检查结果：
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "通过",
                                        value: true,
                                    },
                                    {
                                        label: "不通过",
                                        value: false,
                                    },
                                ]}
                                onChange={({ target: { value } }) => {
                                    setPass((pre) => {
                                        pre[2] = value;
                                        const passCopy = pre.slice();
                                        return passCopy;
                                    });
                                }}
                                // value={pass[2]}
                                name={["conclusions", 2, "passed"]}
                            />
                        </Row>
                        <br />
                        <Row><ProFormText label="不通过原因" rules={[{ required: !pass[2], message: "这是必填项" }]} disabled={pass[2]} name={["conclusions", 2, "message"]} /></Row>
                    </Col>
                    <Title level={4} style={gray}>4 版本号</Title>
                    <Col style={white}>
                        <Row>内容描述：是否和确认单一致，是否前后一致（共二处，包括首页、报告页）。</Row>
                        <br />
                        <Row>
                            检查结果：
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "通过",
                                        value: true,
                                    },
                                    {
                                        label: "不通过",
                                        value: false,
                                    },
                                ]}
                                onChange={({ target: { value } }) => {
                                    setPass((pre) => {
                                        pre[3] = value;
                                        const passCopy = pre.slice();
                                        return passCopy;
                                    });
                                }}
                                // value={pass[3]}
                                name={["conclusions", 3, "passed"]}
                            />
                        </Row>
                        <br />
                        <Row><ProFormText label="不通过原因" rules={[{ required: !pass[3], message: "这是必填项" }]} disabled={pass[3]} name={["conclusions", 3, "message"]} /></Row>
                    </Col>
                    <Title level={4} style={gray}>5 委托单位</Title>
                    <Col style={white}>
                        <Row>内容描述：是否和确认单一致，是否前后一致（共二处，包括首页、报告页）。</Row>
                        <br />
                        <Row>
                            检查结果：
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "通过",
                                        value: true,
                                    },
                                    {
                                        label: "不通过",
                                        value: false,
                                    },
                                ]}
                                onChange={({ target: { value } }) => {
                                    setPass((pre) => {
                                        pre[4] = value;
                                        const passCopy = pre.slice();
                                        return passCopy;
                                    });
                                }}
                                // value={pass[4]}
                                name={["conclusions", 4, "passed"]}
                            />
                        </Row>
                        <br />
                        <Row><ProFormText label="不通过原因" rules={[{ required: !pass[4], message: "这是必填项" }]} disabled={pass[4]} name={["conclusions", 4, "message"]} /></Row>
                    </Col>
                    <Title level={4} style={gray}>6 完成日期</Title>
                    <Col style={white}>
                        <Row>是否前后一致（共二处，包括首页、报告页页末）。</Row>
                        <br />
                        <Row>
                            检查结果：
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "通过",
                                        value: true,
                                    },
                                    {
                                        label: "不通过",
                                        value: false,
                                    },
                                ]}
                                onChange={({ target: { value } }) => {
                                    setPass((pre) => {
                                        pre[5] = value;
                                        const passCopy = pre.slice();
                                        return passCopy;
                                    });
                                }}
                                // value={pass[5]}
                                name={["conclusions", 5, "passed"]}
                            />
                        </Row>
                        <br />
                        <Row><ProFormText label="不通过原因" rules={[{ required: !pass[5], message: "这是必填项" }]} disabled={pass[5]} name={["conclusions", 5, "message"]} /></Row>
                    </Col>
                    <Title level={4} style={gray}>7 委托单位地址</Title>
                    <Col style={white}>
                        <Row>内容描述：是否和确认单一致（共一处，报告页）。</Row>
                        <br />
                        <Row>
                            检查结果：
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "通过",
                                        value: true,
                                    },
                                    {
                                        label: "不通过",
                                        value: false,
                                    },
                                ]}
                                onChange={({ target: { value } }) => {
                                    setPass((pre) => {
                                        pre[6] = value;
                                        const passCopy = pre.slice();
                                        return passCopy;
                                    });
                                }}
                                // value={pass[6]}
                                name={["conclusions", 6, "passed"]}
                            />
                        </Row>
                        <br />
                        <Row><ProFormText label="不通过原因" rules={[{ required: !pass[6], message: "这是必填项" }]} disabled={pass[6]} name={["conclusions", 6, "message"]} /></Row>
                    </Col>
                    <Title level={4} style={gray}>8 序号</Title>
                    <Col style={white}>
                        <Row>内容描述：附件二、附件三中的序号是否正确、连续。</Row>
                        <br />
                        <Row>
                            检查结果：
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "通过",
                                        value: true,
                                    },
                                    {
                                        label: "不通过",
                                        value: false,
                                    },
                                ]}
                                onChange={({ target: { value } }) => {
                                    setPass((pre) => {
                                        pre[7] = value;
                                        const passCopy = pre.slice();
                                        return passCopy;
                                    });
                                }}
                                // value={pass[7]}
                                name={["conclusions", 7, "passed"]}
                            />
                        </Row>
                        <br />
                        <Row><ProFormText label="不通过原因" rules={[{ required: !pass[7], message: "这是必填项" }]} disabled={pass[7]} name={["conclusions", 7, "message"]} /></Row>
                    </Col>
                    <Title level={4} style={gray}>9 测试样品</Title>
                    <Col style={white}>
                        <Row>内容描述：样品名称是否正确，数量是否正确。</Row>
                        <br />
                        <Row>
                            检查结果：
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "通过",
                                        value: true,
                                    },
                                    {
                                        label: "不通过",
                                        value: false,
                                    },
                                ]}
                                onChange={({ target: { value } }) => {
                                    setPass((pre) => {
                                        pre[8] = value;
                                        const passCopy = pre.slice();
                                        return passCopy;
                                    });
                                }}
                                // value={pass[8]}
                                name={["conclusions", 8, "passed"]}
                            />
                        </Row>
                        <br />
                        <Row><ProFormText label="不通过原因" rules={[{ required: !pass[8], message: "这是必填项" }]} disabled={pass[8]} name={["conclusions", 8, "message"]} /></Row>
                    </Col>
                    <Title level={4} style={gray}>10 软、硬件列表</Title>
                    <Col style={white}>
                        <Row>内容描述：列表是否完整（如打印机），用途描述是否合理正确。</Row>
                        <br />
                        <Row>
                            检查结果：
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "通过",
                                        value: true,
                                    },
                                    {
                                        label: "不通过",
                                        value: false,
                                    },
                                ]}
                                onChange={({ target: { value } }) => {
                                    setPass((pre) => {
                                        pre[9] = value;
                                        const passCopy = pre.slice();
                                        return passCopy;
                                    });
                                }}
                                // value={pass[9]}
                                name={["conclusions", 9, "passed"]}
                            />
                        </Row>
                        <br />
                        <Row><ProFormText label="不通过原因" rules={[{ required: !pass[9], message: "这是必填项" }]} disabled={pass[9]} name={["conclusions", 9, "message"]} /></Row>
                    </Col>
                    <Title level={4} style={gray}>11 文字、内容、格式</Title>
                    <Title level={5} style={gray}>11.1 错别字</Title>
                    <Col style={white}>
                        <Row>内容描述：报告中是否还有错别字。</Row>
                        <br />
                        <Row>
                            检查结果：
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "通过",
                                        value: true,
                                    },
                                    {
                                        label: "不通过",
                                        value: false,
                                    },
                                ]}
                                onChange={({ target: { value } }) => {
                                    setPass((pre) => {
                                        pre[10] = value;
                                        const passCopy = pre.slice();
                                        return passCopy;
                                    });
                                }}
                                // value={pass[10]}
                                name={["conclusions", 10, "passed"]}
                            />
                        </Row>
                        <br />
                        <Row><ProFormText label="不通过原因" rules={[{ required: !pass[10], message: "这是必填项" }]} disabled={pass[10]} name={["conclusions", 10, "message"]} /></Row>
                    </Col>
                    <Title level={5} style={gray}>11.2 语句</Title>
                    <Col style={white}>
                        <Row>内容描述：报告的语句是否通顺合理；每个功能描述结束后是否都有句号。</Row>
                        <br />
                        <Row>
                            检查结果：
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "通过",
                                        value: true,
                                    },
                                    {
                                        label: "不通过",
                                        value: false,
                                    },
                                ]}
                                onChange={({ target: { value } }) => {
                                    setPass((pre) => {
                                        pre[11] = value;
                                        const passCopy = pre.slice();
                                        return passCopy;
                                    });
                                }}
                                // value={pass[11]}
                                name={["conclusions", 11, "passed"]}
                            />
                        </Row>
                        <br />
                        <Row><ProFormText label="不通过原因" rules={[{ required: !pass[11], message: "这是必填项" }]} disabled={pass[11]} name={["conclusions", 11, "message"]} /></Row>
                    </Col>
                    <Title level={5} style={gray}>11.3 格式</Title>
                    <Col style={white}>
                        <Row>内容描述：报告的格式是否美观，字体是否一致，表格大小是否一致。（如无特殊情况请尽量不要将报告页中的表格分为2页。）</Row>
                        <br />
                        <Row>
                            检查结果：
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "通过",
                                        value: true,
                                    },
                                    {
                                        label: "不通过",
                                        value: false,
                                    },
                                ]}
                                onChange={({ target: { value } }) => {
                                    setPass((pre) => {
                                        pre[12] = value;
                                        const passCopy = pre.slice();
                                        return passCopy;
                                    });
                                }}
                                // value={pass[12]}
                                name={["conclusions", 12, "passed"]}
                            />
                        </Row>
                        <br />
                        <Row><ProFormText label="不通过原因" rules={[{ required: !pass[12], message: "这是必填项" }]} disabled={pass[12]} name={["conclusions", 12, "message"]} /></Row>
                    </Col>
                    <Title level={4} style={gray}>12 用户文档测试报告</Title>
                    <Col style={white}>
                        <Row>内容描述：语句是否通顺，是否准确描述用户的文档。</Row>
                        <br />
                        <Row>
                            检查结果：
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "通过",
                                        value: true,
                                    },
                                    {
                                        label: "不通过",
                                        value: false,
                                    },
                                ]}
                                onChange={({ target: { value } }) => {
                                    setPass((pre) => {
                                        pre[13] = value;
                                        const passCopy = pre.slice();
                                        return passCopy;
                                    });
                                }}
                                // value={pass[13]}
                                name={["conclusions", 13, "passed"]}
                            />
                        </Row>
                        <br />
                        <Row><ProFormText label="不通过原因" rules={[{ required: !pass[13], message: "这是必填项" }]} disabled={pass[13]} name={["conclusions", 13, "message"]} /></Row>
                    </Col>
                </ProForm>
            </div>
        </>
    )
}

export default JS010;