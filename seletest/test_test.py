import pytest
from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains


class TestClass:
    url = "http://localhost:7777"
    path = r"D:/chromedriver/chromedriver.exe"
    driver = webdriver.Chrome(executable_path=path)
    customer = "CUSTOMER114"
    marketer = "MARKETER114"
    marketing_supervisor = "MARKETING_SUPERVISOR114"
    tester = "TESTER114"
    testing_supervisor = "TESTING_SUPERVISOR114"
    qa = "QA114"
    qa_supervisor = "QA_SUPERVISOR114"
    password = "123456"

    def __init__(self):
        self.setup()

    def setup(self):
        self.driver.implicitly_wait(60)
        self.driver.maximize_window()
        self.driver.get(self.url)

    def logout(self):
        time.sleep(1)
        self.driver.find_element(
            By.XPATH,
            "/html/body/div[1]/div/section/div[2]/header[2]/div/div[3]/div[1]/span",
        ).click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, "/html/body/div[3]/div/div/ul/li[4]").click()
        time.sleep(1)

    def test_1(self):
        time.sleep(3)
        self.driver.find_element(By.ID, "userName").send_keys(self.customer)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(self.password)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(Keys.ENTER)
        time.sleep(3)
        self.driver.find_element(By.CLASS_NAME, "ant-menu-submenu-inline").click()
        time.sleep(1)
        self.driver.find_element(By.LINK_TEXT, "委托申请").click()
        time.sleep(1)

        tj = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-dashed ant-btn-lg']"
        )
        time.sleep(1)
        for i in tj:
            if i.get_attribute("textContent") != "添加一行数据":
                tj.remove(i)
            time.sleep(1)
        i = tj[0]
        ActionChains(self.driver).scroll_to_element(i).move_to_element(i).click(
            i
        ).perform()
        time.sleep(1)
        tj = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-dashed ant-btn-lg']"
        )
        time.sleep(1)
        for i in tj:
            if i.get_attribute("textContent") != "添加一行数据":
                tj.remove(i)
            time.sleep(1)
        i = tj[2]
        ActionChains(self.driver).scroll_to_element(i).move_to_element(i).click(
            i
        ).perform()
        time.sleep(1)
        self.driver.execute_script("var q=document.documentElement.scrollTop=0")
        time.sleep(1)
        cb = self.driver.find_elements(By.CLASS_NAME, "ant-checkbox-input")
        for i in cb:
            i.click()
        time.sleep(1)
        self.driver.execute_script("var q=document.documentElement.scrollTop=0")
        time.sleep(1)
        tb = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-input ant-input-lg']"
        )
        for i in tb:
            i.send_keys("1")
        time.sleep(1)
        self.driver.execute_script("var q=document.documentElement.scrollTop=0")
        self.driver.find_element(By.ID, "software_name").send_keys("test")
        ri = self.driver.find_elements(By.CLASS_NAME, "ant-radio-input")
        for i in ri:
            i.click()
        time.sleep(1)
        self.driver.execute_script("var q=document.documentElement.scrollTop=2300")
        self.driver.find_element(By.ID, "software_type").click()
        time.sleep(1)
        self.driver.find_element(By.ID, "software_type").send_keys(Keys.UP)
        time.sleep(1)
        self.driver.find_element(By.ID, "software_type").send_keys(Keys.ENTER)
        time.sleep(1)
        self.driver.find_element(By.ID, "principal_contactEmail").send_keys(
            "junzhi_cn@qq.com"
        )
        time.sleep(1)
        self.driver.find_element(By.ID, "principal_sigDate").click()
        time.sleep(1)
        self.driver.find_element(By.CLASS_NAME, "ant-picker-today-btn").click()
        time.sleep(1)
        self.driver.find_element(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary ant-btn-lg']"
        ).click()
        self.logout()

    def test_2(self):
        self.driver.implicitly_wait(60)
        self.driver.maximize_window()
        self.driver.get(self.url)
        self.driver.find_element(By.ID, "userName").send_keys(self.marketing_supervisor)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(self.password)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(Keys.ENTER)
        time.sleep(3)
        self.driver.find_element(By.CLASS_NAME, "ant-menu-submenu-inline").click()
        time.sleep(1)
        self.driver.find_element(By.LINK_TEXT, "委托列表").click()
        time.sleep(1)
        self.driver.find_element(By.CLASS_NAME, "ant-pagination-next").click()
        time.sleep(3)
        fp = self.driver.find_elements(By.NAME, "分派")
        fp[len(fp) - 1].click()
        time.sleep(1)
        fpry = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary']"
        )
        fpry[len(fpry) - 1].click()
        time.sleep(1)
        qr = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary']"
        )
        qr[6].send_keys(Keys.ENTER)
        self.logout()

    def test_3(self):
        self.driver.find_element(By.ID, "userName").send_keys(self.marketer)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(self.password)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(Keys.ENTER)
        time.sleep(3)
        self.driver.find_element(By.CLASS_NAME, "ant-menu-submenu-inline").click()
        time.sleep(1)
        self.driver.find_element(By.LINK_TEXT, "委托列表").click()
        time.sleep(1)
        self.driver.find_element(By.CLASS_NAME, "ant-pagination-next").click()
        time.sleep(3)
        fp = self.driver.find_elements(By.NAME, "查看")
        fp[len(fp) - 1].click()
        time.sleep(1)
        fpry = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-steps-item-container']"
        )
        fpry[5].click()
        time.sleep(1)
        cb = self.driver.find_elements(By.CLASS_NAME, "ant-checkbox-input")
        for i in cb:
            i.click()
        self.driver.execute_script("var q=document.documentElement.scrollTop=0")
        time.sleep(1)
        tb = self.driver.find_elements(By.CSS_SELECTOR, "[class='ant-input']")
        for i in tb:
            i.send_keys("1")
        self.driver.execute_script("var q=document.documentElement.scrollTop=0")
        time.sleep(1)
        ri = self.driver.find_elements(By.CLASS_NAME, "ant-radio-input")
        for i in ri:
            i.click()
        ri[len(ri) - 6].click()
        ri[len(ri) - 3].click()
        self.driver.find_element(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary']"
        ).send_keys(Keys.ENTER)
        self.logout()

    def test_4(self):
        self.driver.find_element(By.ID, "userName").send_keys(self.testing_supervisor)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(self.password)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(Keys.ENTER)
        time.sleep(3)
        self.driver.find_element(By.CLASS_NAME, "ant-menu-submenu-inline").click()
        time.sleep(1)
        self.driver.find_element(By.LINK_TEXT, "委托列表").click()
        time.sleep(1)
        self.driver.find_element(By.CLASS_NAME, "ant-pagination-next").click()
        time.sleep(3)
        fp = self.driver.find_elements(By.NAME, "分派")
        fp[len(fp) - 1].click()
        time.sleep(1)
        fpry = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary']"
        )
        fpry[len(fpry) - 1].click()
        time.sleep(1)
        qr = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary']"
        )
        qr[6].send_keys(Keys.ENTER)
        self.logout()

    def test_5(self):
        self.driver.find_element(By.ID, "userName").send_keys(self.tester)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(self.password)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(Keys.ENTER)
        time.sleep(3)
        self.driver.find_element(By.CLASS_NAME, "ant-menu-submenu-inline").click()
        time.sleep(1)
        self.driver.find_element(By.LINK_TEXT, "委托列表").click()
        time.sleep(1)
        self.driver.find_element(By.CLASS_NAME, "ant-pagination-next").click()
        time.sleep(3)
        fp = self.driver.find_elements(By.NAME, "查看")
        fp[len(fp) - 1].click()
        time.sleep(1)
        fpry = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-steps-item-container']"
        )
        fpry[7].click()
        time.sleep(1)
        self.driver.find_element(
            By.CSS_SELECTOR, "[class='ant-input ant-input-lg']"
        ).send_keys("test")
        tb = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-input ant-input-lg']"
        )
        for i in tb:
            i.send_keys("1")
        self.driver.find_element(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary ant-btn-lg']"
        ).send_keys(Keys.ENTER)
        self.logout()

    def test_10(self):
        # 合并了两步骤
        self.driver.find_element(By.ID, "userName").send_keys(self.marketer)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(self.password)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(Keys.ENTER)
        time.sleep(5)
        self.driver.find_element(By.CLASS_NAME, "ant-menu-submenu-inline").click()
        time.sleep(1)
        self.driver.find_element(By.LINK_TEXT, "委托列表").click()
        time.sleep(1)
        self.driver.find_element(By.CLASS_NAME, "ant-pagination-next").click()
        time.sleep(5)
        fp = self.driver.find_elements(By.NAME, "查看")
        fp[len(fp) - 1].click()
        time.sleep(2)
        fpry = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-steps-item-container']"
        )
        fpry[5].click()
        time.sleep(1)
        tb = self.driver.find_elements(By.CSS_SELECTOR, "[class='ant-input']")
        tb[len(tb) - 2].click()
        time.sleep(1)
        self.driver.find_element(By.CLASS_NAME, "ant-menu-submenu-inline").click()
        time.sleep(1)
        self.driver.find_element(By.LINK_TEXT, "委托列表").click()
        time.sleep(1)
        self.driver.find_element(By.CLASS_NAME, "ant-pagination-next").click()
        time.sleep(5)
        fp = self.driver.find_elements(By.NAME, "查看")
        fp[len(fp) - 1].click()
        time.sleep(2)
        fpry = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-steps-item-container']"
        )
        fpry[6].click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//input").send_keys(
            "./testFiles/2021 CCF中国软件大会会议手册_v2.8.pdf"
        )  # 如果嫌麻烦就改成绝对路径
        self.logout()

    def test_11(self):
        self.driver.find_element(By.ID, "userName").send_keys(self.qa_supervisor)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(self.password)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(Keys.ENTER)
        time.sleep(5)
        self.driver.find_element(By.LINK_TEXT, "测试项目").click()
        time.sleep(1)
        self.driver.find_element(By.CLASS_NAME, "ant-pagination-next").click()
        time.sleep(5)
        fp = self.driver.find_elements(By.NAME, "分派")
        fp[len(fp) - 1].click()
        time.sleep(1)
        fpry = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary']"
        )
        fpry[len(fpry) - 1].click()
        time.sleep(1)
        qr = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary']"
        )
        qr[4].send_keys(Keys.ENTER)
        self.logout()

    def test_12(self):
        self.driver.find_element(By.ID, "userName").send_keys(self.tester)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(self.password)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(Keys.ENTER)
        time.sleep(5)
        self.driver.find_element(By.LINK_TEXT, "测试项目").click()
        time.sleep(1)
        self.driver.find_element(By.CLASS_NAME, "ant-pagination-next").click()
        time.sleep(3)
        fp = self.driver.find_elements(By.NAME, "查看")
        fp[len(fp) - 1].click()
        time.sleep(2)
        fpry = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-steps-item-container']"
        )
        fpry[5].click()
        time.sleep(1)
        self.driver.find_element(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-dashed']"
        ).click()
        time.sleep(1)
        self.driver.find_element(
            By.CSS_SELECTOR, "[class='ant-select-selector'"
        ).click()
        self.driver.find_element(
            By.CSS_SELECTOR, "[class='ant-select-selection-search-input'"
        ).send_keys(Keys.ENTER)
        self.driver.execute_script("var q=document.documentElement.scrollTop=0")
        time.sleep(1)
        tb = self.driver.find_elements(By.CSS_SELECTOR, "[class='ant-input']")
        for i in tb:
            i.send_keys("1")
        time.sleep(1)
        self.driver.execute_script("var q=document.documentElement.scrollTop=0")
        pick = self.driver.find_elements(By.CSS_SELECTOR, "[class='ant-picker']")
        for i in range(len(pick)):
            self.driver.find_element(By.CSS_SELECTOR, "[class='ant-picker']").click()
            time.sleep(1)
            self.driver.find_element(By.CLASS_NAME, "ant-picker-today-btn").click()
            time.sleep(1)
        self.driver.find_element(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary']"
        ).send_keys(Keys.ENTER)
        self.logout()

    def test_13(self):
        # 合并了两个步骤
        self.driver.find_element(By.ID, "userName").send_keys(self.qa)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(self.password)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(Keys.ENTER)
        time.sleep(5)
        self.driver.find_element(By.LINK_TEXT, "测试项目").click()
        time.sleep(1)
        self.driver.find_element(By.CLASS_NAME, "ant-pagination-next").click()
        time.sleep(5)
        fp = self.driver.find_elements(By.NAME, "查看")
        fp[len(fp) - 1].click()
        time.sleep(2)
        fpry = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-steps-item-container']"
        )
        fpry[6].click()
        time.sleep(1)
        tb = self.driver.find_elements(By.CSS_SELECTOR, "[class='ant-radio-input']")
        for i in tb:
            i.click()
        self.driver.execute_script("var q=document.documentElement.scrollTop=0")
        tb = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-input ant-input-lg']"
        )
        for i in tb:
            i.send_keys("1")
        time.sleep(1)
        self.driver.find_element(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary ant-btn-lg']"
        ).send_keys(Keys.ENTER)
        time.sleep(1)
        self.driver.find_element(By.LINK_TEXT, "测试项目").click()
        time.sleep(1)
        self.driver.find_element(By.CLASS_NAME, "ant-pagination-next").click()
        time.sleep(5)
        fp = self.driver.find_elements(By.NAME, "查看")
        fp[len(fp) - 1].click()
        time.sleep(2)
        fpry = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-steps-item-container']"
        )
        fpry[7].click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//input").send_keys(
            "./testFiles/NST－04－JS013－2011 - 测试方案评审表.doc"
        )  # 如果嫌麻烦就改成绝对路径
        self.logout()

    def test_14(self):
        # 在这一步骤中需要填写多张表格
        self.driver.find_element(By.ID, "userName").send_keys(self.tester)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(self.password)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(Keys.ENTER)
        time.sleep(5)
        self.driver.find_element(By.LINK_TEXT, "测试项目").click()
        time.sleep(1)
        self.driver.find_element(By.CLASS_NAME, "ant-pagination-next").click()
        time.sleep(5)
        fp = self.driver.find_elements(By.NAME, "查看")
        fp[len(fp) - 1].click()
        time.sleep(2)
        fpry = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-steps-item-container']"
        )
        fpry[8].click()
        time.sleep(1)
        # JS007
        self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary ant-btn-lg']"
        )[0].send_keys(Keys.ENTER)
        time.sleep(1)
        self.driver.find_element(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-dashed ant-btn-lg']"
        ).click()
        ll = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-dashed ant-btn-lg']"
        )
        for i in ll:
            i.click()
        time.sleep(1)
        self.driver.execute_script("var q=document.documentElement.scrollTop=0")
        time.sleep(1)
        tb = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-input ant-input-lg']"
        )
        for i in tb:
            i.send_keys("1")
        time.sleep(1)
        self.driver.execute_script("var q=document.documentElement.scrollTop=0")
        pick = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-picker ant-picker-large']"
        )
        for i in range(len(pick)):
            self.driver.find_element(
                By.CSS_SELECTOR, "[class='ant-picker ant-picker-large']"
            ).click()
            time.sleep(1)
            self.driver.find_element(By.CLASS_NAME, "ant-picker-today-btn").click()
            time.sleep(1)
        self.driver.execute_script("var q=document.documentElement.scrollTop=0")
        self.driver.find_element(By.ID, "clientContact_contactEmail").send_keys(
            "23456789@email.com"
        )
        time.sleep(1)
        self.driver.find_element(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary ant-btn-lg']"
        ).click()
        # JS008
        self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary ant-btn-lg']"
        )[1].send_keys(Keys.ENTER)
        time.sleep(1)
        self.driver.find_element(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-dashed ant-btn-lg']"
        ).click()
        time.sleep(1)
        self.driver.execute_script("var q=document.documentElement.scrollTop=0")
        time.sleep(1)
        tb = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-input ant-input-lg']"
        )
        for i in tb:
            i.send_keys("1")
        time.sleep(1)
        self.driver.find_element(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary ant-btn-lg']"
        ).click()
        # JS009
        self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary ant-btn-lg']"
        )[2].send_keys(Keys.ENTER)
        time.sleep(1)
        self.driver.find_element(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-dashed ant-btn-lg']"
        ).click()
        time.sleep(1)
        self.driver.execute_script("var q=document.documentElement.scrollTop=0")
        time.sleep(1)
        tb = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-input ant-input-lg']"
        )
        for i in tb:
            i.send_keys("1")
        time.sleep(1)
        self.driver.execute_script("var q=document.documentElement.scrollTop=0")
        rb = self.driver.find_element(
            By.CSS_SELECTOR, "[class='ant-input ant-input-lg']"
        )
        rb.click()
        rb.send_keys("2")
        rb.click()
        self.driver.find_element(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary ant-btn-lg']"
        ).send_keys(Keys.ENTER)
        # JS011
        self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary ant-btn-lg']"
        )[3].send_keys(Keys.ENTER)
        time.sleep(1)
        self.driver.find_element(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-dashed ant-btn-lg']"
        ).click()
        time.sleep(1)
        self.driver.execute_script("var q=document.documentElement.scrollTop=0")
        time.sleep(1)
        tb = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-input ant-input-lg']"
        )
        for i in tb:
            i.send_keys("1")
        time.sleep(1)
        self.driver.find_element(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary ant-btn-lg']"
        ).click()
        # 状态转换
        time.sleep(1)
        self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary ant-btn-lg']"
        )[4].send_keys(Keys.ENTER)
        self.logout()

    def test_15(self):
        self.driver.find_element(By.ID, "userName").send_keys(self.qa)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(self.password)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(Keys.ENTER)
        time.sleep(5)
        self.driver.find_element(By.LINK_TEXT, "测试项目").click()
        time.sleep(1)
        self.driver.find_element(By.CLASS_NAME, "ant-pagination-next").click()
        time.sleep(5)
        fp = self.driver.find_elements(By.NAME, "查看")
        fp[len(fp) - 1].click()
        time.sleep(2)
        fpry = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-steps-item-container']"
        )
        fpry[9].click()
        time.sleep(1)
        rb = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-input ant-input-lg']"
        )
        rb[0].send_keys("test")
        rb[1].send_keys("test")
        rg = self.driver.find_elements(By.CSS_SELECTOR, "[class='ant-radio-input']")
        for i in range(0, len(rg), 2):
            rg[i].click()
        self.driver.find_element(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary ant-btn-lg']"
        ).click()
        time.sleep(1)
        self.driver.find_element(By.LINK_TEXT, "测试项目").click()
        time.sleep(1)
        self.driver.find_element(By.CLASS_NAME, "ant-pagination-next").click()
        time.sleep(3)
        fp = self.driver.find_elements(By.NAME, "查看")
        fp[len(fp) - 1].click()
        time.sleep(2)
        fpry = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-steps-item-container']"
        )
        fpry[10].click()
        time.sleep(1)
        self.driver.find_element(By.XPATH, "//input").send_keys(
            "./testFiles/NST－04－JS010－2011－测试报告检查表.doc"
        )  # 如果嫌麻烦就改成绝对路径
        self.logout()

    def test_16(self):
        self.driver.find_element(By.ID, "userName").send_keys(self.marketer)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(self.password)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(Keys.ENTER)
        time.sleep(5)
        self.driver.find_element(By.LINK_TEXT, "测试项目").click()
        time.sleep(1)
        self.driver.find_element(By.CLASS_NAME, "ant-pagination-next").click()
        time.sleep(5)
        fp = self.driver.find_elements(By.NAME, "查看")
        fp[len(fp) - 1].click()
        time.sleep(2)
        fpry = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-steps-item-container']"
        )
        fpry[11].click()
        self.logout()

    def test_17(self):
        self.driver.find_element(By.ID, "userName").send_keys(self.customer)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(self.password)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(Keys.ENTER)
        time.sleep(5)
        self.driver.find_element(By.CLASS_NAME, "ant-menu-submenu-inline").click()
        time.sleep(1)
        self.driver.find_element(By.LINK_TEXT, "委托列表").click()
        time.sleep(1)
        self.driver.find_element(By.CLASS_NAME, "ant-pagination-next").click()
        time.sleep(3)
        fp = self.driver.find_elements(By.NAME, "查看进度")
        fp[len(fp) - 1].click()
        time.sleep(2)
        fpry = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-steps-item-container']"
        )
        fpry[11].click()
        time.sleep(1)
        self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary ant-btn-lg']"
        )[1].click()
        self.logout()

    def test_18(self):
        self.driver.find_element(By.ID, "userName").send_keys(self.qa)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(self.password)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(Keys.ENTER)
        time.sleep(5)
        self.driver.find_element(By.LINK_TEXT, "测试项目").click()
        time.sleep(1)
        self.driver.find_element(By.CLASS_NAME, "ant-pagination-next").click()
        time.sleep(5)
        fp = self.driver.find_elements(By.NAME, "查看")
        fp[len(fp) - 1].click()
        time.sleep(2)
        fpry = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-steps-item-container']"
        )
        fpry[13].click()
        time.sleep(1)
        self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary ant-btn-lg']"
        )[4].click()
        self.logout()

    def test_ex_1(self):
        self.driver.find_element(By.ID, "userName").send_keys(self.marketer)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(self.password)
        time.sleep(1)
        self.driver.find_element(By.ID, "userPassword").send_keys(Keys.ENTER)
        time.sleep(5)
        self.driver.find_element(By.LINK_TEXT, "样品").click()
        time.sleep(1)
        self.driver.find_element(By.CLASS_NAME, "ant-pagination-next").click()
        time.sleep(5)
        fp = self.driver.find_elements(By.NAME, "更新")
        fp[len(fp) - 1].click()
        time.sleep(1)
        self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-dashed ant-btn-lg']"
        )[1].click()
        time.sleep(1)
        self.driver.execute_script("var q=document.documentElement.scrollTop=0")
        time.sleep(1)
        tb = self.driver.find_elements(
            By.CSS_SELECTOR, "[class='ant-input ant-input-lg']"
        )
        for i in tb:
            i.send_keys("1")
        time.sleep(1)
        self.driver.find_element(
            By.CSS_SELECTOR, "[class='ant-btn ant-btn-primary ant-btn-lg']"
        ).click()
        self.logout()


if __name__ == "__main__":
    myTest = TestClass()
    myTest.test_1()
