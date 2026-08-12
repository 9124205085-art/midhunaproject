# Smart and Community Education System for Underprivileged Students

College mini-project: personalized skill recommendation + weekend/holiday community classes.

## Flow

Student Interest → Assessment → Smart Skill Recommendation → Weekend/Holiday Class → Learning → Quiz → Progress

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcrypt
- **Recommendation:** Content-based matching algorithm (JavaScript)

## Prerequisites

1. Node.js 18+
2. MongoDB running locally (`mongodb://127.0.0.1:27017`)

## Setup

### 1. Backend

```bash
cd backend
npm install
npm run seed
npm run dev
```

API runs at `http://localhost:5000`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`

## Demo Accounts

| Role | Username | Password |
|------|----------|----------|
| Student | `student` | `student123` |
| Volunteer | `volunteer` | `volunteer123` |

Or register a new student from the home page.

## Modules

| Module | Description |
|--------|-------------|
| M1 | Project & UI setup |
| M2 | Student authentication |
| M3 | Student dashboard & profile |
| M4 | Interest assessment (5 questions) |
| M5 | Content-based recommendation engine |
| M6 | Courses & learning modules |
| M7 | Weekend/holiday community classes |
| M8 | Quiz & progress |
| M9 | Volunteer class management |
| M10 | Integration (validation, protected routes, seed data) |

## USP

1. **Smart:** Content-based skill recommendation from assessment answers (not a chatbot).
2. **Community:** Weekend/holiday classes at community centres with volunteer support.
3. **Accessible:** Designed for students without personal devices (volunteer-assisted access).

## Future Scope (not implemented)

Payment gateway, chat, AI chatbot, video conferencing, digital certificates, advanced analytics, job portal.
