# Smart and Community Education System for Underprivileged Students

College mini-project that identifies a student's interests, recommends a suitable skill using a content-based algorithm, and connects students to weekend/holiday community classes managed by volunteers.

## Problem Statement

Many underprivileged students lack personalised skill guidance and struggle to access learning opportunities outside school hours. This system supports interest discovery, beginner skill learning, and community-based weekend/holiday classes accessible through shared devices at community centres.

## Objectives

- Capture student interests through a short assessment
- Recommend a suitable skill using content-based scoring
- Provide beginner learning modules for four skills
- Enable weekend/holiday community class registration
- Allow volunteers to manage community classes and monitor basic student status
- Track learning progress and quiz results

## Core Features

1. **Interest-based smart recommendation** — assessment answers map to skill categories; skills are scored and ranked
2. **Community weekend/holiday learning** — students register for Saturday/Sunday/Holiday classes; volunteers manage seats
3. **Accessibility** — designed for shared-device access at community centres when students do not have personal devices

## Architecture

```
React (Vite) Frontend  →  Axios  →  Express REST API  →  MongoDB
                              ↑
                         JWT Auth (student | volunteer)
```

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React (Vite), Tailwind CSS, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| Recommendation | Content-based rule engine (JavaScript) |

## Modules

| Phase | Module |
|-------|--------|
| 1 | Project & UI setup |
| 2 | Student authentication |
| 3 | Student dashboard & profile |
| 4 | Interest assessment |
| 5 | Smart recommendation engine |
| 6 | Skills & learning modules |
| 7 | Weekend/holiday community classes |
| 8 | Progress tracking |
| 9 | Volunteer management |
| 10 | Integration, testing & polish |

## Recommendation Algorithm

This project uses a **content-based recommendation algorithm** (not deep learning / generative AI).

1. Each assessment answer is mapped to a skill category (Abacus, Coding, Communication Skills, Logical Reasoning)
2. Each matching answer adds +1 to that skill score
3. Percentage = `(score / 5) × 100`
4. Skills are sorted by score (highest first)
5. The top skill becomes the primary recommendation with an explanation

If asked in review: *“We map assessment responses to skill categories, calculate matching scores, and rank skills by score.”*

## Database Models

- **Student** — profile, hashed password, assessment, role
- **Volunteer** — name, username, hashed password, role
- **Course** — skill courses with embedded quiz questions (used by quiz API)
- **Class** — weekend/holiday sessions with capacity and registeredStudents
- **Progress** — completed modules per student/skill
- **QuizResult** — quiz score, percentage, performance label

## API Endpoints (active)

### Auth / Students
- `POST /api/students/register`
- `POST /api/students/login`
- `GET /api/auth/me`
- `GET /api/students/dashboard`
- `GET /api/students/profile`
- `GET /api/students/assessment/questions`
- `GET|POST /api/students/assessment`
- `GET /api/students/recommendations`

### Learning / Progress / Quiz
- `GET /api/progress`
- `GET /api/progress/:skillId`
- `POST /api/progress/:skillId/module/:moduleId/complete`
- `GET /api/quiz/skill/:skillId`
- `POST /api/quiz/skill/:skillId/submit`
- `GET /api/quiz/result/:resultId`

### Classes
- `GET /api/classes`
- `GET /api/classes/my-registrations`
- `GET /api/classes/:classId`
- `POST /api/classes/:classId/register` (student)
- `POST|PUT|DELETE /api/classes` (volunteer)

### Volunteers
- `POST /api/volunteers/login`
- `GET /api/volunteers/dashboard`
- `GET /api/volunteers/students`
- `GET /api/volunteers/students/:id`

## Installation

### Prerequisites

- Node.js 18+
- MongoDB running locally

### Backend

```bash
cd backend
npm install
copy .env.example .env   # Windows
# edit JWT_SECRET in .env
npm run seed
npm run seed:classes
npm run seed:volunteer
npm run dev
```

API: `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
copy .env.example .env   # optional; defaults to http://localhost:5000/api
npm run dev
```

App: `http://localhost:5173`

## Environment Setup

### `backend/.env`

```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/smart_community_education
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

### `frontend/.env`

```
VITE_API_URL=http://localhost:5000/api
```

Never commit real secrets. Use `.env.example` as a template.

## Database Seeding

Safe upsert scripts (do not wipe student progress on every run):

```bash
cd backend
npm run seed            # courses + demo student + volunteer
npm run seed:classes    # community weekend/holiday classes
npm run seed:volunteer  # volunteer only
npm run seed:courses    # courses/quizzes only
```

## How to Run

1. Start MongoDB
2. `cd backend && npm run dev`
3. `cd frontend && npm run dev`
4. Open the frontend URL in a browser

## Student Demo Flow

1. Home → Register / Student Login
2. Dashboard
3. Interest Assessment → Submit
4. Smart Recommendation (scores change with answers)
5. Explore recommended skill → modules → Mark as Completed
6. TAKE QUIZ → Submit → View result
7. Weekend/Holiday Classes → Register
8. Progress (modules + quiz)
9. Logout

## Volunteer Demo Flow

1. Volunteer Login (`volunteer` / `volunteer123`)
2. Dashboard (live stats)
3. View Students
4. Manage Classes → Add / Edit / Delete (blocked if enrollments exist)
5. Logout

## Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Student | `student` | `student123` |
| Volunteer | `volunteer` | `volunteer123` |

Or register a new student from the home page.

## Testing

- Valid/invalid registration and login
- Role protection (student cannot access volunteer APIs/pages)
- Recommendation ranking for different answer sets
- Class seat decrease, duplicate registration block
- Quiz scoring and performance labels
- Volunteer delete blocked when students are registered

## Limitations

- Recommendation is rule-based (not ML)
- Learning content is static beginner material
- Quiz is multiple-choice (5 questions per skill)
- No payment, chat, certificates, or parent portals
- Designed as a mini-project / review demo

## Future Scope

Payment gateway, messaging, AI tutoring, video classes, digital certificates, advanced analytics, and multilingual expansion.

## Review Notes

- Do **not** claim Deep Learning / Generative AI / Neural Networks unless implemented
- Correct accessibility statement: shared-device access at community centres
- Correct algorithm statement: content-based interest-to-skill scoring and ranking
