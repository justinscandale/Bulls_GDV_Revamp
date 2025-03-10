from bs4 import BeautifulSoup
from pandas import DataFrame
import requests 
import scraper_professors
from utils import _course_data, _COURSE_PREFIXES, save_to_csv
import os

# Parses the grade distribution page
def parse_grade_dist_page(file, term):
    '''
Parameters:
Full link for page with grade dist data
-> String

Return:
Pandas Datafram 
(Course_Prefix, Course_Num, Instruction_Type, CRN, A_Num, B_Num, C_Num, D_Num, F_Num, I_Num, S_Num, U_Num, W_Num, O_Num, Total_Grades + Prof_Scraper Content)

-> Tuple
    '''
    try:
        #Make request & Check if succesful
        with open(file, 'r') as file:
            html_content = file.read()

        #Parse page with beautifulsoup
        soup = BeautifulSoup(html_content, 'html.parser')

        #Dataframe to store scraped data
        #df = DataFrame()

        # Iterate through the rows of the table & extract columns
        rows = soup.find_all('tr')

        #List to store all dicts of course data by row
        row_data = []

        for i, row in enumerate(rows):
            
            course_data =  _course_data.copy()

            if i > 16:  #Skips to content 
                #Boolean to check if row is valid to be stored
                is_valid_row = True

                cols = row.findAll('td')

                #Skip logic for empty rows
                if not cols: is_valid_row = False

                for j, col in enumerate(cols):

                    if not is_valid_row:
                        break

                    match j:
                        case 0:
                            course_info = col.get_text().split()
                            if len(course_info) != 3 or course_info[2][-1]!=')':
                                is_valid_row = False
                            else:
                                course_href = col.find('a',href=True).get('href')
                                course_name, prof_last_name, prof_first_name = scraper_professors.parse_professor_page(course_href)
                                print(course_href)
                                course_data['Course_Name'] = course_name
                                course_data['Prof_Fname'] = prof_first_name
                                course_data['Prof_Lname'] = prof_last_name

                                course_data["Course_Prefix"] = course_info[0][0:3]
                                course_data["Course_Num"] = course_info[0][4:8]
                                course_data["Instruction_Type"] = course_info[1][-1]
                                course_data["CRN"] = course_info[2][1:6]  
                                course_data["Term"] = term

                        case 1:
                            course_data["A_Num"] = col.get_text()
                        case 3:
                            course_data["B_Num"] = col.get_text()
                        case 5:
                            course_data["C_Num"] = col.get_text()
                        case 7:
                            course_data["D_Num"] = col.get_text()
                        case 9:
                            course_data["F_Num"] = col.get_text()
                        case 11:
                            course_data["I_Num"] = col.get_text()
                        case 13:
                            course_data["S_Num"] = col.get_text()
                        case 15:
                            course_data["U_Num"] = col.get_text()
                        case 17:
                            course_data["W_Num"] = col.get_text()
                        case 19:
                            course_data["O_Num"] = col.get_text()
                        case 21:
                            course_data["Total_Grades"] = col.get_text()
               
               #TRANSLATE THIS IF TO AN ADD TO DF
                if is_valid_row:        
                    row_data.append(course_data)

        #Dataframe to store results
        df = DataFrame(row_data)
        return df 
       
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        return DataFrame([])

    except Exception as e:
        print(f"ERROR ON PRASE_GRADE_DIST: {e}")
        return DataFrame([])

if __name__ == "__main__":

    #Iterate through all files in html_clone folder
    for file in os.listdir("./html_clone/summer24"):

        try:
            print("Parsing file  " + file)
            file = "html_clone/summer24/" + file
            output = parse_grade_dist_page(file, "202405")
            save_to_csv(output, "Su24.csv")
            
        except:
            print("ERROR ON PARSE_GRADE_DIST")
            continue
        