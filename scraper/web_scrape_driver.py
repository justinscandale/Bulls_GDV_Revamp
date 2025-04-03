from scraper_grade_distributions import parse_grade_dist_page
from utils import _MISSED_PREFIXES, file_exists

# Load env variables
import os
from dotenv import load_dotenv
load_dotenv()

# Import necessary libraries from selenium / webdriver
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import time

'''
ex call
scrape_grade_dist([("Fall 2024", "fall2024"), ("Spring 2024", "spring2024")])
'''
def scrape_grade_dist(course_term:list[tuple],):
    # Set up the Service for ChromeDriver
    service = Service(ChromeDriverManager().install())

    # Initialize the WebDriver with the Service object
    driver = webdriver.Chrome(service=service)

    # Step 1: Open Google
    driver.get(os.getenv("SCRAPE_URL"))

    # Stall driver until loaded & input email
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "i0116")))
    email_input = driver.find_element(By.ID, "i0116")
    email_input.send_keys(os.getenv("EMAIL"))
    submit_button = driver.find_element(By.ID, "idSIButton9")
    submit_button.click()

    #stall driver until loaded & input password
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "i0118")))
    password_input = driver.find_element(By.ID, "i0118")
    password_input.send_keys(os.getenv("PASSWORD"))
    time.sleep(2)
    submit_button = driver.find_element(By.ID, "idSIButton9")
    submit_button.click()

    # Step 3: ALlow manual sign in
    input("Press enter when ready")
    for course_term in course_term:
        
        for prefix in _MISSED_PREFIXES:

            #Skip the prefix if already has been scraped
            if file_exists(f"html_clone/{course_term[1]}/{prefix}.html"):
                continue

            #make sure on right page
            driver.get(os.getenv("SCRAPE_URL"))

            time.sleep(2)

            #Find dropdown
            dropdown = driver.find_element(By.ID, "ctl00_ContentPlaceHolder1_MainContentPanel1_paramentry1_dd_termid")
            #Sleect drop down
            select = Select(dropdown)
            #Select option
            select.select_by_visible_text(f"{course_term[0]}") #Change this depending on what term to search

            #Find course prefix area
            input_course_prefix = driver.find_element(By.ID,"ctl00_ContentPlaceHolder1_MainContentPanel1_paramentry1_txt_crspre")
            input_course_prefix.send_keys(prefix)

            time.sleep(2)

            #find submut button
            submit_button = driver.find_element(By.ID, "ctl00_ContentPlaceHolder1_MainContentPanel1_paramentry1_btn_submit")
            submit_button.click()

            WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.ID, "ctl00_ContentPlaceHolder1_MainContentPanel1_pnl_reportpanel")))

            #Wait to ensure all dyncamic content loaded
            time.sleep(3)

            html_source = driver.page_source
            with open(f"html_clone/{course_term[1]}/{prefix}.html", "w", encoding="utf-8") as file:
                file.write(html_source)

            print(f"Succesfully scraped {prefix}")

    driver.quit()

if __name__ == "__main__":
    scrape_grade_dist([("Summer 2024", "summer2024"), ("Spring 2024", "spring2024")])