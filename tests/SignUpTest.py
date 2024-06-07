import time

from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Safari()
driver.maximize_window()

driver.get("https://add-recipe-frontend-ashen.vercel.app/signup") #going to a specific URL

# ID, XPath, CSSSelectior, name, linkText
#Xpath: //tagname[@attribute='value]
#CSSSelectior: tagname[attribute='value']
#if there are multiple input with same class name, you can use index. Eg: driver.find_element(By.XPATH, "(//input[@type='password'])[2]").send_keys('<password>')

#With correct login details
driver.find_element(By.XPATH, "//input[@type='text']").send_keys('Badri')
driver.find_element(By.XPATH, "//input[@type='email']").send_keys('badri@badri.com')
driver.find_element(By.XPATH, "//input[@type='password']").send_keys('<password>')
driver.find_element(By.XPATH, "//input[@placeholder='Retype Password']").send_keys('<password>')

driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()



##With wrong sign-up details (wrong email ID)
# driver.find_element(By.XPATH, "//input[@type='text']").send_keys('Badri')
# driver.find_element(By.XPATH, "//input[@type='email']").send_keys('badri@badri.com')
# driver.find_element(By.XPATH, "//input[@type='password']").send_keys('<password>')
# driver.find_element(By.XPATH, "//input[@placeholder='Retype Password']").send_keys('<password>')
# error = driver.find_element(By.CLASS_NAME, "error-message").text
# print(error)
# driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()






time.sleep(10)