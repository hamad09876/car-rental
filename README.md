# 🚗 Car Rental Management System (React + JSON Server)

### 👤 Student Information
- **Name:** Muhammad Hamad
- **Roll Number:** F23BDOCS1M0125
- **Section:** BSCS

---

## 📌 Project Overview

This is a complete **Car Rental Web Application** built using **React.js** for the frontend and **JSON Server** as a mock backend. It includes fully functional modules for both **User** and **Admin**, featuring car listings, bookings, payments, and authentication.

---

## ✅ Core Features

### 🔐 Authentication System

#### 👤 User Login & Signup
- Users can register with their email, and password.
- Login credentials are matched against JSON Server data.
- On successful login, users are redirected to the **Cars** page.
- User state is managed using `localStorage`.

#### 🛡️ Admin Login
- Admin access is available through a button on the top-right corner of the Home Page.
- Admin credentials are hardcoded.
- On successful login, Admin is redirected to the **Admin Dashboard**.

## 🧑‍💼 Admin Features

Accessible only after successful login with hardcoded credentials.

## 👨‍💼 Admin Dashboard
- Accessible via Admin Login only.
- Admin can:
  - **View** All Cars

  - **Add** New Cars (cloudainry api for img upload)

  - **Edit** Existing Cars (can Edite each and every thing of car+ can upload or delte image)

  - **Delete** Cars
 



- **Bookings Management:**
   - View All Bookings

  - See **Paid / Unpaid** status.

  - Delete any booking.

---


## 🚘 User Features

### 🏠 Home Page
- Welcome screen with login options for both user and admin.

### 🚗 Cars Page
- Cars are fetched dynamically from `JSON Server`.
- Users can filter cars by **Minimum** and **Maximum Price**.
- Each car has a "View Details" button.

### 📸 Car Details Page
- Displays car specs including model, AC, fuel average, and a gallery.
- Has a "Next" button that takes the user to the booking form.

### 📝 Booking Form
- User fills in name, CNIC, phone, address, start date, and end date.
- Days are calculated based on date difference.
- Total rent is shown (days × per-day price).
- Clicking "Next" shows the voucher page.

### 🎟️ Voucher Page
- Displays a complete summary of the car and booking.
- Includes a "Proceed to Payment" button.

### 💳 Payment Page
- Users have two payment options:
  - **Confirm Payment:** Fill dummy card info (required fields) → Booking is marked as **Paid**.
  - **Pay with Cash on Delivery:** No card required → Booking is marked as **Unpaid**.
- Booking data is passed to the confirmation page after payment.

### ✅ Booking Success Page
- Shows all booking and customer details.
- Final "Confirm Booking" button saves the booking to JSON Server.
- User is redirected to **My Bookings**.

### 📂 My Bookings Page
- Displays all bookings of the logged-in user.
- Paid and unpaid badges shown.
- If unpaid, a **Pay Now** button is shown.
- Clicking "Pay Now" takes user to the payment page and updates the booking upon confirmation.

---


## 📁 Folder Structure

📦 public/
┣ 📁 images/

📦 src/
┣ 📁 admin/
┃ ┣ AddCarForm.jsx
┃ ┣ AdminDashboard.jsx
┃ ┣ AdminLogin.jsx
┃ ┗ EditCarForm.jsx
┣ 📁 data/
┃ ┗ carData.js
┣ 📁 pages/
┃ ┣ BookingForm.jsx
┃ ┣ BookingSuccess.jsx
┃ ┣ CarDetails.jsx
┃ ┣ Cars.jsx
┃ ┣ Home.jsx
┃ ┣ Login.jsx
┃ ┣ MyBookings.jsx
┃ ┣ Payment.jsx
┃ ┣ Signup.jsx
┃ ┗ VoucherPage.jsx
┣ 📁 styles/
┃ ┗ All CSS files for each page
┣ 📁 assets/
┃ ┗ loginbackground.jpj,signbackground.jpj
┣ App.jsx
┣ index.js


---

## ⚙️ Technologies Used

- **React.js** — Frontend framework
- **JSON Server** — Mock REST API
- **React Router DOM** — Routing
- **Axios** — HTTP requests
- **Cloudinary API** — Image uploads
- **React Toastify** — Notifications

---

## 💡 Additional Highlights

- **Pay Now Logic:** Only updates unpaid bookings.
- **Status Tags:** Shows `PAID` or `UNPAID` based on payment method.
- **Admin/User Split:** Clear separation of portals and functionalities.
- **VIP UI Theme:** Luxury feel with polished CSS.
- **Form Validations:** Required fields, conditional logic.
- **State Management:** `useState`, `useEffect`, and `localStorage` usage.
- **Reusable Components:** Easy to scale and modify.

---


## 📂 Installation & Setup Guide


### 1. 📦 Install Node.js 
Download from: https://nodejs.org  
Then check installation:
```bash
node -v
npm -v
```


### 2. 🧱 Install Project Dependencies
Open terminal in the project root and run:
```bash
npm install
```
This will install all required `node_modules`.

### 3. 🚀 Start the React App
```bash
npm start
```
It will open on:
```
http://localhost:3000
```

### 4. 🗃️ Run JSON Server
```bash
npx json-server --watch db.json --port 3001
```
It will start the fake backend API at:
```
http://localhost:3001
```

### 5. 🔑 Admin Login Details (Hardcoded)
| Username | Password |
|----------|----------|
| `admin@almadina.com`  | `Admin@1234!` |

Admin login accessible from the **top-right corner button** on homepage.


## 📦 according to Submission Instructions

### ❌ Exclude:
- `node_modules/` folder

### ✅ Include:
- `public/`
- `src/`
- `db.json`
- `package.json`
- `README.md`
