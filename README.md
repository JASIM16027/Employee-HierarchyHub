# Employee-HierarchyHub


### Project Setup

#### Prerequisites
- **Node.js**: Version 18 or above.
- **MySQL**
- **Redis**
- **NestJS**
- **TypeORM**
- **bcrypt**
- **JWT**

#### Installation

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the environment variables in `.env` file:
    ```env
        NODE_ENV = development
        DB_HOST = localhost
        DB_PORT = 3306
        DB_USERNAME = root
        DB_PASSWORD = root
        DATABASE = Employee-HierarchyHub
        SYNCHRONIZE = 'true'
        DEBUG = 'true'
        AUTO_RUN_MIGRATIONS = 'true'
        REDIS_CON_URL=redis://default:root@localhost:6379
        SECRET_KEY = sfdsgdfghdfhfghkfdghfdgh
        expireTime = 5h
```
4. Set up MySQL and Redis:
   - Ensure MySQL and Redis are running.
---

#### Creating Tables

- **Users Table**: A table for managing user credentials (username, email, and password).
- **Employees Table**: A table for managing employees, including their hierarchical relationships (parent-child relationships between employees).

#### Employee API
- **POST /api/employees/resetRedisCache**: Clears the Redis cache for employee data.
  
  Example:
  ```bash
  POST /api/employees/resetRedisCache
  ```

- **GET /employees/hierarchy/:id**: Fetches the employee hierarchy for a given employee ID.
  
  Example:
  ```bash
  GET /api/employees/hierarchy/1
  ```

#### FOR JWT AUTHENTICATION API
- Below user data have been saved in users table
- **POST /auth/signin**: Authenticates a user and returns a JWT access token. The user must provide `email` and `password`.
- POST http://localhost:4000/api/auth/login
  ```bash
  POST /auth/signin
  {
    "email": "rashid@hasan.com",
    "password": "password123"
  }
  ```

---

### Redis Caching

Redis is used to cache employee data to optimize retrieval performance. The following methods interact with Redis:

1. **Fetching Data from Cache**: Employee data is first checked in Redis before querying the database.
2. **Inserting Data into Cache**: After fetching employee data from the database, it is stored in Redis for future requests.
3. **Resetting Redis Cache**: The cache can be cleared using the `resetRedisCache` endpoint to ensure fresh data is retrieved from the database.

---

### Logging

The project includes a **Central Logger** service that logs key actions, including:
- Cache hits and misses.
- Database queries and errors.
- Migration success and failure.

---

### Security Considerations

1. **Password Hashing**: User passwords are hashed using `bcrypt` before storing them in the database.
2. **JWT Authentication**: JSON Web Tokens (JWT) are used to authenticate API requests, ensuring that only authorized users can access protected endpoints.

---

### Running the Application

1. Start the application in development mode:
   ```bash
   npm run start:dev
   ```

2. The application will be available on `http://localhost:4000` by default.

---
