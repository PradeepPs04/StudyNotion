# StudyNotion

A full-stack online learning platform that enables instructors to create and manage courses while allowing students to browse, enroll, and learn from courses. Built with React and Node.js.

## 🚀 Features

### For Students
- User authentication (Sign up, Login, Password Reset)
- Browse and search courses
- Course catalog with categories
- View detailed course information
- Add courses to cart
- Secure payment integration (Razorpay)
- Enroll in courses
- Track course progress
- Watch course videos
- Rate and review courses
- User profile management

### For Instructors
- Create and manage courses
- Add course sections and subsections
- Upload course content (videos, materials)
- Track enrolled students
- View course analytics
- Edit and update courses
- Instructor dashboard

### General Features
- Responsive design with Tailwind CSS
- Secure authentication with JWT
- File upload with Cloudinary integration
- Email verification
- Contact form
- Protected routes
- Role-based access control (Student/Instructor)

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Routing
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **Chart.js** - Data visualization
- **React Hot Toast** - Notifications
- **Video React** - Video player

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - File storage
- **Razorpay** - Payment gateway
- **Nodemailer** - Email service
- **Express File Upload** - File handling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance like MongoDB Atlas)
- Git

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PradeepPs04/StudyNotion
   cd StudyNotion
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

## ⚙️ Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=4000

# Database
MONGODB_URL=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary (for file uploads)
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

# Razorpay (for payments)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret

# Email Configuration (for Nodemailer)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_email_password
MAIL_FROM=your_email@gmail.com

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

## 🚀 Running the Application

### Development Mode

Run both frontend and backend concurrently:
```bash
npm run dev
```

This will start:
- Frontend server on `http://localhost:3000`
- Backend server on `http://localhost:4000`

### Run Separately

**Frontend only:**
```bash
npm start
```

**Backend only:**
```bash
npm run server
```

### Production Build

Build the frontend for production:
```bash
npm run build
```

## 📁 Project Structure

```
StudyNotion/
├── public/                 # Static files
├── server/                 # Backend code
│   ├── config/            # Configuration files
│   │   ├── database.js
│   │   ├── cloudinary.js
│   │   └── razorpay.js
│   ├── controllers/       # Route controllers
│   │   ├── Auth.js
│   │   ├── Course.js
│   │   ├── Profile.js
│   │   ├── Payments.js
│   │   └── ...
│   ├── routes/            # API routes
│   ├── models/            # Database models
│   └── index.js           # Server entry point
├── src/                   # Frontend code
│   ├── components/        # React components
│   ├── Pages/            # Page components
│   ├── App.js            # Main App component
│   └── index.js          # React entry point
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/sendotp` - Send OTP for email verification
- `POST /api/v1/auth/changePassword` - Change password

### Profile
- `GET /api/v1/profile/getUserDetails` - Get user details
- `PUT /api/v1/profile/updateProfile` - Update profile
- `DELETE /api/v1/profile/deleteAccount` - Delete account

### Courses
- `POST /api/v1/course/createCourse` - Create course (Instructor)
- `GET /api/v1/course/getAllCourses` - Get all courses
- `GET /api/v1/course/getCourseDetails` - Get course details
- `PUT /api/v1/course/editCourse` - Edit course (Instructor)
- `DELETE /api/v1/course/deleteCourse` - Delete course (Instructor)

### Payments
- `POST /api/v1/payment/capturePayment` - Capture payment
- `POST /api/v1/payment/verifyPayment` - Verify payment
- `POST /api/v1/payment/sendPaymentSuccessEmail` - Send payment confirmation

### Cart
- `POST /api/v1/cart/addToCart` - Add course to cart
- `GET /api/v1/cart/getAllCartItems` - Get cart items
- `DELETE /api/v1/cart/removeFromCart` - Remove from cart

## 🎨 UI/UX Features

- Modern and responsive design
- Dark theme support
- Interactive course cards
- Video player with progress tracking
- Real-time notifications
- Loading states and error handling
- Form validation
- Search and filter functionality

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Role-based access control
- Secure payment processing
- CORS configuration
- Input validation

## 📝 Development Status

Currently in active development. Features are being added and improved regularly.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Built as a learning project for full-stack development.

---

**Note:** Make sure to configure all environment variables before running the application. The application requires MongoDB, Cloudinary, and Razorpay accounts to function properly.
