import psycopg2

# PostgreSQL connection details
host = 'localhost'
dbname = 'justinscandale'
user = 'justinscandale'
password = 'your_password'
port = '5432'  # Default PostgreSQL port

# Path to your CSV file
csv_file_path = 'data/24fall/cop'

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

# # Open the CSV file and use COPY command to load data into the table
# with open(csv_file_path, 'r') as f:
#     # Skip the header row of the CSV file if necessary
#     next(f)  # Uncomment this line if your CSV has a header row
#     cursor.copy_from(f, table_name, sep=',', null='')  # Adjust 'sep' if necessary

lname = input("Enter prof lname:   ").title()

cursor.execute(f"""SELECT  prof_lname, course_prefix, course_num, sum(a_num), sum(b_num), sum(total_grades) 
               FROM course_grades 
               WHERE prof_lname = '{lname}'
               GROUP BY course_prefix, course_num, prof_lname;""")

print(cursor.fetchall())
# Commit the transaction
conn.commit()

# Close the cursor and connection
cursor.close()
conn.close()