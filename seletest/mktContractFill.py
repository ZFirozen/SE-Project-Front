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

driver.find_element(By.ID, "userName").send_keys("MARKETER")
time.sleep(1)
driver.find_element(By.ID, "userPassword").send_keys("123456")
time.sleep(1)
driver.find_element(By.ID, "userPassword").send_keys(Keys.ENTER)
time.sleep(2)
wt = driver.find_element(By.CLASS_NAME, "ant-menu-submenu-inline").click()
time.sleep(1)
driver.find_element(By.LINK_TEXT, "委托列表").click()
time.sleep(1)
fp = driver.find_elements(By.NAME, "查看")
fp[len(fp) - 1].click()
time.sleep(1)
fpry = driver.find_elements(By.CSS_SELECTOR, "[class='ant-steps-item-container']")
fpry[1].click()
time.sleep(1)
fpry = driver.find_elements(By.CSS_SELECTOR, "[class='ant-steps-item-container']")
fpry[3].click()
time.sleep(1)
tb = driver.find_elements(By.CSS_SELECTOR, "[class='ant-input ant-input-lg']")
for i in tb:
    i.send_keys("2")
    time.sleep(0.2)
tn = driver.find_elements(By.CSS_SELECTOR, "[class='ant-input-number-input']")
for i in tn:
    i.send_keys("2")
    time.sleep(0.2)
driver.find_element(By.ID,'partyB_contactEmail').send_keys("@2.com")
time.sleep(1)
driver.find_element(By.ID,'signedDate').send_keys("2022-07-07")
time.sleep(1)
driver.find_element(By.ID,'signedDate').send_keys(Keys.ENTER)
time.sleep(1)
driver.find_element(By.ID,'partyB_sigDate').send_keys("2022-07-07")
time.sleep(1)
driver.find_element(By.ID,'partyB_sigDate').send_keys(Keys.ENTER)
time.sleep(1)
driver.find_element(By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary ant-btn-lg']").click()
time.sleep(5)
