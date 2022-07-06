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

# 市场部人员审核委托
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
driver.find_element(By.CLASS_NAME, "ant-pagination-next").click()
time.sleep(5)
fp = driver.find_elements(By.NAME, "查看")
fp[len(fp) - 1].click()
time.sleep(1)
fpry = driver.find_elements(By.CSS_SELECTOR, "[class='ant-steps-item-container']")
fpry[5].click()
time.sleep(1)
cb = driver.find_elements(By.CLASS_NAME, "ant-checkbox-input")
for i in cb:
    i.click()
driver.execute_script("var q=document.documentElement.scrollTop=0")
time.sleep(1)
tb = driver.find_elements(By.CSS_SELECTOR, "[class='ant-input']")
for i in tb:
    i.send_keys("1")
driver.execute_script("var q=document.documentElement.scrollTop=0")
time.sleep(1)
ri = driver.find_elements(By.CLASS_NAME, "ant-radio-input")
for i in ri:
    i.click()
ri[len(ri)-6].click()
ri[len(ri)-3].click()
driver.find_element(By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary']").send_keys(Keys.ENTER)
time.sleep(5)
input()