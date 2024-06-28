<p align="center">
<a href="https://www.meraki-academy.org" target="_blank" rel="noopener noreferrer">
 <img width="400px" height="100px" src="https://www.meraki-academy.org/assets/img/logov02.svg" alt="Project logo">
 </a>
</p>

<h3 align="center">E-learning Website ' Learno '
</h3>

---

<p align="center"> Platform gatrhering teachers and students in one place 
    <br> 
<a href=''>Demo</a>
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [User Story](#user_story)
- [Data Flow](#data_flow)
- [Guided By](#guided_by)
## 🧐 About <a name = "about"></a>

**Learno** is an innovative e-learning platform designed to bridge the gap between students and high-quality educational content. In today's fast-paced world, accessing quality education can be challenging due to geographical, financial, and time constraints. Learno aims to eliminate these barriers by providing an accessible, affordable, and engaging online learning experience.

### Key Features:

1. **Comprehensive Course Catalog**: Learno offers a wide range of courses across various subjects and levels, from elementary school topics to advanced university subjects. Each course is curated by experienced educators and industry professionals.

2. **Interactive Learning**: The platform supports interactive elements such as quizzes, assignments, and discussion forums to enhance the learning experience. Students can engage with the content actively, which helps in better retention of knowledge.

3. **Live Chat and Messaging**: Learno includes a real-time chat feature that allows students to communicate with their peers and instructors. This fosters a collaborative learning environment and provides immediate assistance with course-related queries.

4. **Resource Management**: Teachers can upload and manage educational materials, including documents, videos, and other resources. Students can easily access these materials to aid their studies.

5. **Secure Payment System**: The platform includes a secure and straightforward payment system for purchasing courses. Stripe integration ensures that all transactions are safe and efficient.

6. **User Profiles and Progress Tracking**: Students can create profiles, enroll in courses, and track their progress over time. This personalized approach helps in setting and achieving learning goals.

### Purpose and Vision:

**Learno** was created to democratize education by making it accessible to everyone, regardless of their location or financial status. Our vision is to create a global learning community where knowledge is shared freely and learners are empowered to achieve their full potential.

### Why Learno?

- **Accessibility**: Learn from anywhere at any time. Our platform is designed to be accessible on multiple devices, including desktops, tablets, and smartphones.
- **Affordability**: We offer competitive pricing on all courses, with occasional discounts and scholarships available to ensure that financial constraints do not hinder learning.
- **Quality**: Our courses are developed by subject matter experts and are constantly updated to ensure they meet current educational standards.
- **Community**: Join a community of learners and educators who are passionate about education. Share ideas, ask questions, and collaborate on projects.

Whether you are a student looking to enhance your skills, a teacher wanting to share your knowledge, or a professional seeking to upskill, **Learno** provides the tools and resources you need to succeed in your educational journey. Join us and start learning today!

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Visual Studio Code**: Follow this [link](https://code.visualstudio.com/download) to install.
- **Git**: Follow this [link](https://git-scm.com/downloads) to install.
- **MongoDB**: Follow this [link](https://www.mongodb.com/try/download/community) to install and set up MongoDB.
- **Node.js**: Follow this [link](https://nodejs.org/en/download/) to install Node.js.

### Installing:

1. Clone the repo to your local machine using git bash.

```
git clone https://github.com/C11-AhmadAbulkhairr/Project4-E-learning.git
```

2. Install packeges repeat this step in backend and frontend folder

```
npm i
```

3. Set up environment variables

Create a .env file in the backend and frontend directory and add the necessary environment variables. 

4. Run server using git bash inside backend folder

```
npm run dev
```

5. Run application using git bash inside frontend folder

```
npm run start
```
6. Set up environment variables for frontend


```
REACT_APP_GOOGLE_CLIENT_ID= your_google_client_id
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
REACT_APP_STRIPE_KEY=your_stripe_publishable_key
```
7. Set up environment variables for backend
```
DB_URI=mongodb://127.0.0.1:27017/MERAKIPROJECT4
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL=your_email
PASSWORD=your_email_password
RECEIVER_EMAIL=your_receiver_email

REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_SECRET=your_secret_key
REACT_APP_ACC_SID=your_twilio_acc_sid
REACT_APP_AUTH_TOKEN=your_twilio_auth_token
REACT_APP_STRIPE_KEY=your_stripe_publishable_key

```


Now app ready to use

## 🎈 Usage <a name="usage"></a>

Use this section to provide useful examples and guidelines on how to use your project. Below are examples tailored to your project context:

### 1. Accessing the Application

- **Home Page:** Navigate to the home page by clicking on the **Home** tab in the navigation bar.
- **Explore Courses:** Visit the **Courses** section to browse the available courses. Click on **View Courses** on the home page or navigate to **/all-courses** directly.
- **Teacher Information:** Click on the **Teachers** tab to view information about the teachers. Each teacher's profile provides details about their expertise and the subjects they teach.

### 2. User Registration and Login

- **Sign Up:** If you're a new user, you can register by clicking on the **Sign Up** button and filling in the required details. This will create your account on the platform.
- **Login:** If you already have an account, click on the **Login** button to access your account.

### 3. Enrolling in Courses

- **Browse Courses:** Go to the **Courses** page to view all available courses.
- **Enroll in a Course:** Click on the **Add to My Courses** button next to the course you wish to enroll in. This will add the course to your personal dashboard.

### 4. Payment for Courses

- **Stripe Integration:** Use the Stripe payment gateway to pay for your enrolled courses. Once you've added courses to your dashboard, navigate to the payment section, fill in your payment details, and click **Pay Now** to complete the transaction.

### 5. Viewing Grades

- **Grades Section:** Click on the **Grades** tab to view the different grades available.
- **Browse Subjects:** Select a grade to see the subjects offered for that grade.
- **View Materials:** Click on a subject to view the materials provided by different teachers.

### 6. Accessing Materials

- **Select a Subject:** After selecting a grade, choose a subject to view the materials.
- **Teacher's Materials:** Click on a teacher's name to access the materials they have provided for the subject.
- **Download or View:** Materials can be in the form of documents or videos. You can download documents or view them directly on the platform.

### 7. Using the Chat Feature

- **Access Chat:** Navigate to the **Chat** section to communicate with teachers and other students.
- **Join a Room:** Enter a room to start chatting. You can send and receive messages in real-time.
- **View Chat History:** View the history of messages in the chat room to catch up on previous conversations.

### 8. Contacting Support

- **Contact Form:** Use the **Contact Us** form to reach out to support. Fill in your details and your message, and the support team will get back to you.

### Example Scenarios

#### Example 1: Registering and Enrolling in a Course
1. **Sign Up:** Register as a new user.
2. **Browse Courses:** Navigate to the **Courses** page.
3. **Enroll:** Click on **Add to My Courses** to enroll in a course.
4. **Pay:** Complete the payment using Stripe.
5. **Access Course:** Navigate to **My Courses** to start learning.

#### Example 2: Using the Chat Feature
1. **Login:** Log in to your account.
2. **Join Chat:** Navigate to the **Chat** section.
3. **Send Messages:** Join a room and start sending messages to interact with others.

#### Example 3: Viewing Grades and Accessing Materials
1. **View Grades:** Navigate to the **Grades** section.
2. **Select Grade:** Choose a grade to see the available subjects.
3. **Browse Subjects:** Click on a subject to view the materials.
4. **Access Materials:** Select a teacher to view and download their provided materials.

By following these steps, users can seamlessly navigate and utilize the various features provided by your application.
## ⛏️ Built Using <a name = "built_using"></a>

This project utilizes a variety of technologies and frameworks to provide a comprehensive and efficient e-learning platform:

- [MongoDB](https://www.mongodb.com/) - NoSQL Database for storing user data, courses, grades, and chat messages.
- [Express.js](https://expressjs.com/) - Web application framework for building the server-side logic and API endpoints.
- [React.js](https://reactjs.org/) - Front-end library for building the user interface and managing user interactions.
- [Node.js](https://nodejs.org/en/) - JavaScript runtime environment for running server-side code.
- [Mongoose](https://mongoosejs.com/) - ODM (Object Data Modeling) library for MongoDB and Node.js, used for defining schemas and interacting with the MongoDB database.
- [Socket.io](https://socket.io/) - Library for enabling real-time, bidirectional communication between web clients and servers, used for the chat functionality.
- [Stripe](https://stripe.com/) - Payment processing platform for handling online payments securely.
- [Material-UI](https://mui.com/) - React component library for implementing Material Design in the user interface.
- [Cloudinary](https://cloudinary.com/) - Cloud-based service for managing and delivering media assets such as images and videos.
- [dotenv](https://www.npmjs.com/package/dotenv) - Module for loading environment variables from a `.env` file into `process.env`.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Library for generating and verifying JSON Web Tokens (JWT) for authentication.

These technologies work together to create a robust and scalable e-learning platform that offers a seamless user experience for both students and teachers.
## User Story <a name = "#user_story"></a>

### User Story: 

As a student, I want to be able to easily find and enroll in courses that interest me, so that I can learn at my own pace.

- **Sign Up / Sign In**: Users can create an account or log in to access personalized features.
- **Browse Courses**: Students can browse a catalog of courses categorized by grade and subject.
- **Enroll in Courses**: Students can enroll in courses and view them in their "My Courses" section.
- **Access Materials**: Enrolled students can access course materials, including documents and videos, uploaded by teachers.
- **Chat**: Students and teachers can engage in real-time chat within the platform.
- **Leave Reviews**: Students can leave reviews for courses they have completed.
- **Stripe Payment**: Students can pay for courses using Stripe integration.

### Teacher Story:

As a teacher, I want to be able to create and manage courses, so that I can share my knowledge with students.

- **Create Course**: Teachers can create new courses and upload materials.
- **Manage Courses**: Teachers can edit and delete courses they have created.
- **Interact with Students**: Teachers can communicate with students through the chat feature.
- **View Reviews**: Teachers can view feedback left by students to improve their courses.

### Admin Story:

As an admin, I want to manage the overall platform, so that I can ensure a high-quality learning experience.

- **Manage Users**: Admins can view, edit, and delete user accounts.
- **Monitor Activity**: Admins can monitor course enrollments, reviews, and chat interactions.
- **Oversee Platform**: Admins ensure that the platform runs smoothly and addresses any issues that arise.

## Data Flow <a name = "#data_flow"></a>

### Data Flow Diagram:

The data flow diagram below illustrates the flow of data between different components of the application.

![Data Flow Diagram](https://your-diagram-url.com)

1. **User Authentication**: Users (students, teachers, and admins) log in and are authenticated using JSON Web Tokens (JWT).
2. **Course Management**: Teachers create and manage courses. Course data is stored in the MongoDB database.
3. **Enrollment and Access**: Students enroll in courses and access course materials. Enrollment data is tracked in the database.
4. **Chat**: Real-time chat data is transmitted via Socket.io and stored in MongoDB.
5. **Reviews**: Students leave reviews for courses, which are stored and displayed in the course details.
6. **Payment**: Payment details are processed using Stripe and recorded in the system.

By following these data flow steps, the platform ensures that all user interactions are recorded and managed efficiently, providing a seamless experience for students, teachers, and admins.


## ⚠️ Guided By <a name = "guided_by"></a>

This project is guided by ©️ **[MERAKI Academy](https://www.meraki-academy.org)**