import psycopg2

conn = psycopg2.connect(
    dbname='postgres',
    user='postgres',
    password='JESSAP2025!',
    host='classsync.cqjmisgym9uj.us-east-1.rds.amazonaws.com',
    port='5432'
)

conn.autocommit = True
cur = conn.cursor()
cur.execute("CREATE DATABASE classsync;")
cur.close()
conn.close()

print("Database 'classsync' created successfully!")
