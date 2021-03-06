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
                    console.log("response=" + response);
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
                    console.log("response.data.status.stage" + response.data.status.stage)
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
                                        message.success("???????????????????????????");
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
                            setCurrentStep(11);
                            setShowStage(2);
                            cstage = 2;
                            cstep = 11;
                            sstage = 2;
                            break;
                        default:
                            break;
                    }


                } else if (response.status === 403) {
                    console.log("yes!403!");
                    setCurrentStage(2);
                    setCurrentStep(0);
                    setShowStage(2);
                    cstage = 2;
                    cstep = 0;
                    sstage = 2;
                    getTestStatus();
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 404 && testId !== "" && testId !== undefined) {
                    axios.post("/api/test?entrustId=" + entrustId)
                        .then((response) => {
                            if (response.status === 200) {
                                message.success("???????????????????????????");
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
                    cstage = 2;
                    cstep = 0;
                    sstage = 2;
                }
                else if (error.response.status === 403) {
                    console.log("yes!403!");
                    setCurrentStage(2);
                    setCurrentStep(0);
                    setShowStage(2);
                    cstage = 2;
                    cstep = 0;
                    sstage = 2;
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

    const onChecklistClick = () => {
        if (currentStage === 2 && currentStep > 0) {
            if (userRole === "CUSTOMER") {
                message.error("????????????????????????");
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
                    message.error("????????????????????????");
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
                    message.error("????????????????????????");
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
                    message.error("????????????????????????");
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
                    message.error("????????????????????????");
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
                    message.error("????????????????????????");
                }
                break;
            case 5:
                if (userRole === "MARKETER") {
                    if (currentStage === 0 && currentStep === 5) {
                        // window.location.href = "/entrustment/quotation/fill/" + entrustId;
                        history.push({
                            pathname: "/entrustment/quotation/fill",
                            query: {
                                entrustId: entrustId
                            }
                        })
                    }
                    else if ((currentStage === 0 && currentStep > 5) || currentStage > 0) {
                        history.push({
                            pathname: "/entrustment/quotation/display",
                            query: {
                                entrustId: entrustId
                            }
                        })
                    }
                } else {
                    message.error("????????????????????????");
                }
                break;
            case 6:
                if (userRole === "CUSTOMER") {
                    if (currentStage === 0 && currentStep === 6) {
                        // window.location.href = "/entrustment/quotation/fill/" + entrustId;
                        history.push({
                            pathname: "/entrustment/quotation/accept",
                            query: {
                                entrustId: entrustId
                            }
                        })
                    }
                    else if ((currentStage === 0 && currentStep > 6) || currentStage > 0) {
                        history.push({
                            pathname: "/entrustment/quotation/display",
                            query: {
                                entrustId: entrustId
                            }
                        })
                    }
                } else {
                    message.error("????????????????????????");
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
                                    message.success("?????????????????????");
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
                                    console.log("?????????????????????");
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
                                entrustId: entrustId
                            }
                        })
                    }
                } else {
                    message.error("????????????????????????");
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
                    } else if ((currentStage === 1 && currentStep > 1) || currentStage > 1) {
                        // window.location.href = "/contract/display/" + contractId;
                        history.push({
                            pathname: "/contract/display",
                            query: {
                                entrustId: entrustId
                            }
                        })
                    }
                } else {
                    message.error("????????????????????????");
                }
                break;
            case 2:
                if (userRole === "MARKETER") {
                    if (currentStage === 1 && currentStep === 2) {
                        // window.location.href = "/contract/verify/" + entrustId;
                        history.push({
                            pathname: "/contract/verify",
                            query: {
                                entrustId: entrustId
                            }
                        })
                    } else if ((currentStage === 1 && currentStep > 2) || currentStage > 1) {
                        // window.location.href = "/contract/display/" + contractId;
                        history.push({
                            pathname: "/contract/display",
                            query: {
                                entrustId: entrustId
                            }
                        });
                    }
                } else {
                    message.error("????????????????????????");
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
                    else if ((currentStage === 1 && currentStep > 3) || currentStage > 1) {
                        history.push({
                            pathname: "/contract/download",
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
                        message.error("????????????????????????");
                    }
                }
                // else if (currentStage === 2 && currentStep > 0) {
                //     if (userRole === "CUSTOMER") {
                //         message.error("????????????????????????");
                //     }
                //     else {
                //         console.log("bef wokc tid=" + testId);
                //         history.push({
                //             pathname: "/test/workcheck",
                //             query: {
                //                 testId: testId
                //             }
                //         })
                //     }
                // }
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
                }
                else if (userRole === "QA") {
                    if (currentStage === 2 && currentStep > 1) {
                        // window.location.href = "/contract/display/" + contractId;
                        history.push({
                            pathname: "/test/schemeview",
                            query: {
                                schemeId: schemeId
                            }
                        })
                    }
                }
                else {
                    message.error("????????????????????????");
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
                            pathname: "/download",
                            query: {
                                testId: testId
                            }
                        });
                    }
                } else {
                    message.error("????????????????????????");
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
                    message.error("????????????????????????");
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
                    else if (currentStage === 2 && currentStep > 4) {
                        history.push({
                            pathname: "/test/docview",
                            query: {
                                testId: testId
                            }
                        })

                    }
                }
                else if ((userRole === "QA") && currentStage === 2 && currentStep > 4) {
                    history.push({
                        pathname: "/test/docview",
                        query: {
                            testId: testId
                        }
                    })
                }
                else {
                    message.error("????????????????????????");
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
                    message.error("????????????????????????");
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
                    message.error("????????????????????????");
                }
                break;
            case 7:
                if (userRole === "MARKETER") {
                    if (currentStage === 2 && currentStep === 7) {
                        var temp;
                        temp = { "stage": "REPORT_WAIT_CUSTOMER", "message": "" }
                        axios.post("/api/test/" + testId + "/status", temp).then(response => {
                            console.log(response)
                            message.success("???????????????????????????")
                            setCurrentStage(2);
                            setCurrentStep(8);
                            setShowStage(2);
                        }).catch(error => {
                            console.log(error)
                            message.error("????????????????????????")
                        })
                    }
                } else {
                    message.error("????????????????????????");
                }
                break;
            case 8:
                if (userRole === "CUSTOMER") {
                    if (currentStage === 2 && currentStep === 8) {
                        history.push({
                            pathname: "/test/repover",
                            query: {
                                testId: testId
                            }
                        });
                    }
                    else if (currentStage === 2 && currentStep > 8) {
                        history.push({
                            pathname: "/download",
                            query: {
                                entrustId: entrustId,
                                testId: testId
                            }
                        });
                    }
                } else {
                    message.error("????????????????????????");
                }
                break;
            case 9:
                if (userRole === "QA") {
                    if (currentStage === 2 && currentStep === 9) {
                        history.push({
                            pathname: "/test/docver",
                            query: {
                                testId: testId
                            }
                        });
                    }
                } else {
                    message.error("????????????????????????");
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
                            <Step title="????????????" description="?????????????????????????????????" onClick={() => onEntrustmentClick(0)} />
                            <Step title="?????????????????????" description="?????????????????????????????????????????????" onClick={() => onEntrustmentClick(1)} />
                            <Step title="?????????????????????" description="????????????????????????????????????" onClick={() => onEntrustmentClick(2)} />
                            <Step title="?????????????????????" description="?????????????????????????????????????????????" onClick={() => onEntrustmentClick(3)} />
                            <Step title="?????????????????????" description="????????????????????????????????????" onClick={() => onEntrustmentClick(4)} />
                            <Step title="???????????????" description="???????????????????????????????????????" onClick={() => onEntrustmentClick(5)} />
                            <Step title="????????????" description="???????????????????????????" onClick={() => onEntrustmentClick(6)} />
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
                            <Step title="??????????????????" description="??????????????????????????????????????????" onClick={() => onContractClick(0)} />
                            <Step title="????????????" description="???????????????????????????" onClick={() => onContractClick(1)} />
                            <Step title="????????????" description="????????????????????????????????????" onClick={() => onContractClick(2)} />
                            <Step title="????????????" description="????????????????????????????????????" onClick={() => onContractClick(3)} />
                        </Steps>
                    </>
                )
            case 2:
                if (userRole === "CUSTOMER")
                    return (
                        <>
                            <Steps
                                style={{ paddingLeft: 70 }}
                                current={currentStage === 2 ? currentStep : 0}
                                status={currentStage === 2 ? "process" : "wait"}
                                direction="vertical"
                            >
                                <Step title="?????????????????????" description="????????????????????????????????????" onClick={() => onTestClick(0)} />
                                <Step title="??????????????????" description="??????????????????????????????????????????" onClick={() => onTestClick(1)} />
                                <Step title="??????????????????" description="??????????????????????????????????????????" onClick={() => onTestClick(2)} />
                                <Step title="???????????????" description="???????????????????????????????????????" onClick={() => onTestClick(3)} />
                                <Step title="???????????????????????????" description="???????????????????????????????????????????????????" onClick={() => onTestClick(4)} />
                                <Step title="??????????????????" description="??????????????????????????????????????????" onClick={() => onTestClick(5)} />
                                <Step title="???????????????" description="???????????????????????????????????????" onClick={() => onTestClick(6)} />
                                <Step title="????????????" description="????????????????????????????????????" onClick={() => onTestClick(7)} />
                                <Step title="????????????" description="???????????????????????????" onClick={() => onTestClick(8)} />
                                <Step title="??????????????????" description="??????????????????????????????????????????" onClick={() => onTestClick(9)} />
                                <Step title="???????????????" description="?????????????????????" />
                            </Steps>
                        </>
                    )
                else return (
                    <>
                        <Steps
                            style={{ paddingLeft: 70 }}
                            current={0}
                            status={currentStage === 2 ? (currentStep === 11 ? "finish" : "process") : "wait"}
                            direction="vertical">
                            <Step title="?????????????????????" description="?????????????????????????????????????????????????????????" onClick={() => onChecklistClick()} />
                        </Steps>
                        <Steps
                            style={{ paddingLeft: 70 }}
                            current={currentStage === 2 ? currentStep : 0}
                            status={currentStage === 2 ? "process" : "wait"}
                            direction="vertical"
                        >
                            <Step title="?????????????????????" description="????????????????????????????????????" onClick={() => onTestClick(0)} />
                            <Step title="??????????????????" description="??????????????????????????????????????????" onClick={() => onTestClick(1)} />
                            <Step title="??????????????????" description="??????????????????????????????????????????" onClick={() => onTestClick(2)} />
                            <Step title="???????????????" description="???????????????????????????????????????" onClick={() => onTestClick(3)} />
                            <Step title="???????????????????????????" description="???????????????????????????????????????????????????" onClick={() => onTestClick(4)} />
                            <Step title="??????????????????" description="??????????????????????????????????????????" onClick={() => onTestClick(5)} />
                            <Step title="???????????????" description="???????????????????????????????????????" onClick={() => onTestClick(6)} />
                            <Step title="????????????" description="????????????????????????????????????" onClick={() => onTestClick(7)} />
                            <Step title="????????????" description="???????????????????????????" onClick={() => onTestClick(8)} />
                            <Step title="??????????????????" description="??????????????????????????????????????????" onClick={() => onTestClick(9)} />
                            <Step title="???????????????" description="?????????????????????" />
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
                <Step title="????????????" description="??????????????????????????????" />
                <Step title="????????????" description="??????????????????????????????" />
                <Step title="????????????" description="??????????????????????????????" />
            </Steps>
            <Divider />
            {renderSteps()}
        </>
    );
}

export default Progress;