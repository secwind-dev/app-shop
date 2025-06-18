# Firebase Setup Guide

## วิธีการตั้งค่า Firebase สำหรับโปรเจกต์

### 1. สร้าง Firebase Project
1. ไปที่ [Firebase Console](https://console.firebase.google.com/)
2. คลิก "Add project" หรือ "เพิ่มโปรเจกต์"
3. ตั้งชื่อโปรเจกต์และทำตามขั้นตอน

### 2. เปิดใช้งาน Authentication
1. ใน Firebase Console ไปที่ "Authentication"
2. คลิก "Get started"
3. ไปที่แท็บ "Sign-in method"
4. เปิดใช้งาน "Email/Password"

### 3. ตั้งค่า Firestore Database (Optional)
1. ไปที่ "Firestore Database"
2. คลิก "Create database"
3. เลือก "Start in test mode" สำหรับการพัฒนา
4. เลือก location ที่ใกล้ที่สุด

### 4. รับ Configuration Keys
1. ไปที่ "Project Settings" (ไอคอนเฟือง)
2. เลื่อนลงไปหา "Your apps"
3. คลิก "Add app" > เลือก "Web" (</>) 
4. ตั้งชื่อ app และกด "Register app"
5. คัดลอก config object

### 5. ตั้งค่า Environment Variables
1. คัดลอกไฟล์ `.env.example` เป็น `.env`
2. แทนที่ค่าต่างๆ ด้วยข้อมูลจาก Firebase:

```bash
# แทนที่ค่าเหล่านี้ด้วยข้อมูลจาก Firebase Config
VITE_FIREBASE_API_KEY=AIzaSyD...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 6. ตัวอย่าง Firebase Config Object
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 7. รีสตาร์ท Development Server
หลังจากตั้งค่า `.env` แล้ว ให้รีสตาร์ท dev server:
```bash
npm run dev
```

## ⚠️ ข้อควรระวัง

### ความปลอดภัย
- ✅ **ปลอดภัย**: Firebase config keys เหล่านี้ปลอดภัยที่จะใส่ใน frontend เพราะ Firebase มี security rules
- ✅ **ควร**: ใช้ environment variables เพื่อความเป็นระเบียบ
- ❌ **ไม่ควร**: commit `.env` file ลง git
- ❌ **ไม่ควร**: ใส่ service account keys หรือ admin SDK keys ใน frontend

### Best Practices
1. ใช้ `.env.example` เป็น template
2. เพิ่ม `.env` ใน `.gitignore`
3. ตั้งค่า Firebase Security Rules
4. ใช้ Environment แยกสำหรับ development/production

## 🔧 Troubleshooting

### ปัญหาที่พบบ่อย
1. **"Firebase: Error (auth/invalid-api-key)"**
   - ตรวจสอบ `VITE_FIREBASE_API_KEY` ใน `.env`

2. **"Firebase: Error (auth/project-not-found)"**
   - ตรวจสอบ `VITE_FIREBASE_PROJECT_ID` ใน `.env`

3. **Environment variables ไม่โหลด**
   - ต้องขึ้นต้นด้วย `VITE_` ใน Vite
   - รีสตาร์ท dev server หลังแก้ไข `.env`