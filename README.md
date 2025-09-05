# Wooden Interior Web Project

## **Project Overview**
The **Wooden Interior** project is a modern, responsive, and visually appealing web application designed for showcasing wooden furniture, interior designs, and products. This project serves as an **e-commerce style showcase platform** where users can view, explore, and learn about various wooden interior products and designs. 

Admins can **manage categories and products** efficiently via a dedicated admin panel, making it a complete management solution.

---

## **Features**

### **User Features**
- View a catalog of wooden interior products.
- Filter products by categories.
- Responsive design for desktop, tablet, and mobile devices.
- Attractive UI showcasing product images, prices, and descriptions.
- Smooth navigation with a modern navbar.

### **Admin Features**
- **Admin Login:** Secure login system for admin access.
- **Manage Categories:** Add, delete, and view categories created by the logged-in admin.
- **Manage Products:** Add, delete, and view products created by the logged-in admin.
- **Upload Product Images:** Upload images for products using Cloudinary.
- **Admin-specific Data:** Admin can only see categories and products they created.
- Responsive admin panel with easy-to-use interface.

---

## **Technologies Used**

### **Frontend**
- **React.js** – Frontend library for building a responsive and dynamic user interface.
- **React Router** – For navigation between pages.
- **CSS / SASS** – Custom styling for pages and components.
- **Axios** – For HTTP requests to upload images and interact with backend services.

### **Backend / Database**
- **Firebase Firestore** – NoSQL cloud database to store products, categories, and admin data.
- **Firebase Authentication** – Secure login and user management for admins.
- **Cloudinary** – For storing and serving product images.

### **Other Tools**
- **VS Code / WebStorm** – IDE for development.
- **Node.js & npm** – Dependency management and scripts.
- **Git & GitHub** – Version control and repository hosting.

---

## **Project Structure**

wooden-interior/
│
├── src/
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── AdminNavbar.jsx
│ │ └── ...other components
│ │
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Products.jsx
│ │ ├── admin/
│ │ │ ├── ManageProducts.jsx
│ │ │ └── Categories.jsx
│ │ └── ...other pages
│ │
│ ├── firebaseConfig.js
│ ├── App.jsx
│ └── index.jsx
│
├── public/
│ ├── index.html
│ └── ...assets
│
├── package.json
├── package-lock.json
└── README.md

yaml
Copy code

---

## **Setup Instructions**

### **1. Clone the repository**
```bash
git clone https://github.com/yourusername/wooden-interior.git
cd wooden-interior
2. Install dependencies
bash
Copy code
npm install
3. Configure Firebase
Go to Firebase Console and create a project.

Enable Firestore Database and Authentication (Email/Password).

Copy Firebase config and replace in src/firebaseConfig.js:

javascript
Copy code
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MSG_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
4. Configure Cloudinary
Sign up at Cloudinary for image uploads.

Create an upload preset and set environment variables in .env file:

ini
Copy code
VITE_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload
VITE_CLOUDINARY_UPLOAD_PRESET=YOUR_UPLOAD_PRESET
5. Run the Project
bash
Copy code
npm run dev
Open your browser and go to http://localhost:5173 (Vite default port).

Usage
For Admin
Login with your admin credentials.

Navigate to Manage Categories to add or delete categories.

Navigate to Manage Products to add, delete, and upload product images.

Admin can only see categories/products they created.

For Users
Browse products and categories.

View images, prices, and descriptions in a clean and responsive layout.

Future Enhancements

Add search and filter functionality for products.

Add user registration and login for customers.

Implement orders and cart system for e-commerce functionality.

Add analytics dashboard for admin.

Add real-time updates using Firestore listeners.

Contributing

Fork the repository.

Create your feature branch: git checkout -b feature/YourFeature.

Commit your changes: git commit -m "Add new feature".

Push to the branch: git push origin feature/YourFeature.

Open a Pull Request.

License

This project is licensed under the MIT License.

Contact

Developer: Venky K

Email: venkyaarm@example.com

GitHub: https://github.com/venkyaarm"# wood-interior-website" 
