### Predusk Assesment
This project demonstrates a decoupled architecture using Node.js/TypeScript for the backend and React for the frontend, with a serverless TiDB (MySQL) database.

**For Live Link : Since I am using free tier it will take 15 min for database to start up and 5-6 min for backend"**

##### Live Links
- Frontend: https://preduskassesment-frontend.onrender.com
- Backend API: https://preduskassesment-backend.onrender.com/api/v1

My Resume: https://drive.google.com/file/d/1kruOhNkGl6O8Q-QTUo_-lzIcTk4RwCtz/view?usp=sharing

<img width="1744" height="600" alt="image" src="https://github.com/user-attachments/assets/d6395018-60e7-4247-bbfc-468bf16f41c6" />

#### Architecture
The system follows a Separation of Concerns (SoC) principle:
- Presentation Layer: React.js static site hosted on Render (CDN).
- Service Layer: Express.js Web Service on Render (Node.js).
- Data Access Layer: Sequelize ORM with Dependency Injection (tsyringe).
- Persistence Layer: TiDB Cloud (Serverless MySQL) with SSL encryption.

#### Tech Stack
- Frontend: React, Axios, React-Router.
- Backend: Node.js, Express, TypeScript, Tsyringe (DI), Sequelize.
- Database: TiDB Cloud (MySQL compatible).
- Security: Rate Limiting (express-rate-limit).

#### Database Schema
The database uses a One-to-Many relationship architecture:

Users: Core profile data (Name, Email, Links).

Education: 1:N relationship with User (Institution, Degree, Dates).

WorkHistory: 1:N relationship with User (Company, Role, Description).

Projects: 1:N relationship with User (Title, Links).

#### Setup Instructions
Local Setup
- Clone & Install:

  ```Bash
  
  git clone <repo-url>
  cd Backend && npm install
  cd ../Frontend && npm install
  Database: Create a MySQL DB and update .env with DB_HOST, DB_USER, DB_PASS, and DB_PORT=4000 (for TiDB).
  ```

Run Migrations:

  ```bash
  npx sequelize-cli db:migrate
  ```


Start Dev Mode:

  ###### Backend
  ```bash
  npm run dev
  ```
  ###### Frontend
  ```bash
  npm start
  ```

You can dump these data to see something on frontend : 

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "skills": ["TypeScript", "Node.js"],
  "education": [{"institution": "Stanford", "degree": "MSCS"}],
  "workHistory": [{"company": "Tech Inc", "position": "Dev"}],
  "projects": [{"title": "AI Engine", "description": "Llama 3 base"}]
}
```

#### Known Limitations
- Cold Starts: Since I am using Render's Free Tier, the backend may take 30-50 seconds to "wake up" after 15 minutes of inactivity.

- Image Uploads: Currently supports image links only (no binary storage like S3 yet).

- Rate Limit: API is limited to 100 requests per 15 minutes per IP for security.

- Auth : Authnetication  , Authorization and RBAC support 
