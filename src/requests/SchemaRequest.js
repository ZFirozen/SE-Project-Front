async function getForm(id) {
  const data = await new Promise((resolve, reject) => {
    const schema = forms[id];
    if (schema) {
      resolve(schema);
    } else {
      reject({});
    }
  })
  return data;
}

export {
  getForm
}

const forms = {
  "JS002": {
    "title": "form",
    "type": "object",
    "properties": {
      "测试类型": {
        "type": "array",
        "items": {
          "type": "string",
          "enum": [
            "软件确认测试",
            "成果/技术鉴定测试",
            "专项资金验收测试",
            "其他"
          ]
        },
        "component": "CheckboxWidget"
      },
      "软件名称": {
        "type": "string",
        "component": "StringInputWidget"
      },
      "版本号": {
        "type": "string",
        "component": "StringInputWidget"
      },
      "委托单位(中文)": {
        "type": "string",
        "component": "StringInputWidget"
      },
      "委托单位(英文)": {
        "type": "string",
        "component": "StringInputWidget"
      },
      "开发单位": {
        "type": "string",
        "component": "StringInputWidget"
      },
      "单位性质": {
        "type": "string",
        "component": "RadioWidget",
        "enum": [
          "内资企业",
          "外(合)资企业",
          "港澳台(合)资企业",
          "科研院校",
          "政府事业团体",
          "其他"
        ]
      },
      "软件用户对象描述": {
        "type": "string",
        "component": "TextareaWidget"
      },
      "主要功能及用途简介": {
        "type": "string",
        "component": "TextareaWidget"
      },
      "测试依据": {
        "type": "array",
        "items": {
          "type": "string",
          "enum": [
            "GB/T 25000.51-2010",
            "GB/T 16260.1-2006",
            "NST-03-WI12-2011",
            "NST-03-WI13-2011",
            "其他"
          ]
        },
        "component": "CheckboxWidget"
      },
      "需要测试的技术指标": {
        "type": "array",
        "items": {
          "type": "string",
          "enum": [
            "功能性",
            "可靠性",
            "易用性",
            "效率",
            "可维护性",
            "可移植性",
            "代码覆盖度",
            "缺陷检测率",
            "代码风格符合度",
            "代码不符合项检测率",
            "产品说明要求",
            "用户文档集要求",
            "其它",
          ]
        },
        "component": "CheckboxWidget"
      },
      "软件规模": {
        "type": "object",
        "properties": {
          "功能数": {
            "type": "string",
            "component": "StringInputWidget"
          },
          "功能点数": {
            "type": "string",
            "component": "StringInputWidget"
          },
          "代码行数": {
            "type": "string",
            "component": "StringInputWidget"
          }
        }
      },
      "软件类型": {
        "type": "object",
        "properties": {
          "系统软件": {
            "type": "string",
            "component": "RadioWidget",
            "enum": [
              "操作系统",
              "中文处理系统",
              "网络系统",
              "嵌入式操作系统",
              "其他"
            ]
          },
          "支持软件": {
            "type": "string",
            "component": "RadioWidget",
            "enum": [
              "程序设计语言",
              "数据库系统设计",
              "工具软件",
              "网络通信软件",
              "中间件",
              "其他"
            ]
          },
          "应用软件": {
            "type": "string",
            "component": "RadioWidget",
            "enum": [
              "行业管理软件",
              "办公软件",
              "模式识别软件",
              "图形图像软件",
              "控制软件",
              "网络应用软件",
              "信息管理软件",
              "数据库管理应用软件",
              "安全与保密软件",
              "嵌入式应用软件",
              "教育软件",
              "游戏软件",
              "其他"
            ]
          },
          "其他": {
            "type": "string",
            "component": "RadioWidget",
            "enum": [
              "其他"
            ]
          },
        }
      },
      "运行环境": {
        "type": "object",
        "properties": {
          "客户端": {
            "type": "object",
            "properties": {
              "操作系统": {
                "type": "array",
                "component": "CheckboxWidget",
                "items": {
                  "type": "string",
                  "enum": [
                    "Windows",
                    "Linux",
                    "其他"
                  ]
                }
              },
              "内存要求": {
                "type": "string",
                "component": "StringInputWidget"
              },
              "其他要求": {
                "type": "string",
                "component": "TextareaWidget"
              },
            }
          },
          "服务器端": {
            "type": "object",
            "properties": {
              "硬件": {
                "type": "object",
                "properties": {
                  "架构": {
                    "type": "array",
                    "component": "CheckboxWidget",
                    "items": {
                      "type": "string",
                      "enum": [
                        "PC服务器",
                        "UNIX／Linux服务器",
                        "其他"
                      ]
                    }
                  },
                  "内存要求": {
                    "type": "string",
                    "component": "StringInputWidget"
                  },
                  "硬盘要求": {
                    "type": "string",
                    "component": "StringInputWidget"
                  },
                  "其他要求": {
                    "type": "string",
                    "component": "TextareaWidget"
                  },
                }
              },
              "软件": {
                "type": "object",
                "properties": {
                  "操作系统": {
                    "type": "string",
                    "component": "StringInputWidget"
                  },
                  "版本": {
                    "type": "string",
                    "component": "StringInputWidget"
                  },
                  "编程语言": {
                    "type": "string",
                    "component": "StringInputWidget"
                  },
                  "构架": {
                    "type": "array",
                    "component": "CheckboxWidget",
                    "items": {
                      "type": "string",
                      "enum": [
                        "C/S",
                        "B/S",
                        "其他"
                      ]
                    }
                  },
                  "数据库": {
                    "type": "string",
                    "component": "StringInputWidget"
                  },
                  "中间件": {
                    "type": "string",
                    "component": "StringInputWidget"
                  },
                  "其他支撑软件": {
                    "type": "string",
                    "component": "StringInputWidget"
                  },
                }
              }
            }
          }
        },
        "网络环境": {
          "type": "string",
          "component": "StringInputWidget"
        }
      },
      "样品和数量": {
        "type": "object",
        "properties": {
          "软件介质": {
            "type": "array",
            "component": "CheckboxWidget",
            "items": {
              "type": "string",
              "enum": [
                "光盘",
                "U盘",
                "其他"
              ]
            }
          },
          "文档资料": {
            "type": "string",
            "component": "TextareaWidget"
          },
          "提交的样品": {
            "type": "string",
            "component": "RadioWidget",
            "enum": [
              "由本实验室销毁",
              "退还给我们"
            ]
          }
        }
      },
      "希望测试完成时间": {
        "type": "string",
        "component": "StringInputWidget"
      },
      "委托单位信息": {
        "type": "object",
        "properties": {
          "电话": {
            "type": "string",
            "component": "StringInputWidget"
          },
          "传真": {
            "type": "string",
            "component": "StringInputWidget"
          },
          "地址": {
            "type": "string",
            "component": "StringInputWidget"
          },
          "邮编": {
            "type": "string",
            "component": "StringInputWidget"
          },
          "联系人": {
            "type": "string",
            "component": "StringInputWidget"
          },
          "手机": {
            "type": "string",
            "component": "StringInputWidget"
          },
          "E-mail": {
            "type": "string",
            "component": "StringInputWidget"
          },
          "网址": {
            "type": "string",
            "component": "StringInputWidget"
          }
        }
      },
      "密级": {
        "type": "string",
        "component": "RadioWidget",
        "enum": [
          "无密级",
          "秘密",
          "机密"
        ]
      },
      "查杀病毒": {
        "type": "string",
        "component": "RadioWidget",
        "enum": [
          "已完成",
          "无法完成"
        ]
      },
      "材料检查": {
        "type": "object",
        "properties": {
          "测试样品": {
            "type": "array",
            "component": "CheckboxWidget",
            "items": {
              "type": "string",
              "enum": [
                "源代码",
                "可执行文件"
              ]
            }
          },
          "需求文档": {
            "type": "array",
            "component": "CheckboxWidget",
            "items": {
              "type": "string",
              "enum": [
                "项目计划任务书",
                "需求分析报告",
                "合同"
              ]
            }
          },
          "用户文档": {
            "type": "array",
            "component": "CheckboxWidget",
            "items": {
              "type": "string",
              "enum": [
                "用户手册",
                "用户指南"
              ]
            }
          },
          "操作文档": {
            "type": "array",
            "component": "CheckboxWidget",
            "items": {
              "type": "string",
              "enum": [
                "操作员手册",
                "安装手册",
                "诊断手册",
                "支持手册"
              ]
            }
          },
          "其他": {
            "type": "string",
            "component": "StringInputWidget"
          }
        }
      },
      "确认意见": {
        "type": "string",
        "component": "RadioWidget",
        "enum": [
          "测试所需材料不全，未达到受理条件。",
          "属依据国家标准或自编非标规范进行的常规检测，有资质、能力和资源满足委托方要求。",
          "无国家标准和规范依据，或实验室缺乏检测设备和工具，无法完成检测。",
          "超出实验室能力和资质范围，无法完成检测。"
        ]
      },
      "受理意见": {
        "type": "string",
        "component": "RadioWidget",
        "enum": [
          "受理-进入项目立项和合同评审流程",
          "不受理",
          "进一步联系"
        ]
      },
      "测试项目编号": {
        "type": "string",
        "component": "StringInputWidget"
      },
      "备注": {
        "type": "string",
        "component": "TextareaWidget"
      },
      "受理人": {
        "type": "string",
        "component": "StringInputWidget"
      },
      "日期": {
        "type": "string",
        "component": "StringInputWidget"
      },
      "委托人填写": {
        "type": "object",
        "properties": {
          "委托人": {
            "type": "string",
            "component": "StringInputWidget"
          },
          "日期": {
            "type": "string",
            "component": "StringInputWidget"
          }
        }
      }
    }
  },
  "JS011": {
    "type": "array",
    "component": "ArrayTableWidget",
    "items": {
      "type": "object",
      "properties": {
        "序号": {
          "type": "string",
          "component": "StringInputWidget"
        },
        "问题（缺陷）简要描述": {
          "type": "string",
          "component": "StringInputWidget"
        },
        "对应需求条目": {
          "type": "string",
          "component": "StringInputWidget"
        },
        "发现缺陷的初始条件": {
          "type": "string",
          "component": "StringInputWidget"
        },
        "发现缺陷用例及具体操作路径（要具体）": {
          "type": "string",
          "component": "StringInputWidget"
        },
        "关联用例": {
          "type": "string",
          "component": "StringInputWidget"
        },
        "发现时间": {
          "type": "string",
          "component": "StringInputWidget"
        },
        "责任人": {
          "type": "string",
          "component": "StringInputWidget"
        },
        "修改建议": {
          "type": "string",
          "component": "StringInputWidget"
        }
      }
    }
  }
}