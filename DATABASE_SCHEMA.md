# 🗄️ Database Schema Documentation

## 📊 Overview

The Maharashtra Sepaktakraw Association database is built on **PostgreSQL** with **Supabase** as the hosting platform. The schema is designed to support a comprehensive sports association management system with user roles, districts, officials, teams, results, notices, elections, and more.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE POSTGRESQL                     │
├─────────────────────────────────────────────────────────────┤
│  • Row Level Security (RLS)                                │
│  • Real-time subscriptions                                 │
│  • CDN for image optimization                              │
│  • Edge functions for serverless operations                │
└─────────────────────────────────────────────────────────────┘
```

## 📋 Entity Relationship Diagram

```mermaid
erDiagram
    User {
        string id PK
        string email UK
        string name
        Role role
        int districtId FK
        datetime createdAt
        datetime updatedAt
    }
    
    District {
        int id PK
        string slug UK
        string name
        string about
        string address
        string phone
        string email
        string website
        datetime createdAt
        datetime updatedAt
    }
    
    Official {
        int id PK
        string name
        string position
        string phone
        string email
        string photoUrl
        int districtId FK
    }
    
    Team {
        int id PK
        string name
        string category
        int districtId FK
    }
    
    Result {
        int id PK
        string level
        string stage
        string matchNo
        string teamA
        string teamB
        int scoreA
        int scoreB
        datetime date
        string venue
        int districtId FK
        string[] tags
        string notes
        boolean published
        datetime createdAt
    }
    
    Notice {
        int id PK
        string title
        string slug UK
        string body
        string category
        string fileUrl
        string[] attachments
        string priority
        boolean published
        datetime createdAt
    }
    
    StaticDoc {
        int id PK
        string section
        string title
        string fileUrl
        datetime createdAt
    }
    
    FormDef {
        int id PK
        string key UK
        string title
        string desc
        json schema
        boolean active
        datetime createdAt
        datetime updatedAt
    }
    
    Submission {
        int id PK
        string formKey
        json data
        datetime createdAt
    }
    
    Election {
        int id PK
        string title
        string description
        datetime startDate
        datetime endDate
        ElectionStatus status
        string type
        boolean published
        datetime createdAt
        datetime updatedAt
    }
    
    ElectionDocument {
        int id PK
        string title
        string type
        string fileUrl
        string content
        int electionId FK
        datetime createdAt
    }
    
    Candidate {
        int id PK
        string name
        string position
        int districtId FK
        int electionId FK
        string bio
        string manifesto
        string photoUrl
        CandidateStatus status
        datetime createdAt
        datetime updatedAt
    }
    
    Vote {
        int id PK
        int candidateId FK
        int electionId FK
        string voterId
        string voterEmail
        string ipAddress
        datetime createdAt
    }
    
    AuditLog {
        string id PK
        string userId
        string action
        string entity
        string entityId
        string ip
        datetime createdAt
    }

    %% Relationships
    User ||--o| District : "belongs to"
    District ||--o{ Official : "has many"
    District ||--o{ Team : "has many"
    District ||--o{ Result : "hosts"
    District ||--o{ User : "contains"
    District ||--o{ Candidate : "represents"
    
    Election ||--o{ ElectionDocument : "has many"
    Election ||--o{ Candidate : "has many"
    Election ||--o{ Vote : "receives"
    
    Candidate ||--o{ Vote : "receives"
    Candidate }o--|| District : "represents"
    Candidate }o--|| Election : "participates in"
    
    FormDef ||--o{ Submission : "generates"
```

## 🏢 Core Entities

### 1. **User Management**
```mermaid
graph TD
    A[User] --> B[Role Enum]
    A --> C[District]
    B --> D[SUPER_ADMIN]
    B --> E[STATE_ADMIN]
    B --> F[DISTRICT_ADMIN]
    B --> G[EDITOR]
    B --> H[VIEWER]
```

**Purpose**: Manages user authentication, authorization, and role-based access control.

**Key Features**:
- UUID-based primary keys for security
- Role-based permissions (5 levels)
- District association for localized access
- Audit trail integration

### 2. **District Management**
```mermaid
graph TD
    A[District] --> B[Officials]
    A --> C[Teams]
    A --> D[Results]
    A --> E[Users]
    A --> F[Candidates]
    B --> G[President]
    B --> H[Secretary]
    B --> I[Treasurer]
    C --> J[Men's Team]
    C --> K[Women's Team]
    C --> L[U19 Team]
```

**Purpose**: Central entity for organizing the association geographically.

**Key Features**:
- Unique slug for SEO-friendly URLs
- Complete contact information
- Hierarchical organization structure
- Cascade deletion for data integrity

### 3. **Elections System**
```mermaid
graph TD
    A[Election] --> B[ElectionDocument]
    A --> C[Candidate]
    A --> D[Vote]
    B --> E[NOTICE]
    B --> F[SCHEDULE]
    B --> G[FORM]
    B --> H[RESULT]
    C --> I[District]
    D --> J[Voter Tracking]
    D --> K[IP Address]
    D --> L[Email]
```

**Purpose**: Complete democratic voting system for association governance.

**Key Features**:
- Multiple election types (General, By-election, Special)
- Document management for election materials
- Secure voting with duplicate prevention
- Real-time vote counting and statistics

## 🔗 Relationship Types

### One-to-Many Relationships
- **District → Officials**: One district has many officials
- **District → Teams**: One district has many teams
- **District → Results**: One district can host many matches
- **Election → Candidates**: One election has many candidates
- **Election → Votes**: One election receives many votes

### Many-to-One Relationships
- **Official → District**: Many officials belong to one district
- **Team → District**: Many teams belong to one district
- **Candidate → District**: Many candidates can represent one district
- **Vote → Election**: Many votes belong to one election

### Self-Referencing Relationships
- **User → District**: Users can be associated with districts
- **Result → District**: Results can be associated with hosting districts

## 📊 Data Flow Architecture

```mermaid
graph LR
    A[Frontend] --> B[Next.js API Routes]
    B --> C[Prisma ORM]
    C --> D[PostgreSQL Database]
    D --> E[Supabase CDN]
    E --> F[Image Optimization]
    
    G[Admin Panel] --> B
    H[Public Pages] --> B
    I[Mobile App] --> B
    
    J[Row Level Security] --> D
    K[Real-time Subscriptions] --> D
    L[Edge Functions] --> D
```

## 🛡️ Security Features

### Row Level Security (RLS)
```sql
-- Example RLS Policy
CREATE POLICY "Users can view their own data" ON "User"
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Public can view published content" ON "Notice"
FOR SELECT USING (published = true);
```

### Data Validation
- **Email uniqueness** across users
- **Slug uniqueness** for SEO-friendly URLs
- **Foreign key constraints** for data integrity
- **Enum validation** for status fields
- **JSON schema validation** for form definitions

## 📈 Performance Optimizations

### Indexing Strategy
```sql
-- Primary indexes
CREATE INDEX "User_email_idx" ON "User"("email");
CREATE INDEX "District_slug_idx" ON "District"("slug");
CREATE INDEX "Result_date_idx" ON "Result"("date");
CREATE INDEX "Notice_createdAt_idx" ON "Notice"("createdAt");

-- Composite indexes
CREATE INDEX "Vote_election_candidate_idx" ON "Vote"("electionId", "candidateId");
CREATE INDEX "Result_district_date_idx" ON "Result"("districtId", "date");
```

### CDN Integration
- **Supabase Storage** for file uploads
- **Image optimization** with automatic resizing
- **Edge caching** for static content
- **Global distribution** for fast loading

## 🔄 Data Lifecycle

### Creation Flow
1. **User Registration** → User table
2. **District Assignment** → User-District relationship
3. **Content Creation** → Notices, Results, Elections
4. **Audit Logging** → All changes tracked

### Update Flow
1. **Authentication Check** → Role-based access
2. **Data Validation** → Schema compliance
3. **Update Execution** → Atomic transactions
4. **Audit Trail** → Change logging

### Deletion Flow
1. **Cascade Rules** → Related data cleanup
2. **Soft Delete** → For important entities
3. **Archive Strategy** → Historical data preservation
4. **Audit Preservation** → Permanent change records

## 📱 API Integration

### RESTful Endpoints
```
GET    /api/users           # List users
POST   /api/users           # Create user
GET    /api/users/[id]      # Get user
PUT    /api/users/[id]      # Update user
DELETE /api/users/[id]      # Delete user

GET    /api/districts       # List districts
GET    /api/districts/[slug] # Get district by slug
GET    /api/officials       # List officials
GET    /api/results         # List results
GET    /api/notices         # List notices
GET    /api/elections       # List elections
POST   /api/elections/[id]/vote # Cast vote
```

### Real-time Subscriptions
```javascript
// Real-time vote counting
const subscription = supabase
  .channel('election-votes')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'Vote'
  }, (payload) => {
    updateVoteCount(payload.new);
  })
  .subscribe();
```

## 🎯 Business Logic

### User Roles Hierarchy
```
SUPER_ADMIN (Level 5)
├── Full system access
├── User management
└── System configuration

STATE_ADMIN (Level 4)
├── State-wide operations
├── District management
└── Election oversight

DISTRICT_ADMIN (Level 3)
├── District-specific operations
├── Official management
└── Local elections

EDITOR (Level 2)
├── Content creation
├── Result entry
└── Notice publishing

VIEWER (Level 1)
├── Read-only access
├── Public content viewing
└── Voting participation
```

### Election Workflow
```
1. Election Creation
   ├── Set dates and parameters
   ├── Create documents
   └── Publish notice

2. Candidate Registration
   ├── Submit nominations
   ├── Review applications
   └── Approve candidates

3. Voting Period
   ├── Open voting
   ├── Monitor participation
   └── Prevent duplicates

4. Results
   ├── Close voting
   ├── Count votes
   └── Announce winners
```

## 🔧 Maintenance & Monitoring

### Database Health Checks
- **Connection monitoring**
- **Query performance analysis**
- **Storage usage tracking**
- **Backup verification**

### Data Integrity
- **Foreign key constraints**
- **Check constraints**
- **Unique constraints**
- **Not null constraints**

### Backup Strategy
- **Daily automated backups**
- **Point-in-time recovery**
- **Cross-region replication**
- **Disaster recovery plan**

---

## 🚀 Getting Started

### 1. Database Setup
```bash
# Run migrations
npx prisma db push

# Generate client
npx prisma generate

# Seed data
npm run seed
```

### 2. Environment Configuration
```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
```

### 3. RLS Policies
```sql
-- Enable RLS on all tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "District" ENABLE ROW LEVEL SECURITY;
-- ... (repeat for all tables)
```

---

**📊 This schema supports a comprehensive sports association management system with modern features like real-time updates, secure voting, role-based access, and scalable architecture.**
