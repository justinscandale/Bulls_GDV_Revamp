from bs4 import BeautifulSoup
from pandas import DataFrame
import requests 

import os
from dotenv import load_dotenv
load_dotenv()


# Parses the professor / course info page
def parse_professor_page(link):
    '''
Parameters:
Extension to link for scraping  
-> String

Return:
Course_Name, Prof_last_name, Prof_first_name
-> Tuple
'''
    #Create full link to scrape
    full_link = os.getenv("PROF_URL") + "/" + link

    try:
        #Make request & Check if succesful
        response = requests.get(full_link)
        response.raise_for_status() #Raises HTTP error for bad responses

        soup = BeautifulSoup(response.content, "html.parser")

        course_name = soup.find('span', id='lbl_coursetitle').get_text()

        prof_table = soup.find('table', id ='gv_faculty_listing')

        prof_rows = prof_table.find_all("td")

        last_name = prof_rows[0].get_text()
        first_name = prof_rows[1].get_text()

        return course_name, last_name, first_name

    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        return []

    except Exception as e:
        print(f"ERROR ON PRASE_GRADE_DIST: {e}")
        return []