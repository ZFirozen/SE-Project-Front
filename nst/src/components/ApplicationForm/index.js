import React, { useState } from "react";
import './index.css'
var _ = require('lodash');

const testIndex = [["功能性", "可靠性", "易用性", "效率", "可维护性", "可移植性"],
["代码覆盖度", "缺陷检测率", "代码风格符合度", "代码不符合项检测率"],
["产品说明要求", "用户文档集要求"]]

export default function ApplicationForm() {

    const [formData, setFormData] = useState({})
    // console.log(formData)

    const handleTestTypeCheckBox = (type, value) => {
        setFormData(prev => {
            const newFormData = _.cloneDeep(prev)
            if (!newFormData.hasOwnProperty("测试类型")) {
                newFormData["测试类型"] = {}
            }
            newFormData["测试类型"][type] = value
            return newFormData
        })
    }

    const handleChange = (type, value) => {
        setFormData(prev => {
            const newFormData = _.cloneDeep(prev)
            newFormData[type] = value
            return newFormData
        })
    }

    const handleCompanyTypeRadio = (e) => {
        setFormData(prev => {
            const newFormData = _.cloneDeep(prev)
            newFormData["单位性质"] = e.target.value
            return newFormData
        })
    }

    const handleTestDependency = (type, value) => {
        setFormData(prev => {
            const newFormData = _.cloneDeep(prev)
            if (!newFormData.hasOwnProperty("测试依据")) {
                newFormData["测试依据"] = {}
            }
            newFormData["测试依据"][type] = value
            return newFormData
        })
    }

    const handleTestIndex = (type, value) => {
        setFormData(prev => {
            const newFormData = _.cloneDeep(prev)
            if (!newFormData.hasOwnProperty("需要测试的技术指标")) {
                newFormData["需要测试的技术指标"] = {}
            }
            newFormData["需要测试的技术指标"][type] = value
            return newFormData
        })
    }

    const handleSubmit = () => {
        fetch("http://localhost:3000/JS002", {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if(res.status===201){
                    alert("提交成功！")
                }
                return res.json()
            })
            .then(data => {
                console.log(data)
            })
    }
    return (
        <div className="application-form">
            <h1>软件项目委托测试申请书</h1>
            <div className="application-form-container">
                <p>请用<b>√</b>选择：&#9898;--单选；&#9723;--多选  </p>
                {/* <div className="application-form-main">
                    <div className="row">
                        <div className="flex span-2 cell">测试类型</div>
                        <div className="flex span-8">
                            <div className="col-row">
                                <div>软件确认测试</div>
                                <div>其他</div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div>
                    <div style={{
                        height: "80px",
                    }}>
                        <div className="horizon-vertical-center"
                            style={{ float: "left", height: "100%", width: "20%", border: '1px solid black' }}>
                            测试类型</div>
                        <div
                            className="vertical-center"
                            style={{ float: "left", height: "50%", width: "80%", border: '1px solid black', paddingLeft: '30px' }}>
                            <div>
                                <input type="checkbox" id="软件确认测试"
                                    onChange={(e) => {
                                        handleTestTypeCheckBox("软件确认测试", e.target.checked)
                                    }}
                                />
                                <label style={{ marginRight: "30px" }} for="软件确认测试">软件确认测试</label>
                                <input type="checkbox" id="测试类型其他"
                                    onChange={(e) => {
                                        handleTestTypeCheckBox("其他", e.target.checked)
                                    }}
                                />
                                <label style={{ marginRight: "10px" }} for="其他">其他</label>
                                <input type="text" style={{ border: 'none', borderBottom: '1px solid black' }}
                                    disabled={!formData.hasOwnProperty("测试类型") ? true : formData["测试类型"]["其他"] ? false : true}
                                    onChange={(e) => {
                                        handleTestTypeCheckBox("其他", e.target.value)
                                    }}
                                ></input>
                            </div>
                        </div>
                        <div
                            className="vertical-center"
                            style={{ float: "left", height: "50%", width: "80%", border: '1px solid black', paddingLeft: '30px' }}>
                            <input type="checkbox" id="成果/技术鉴定测试"
                                onChange={(e) => {
                                    handleTestTypeCheckBox("成果/技术鉴定测试", e.target.checked)
                                }}
                            />
                            <label style={{ marginRight: "30px" }} for="成果/技术鉴定测试">成果/技术鉴定测试</label>

                            <input type="checkbox" id="专项资金验收测试"
                                onChange={(e) => {
                                    handleTestTypeCheckBox("专项资金验收测试", e.target.checked)
                                }}
                            />
                            <label style={{ marginRight: "30px" }} for="专项资金验收测试">专项资金验收测试</label>
                        </div>
                    </div>

                    <div style={{
                        height: "60px",
                    }}>
                        <div className="horizon-vertical-center"
                            style={{ float: "left", height: "100%", width: "20%", border: '1px solid black' }}>
                            软件名称</div>
                        <div
                            className="horizon-vertical-center"
                            style={{ float: "left", height: "100%", width: "50%", border: '1px solid black' }}>
                            <input type="text" id="软件名称" style={{ width: '97%', height: '70%', border: 'none', borderBottom: '1px solid black', fontSize: '20px' }}
                                onChange={(e) => {
                                    setFormData(prev => {
                                        return {
                                            ...prev,
                                            "软件名称": e.target.value
                                        }
                                    })
                                }}
                            />
                        </div>

                        <div className="horizon-vertical-center"
                            style={{ float: "left", height: "100%", width: "12%", border: '1px solid black' }}>
                            版本号</div>
                        <div
                            className="horizon-vertical-center"
                            style={{ float: "left", height: "100%", width: "18%", border: '1px solid black' }}>
                            <input type="text" id="版本号" style={{ width: '95%', height: '70%', border: 'none', borderBottom: '1px solid black', fontSize: '20px' }}
                                onChange={(e) => {
                                    setFormData(prev => {
                                        return {
                                            ...prev,
                                            "版本号": e.target.value
                                        }
                                    })
                                }}
                            />
                        </div>
                    </div>

                    <div style={{
                        height: "60px",
                    }}>
                        <div className="horizon-vertical-center"
                            style={{ float: "left", height: "100%", width: "20%", border: '1px solid black' }}>
                            委托单位<br />(中文)</div>
                        <div
                            className="horizon-vertical-center"
                            style={{ float: "left", height: "100%", width: "80%", border: '1px solid black' }}>
                            <input type="text" id="委托单位(中文)" style={{ width: '97%', height: '70%', border: 'none', borderBottom: '1px solid black', fontSize: '20px' }}
                                onChange={(e) => {
                                    handleChange("委托单位(中文)", e.target.value)
                                }}
                            />
                        </div>
                    </div>

                    <div style={{
                        height: "60px",
                    }}>
                        <div className="horizon-vertical-center"
                            style={{ float: "left", height: "100%", width: "20%", border: '1px solid black' }}>
                            委托单位<br />(英文)</div>
                        <div
                            className="horizon-vertical-center"
                            style={{ float: "left", height: "100%", width: "80%", border: '1px solid black' }}>
                            <input type="text" id="委托单位(英文)" style={{ width: '97%', height: '70%', border: 'none', borderBottom: '1px solid black', fontSize: '20px' }}
                                onChange={(e) => {
                                    handleChange("委托单位(英文)", e.target.value)
                                }}
                            />
                        </div>
                    </div>

                    <div style={{
                        height: "60px",
                    }}>
                        <div className="horizon-vertical-center"
                            style={{ float: "left", height: "100%", width: "20%", border: '1px solid black' }}>
                            开发单位</div>
                        <div
                            className="horizon-vertical-center"
                            style={{ float: "left", height: "100%", width: "80%", border: '1px solid black' }}>
                            <input type="text" id="开发单位" style={{ width: '97%', height: '70%', border: 'none', borderBottom: '1px solid black', fontSize: '20px' }}
                                onChange={(e) => {
                                    handleChange("开发单位", e.target.value)
                                }}
                            />
                        </div>
                    </div>

                    <div style={{
                        height: "60px",
                    }}>
                        <div className="horizon-vertical-center"
                            style={{ float: "left", height: "100%", width: "20%", border: '1px solid black' }}>
                            单位性质</div>
                        <div
                            className="horizon-vertical-center"
                            style={{ float: "left", height: "100%", width: "80%", border: '1px solid black' }}>
                            <input type="radio" id="内资企业" name="单位性质" value="内资企业" onChange={handleCompanyTypeRadio} />
                            <label for="内资企业" style={{ marginRight: '30px' }}>内资企业</label>

                            <input type="radio" id="外(合)资企业" name="单位性质" value="外(合)资企业" onChange={handleCompanyTypeRadio} />
                            <label for="外(合)资企业" style={{ marginRight: '30px' }}>外(合)资企业</label>

                            <input type="radio" id="港澳台(合)资企业" name="单位性质" value="港澳台(合)资企业" onChange={handleCompanyTypeRadio} />
                            <label for="港澳台(合)资企业" style={{ marginRight: '30px' }}>港澳台(合)资企业</label>

                            <input type="radio" id="科研院校" name="单位性质" value="科研院校" onChange={handleCompanyTypeRadio} />
                            <label for="科研院校" style={{ marginRight: '30px' }}>科研院校</label>

                            <input type="radio" id="政府事业团体" name="单位性质" value="政府事业团体" onChange={handleCompanyTypeRadio} />
                            <label for="政府事业团体" style={{ marginRight: '30px' }}>政府事业团体</label>

                            <input type="radio" id="其他" name="单位性质" value="其他" onChange={handleCompanyTypeRadio} />
                            <label for="其他" style={{ marginRight: '30px' }}>其他</label>
                        </div>
                    </div>

                    <div style={{
                        height: "100px",
                    }}>
                        <div
                            className="vertical-center"
                            style={{ height: "50%", width: "100%", border: '1px solid black', borderBottom: 'none', paddingLeft: '20px' }}>
                            软件用户对象描述</div>
                        <div
                            className="horizon-vertical-center"
                            style={{ height: "50%", width: "100%", border: '1px solid black', borderTop: 'none' }}>
                            <input type="text" id="软件用户对象描述" style={{ width: '97%', height: '70%', border: 'none', borderBottom: '1px solid black', fontSize: '20px' }}
                                onChange={(e) => {
                                    handleChange("软件用户对象描述", e.target.value)
                                }}
                            />
                        </div>
                    </div>

                    <div style={{
                        height: "300px",
                    }}>
                        <div
                            className="vertical-center"
                            style={{ height: "20%", width: "100%", border: '1px solid black', borderBottom: 'none', paddingLeft: '20px' }}>
                            主要功能及用途简介(限300字)</div>
                        <div
                            className="horizon-vertical-center"
                            style={{ height: "80%", width: "100%", border: '1px solid black', borderTop: 'none' }}>
                            <textarea id="主要功能及用途简介" style={{ width: '97%', height: '90%', border: 'none', borderBottom: '1px solid black', fontSize: '20px', resize: 'none' }}
                                onChange={(e) => {
                                    handleChange("主要功能及用途简介", e.target.value)
                                }}
                            />
                        </div>
                    </div>

                    <div style={{
                        height: "200px",
                    }}>
                        <div
                            className="vertical-center"
                            style={{ height: "25%", width: "100%", border: '1px solid black', borderBottom: 'none', paddingLeft: '20px' }}>
                            测试依据</div>
                        <div
                            style={{ height: "25%", width: "100%", border: '1px solid black', borderTop: 'none', borderBottom: "none", paddingLeft: '50px' }}>
                            <input type="checkbox" id="GB/T 25000.51-2010"
                                onChange={(e) => {
                                    handleTestDependency("GB/T 25000.51-2010", e.target.checked)
                                }}
                            />
                            <label style={{ marginRight: "150px" }} for="GB/T 25000.51-2010">GB/T 25000.51-2010</label>

                            <input type="checkbox" id="GB/T 16260.1-2006"
                                onChange={(e) => {
                                    handleTestDependency("GB/T 16260.1-2006", e.target.checked)
                                }}
                            />
                            <label style={{ marginRight: "10px" }} for="GB/T 16260.1-2006">GB/T 16260.1-2006</label>

                        </div>
                        <div
                            style={{ height: "25%", width: "100%", border: '1px solid black', borderTop: 'none', borderBottom: "none", paddingLeft: '50px' }}>
                            <input type="checkbox" id="NST-03-WI12-2011"
                                onChange={(e) => {
                                    handleTestDependency("NST-03-WI12-2011", e.target.checked)
                                }}
                            />
                            <label style={{ marginRight: "150px" }} for="NST-03-WI12-2011">NST-03-WI12-2011</label>

                            <input type="checkbox" id="NST-03-WI13-2011"
                                onChange={(e) => {
                                    handleTestDependency("NST-03-WI13-2011", e.target.checked)
                                }}
                            />
                            <label style={{ marginRight: "10px" }} for="NST-03-WI13-2011">NST-03-WI13-2011</label>

                        </div>

                        <div
                            style={{ height: "25%", width: "100%", border: '1px solid black', borderTop: 'none', paddingLeft: '50px' }}>
                            <input type="checkbox" id="测试依据其他"
                                onChange={(e) => {
                                    handleTestDependency("其他", e.target.checked)
                                }}
                            />
                            <label style={{ marginRight: "10px" }} for="测试依据其他">其他</label>
                            <input type="text" style={{ border: 'none', borderBottom: '1px solid black' }}
                                disabled={!formData.hasOwnProperty("测试依据") ? true : formData["测试依据"]["其他"] ? false : true}
                                onChange={(e) => {
                                    handleTestDependency("其他", e.target.value)
                                }}
                            ></input>
                        </div>
                    </div>

                    <div style={{
                        height: "300px",
                    }}>
                        <div
                            className="vertical-center"
                            style={{ height: "20%", width: "100%", border: '1px solid black', borderBottom: 'none', paddingLeft: '20px' }}>
                            需要测试的技术指标
                        </div>
                        {testIndex.map(ti => {
                            return (
                                <div
                                    style={{ height: "20%", width: "100%", border: '1px solid black', borderTop: 'none', borderBottom: "none", paddingLeft: "10%" }}>
                                    {ti.map(v => {
                                        return (
                                            <>
                                                <input type="checkbox" id={v}
                                                    onChange={(e) => {
                                                        handleTestIndex(v, e.target.checked)
                                                    }}
                                                />
                                                <label style={{ marginRight: "50px" }} for={v}>{v}</label>
                                            </>
                                        )
                                    })}
                                </div>
                            )
                        })}
                        <div
                            style={{ height: "20%", width: "100%", border: '1px solid black', borderTop: 'none', paddingLeft: '10%' }}>
                            <input type="checkbox" id="需要测试的技术指标其他"
                                onChange={(e) => {
                                    handleTestIndex("其他", e.target.checked)
                                }}
                            />
                            <label style={{ marginRight: "10px" }} for="需要测试的技术指标其他">其他</label>
                            <input type="text" style={{ border: 'none', borderBottom: '1px solid black' }}
                                disabled={!formData.hasOwnProperty("需要测试的技术指标") ? true : formData["需要测试的技术指标"]["其他"] ? false : true}
                                onChange={(e) => {
                                    handleTestIndex("其他", e.target.value)
                                }}
                            ></input>
                        </div>
                    </div>


                </div>
                <button className="submit-btn" onClick={handleSubmit}>提交</button>
            </div>

        </div>
    )
}