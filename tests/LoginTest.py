import time

from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Safari()
driver.maximize_window()

driver.get("https://add-recipe-frontend-ashen.vercel.app/") #going to a specific URL

# ID, XPath, CSSSelectior, name, linkText
#Xpath: //tagname[@attribute='value]
#CSSSelectior: tagname[attribute='value']

#With correct login details
driver.find_element(By.XPATH, "//input[@type='email']").send_keys('test@test.com')
driver.find_element(By.XPATH, "//input[@type='password']").send_keys('<password>')
driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()


##With wrong login details (wrong email ID)
# driver.find_element(By.XPATH, "//input[@type='email']").send_keys('test@test1.com')
# driver.find_element(By.XPATH, "//input[@type='password']").send_keys('<password>')
# driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
# error = driver.find_element(By.CLASS_NAME, "error-message").text
# print(error)
# assert "Error" in error






time.sleep(10)