Notification & Email API

A backend REST API built with **Node.js, Express, TypeScript, MongoDB, JWT, and Nodemailer** for managing user authentication, notifications, notification preferences, and email delivery.

The API provides secure authentication, protected endpoints, MongoDB persistence, HTML email templates, request validation, and email delivery through Gmail SMTP.

Features

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- User profile endpoint
- Create and retrieve notifications
- Mark notifications as read
- Notification preferences management
- Email notification delivery
- HTML email templates
- Dynamic email template variables
- Email delivery status tracking
- MongoDB persistence
- Request validation middleware
- Global error handling
- 404 route handling
- Health check endpoint
- Template allowlisting for improved security
- TypeScript strict mode

Tech Stack

Backend

- Node.js
- Express.js
- TypeScript

Database

- MongoDB
- Mongoose

Authentication & Security

- JSON Web Tokens (JWT)
- bcrypt
- Environment variables
- Protected routes
- Request validation
- Email template allowlisting

Email

- Nodemailer
- Gmail SMTP
- HTML email templates

Development Tools

- Git
- GitHub
- Postman
- Nodemon
- TypeScript Compiler

Project Structure

```text
notification-email-api/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   └── email.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── email.controller.ts
│   │   ├── notification.controller.ts
│   │   ├── notification-preference.controller.ts
│   │   └── user.controller.ts
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── not-found.middleware.ts
│   │
│   ├── models/
│   │   ├── Email.ts
│   │   ├── Notification.ts
│   │   ├── NotificationPreference.ts
│   │   └── User.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── email.routes.ts
│   │   ├── notification.routes.ts
│   │   ├── notification-preference.routes.ts
│   │   └── user.routes.ts
│   │
│   ├── services/
│   │   ├── email.service.ts
│   │   ├── notification.service.ts
│   │   ├── notification-preference.service.ts
│   │   └── user.service.ts
│   │
│   ├── templates/
│   │   ├── catering-confirmation.html
│   │   ├── notification.html
│   │   ├── password-reset.html
│   │   └── welcome.html
│   │
│   ├── utils/
│   │   ├── emailTemplate.ts
│   │   ├── generateToken.ts
│   │   ├── logger.ts
│   │   └── validators.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── tests/
├── .env
├── package.json
├── package-lock.json
└── tsconfig.json
```

Authentication

The API uses **JWT authentication**.

Users can register and log in to receive a JWT. Protected endpoints require the token in the request's `Authorization` header.

```text
Authorization: Bearer <JWT>
```

Passwords are never stored as plain text. Passwords are hashed using **bcrypt** before being saved to MongoDB.

JWT tokens are currently configured with a one-hour expiration.

API Endpoints

Authentication
Register

```http
POST /api/auth/register
```

Request:

```json
{
  "email": "test@example.com",
  "password": "TestPassword123!"
}
```

Login

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "test@example.com",
  "password": "TestPassword123!"
}
```

Returns a JWT that can be used to access protected endpoints.

---

Users

Get Profile

```http
GET /api/users/profile
```

Requires authentication.

Example response:

```json
{
  "user": {
    "id": "...",
    "email": "test@example.com"
  }
}
```

---

Notifications

Create Notification

```http
POST /api/notifications/
```

Requires authentication.

Request:

```json
{
  "title": "Test Notification",
  "message": "This is a test notification.",
  "type": "success"
}
```

Supported notification types:

```text
info
success
warning
error
```

Get Notifications

```http
GET /api/notifications/
```

Requires authentication.

Mark Notification as Read

```http
PATCH /api/notifications/:notificationId/read
```

Requires authentication.

---

### Notification Preferences

#### Get Preferences

```http
GET /api/notification-preferences/
```

Requires authentication.

Default preferences:

```json
{
  "emailNotifications": true,
  "pushNotifications": true,
  "marketingEmails": false
}
```

#### Update Preferences

```http
PATCH /api/notification-preferences/
```

Requires authentication.

Request:

```json
{
  "emailNotifications": false,
  "marketingEmails": true
}
```

Each preference must be a boolean value.

---

### Email

#### Send Email

```http
POST /api/emails/send
```

Requires authentication.

Request:

```json
{
  "recipient": "recipient@example.com",
  "subject": "Notification Email API Test",
  "message": "This is a test email."
}
```

The API records the email in MongoDB and tracks its delivery status.

Possible email statuses:

```text
pending
sent
failed
```

HTML Email Templates

The API supports reusable HTML email templates.

Available templates:

```text
welcome.html
notification.html
password-reset.html
catering-confirmation.html
```

Example request:

```json
{
  "recipient": "recipient@example.com",
  "subject": "Welcome",
  "message": "Welcome to the application!",
  "templateName": "welcome.html"
}
```

Templates can also contain dynamic variables.

For example:

```html
<h1>Hello {{name}}</h1>
```

Variables can be supplied through the API:

```json
{
  "recipient": "recipient@example.com",
  "subject": "Welcome",
  "message": "Welcome!",
  "templateName": "welcome.html",
  "templateVariables": {
    "name": "Test User"
  }
}
```

Template selection is restricted to an allowlist of approved template files to prevent arbitrary file access.

Database

The application uses **MongoDB** with **Mongoose**.

The following collections/models are used:

- `User`
- `Email`
- `Notification`
- `NotificationPreference`

User-specific resources are associated with the authenticated user's MongoDB ID.

Validation
The API validates incoming requests before they reach the controllers.

Validation includes:

- Email address format
- Required fields
- Password length
- Notification types
- Notification preference boolean values
- Email recipient format

Invalid requests return appropriate `400 Bad Request` responses.

Error Handling
The application includes centralized error handling and a 404 handler.

Example:

```json
{
  "message": "Internal server error"
}
```

Unknown routes return:

```json
{
  "message": "Route GET /unknown-route not found"
}
```

Health Check
The API includes a health-check endpoint:

```http
GET /health
```

Successful response:

```json
{
  "status": "ok",
  "message": "Notification & Email API is healthy"
}
```

Testing

The API was tested using **Postman**.

Tested functionality includes:

- User registration
- User login
- JWT authentication
- Protected profile access
- Notification creation
- Notification retrieval
- Marking notifications as read
- Notification preference creation
- Notification preference updates
- Invalid preference validation
- Plain-text email delivery
- HTML email template delivery
- Invalid template rejection

The application was also verified using the TypeScript compiler:

```bash
npm run build
```

The TypeScript build completes successfully.

Local Installation

1. Clone the repository

```bash
git clone <https://github.com/Agent610/Notification-and-Email>
```

2. Navigate into the project

```bash
cd notification-email-api
```

3. Install dependencies

```bash
npm install
```

4. Create an environment file

Create a `.env` file in the project root:

```env
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
JWT_SECRET=your-secure-jwt-secret
MONGODB_URI=mongodb://127.0.0.1:27017/notification_email_api
```

5. Start the development server

```bash
npm run dev
```

The API should start on:

```text
http://localhost:5000
```

Environment Variables

| Variable         | Description                       |
| ---------------- | --------------------------------- |
| `PORT`           | Port used by the Express server   |
| `EMAIL_USER`     | Gmail address used to send emails |
| `EMAIL_PASSWORD` | Gmail App Password                |
| `JWT_SECRET`     | Secret used to sign JWTs          |
| `MONGODB_URI`    | MongoDB connection string         |

**Never commit `.env` to GitHub.**

For Gmail, use a **Google App Password** rather than your normal Gmail password.

Available Scripts

### Development

```bash
npm run dev
```

Starts the application with Nodemon and TypeScript.

### Build

```bash
npm run build
```

Compiles the TypeScript source and copies email templates into the production build.

### Production

```bash
npm start
```

Runs the compiled application from the `dist` directory.

Deployment

This API can be deployed to a cloud hosting provider such as Render.
For deployment, configure the following environment variables in the hosting provider:

```text
PORT
EMAIL_USER
EMAIL_PASSWORD
JWT_SECRET
MONGODB_URI
```

The deployed application must use a **cloud-accessible MongoDB connection string** rather than the local MongoDB address:

```text
mongodb://127.0.0.1:27017/...
```

Email credentials and JWT secrets should be stored using the hosting provider's environment-variable system and should never be committed to the repository.

Security Considerations

The project implements several security practices:

- Passwords are hashed using bcrypt.
- Protected routes require JWT authentication.
- JWTs have an expiration time.
- User resources are scoped to the authenticated user.
- Email recipients are validated.
- Request data is validated before reaching controllers.
- Email template selection uses an allowlist.
- Environment secrets are stored outside the source code.
- `.env` should never be committed to GitHub.

Future Improvements
Potential future improvements include:

- Refresh token authentication
- Rate limiting
- Email queuing/background jobs
- Retry handling for failed emails
- Automated unit and integration tests
- API documentation with Swagger/OpenAPI
- Structured logging
- Password reset workflow
- Email verification
- Role-based authorization
- Production monitoring
- Docker support

Project Purpose

This project was built to demonstrate practical backend development skills including REST API design, authentication, database integration, email delivery, validation, security, and deployment.
It serves as a portfolio project demonstrating experience with modern JavaScript/TypeScript backend development and full API development workflows.
