# 🎅 S.A.N.A - Santa's Autonomous Network Agent

> **"Santa Claus doesn't need a list. He needs a System."**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](http://localhost:5173)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)

**S.A.N.A** is a revolutionary **Enterprise Resource Planning (ERP)** system designed to modernize North Pole operations through cutting-edge microservices architecture, real-time event streaming, and AI-powered automation. Built specifically for the **Santakku Oru App Hackathon**, this project reimagines Christmas logistics as a distributed, event-driven ecosystem.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Screenshots](#-screenshots)
- [Setup Instructions](#-setup-instructions)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [AI Usage Declaration](#-ai-usage-declaration)
- [Future Enhancements](#-future-enhancements)
- [License](#-license)

---

## 🎯 Overview

For centuries, the North Pole operated on paper scrolls and elf-whispers. In 2025, that changes. **S.A.N.A** transforms Christmas operations into a modern, scalable, real-time system that can handle global demand with precision and efficiency.

### The Problem
Traditional Christmas operations face:
- ❌ Manual tracking of billions of children worldwide
- ❌ Inefficient communication between elves and Santa
- ❌ No real-time visibility into factory production
- ❌ Delayed response to behavioral changes
- ❌ Lack of data-driven decision making

### The Solution
S.A.N.A provides:
- ✅ **Real-time Global Monitoring**: Interactive map tracking every child's location and behavior
- ✅ **Event-Driven Architecture**: Instant updates across all systems using Kafka and Socket.IO
- ✅ **AI-Powered Assistant**: Natural language interface for complex queries and operations
- ✅ **Microservices Design**: Scalable, independent services for different operational domains
- ✅ **Dual Dashboard System**: Separate interfaces for Santa (oversight) and Elves (field operations)

---

## ✨ Key Features

### 🗺️ **Interactive Global Map**
- Real-time visualization of children's locations worldwide using Leaflet
- Clickable pins showing detailed child profiles
- Live event feed displaying recent behavioral reports
- Voice and text-based search capabilities
- Filter by location, behavior status, and more

### � **Comprehensive Child Database**
- Searchable database of all children globally
- Real-time behavior score tracking (Nice/Naughty/Neutral)
- Detailed profiles with wishlist, location, and report history
- Instant status updates via WebSocket connections

### 🧝 **Elf Management System**
- Real-time online/offline status tracking
- Gamification with points, levels, and achievement badges
- Department assignment and work log tracking
- Secure authentication and role-based access
- Individual elf dashboards for field reporting

### 🏭 **Factory Automation Dashboard**
- Real-time production metrics and inventory tracking
- Dynamic order calculation based on global demand
- Department-wise breakdown (Toy Making, Wrapping, Quality Control, etc.)
- Coal stockpile monitoring for naughty list management

### 🤖 **AI Assistant (JARVIS-Style)**
- Natural language processing powered by Google Gemini AI
- Voice and text input support
- Tool registration system for component actions
- Context-aware responses and command execution
- Navigate, search, and control the entire system via conversation

### 📡 **Real-Time Event System**
- Kafka-based event streaming for inter-service communication
- Socket.IO for instant client updates
- Live event console showing all system activities
- Zero-latency updates across all connected dashboards

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern UI library with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and HMR
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling with custom "Cyber-Christmas" theme
- **Leaflet** - Interactive map visualization
- **Socket.IO Client** - Real-time WebSocket communication
- **Lucide React** - Modern icon library

### **Backend**
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **TypeScript** - Type-safe server development
- **Prisma ORM** - Type-safe database access with migrations
- **PostgreSQL** - Relational database
- **Kafka** - Event streaming platform
- **Socket.IO** - Real-time bidirectional communication
- **Multer** - File upload handling

### **AI & External Services**
- **Google Gemini AI** - Natural language processing and conversational AI
- **Nominatim (OpenStreetMap)** - Geocoding and location services

### **DevOps & Tools**
- **Concurrently** - Run multiple services simultaneously
- **tsx** - TypeScript execution and watch mode

---

## 🏗️ Architecture

S.A.N.A follows a **microservices architecture** with event-driven communication:

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer (React)                     │
│                    Port: 5173 (Vite Dev)                     │
└──────────────┬──────────────────────────────┬────────────────┘
               │                              │
               │ REST API                     │ WebSocket
               │                              │
┌──────────────▼──────────────┐   ┌──────────▼────────────────┐
│   Behavior Service          │   │   Socket.IO Server        │
│   Port: 3001                │◄──┤   (Real-time Events)      │
│   - Child Management        │   └───────────────────────────┘
│   - Report Processing       │
│   - Elf Authentication      │
│   - AI Integration          │
└──────────────┬──────────────┘
               │
               │ PostgreSQL
               │
┌──────────────▼──────────────┐
│   Database (Prisma)         │
│   - Children                │
│   - Reports                 │
│   - Elves                   │
│   - Work Logs               │
└─────────────────────────────┘
               │
               │ Kafka Events
               │
┌──────────────▼──────────────┐
│   Logistics Service         │
│   Port: 3002                │
│   - Factory Management      │
│   - Production Tracking     │
│   - Inventory Control       │
└─────────────────────────────┘
```

### **Data Flow**
1. **Elf** submits a behavioral report via the dashboard
2. **Client** sends POST request to Behavior Service
3. **Behavior Service** saves to PostgreSQL and emits events
4. **Socket.IO** broadcasts real-time update to all connected clients
5. **Kafka** publishes event to `sana-events` topic
6. **Logistics Service** consumes event and updates factory statistics
7. **Santa Dashboard** reflects changes instantly without refresh

---

## � Screenshots

### 🌍 Global View - Interactive Map
![Global View](./assets/global_view.png)
*Real-time world map showing child locations with live event feed and operational metrics*

### 📊 Child Database - Global Monitoring Index
![Child Database](./assets/child_database.png)
*Comprehensive searchable database with behavior tracking and detailed profiles*

### 🧝 Elf Directory - Personnel Management
![Elf Directory](./assets/elf_directory.png)
*Real-time elf status monitoring with levels, departments, and online/offline indicators*

### 🏭 Factory Floor - Production Logistics
![Factory Floor](./assets/factory_floor.png)
*Live production dashboard with global demand tracking and department breakdowns*

---

## 🚀 Setup Instructions

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (Managed via NeonDB or local)

### Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd sana-monorepo
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install dependencies for all packages in the monorepo.

### Step 3: Configure Environment Variables

Create `.env` files in the following locations:

#### `packages/behavior-service/.env`
```env
DATABASE_URL="postgresql://neondb_owner:npg_hYSZTQKLq8M7@ep-little-water-ad2uenv3-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
PORT=3001
GEMINI_API_KEY="your-google-gemini-api-key"
```

#### `packages/logistics-service/.env`
```env
DATABASE_URL="postgresql://neondb_owner:npg_hYSZTQKLq8M7@ep-little-water-ad2uenv3-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
PORT=3002
```

### Step 4: Setup Database

Navigate to the behavior service and run Prisma migrations:

```bash
cd packages/behavior-service
npx prisma migrate dev --name init
npx prisma generate
```

(Optional) Seed the database with sample data:
```bash
npx tsx src/scripts/manual-seed.ts
```

### Step 5: Start the Application

From the root directory:

```bash
npm run start:all
```

This command will concurrently start:
- **Behavior Service** on `http://localhost:3001`
- **Logistics Service** on `http://localhost:3002`
- **Client (Command Center)** on `http://localhost:5173`

### Step 6: Access the Application

Open your browser and navigate to:
- **Santa Dashboard**: `http://localhost:5173`
- **Elf Login**: `http://localhost:5173/elf/login`

**Default Credentials**:
- **Santa Login**: Use the credentials set during database seeding
- **Elf Login**: Check the database or use credentials from seeded data

---

## 📂 Project Structure

```
sana-monorepo/
├── packages/
│   ├── behavior-service/          # Core data management service
│   │   ├── prisma/
│   │   │   └── schema.prisma      # Database schema
│   │   ├── src/
│   │   │   ├── controllers/       # Request handlers
│   │   │   ├── services/          # Business logic
│   │   │   │   ├── AIService.ts   # Google Gemini integration
│   │   │   │   ├── ChildService.ts
│   │   │   │   ├── ElfService.ts
│   │   │   │   ├── KafkaService.ts
│   │   │   │   └── SocketService.ts
│   │   │   ├── routes/            # API routes
│   │   │   ├── config/            # Configuration files
│   │   │   └── index.ts           # Entry point
│   │   └── package.json
│   │
│   ├── logistics-service/         # Factory management service
│   │   ├── src/
│   │   │   ├── services/
│   │   │   │   ├── FactoryService.ts
│   │   │   │   └── KafkaService.ts
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── client/                    # React frontend (Command Center)
│       ├── src/
│       │   ├── components/        # Reusable UI components
│       │   │   ├── SantaAI.tsx    # AI Assistant component
│       │   │   ├── EventConsole.tsx
│       │   │   ├── StatsPanel.tsx
│       │   │   └── ...
│       │   ├── pages/             # Route pages
│       │   │   ├── InteractiveMap.tsx
│       │   │   ├── ChildDatabase.tsx
│       │   │   ├── FactoryFloor.tsx
│       │   │   ├── SantaElfDirectory.tsx
│       │   │   └── elf/           # Elf dashboard pages
│       │   ├── context/           # React Context providers
│       │   │   ├── SantaAIContext.tsx
│       │   │   └── AlertContext.tsx
│       │   ├── layouts/           # Layout components
│       │   ├── hooks/             # Custom React hooks
│       │   ├── types/             # TypeScript type definitions
│       │   └── App.tsx            # Main application component
│       └── package.json
│
├── assets/                        # Screenshots and media
├── package.json                   # Root package.json (workspaces)
└── README.md                      # This file
```

---

## 📡 API Documentation

### Behavior Service (`http://localhost:3001`)

#### Children Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/children` | Get all children |
| GET | `/api/children/:id` | Get child by ID |
| POST | `/api/children` | Create new child |
| PATCH | `/api/children/:id` | Update child details |

#### Reports Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reports` | Get all reports |
| POST | `/api/reports` | Create new report (with file upload) |

#### Elves Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/elves` | Get all elves |
| GET | `/api/elves/:id` | Get elf by ID |
| POST | `/api/elves` | Create new elf |
| PATCH | `/api/elves/:id` | Update elf details |
| POST | `/api/elves/login` | Elf authentication |

#### AI Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/chat` | Send message to AI assistant |

#### Authentication Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/santa/login` | Santa authentication |

### Logistics Service (`http://localhost:3002`)

#### Factory Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/factory/stats` | Get factory statistics |
| GET | `/api/factory/production` | Get production data |

### WebSocket Events (Socket.IO)

#### Client → Server
- `identify-elf` - Elf identifies themselves on connection

#### Server → Client
- `new-event` - New report/event created
- `elf-status-update` - Elf online/offline status change
- `heartbeat` - Server heartbeat (every 5s)

---

## 🤖 AI Usage Declaration

As per hackathon guidelines, this project utilizes AI tools in the following areas:

### **AI-Assisted Development**
- **Code Generation**: Used AI (GitHub Copilot, ChatGPT) for boilerplate code generation and TypeScript type definitions
- **Debugging**: AI assistance for troubleshooting complex async/await patterns and Kafka integration
- **Documentation**: AI helped structure and format this README and inline code comments
- **UI/UX Ideas**: AI-generated suggestions for glassmorphism design patterns and color schemes

### **AI Integration in the Application**
- **Google Gemini AI**: Core feature for natural language processing in the SantaAI assistant
- **Tool Registration System**: Custom-built system that allows AI to execute registered component functions
- **Voice Recognition**: Web Speech API integration for voice commands

### **Original Work**
Despite AI assistance, the following are entirely original:
- ✅ Overall system architecture and microservices design
- ✅ Event-driven communication patterns (Kafka + Socket.IO)
- ✅ Database schema design and relationships
- ✅ Business logic and service implementations
- ✅ Custom React hooks and context providers
- ✅ Real-time map integration and event visualization
- ✅ Dual dashboard concept (Santa vs Elf perspectives)

**All code was written specifically for this hackathon and is not copied from existing projects.**

---

## 🎨 Design Philosophy

### Visual Design
- **Glassmorphism**: Translucent cards with backdrop blur effects
- **Cyber-Christmas Theme**: Dark mode with festive red, green, and gold accents
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Micro-animations**: Smooth transitions and hover effects for enhanced UX

### Code Quality
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Separation of Concerns**: Clear separation between controllers, services, and routes
- **Error Handling**: Comprehensive try-catch blocks with meaningful error messages
- **Code Reusability**: Shared types, utilities, and components

---

## 🔮 Future Enhancements

- [ ] **Mobile App**: React Native app for elves in the field
- [ ] **Advanced Analytics**: Machine learning for behavior prediction
- [ ] **Multi-language Support**: Internationalization for global operations
- [ ] **Email Notifications**: Automated alerts for critical events
- [ ] **PDF Reports**: Export functionality for child profiles and factory stats
- [ ] **Advanced Search**: Elasticsearch integration for complex queries
- [ ] **Blockchain Integration**: Immutable audit trail for behavioral reports
- [ ] **AR/VR Dashboard**: 3D visualization of global operations

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Brototype Student Excellence Team** for organizing the Santakku Oru App Hackathon
- **Google Gemini AI** for powering the natural language interface
- **OpenStreetMap** for geocoding services
- **Leaflet** for the amazing mapping library
- **The Open Source Community** for the incredible tools and frameworks

---

## 👨‍💻 Developer

**Built with ❤️ and ☕ for the Santakku Oru App Hackathon**

*This project represents a complete reimagining of Christmas operations through modern software engineering principles. Every line of code was written specifically for this hackathon, combining cutting-edge technologies with creative problem-solving to deliver a truly innovative solution.*

---

## 📞 Contact & Support

For questions, issues, or collaboration:
- **GitHub Issues**: [Create an issue](https://github.com/your-username/sana-monorepo/issues)
- **Email**: junuchammayil@gmail.com

---

**⭐ If you found this project interesting, please consider giving it a star!**
