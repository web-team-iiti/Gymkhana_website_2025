<div align="center">

# 🏛️ Student's Gymkhana — IIT Indore

### The Official Web Platform for Student Governance & Campus Life

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

---

A full-stack, role-based web application powering the Student's Gymkhana at **IIT Indore** — enabling clubs, councils, and administrative bodies to manage events, inventory, finances, proposals, and achievements through a unified digital platform.

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Role-Based Access](#-role-based-access)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)

---

## 🔍 Overview

The Student's Gymkhana website serves as the **central digital hub** for all student governance activities at IIT Indore. It replaces fragmented manual processes with a streamlined platform that supports:

- **Public-facing pages** for students to explore councils, clubs, and events
- **Authenticated dashboards** for Club Heads, General Secretaries, ADOSA, DOSA, and the Gymkhana Office
- **Real-time data** powered by PostgreSQL and Supabase Storage
- **Immersive UI** with interactive 3D galaxy backgrounds, particle effects, and smooth animations

---

## ✨ Key Features

### 🌐 Public Portal
| Feature | Description |
|---|---|
| **Homepage** | Interactive landing page with galaxy background, council radial menu, and club showcase |
| **Councils & Clubs** | Browse all councils and their affiliated clubs with detailed information |
| **Events** | View upcoming events with filtering, search, and individual event detail pages |
| **Members Directory** | Explore the student body and council/club members |
| **Contact** | Get in touch with the Gymkhana office |

### 🔐 Authenticated Dashboards

| Role | Capabilities |
|---|---|
| **Club Head** | Manage club inventory, members, and projects |
| **General Secretary** | Create & manage events, submit & track proposals, manage achievements, handle bills, oversee inventory, verify club members |
| **ADOSA** | Review & manage bills, files, and inventory across councils |
| **DOSA** | Archive management, bills oversight, file management, inventory tracking |
| **Office** | Administrative bill management, file handling, and inventory control |
| **Student** | Personal dashboard with relevant information |

### 💎 UI/UX Highlights
- 🌌 **Interactive Galaxy Background** — WebGL-powered star field with mouse repulsion
- ✨ **Particle Effects** — Dynamic floating particles across the interface
- 🎯 **Radial Council Menu** — Unique circular navigation for exploring councils
- 🌊 **Floating Line Animations** — Smooth animated decorative elements
- 🎨 **Dark Theme** — Sleek, modern dark-mode-first design

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, Turbopack) |
| **Frontend** | [React 19](https://react.dev/), JSX Components |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Authentication** | [NextAuth.js v5](https://authjs.dev/) (Credentials Provider) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) (via `pg` driver) |
| **File Storage** | [Supabase Storage](https://supabase.com/storage) |
| **3D/Visual Effects** | [Three.js](https://threejs.org/), [OGL](https://oframe.github.io/ogl/), [p5.js](https://p5js.org/) |
| **PDF Generation** | [pdf-lib](https://pdf-lib.js.org/) |
| **Icons** | [React Icons](https://react-icons.github.io/react-icons/) |
| **Fonts** | Geist Sans & Geist Mono (via `next/font`) |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Client (Browser)                   │
│  ┌──────────┐  ┌──────────┐  ┌────────────────────────┐ │
│  │  Public   │  │   Auth   │  │   Protected Dashboard  │ │
│  │  Pages    │  │  (Login) │  │  (Role-Based Views)    │ │
│  └────┬─────┘  └────┬─────┘  └────────┬───────────────┘ │
└───────┼──────────────┼─────────────────┼─────────────────┘
        │              │                 │
        ▼              ▼                 ▼
┌─────────────────────────────────────────────────────────┐
│                   Next.js App Router                     │
│  ┌──────────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │ Server       │  │Middleware│  │   API Routes      │   │
│  │ Components   │  │(AuthZ)   │  │ /api/*            │   │
│  └──────┬───────┘  └──────────┘  └────────┬──────────┘  │
└─────────┼─────────────────────────────────┼──────────────┘
          │                                 │
          ▼                                 ▼
┌─────────────────────┐      ┌──────────────────────────┐
│   PostgreSQL (DB)   │      │   Supabase (File Storage) │
│   - Users           │      │   - Documents             │
│   - Clubs           │      │   - Images                │
│   - Events          │      │   - Bills/Receipts        │
│   - Proposals       │      │                           │
│   - Bills           │      │                           │
│   - Inventory       │      │                           │
│   - Achievements    │      │                           │
└─────────────────────┘      └──────────────────────────┘
```

---

## 📁 Project Structure

```
gymkhana_website/
├── app/
│   ├── (auth)/                    # Authentication routes
│   │   └── login/                 # Login page
│   ├── (public)/                  # Public-facing pages
│   │   ├── page.js                # Homepage
│   │   ├── club/                  # Club details
│   │   ├── councils/              # Council listings
│   │   ├── events/                # Events listing + [eventId] detail
│   │   ├── members/               # Members directory
│   │   └── contact/               # Contact page
│   ├── (protected)/               # Auth-required pages
│   │   └── dashboard/
│   │       ├── club_head/         # Club Head dashboard
│   │       ├── general_secretary/ # GS dashboard (events, proposals, bills, etc.)
│   │       ├── adosa/             # ADOSA dashboard
│   │       ├── dosa/              # DOSA dashboard (archive, bills, files)
│   │       ├── office/            # Office dashboard
│   │       └── student/           # Student dashboard
│   ├── api/                       # RESTful API routes
│   │   ├── achievements/          # CRUD for achievements
│   │   ├── bills/                 # Bill management
│   │   ├── club/                  # Club data
│   │   ├── events/                # Event management
│   │   ├── inventory/             # Inventory management
│   │   ├── por/                   # Positions of Responsibility
│   │   └── proposals/             # Proposal management
│   ├── layout.js                  # Root layout
│   └── globals.css                # Global styles
├── components/                    # Reusable React components
│   ├── Galaxy.jsx                 # 3D galaxy background effect
│   ├── Particles.jsx              # Particle animation system
│   ├── Floatingline.jsx           # Animated floating lines
│   ├── Councils.jsx               # Radial council menu
│   ├── Clubs.jsx                  # Club showcase grid
│   ├── Navbar.jsx                 # Navigation bar
│   ├── Sidebar.jsx                # Dashboard sidebar
│   ├── Footer.jsx                 # Site footer
│   ├── MasterBillManager.jsx      # Bill management interface
│   ├── InventoryList.jsx          # Inventory management
│   └── ...                        # 25+ more components
├── config/
│   ├── db.js                      # PostgreSQL connection pool
│   ├── supabase.js                # Supabase client setup
│   └── queries/                   # Reusable SQL queries
├── context/
│   └── AuthProvider.jsx           # NextAuth session provider
├── auth.js                        # NextAuth configuration
├── auth.config.js                 # Auth callbacks & route protection
├── middleware.js                   # Edge middleware for auth
└── public/                        # Static assets
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **PostgreSQL** database (local or hosted)
- **Supabase** project (for file storage)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/web-team-iiti/Gymkhana_website_2025.git
cd Gymkhana_website_2025/gymkhana_website

# 2. Install dependencies
npm install

# 3. Set up environment variables (see below)
cp .env.example .env.local

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Create production build |
| `npm start` | Start production server |

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# NextAuth
AUTH_SECRET=your-random-secret-key
NEXTAUTH_URL=http://localhost:3000

# Supabase (File Storage)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 👥 Role-Based Access

The application implements **multi-tier role-based access control (RBAC)** via NextAuth.js middleware:

```
Public (No Auth)          → Homepage, Events, Councils, Clubs, Contact
│
├── Student               → Personal dashboard
├── Club Head             → Club management (inventory, members, projects)
├── General Secretary     → Events, proposals, bills, achievements, inventory
├── ADOSA                 → Bills review, file management, inventory oversight
├── DOSA                  → Archive management, bills, files, inventory
└── Office                → Administrative bills, files, inventory
```

Route protection is enforced at two levels:
1. **Edge Middleware** — Intercepts requests before they reach the server
2. **Server-side Auth Checks** — Validates session in server components and API routes

---

## 🔌 API Endpoints

| Endpoint | Methods | Description |
|---|---|---|
| `/api/achievements` | GET, POST, PUT, DELETE | Manage student/club achievements |
| `/api/bills` | GET, POST, PUT | Bill submission and management |
| `/api/club` | GET | Fetch club information |
| `/api/events` | GET, POST, PUT, DELETE | Event CRUD operations |
| `/api/inventory` | GET, POST, PUT, DELETE | Inventory management |
| `/api/por` | GET | Positions of Responsibility |
| `/api/proposals` | GET, POST, PUT | Proposal submission & tracking |

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/your-feature`)
3. **Commit** your changes (`git commit -m 'Add some feature'`)
4. **Push** to the branch (`git push origin feature/your-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is developed and maintained by the **Web Team, IIT Indore** for the Student's Gymkhana.

---

<div align="center">

**Built with ❤️ by the Web Team at IIT Indore**

</div>
