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
- [Database Schema](#-database-schema)
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

## 🌟 Major Features

### 🌐 Public & Protected Website Architecture

The platform is split into two distinct layers using **Next.js Route Groups**:

| Layer | Routes | Description |
|---|---|---|
| **🌍 Public Website** | `(public)/*` | Accessible to everyone — Homepage, Councils, Clubs, Events, Members, Contact |
| **🔒 Protected Website** | `(protected)/*` | Requires authentication — Role-specific dashboards with middleware-enforced access |
| **🔑 Auth Layer** | `(auth)/*` | Login/authentication flow |

> Public pages are **server-rendered** for SEO and performance. Protected routes are guarded at the **edge middleware level** before any page code executes.

---

### 🔐 Secure Authentication System (NextAuth.js v5)

A production-grade authentication system built with **NextAuth.js v5 (Auth.js)**:

- **Credentials-based Login** — Email/password authentication against PostgreSQL user records
- **JWT Session Management** — Stateless, secure token-based sessions with custom claims (role, club_id, club_name)
- **Edge Middleware Protection** — Every request to `/dashboard/*` is intercepted and validated before reaching the server
- **Role Injection** — User role and scope data are embedded in the JWT token and exposed via `useSession()` on the client
- **Granular Route Guards** — Each dashboard path (`/dashboard/general_secretary`, `/dashboard/office`, etc.) is locked to its specific role; unauthorized users are redirected automatically

```
Request → Edge Middleware (auth check) → Role Validation → Page Render
                  ↓ (if unauthorized)
              Redirect to /login or /dashboard
```

---

### 📊 Multiple Role-Based Dashboards

**6 dedicated dashboards**, each tailored with unique interfaces and capabilities:

| Role | Dashboard | Key Capabilities |
|---|---|---|
| **🎓 Student** | `/dashboard/student` | Personal dashboard with relevant student information |
| **🏅 Club Head** | `/dashboard/club_head` | Manage club inventory, members, and projects |
| **📋 General Secretary** | `/dashboard/general_secretary` | Create & manage events, submit proposals, handle bills, manage achievements, oversee inventory, verify club members |
| **👨‍💼 ADOSA** | `/dashboard/adosa` | Review & approve bills, manage files, oversee inventory across all councils |
| **🎯 DOSA** | `/dashboard/dosa` | Archive management, bills oversight, file management, inventory tracking |
| **🏢 Office** | `/dashboard/office` | Administrative bill management, file handling, and inventory control |

> Each dashboard is a **fully isolated route group** with its own page layout, data fetching, and permission checks.

---

### 📝 Proposal Management System

An end-to-end proposal lifecycle management system for General Secretaries:

- **Create Proposals** — Submit new proposals with detailed descriptions and supporting documents
- **Edit & Update** — Modify proposals before and after review
- **Track Status** — Monitor proposal progress through the approval pipeline
- **Review Workflow** — Administrative roles can review, approve, or reject proposals
- **API-Driven** — Full CRUD operations via `/api/proposals` endpoints

---

### 📦 Inventory Management System

A comprehensive inventory tracking system used across all administrative roles:

- **Add & Edit Items** — Club Heads and GS can add new inventory items with detailed forms
- **Search & Filter** — Advanced filtering and search capabilities across all inventory records
- **Role-Scoped Views** — Club Heads see their club's inventory; GS, ADOSA, DOSA, and Office see cross-council inventory
- **Dedicated Interfaces** — Custom `AddInventoryForm`, `EditInventoryForm`, `InventoryList`, `InventoryFilters`, and `InventoryControls` components
- **Accessible from every dashboard** — Inventory routes exist under Club Head, GS, ADOSA, DOSA, and Office dashboards

---

### 💰 Bill Repository & Financial Management

A centralized bill management system for transparent financial operations:

- **Bill Submission** — General Secretaries submit bills with supporting documents uploaded to **Supabase Storage**
- **Bill Review Pipeline** — Bills flow through ADOSA → DOSA → Office for multi-level approval
- **Master Bill Manager** — Dedicated `MasterBillManager` component with advanced controls and filtering (`BillsControls`, `BillsFilter`)
- **PDF Generation** — Generate bill reports and documents using **pdf-lib**
- **Audit Trail** — Complete visibility into bill status across all administrative levels

---

### 🎪 Event Management System

A complete event lifecycle management system with both public and admin interfaces:

- **Public Events Page** — Server-rendered events listing with **search** and **smart filtering** (All, Upcoming, Live Now, Completed)
- **Smart Sorting** — Upcoming events sorted ascending (nearest first), completed events sorted descending (most recent first), "All" view shows upcoming first then past
- **Event Detail Pages** — Dynamic `[eventId]` routes with full event details, descriptions, and media via `PublicEventDetails` component
- **Create & Edit Events** — General Secretaries can create new events and edit existing ones through dedicated dashboard pages
- **Homepage Integration** — Upcoming events are automatically fetched and displayed on the homepage with the `NewsEvents` component
- **Responsive Filters** — Desktop horizontal filter bar + mobile dropdown with `EventFilter` component
- **API-Driven** — Full CRUD operations via `/api/events` endpoints with parameterized SQL queries

---

### 🏛️ Councils & Clubs Management

A dynamic system for showcasing and managing the 5 major councils and their affiliated clubs:

- **Interactive Radial Menu** — Desktop: animated orbital layout with glowing connectors, hover tooltips, and WebGL effects; Mobile: card-based layout with floating animations
- **5 Councils** — Science & Technology, Academic, Sports, Cultural, and Outreach & Alumni — each with unique color theming and visual identity
- **Dynamic Council Pages** — `[id]` dynamic routes fetching council data from PostgreSQL, displaying affiliated clubs and council details
- **Club Showcase** — Interactive club grid on the homepage with detailed club pages accessible via `/club` routes
- **Database-Driven** — Councils and clubs are fetched from PostgreSQL, with client-side data merged for rich visual rendering
- **Council Filtering** — Dedicated `CouncilFilter` component for browsing and filtering council content
- **Club Head Integration** — Club heads manage their club data through the protected dashboard

---

### ✨ Additional Features

#### 🌐 Public Portal
| Feature | Description |
|---|---|
| **Homepage** | Interactive landing page with galaxy background, council radial menu, and club showcase |
| **Achievements** | Create, edit, and showcase student and club achievements |
| **Members Directory** | Explore the student body and council/club members |
| **Contact** | Get in touch with the Gymkhana office |

#### 💎 UI/UX Highlights
- 🌌 **Interactive Galaxy Background** — WebGL-powered star field with mouse repulsion (Three.js)
- ✨ **Particle Effects** — Dynamic floating particles across the interface (p5.js)
- 🎯 **Radial Council Menu** — Unique circular navigation for exploring councils
- 🌊 **Floating Line Animations** — Smooth animated decorative elements
- 🎨 **Dark Theme** — Sleek, modern dark-mode-first design
- 🧩 **35+ Reusable Components** — Modular component architecture for scalability

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
┌──────────────────────────┐  ┌──────────────────────────┐
│   PostgreSQL (11 Tables) │  │   Supabase (File Storage) │
│   - users                │  │   - Proposal PDFs         │
│   - councils             │  │   - Bill documents        │
│   - clubs                │  │   - Event images          │
│   - club_members         │  │   - Inventory bill files   │
│   - club_projects        │  │                           │
│   - events               │  │                           │
│   - proposals            │  │                           │
│   - proposal_logs        │  │                           │
│   - bills                │  │                           │
│   - inventory            │  │                           │
│   - council_achievements │  │                           │
└──────────────────────────┘  └──────────────────────────┘
```

---

## 🗄️ Database Schema

The application uses **PostgreSQL** with **11 tables**, **custom enums**, **foreign key constraints**, **triggers**, and **indexes**.

### ER Diagram

```mermaid
erDiagram
    users ||--o{ clubs : "heads"
    users ||--o{ events : "creates"
    users ||--o{ proposals : "creates"
    users ||--o{ bills : "creates"
    users ||--o{ inventory : "creates"
    users ||--o{ club_members : "added_by"
    users ||--o{ proposal_logs : "action_by"

    councils ||--o{ council_achievements : "has"

    clubs ||--o{ club_members : "has"
    clubs ||--o{ club_projects : "has"

    proposals ||--o{ proposal_logs : "tracks"

    users {
        uuid id PK
        text email UK
        text password
        text name
        app_role role
        timestamptz created_at
    }

    councils {
        uuid id PK
        varchar name UK
        text description
        varchar color
    }

    clubs {
        uuid club_id PK
        varchar club_name UK
        uuid club_head_id FK
    }

    events {
        uuid id PK
        varchar title
        varchar subtitle
        timestamptz event_date
        text description
        text_arr image_urls
        uuid created_by FK
    }

    proposals {
        uuid id PK
        varchar title
        text description
        text pdf_url
        varchar priority
        varchar current_stage
        int version
        uuid created_by FK
        uuid club_id
    }

    proposal_logs {
        uuid id PK
        uuid proposal_id FK
        uuid action_by FK
        varchar previous_stage
        varchar new_stage
        varchar action
        text remark
        timestamptz timestamp
    }

    inventory {
        uuid id PK
        uuid created_by FK
        text name
        text description
        text bill_url
        council_enum council
        text club_name
        text tenure
        inventory_type type
        inventory_status status
    }

    bills {
        uuid id PK
        text name
        text description
        text pdf_url
        text category
        uuid entity_id
        text entity_name
        uuid created_by FK
    }

    council_achievements {
        uuid id PK
        uuid council_id FK
        varchar title
        text description
        date achievement_date
        varchar image_url
    }

    club_members {
        uuid member_id PK
        uuid student_id FK
        uuid club_id FK
        varchar position
        varchar status
        uuid added_by FK
        uuid approved_by FK
        date tenure_start
        date tenure_end
    }

    club_projects {
        uuid project_id PK
        uuid club_id FK
        varchar title
        text description
        varchar status
        uuid created_by FK
    }
```

### Table Details

#### 👤 `users` — Authentication & Identity
| Column | Type | Constraints |
|---|---|---|
| `id` | `uuid` | PK, auto-generated |
| `email` | `text` | UNIQUE, NOT NULL |
| `password` | `text` | NOT NULL |
| `name` | `text` | — |
| `role` | `app_role` (enum) | NOT NULL, default: `club_head` |
| `created_at` | `timestamptz` | default: UTC now |

---

#### 🏛️ `councils` — Gymkhana Councils
| Column | Type | Constraints |
|---|---|---|
| `id` | `uuid` | PK |
| `name` | `varchar(255)` | UNIQUE, NOT NULL |
| `description` | `text` | — |
| `color` | `varchar(50)` | — |

---

#### 🏅 `clubs` — Student Clubs
| Column | Type | Constraints |
|---|---|---|
| `club_id` | `uuid` | PK |
| `club_name` | `varchar(100)` | UNIQUE, NOT NULL |
| `club_head_id` | `uuid` | FK → `users(id)`, ON DELETE CASCADE |

---

#### 👥 `club_members` — Club Membership with Approval Workflow
| Column | Type | Constraints |
|---|---|---|
| `member_id` | `uuid` | PK |
| `student_id` | `uuid` | FK → `users(id)`, UNIQUE with `club_id` |
| `club_id` | `uuid` | FK → `clubs(club_id)` |
| `position` | `varchar(100)` | — |
| `status` | `varchar(20)` | CHECK: `PENDING`, `TENURE_ADDED`, `APPROVED`, `REJECTED` |
| `added_by` | `uuid` | FK → `users(id)` |
| `approved_by` | `uuid` | FK → `users(id)` |
| `tenure_start` | `date` | — |
| `tenure_end` | `date` | — |

> **Trigger**: `trg_validate_club_member_roles` validates role constraints before insert/update.

---

#### 📂 `club_projects` — Club Project Tracking
| Column | Type | Constraints |
|---|---|---|
| `project_id` | `uuid` | PK |
| `club_id` | `uuid` | FK → `clubs(club_id)` |
| `title` | `varchar(150)` | NOT NULL |
| `description` | `text` | — |
| `status` | `varchar(20)` | CHECK: `IN_PROGRESS`, `COMPLETED` |
| `created_by` | `uuid` | FK → `users(id)` |

---

#### 🎪 `events` — Event Management
| Column | Type | Constraints |
|---|---|---|
| `id` | `uuid` | PK |
| `title` | `varchar(255)` | NOT NULL |
| `subtitle` | `varchar(255)` | — |
| `event_date` | `timestamptz` | NOT NULL |
| `description` | `text` | NOT NULL |
| `image_urls` | `text[]` | Array of image URLs |
| `created_by` | `uuid` | FK → `users(id)` |

---

#### 📝 `proposals` — Proposal Lifecycle
| Column | Type | Constraints |
|---|---|---|
| `id` | `uuid` | PK |
| `title` | `varchar(255)` | NOT NULL |
| `description` | `text` | — |
| `pdf_url` | `text` | NOT NULL |
| `priority` | `varchar(20)` | default: `NORMAL` |
| `current_stage` | `varchar(50)` | default: `OFFICE_REVIEW` |
| `version` | `int` | default: `1` |
| `created_by` | `uuid` | FK → `users(id)` |
| `club_id` | `uuid` | — |

> **Trigger**: `update_proposals_updated_at` auto-updates `updated_at` on every row modification.

---

#### 📋 `proposal_logs` — Proposal Audit Trail
| Column | Type | Constraints |
|---|---|---|
| `id` | `uuid` | PK |
| `proposal_id` | `uuid` | FK → `proposals(id)`, ON DELETE CASCADE |
| `action_by` | `uuid` | FK → `users(id)` |
| `previous_stage` | `varchar(50)` | — |
| `new_stage` | `varchar(50)` | — |
| `action` | `varchar(50)` | NOT NULL |
| `remark` | `text` | — |

---

#### 📦 `inventory` — Inventory Tracking
| Column | Type | Constraints |
|---|---|---|
| `id` | `uuid` | PK |
| `created_by` | `uuid` | FK → `users(id)` |
| `name` | `text` | NOT NULL |
| `description` | `text` | — |
| `bill_url` | `text` | — |
| `council` | `council_enum` | NOT NULL |
| `club_name` | `text` | — |
| `tenure` | `text` | NOT NULL |
| `type` | `inventory_type` | NOT NULL |
| `status` | `inventory_status` | default: `AVAILABLE` |

---

#### 💰 `bills` — Financial Bill Repository
| Column | Type | Constraints |
|---|---|---|
| `id` | `uuid` | PK |
| `name` | `text` | NOT NULL |
| `description` | `text` | — |
| `pdf_url` | `text` | NOT NULL |
| `category` | `text` | CHECK: `INVENTORY`, `EVENT` |
| `entity_id` | `uuid` | NOT NULL, indexed |
| `entity_name` | `text` | NOT NULL |
| `created_by` | `uuid` | FK → `users(id)` |

---

#### 🏆 `council_achievements` — Council Achievements
| Column | Type | Constraints |
|---|---|---|
| `id` | `uuid` | PK |
| `council_id` | `uuid` | FK → `councils(id)`, ON DELETE CASCADE |
| `title` | `varchar(255)` | NOT NULL |
| `description` | `text` | NOT NULL |
| `achievement_date` | `date` | NOT NULL |
| `image_url` | `varchar(500)` | — |

---

### Custom Enums

| Enum | Used In | Values |
|---|---|---|
| `app_role` | `users.role` | `club_head`, `gs`, `adosa`, `dosa`, `office`, `student` |
| `council_enum` | `inventory.council` | Council identifiers |
| `inventory_type` | `inventory.type` | Inventory item categories |
| `inventory_status` | `inventory.status` | `AVAILABLE`, etc. |

### Database Triggers

| Trigger | Table | Event | Description |
|---|---|---|---|
| `update_proposals_updated_at` | `proposals` | BEFORE UPDATE | Auto-updates `updated_at` timestamp |
| `trg_validate_club_member_roles` | `club_members` | BEFORE INSERT/UPDATE | Validates user roles for membership operations |

### Indexes

| Index | Table | Column | Purpose |
|---|---|---|---|
| `idx_bills_entity_id` | `bills` | `entity_id` | Fast lookup of bills by linked entity |

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
