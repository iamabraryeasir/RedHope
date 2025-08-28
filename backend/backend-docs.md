# 🩸 RedHope - Blood Donation Management System

**RedHope** is a comprehensive blood donation management system built with Node.js, Express, TypeScript, and MongoDB. The platform connects blood donors with those in need, facilitating efficient blood donation coordination across different locations.

## 🚀 Features

- **User Management**: Registration, authentication, and profile management for donors
- **Blood Request System**: Create, manage, and respond to blood requests
- **Smart Matching**: Connect blood donors with compatible requests
- **Real-time Analytics**: Admin dashboard with comprehensive statistics
- **Geographic Coverage**: Location-based filtering and search
- **Role-based Access**: Admin and donor roles with appropriate permissions
- **Email Integration**: Automated notifications and password reset
- **OTP Verification**: Secure user verification system
- **Rate Limiting**: Built-in API rate limiting for security
- **Data Validation**: Comprehensive input validation with Zod

## 🛠️ Tech Stack

### Backend Technologies
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Caching**: Redis
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Email Service**: Nodemailer (SMTP)
- **Template Engine**: EJS (for email templates)
- **Validation**: Zod
- **HTTP Client**: Built-in Express features

### Middleware & Security
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security headers
- **Compression**: Response compression
- **Rate Limiting**: Express rate limit
- **Cookie Parser**: Cookie handling
- **Input Validation**: Request validation middleware

### Development Tools
- **Development Server**: ts-node-dev
- **Build Tool**: TypeScript Compiler with EJS template copying
- **Code Formatting**: Prettier
- **File Operations**: cpx2 for copying template files
- **Clean Build**: rimraf for cleaning dist directory

## 📂 Project Structure

```
src/
├── app.ts                    # Express application setup
├── server.ts                 # Server initialization and shutdown handling
├── config/                   # Configuration files
│   ├── index.ts             # Environment variables and configuration
│   └── redis.config.ts      # Redis connection configuration
├── constants.ts             # Application constants
├── errorHelpers/            # Error handling utilities
│   ├── AppError.ts          # Custom error class
│   ├── handleCastError.ts   # MongoDB cast error handler
│   ├── handleDuplicateError.ts # MongoDB duplicate key error handler
│   ├── handleMongooseValidationError.ts # Mongoose validation error handler
│   └── handleZodValidationError.ts # Zod validation error handler
├── interfaces/              # TypeScript interfaces and types
├── lib/                     # External library configurations
│   ├── express_rate_limit.ts # Rate limiting configuration
│   └── mongoose.ts          # MongoDB connection setup
├── middlewares/             # Express middlewares
│   ├── checkAuth.middleware.ts # Authentication middleware
│   ├── globalErrorHandler.middleware.ts # Global error handling
│   ├── routeNotFound.middleware.ts # 404 handler
│   └── validateRequest.middleware.ts # Request validation
├── modules/                 # Feature modules
│   ├── admin/              # Admin functionality
│   ├── auth/               # Authentication system
│   ├── blood-request/      # Blood request management
│   ├── otp/                # OTP verification system
│   ├── phone-access-log/   # Phone number access logging
│   └── user/               # User management
├── routes/                 # API routes
│   └── v1/                # Version 1 API routes
└── utils/                  # Utility functions
    ├── QueryBuilder.ts      # Advanced query building for MongoDB
    ├── catchAsync.ts        # Async error handling wrapper
    ├── jwt.ts               # JWT token utilities
    ├── seedAdmin.ts         # Admin user seeding
    ├── sendEmail.ts         # Email sending utilities
    ├── sendResponse.ts      # Standardized API responses
    ├── setCookie.ts         # Cookie management
    ├── userTokens.ts        # User token management
    └── templates/           # Email templates (EJS)
        ├── forgotPassword.ejs # Password reset email template
        └── otp.ejs          # OTP verification email template
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v5.0 or higher)
- Redis (v6.0 or higher)
- SMTP email service credentials

### 1. Clone the Repository
```bash
git clone <repository-url>
cd RedHope/backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=DEVELOPMENT
WHITELIST_ORIGINS=http://localhost:3000,http://localhost:5173

# Admin Credentials
ADMIN_EMAIL=admin@redhope.com
ADMIN_PASSWORD=admin123

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/redhope
MONGODB_NAME=redhope
MONGODB_APP_NAME=RedHope

# JWT Configuration
JWT_ACCESS_SECRET=your-access-token-secret
JWT_ACCESS_EXPIRE=7d
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_REFRESH_EXPIRE=30d
JWT_RESET_PASSWORD_SECRET=your-reset-password-secret

# Password Encryption
BCRYPT_SALT_ROUND=10

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=RedHope <noreply@redhope.com>

# Redis Configuration
REDIS_USERNAME=
REDIS_PASSWORD=
REDIS_HOST=localhost
REDIS_PORT=6379

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 4. Start the Services
Ensure MongoDB and Redis are running on your system.

### 5. Run the Application
```bash
# Development mode
npm run dev

# Production build (if you have build scripts)
npm run build
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api/v1
```

### 🔍 Query Parameters

Many GET endpoints support advanced filtering, searching, sorting, and pagination through query parameters powered by the QueryBuilder utility:

#### Filtering
```
GET /api/v1/users?bloodGroup=O+&district=Dhaka&availabilityStatus=AVAILABLE
```

#### Searching
```
GET /api/v1/users?searchTerm=john
GET /api/v1/requests?searchTerm=emergency
```

#### Sorting
```
GET /api/v1/requests?sort=-createdAt        # Descending by creation date
GET /api/v1/users?sort=name                 # Ascending by name
GET /api/v1/requests?sort=-urgency,createdAt # Multiple fields
```

#### Field Selection
```
GET /api/v1/users?fields=name,email,bloodGroup
GET /api/v1/requests?fields=-password,-__v  # Exclude fields
```

#### Pagination
```
GET /api/v1/users?page=2&limit=10
GET /api/v1/requests?page=1&limit=20
```

#### Combined Example
```
GET /api/v1/users?bloodGroup=O+&district=Dhaka&searchTerm=john&sort=-lastDonatedAt&page=1&limit=10&fields=name,email,bloodGroup,phoneNumber
```

### 🔐 Authentication Endpoints (`/auth`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/auth/login` | User login | Public |
| POST | `/auth/refresh-token` | Refresh access token | Public |
| POST | `/auth/logout` | User logout | Public |
| POST | `/auth/change-password` | Change user password | Protected |
| POST | `/auth/forgot-password` | Request password reset | Public |
| POST | `/auth/reset-password` | Reset password with token | Public |

### 👤 User Endpoints (`/users`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/users/register` | Register new user | Public |
| GET | `/users/me` | Get current user profile | Protected |
| GET | `/users` | Get all donors with filters | Protected |
| PATCH | `/users` | Update user profile | Protected |
| GET | `/users/:id` | Get single user profile | Protected |
| GET | `/users/:id/contact` | Get user phone number | Protected |

### 🩸 Blood Request Endpoints (`/requests`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/requests` | Create new blood request | Protected |
| GET | `/requests` | Get blood requests with filters | Protected |
| GET | `/requests/admin/all` | Get all requests (admin view) | Admin |
| GET | `/requests/:id` | Get single blood request | Protected |
| PATCH | `/requests/:id` | Edit pending blood request | Protected |
| PATCH | `/requests/:id/status` | Update request status | Protected |
| PATCH | `/requests/:id/reject` | Reject blood request | Admin |
| POST | `/requests/:id/respond` | Respond to blood request | Protected |
| DELETE | `/requests/:id/respond` | Withdraw response | Protected |
| GET | `/requests/:id/responders` | Get request responders | Protected |
| PATCH | `/requests/:id/match/:userId` | Match donor to request | Protected |

### 🔢 OTP Endpoints (`/otp`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/otp/send` | Send OTP to phone/email | Public |
| POST | `/otp/verify` | Verify OTP code | Public |

### 📊 Admin Endpoints (`/admin`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/admin/analytics/dashboard` | Get dashboard analytics | Admin |

## 📊 Data Models

### User Schema
```typescript
{
  name: string;
  role: 'ADMIN' | 'DONOR';
  email: string;
  profileImageUrl?: string;
  phoneNumber: string;
  password: string; // encrypted
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  dateOfBirth: Date;
  district: string;
  city: string;
  thana?: string;
  lastDonatedAt?: Date;
  donationHistory?: Array<{
    date: Date;
    location: string;
    recipientId?: string;
  }>;
  availabilityStatus: 'AVAILABLE' | 'NOT_AVAILABLE' | 'RECOVERING' | 'PERMANENTLY_UNFIT';
  isVerified: boolean;
  isDeleted: boolean;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Blood Request Schema
```typescript
{
  createdBy: ObjectId; // User reference
  patientName: string;
  bloodGroup: BloodGroup;
  unitsNeeded: number; // 1-6
  urgency: 'LOW' | 'NORMAL' | 'HIGH' | 'EMERGENCY';
  reasonOfRequest: string;
  
  hospitalName: string;
  hospitalAddress: string;
  hospitalCity: string;
  hospitalDistrict: string;
  
  contactPhone: string;
  altContactPhone?: string;
  
  neededBy: Date;
  expiresAt?: Date; // Auto-calculated (48h after neededBy)
  
  status: 'PENDING' | 'APPROVED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED' | 'MATCHED' | 'EXPIRED';
  reasonOfRejection?: string;
  
  matchedDonor?: ObjectId; // User reference
  responders: ObjectId[]; // Array of User references
  
  createdAt: Date;
  updatedAt: Date;
}
```

### Phone Access Log Schema
```typescript
{
  userId: ObjectId; // User whose phone was accessed
  requesterId: ObjectId; // User who accessed the phone number
  ip: string; // IP address of the requester
  createdAt: Date;
  updatedAt: Date;
}
```

> **Security Feature**: The Phone Access Log module automatically tracks whenever a user's phone number is accessed through the `/users/:id/contact` endpoint. This provides an audit trail for phone number access, helping to prevent abuse and maintain user privacy.

## 🔒 Authentication & Authorization

### JWT Token System
- **Access Token**: Short-lived (7 days) for API access
- **Refresh Token**: Long-lived (30 days) for token renewal
- **Reset Token**: For password reset functionality

### Role-based Access Control
- **ADMIN**: Full system access, analytics, user management
- **DONOR**: Standard user features, create/respond to requests

### Security Features
- Password hashing with bcryptjs
- JWT token validation
- Rate limiting (100 requests per 15 minutes)
- CORS protection with whitelist
- Security headers with Helmet
- Input validation and sanitization
- Error handling without sensitive data exposure

## 📈 Analytics Dashboard

The admin analytics endpoint provides comprehensive statistics:

```json
{
  "totals": {
    "users": 150,
    "requests": 75,
    "matched": 45,
    "fulfilled": 38
  },
  "bloodGroups": {
    "users": [
      { "bloodGroup": "O+", "count": 35 },
      { "bloodGroup": "A+", "count": 28 }
    ],
    "requests": [
      { "bloodGroup": "O+", "count": 15 },
      { "bloodGroup": "A+", "count": 12 }
    ]
  },
  "today": {
    "requestsCreated": 5,
    "requestsMatched": 3,
    "requestsFulfilled": 2,
    "requestsCancelled": 1
  }
}
```

## 🚦 Error Handling

### Standardized Error Response
```json
{
  "statusCode": 400,
  "success": false,
  "message": "Validation failed",
  "data": null
}
```

### Error Types Handled
- **Validation Errors**: Zod schema validation failures
- **Authentication Errors**: Invalid or expired tokens
- **Authorization Errors**: Insufficient permissions
- **Database Errors**: MongoDB operation failures
- **Cast Errors**: Invalid ObjectId format
- **Duplicate Key Errors**: Unique constraint violations

## 🔄 API Response Format

All API responses follow a consistent format:

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ },
  "meta": { /* pagination info (if applicable) */ }
}
```

## 🧪 Development

### Available Scripts
```bash
npm run dev    # Start development server with hot reload
npm run build  # Build TypeScript to JavaScript and copy EJS templates
npm start      # Start production server from built files
npm run clean  # Clean the dist directory
```

### Key Dependencies
- **Express.js 5.1.0**: Latest Express framework
- **Mongoose 8.17.1**: MongoDB object modeling
- **Redis 5.8.2**: Redis client for caching
- **Zod 4.0.17**: TypeScript-first schema validation
- **Nodemailer 7.0.5**: Email sending functionality
- **EJS 3.1.10**: Template engine for email templates

### Code Style
- TypeScript for type safety
- Prettier for code formatting
- Modular architecture with separation of concerns
- Comprehensive error handling
- Input validation on all endpoints

## 🚀 Deployment

### Vercel Deployment

The application is configured for deployment on Vercel using the included `vercel.json` configuration.

#### Vercel Configuration
```json
{
    "version": 2,
    "builds": [
        {
            "src": "src/server.ts",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "/src/server.ts"
        }
    ]
}
```

#### Deployment Steps
1. **Install Vercel CLI**: `npm i -g vercel`
2. **Build the project**: `npm run build`
3. **Deploy to Vercel**: `vercel --prod`
4. **Configure environment variables** in Vercel dashboard

#### Required Build Scripts
```json
{
  "scripts": {
    "start": "node ./dist/server.js",
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc && npx cpx2 \"src/**/*.ejs\" dist/",
    "clean": "rimraf dist"
  }
}
```

### Environment Setup
1. Set `NODE_ENV=PRODUCTION`
2. Configure production database URLs (MongoDB Atlas recommended)
3. Set up proper CORS origins
4. Configure production email service
5. Set secure JWT secrets
6. Configure Redis for production (Redis Cloud recommended)

### Production Considerations
- Enable trust proxy for reverse proxies
- Set up proper logging
- Configure health checks
- Set up monitoring and alerting
- Implement database backups
- Use environment-specific configurations
- Ensure EJS templates are properly copied during build

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for saving lives through blood donation**
