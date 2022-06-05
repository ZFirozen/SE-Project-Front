import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Divider, Steps, Button } from "antd";
import localStorage from "localStorage";
import axios from "axios";

axios.defaults.withCredentials = true;

const { Step } = Steps;

var contractId = "";

const Progress = (props) => {
    const entrustmentId = props.match.params.id;
    // const [marketerId, setMarketerId] = useState("");
    // const [customerId, setCustomerId] = useState("");
    // console.log(entrustmentId);
    // const entrustmentId = useLocation().pathname.match("(?<=/progress/).+").at(0)
    const [currentStage, setCurrentStage] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [currentStatus, setCurrentStatus] = useState(true);
    const [showStage, setShowStage] = useState(0);
    const userRole = localStorage.getItem("userRole");

    const getEntrustmentStatus = () => {
        axios.get("/api/entrust/" + entrustmentId)
            .then((response) => {
                if (response.status === 200) {
                    contractId = response.data.contractId
                    switch (response.data.status.stage) {
                        case "WAIT_FOR_MARKETER":
                            setCurrentStage(0);
                            setCurrentStep(1);
                            setShowStage(0);
                            break;
                        case "MARKETER_AUDITING":
                            setCurrentStage(0);
                            setCurrentStep(2);
                            setShowStage(0);
                            break;
                        case "MARKETER_DENIED":
                            setCurrentStage(0);
                            setCurrentStep(0);
                            setShowStage(0);
                            break;
                        case "WAIT_FOR_TESTER":
                            setCurrentStage(0);
                            setCurrentStep(3);
                            setShowStage(0);
                            break;
                        case "TESTER_AUDITING":
                            setCurrentStage(0);
                            setCurrentStep(4);
                            setShowStage(0);
                            break;
                        case "TESTER_DENIED":
                            setCurrentStage(0);
                            setCurrentStep(0);
                            setCurrentStatus(false);
                            setShowStage(0);
                            break;
                        case "AUDITING_PASSED":
                            setCurrentStage(0);
                            setCurrentStep(5);
                            setShowStage(0);
                            break;
                        case "CUSTOMER_CHECK_QUOTE":
                            setCurrentStage(0);
                            setCurrentStep(6);
                            setShowStage(0);
                            break;
                        case "CUSTOMER_DENY_QUOTE":
                            setCurrentStage(0);
                            setCurrentStep(5);
                            setCurrentStatus(false);
                            setShowStage(0);
                            break;
                        case "CUSTOMER_ACCEPT_QUOTE":
                            setCurrentStage(1);
                            setCurrentStep(0);
                            setShowStage(1);
                            getContractStatus();
                            break;
                        case "TERMINATED":
                            setCurrentStatus(false);
                            break;
                        default:
                            break;
                    }


                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getContractStatus = () => {
        axios.get("/api/contract/" + contractId)
            .then((response) => {
                if (response.status === 200) {
                    console.log(contractId)
                    switch (response.data.status.stage) {
                        case "FILL_CONTRACT":
                            setCurrentStage(1);
                            setCurrentStep(0);
                            setShowStage(1);
                            break;
                        case "CUSTOMER_CHECKING":
                            setCurrentStage(1);
                            setCurrentStep(1);
                            setShowStage(1);
                            break;
                        case "CUSTOMER_DENY":
                            setCurrentStage(1);
                            setCurrentStep(0);
                            setCurrentStatus(false);
                            setShowStage(1);
                            break;
                        case "CUSTOMER_ACCEPT":
                            setCurrentStage(1);
                            setCurrentStep(1);
                            setShowStage(1);
                            break;
                        case "MARKETER_CHECKING":
                            setCurrentStage(1);
                            setCurrentStep(2);
                            setShowStage(1);
                            break;
                        case "MARKETER_DENY":
                            setCurrentStage(1);
                            setCurrentStep(1);
                            setCurrentStatus(false);
                            setShowStage(1);
                            break;
                        case "MARKETER_ACCEPT":
                            setCurrentStage(1);
                            setCurrentStep(3);
                            setShowStage(1);
                            break;
                        case "COPY_SAVED":
                            setCurrentStage(2);
                            setCurrentStep(0);
                            setShowStage(2);
                            break;
                        default:
                            break;
                    }


                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getEntrustmentStatus();
    }, [])

    const onStageChange = (value) => {
        console.log("onStageChange: ", value);
        setShowStage(value);
    }

    const onEntrustmentClick = (value) => {
        console.log("onEntrustmentClick: " + value);
        console.log(userRole);
        switch (value) {
            case 0:
                if (userRole === "CUSTOMER") {
                    if (currentStage === 0 && currentStep === 0) {
                        window.location.href = "/entrustment/fill/" + entrustmentId;
                    } else {
                        window.location.href = "/entrustment/display/" + entrustmentId;
                    }
                } else if (userRole === "MARKETER" || userRole === "TESTER") {
                    window.location.href = "/entrustment/display/" + entrustmentId;
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 1:
                if (userRole === "MARKETING_SUPERVISOR") {
                    window.location.href = "/assign/" + entrustmentId;
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 2:
                if (userRole === "MARKETER") {
                    if (currentStage === 0 && currentStep === 2) {
                        window.location.href = "/entrustment/verify/" + entrustmentId;
                    } else {
                        window.location.href = "/entrustment/display/" + entrustmentId;
                    }
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 3:
                if (userRole === "TESTING_SUPERVISOR") {
                    window.location.href = "/assign/" + entrustmentId;
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 4:
                if (userRole === "TESTER") {
                    if (currentStage === 0 && currentStep === 4) {
                        window.location.href = "/entrustment/documentVerify/" + entrustmentId;
                    }
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 5:
                if (userRole === "MARKETER") {
                    window.location.href = "/entrustment/quotation/fill/" + entrustmentId;
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 6:
                if (userRole === "CUSTOMER") {
                    window.location.href = "/entrustment/quotation/fill/" + entrustmentId;
                } else {
                    alert("您没有权限访问！");
                }
                break;
            default:
                break;
        }
    }

    const onContractClick = (value) => {
        console.log("onContractClick: " + value);
        console.log(userRole);
        switch (value) {
            case 0:
                if (userRole === "MARKETER") {
                    if (currentStage === 1 && currentStep === 0) {
                        axios.post("/api/contract?entrustId=" + entrustmentId)
                            .then((response) => {
                                if (response.status === 200) {
                                    alert("合同创建成功！");
                                    // setContractId(response.data.contractId);
                                    // setMarketerId(response.data.marketerId);
                                    // setCustomerId(response.data.customerId);
                                    console.log("create contract success");
                                } else {
                                    console.log("Unknown error!");
                                }
                            })
                            .catch((error) => {
                                if (error.response.status === 400) {
                                    console.log("重复创建合同！");
                                } else {
                                    console.log("Unknown error!");
                                }
                            }).finally(() => {
                                window.location.href = "/contract/fill/" + entrustmentId;
                            });

                    } else {
                        window.location.href = "/contract/display/" + contractId;
                    }
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 1:
                if (userRole === "CUSTOMER") {
                    if (currentStage === 1 && currentStep === 1) {
                        window.location.href = "/contract/fill/" + entrustmentId;
                    } else {
                        window.location.href = "/contract/display/" + contractId;
                    }
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 2:
                if (userRole === "MARKETER") {
                    if (currentStage === 1 && currentStep === 2) {
                        window.location.href = "/contract/verify/" + entrustmentId;
                    } else {
                        window.location.href = "/contract/display/" + contractId;
                    }
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 3:
                if (userRole === "MARKETER") {
                    if (currentStage === 1 && currentStep === 3) {
                        window.location.href = "/contract/upload/" + contractId+"/"+entrustmentId;
                    }
                } else {
                    alert("您没有权限访问！");
                }
                break;
            default:
                break;
        }
    }

    const renderSteps = () => {
        switch (showStage) {
            case 0:
                return (
                    <>
                        <Steps
                            style={{ paddingLeft: 70 }}
                            current={currentStage === 0 ? currentStep : 6}
                            status={currentStage === 0 ? "process" : "finish"}
                            direction="vertical"
                        >
                            <Step title="填写委托" description="客户：点此查看委托详情" onClick={() => onEntrustmentClick(0)} />
                            <Step title="市场部分配人员" description="市场部主管：点此分配市场部人员" onClick={() => onEntrustmentClick(1)} />
                            <Step title="市场部审核委托" description="市场部人员：点此审核委托" onClick={() => onEntrustmentClick(2)} />
                            <Step title="测试部分配人员" description="测试部主管：点此分配测试部人员" onClick={() => onEntrustmentClick(3)} />
                            <Step title="测试部审核委托" description="测试部人员：点此审核委托" onClick={() => onEntrustmentClick(4)} />
                            <Step title="填写报价表" description="市场部人员：点此填写报价表" onClick={() => onEntrustmentClick(5)} />
                            <Step title="确定报价" description="客户：点此确定报价" onClick={() => onEntrustmentClick(6)} />
                        </Steps>
                    </>
                )
            case 1:
                return (
                    <>
                        <Steps
                            style={{ paddingLeft: 70 }}
                            current={currentStage === 1 ? currentStep : (currentStage < 1 ? 0 : 3)}
                            status={currentStage === 1 ? "process" : (currentStage < 1 ? "wait" : "finish")}
                            direction="vertical"
                        >
                            <Step title="生成基本合同" description="市场部人员：点此生成基本合同" onClick={() => onContractClick(0)} />
                            <Step title="合同填写" description="客户：点此填写合同" onClick={() => onContractClick(1)} />
                            <Step title="合同评审" description="市场部人员：点此评审合同" onClick={() => onContractClick(2)} />
                            <Step title="合同归档" description="市场部人员：点此归档合同" onClick={() => onContractClick(3)} />
                        </Steps>
                    </>
                )
            case 2:
                return (
                    <>
                        <Steps
                            style={{ paddingLeft: 70 }}
                            current={currentStage === 2 ? currentStep : 0}
                            status={currentStage === 2 ? "process" : "wait"}
                            direction="vertical"
                        >
                            <Step title="填写测试方案" description="点此填写测试方案" />
                            <Step title="审核测试方案" description="点此审核测试方案" />
                            <Step title="进行测试" description="点此进行测试" />
                            <Step title="生成测试报告及文档" description="点此生成测试报告及文档" />
                            <Step title="审核相关文档" description="点此审核相关文档" />
                            <Step title="发放报告" description="点此发放报告" />
                            <Step title="确认报告" description="点此确认报告" />
                        </Steps>
                    </>
                )
            default:
                break
        }
    }

    return (
        <>
            <Steps
                style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20 }}
                progressDot current={showStage}
                onChange={onStageChange}
                direction="horizontal"
            >
                <Step title="委托阶段" description="点此处理委托相关事宜" />
                <Step title="合同阶段" description="点此处理合同相关事宜" />
                <Step title="测试阶段" description="点此处理测试相关事宜" />
            </Steps>
            <Divider />
            {renderSteps()}
        </>
    );
}

export default Progress;