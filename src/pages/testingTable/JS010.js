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
                        console.log("rrid=" + reportReviewId)
                        axios.post("/api/review/report/" + reportReviewId, values)
                            .then((response) => {
                                if (response.status === 200) {
                                    message.success("???????????????");
                                    axios.post("/api/test/" + testId + "/status", newStage)
                                        .then((response) => {
                                            console.log(response);
                                            message.success("???????????????????????????");
                                            history.goBack();
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                            message.error("???????????????????????????");
                                        })
                                } else {
                                    message.error("???????????????");
                                    console.log("Unknown error!");
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                                message.error("???????????????");
                            });
                    }}
                    request={async () => {
                        return axios.get("/api/test/" + testId)
                            .then((project) => {
                                console.log(project.data)
                                reportReviewId = project.data.projectFormIds.testReportCecklistId
                                console.log("get rrid=" + reportReviewId)
                                return {};
                            })
                            .catch((error) => {
                                console.log(error);
                                return {}
                            });
                    }
                    }
                >
                    <Title level={3} style={gray}>?????????????????????</Title>
                    <Col style={white}>
                        <Row><ProFormText width="md" required rules={[{ required: true, message: "???????????????" }]} name={"softwareName"} label="????????????" /></Row>
                        <Row><ProFormText width="md" required rules={[{ required: true, message: "???????????????" }]} name={"principal"} label="????????????" /></Row>
                    </Col>
                    <Title level={4} style={gray}>1 ????????????</Title>
                    <Col style={white}>
                        <Row>????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</Row>
                        <br />
                        <Row>
                            ???????????????
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "??????",
                                        value: true,
                                    },
                                    {
                                        label: "?????????",
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
                        <Row><ProFormText label="???????????????" rules={[{ required: !pass[0], message: "???????????????" }]} disabled={pass[0]} name={["conclusions", 0, "message"]} /></Row>
                    </Col>
                    <Title level={4} style={gray}>2 ??????</Title>
                    <Col style={white}>
                        <Row>???????????????????????????????????????????????????????????????????????????????????????</Row>
                        <br />
                        <Row>
                            ???????????????
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "??????",
                                        value: true,
                                    },
                                    {
                                        label: "?????????",
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
                        <Row><ProFormText label="???????????????" rules={[{ required: !pass[1], message: "???????????????" }]} disabled={pass[1]} name={["conclusions", 1, "message"]} /></Row>
                    </Col>
                    <Title level={4} style={gray}>3 ????????????</Title>
                    <Col style={white}>
                        <Row>?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</Row>
                        <br />
                        <Row>
                            ???????????????
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "??????",
                                        value: true,
                                    },
                                    {
                                        label: "?????????",
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
                        <Row><ProFormText label="???????????????" rules={[{ required: !pass[2], message: "???????????????" }]} disabled={pass[2]} name={["conclusions", 2, "message"]} /></Row>
                    </Col>
                    <Title level={4} style={gray}>4 ?????????</Title>
                    <Col style={white}>
                        <Row>?????????????????????????????????????????????????????????????????????????????????????????????????????????</Row>
                        <br />
                        <Row>
                            ???????????????
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "??????",
                                        value: true,
                                    },
                                    {
                                        label: "?????????",
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
                        <Row><ProFormText label="???????????????" rules={[{ required: !pass[3], message: "???????????????" }]} disabled={pass[3]} name={["conclusions", 3, "message"]} /></Row>
                    </Col>
                    <Title level={4} style={gray}>5 ????????????</Title>
                    <Col style={white}>
                        <Row>?????????????????????????????????????????????????????????????????????????????????????????????????????????</Row>
                        <br />
                        <Row>
                            ???????????????
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "??????",
                                        value: true,
                                    },
                                    {
                                        label: "?????????",
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
                        <Row><ProFormText label="???????????????" rules={[{ required: !pass[4], message: "???????????????" }]} disabled={pass[4]} name={["conclusions", 4, "message"]} /></Row>
                    </Col>
                    <Title level={4} style={gray}>6 ????????????</Title>
                    <Col style={white}>
                        <Row>?????????????????????????????????????????????????????????????????????</Row>
                        <br />
                        <Row>
                            ???????????????
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "??????",
                                        value: true,
                                    },
                                    {
                                        label: "?????????",
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
                        <Row><ProFormText label="???????????????" rules={[{ required: !pass[5], message: "???????????????" }]} disabled={pass[5]} name={["conclusions", 5, "message"]} /></Row>
                    </Col>
                    <Title level={4} style={gray}>7 ??????????????????</Title>
                    <Col style={white}>
                        <Row>?????????????????????????????????????????????????????????????????????</Row>
                        <br />
                        <Row>
                            ???????????????
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "??????",
                                        value: true,
                                    },
                                    {
                                        label: "?????????",
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
                        <Row><ProFormText label="???????????????" rules={[{ required: !pass[6], message: "???????????????" }]} disabled={pass[6]} name={["conclusions", 6, "message"]} /></Row>
                    </Col>
                    <Title level={4} style={gray}>8 ??????</Title>
                    <Col style={white}>
                        <Row>????????????????????????????????????????????????????????????????????????</Row>
                        <br />
                        <Row>
                            ???????????????
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "??????",
                                        value: true,
                                    },
                                    {
                                        label: "?????????",
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
                        <Row><ProFormText label="???????????????" rules={[{ required: !pass[7], message: "???????????????" }]} disabled={pass[7]} name={["conclusions", 7, "message"]} /></Row>
                    </Col>
                    <Title level={4} style={gray}>9 ????????????</Title>
                    <Col style={white}>
                        <Row>???????????????????????????????????????????????????????????????</Row>
                        <br />
                        <Row>
                            ???????????????
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "??????",
                                        value: true,
                                    },
                                    {
                                        label: "?????????",
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
                        <Row><ProFormText label="???????????????" rules={[{ required: !pass[8], message: "???????????????" }]} disabled={pass[8]} name={["conclusions", 8, "message"]} /></Row>
                    </Col>
                    <Title level={4} style={gray}>10 ??????????????????</Title>
                    <Col style={white}>
                        <Row>???????????????????????????????????????????????????????????????????????????????????????</Row>
                        <br />
                        <Row>
                            ???????????????
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "??????",
                                        value: true,
                                    },
                                    {
                                        label: "?????????",
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
                        <Row><ProFormText label="???????????????" rules={[{ required: !pass[9], message: "???????????????" }]} disabled={pass[9]} name={["conclusions", 9, "message"]} /></Row>
                    </Col>
                    <Title level={4} style={gray}>11 ????????????????????????</Title>
                    <Title level={5} style={gray}>11.1 ?????????</Title>
                    <Col style={white}>
                        <Row>????????????????????????????????????????????????</Row>
                        <br />
                        <Row>
                            ???????????????
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "??????",
                                        value: true,
                                    },
                                    {
                                        label: "?????????",
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
                        <Row><ProFormText label="???????????????" rules={[{ required: !pass[10], message: "???????????????" }]} disabled={pass[10]} name={["conclusions", 10, "message"]} /></Row>
                    </Col>
                    <Title level={5} style={gray}>11.2 ??????</Title>
                    <Col style={white}>
                        <Row>???????????????????????????????????????????????????????????????????????????????????????????????????</Row>
                        <br />
                        <Row>
                            ???????????????
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "??????",
                                        value: true,
                                    },
                                    {
                                        label: "?????????",
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
                        <Row><ProFormText label="???????????????" rules={[{ required: !pass[11], message: "???????????????" }]} disabled={pass[11]} name={["conclusions", 11, "message"]} /></Row>
                    </Col>
                    <Title level={5} style={gray}>11.3 ??????</Title>
                    <Col style={white}>
                        <Row>???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????2?????????</Row>
                        <br />
                        <Row>
                            ???????????????
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "??????",
                                        value: true,
                                    },
                                    {
                                        label: "?????????",
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
                        <Row><ProFormText label="???????????????" rules={[{ required: !pass[12], message: "???????????????" }]} disabled={pass[12]} name={["conclusions", 12, "message"]} /></Row>
                    </Col>
                    <Title level={4} style={gray}>12 ????????????????????????</Title>
                    <Col style={white}>
                        <Row>????????????????????????????????????????????????????????????????????????</Row>
                        <br />
                        <Row>
                            ???????????????
                            <ProFormRadio.Group
                                options={[
                                    {
                                        label: "??????",
                                        value: true,
                                    },
                                    {
                                        label: "?????????",
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
                        <Row><ProFormText label="???????????????" rules={[{ required: !pass[13], message: "???????????????" }]} disabled={pass[13]} name={["conclusions", 13, "message"]} /></Row>
                    </Col>
                </ProForm>
            </div>
        </>
    )
}

export default JS010;