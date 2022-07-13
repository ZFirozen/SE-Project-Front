from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

url = "http://210.28.133.13:21325"
# url = "http://localhost:7777"
path = r"D:/chromedriver/chromedriver.exe"
driver = webdriver.Chrome(executable_path=path)
driver.implicitly_wait(10)
driver.maximize_window()
driver.get(url)
info = [
    "其他测试",
    "南京大学F组",
    "NJUF",
    "114514",
    "210.28.133.13:21325",
    "9栋",
    "毕一帆",
    "1919810",
    "junzhi_cn@qq.com",
    "FibonaccciYan",
    "214000",
    "025-88888888",
    "南京银行珠江路分行",
    "62545784585254",
    "南京大学F",
    "在线测试系统",
    "ver.15.876.9004",
    "我们F组",
    "所有人",
    "在线测试",
    "114",
    "514",
    "1919",
    "win11",
    "Ubuntu20.04",
    "macosX",
    "114",
    "没啥",
    "我的电脑",
    "514",
    "1919",
    "无",
    "MySys",
    "ver1.1",
    "JVAV",
    "MongoDb",
    "我不到啊",
    "vsCode",
    "校园网",
    "unknown",
    "测试",
    "进行测试",
    "我的依据",
    "通过验收",
    "电脑",
    "文档",
    "现在",
]

input()

tj = driver.find_elements(
    By.CSS_SELECTOR, "[class='ant-btn ant-btn-dashed ant-btn-lg']"
)
for i in tj:
    if i.get_attribute("textContent") != "添加一行数据":
        tj.remove(i)
    time.sleep(1)
i = tj[0]
ActionChains(driver).move_to_element(i).click(i).perform()
time.sleep(1)
tj = driver.find_elements(
    By.CSS_SELECTOR, "[class='ant-btn ant-btn-dashed ant-btn-lg']"
)
time.sleep(1)
for i in tj:
    if i.get_attribute("textContent") != "添加一行数据":
        tj.remove(i)
    time.sleep(1)
i = tj[2]
ActionChains(driver).move_to_element(i).click(i).perform()
time.sleep(1)
driver.execute_script("var q=document.documentElement.scrollTop=0")
time.sleep(1)
cb = driver.find_elements(By.CLASS_NAME, "ant-checkbox-input")
for i in cb:
    i.click()
time.sleep(1)
driver.execute_script("var q=document.documentElement.scrollTop=0")
time.sleep(1)
tb = driver.find_elements(By.CSS_SELECTOR, "[class='ant-input ant-input-lg']")
ii = 0
for i in tb:
    i.send_keys(info[ii])
    ii += 1
time.sleep(1)
driver.execute_script("var q=document.documentElement.scrollTop=0")
driver.find_element(By.ID, "software_name").send_keys("test")
ri = driver.find_elements(By.CLASS_NAME, "ant-radio-input")
for i in ri:
    i.click()
time.sleep(1)
driver.execute_script("var q=document.documentElement.scrollTop=2300")
driver.find_element(By.ID, "software_type").click()
time.sleep(1)
driver.find_element(By.ID, "software_type").send_keys(Keys.UP)
time.sleep(1)
driver.find_element(By.ID, "software_type").send_keys(Keys.ENTER)
time.sleep(1)
driver.execute_script("var q=document.documentElement.scrollTop=0")
time.sleep(1)
driver.find_element(By.ID, "principal_sigDate").click()
time.sleep(1)
driver.find_element(By.CLASS_NAME, "ant-picker-today-btn").click()
time.sleep(1)
