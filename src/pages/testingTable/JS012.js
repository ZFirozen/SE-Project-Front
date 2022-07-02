import 'antd/dist/antd.css';
import React, { useEffect, useRef, useState } from "react"
import { Button, Card, Cascader, Col, Descriptions, Form, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect, InputNumber, DatePicker } from 'antd';
import { ProForm, ProFormText, FormComponents, ProFormCascader, ProFormSelect, ProFormDateRangePicker, ProFormGroup, ProFormCheckbox, ProFormRadio, ProFormTextArea, ProFormDatePicker, ProFormTreeSelect } from "@ant-design/pro-form";
import moment from "moment";
import { history, useLocation } from "umi";
import axios from 'axios';
import localStorage from "localStorage";
import { EditableProTable } from "@ant-design/pro-table";


const whitecolor = '#ffffff'
const graycolor = '#f1f1f1'
const userRole = localStorage.getItem("userRole");
const rowbegingap = 20
const formitemheight = 62
const { Title, Paragraph } = Typography
// 将引入类变成常量，用来继承
const Component = React.Component
const Fragment = React.Fragment
const gray = { paddingLeft: rowbegingap, backgroundColor: graycolor, height: "100%", paddingTop: 11, paddingBottom: 11, width: "100%", columnGap: 32 }
const white = { paddingLeft: rowbegingap, backgroundColor: whitecolor, height: "100%", paddingTop: 11, paddingBottom: 11, width: "100%", columnGap: 32 }
var entrustTestReviewId
const JS012 = () => {
    const location = useLocation();
    const testId = location.query.testId;
    console.log(location.query.testId)
    console.log(testId)
    const [editableKeys, setEditableRowKeys] = useState([]);
    return (
        <>
            <div style={{ margin: 70 }}>
                <ProForm
                    size="large"
                    style={{ font: "initial", border: "3px solid" }}
                    // submitter={{
                    //   render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
                    // }}
                    layout="horizontal"
                    scrollToFirstError="true"
                    onFinish={async (values) => {
                        values.id = entrustTestReviewId
                        values.projectId = testId
                        console.log(values)
                        axios.post("/api/review/entrustTest/" + entrustTestReviewId, values)
                            .then((response) => {
                                if (response.status === 200) {
                                    alert("提交成功！");
                                    // window.location.href = "/progress/" + this.state.entrustId;
                                    history.goBack();
                                } else {
                                    alert("提交失败！");
                                    console.log("Unknown error!");
                                }
                            })
                            .catch((error) => {
                                if (error.response.status === 400) {
                                    alert("提交失败！");
                                } else {
                                    alert("提交失败！");
                                    console.log("Unknown error!");
                                }
                            });
                    }}
                    request={async () => {
                        console.log(testId)
                        if (typeof testId !== "undefined") {
                            return axios.get("/api/test/" + testId)
                                .then((project) => {
                                    console.log(project.data)
                                    console.log(123)
                                    entrustTestReviewId = project.data.projectFormIds.workChecklistId
                                    return project.data;
                                }).then((projectdata) => {
                                    return axios.get("/api/review/entrustTest/" + projectdata.projectFormIds.workChecklistId)
                                        .then((response) => {
                                            console.log(response.data)
                                            return response.data;
                                        }).catch((error) => {
                                            console.log(error);
                                            return {}
                                        });
                                })
                                .catch((error) => {
                                    console.log(error);
                                    return {}
                                });
                        }
                        else {
                            return {}
                        }
                    }}
                >
                    <Title level={3}>软件项目委托测试工作检查表</Title>
                    <Row style={gray}>
                        <ProFormText required rules={[{ required: true, message: "这是必填项" }]} name={"softwareName"} label="软件名称" />
                        <ProFormText required rules={[{ required: true, message: "这是必填项" }]} name={"version"} label="版本号" />
                        <ProFormText required rules={[{ required: true, message: "这是必填项" }]} name={"principal"} label="申报单位" />
                    </Row>
                    <Row style={white}>
                        <ProFormDatePicker required rules={[{ required: true, message: "这是必填项" }]} name={"startDate"} label="起始时间" />
                   </Row>
                    <Row style={gray}>
                        <ProFormDatePicker required rules={[{ required: true, message: "这是必填项" }]} name={"expectFinishDate"} label="预计完成时间" />
                    </Row>
                    <Row style={white}>
                        <ProFormDatePicker required rules={[{ required: true, message: "这是必填项" }]} name={"finishDate"} label="实际完成时间" />
                    </Row>
                    <Row style={gray}>
                        <ProFormText label="主测人" required rules={[{ required: true, message: "这是必填项" }]} name={"mainTester"} />
                    </Row>
                    <Title level={3}>一、前期指导工作</Title>
                    <Title level={4}>1.接受委托单位委托测试申请</Title>
                    <Row style={white}>
                        1.为委托单位提供详尽的有关软件项目委托测试的相关法律法规、优惠政策、业务办理流程等事项
                        <ProFormText label="确认" name={["conclusions", 0]} />
                    </Row>
                    <Row style={gray}>
                        2.建议委托单位阅读《软件项目委托测试流程图和工作介绍》，了解申报流程
                        <ProFormText label="确认" name={["conclusions", 1]} />
                    </Row>
                    <Row style={white}>
                        3.根据《软件项目委托测试提交材料》，指导委托单位提交申报资料
                        <ProFormText label="确认" name={["conclusions", 2]} />
                    </Row>
                    <Title level={4}>2.填写《软件项目委托测试申请表》、《委托测试软件功能列表》，按《软件项目委托测试提交材料》提交材料</Title>
                    <Row style={gray}>
                        1.确保委托方应填内容正确、完备；纸质材料已盖公章
                        <ProFormText label="确认" name={["conclusions", 3]} />
                    </Row>
                    <Row style={white}>
                        2.明确委托方按《软件项目委托测试提交材料》提交材料
                        <ProFormText label="确认" name={["conclusions", 4]} />
                    </Row>
                    <Title level={4}>3.签订《软件项目委托测试合同》、《软件项目委托测试保密协议》</Title>
                    <Row style={gray}>
                        1.合同及保密协议内容、数量符合要求
                        <ProFormText label="确认" name={["conclusions", 5]} />
                    </Row>
                    <Row style={white}>
                        2.合同编号方式符合要求
                        <ProFormText label="确认" name={["conclusions", 6]} />
                    </Row>
                    <Title level={3}>二、对委托测试软件的可测状态进行评估</Title>
                    <Title level={4}>4.对委托测试软件的可测状态进行评估</Title>
                    <Row style={gray}>
                        1.实验室在收到委托单位的有关资料后，即成立测试项目小组，该项目小组的任务是消化用户提供的有关资料，对委托软件的可测状态进行评估，若委托软件未达到可测状态，则向委托方提出改进建议，直到委托软件达到可测状态为止。项目小组的任务包括负责编制测试方案，搭建测试环境，执行测试过程，记录测试结果，编制测试报告，提交测试报告，将有关资料归档等。
                        <ProFormText label="确认" name={["conclusions", 7]} />
                    </Row>
                    <Title level={3}>三、实施测试</Title>
                    <Title level={4}>5.编制测试方案</Title>
                    <Row style={white}>
                        1.测试方案必须经实验室质量负责人审核，技术负责人批准方能生效。
                        <ProFormText label="确认" name={["conclusions", 8]} />
                    </Row>
                    <Row style={gray}>
                        2.委托测试软件介绍：简要介绍委托测试软件的功能特点、应用行业及技术特性等。
                        <ProFormText label="确认" name={["conclusions", 9]} />
                    </Row>
                    <Row style={white}>
                        3.软件功能：以委托单位提供的功能列表为依据，以表格形式列出所有功能项目，并对功能列表的各功能项目按照层次关系进行编号，以便于标识。
                        <ProFormText label="确认" name={["conclusions", 10]} />
                    </Row>
                    <Row style={gray}>
                        4.资源需求：资源需求要列出人员需求和软硬件设备需求。人员需求要列出人员名单、职称及所承担的角色（项目组长或成员）；软硬件设备需求要根据委托测试软件要求的运行环境及实验室的设备情况，列出硬件设备的名称、型号、配置、机身编号、用途，软件的名称、版本号、用途等。
                        <ProFormText label="确认" name={["conclusions", 11]} />
                    </Row>
                    <Row style={white}>
                        5.参考文档：列出编制本方案所参考的标准、规范及用户文档等的名称、作者、类型、版本/标识号。
                        <ProFormText label="确认" name={["conclusions", 12]} />
                    </Row>
                    <Title level={4}>6.搭建测试环境</Title>
                    <Row style={gray}>
                        1.实验室按照委托方提供的委托测试软件运行环境搭建测试环境
                        <ProFormText label="确认" name={["conclusions", 13]} />
                    </Row>
                    <Title level={4}>7.实施测试</Title>
                    <Row style={white}>
                        1.测试过程主要以测试方案为依据，按照用户手册所述的操作方法运行软件，考察软件是否具有用户手册所描述的操作界面，对功能列表的主要功能逐项进行符合性测试并作记录，对未测的次要功能或细节部分，应作出说明。
                        <ProFormText label="确认" name={["conclusions", 14]} />
                    </Row>
                    <Row style={gray}>
                        2.对文档的测试：要从完整性、正确性、一致性、易理解性、易浏览性和外观质量六个方面，对用户文档进行评审。
                        <ProFormText label="确认" name={["conclusions", 15]} />
                    </Row>
                    <Row style={white}>
                        3.对测试过程观察到的结果进行如实记录，对发现的问题整理成问题清单；
                        <ProFormText label="确认" name={["conclusions", 16]} />
                    </Row>
                    <Title level={4}>8.编制测试报告</Title>
                    <Row style={gray}>
                        1.根据《软件项目委托测试报告编制作业指导书》和测试结果编制测试报告。
                        <ProFormText label="确认" name={["conclusions", 17]} />
                    </Row>
                    <Row style={white}>
                        2.检查测试报告，并填写《报告检查表》。
                        <ProFormText label="确认" name={["conclusions", 18]} />
                    </Row>
                    <Row style={gray}>
                        3.测试报告的编码请参阅《测试报告编码规则》
                        <ProFormText label="确认" name={["conclusions", 19]} />
                    </Row>
                    <Row style={white}>
                        4.报告审查：在分发报告前，应按实验室质量管理程序对报告进行严格审查。
                        <ProFormText label="确认" name={["conclusions", 20]} />
                    </Row>
                    <Title level={4}>9.评测资料归档</Title>
                    <Row style={gray}>
                        1.委托测试的软件产品及测试相关文件、原始记录等能够随时复现测试过程所需的材料，也同测试报告一并交由实验室资料室的材料管理员归档，以作为日后对测试结果产生异议时进行复核或仲裁的依据。上述材料由实验室保存三年后，委托方可凭样品接收单取回或由实验室进行销毁。
                        <ProFormText label="确认" name={["conclusions", 21]} />
                    </Row>
                    <Row style={white}>
                        2.归档资料同时填写《软件项目委托测试资料清单》，打印《软件委托测试资料标签》并编号号码，贴于档案盒制定位置。
                        <ProFormText label="确认" name={["conclusions", 22]} />
                    </Row>
                    <Row style={gray}>
                        3.该检查表与本次软件委托测试归档资料一同归档，与《软件项目委托测试资料目录》、《软件项目委托测试试资料清单》一起，作为软件委托测试测试工作的检查、资料查询的主要依据。
                        <ProFormText label="确认" name={["conclusions", 23]} />
                    </Row>
                    <Title level={4}>10.附件目录</Title>
                    <Row style={white}>
                        1、《软件项目委托测试工作流程》<br />
                        2、《需提供的书面文档》<br />
                        3、《软件项目委托测试报告编制作业指导书》<br />
                        4、《报告检查表》<br />
                        5、《测试报告编码规则》<br />
                        6、《软件委托测试资料清单》<br />
                        7、《软件委托测试资料标签》<br />
                        8、《软件委托测试资料目录》
                    </Row>
                </ProForm>
            </div>
        </>
    );
}
export default JS012;
