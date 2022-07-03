from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
url = 'http://localhost:7777/entrustment/verify'
path = r'D:/chromedriver/chromedriver.exe'
driver = webdriver.Chrome(executable_path=path) 
driver.implicitly_wait(10)
driver.maximize_window()
driver.get(url)
time.sleep(1)

ri=driver.find_elements(By.CLASS_NAME,'ant-radio-input')
for i in ri:
    i.click()
time.sleep(1)
driver.execute_script("var q=document.documentElement.scrollTop=1000")
cb=driver.find_elements(By.CLASS_NAME,'ant-checkbox-input')
for i in cb:
    i.click()
time.sleep(1)
# driver.execute_script("var q=document.documentElement.scrollTop=0")
tb=driver.find_elements(By.CSS_SELECTOR,"[class='ant-input ant-input-lg']")
for i in tb:
    i.send_keys('1')
time.sleep(1)