import React, { useEffect, useMemo, useState } from "react";
import { Divider, Steps, Button, Card, Cascader, Col, Descriptions, Input, message, Row, Select, Space, Spin, Typography, Checkbox, TreeSelect, DatePicker } from 'antd';
import localStorage from "localStorage";
import axios from "axios";
import { history, useLocation } from "umi";

axios.defaults.withCredentials = true;

const { Step } = Steps;

var contractId = "";
var testId = "";
var schemeId = "";
var schemeReviewId = "";
var reportReviewId = "";

const Progress = () => {
    const location = useLocation();
    const entrustId = location.query.entrustId;
    console.log("location.query.testId=" + location.query.testId)
    testId = location.query.testId === undefined ? testId : location.query.testId;
    const [currentStage, setCurrentStage] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [showStage, setShowStage] = useState(0);
    const userRole = localStorage.getItem("userRole");
    var cstage = -1, cstep = -1, sstage = -1;
    const getEntrustmentStatus = () => {
        console.log('ini testid=' + testId)
        if (testId !== null && testId !== undefined && testId !== "") {
            cstage = 2;
            cstep = 0;
            sstage = 2;
            getTestStatus();
        }
        axios.get("/api/entrust/" + entrustId)
            .then((response) => {
                if (response.status === 200) {
                    console.log("response="+response);
                    console.log(response);
                    contractId = response.data.contractId
                    testId = response.data.projectId
                    console.log('ent testid=' + testId)
                    if (testId !== null && testId !== undefined && testId !== "") {
                        cstage = 2;
                        cstep = 0;
                        sstage = 2;
                        getTestStatus();
                    }
                    console.log("response.data.status.stage"+response.data.status.stage)
                    switch (response.data.status.stage) {
                        case "WAIT_FOR_MARKETER":
                            setCurrentStage(0);
                            setCurrentStep(1);
                            setShowStage(0);
                            cstage = 0;
                            cstep = 1;
                            sstage = 0;
                            break;
                        case "MARKETER_AUDITING":
                            setCurrentStage(0);
                            setCurrentStep(2);
                            setShowStage(0);
                            cstage = 0;
                            cstep = 2;
                            sstage = 0;
                            break;
                        case "MARKETER_DENIED":
                            setCurrentStage(0);
                            setCurrentStep(0);
                            setShowStage(0);
                            cstage = 0;
                            cstep = 0;
                            sstage = 0;
                            break;
                        case "WAIT_FOR_TESTER":
                            setCurrentStage(0);
                            setCurrentStep(3);
                            setShowStage(0);
                            cstage = 0;
                            cstep = 3;
                            sstage = 0;
                            break;
                        case "TESTER_AUDITING":
                            setCurrentStage(0);
                            setCurrentStep(4);
                            setShowStage(0);
                            cstage = 0;
                            cstep = 4;
                            sstage = 0;
                            break;
                        case "TESTER_DENIED":
                            setCurrentStage(0);
                            setCurrentStep(0);
                            setShowStage(0);
                            cstage = 0;
                            cstep = 0;
                            sstage = 0;
                            break;
                        case "AUDITING_PASSED":
                            setCurrentStage(0);
                            setCurrentStep(5);
                            setShowStage(0);
                            cstage = 0;
                            cstep = 5;
                            sstage = 0;
                            break;
                        case "CUSTOMER_CHECK_QUOTE":
                            setCurrentStage(0);
                            setCurrentStep(6);
                            setShowStage(0);
                            cstage = 0;
                            cstep = 6;
                            sstage = 0;
                            break;
                        case "CUSTOMER_DENY_QUOTE":
                            setCurrentStage(0);
                            setCurrentStep(5);
                            setShowStage(0);
                            cstage = 0;
                            cstep = 5;
                            sstage = 0;
                            break;
                        case "CUSTOMER_ACCEPT_QUOTE":
                            cstage = 1;
                            cstep = 0;
                            sstage = 1;
                            getContractStatus();
                            break;
                        case "TERMINATED":
                            cstage = 0;
                            cstep = 0;
                            sstage = 0;
                            break;
                        default:
                            break;
                    }


                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                if (cstage !== -1) {
                    setCurrentStage(cstage);
                    setCurrentStep(cstep);
                    setShowStage(sstage);
                }
            });
    }

    const getContractStatus = () => {
        axios.get("/api/contract/" + contractId)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    console.log(contractId)
                    console.log(response.data.status.stage)
                    switch (response.data.status.stage) {
                        case "FILL_CONTRACT":
                            setCurrentStage(1);
                            setCurrentStep(0);
                            setShowStage(1);
                            cstage = 1;
                            cstep = 0;
                            sstage = 1;
                            break;
                        case "CUSTOMER_CHECKING":
                            setCurrentStage(1);
                            setCurrentStep(1);
                            setShowStage(1);
                            cstage = 1;
                            cstep = 1;
                            sstage = 1;
                            break;
                        case "CUSTOMER_DENY":
                            setCurrentStage(1);
                            setCurrentStep(0);
                            setShowStage(1);
                            cstage = 1;
                            cstep = 0;
                            sstage = 1;
                            break;
                        case "CUSTOMER_ACCEPT":
                            setCurrentStage(1);
                            setCurrentStep(1);
                            setShowStage(1);
                            cstage = 1;
                            cstep = 1;
                            sstage = 1;
                            break;
                        case "MARKETER_CHECKING":
                            setCurrentStage(1);
                            setCurrentStep(2);
                            setShowStage(1);
                            cstage = 1;
                            cstep = 2;
                            sstage = 1;
                            break;
                        case "MARKETER_DENY":
                            setCurrentStage(1);
                            setCurrentStep(1);
                            setShowStage(1);
                            cstage = 1;
                            cstep = 1;
                            sstage = 1;
                            break;
                        case "MARKETER_ACCEPT":
                            setCurrentStage(1);
                            setCurrentStep(3);
                            setShowStage(1);
                            cstage = 1;
                            cstep = 3;
                            sstage = 1;
                            axios.post("/api/test?entrustId=" + entrustId)
                                .then((response) => {
                                    if (response.status === 200) {
                                        alert("测试项目创建成功！");
                                        console.log("create test success");
                                    } else {
                                        console.log("Unknown error!");
                                    }
                                })
                                .catch((error) => {
                                    if (error.response.status === 400) {
                                        console.log(error);
                                    } else {
                                        console.log("Unknown error!");
                                    }
                                }).finally((response) => {
                                    console.log(response);
                                });
                            break;
                        case "COPY_SAVED":
                            cstage = 2;
                            cstep = 0;
                            sstage = 2;
                            getTestStatus();
                            break;
                        default:
                            break;
                    }


                }
                else if (response.status === 403) {
                    console.log("yes!403!");
                    cstage = 2;
                    cstep = 0;
                    sstage = 2;
                    getTestStatus();
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 403) {
                    console.log("yes!403!");
                    cstage = 2;
                    cstep = 0;
                    sstage = 2;
                    getTestStatus();
                }
            })
    }

    const getTestStatus = () => {
        console.log("bef get tid=" + testId)
        axios.get("/api/test/" + testId)
            .then((response) => {
                if (response.status === 200) {
                    console.log("tid=" + testId)
                    testId = testId
                    schemeId = response.data.projectFormIds.testSchemeId
                    schemeReviewId = response.data.projectFormIds.testSchemeChecklistId
                    reportReviewId = response.data.projectFormIds.testReportCecklistId
                    console.log("tschid=" + response.data.projectFormIds.testSchemeId)
                    console.log("twcid=" + response.data.projectFormIds.workChecklistId)
                    console.log("tschcheckid=" + response.data.projectFormIds.testSchemeChecklistId)
                    console.log(response.data.status.stage)
                    switch (response.data.status.stage) {
                        case "WAIT_FOR_QA":
                            setCurrentStage(2);
                            setCurrentStep(0);
                            setShowStage(2);
                            cstage = 2;
                            cstep = 0;
                            sstage = 2;
                            break;
                        case "SCHEME_UNFILLED":
                            setCurrentStage(2);
                            setCurrentStep(1);
                            setShowStage(2);
                            cstage = 2;
                            cstep = 1;
                            sstage = 2;
                            break;
                        case "SCHEME_AUDITING":
                            setCurrentStage(2);
                            setCurrentStep(2);
                            setShowStage(2);
                            cstage = 2;
                            cstep = 2;
                            sstage = 2;
                            break;
                        case "SCHEME_AUDITING_DENIED":
                            setCurrentStage(2);
                            setCurrentStep(1);
                            setShowStage(2);
                            cstage = 2;
                            cstep = 1;
                            sstage = 2;
                            break;
                        case "SCHEME_AUDITING_PASSED":
                            setCurrentStage(2);
                            setCurrentStep(3);
                            setShowStage(2);
                            cstage = 2;
                            cstep = 3;
                            sstage = 2;
                            break;
                        case "SCHEME_REVIEW_UPLOADED":
                            setCurrentStage(2);
                            setCurrentStep(4);
                            setShowStage(2);
                            cstage = 2;
                            cstep = 4;
                            sstage = 2;
                            break;
                        case "REPORT_AUDITING":
                            setCurrentStage(2);
                            setCurrentStep(5);
                            setShowStage(2);
                            cstage = 2;
                            cstep = 5;
                            sstage = 2;
                            break;
                        case "REPORT_QA_DENIED":
                            setCurrentStage(2);
                            setCurrentStep(4);
                            setShowStage(2);
                            cstage = 2;
                            cstep = 4;
                            sstage = 2;
                            break;
                        case "REPORT_QA_PASSED":
                            setCurrentStage(2);
                            setCurrentStep(6);
                            setShowStage(2);
                            cstage = 2;
                            cstep = 6;
                            sstage = 2;
                            break;
                        case "REPORT_WAIT_SENT_TO_CUSTOMER":
                            setCurrentStage(2);
                            setCurrentStep(7);
                            setShowStage(2);
                            cstage = 2;
                            cstep = 7;
                            sstage = 2;
                            break;
                        case "REPORT_WAIT_CUSTOMER":
                            setCurrentStage(2);
                            setCurrentStep(8);
                            setShowStage(2);
                            cstage = 2;
                            cstep = 8;
                            sstage = 2;
                            break;
                        case "REPORT_CUSTOMER_CONFIRM":
                            setCurrentStage(2);
                            setCurrentStep(9);
                            setShowStage(2);
                            cstage = 2;
                            cstep = 9;
                            sstage = 2;
                            break;
                        case "REPORT_CUSTOMER_REJECT":
                            setCurrentStage(2);
                            setCurrentStep(4);
                            setShowStage(2);
                            cstage = 2;
                            cstep = 4;
                            sstage = 2;
                            break;
                        case "QA_ALL_REJECTED":
                            setCurrentStage(2);
                            setCurrentStep(4);
                            setShowStage(2);
                            cstage = 2;
                            cstep = 4;
                            sstage = 2;
                            break;
                        case "QA_ALL_PASSED":
                            setCurrentStage(2);
                            setCurrentStep(10);
                            setShowStage(2);
                            cstage = 2;
                            cstep = 10;
                            sstage = 2;
                            break;
                        default:
                            break;
                    }


                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 404 && testId !== "" && testId !== undefined) {
                    axios.post("/api/test?entrustId=" + entrustId)
                        .then((response) => {
                            if (response.status === 200) {
                                alert("测试项目创建成功！");
                                console.log("create test success");
                            } else {
                                console.log("Unknown error!");
                            }
                        })
                        .catch((error) => {
                            if (error.response.status === 400) {
                                console.log(error);
                            } else {
                                console.log("Unknown error!");
                            }
                        }).finally((response) => {
                            console.log(response);
                        });
                }
                else if (error.response.status === 400 && testId !== "" && testId !== undefined) {
                    console.log("error400");
                    setCurrentStage(2);
                    setCurrentStep(0);
                    setShowStage(2);
                    cstage=2;
                    cstep=0;
                    sstage=2;
                }
            })
    }

    useMemo(() => {
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
                        // window.location.href = "/entrustment/fill/" + entrustId;
                        history.push({
                            pathname: "/entrustment/fill",
                            query: {
                                entrustId: entrustId
                            }
                        })
                    } else if (currentStage >= 0 && currentStep > 0) {
                        // window.location.href = "/entrustment/display/" + entrustId;
                        history.push({
                            pathname: "/entrustment/display",
                            query: {
                                entrustId: entrustId
                            }
                        })
                    }
                } else if (userRole === "MARKETER" || userRole === "TESTER") {
                    // window.location.href = "/entrustment/display/" + entrustId;
                    history.push({
                        pathname: "/entrustment/display",
                        query: {
                            entrustId: entrustId
                        }
                    })
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 1:
                if (userRole === "MARKETING_SUPERVISOR") {
                    // window.location.href = "/assign/" + entrustId;
                    history.push({
                        pathname: "/entrustment/assign",
                        query: {
                            entrustId: entrustId
                        }
                    })
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 2:
                if (userRole === "MARKETER") {
                    if (currentStage === 0 && currentStep === 2) {
                        // window.location.href = "/entrustment/verify/" + entrustId;
                        history.push({
                            pathname: "/entrustment/verify",
                            query: {
                                entrustId: entrustId
                            }
                        })
                    } else if (currentStage >= 0 && currentStep > 2) {
                        // window.location.href = "/entrustment/display/" + entrustId;
                        history.push({
                            pathname: "/entrustment/display",
                            query: {
                                entrustId: entrustId
                            }
                        })
                    }
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 3:
                if (userRole === "TESTING_SUPERVISOR") {
                    // window.location.href = "/assign/" + entrustId;
                    history.push({
                        pathname: "/entrustment/assign",
                        query: {
                            entrustId: entrustId
                        }
                    })
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 4:
                if (userRole === "TESTER") {
                    if (currentStage === 0 && currentStep === 4) {
                        // window.location.href = "/entrustment/documentVerify/" + entrustId;
                        history.push({
                            pathname: "/entrustment/documentVerify",
                            query: {
                                entrustId: entrustId
                            }
                        })
                    }
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 5:
                if (userRole === "MARKETER") {
                    // window.location.href = "/entrustment/quotation/fill/" + entrustId;
                    history.push({
                        pathname: "/entrustment/quotation/fill",
                        query: {
                            entrustId: entrustId
                        }
                    })
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 6:
                if (userRole === "CUSTOMER") {
                    // window.location.href = "/entrustment/quotation/fill/" + entrustId;
                    history.push({
                        pathname: "/entrustment/quotation/fill",
                        query: {
                            entrustId: entrustId
                        }
                    })
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
                        axios.post("/api/contract?entrustId=" + entrustId)
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
                                // window.location.href = "/contract/fill/" + entrustId;
                                history.push({
                                    pathname: "/contract/fill",
                                    query: {
                                        entrustId: entrustId
                                    }
                                })
                            });

                    } else {
                        // window.location.href = "/contract/display/" + contractId;
                        history.push({
                            pathname: "/contract/display",
                            query: {
                                contractId: contractId
                            }
                        })
                    }
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 1:
                if (userRole === "CUSTOMER") {
                    if (currentStage === 1 && currentStep === 1) {
                        // window.location.href = "/contract/fill/" + entrustId;
                        history.push({
                            pathname: "/contract/fill",
                            query: {
                                entrustId: entrustId
                            }
                        })
                    } else if (currentStage >= 1 && currentStep > 1) {
                        // window.location.href = "/contract/display/" + contractId;
                        history.push({
                            pathname: "/contract/display",
                            query: {
                                entrustId: entrustId
                            }
                        })
                    }
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 2:
                if (userRole === "MARKETER") {
                    if (currentStage === 1 && currentStep === 2) {
                        // window.location.href = "/contract/verify/" + entrustId;
                        history.push({
                            pathname: "/contract/verify",
                            query: {
                                contractId: contractId
                            }
                        })
                    } else if (currentStage >= 1 && currentStep > 2) {
                        // window.location.href = "/contract/display/" + contractId;
                        history.push({
                            pathname: "/contract/display",
                            query: {
                                contractId: contractId
                            }
                        });
                    }
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 3:
                if (userRole === "MARKETER") {
                    if (currentStage === 1 && currentStep === 3) {
                        history.push({
                            pathname: "/contract/upload",
                            query: {
                                contractId: contractId
                            }
                        })
                    }
                }
                break;
            default:
                break;
        }
    }

    const onTestClick = (value) => {
        console.log("onTestClick: " + value);
        console.log(userRole);
        switch (value) {
            case 0:
                if (currentStage === 2 && currentStep === 0) {
                    if (userRole === "QA_SUPERVISOR") {
                        history.push({
                            pathname: "/test/assign",
                            query: {
                                testId: testId
                            }
                        })
                    } else {
                        alert("您没有权限访问！");
                    }
                }
                else if (currentStage === 2 && currentStep > 0) {
                    if (userRole === "CUSTOMER") {
                        alert("您没有权限访问！");
                    }
                    else {
                        console.log("bef wokc tid=" + testId);
                        history.push({
                            pathname: "/test/workcheck",
                            query: {
                                testId: testId
                            }
                        })
                    }
                }
                break;
            case 1:
                if (userRole === "TESTER") {
                    if (currentStage === 2 && currentStep === 1) {
                        // window.location.href = "/contract/fill/" + entrustId;
                        history.push({
                            pathname: "/test/scheme",
                            query: {
                                schemeId: schemeId,
                                projectId: testId
                            }
                        })
                    } else if (currentStage === 2 && currentStep > 1) {
                        // window.location.href = "/contract/display/" + contractId;
                        history.push({
                            pathname: "/test/schemeview",
                            query: {
                                schemeId: schemeId
                            }
                        })
                    }
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 2:
                if (userRole === "QA") {
                    if (currentStage === 2 && currentStep === 2) {
                        // window.location.href = "/contract/verify/" + entrustId;
                        history.push({
                            pathname: "/test/verify",
                            query: {
                                testId: testId
                            }
                        })
                    } else if (currentStage === 2 && currentStep > 2) {
                        // window.location.href = "/contract/display/" + contractId;
                        history.push({
                            pathname: "/test/",
                            query: {
                                testId: testId
                            }
                        });
                    }
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 3:
                if (userRole === "QA") {
                    if (currentStage === 2 && currentStep === 3) {
                        history.push({
                            pathname: "/test/svupload",
                            query: {
                                schemeReviewId: schemeReviewId,
                                testId: testId
                            }
                        });
                    }
                    else if (currentStage === 2 && currentStep > 3) {
                        history.push({
                            pathname: "/test/svdownload",
                            query: {
                                schemeReviewId: schemeReviewId
                            }
                        });
                    }
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 4:
                if (userRole === "TESTER") {
                    if (currentStage === 2 && currentStep === 4) {
                        history.push({
                            pathname: "/test/documents",
                            query: {
                                testId: testId
                            }
                        });
                    }
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 5:
                if (userRole === "QA") {
                    if (currentStage === 2 && currentStep === 5) {
                        history.push({
                            pathname: "/test/reportcheck",
                            query: {
                                testId: testId
                            }
                        });
                    }
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 6:
                if (userRole === "QA") {
                    if (currentStage === 2 && currentStep === 6) {
                        history.push({
                            pathname: "/test/rvupload",
                            query: {
                                reportReviewId: reportReviewId,
                                testId: testId
                            }
                        });
                    }
                    else if (currentStage === 2 && currentStep > 6) {
                        history.push({
                            pathname: "/test/rvdownload",
                            query: {
                                reportReviewId: reportReviewId
                            }
                        });
                    }
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 7:
                if (userRole === "MARKETER") {
                    if (currentStage === 2 && currentStep === 7) {
                        var temp;
                        temp = { "stage": "REPORT_WAIT_CUSTOMER", "message": "" }
                        axios.post("/api/test/" + testId + "/status", temp).then(response => {
                            console.log(response)
                            message.success("成功签发报告给客户")
                            setCurrentStage(2);
                            setCurrentStep(8);
                            setShowStage(2);
                        }).catch(error => {
                            console.log(error)
                            message.error("提交失败，请重试")
                        })
                    }
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 8:
                if (userRole === "CUSTOMER") {
                    if (currentStage === 2 && currentStep === 8) {
                        history.push({
                            pathname: "/test/",
                            query: {
                                testId: testId
                            }
                        });
                    }
                } else {
                    alert("您没有权限访问！");
                }
                break;
            case 9:
                if (userRole === "QA") {
                    if (currentStage === 2 && currentStep === 9) {
                        history.push({
                            pathname: "/test/",
                            query: {
                                testId: testId
                            }
                        });
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
                            <Step title="质量部分配人员" description="等待质量部主管分配人员" onClick={() => onTestClick(0)} />
                            <Step title="填写测试方案" description="点此填写测试方案" onClick={() => onTestClick(1)} />
                            <Step title="审核测试方案" description="点此审核测试方案" onClick={() => onTestClick(2)} />
                            <Step title="上传评审表" description="点此上传评审表" onClick={() => onTestClick(3)} />
                            <Step title="填写测试报告及文档" description="点此填写测试报告及文档" onClick={() => onTestClick(4)} />
                            <Step title="审核测试报告" description="点此审核测试报告" onClick={() => onTestClick(5)} />
                            <Step title="上传检查表" description="点此上传检查表" onClick={() => onTestClick(6)} />
                            <Step title="发放报告" description="点此发放报告" onClick={() => onTestClick(7)} />
                            <Step title="确认报告" description="点此确认报告" onClick={() => onTestClick(8)} />
                            <Step title="审核测试文档" description="点此审核测试文档" onClick={() => onTestClick(9)} />
                            <Step title="项目已完成" description="项目已全部完成" />
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