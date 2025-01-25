# SwissNote Assignment Backend

Backend service for the SwissNote Assignment, providing robust API endpoints for event management and user authentication.

## Deployed Link
[SwissNote Backend API](https://swissnote-ass-backend.onrender.com)

## Features
### 1. Authentication Endpoints
- User registration
- User login
- User logout
- Token-based authentication

### 2. Event Management
- Create events
- Read/list events
- Update event details
- Delete events
- Book events

## Tech Stack
- **Backend:** Node.js/Express.js
- **Database:** MongoDB
- **Authentication:** JWT

## Prerequisites
- Node.js (v14+)
- MongoDB

## How to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/swissnote-backend.git
   ```

2. Navigate to project directory:
   ```bash
   cd swissnote-backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create `.env` file with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

5. Start the server:
   ```bash
   npm start
   ```

## API Endpoints
- `/api/user/signup`
- `/api/user/login`
- `/api/event.`

## Environment Configuration
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT token generation
- `PORT`: Server port

## Testing
```bash
npm test
```


## Contact
[Rphit Hutagonna] - [vcrohithuta.p@gmail.com]

Project Link: [https://github.com/Rohit-huta-p/swissnote_ass_backend]
