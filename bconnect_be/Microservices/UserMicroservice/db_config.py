import os
DB_CONFIG = os.environ.get('DB_CONFIG', 'mysql+pymysql://root:PASSWORD@localhost:3306/bconnect_db')
