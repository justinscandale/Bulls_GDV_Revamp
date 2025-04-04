import requests
from bs4 import BeautifulSoup
import pandas as pd
from sqlalchemy import create_engine

# Define headers to avoid sending unnecessary identifying information
headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en-US,en;q=0.9",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "usfweb.usf.edu",
    "Origin": "https://usfweb.usf.edu",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",  # A generic User-Agent
}

# Define the data (ensure no personal information is included)
data = {
    "P_SEMESTER": "202508",  # Semester (this is not PII)
    "P_SESSION": "",  # No session info (avoid sending session-specific data)
    "P_CAMPUS": "",  # Empty campus data (ensure no personal campus data is included)
    "P_COL": "",  # Empty college data (ensure no personal college info is included)
    "P_DEPT": "",  # Empty department data (ensure no personal department info)
    "p_status": "",  # Ensure no status info that could link to personal identity
    "p_ssts_code": "",  # Avoid any status code linking to a personal profile
    "P_CRSE_LEVL": "",  # Course level info
    "P_REF": "",  # Reference, ensure it is non-personal (e.g., a random value)
    "P_SUBJ": "",  # Subject (empty, not PII)
    "P_NUM": "",  # Course number (empty, not PII)
    "P_TITLE": "",  # Course title (empty, not PII)
    "P_CR": "",  # CR (Course Requirement, empty)
    "p_insm_x_inad": "YAD",  # Course type
    "p_insm_x_incl": "YCL",  # Include info
    "p_insm_x_inhb": "YHB",  # Inclusion info
    "p_insm_x_inpd": "YPD",  # Inclusion info
    "p_insm_x_innl": "YNULL",  # Inclusion info
    "p_insm_x_inot": "YOT",  # Inclusion info
    "p_day_x": "no_val",  # Day (ensure no personal schedule info)
    "p_day": "no_val",  # Day (ensure no personal schedule info)
    "P_TIME1": "",  # Time (empty)
    "P_INSTRUCTOR": "",  # Instructor (empty)
    "P_UGR": "",  # Undergrad info (empty)
}

# Create a session (no cookies or session data)
session = requests.Session()
session.cookies.clear()  # Clear any session cookies before making the request

# Send the POST request
url = "https://usfweb.usf.edu/DSS/StaffScheduleSearch/StaffSearch/Results"
response = session.post(url, headers=headers, data=data)

# Parse the HTML content with BeautifulSoup
soup = BeautifulSoup(response.content, "html.parser")
results = soup.find("table", {"id": "results"})
rows = results.find_all("tr")

# Create empty list to store data
data = []

for i, row in enumerate(rows):
    if i == 0:  # Skip header row
        continue
    cells = row.find_all("td")
    raw_title = cells[7].decode_contents()
    title_html = raw_title.split("<br")[0].strip()
    title = BeautifulSoup(title_html, 'html.parser').get_text()
    course_name = cells[4].text.strip()
    prefix = course_name[:3]  # First 3 characters (COP)
    number = course_name[4:]  # Everything after the space
    crn = cells[3].text.strip()
    sec = cells[5].text.strip()
    seats_available = cells[12].text.strip()
    
    # Add row to data list
    data.append({
        "course_title": title,
        "Ccurse_prefix": prefix,
        "course_number": number,
        "course_section": sec,
        "crn": crn,
        "seats_available": seats_available
    })

# Create DataFrame from data list
df = pd.DataFrame(data)

# Export to CSV
df.to_csv('data/seat_course_data.csv', index=False)

'''
CREATE TABLE course_seats (
    course_title text,
    course_prefix text,
    course_number text,
    course_section bigint,
    course_crn bigint,
    seats_available bigint
);
'''
# PostgreSQL connection details
host = 'localhost'
dbname = 'justinscandale'
user = 'justinscandale'
password = 'your_password'
port = '5432'  # Default PostgreSQL port
engine = create_engine(f'postgresql://{user}:{password}@{host}:{port}/{dbname}')
df.to_sql('course_data', con=engine, if_exists='replace', index=False)

print(f"Successfully exported {len(df)} courses to course_data.csv")
# Count how many <tr> tags are in the table
num_rows = len(rows)
print(f"Number of <tr> tags in the table: {num_rows}")
# Check the response status and content
print("Status Code:", response.status_code)
 # Display first 500 characters to ensure no sensitive info
