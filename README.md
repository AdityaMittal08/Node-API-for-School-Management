# School Management API

A Node.js RESTful API designed to manage school records and sort them geographically to find the nearest schools based on a user's location via the Haversine formula.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Packages:** `express`, `mysql2`, `dotenv`

## Project Structure
`src/` is organized using a layered N-Tier architecture logic.
- `config/` Database connection configurations
- `controllers/` API request/response handlers
- `routes/` Express routing configurations
- `services/` Business logic (includes Haversine distance math)

## Setup & Installation

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the project root containing your database configs:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=your_database_db
   ```

3. **Database Initialization:**
   Use the attached `schema.sql` to initialize your database structure:
   ```bash
   mysql -u root -p DB_NAME < schema.sql
   ```

4. **Start the Application:**
   ```bash
   node index.js
   ```

## Endpoints

### 1. Add a School
- **URL:** `/api/addSchool`
- **Method:** `POST`
- **Payload:**
  ```json
  {
      "name": "Springfield Elementary",
      "address": "742 Evergreen Terrace",
      "latitude": 40.7128,
      "longitude": -74.0060
  }
  ```

### 2. List Schools (Sorted by Proximity)
- **URL:** `/api/listSchools`
- **Method:** `GET`
- **Query Params:** `latitude`, `longitude`
- **Explanation:** Parses all schools from the database and maps them against the provided query coordinates using the Haversine formula. The results are returned sorted from most proximate to least proximate.
- **Example:**
  `http://localhost:3000/api/listSchools?latitude=40.7306&longitude=-73.9352`
