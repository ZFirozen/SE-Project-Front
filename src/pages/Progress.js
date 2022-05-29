import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { Divider, Steps, Button } from "antd";
import localStorage from "localStorage";
import axios from "axios";

axios.defaults.withCredentials = true;

const { Step } = Steps;

const Progress = ( props ) => {
    const entrustmentId = props.match.params.id;
    console.log(entrustmentId);
    // const entrustmentId = useLocation().pathname.match('(?<=/progress/).+').at(0)
    const [currentStage, setCurrentStage] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [currentStatus, setCurrentStatus] = useState(true);
    const [showStage, setShowStage] = useState(0);
    const userRole = localStorage.getItem("userRole");

    const getStatus = () => {
        axios.get("/api/entrust/" + entrustmentId)
            .then((response) => {
                if (response.status === 200) {
                    switch (response.data.status.stage) {
                        case "WAIT_FOR_MARKETER":
                            setCurrentStage(0);
                            setCurrentStep(1);
                            break;
                        case "MARKETER_AUDITING":
                            setCurrentStage(0);
                            setCurrentStep(2);
                            break;
                        case "MARKETER_DENIED":
                            setCurrentStage(0);
                            setCurrentStep(2);
                            break;
                        case "WAIT_FOR_TESTER":
                            setCurrentStage(0);
                            setCurrentStep(3);
                            break;
                        case "TESTER_AUDITING":
                            setCurrentStage(0);
                            setCurrentStep(4);
                            break;
                        case "TESTER_DENIED":
                            setCurrentStage(0);
                            setCurrentStep(4);
                            setCurrentStatus(false);
                            break;
                        case "AUDITING_PASSED":
                            setCurrentStage(1);
                            setCurrentStep(0);
                            break;
                        case "CUSTOMER_CHECK_QUOTE":
                            setCurrentStage(1);
                            setCurrentStep(1);
                            break;
                        case "CUSTOMER_DENY_QUOTE":
                            setCurrentStage(1);
                            setCurrentStep(1);
                            setCurrentStatus(false);
                            break;
                        case "CUSTOMER_ACCEPT_QUOTE":
                            setCurrentStage(1);
                            setCurrentStep(2);
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

    const onStageChange = (value) => {
        console.log("onChange: ", value);
        setShowStage(value);
    }

    const onEntrustmentClick = (value) => {
        console.log("onEntrustmentClick: " + value);
        console.log(userRole);
        switch (value) {
            case 0:
                if (userRole === "CUSTOMER") {
                    window.location.href = "/entrustment/fill";
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 1:
                if (userRole === "MARKETING_SUPERVISOR") {
                    window.location.href = "/assign/"+entrustmentId;
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 2:
                if (userRole === "MARKETER") {
                    window.location.href = "/entrustment/verify";
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 3:
                if (userRole === "TESTING_SUPERVISOR") {
                    window.location.href = "/assign/"+entrustmentId;
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 4:
                if (userRole === "TESTER") {

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
                    window.location.href = "/entrustment/contract/fill/"+ entrustmentId;
                    console.log(userRole + " " + value);
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 1:
                if (userRole === "CUSTOMER") {
                    window.location.href = "/entrustment/contract/fill/"+ entrustmentId;
                    console.log(userRole + " " + value);
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 2:
                if (userRole === "MARKETER") {
                    console.log(userRole + " " + value);
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 3:
                if (userRole === "CUSTOMER") {
                    console.log(userRole + " " + value);
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 4:
                if (userRole === "MARKETER") {
                    console.log(userRole + " " + value);
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 5:
                if (userRole === "MARKETER") {
                    console.log(userRole + " " + value);
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
                            current={currentStage === 0 ? currentStep : 4}
                            status={currentStage === 0 ? "process" : "finish"}
                            // onChange={onStepChange}
                            direction="vertical"
                        >
                            <Step title="填写委托" description="点此填写合同" onClick={() => onEntrustmentClick(0)} />
                            <Step title="市场部分配人员" description="点此分配市场部人员" onClick={() => onEntrustmentClick(1)} />
                            <Step title="市场部审核委托" description="点此审核委托" onClick={() => onEntrustmentClick(2)} />
                            <Step title="测试部分配人员" description="点此分配测试部人员" onClick={() => onEntrustmentClick(3)} />
                            <Step title="测试部审核委托" description="点此审核委托" onClick={() => onEntrustmentClick(4)} />
                        </Steps>
                    </>
                )
            case 1:
                return (
                    <>
                        <Steps
                            style={{ paddingLeft: 70 }}
                            current={currentStage === 1 ? currentStep : (currentStage < 1 ? 0 : 5)}
                            status={currentStage === 1 ? "process" : (currentStage < 1 ? "wait" : "finish")}
                            // onChange={onStepChange}
                            direction="vertical"
                        >
                            <Step title="生成报价表" description="点此生成报价表" onClick={() => onContractClick(0)} />
                            <Step title="确定报价" description="点此确定报价" onClick={() => onContractClick(1)} />
                            <Step title="生成基本合同" description="点此生成基本合同" onClick={() => onContractClick(2)} />
                            <Step title="合同填写" description="点此填写合同" onClick={() => onContractClick(3)} />
                            <Step title="合同评审" description="点此评审合同" onClick={() => onContractClick(4)} />
                            <Step title="合同归档" description="点此归档合同" onClick={() => onContractClick(5)} />
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
                            // onChange={onStepChange}
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
            {getStatus()}
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