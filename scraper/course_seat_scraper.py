import requests
from bs4 import BeautifulSoup
import pandas as pd
from sqlalchemy import create_engine, text, Engine
import smtplib
import time
# Load env variables
import os
from dotenv import load_dotenv
load_dotenv()

def scrape_course_seats():
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
            "course_prefix": prefix,
            "course_number": number,
            "course_section": sec,
            "course_crn": crn,
            "seats_available": seats_available
        })

    # Create DataFrame from data list
    df = pd.DataFrame(data)
    return df

#TAKES DF of scraped seats and updates the course_seats table
def update_course_seats(df: pd.DataFrame, engine: Engine):
    
    #create set to store courses which should be notified
    notified_courses = set()

    # Create a connection
    with engine.connect() as connection:
        # For each row in the DataFrame
        for _, row in df.iterrows():
            # Check if the course exists and get current seats
            check_query = text("""
                SELECT course_crn, seats_available 
                FROM course_seats 
                WHERE course_crn = :crn
            """)
            result = connection.execute(check_query, {"crn": row['course_crn']}).fetchone()
            
            if result:
                # Update existing course
                current_seats = int(row['seats_available'])
                previous_seats = int(result.seats_available)
                
                # Check if seats went from <=0 to >0 AND NOTIFY USERS
                if previous_seats <= 0 and current_seats > 0:
                    notified_courses.add(int(row['course_crn']))
                    print(f"Notifying for course {row['course_title']} ({row['course_prefix']} {row['course_number']} {row['course_section']})")
                
                update_query = text("""
                    UPDATE course_seats 
                    SET course_title = :title,
                        course_prefix = :prefix,
                        course_number = :number,
                        course_section = :section,
                        seats_available = :seats
                    WHERE course_crn = :crn
                """)

                connection.execute(update_query, {
                    "title": row['course_title'],
                    "prefix": row['course_prefix'],
                    "number": row['course_number'],
                    "section": row['course_section'],
                    "seats": current_seats,
                    "crn": row['course_crn']
                })

            else:
                # Insert new course into DB
                insert_query = text("""
                    INSERT INTO course_seats 
                    (course_title, course_prefix, course_number, course_section, course_crn, seats_available)
                    VALUES (:title, :prefix, :number, :section, :crn, :seats)
                """)

                connection.execute(insert_query, {
                    "title": row['course_title'],
                    "prefix": row['course_prefix'],
                    "number": row['course_number'],
                    "section": row['course_section'],
                    "crn": row['course_crn'],
                    "seats": row['seats_available']
                })
        
        # Commit the transaction
        connection.commit()

        # Delete from saved_courses if not in current web scrape results 
        delete_saved_query = text("""
            DELETE FROM saved_courses 
            WHERE course_crn NOT IN (
                SELECT unnest(ARRAY[:crns])
            )
        """)
        connection.execute(delete_saved_query, {"crns": df['course_crn'].astype(int).tolist()})
        connection.commit()

        # Then delete from course_seats if not in current web scrape results
        delete_query = text("""
            DELETE FROM course_seats 
            WHERE course_crn NOT IN (
                SELECT unnest(ARRAY[:crns])
            )
        """)
        connection.execute(delete_query, {"crns": df['course_crn'].astype(int).tolist()})
        connection.commit()

    print(f"Successfully processed {len(df)} courses")

    return notified_courses

def notify_users(notified_courses: set, engine: Engine):
    if not notified_courses:
        print("No courses to notify")
        return

    with engine.connect() as connection:

        saved_courses_query = text("""
            SELECT sc.course_crn, cs.course_title, cs.course_prefix, cs.course_number, cs.course_section, cs.seats_available, array_agg(u.email) as emails
            FROM saved_courses sc
            JOIN users u ON sc.user_id = u.id
            JOIN course_seats cs ON sc.course_crn = cs.course_crn
            WHERE sc.course_crn in (
                SELECT unnest(ARRAY[:crns])
            )
            GROUP BY sc.course_crn, cs.course_title, cs.course_prefix, cs.course_number, cs.course_section, cs.seats_available
        """)
        
        saved_courses_to_notify = connection.execute(saved_courses_query, {"crns": list(notified_courses)}).fetchall()

        #send emails to users
        for course in saved_courses_to_notify:
            send_email(course.emails, course.course_title, course.course_prefix, course.course_number, course.course_section, course.seats_available)

def send_email(emails: list[str], course_title: str, course_prefix: str, course_number: str, course_section: str, seats_available: int):
    # Create a connection to the email server
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(os.getenv("EMAIL_USER"), os.getenv("EMAIL_PASSWORD"))

    # Create a message
    message = f"Subject: Course Seat Alert\n\nThe course {course_title} ({course_prefix} {course_number} {course_section}) has {seats_available} seats available."
    
    for email in emails:
        server.sendmail(os.getenv("EMAIL_USER"), email, message)
        print(f"Sent email to {email} - for - {course_title}")

    server.quit()


if __name__ == "__main__":
    while True:
        df = scrape_course_seats()
        engine = create_engine(f'postgresql://{os.getenv("DB_USER")}:{os.getenv("DB_PASSWORD")}@{os.getenv("DB_HOST")}:{os.getenv("DB_PORT")}/{os.getenv("DB_NAME")}')
        notified_courses = update_course_seats(df, engine)
        notify_users(notified_courses, engine)
        print("Sleeping for 60 seconds")
        time.sleep(60)
        print("Waking up")