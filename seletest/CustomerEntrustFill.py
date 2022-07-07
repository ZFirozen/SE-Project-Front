from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
url = 'http://localhost:7777'
path = r'D:/chromedriver/chromedriver.exe'
driver = webdriver.Chrome(executable_path=path) 
driver.implicitly_wait(10)
driver.maximize_window()
driver.get(url)
time.sleep(1)

driver.find_element(By.ID, "userName").send_keys("CUSTOMER")
time.sleep(1)
driver.find_element(By.ID, "userPassword").send_keys("123456")
time.sleep(1)
driver.find_element(By.ID, "userPassword").send_keys(Keys.ENTER)
time.sleep(5)
wt=driver.find_element(By.CLASS_NAME,'ant-menu-submenu-inline').click()
time.sleep(1)
driver.find_element(By.LINK_TEXT,'委托申请').click()
time.sleep(1)
cb=driver.find_elements(By.CLASS_NAME,'ant-checkbox-input')
for i in cb:
    i.click()
time.sleep(1)
print(driver.find_element(By.ID,'toreplace_0').get_property("name"))
print(driver.find_element(By.ID,'toreplace_0').get_property("className"))
driver.execute_script("var q=document.documentElement.scrollTop=0")
driver.find_element(By.ID,'toreplace_0').send_keys('1')
time.sleep(1)
tb=driver.find_elements(By.CSS_SELECTOR,"[class='ant-input ant-input-lg']")
for i in tb:
    i.send_keys('1')
time.sleep(1)
driver.execute_script("var q=document.documentElement.scrollTop=0")
ri=driver.find_elements(By.CLASS_NAME,'ant-radio-input')
for i in ri:
    i.click()
time.sleep(1)
driver.execute_script("var q=document.documentElement.scrollTop=2300")
driver.find_element(By.ID,'software_type').click()
time.sleep(1)
driver.find_element(By.ID,'software_type').send_keys(Keys.UP)
time.sleep(1)
driver.find_element(By.ID,'software_type').send_keys(Keys.ENTER)
time.sleep(1)
driver.find_element(By.ID,'principal_contactEmail').send_keys('junzhi_cn@qq.com')
time.sleep(1)
driver.find_element(By.ID,'principal_sigDate').click()
time.sleep(1)
driver.find_element(By.CLASS_NAME,'ant-picker-today-btn').click()
time.sleep(1)
driver.find_element(By.ID,'principal_sigDate').submit()
