from asyncio.windows_events import NULL
from requests import NullHandler
from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

url = "http://localhost:7777"
path = r"D:/chromedriver/chromedriver.exe"
driver = webdriver.Chrome(executable_path=path)
driver.implicitly_wait(60)
driver.maximize_window()
driver.get(url)

# 文件归档
driver.find_element(By.ID, "userName").send_keys("MARKETER")
time.sleep(1)
driver.find_element(By.ID, "userPassword").send_keys("123456")
time.sleep(1)
driver.find_element(By.ID, "userPassword").send_keys(Keys.ENTER)
time.sleep(5)
wt = driver.find_element(By.CLASS_NAME, "ant-menu-submenu-inline").click()
time.sleep(1)
driver.find_element(By.LINK_TEXT, "委托列表").click()
time.sleep(1)
fp = driver.find_elements(By.NAME, "查看")
fp[len(fp) - 1].click()
time.sleep(2)
fpry = driver.find_elements(By.CSS_SELECTOR, "[class='ant-steps-item-container']")
fpry[6].click()
time.sleep(1)
driver.find_element(By.XPATH, "//input").send_keys("./testFiles/2021 CCF中国软件大会会议手册_v2.8.pdf") #如果嫌麻烦就改成绝对路径
input()