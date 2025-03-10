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
df = pd.read_csv("data/seat_course_data.csv")

df.to_sql(
    name='course_seats',
    con=engine,
    if_exists='replace',
    index=False
)

# Table name in PostgreSQL
table_name = 'course_seats'

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
               FROM course_seats ;""")

print(cursor.fetchall())
# Commit the transaction
conn.commit()

# Close the cursor and connection
cursor.close()
conn.close()