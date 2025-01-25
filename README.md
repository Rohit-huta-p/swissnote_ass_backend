# SwissNote Assignment Backend

Backend service for the SwissNote Assignment, providing robust API endpoints for event management and user authentication.

## Deployed Link
[SwissNote Backend API](your-backend-deployment-url)

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
- Book/unbook events

## Tech Stack
- **Backend:** Node.js/Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Validation:** Joi/Express Validator

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
- `/api/auth/register`
- `/api/auth/login`
- `/api/events`
- `/api/events/:id`

## Environment Configuration
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT token generation
- `PORT`: Server port

## Testing
```bash
npm test
```

## Deployment
Deployable on Heroku, DigitalOcean, or similar platforms

## Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create pull request

## License
MIT License

## Contact
[Your Name] - [Your Email]

Project Link: [Backend Repository URL]
