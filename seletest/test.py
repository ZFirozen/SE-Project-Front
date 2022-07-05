from asyncio.windows_events import NULL
from requests import NullHandler
from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

url = "http://localhost:7777"
path = r"D:/chromedirver/chromedriver.exe"
driver = webdriver.Chrome(executable_path=path)
driver.implicitly_wait(60)
driver.maximize_window()
driver.get(url)
time.sleep(3)
driver.find_element(By.ID, "userName").send_keys("c")
time.sleep(1)
driver.find_element(By.ID, "userPassword").send_keys("123")
time.sleep(1)
print(driver.find_element(By.ID, "userPassword"))
driver.find_element(By.ID, "userPassword").send_keys(Keys.ENTER)
time.sleep(5)
wt = driver.find_element(By.CLASS_NAME, "ant-menu-submenu-inline").click()
time.sleep(1)
driver.find_element(By.LINK_TEXT, "填表").click()
time.sleep(1)

tj = driver.find_elements(
    By.CSS_SELECTOR, "[class='ant-btn ant-btn-dashed ant-btn-lg']"
)
time.sleep(1)
for i in tj:
    if i.get_attribute("textContent") != "添加一行数据":
        # driver.execute_script("arguments[0].scrollIntoView();", i)
        # driver.execute_script("window.scrollBy(0,-100)")
        tj.remove(i)
    time.sleep(1)
i = tj[0]
ActionChains(driver).scroll_to_element(i).move_to_element(i).click(i).perform()
time.sleep(1)
tj = driver.find_elements(
    By.CSS_SELECTOR, "[class='ant-btn ant-btn-dashed ant-btn-lg']"
)
time.sleep(1)
for i in tj:
    if i.get_attribute("textContent") != "添加一行数据":
        # driver.execute_script("arguments[0].scrollIntoView();", i)
        # driver.execute_script("window.scrollBy(0,-100)")
        tj.remove(i)
    time.sleep(1)
i = tj[1]
ActionChains(driver).scroll_to_element(i).move_to_element(i).click(i).perform()
time.sleep(10)
driver.execute_script("var q=document.documentElement.scrollTop=0")
cb = driver.find_elements(By.CLASS_NAME, "ant-checkbox-input")
for i in cb:
    i.click()
time.sleep(1)
driver.execute_script("var q=document.documentElement.scrollTop=0")
time.sleep(1)
tb = driver.find_elements(By.CSS_SELECTOR, "[class='ant-input ant-input-lg']")
for i in tb:
    i.send_keys("1")
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
driver.find_element(By.ID, "principal_contactEmail").send_keys("junzhi_cn@qq.com")
time.sleep(1)
driver.find_element(By.ID, "principal_sigDate").click()
time.sleep(1)
driver.find_element(By.CLASS_NAME, "ant-picker-today-btn").click()
time.sleep(1)
driver.find_element(
    By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary ant-btn-lg']"
).click()
time.sleep(5)

driver.find_element(
    By.XPATH, "/html/body/div[1]/div/section/div[2]/header[2]/div/div[3]/div[1]/span"
).click()
time.sleep(1)
driver.find_element(By.XPATH, "/html/body/div[3]/div/div/ul/li[4]").click()
time.sleep(1)
driver.find_element(By.ID, "userName").send_keys("MARKETING_SUPERVISOR")
time.sleep(1)
driver.find_element(By.ID, "userPassword").send_keys("123456")
time.sleep(1)
driver.find_element(By.ID, "userPassword").send_keys(Keys.ENTER)
time.sleep(5)
wt = driver.find_element(By.CLASS_NAME, "ant-menu-submenu-inline").click()
time.sleep(1)
driver.find_element(By.LINK_TEXT, "查看").click()
time.sleep(1)
driver.find_element(By.CLASS_NAME, "ant-pagination-next").click()
time.sleep(5)
fp = driver.find_elements(By.NAME, "分派")
fp[len(fp) - 1].click()
time.sleep(1)
fpry = driver.find_elements(By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary']")
fpry[len(fp) - 1].click()
time.sleep(1)
driver.find_elements(By.NAME, "确 定").click()
time.sleep(1)

# driver.find_element(By.ID,'login_用户名').send_keys('MARKETER')
# time.sleep(1)
# driver.find_element(By.ID,'login_密码').send_keys('123456')
# time.sleep(1)
# driver.find_element(By.ID,'login_密码').send_keys(Keys.ENTER)
# time.sleep(10)
# driver.switch_to.alert.accept()
# time.sleep(10)
