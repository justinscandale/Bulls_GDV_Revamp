import psycopg2
import os 
import pandas as pd
from sqlalchemy import create_engine

# PostgreSQL connection details
host = 'localhost'
dbname = 'justinscandale'
user = 'justinscandale'
password = 'your_password'
port = '5432'  # Default PostgreSQL port
engine = create_engine(f'postgresql://{user}:{password}@{host}:{port}/{dbname}')

# Path to your CSV file
df = pd.read_csv("data/Missed_Fall24.csv")

# Define the columns that should be in the table according to the DDL
valid_columns = [
    'course_prefix', 'course_num', 'instruction_type', 'crn',
    'a_num', 'b_num', 'c_num', 'd_num', 'f_num', 'i_num', 's_num', 'u_num', 'e_num', 'o_num',
    'total_grades', 'course_name', 'prof_lname', 'prof_fname', 'course_term'
]

# Drop columns that aren't in the DDL schema
columns_to_keep = [col for col in df.columns if col.lower() in valid_columns]
df = df[columns_to_keep]

df.to_sql(
    name='course_grades',
    con=engine,
    if_exists='append',
    index=False
)

# Table name in PostgreSQL
table_name = 'course_grades'

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    host=host,
    dbname=dbname,
    user=user,
    password=password,
    port=port
)

# Create a cursor object to interact with the database
cursor = conn.cursor()


cursor.execute(f"""SELECT  *
               FROM course_grades ;""")

print(cursor.fetchall())
# Commit the transaction
conn.commit()

# Close the cursor and connection
cursor.close()
conn.close()