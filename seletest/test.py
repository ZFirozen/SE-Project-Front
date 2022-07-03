from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
url = 'http://localhost:7777'
path = r'D:/chromedirver/chromedriver.exe'
driver = webdriver.Chrome(executable_path=path) 
driver.maximize_window()
driver.get(url)
time.sleep(3)
driver.find_element(By.LINK_TEXT,'登录').click()
time.sleep(3)
driver.find_element(By.ID,'login_用户名').send_keys('123')
time.sleep(1)
driver.find_element(By.ID,'login_密码').send_keys('123')
time.sleep(1)
driver.find_element(By.ID,'login_密码').send_keys(Keys.ENTER)
time.sleep(1)
driver.close()