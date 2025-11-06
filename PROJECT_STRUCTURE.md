# LMS Platform Frontend - Complete Project Structure Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Architecture](#project-architecture)
4. [Directory Structure](#directory-structure)
5. [Feature Modules](#feature-modules)
6. [Component Hierarchy](#component-hierarchy)
7. [State Management](#state-management)
8. [Routing Structure](#routing-structure)
9. [API Integration](#api-integration)
10. [Internationalization (i18n)](#internationalization-i18n)
11. [Build & Deployment](#build--deployment)

---

## 🎯 Project Overview

**AI Linc LMS Platform** is a comprehensive Learning Management System built with modern web technologies. It provides a full-featured educational platform with course management, assessments, live classes, job portal, community features, and admin dashboard capabilities.

### Key Features:
- 🎓 **Course Learning**: Video lectures, quizzes, coding problems, articles, assignments
- 📊 **Progress Tracking**: Heatmaps, streaks, daily time spent analytics
- 🎯 **Assessments**: Scholarship assessments with roadmap visualization
- 👥 **Community**: Discussion forums and collaboration
- 💼 **Jobs Portal**: Job listings and applications
- 📝 **Resume Builder**: Professional resume creation tool
- 🎥 **Live Classes**: Real-time learning sessions
- 👨‍💼 **Admin Dashboard**: Student management, referrals, workshop registrations
- 🌍 **Multi-language Support**: English, Hindi, Arabic, French
- 📱 **PWA Support**: Offline capabilities and mobile app experience

---

## 🛠 Technology Stack

### Core Technologies
```json
{
  "framework": "React 19.0.0",
  "language": "TypeScript 5.7.2",
  "bundler": "Vite 6.2.0",
  "styling": "Tailwind CSS 4.0.17",
  "stateManagement": "Redux Toolkit 2.7.0",
  "routing": "React Router DOM 7.4.1",
  "httpClient": "Axios 1.8.4"
}
```

### Key Libraries & Integrations

#### UI Components & Styling
- **@mui/material** (7.3.2) - Material UI components
- **@mui/icons-material** (7.3.4) - Material Design icons
- **lucide-react** (0.534.0) - Icon library
- **react-icons** (5.5.0) - Popular icon sets
- **motion** (12.23.24) - Animation library
- **tailwindcss** (4.0.17) - Utility-first CSS framework

#### Code Editors & IDE Features
- **@monaco-editor/react** (4.7.0) - Monaco Editor integration
- **@uiw/react-codemirror** (4.23.11) - CodeMirror editor
- **@codemirror/lang-javascript** (6.2.3)
- **@codemirror/lang-html** (6.4.9)
- **@codemirror/lang-css** (6.3.1)
- **@codemirror/theme-one-dark** (6.1.2)

#### Data Visualization & Charts
- **chart.js** (4.4.8) - Chart rendering
- **react-chartjs-2** (5.3.0) - React wrapper for Chart.js
- **recharts** (2.15.2) - Composable charting library

#### State & Data Management
- **@reduxjs/toolkit** (2.7.0) - State management
- **react-redux** (9.2.0) - React bindings for Redux
- **@tanstack/react-query** (5.74.4) - Data fetching & caching
- **@tanstack/react-query-devtools** (5.74.6) - DevTools

#### Internationalization
- **i18next** (25.5.3) - i18n framework
- **react-i18next** (16.0.0) - React integration
- **i18next-browser-languagedetector** (8.2.0) - Language detection

#### Utilities
- **date-fns** (4.1.0) - Date manipulation
- **crypto-js** (4.2.0) - Cryptography functions
- **uuid** (11.1.0) - UUID generation
- **xlsx** (0.18.5) - Excel file handling
- **html2pdf.js** (0.10.3) - HTML to PDF conversion
- **sanitize-html** (2.17.0) - HTML sanitization
- **html-react-parser** (5.2.5) - HTML parsing

#### Code Highlighting & Markdown
- **prismjs** (1.30.0) - Syntax highlighting
- **react-syntax-highlighter** (5.8.0) - React syntax highlighter
- **remark-gfm** (3.0.1) - GitHub Flavored Markdown

#### PWA Support
- **vite-plugin-pwa** (1.0.3) - PWA plugin for Vite
- Service Worker integration
- Offline support

---

## 🏗 Project Architecture

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                     React Application                        │
├─────────────────────────────────────────────────────────────┤
│  Features (Modular)                                          │
│  ├── Learn         │ ├── Admin          │ ├── Community     │
│  ├── Auth          │ ├── Jobs           │ ├── Resume        │
│  └── Live Classes  │                                         │
├─────────────────────────────────────────────────────────────┤
│  Common Components                                           │
│  ├── Buttons       │ ├── Modals         │ ├── Sidebar       │
│  └── Navigation    │                                         │
├─────────────────────────────────────────────────────────────┤
│  State Management (Redux + React Query)                      │
├─────────────────────────────────────────────────────────────┤
│  Services & API Layer (Axios)                                │
├─────────────────────────────────────────────────────────────┤
│  Routing (React Router v7)                                   │
└─────────────────────────────────────────────────────────────┘
```

### Design Patterns Used
- **Feature-based Architecture**: Organized by business domains
- **Component Composition**: Reusable UI components
- **Container/Presenter Pattern**: Separation of logic and presentation
- **Custom Hooks**: Reusable stateful logic
- **HOC (Higher-Order Components)**: Cross-cutting concerns
- **Context API**: Global state management for specific features
- **Service Layer**: Centralized API communication

---

## 📁 Directory Structure

### Root Level Structure
```
lms-platform-frontend/
├── public/                    # Static assets
│   ├── screenshot/           # PWA screenshots
│   ├── _redirects           # Netlify redirects
│   ├── browserconfig.xml    # Browser configuration
│   ├── offline.html         # Offline fallback page
│   └── sw-custom.js         # Custom service worker
├── scripts/                  # Build and utility scripts
│   ├── generate-pwa-assets.mjs
│   └── generate-splash-screens.mjs
├── src/                      # Source code
├── dev-dist/                 # Development build output
├── dist/                     # Production build output
├── .vscode/                  # VS Code settings
├── .git/                     # Git repository
├── .kiro/                    # Kiro AI configuration
│   └── specs/
│       └── pwa-configuration/
├── index.html                # Entry HTML file
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript configuration
├── tsconfig.app.json         # App-specific TS config
├── tsconfig.node.json        # Node-specific TS config
├── vite.config.ts            # Vite bundler configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── eslint.config.js          # ESLint configuration
├── netlify.toml              # Netlify deployment config
├── robots.txt                # Search engine crawler rules
├── README.md                 # Project readme
└── BACKEND-COURSE-INTERFACE.md  # Backend API documentation
```

---

## 📂 Source Code Structure (`src/`)

### Complete `src/` Directory Tree

```
src/
├── main.tsx                  # Application entry point
├── App.tsx                   # Root application component
├── App.css                   # Global application styles
├── index.css                 # Global CSS imports
├── routes.ts                 # Route definitions
├── pwa.ts                    # PWA configuration
├── vite-env.d.ts            # Vite type definitions
│
├── api/                      # API service layer
│   └── jobsApiService.ts    # Jobs API services
│
├── assets/                   # Static assets (images, fonts, icons)
│   ├── course_sidebar_assets/
│   ├── course-content/
│   ├── dashboard_assets/
│   ├── exploremore/
│   ├── font/
│   ├── learn/
│   ├── login-placeholder/
│   └── roadmap/
│
├── commonComponents/         # Reusable UI components
│   ├── common-buttons/
│   ├── components/
│   ├── enrollment-buttons/
│   │   ├── CourseEnrollmentCTA.tsx
│   │   ├── EnrollmentButtons.tsx
│   │   ├── FixedCTAButtons.tsx
│   │   └── PopupEnrollment.tsx
│   ├── icons/
│   ├── loading-spinner/
│   ├── mobileNavigation/
│   ├── modals/
│   │   ├── EnrollmentModal.tsx
│   │   ├── GenricModal.tsx
│   │   └── SwitchToDesktopModal.tsx
│   ├── private-route/
│   └── sidebar/
│       ├── CourseSidebar.tsx
│       ├── CourseSidebarContent.tsx
│       ├── SidebarItem.tsx
│       ├── SidebarList.tsx
│       ├── AllContent.tsx
│       ├── ArticleContent.tsx
│       ├── QuizContent.tsx
│       ├── SubjectiveContent.tsx
│       └── VideoContent.tsx
│
├── components/               # Feature-specific components
│   ├── admin/               # Admin dashboard components
│   ├── certificate/         # Certificate generation
│   ├── IDE/                # Integrated Development Environment
│   ├── ui/                 # UI utility components
│   ├── AccessDenied.tsx
│   ├── FloatingActivityTimer.tsx
│   ├── IOSFloatingInstallButton.tsx
│   ├── IOSInstallBanner.tsx
│   ├── IOSPWAInstallButton.tsx
│   ├── IOSPWAInstallPrompt.tsx
│   ├── IOSPWATestPage.tsx
│   ├── OfflineIndicator.tsx
│   ├── PWAInstallPrompt.tsx
│   ├── PWAProvider.tsx
│   ├── PWASplashScreen.tsx
│   ├── PWATestPage.tsx
│   ├── PWAUpdateNotification.tsx
│   ├── StreakCongratulationsModal.tsx
│   ├── ToastContainer.tsx
│   ├── UserActivityStats.tsx
│   └── UserProfile.tsx
│
├── constants/                # Application constants
│   ├── AdminNavigationLinks.tsx
│   ├── Container.tsx
│   ├── NavigationLink.tsx
│   ├── TopNav.tsx
│   └── typings.ts
│
├── contexts/                 # React Context providers
│   ├── AuthRedirectContext.tsx
│   ├── ToastContext.tsx
│   └── UserActivityContext.tsx
│
├── features/                 # Feature modules (main business logic)
│   ├── admin/               # Admin dashboard feature
│   │   ├── assesment-results/
│   │   │   ├── AssesmentStudentsResults.tsx
│   │   │   └── ReferralAnalytics.tsx
│   │   ├── referals/
│   │   │   └── Referals.tsx
│   │   └── workshop-registrations/
│   │       ├── WorkshopResistrations.tsx
│   │       ├── types.ts
│   │       ├── utils/
│   │       │   ├── csvParser.ts
│   │       │   └── filterUtils.ts
│   │       └── components/
│   │           ├── CSVUploadButton.tsx
│   │           ├── Pagination.tsx
│   │           ├── MeetingReminderStatus.tsx
│   │           ├── ActiveFiltersDisplay.tsx
│   │           ├── ColumnVisibilityDropdown.tsx
│   │           ├── NoDataState.tsx
│   │           ├── TestMeetingNotifications.tsx
│   │           ├── WorkshopTableHeader.tsx
│   │           ├── FilterDropdown.tsx
│   │           ├── index.ts
│   │           ├── modals/
│   │           │   ├── CommentModal.tsx
│   │           │   ├── EditHistoryModal.tsx
│   │           │   ├── PermissionDeniedModal.tsx
│   │           │   ├── EditOfferedAmountModal.tsx
│   │           │   ├── PaymentHistoryModal.tsx
│   │           │   ├── EditModal.tsx
│   │           │   ├── EmailConfirmationModal.tsx
│   │           │   ├── EditFollowUpDateModal.tsx
│   │           │   └── index.ts
│   │           └── table-row/
│   │               ├── WorkshopTableRow.tsx
│   │               ├── TableRowActions.tsx
│   │               └── TableCellRenderer.tsx
│   │
│   ├── auth/                # Authentication feature
│   │   └── pages/
│   │       ├── Login.tsx
│   │       ├── Signup.tsx
│   │       ├── Otp.tsx
│   │       └── ForgotPassword.tsx
│   │
│   ├── community/           # Community/Forum feature
│   │
│   ├── jobs/                # Jobs portal feature
│   │
│   ├── learn/               # Learning feature (largest module)
│   │   ├── components/
│   │   │   ├── assessment/
│   │   │   │   ├── AssessmentBanner.tsx
│   │   │   │   ├── AssessmentHeader.tsx
│   │   │   │   ├── AssessmentResults.tsx
│   │   │   │   ├── AssessmentSuccessNotification.tsx
│   │   │   │   ├── FinishAssessmentModal.tsx
│   │   │   │   ├── NavigationButtons.tsx
│   │   │   │   ├── PaymentModal.tsx
│   │   │   │   ├── PaymentProcessingModal.tsx
│   │   │   │   ├── PaymentSuccessModal.tsx
│   │   │   │   ├── PaymentToast.tsx
│   │   │   │   ├── QuestionDisplay.tsx
│   │   │   │   ├── QuestionNavigation.tsx
│   │   │   │   ├── ReferralCodeDisplay.tsx
│   │   │   │   ├── RoadmapPage.tsx
│   │   │   │   ├── index.ts
│   │   │   │   ├── components/
│   │   │   │   │   └── ChartComponents.tsx
│   │   │   │   ├── data/
│   │   │   │   │   └── assessmentData.tsx
│   │   │   │   ├── roadmap/
│   │   │   │   │   ├── CongratsModal.tsx
│   │   │   │   │   ├── MentorFeedback.tsx
│   │   │   │   │   ├── PaymentCard.tsx
│   │   │   │   │   ├── PaymentConfirmationModal.tsx
│   │   │   │   │   ├── PerformanceReport.tsx
│   │   │   │   │   ├── ProgramCard.tsx
│   │   │   │   │   ├── ScholarshipBreakupModal.tsx
│   │   │   │   │   └── ScholarshipCountDown.tsx
│   │   │   │   ├── types/
│   │   │   │   │   └── assessmentTypes.ts
│   │   │   │   └── utils/
│   │   │   │       └── assessmentUtils.tsx
│   │   │   ├── based-learning/
│   │   │   │   └── BasedLearningCourses.tsx
│   │   │   ├── continue-learning/
│   │   │   │   ├── CategoryBadge.tsx
│   │   │   │   ├── ContinueCourses.tsx
│   │   │   │   ├── ContinueCoursesCard.tsx
│   │   │   │   ├── ContinueCoursesDetails.tsx
│   │   │   │   ├── CourseCard.tsx
│   │   │   │   ├── CourseIconGroup.tsx
│   │   │   │   ├── CourseProgress.tsx
│   │   │   │   └── types.ts
│   │   │   ├── course-cards/
│   │   │   │   ├── article/
│   │   │   │   │   ├── ArticleCard.tsx
│   │   │   │   │   └── ArticleLayoutUtils.ts
│   │   │   │   ├── development/
│   │   │   │   │   ├── CodeMirrorDevelopmentCard.tsx
│   │   │   │   │   └── DevelopmentCard.tsx
│   │   │   │   ├── problem/
│   │   │   │   │   ├── ProblemCard.tsx
│   │   │   │   │   ├── problem.types.ts
│   │   │   │   │   └── components/
│   │   │   │   │       ├── Comments.tsx
│   │   │   │   │       ├── ConsoleTestCases.tsx
│   │   │   │   │       ├── Description.tsx
│   │   │   │   │       └── Submissions.tsx
│   │   │   │   ├── quiz/
│   │   │   │   │   └── QuizCard.tsx
│   │   │   │   ├── subjective/
│   │   │   │   │   └── SubjectiveCard.tsx
│   │   │   │   └── video/
│   │   │   │       └── VideoCard.tsx
│   │   │   ├── courses/
│   │   │   │   ├── CardHelperExpanded.tsx
│   │   │   │   ├── CardHelperNonExpanded.tsx
│   │   │   │   ├── CourseCard.tsx
│   │   │   │   ├── CourseIcons.tsx
│   │   │   │   ├── DesktopFilters.tsx
│   │   │   │   ├── DesktopSearch.tsx
│   │   │   │   ├── EmptyCoursesState.tsx
│   │   │   │   ├── EnrolledCourses.tsx
│   │   │   │   ├── FilterCategory.tsx
│   │   │   │   ├── FilterDropdown.tsx
│   │   │   │   ├── FilterOptions.ts
│   │   │   │   ├── MobileFilters.tsx
│   │   │   │   ├── NoCourse.tsx
│   │   │   │   ├── SortDropdown.tsx
│   │   │   │   ├── useTranslatedFilterOptions.ts
│   │   │   │   └── course-card-v2/
│   │   │   │       ├── CourseCardV2.tsx
│   │   │   │       ├── EnrolledCollapsedCard.tsx
│   │   │   │       ├── EnrolledExpandedCard.tsx
│   │   │   │       ├── NotEnrolledCollapsedCard.tsx
│   │   │   │       ├── NotEnrolledExpandedCard.tsx
│   │   │   │       ├── components/
│   │   │   │       │   ├── AchievementSection.tsx
│   │   │   │       │   ├── CardHeader.tsx
│   │   │   │       │   ├── CompanyLogosSection.tsx
│   │   │   │       │   ├── ContentMetricsSection.tsx
│   │   │   │       │   ├── IconActionsSection.tsx
│   │   │   │       │   ├── IconActionNonEnrolledSection.tsx
│   │   │   │       │   ├── IconNotEnrolledActionSection.tsx
│   │   │   │       │   ├── QuickOverviewSection.tsx
│   │   │   │       │   ├── index.ts
│   │   │   │       │   └── shared/
│   │   │   │       │       ├── CertifiedBySection.tsx
│   │   │   │       │       ├── ContinueLearningButton.tsx
│   │   │   │       │       ├── CourseCardContainer.tsx
│   │   │   │       │       ├── EnrolledBannerSection.tsx
│   │   │   │       │       ├── NextLessonSection.tsx
│   │   │   │       │       ├── NextUpSection.tsx
│   │   │   │       │       └── index.ts
│   │   │   │       └── utils/
│   │   │   │           ├── AchivementSection.tsx
│   │   │   │           └── courseDataUtils.ts
│   │   │   ├── daily-time-spent/
│   │   │   │   └── DailyTimeSpent.tsx
│   │   │   ├── enrolled-courses/
│   │   │   │   ├── CollapsibleCourseModule.tsx
│   │   │   │   ├── CollapsibleCourseModuleRedesigned.tsx
│   │   │   │   ├── CourseActions.tsx
│   │   │   │   ├── CourseActionsRedesigned.tsx
│   │   │   │   ├── CourseContent.tsx
│   │   │   │   ├── CourseHeader.tsx
│   │   │   │   ├── CourseStatistics.tsx
│   │   │   │   ├── CourseStatisticsRedesigned.tsx
│   │   │   │   ├── DashboardPieChart.tsx
│   │   │   │   ├── EnrolledLeader.tsx
│   │   │   │   └── ReportIssueModal.tsx
│   │   │   ├── floating-ai-button/
│   │   │   │   └── FloatingAIButton.tsx
│   │   │   ├── graphs-components/
│   │   │   │   ├── CustomTooltip.tsx
│   │   │   │   ├── HoursSpentCard.tsx
│   │   │   │   ├── LessonsHeatmapCard.tsx
│   │   │   │   ├── MonthHeatmap.tsx
│   │   │   │   └── TimeTrackingDashboard.tsx
│   │   │   ├── referrals/
│   │   │   │   └── Referrals.tsx
│   │   │   ├── video-player/
│   │   │   │   ├── VideoPlayer.tsx
│   │   │   │   ├── types.ts
│   │   │   │   ├── components/
│   │   │   │   │   ├── CircularProgress.tsx
│   │   │   │   │   ├── StandardPlayer.tsx
│   │   │   │   │   ├── VideoPlaceholder.tsx
│   │   │   │   │   └── VimeoPlayer.tsx
│   │   │   │   └── utils/
│   │   │   │       └── formatters.ts
│   │   │   ├── AttendanceDialog.tsx
│   │   │   ├── AttendanceMarking.tsx
│   │   │   ├── DailyProgressTable.tsx
│   │   │   ├── LeaderboardTable.tsx
│   │   │   ├── SkeletonLoader.tsx
│   │   │   ├── Streak.tsx
│   │   │   ├── StreakTable.tsx
│   │   │   └── WelcomeSection.tsx
│   │   ├── data/
│   │   │   ├── mockCourseContent.tsx
│   │   │   ├── mockDailyProgressTable.tsx
│   │   │   ├── mockDevelopmentData.ts
│   │   │   └── mockProblemData.ts
│   │   ├── hooks/
│   │   │   ├── useAssessment.ts
│   │   │   └── useCourseFilters.ts
│   │   ├── pages/
│   │   │   ├── AccountInactive.tsx
│   │   │   ├── AssessmentsList.tsx
│   │   │   ├── AttendancePage.tsx
│   │   │   ├── ContinueLearningAll.tsx
│   │   │   ├── CourseCallToAction.tsx
│   │   │   ├── CourseDetails.tsx
│   │   │   ├── CourseEnrollment.tsx
│   │   │   ├── Courses.tsx
│   │   │   ├── CourseTopicDetailPage.tsx
│   │   │   ├── EnrolledCourseDetailPage.tsx
│   │   │   ├── InstructionPage.tsx
│   │   │   ├── Learn.tsx
│   │   │   ├── PartialPaymentPage.tsx
│   │   │   ├── PhoneVerificationPage.tsx
│   │   │   ├── RecommendedLearningAll.tsx
│   │   │   └── ShortAssessment.tsx
│   │   ├── types/
│   │   │   ├── course.types.ts
│   │   │   ├── dummycourse.ts
│   │   │   ├── final-course.types.ts
│   │   │   └── heatmap.types.ts
│   │   └── utils/
│   │       ├── courseAdapter.ts
│   │       ├── courseTranslationUtils.ts
│   │       ├── interface.constant.ts
│   │       └── progressUtils.ts
│   │
│   ├── live/                # Live classes feature
│   │
│   └── resume-builder/      # Resume builder feature
│
├── hocs/                     # Higher-Order Components
│   ├── Errorpage.tsx
│   └── withAppInitializer.tsx
│
├── hooks/                    # Custom React hooks
│   ├── useAuth.ts
│   ├── useGoogleAuth.ts
│   ├── useIOSPWAInstall.ts
│   ├── useMediaQuery.ts
│   ├── usePWA.ts
│   ├── useRazorpayPayment.ts
│   ├── useRole.ts
│   ├── useStreakCongratulations.ts
│   ├── useTokenExpirationHandler.ts
│   └── useUserActivityTracking.ts
│
├── i18n/                     # Internationalization
│   ├── index.ts
│   └── locales/
│       ├── en.json          # English translations
│       ├── hi.json          # Hindi translations
│       ├── ar.json          # Arabic translations
│       └── fr.json          # French translations
│
├── pages/                    # Page components
│   └── admin/
│
├── redux/                    # Redux state management
│   ├── store.ts
│   └── slices/
│
├── services/                 # API service layer
│   ├── activityTrackingApi.ts
│   ├── attendanceApis.ts
│   ├── authApis.ts
│   ├── axiosInstance.ts
│   ├── certificateApis.ts
│   ├── dashboardApis.ts
│   ├── userApis.ts
│   ├── admin/
│   ├── assesment/
│   ├── community/
│   ├── continue-course-learning/
│   ├── enrolled-courses-content/
│   ├── live/
│   └── payment/
│
├── styles/                   # Global styles and CSS modules
│
├── types/                    # TypeScript type definitions
│   ├── date-fns.d.ts
│   ├── html2pdf.d.ts
│   ├── referral.ts
│   ├── user.ts
│   └── webinar.ts
│
└── utils/                    # Utility functions
```

---

## 🎨 Feature Modules

### 1. **Learning Module** (`features/learn/`)
The largest and most comprehensive module handling all learning-related functionality.

#### Key Components:
- **Course Management**
  - Course listing and filtering
  - Course enrollment
  - Course details and curriculum
  - Progress tracking

- **Content Types**
  - **Video Lectures**: Vimeo and standard video players
  - **Quizzes**: MCQ-based assessments
  - **Coding Problems**: IDE with test cases
  - **Articles**: Markdown-based content
  - **Assignments**: Subjective evaluations
  - **Development**: Hands-on coding exercises

- **Assessment System**
  - Short assessments
  - Scholarship assessments
  - Performance analytics
  - Roadmap visualization
  - Payment integration

- **Progress Analytics**
  - Daily time tracking
  - Heatmap visualizations
  - Streak tracking
  - Leaderboards
  - Course statistics

#### Pages:
```
/learn                          - Main learning dashboard
/learn/courses                  - Course catalog
/learn/courses/:id              - Course details
/learn/enrolled/:id             - Enrolled course view
/learn/enrolled/:id/:topicId    - Topic detail page
/learn/assessments              - Assessment listing
/learn/assessment/:id           - Take assessment
/learn/attendance               - Attendance tracking
/learn/continue-learning        - Continue learning section
```

---

### 2. **Authentication Module** (`features/auth/`)
Handles user authentication and authorization.

#### Components:
- **Login Page**: Email/phone + password login
- **Signup Page**: New user registration
- **OTP Verification**: Phone/email verification
- **Forgot Password**: Password recovery flow
- **Google OAuth**: Social login integration

#### Features:
- JWT token management
- Session persistence
- Role-based access control
- Protected routes
- Token expiration handling

---

### 3. **Admin Dashboard** (`features/admin/`)
Comprehensive admin panel for managing the platform.

#### Sub-modules:

**a) Workshop Registrations**
- CSV bulk upload
- Student registration management
- Filter and search functionality
- Column visibility controls
- Payment tracking
- Follow-up management
- Email notifications
- Meeting reminders

**b) Referrals Management**
- Referral code tracking
- Referral analytics
- Commission management
- Referral statistics

**c) Assessment Results**
- Student performance tracking
- Assessment analytics
- Result visualization
- Export functionality

#### Key Features:
- **Data Tables**: Sortable, filterable, paginated
- **Modals**: Edit, comment, payment history
- **CSV Operations**: Upload, export, parse
- **Permission Management**: Role-based access
- **Notifications**: Email and in-app

---

### 4. **Jobs Portal** (`features/jobs/`)
Job listing and application management system.

#### Features:
- Job listings
- Application tracking
- Resume integration
- Job search and filters
- Application status

---

### 5. **Community** (`features/community/`)
Social learning and discussion forums.

#### Features:
- Discussion threads
- Q&A forums
- Peer collaboration
- Community guidelines
- Moderation tools

---

### 6. **Resume Builder** (`features/resume-builder/`)
Professional resume creation tool.

#### Features:
- Template selection
- Drag-and-drop builder
- PDF export
- Print functionality
- Multiple resume formats
- ATS-friendly templates

---

### 7. **Live Classes** (`features/live/`)
Real-time learning sessions.

#### Features:
- Live video streaming
- Chat functionality
- Screen sharing
- Recording playback
- Attendance tracking

---

## 🧩 Common Components

### Navigation & Layout
```
commonComponents/
├── sidebar/                  # Course content sidebar
│   ├── CourseSidebar.tsx    # Main sidebar container
│   ├── CourseSidebarContent.tsx  # Content renderer
│   ├── SidebarList.tsx      # List wrapper
│   ├── SidebarItem.tsx      # Individual items
│   ├── AllContent.tsx       # Combined view
│   ├── VideoContent.tsx     # Video list
│   ├── ArticleContent.tsx   # Article list
│   ├── QuizContent.tsx      # Quiz list
│   └── SubjectiveContent.tsx # Assignment list
├── mobileNavigation/         # Mobile menu
└── TopNav.tsx               # Top navigation bar
```

### Buttons & Actions
```
commonComponents/
├── common-buttons/           # Generic buttons
└── enrollment-buttons/       # Course enrollment CTAs
    ├── CourseEnrollmentCTA.tsx
    ├── EnrollmentButtons.tsx
    ├── FixedCTAButtons.tsx
    └── PopupEnrollment.tsx
```

### Modals & Overlays
```
commonComponents/modals/
├── EnrollmentModal.tsx      # Course enrollment dialog
├── GenricModal.tsx          # Reusable modal wrapper
└── SwitchToDesktopModal.tsx # Desktop-only feature prompt
```

### Utilities
```
commonComponents/
├── loading-spinner/          # Loading indicators
├── icons/                    # Custom icon components
└── private-route/            # Protected route wrapper
```

---

## 🗄 State Management

### Redux Store Structure
```typescript
store/
├── slices/
│   ├── authSlice.ts          # Authentication state
│   ├── courseSlice.ts        # Course data
│   ├── userSlice.ts          # User profile
│   ├── assessmentSlice.ts    # Assessment state
│   └── uiSlice.ts           # UI state (modals, toasts)
└── store.ts                  # Root store configuration
```

### Context Providers
```typescript
contexts/
├── AuthRedirectContext.tsx   # Authentication redirects
├── ToastContext.tsx          # Global toast notifications
└── UserActivityContext.tsx   # Activity tracking
```

### React Query
Used for server state management:
- Data fetching
- Caching
- Background updates
- Optimistic updates
- Pagination

---

## 🛣 Routing Structure

### Route Configuration (`routes.ts`)
```typescript
Routes Hierarchy:
/
├── /                         # Landing/Home
├── /login                    # Login page
├── /signup                   # Registration
├── /otp                      # OTP verification
├── /forgot-password          # Password recovery
│
├── /learn                    # Learning dashboard
│   ├── /courses              # Course catalog
│   ├── /courses/:id          # Course details
│   ├── /enrolled/:id         # Enrolled course
│   ├── /enrolled/:id/:topicId # Topic detail
│   ├── /assessments          # Assessment list
│   ├── /assessment/:id       # Take assessment
│   ├── /attendance           # Attendance
│   └── /continue-learning    # Continue section
│
├── /admin                    # Admin dashboard
│   ├── /referrals            # Referral management
│   ├── /workshop-registrations # Workshop management
│   └── /assessment-results   # Results analytics
│
├── /jobs                     # Jobs portal
│   ├── /                     # Job listings
│   └── /:id                  # Job details
│
├── /community                # Community forums
│   ├── /                     # Forum home
│   └── /thread/:id           # Discussion thread
│
├── /resume-builder           # Resume builder
│   ├── /                     # Builder home
│   └── /preview              # Resume preview
│
└── /live                     # Live classes
    ├── /                     # Live class list
    └── /:id                  # Join live class
```

### Protected Routes
Routes requiring authentication:
- `/learn/*`
- `/admin/*`
- `/jobs/*`
- `/community/*`
- `/resume-builder/*`

### Role-Based Routes
- **Student**: All learning features
- **Admin**: Admin dashboard access
- **Instructor**: Course management
- **Guest**: Limited access

---

## 🌐 API Integration

### Service Layer Architecture
```
services/
├── axiosInstance.ts          # Configured Axios instance
│   ├── Base URL configuration
│   ├── Request interceptors (auth tokens)
│   ├── Response interceptors (error handling)
│   └── Retry logic
│
├── authApis.ts              # Authentication endpoints
│   ├── login()
│   ├── signup()
│   ├── verifyOTP()
│   ├── forgotPassword()
│   └── resetPassword()
│
├── dashboardApis.ts         # Dashboard data
│   ├── getDashboardStats()
│   ├── getRecentActivity()
│   └── getUserProgress()
│
├── userApis.ts              # User management
│   ├── getUserProfile()
│   ├── updateProfile()
│   └── uploadAvatar()
│
├── certificateApis.ts       # Certificate generation
│   ├── generateCertificate()
│   └── verifyCertificate()
│
├── attendanceApis.ts        # Attendance tracking
│   ├── markAttendance()
│   └── getAttendanceHistory()
│
├── activityTrackingApi.ts   # User activity
│   ├── logActivity()
│   └── getActivityStats()
│
└── Feature-specific services:
    ├── admin/               # Admin APIs
    ├── assesment/          # Assessment APIs
    ├── community/          # Community APIs
    ├── continue-course-learning/
    ├── enrolled-courses-content/
    ├── live/               # Live class APIs
    └── payment/            # Payment integration
```

### API Response Handling
```typescript
// Standard response format
{
  success: boolean;
  data: any;
  message: string;
  error?: any;
}

// Error handling
- Network errors
- Authentication errors (401)
- Authorization errors (403)
- Validation errors (400)
- Server errors (500)
```

---

## 🌍 Internationalization (i18n)

### Supported Languages
1. **English (en)** - Default
2. **Hindi (hi)**
3. **Arabic (ar)** - RTL support
4. **French (fr)**

### Translation Structure
```
i18n/locales/
├── en.json                   # English translations
├── hi.json                   # Hindi translations
├── ar.json                   # Arabic translations
└── fr.json                   # French translations
```

### Translation Namespaces
```json
{
  "auth": {
    "login": "Login",
    "signup": "Sign Up",
    "forgotPassword": "Forgot Password"
  },
  "courseSidebar": {
    "dashboard": "Dashboard",
    "all": "All",
    "videos": "Videos",
    "quizzes": "Quizzes"
  },
  "assessmentSuccess": {
    "title": "Assessment Completed",
    "scored": "You scored",
    "outOf": "out of"
  },
  "chartComponents": {
    "accuracy": "Accuracy",
    "rating": "Rating",
    "score": "Score"
  }
}
```

### Usage in Components
```typescript
import { useTranslation } from 'react-i18next';

function Component() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('auth.login')}</h1>
      <p>{t('auth.welcomeMessage')}</p>
    </div>
  );
}
```

### Language Detection
- Browser language detection
- LocalStorage preference
- URL parameter override
- Manual language switcher

---

## 🎨 Styling Architecture

### Tailwind CSS Configuration
```javascript
// tailwind.config.js
{
  theme: {
    extend: {
      colors: {
        primary: {...},
        secondary: {...},
        neutral: {...}
      },
      fontFamily: {
        sans: ['Inter', 'system-ui']
      }
    }
  }
}
```

### Custom CSS Variables
```css
:root {
  --primary-500: #...;
  --secondary-700: #...;
  --neutral-300: #...;
  --font-light: #...;
  --font-dark: #...;
}
```

### Styling Approaches
1. **Tailwind Utility Classes** - Primary method
2. **CSS Modules** - Component-specific styles
3. **Emotion/Styled Components** - Material UI integration
4. **Global Styles** - `index.css`, `App.css`

---

## 🔧 Custom Hooks

### Authentication Hooks
```typescript
useAuth()                     # Authentication state & methods
useGoogleAuth()              # Google OAuth integration
useTokenExpirationHandler()  # JWT token management
useRole()                    # Role-based access control
```

### Feature Hooks
```typescript
useAssessment()              # Assessment logic & state
useCourseFilters()           # Course filtering logic
useRazorpayPayment()        # Payment integration
useUserActivityTracking()    # Activity logging
```

### UI Hooks
```typescript
useMediaQuery()              # Responsive breakpoints
usePWA()                     # PWA installation & updates
useIOSPWAInstall()          # iOS PWA specific logic
useStreakCongratulations()   # Streak achievements
```

---

## 📦 Build & Deployment

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Runs on http://localhost:5173
```

### Production Build
```bash
# Type check & build
npm run build

# Output directory: dist/
```

### Preview Production Build
```bash
npm run preview
```

### Environment Variables
```env
VITE_API_BASE_URL=https://api.ailinc.com
VITE_RAZORPAY_KEY=...
VITE_GOOGLE_CLIENT_ID=...
```

### Netlify Deployment
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Build Optimizations
- **Code Splitting**: Route-based lazy loading
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Image compression
- **Caching**: Service worker caching strategies
- **Minification**: JS, CSS, HTML minification

---

## 🔌 PWA Configuration

### Service Worker
```typescript
// pwa.ts
- Precaching static assets
- Runtime caching strategies
- Background sync
- Push notifications
- Update notifications
```

### Manifest
```json
{
  "name": "AI Linc LMS",
  "short_name": "AI Linc",
  "theme_color": "#...",
  "background_color": "#...",
  "display": "standalone",
  "scope": "/",
  "start_url": "/",
  "icons": [...]
}
```

### Offline Support
- Offline page (`public/offline.html`)
- Cached API responses
- Background sync queue
- Network-first, cache-fallback strategy

---

## 📊 Performance Optimizations

### Code Splitting
```typescript
// Lazy loading routes
const Learn = lazy(() => import('./features/learn/pages/Learn'));
const Admin = lazy(() => import('./features/admin'));
```

### Memoization
```typescript
// React.memo for expensive components
const ExpensiveComponent = React.memo(Component);

// useMemo for expensive calculations
const value = useMemo(() => expensiveCalc(), [deps]);

// useCallback for function references
const handler = useCallback(() => {...}, [deps]);
```

### Image Optimization
- Lazy loading images
- Responsive images
- WebP format support
- Compression

### Bundle Analysis
```bash
# Analyze bundle size
npm run build -- --mode production
```

---

## 🧪 Testing Strategy

### Test Structure (Recommended)
```
src/
├── features/
│   └── learn/
│       ├── __tests__/
│       │   ├── Learn.test.tsx
│       │   └── CourseCard.test.tsx
│       └── components/
```

### Testing Tools (Recommended Setup)
- **Vitest** - Unit testing
- **React Testing Library** - Component testing
- **Playwright** - E2E testing

---

## 🔐 Security Features

### Authentication
- JWT token-based auth
- Secure token storage
- Token refresh mechanism
- Password hashing (backend)

### Data Protection
- Input sanitization (`sanitize-html`)
- XSS protection
- CSRF protection
- Content Security Policy

### API Security
- HTTPS only
- CORS configuration
- Rate limiting (backend)
- Request validation

---

## 📱 Responsive Design

### Breakpoints
```typescript
sm: 640px    // Mobile
md: 768px    // Tablet
lg: 1024px   // Desktop
xl: 1280px   // Large desktop
2xl: 1536px  // Extra large
```

### Mobile-First Approach
- All components responsive
- Touch-friendly interactions
- Mobile navigation
- Adaptive layouts

---

## 🐛 Error Handling

### Error Boundaries
```typescript
// hocs/Errorpage.tsx
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### Global Error Handler
- API error interceptor
- Error logging
- User-friendly error messages
- Retry mechanisms

### Toast Notifications
```typescript
// contexts/ToastContext.tsx
- Success messages
- Error notifications
- Warning alerts
- Info messages
```

---

## 📈 Analytics & Tracking

### User Activity Tracking
```typescript
// contexts/UserActivityContext.tsx
- Page views
- Time spent
- Feature usage
- Engagement metrics
```

### Activity API
```typescript
// services/activityTrackingApi.ts
- Log user actions
- Track learning progress
- Monitor engagement
- Generate reports
```

---

## 🛠 Development Tools

### VS Code Configuration
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### ESLint
```javascript
// eslint.config.js
- React hooks rules
- TypeScript rules
- Code quality rules
- Best practices
```

### TypeScript
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "module": "ESNext"
  }
}
```

---

## 📚 Key Dependencies Summary

### Core Framework
- **React 19.0.0** - UI library
- **TypeScript 5.7.2** - Type safety
- **Vite 6.2.0** - Build tool

### State Management
- **Redux Toolkit 2.7.0** - Global state
- **React Query 5.74.4** - Server state

### Routing
- **React Router DOM 7.4.1** - Navigation

### UI Framework
- **Material UI 7.3.2** - Component library
- **Tailwind CSS 4.0.17** - Utility CSS

### Code Editors
- **Monaco Editor 4.7.0** - VS Code editor
- **CodeMirror 6.0.1** - Lightweight editor

### Data Visualization
- **Chart.js 4.4.8** - Charts
- **Recharts 2.15.2** - React charts

### Utilities
- **Axios 1.8.4** - HTTP client
- **i18next 25.5.3** - Internationalization
- **date-fns 4.1.0** - Date handling
- **crypto-js 4.2.0** - Encryption

---

## 🎯 Development Workflow

### Feature Development
1. Create feature branch
2. Implement component
3. Add translations (all 4 languages)
4. Write tests
5. Code review
6. Merge to main

### Component Creation Pattern
```typescript
// 1. Create component file
features/learn/components/NewComponent.tsx

// 2. Add TypeScript types
features/learn/types/newComponent.types.ts

// 3. Create service (if needed)
services/newComponentApi.ts

// 4. Add translations
i18n/locales/[en|hi|ar|fr].json

// 5. Export from index
features/learn/components/index.ts
```

---

## 📖 Documentation

### Code Documentation
- **JSDoc comments** for complex functions
- **README files** in major directories
- **Type definitions** for all interfaces
- **Inline comments** for business logic

### API Documentation
- `BACKEND-COURSE-INTERFACE.md` - Backend API specs
- Swagger/OpenAPI docs (backend)

---

## 🚀 Future Enhancements

### Planned Features
- [ ] Real-time collaboration
- [ ] Advanced analytics dashboard
- [ ] Gamification system
- [ ] AI-powered recommendations
- [ ] Mobile app (React Native)
- [ ] Blockchain certificates
- [ ] Video conferencing integration
- [ ] Advanced code playground

### Technical Improvements
- [ ] Micro-frontend architecture
- [ ] GraphQL integration
- [ ] Enhanced caching strategies
- [ ] Performance monitoring
- [ ] A/B testing framework
- [ ] Advanced error tracking (Sentry)

---

## 👥 Contributing

### Code Style
- Use TypeScript for all new files
- Follow ESLint rules
- Use functional components with hooks
- Implement responsive design
- Add translations for all text

### Commit Messages
```
feat: Add new assessment feature
fix: Resolve course enrollment bug
docs: Update API documentation
style: Format code with Prettier
refactor: Simplify course filtering logic
test: Add unit tests for CourseCard
```

---

## 📞 Support & Contact

### Development Team
- **Frontend**: React + TypeScript team
- **Backend**: Node.js/Express team
- **DevOps**: Infrastructure team

### Resources
- Internal documentation
- API playground
- Design system
- Component library

---

## 📝 License

Proprietary - AI Linc LMS Platform
© 2024 AI Linc. All rights reserved.

---

---

## 🏗️ IMPLEMENTATION GUIDE - BUILD FROM SCRATCH

This section provides detailed implementation instructions for each architectural layer. Use this as a blueprint to recreate this architecture for ANY similar application (e.g., Gym Management System, Hospital Management, E-commerce).

---

## 📐 Phase 1: Project Initialization

### Step 1.1: Create Project Foundation

```bash
# Create Vite + React + TypeScript project
npm create vite@latest my-gym-app -- --template react-ts

cd my-gym-app
npm install
```

### Step 1.2: Install Core Dependencies

```bash
# State Management
npm install @reduxjs/toolkit react-redux
npm install @tanstack/react-query @tanstack/react-query-devtools

# Routing
npm install react-router-dom

# HTTP Client
npm install axios

# UI Libraries
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
npm install tailwindcss postcss autoprefixer
npm install lucide-react react-icons

# Utilities
npm install date-fns uuid
npm install crypto-js

# Internationalization
npm install i18next react-i18next i18next-browser-languagedetector

# Forms & Validation
npm install react-hook-form zod @hookform/resolvers

# Charts & Visualization
npm install chart.js react-chartjs-2 recharts

# TypeScript Types
npm install -D @types/uuid @types/crypto-js
```

### Step 1.3: Initialize Tailwind CSS

```bash
npx tailwindcss init -p
```

**Configure `tailwind.config.js`:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... add your brand colors
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
        secondary: {
          // ... secondary colors
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

**Update `src/index.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary-500: #0ea5e9;
  --secondary-700: #334155;
  --neutral-300: #cbd5e1;
  --font-light: #f8fafc;
  --font-dark: #0f172a;
}

/* Custom global styles */
body {
  margin: 0;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}
```

---

## 📂 Phase 2: Directory Structure Setup

### Step 2.1: Create Folder Structure

```bash
# Navigate to src directory
cd src

# Create main directories
mkdir -p api assets commonComponents components constants contexts features hocs hooks i18n pages redux services styles types utils

# Create feature modules
mkdir -p features/{auth,admin,members,trainers,classes,billing,dashboard}

# Create subdirectories for each feature
mkdir -p features/members/{components,pages,types,hooks,utils}
mkdir -p features/trainers/{components,pages,types,hooks}
mkdir -p features/classes/{components,pages,types,hooks}
mkdir -p features/billing/{components,pages,types,hooks}

# Create common component subdirectories
mkdir -p commonComponents/{modals,buttons,forms,loading-spinner,sidebar,navigation}

# Create service subdirectories
mkdir -p services/{auth,members,trainers,classes,billing}

# Create i18n locales
mkdir -p i18n/locales

# Create Redux slices
mkdir -p redux/slices
```

### Step 2.2: File Structure Template

```
src/
├── main.tsx                  # Entry point
├── App.tsx                   # Root component
├── App.css                   # Global styles
├── index.css                 # Tailwind imports
├── routes.ts                 # Route definitions
├── vite-env.d.ts            # Vite types
│
├── api/                      # API services
│   └── {featureName}ApiService.ts
│
├── assets/                   # Static files
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── commonComponents/         # Reusable UI
│   ├── buttons/
│   ├── modals/
│   ├── forms/
│   ├── loading-spinner/
│   ├── sidebar/
│   └── navigation/
│
├── components/               # Feature-specific
│   └── {featureName}/
│
├── constants/                # App constants
│   ├── navigationLinks.tsx
│   └── config.ts
│
├── contexts/                 # React Context
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
│
├── features/                 # Feature modules
│   └── {featureName}/
│       ├── components/
│       ├── pages/
│       ├── types/
│       ├── hooks/
│       └── utils/
│
├── hocs/                     # Higher-Order Components
│   └── withAuth.tsx
│
├── hooks/                    # Custom hooks
│   ├── useAuth.ts
│   └── useMediaQuery.ts
│
├── i18n/                     # Internationalization
│   ├── index.ts
│   └── locales/
│       ├── en.json
│       ├── hi.json
│       └── ar.json
│
├── pages/                    # Page components
│
├── redux/                    # State management
│   ├── store.ts
│   └── slices/
│       ├── authSlice.ts
│       └── uiSlice.ts
│
├── services/                 # API layer
│   ├── axiosInstance.ts
│   └── {featureName}Apis.ts
│
├── styles/                   # Additional styles
│
├── types/                    # TypeScript types
│   └── {featureName}.ts
│
└── utils/                    # Utility functions
    ├── dateUtils.ts
    └── validators.ts
```

---

## ⚙️ Phase 3: Core Configuration Files

### Step 3.1: Axios Instance Configuration

**File: `src/services/axiosInstance.ts`**

```typescript
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Create axios instance with base configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to requests
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle 401 Unauthorized - Token expired
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }

    // Handle 403 Forbidden - No permission
    if (error.response?.status === 403) {
      // Show error toast or redirect
      console.error('Access denied');
    }

    // Handle 500 Server Error
    if (error.response?.status === 500) {
      console.error('Server error occurred');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
```

**Usage Pattern:**
- All API services import this instance
- Automatically adds auth tokens
- Handles common errors globally
- Can add retry logic, request queueing

---

### Step 3.2: Redux Store Setup

**File: `src/redux/store.ts`**

```typescript
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import memberReducer from './slices/memberSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    members: memberReducer,
    // Add more slices as needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable if using non-serializable data
    }),
  devTools: import.meta.env.MODE !== 'production',
});

// Infer types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**File: `src/redux/slices/authSlice.ts`**

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'trainer' | 'member';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('authToken'),
  isAuthenticated: !!localStorage.getItem('authToken'),
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem('authToken', action.payload.token);
    },
    loginFailure: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authToken');
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
```

**File: `src/redux/slices/uiSlice.ts`**

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  loading: boolean;
  toast: {
    open: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  };
}

const initialState: UIState = {
  sidebarOpen: true,
  theme: 'light',
  loading: false,
  toast: {
    open: false,
    message: '',
    type: 'info',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    showToast: (state, action: PayloadAction<{ message: string; type: UIState['toast']['type'] }>) => {
      state.toast = {
        open: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    hideToast: (state) => {
      state.toast.open = false;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, toggleTheme, setLoading, showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;
```

---

### Step 3.3: React Query Setup

**File: `src/main.tsx`**

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { store } from './redux/store';
import App from './App';
import './index.css';
import './i18n'; // Initialize i18n

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
```

---

### Step 3.4: Internationalization Setup

**File: `src/i18n/index.ts`**

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import en from './locales/en.json';
import hi from './locales/hi.json';
import ar from './locales/ar.json';

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n to react-i18next
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      ar: { translation: ar },
    },
    fallbackLng: 'en',
    debug: import.meta.env.MODE === 'development',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
```

**File: `src/i18n/locales/en.json`**

```json
{
  "auth": {
    "login": "Login",
    "signup": "Sign Up",
    "email": "Email",
    "password": "Password",
    "forgotPassword": "Forgot Password?",
    "loginButton": "Sign In",
    "noAccount": "Don't have an account?",
    "errors": {
      "invalidCredentials": "Invalid email or password",
      "serverError": "Server error. Please try again."
    }
  },
  "sidebar": {
    "dashboard": "Dashboard",
    "members": "Members",
    "trainers": "Trainers",
    "classes": "Classes",
    "billing": "Billing",
    "reports": "Reports"
  },
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "search": "Search",
    "loading": "Loading..."
  }
}
```

**File: `src/i18n/locales/hi.json`**

```json
{
  "auth": {
    "login": "लॉगिन",
    "signup": "साइन अप करें",
    "email": "ईमेल",
    "password": "पासवर्ड",
    "forgotPassword": "पासवर्ड भूल गए?",
    "loginButton": "साइन इन करें",
    "noAccount": "खाता नहीं है?",
    "errors": {
      "invalidCredentials": "अमान्य ईमेल या पासवर्ड",
      "serverError": "सर्वर त्रुटि। कृपया पुनः प्रयास करें।"
    }
  },
  "sidebar": {
    "dashboard": "डैशबोर्ड",
    "members": "सदस्य",
    "trainers": "प्रशिक्षक",
    "classes": "कक्षाएं",
    "billing": "बिलिंग",
    "reports": "रिपोर्ट"
  },
  "common": {
    "save": "सहेजें",
    "cancel": "रद्द करें",
    "delete": "हटाएं",
    "edit": "संपादित करें",
    "search": "खोजें",
    "loading": "लोड हो रहा है..."
  }
}
```

---

### Step 3.5: Routing Configuration

**File: `src/routes.ts`**

```typescript
export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  
  // Dashboard
  DASHBOARD: '/dashboard',
  
  // Members
  MEMBERS: '/members',
  MEMBER_DETAIL: '/members/:id',
  ADD_MEMBER: '/members/add',
  
  // Trainers
  TRAINERS: '/trainers',
  TRAINER_DETAIL: '/trainers/:id',
  ADD_TRAINER: '/trainers/add',
  
  // Classes
  CLASSES: '/classes',
  CLASS_DETAIL: '/classes/:id',
  ADD_CLASS: '/classes/add',
  CLASS_SCHEDULE: '/classes/schedule',
  
  // Billing
  BILLING: '/billing',
  INVOICES: '/billing/invoices',
  PAYMENTS: '/billing/payments',
  SUBSCRIPTIONS: '/billing/subscriptions',
  
  // Admin
  ADMIN: '/admin',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_REPORTS: '/admin/reports',
  
  // Profile
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

// Helper function to generate dynamic routes
export const generateRoute = (route: string, params: Record<string, string>) => {
  let path = route;
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, value);
  });
  return path;
};

// Example usage: generateRoute(ROUTES.MEMBER_DETAIL, { id: '123' })
```

**File: `src/App.tsx`**

```typescript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { lazy, Suspense } from 'react';
import { RootState } from './redux/store';
import { ROUTES } from './routes';
import LoadingSpinner from './commonComponents/loading-spinner/LoadingSpinner';

// Lazy load pages for code splitting
const Login = lazy(() => import('./features/auth/pages/Login'));
const Signup = lazy(() => import('./features/auth/pages/Signup'));
const Dashboard = lazy(() => import('./features/dashboard/pages/Dashboard'));
const Members = lazy(() => import('./features/members/pages/Members'));
const MemberDetail = lazy(() => import('./features/members/pages/MemberDetail'));
const Trainers = lazy(() => import('./features/trainers/pages/Trainers'));
const Classes = lazy(() => import('./features/classes/pages/Classes'));

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
          
          {/* Protected Routes */}
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.MEMBERS}
            element={
              <ProtectedRoute>
                <Members />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.MEMBER_DETAIL}
            element={
              <ProtectedRoute>
                <MemberDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.TRAINERS}
            element={
              <ProtectedRoute>
                <Trainers />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.CLASSES}
            element={
              <ProtectedRoute>
                <Classes />
              </ProtectedRoute>
            }
          />
          
          {/* Redirect root to dashboard or login */}
          <Route
            path={ROUTES.HOME}
            element={<Navigate to={ROUTES.DASHBOARD} replace />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
```

---

## 🔐 Phase 4: Authentication Implementation

### Step 4.1: Auth Service Layer

**File: `src/services/authApis.ts`**

```typescript
import axiosInstance from './axiosInstance';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
    token: string;
  };
  message: string;
}

// Login API
export const loginApi = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

// Signup API
export const signupApi = async (data: SignupData): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/auth/signup', data);
  return response.data;
};

// Verify OTP
export const verifyOtpApi = async (email: string, otp: string) => {
  const response = await axiosInstance.post('/auth/verify-otp', { email, otp });
  return response.data;
};

// Forgot Password
export const forgotPasswordApi = async (email: string) => {
  const response = await axiosInstance.post('/auth/forgot-password', { email });
  return response.data;
};

// Reset Password
export const resetPasswordApi = async (token: string, newPassword: string) => {
  const response = await axiosInstance.post('/auth/reset-password', { token, newPassword });
  return response.data;
};

// Get Current User
export const getCurrentUserApi = async () => {
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};

// Logout
export const logoutApi = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};
```

### Step 4.2: Custom Auth Hook

**File: `src/hooks/useAuth.ts`**

```typescript
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { loginApi, signupApi, getCurrentUserApi, logoutApi, LoginCredentials, SignupData } from '../services/authApis';
import { loginStart, loginSuccess, loginFailure, logout, setUser } from '../redux/slices/authSlice';
import { showToast } from '../redux/slices/uiSlice';
import { RootState } from '../redux/store';
import { ROUTES } from '../routes';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => loginApi(credentials),
    onMutate: () => {
      dispatch(loginStart());
    },
    onSuccess: (data) => {
      dispatch(loginSuccess({
        user: data.data.user,
        token: data.data.token,
      }));
      dispatch(showToast({ message: 'Login successful!', type: 'success' }));
      navigate(ROUTES.DASHBOARD);
    },
    onError: (error: any) => {
      dispatch(loginFailure());
      const message = error.response?.data?.message || 'Login failed';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  // Signup mutation
  const signupMutation = useMutation({
    mutationFn: (data: SignupData) => signupApi(data),
    onSuccess: (data) => {
      dispatch(loginSuccess({
        user: data.data.user,
        token: data.data.token,
      }));
      dispatch(showToast({ message: 'Account created successfully!', type: 'success' }));
      navigate(ROUTES.DASHBOARD);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Signup failed';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  // Get current user query
  const { data: currentUser, refetch: refetchUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUserApi,
    enabled: isAuthenticated,
    onSuccess: (data) => {
      dispatch(setUser(data.data.user));
    },
  });

  // Logout function
  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(logout());
      dispatch(showToast({ message: 'Logged out successfully', type: 'success' }));
      navigate(ROUTES.LOGIN);
    } catch (error) {
      dispatch(logout());
      navigate(ROUTES.LOGIN);
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    logout: handleLogout,
    refetchUser,
    isLoggingIn: loginMutation.isPending,
    isSigningUp: signupMutation.isPending,
  };
};
```

### Step 4.3: Login Page Implementation

**File: `src/features/auth/pages/Login.tsx`**

```typescript
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES } from '../../../routes';

const Login = () => {
  const { t } = useTranslation();
  const { login, isLoggingIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      login({ email, password });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {t('auth.login')}
          </h1>
          <p className="text-gray-600 mt-2">Welcome back! Please login to your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t('auth.email')}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              {t('auth.password')}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {t('auth.forgotPassword')}
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoggingIn ? t('common.loading') : t('auth.loginButton')}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center mt-6 text-gray-600">
          {t('auth.noAccount')}{' '}
          <Link to={ROUTES.SIGNUP} className="text-blue-600 hover:text-blue-800 font-semibold">
            {t('auth.signup')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
```

---

## 🎨 Phase 5: Common Components

### Step 5.1: Reusable Button Component

**File: `src/commonComponents/buttons/Button.tsx`**

```typescript
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
        ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={buttonVariants({ variant, size, fullWidth, className })}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
```

**Usage:**
```typescript
<Button variant="primary" size="lg" onClick={handleClick}>
  Save Changes
</Button>

<Button variant="danger" isLoading={isDeleting} onClick={handleDelete}>
  Delete
</Button>
```

### Step 5.2: Modal Component

**File: `src/commonComponents/modals/Modal.tsx`**

```typescript
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className={`relative bg-white rounded-xl shadow-2xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-hidden`}>
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b">
            {title && <h2 className="text-2xl font-bold text-gray-800">{title}</h2>}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
```

**Usage:**
```typescript
const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Add New Member"
  size="lg"
>
  <MemberForm onSubmit={handleSubmit} />
</Modal>
```

### Step 5.3: Loading Spinner

**File: `src/commonComponents/loading-spinner/LoadingSpinner.tsx`**

```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  fullScreen = false,
  message,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 ${sizeClasses[size]}`} />
      {message && <p className="text-gray-600 text-sm">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
```

---

## 📊 Phase 6: Feature Module Implementation

### Step 6.1: Feature Module Structure (Example: Members)

**File: `src/features/members/types/member.types.ts`**

```typescript
export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  membership: {
    type: 'basic' | 'premium' | 'vip';
    startDate: string;
    endDate: string;
    status: 'active' | 'expired' | 'suspended';
  };
  healthInfo: {
    weight: number;
    height: number;
    bloodGroup: string;
    medicalConditions: string[];
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateMemberData extends Omit<Member, 'id' | 'createdAt' | 'updatedAt'> {}
export interface UpdateMemberData extends Partial<CreateMemberData> {}
```

**File: `src/services/memberApis.ts`**

```typescript
import axiosInstance from './axiosInstance';
import { Member, CreateMemberData, UpdateMemberData } from '../features/members/types/member.types';

// Get all members
export const getMembersApi = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) => {
  const response = await axiosInstance.get('/members', { params });
  return response.data;
};

// Get single member
export const getMemberByIdApi = async (id: string) => {
  const response = await axiosInstance.get(`/members/${id}`);
  return response.data;
};

// Create member
export const createMemberApi = async (data: CreateMemberData) => {
  const response = await axiosInstance.post('/members', data);
  return response.data;
};

// Update member
export const updateMemberApi = async (id: string, data: UpdateMemberData) => {
  const response = await axiosInstance.put(`/members/${id}`, data);
  return response.data;
};

// Delete member
export const deleteMemberApi = async (id: string) => {
  const response = await axiosInstance.delete(`/members/${id}`);
  return response.data;
};

// Get member statistics
export const getMemberStatsApi = async () => {
  const response = await axiosInstance.get('/members/stats');
  return response.data;
};
```

**File: `src/features/members/hooks/useMembers.ts`**

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {
  getMembersApi,
  getMemberByIdApi,
  createMemberApi,
  updateMemberApi,
  deleteMemberApi,
} from '../../../services/memberApis';
import { showToast } from '../../../redux/slices/uiSlice';
import { CreateMemberData, UpdateMemberData } from '../types/member.types';

export const useMembers = (params?: any) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // Get all members
  const {
    data: members,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['members', params],
    queryFn: () => getMembersApi(params),
  });

  // Create member
  const createMutation = useMutation({
    mutationFn: (data: CreateMemberData) => createMemberApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      dispatch(showToast({ message: 'Member created successfully', type: 'success' }));
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to create member';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  // Update member
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMemberData }) =>
      updateMemberApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      dispatch(showToast({ message: 'Member updated successfully', type: 'success' }));
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update member';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  // Delete member
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteMemberApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      dispatch(showToast({ message: 'Member deleted successfully', type: 'success' }));
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete member';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  return {
    members: members?.data || [],
    totalMembers: members?.total || 0,
    isLoading,
    error,
    refetch,
    createMember: createMutation.mutate,
    updateMember: updateMutation.mutate,
    deleteMember: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

// Hook for single member
export const useMember = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['member', id],
    queryFn: () => getMemberByIdApi(id),
    enabled: !!id,
  });

  return {
    member: data?.data,
    isLoading,
    error,
  };
};
```

**File: `src/features/members/pages/Members.tsx`**

```typescript
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, Filter } from 'lucide-react';
import { useMembers } from '../hooks/useMembers';
import Button from '../../../commonComponents/buttons/Button';
import Modal from '../../../commonComponents/modals/Modal';
import MemberForm from '../components/MemberForm';
import MemberTable from '../components/MemberTable';
import LoadingSpinner from '../../../commonComponents/loading-spinner/LoadingSpinner';

const Members = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: 'all' });

  const { members, totalMembers, isLoading, createMember, isCreating } = useMembers({
    search: searchTerm,
    ...filters,
  });

  const handleCreateMember = (data: any) => {
    createMember(data, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Loading members..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{t('sidebar.members')}</h1>
        <p className="text-gray-600 mt-1">Manage your gym members</p>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
              Filters
            </Button>
            <Button
              variant="primary"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setIsModalOpen(true)}
            >
              Add Member
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">Total Members</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{totalMembers}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">Active</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {members.filter((m: any) => m.membership.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">Expired</p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {members.filter((m: any) => m.membership.status === 'expired').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">This Month</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">24</p>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <MemberTable members={members} />
      </div>

      {/* Add Member Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Member"
        size="lg"
      >
        <MemberForm onSubmit={handleCreateMember} isSubmitting={isCreating} />
      </Modal>
    </div>
  );
};

export default Members;
```

---

## 🎨 Phase 7: Environment & Build Configuration

### Step 7.1: Environment Variables

**File: `.env.development`**
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=GymPro
VITE_ENABLE_DEVTOOLS=true
```

**File: `.env.production`**
```env
VITE_API_BASE_URL=https://api.gympro.com/api
VITE_APP_NAME=GymPro
VITE_ENABLE_DEVTOOLS=false
```

**File: `.env.example`**
```env
VITE_API_BASE_URL=
VITE_APP_NAME=
VITE_ENABLE_DEVTOOLS=
```

### Step 7.2: Vite Configuration

**File: `vite.config.ts`**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          query: ['@tanstack/react-query'],
          ui: ['@mui/material', '@mui/icons-material'],
        },
      },
    },
  },
});
```

---

## 🎉 Conclusion

This LMS platform is a comprehensive, feature-rich educational system built with modern technologies and best practices. The modular architecture allows for easy scalability and maintenance, while the extensive use of TypeScript ensures type safety and developer productivity.

### Key Highlights:
✅ **250+ Components** organized in feature modules  
✅ **4 Languages** supported (en, hi, ar, fr)  
✅ **PWA Ready** with offline support  
✅ **Modern Stack** (React 19, TypeScript 5.7, Vite 6)  
✅ **Comprehensive Features** (Learning, Admin, Jobs, Community, Resume, Live)  
✅ **Production Ready** with Netlify deployment  

---

## 🧪 Phase 8: Advanced Patterns & Best Practices

### Step 8.1: Custom Hooks Patterns

**File: `src/hooks/useMediaQuery.ts`**

```typescript
import { useState, useEffect } from 'react';

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);

    // Create listener
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    
    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
    
    // Legacy browsers
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [query]);

  return matches;
};

// Predefined breakpoint hooks
export const useIsMobile = () => useMediaQuery(`(max-width: ${BREAKPOINTS.md})`);
export const useIsTablet = () => useMediaQuery(`(min-width: ${BREAKPOINTS.md}) and (max-width: ${BREAKPOINTS.lg})`);
export const useIsDesktop = () => useMediaQuery(`(min-width: ${BREAKPOINTS.lg})`);
```

**File: `src/hooks/useDebounce.ts`**

```typescript
import { useState, useEffect } from 'react';

export const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Usage example:
// const searchTerm = 'test';
// const debouncedSearch = useDebounce(searchTerm, 500);
// useEffect(() => { searchAPI(debouncedSearch) }, [debouncedSearch]);
```

**File: `src/hooks/useLocalStorage.ts`**

```typescript
import { useState, useEffect } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
};

// Usage:
// const [user, setUser] = useLocalStorage('user', null);
```

**File: `src/hooks/useForm.ts`**

```typescript
import { useState, ChangeEvent, FormEvent } from 'react';

interface ValidationRules {
  [key: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => string | null;
  };
}

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationRules?: ValidationRules
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = (name: keyof T, value: any): string | null => {
    if (!validationRules || !validationRules[name as string]) return null;

    const rules = validationRules[name as string];

    if (rules.required && !value) {
      return 'This field is required';
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Minimum length is ${rules.minLength}`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Maximum length is ${rules.maxLength}`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Invalid format';
    }

    if (rules.custom) {
      return rules.custom(value);
    }

    return null;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Validate on change if field was touched
    if (touched[name as keyof T]) {
      const error = validateField(name as keyof T, value);
      setErrors((prev) => ({ ...prev, [name]: error || undefined }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name as keyof T, value);
    setErrors((prev) => ({ ...prev, [name]: error || undefined }));
  };

  const handleSubmit = (callback: (values: T) => void) => (e: FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(values).forEach((key) => {
      const error = validateField(key as keyof T, values[key as keyof T]);
      if (error) {
        newErrors[key as keyof T] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (isValid) {
      callback(values);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues,
  };
};

// Usage example:
// const { values, errors, handleChange, handleBlur, handleSubmit } = useForm(
//   { email: '', password: '' },
//   {
//     email: { required: true, pattern: /\S+@\S+\.\S+/ },
//     password: { required: true, minLength: 6 },
//   }
// );
```

---

### Step 8.2: Error Boundary Implementation

**File: `src/hocs/ErrorBoundary.tsx`**

```typescript
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Send to error logging service
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to external service (e.g., Sentry, LogRocket)
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h1>
            <p className="text-gray-600 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={this.handleReset}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

**Usage in `App.tsx`:**
```typescript
import ErrorBoundary from './hocs/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        {/* Your app */}
      </BrowserRouter>
    </ErrorBoundary>
  );
}
```

---

### Step 8.3: Toast Notification System

**File: `src/contexts/ToastContext.tsx`**

```typescript
import React, { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType, duration?: number) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType, duration: number = 5000) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, message, type, duration };

    setToasts((prev) => [...prev, newToast]);

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, duration);
    }
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const getToastStyles = (type: ToastType) => {
    const baseStyles = 'flex items-center gap-3 p-4 rounded-lg shadow-lg min-w-[300px] max-w-md';
    const typeStyles = {
      success: 'bg-green-50 text-green-800 border-l-4 border-green-500',
      error: 'bg-red-50 text-red-800 border-l-4 border-red-500',
      warning: 'bg-yellow-50 text-yellow-800 border-l-4 border-yellow-500',
      info: 'bg-blue-50 text-blue-800 border-l-4 border-blue-500',
    };
    return `${baseStyles} ${typeStyles[type]}`;
  };

  const getIcon = (type: ToastType) => {
    const iconClass = 'w-5 h-5';
    switch (type) {
      case 'success':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {createPortal(
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`${getToastStyles(toast.type)} animate-slide-in-right`}
            >
              {getIcon(toast.type)}
              <p className="flex-1 font-medium">{toast.message}</p>
              <button
                onClick={() => hideToast(toast.id)}
                className="p-1 hover:bg-black hover:bg-opacity-10 rounded"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
```

**Add animation to `tailwind.config.js`:**
```javascript
module.exports = {
  theme: {
    extend: {
      animation: {
        'slide-in-right': 'slideInRight 0.3s ease-out',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
};
```

---

### Step 8.4: Table Component with Sorting & Pagination

**File: `src/commonComponents/table/Table.tsx`**

```typescript
import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  width?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export function Table<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  loading = false,
  emptyMessage = 'No data available',
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: keyof T | string) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const getSortIcon = (columnKey: keyof T | string) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return <ChevronsUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-blue-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-blue-600" />
    );
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-12 bg-gray-200 rounded mb-2"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded mb-2"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                }`}
                style={{ width: column.width }}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  {column.header}
                  {column.sortable && getSortIcon(column.key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''
                } transition-colors`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap">
                    {column.render ? column.render(row) : String(row[column.key])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// Pagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white border-t">
      <div className="text-sm text-gray-700">
        Showing <span className="font-medium">{startItem}</span> to{' '}
        <span className="font-medium">{endItem}</span> of{' '}
        <span className="font-medium">{totalItems}</span> results
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 border rounded ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            );
          } else if (page === currentPage - 2 || page === currentPage + 2) {
            return <span key={page} className="px-2">...</span>;
          }
          return null;
        })}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};
```

**Usage Example:**
```typescript
const columns: Column<Member>[] = [
  {
    key: 'firstName',
    header: 'Name',
    sortable: true,
    render: (row) => `${row.firstName} ${row.lastName}`,
  },
  {
    key: 'email',
    header: 'Email',
    sortable: true,
  },
  {
    key: 'membership.status',
    header: 'Status',
    sortable: true,
    render: (row) => (
      <span className={`px-2 py-1 rounded text-xs ${
        row.membership.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {row.membership.status}
      </span>
    ),
  },
];

<Table
  data={members}
  columns={columns}
  onRowClick={(member) => navigate(`/members/${member.id}`)}
  loading={isLoading}
/>
```

---

### Step 8.5: Form Components

**File: `src/commonComponents/forms/Input.tsx`**

```typescript
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-2 border rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${error ? 'border-red-500' : 'border-gray-300'}
              ${className || ''}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

**File: `src/commonComponents/forms/Select.tsx`**

```typescript
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string | number; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`
            w-full px-4 py-2 border rounded-lg
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className || ''}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
```

---

### Step 8.6: Utility Functions

**File: `src/utils/dateUtils.ts`**

```typescript
import { format, parseISO, formatDistanceToNow, isValid } from 'date-fns';

export const formatDate = (date: string | Date, formatStr: string = 'MMM dd, yyyy'): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? format(dateObj, formatStr) : 'Invalid date';
  } catch {
    return 'Invalid date';
  }
};

export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, 'MMM dd, yyyy HH:mm');
};

export const getRelativeTime = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? formatDistanceToNow(dateObj, { addSuffix: true }) : 'Invalid date';
  } catch {
    return 'Invalid date';
  }
};

export const isDateInFuture = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isValid(dateObj) && dateObj > new Date();
};
```

**File: `src/utils/validators.ts`**

```typescript
export const isEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const isStrongPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
};

export const isURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
```

**File: `src/utils/formatters.ts`**

```typescript
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatNumber = (num: number, decimals: number = 0): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${formatNumber(value, decimals)}%`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};
```

---

### Step 8.7: API Response Types & Constants

**File: `src/types/api.types.ts`**

```typescript
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
  errors?: Record<string, string[]>;
}
```

**File: `src/constants/api.ts`**

```typescript
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  VERIFY_OTP: '/auth/verify-otp',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  REFRESH_TOKEN: '/auth/refresh-token',
  ME: '/auth/me',

  // Members
  MEMBERS: '/members',
  MEMBER_BY_ID: (id: string) => `/members/${id}`,
  MEMBER_STATS: '/members/stats',

  // Trainers
  TRAINERS: '/trainers',
  TRAINER_BY_ID: (id: string) => `/trainers/${id}`,

  // Classes
  CLASSES: '/classes',
  CLASS_BY_ID: (id: string) => `/classes/${id}`,
  CLASS_SCHEDULE: '/classes/schedule',

  // Billing
  INVOICES: '/billing/invoices',
  PAYMENTS: '/billing/payments',
  SUBSCRIPTIONS: '/billing/subscriptions',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
```

---

### Step 8.8: Layout Components

**File: `src/components/layouts/DashboardLayout.tsx`**

```typescript
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Sidebar from '../../commonComponents/sidebar/Sidebar';
import TopNav from '../../constants/TopNav';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-white rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white shadow-xl z-40 transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          w-64 lg:translate-x-0
        `}
      >
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        {/* Top Navigation */}
        <TopNav />

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
```

---

## 🎯 Adapting This Architecture for Gym Management System

### Feature Mapping: LMS → Gym

| LMS Feature | Gym Equivalent | Implementation |
|------------|----------------|----------------|
| Courses | Classes/Programs | `features/classes/` |
| Students | Members | `features/members/` |
| Instructors | Trainers | `features/trainers/` |
| Assessments | Fitness Assessments | `features/assessments/` |
| Progress Tracking | Workout/Progress Tracking | `features/progress/` |
| Enrollment | Membership Management | `features/membership/` |
| Certificates | Achievement Badges | `features/achievements/` |
| Live Classes | Live Workout Sessions | `features/live-sessions/` |
| Community | Member Community | `features/community/` |
| Jobs Portal | Trainer Recruitment | `features/recruitment/` |
| Billing | Payment/Subscriptions | `features/billing/` |
| Admin Dashboard | Gym Admin Panel | `features/admin/` |

### Additional Gym-Specific Features

1. **Equipment Management** (`features/equipment/`)
   - Track gym equipment
   - Maintenance schedules
   - Usage logs

2. **Attendance Tracking** (`features/attendance/`)
   - Check-in/check-out system
   - QR code scanning
   - Visitor management

3. **Nutrition Plans** (`features/nutrition/`)
   - Meal plans
   - Calorie tracking
   - Diet recommendations

4. **Body Metrics** (`features/metrics/`)
   - Weight tracking
   - Body measurements
   - Progress photos

5. **Workout Plans** (`features/workouts/`)
   - Custom workout routines
   - Exercise library
   - Progress tracking

6. **Staff Management** (`features/staff/`)
   - Trainer schedules
   - Salary management
   - Performance tracking

### Implementation Checklist

- [ ] **Phase 1**: Project initialization (1-2 days)
  - Setup Vite + React + TypeScript
  - Install all dependencies
  - Configure Tailwind CSS

- [ ] **Phase 2**: Core infrastructure (2-3 days)
  - Setup Redux store
  - Configure React Query
  - Implement axios instance
  - Setup i18n
  - Create routing structure

- [ ] **Phase 3**: Authentication (3-4 days)
  - Login/Signup pages
  - Auth service layer
  - Protected routes
  - JWT token management

- [ ] **Phase 4**: Common components (3-5 days)
  - Buttons, modals, forms
  - Loading states
  - Error boundaries
  - Toast notifications

- [ ] **Phase 5**: Feature modules (4-6 weeks)
  - Members management
  - Trainers management
  - Classes/Programs
  - Billing/Subscriptions
  - Dashboard analytics
  - Reports

- [ ] **Phase 6**: Advanced features (2-3 weeks)
  - Real-time attendance
  - Equipment tracking
  - Workout plans
  - Nutrition tracking
  - Mobile responsiveness

- [ ] **Phase 7**: Testing & deployment (1-2 weeks)
  - Unit tests
  - Integration tests
  - E2E tests
  - Production build
  - Deployment setup

**Total Estimated Time**: 8-12 weeks for a full-featured gym management system

---

## 🧪 Phase 9: Testing Strategy

### Step 9.1: Unit Testing Setup

**Install Testing Dependencies:**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

**File: `vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**File: `src/tests/setup.ts`**

```typescript
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest matchers with jest-dom
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
```

**File: `src/tests/utils/test-utils.tsx`**

```typescript
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../redux/slices/authSlice';
import uiReducer from '../../redux/slices/uiSlice';

// Create a test store
const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      ui: uiReducer,
    },
    preloadedState,
  });
};

// Create a test query client
const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
    },
  });
};

interface AllTheProvidersProps {
  children: React.ReactNode;
  store?: ReturnType<typeof createTestStore>;
  queryClient?: QueryClient;
}

const AllTheProviders: React.FC<AllTheProvidersProps> = ({ 
  children, 
  store = createTestStore(),
  queryClient = createTestQueryClient(),
}) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    initialState?: any;
    store?: ReturnType<typeof createTestStore>;
  }
) => {
  const { initialState, store, ...renderOptions } = options || {};
  const testStore = store || createTestStore(initialState);
  
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders store={testStore}>{children}</AllTheProviders>
    ),
    ...renderOptions,
  });
};

export * from '@testing-library/react';
export { customRender as render, createTestStore, createTestQueryClient };
```

### Step 9.2: Component Tests Examples

**File: `src/commonComponents/buttons/__tests__/Button.test.tsx`**

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../tests/utils/test-utils';
import Button from '../Button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders disabled button', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
  });

  it('renders loading state', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByText('Loading')).toBeInTheDocument();
    // Check for spinner SVG
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByText('Primary')).toHaveClass('bg-blue-600');

    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByText('Danger')).toHaveClass('bg-red-600');
  });

  it('renders with icons', () => {
    const LeftIcon = () => <span data-testid="left-icon">←</span>;
    const RightIcon = () => <span data-testid="right-icon">→</span>;
    
    render(
      <Button leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
        With Icons
      </Button>
    );

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });
});
```

**File: `src/hooks/__tests__/useAuth.test.ts`**

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAuth } from '../useAuth';
import * as authApi from '../../services/authApis';

// Mock the API
vi.mock('../../services/authApis');

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should login successfully', async () => {
    const mockResponse = {
      success: true,
      data: {
        user: { id: '1', name: 'Test User', email: 'test@example.com', role: 'member' },
        token: 'fake-token',
      },
      message: 'Login successful',
    };

    vi.mocked(authApi.loginApi).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAuth());

    result.current.login({ email: 'test@example.com', password: 'password123' });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
    });

    expect(result.current.user).toEqual(mockResponse.data.user);
  });

  it('should handle login error', async () => {
    vi.mocked(authApi.loginApi).mockRejectedValue({
      response: { data: { message: 'Invalid credentials' } },
    });

    const { result } = renderHook(() => useAuth());

    result.current.login({ email: 'wrong@example.com', password: 'wrong' });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  it('should logout successfully', async () => {
    const { result } = renderHook(() => useAuth());

    await result.current.logout();

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(localStorage.getItem('authToken')).toBeNull();
  });
});
```

**Add test scripts to `package.json`:**
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

---

## 🚀 Phase 10: Deployment & Production

### Step 10.1: Environment Configuration

**File: `.env.production`**
```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_APP_NAME=GymPro
VITE_ENABLE_DEVTOOLS=false
VITE_SENTRY_DSN=your-sentry-dsn
VITE_GOOGLE_ANALYTICS_ID=your-ga-id
```

**File: `.gitignore`**
```
# Dependencies
node_modules/
.pnp/
.pnp.js

# Testing
coverage/
.nyc_output

# Production
dist/
build/
*.log

# Environment
.env
.env.local
.env.production.local
.env.development.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Misc
.eslintcache
```

### Step 10.2: Netlify Configuration

**File: `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.jpg"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.png"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[build.environment]
  NODE_VERSION = "18"
```

### Step 10.3: Docker Configuration (Optional)

**File: `Dockerfile`**

```dockerfile
# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**File: `nginx.conf`**

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**File: `docker-compose.yml`**

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Step 10.4: CI/CD Pipeline (GitHub Actions)

**File: `.github/workflows/deploy.yml`**

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run tests
        run: npm run test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_API_BASE_URL: ${{ secrets.API_BASE_URL }}
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/
      
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        with:
          args: deploy --prod --dir=dist
```

---

## 📊 Phase 11: Performance Optimization

### Step 11.1: Code Splitting & Lazy Loading

**File: `src/App.tsx` (Optimized)**

```typescript
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './commonComponents/loading-spinner/LoadingSpinner';

// Lazy load pages
const Login = lazy(() => import('./features/auth/pages/Login'));
const Dashboard = lazy(() => import('./features/dashboard/pages/Dashboard'));
const Members = lazy(() => import('./features/members/pages/Members'));
const MemberDetail = lazy(() => import('./features/members/pages/MemberDetail'));

// Prefetch components on hover
const prefetchComponent = (factory: () => Promise<any>) => {
  const component = lazy(factory);
  // Prefetch on mouse over
  return component;
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner fullScreen />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/:id" element={<MemberDetail />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
```

### Step 11.2: Image Optimization

**File: `src/components/OptimizedImage.tsx`**

```typescript
import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWUiLz48L3N2Zz4=',
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className={`${className} ${isLoading ? 'blur-sm' : 'blur-0'} transition-all duration-300`}
    />
  );
};

export default OptimizedImage;
```

### Step 11.3: React Query Configuration (Optimized)

**File: `src/config/queryClient.ts`**

```typescript
import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { showToast } from '../redux/slices/uiSlice';
import { store } from '../redux/store';

// Create query client with optimized defaults
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) => {
      const message = error.response?.data?.message || 'An error occurred';
      store.dispatch(showToast({ message, type: 'error' }));
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: any) => {
      const message = error.response?.data?.message || 'An error occurred';
      store.dispatch(showToast({ message, type: 'error' }));
    },
  }),
  defaultOptions: {
    queries: {
      // Cache time - how long data stays in cache
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      
      // Refetch settings
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
      
      // Retry settings
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error.response?.status >= 400 && error.response?.status < 500) {
          return false;
        }
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 0,
    },
  },
});

// Prefetch functions
export const prefetchMembers = () => {
  queryClient.prefetchQuery({
    queryKey: ['members'],
    queryFn: () => import('../services/memberApis').then(m => m.getMembersApi()),
  });
};
```

### Step 11.4: Bundle Size Optimization

**Update `vite.config.ts`:**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: './dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // State management
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          
          // Data fetching
          'query-vendor': ['@tanstack/react-query'],
          
          // UI libraries
          'ui-vendor': ['@mui/material', '@mui/icons-material'],
          
          // Utils
          'utils-vendor': ['axios', 'date-fns', 'i18next', 'react-i18next'],
          
          // Charts
          'chart-vendor': ['chart.js', 'react-chartjs-2', 'recharts'],
        },
      },
    },
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Source maps for production debugging
    sourcemap: false,
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
```

---

## 🔒 Phase 12: Security Best Practices

### Step 12.1: Content Security Policy

**File: `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Content Security Policy -->
    <meta http-equiv="Content-Security-Policy" content="
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' data: https: blob:;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://api.yourdomain.com;
      frame-src 'self' https://accounts.google.com;
    ">
    
    <!-- Security headers -->
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="DENY">
    <meta http-equiv="X-XSS-Protection" content="1; mode=block">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    
    <title>GymPro - Gym Management System</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Step 12.2: Input Sanitization

**File: `src/utils/sanitize.ts`**

```typescript
import sanitizeHtml from 'sanitize-html';

export const sanitizeInput = (input: string): string => {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
  });
};

export const sanitizeRichText = (html: string): string => {
  return sanitizeHtml(html, {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
    allowedAttributes: {
      a: ['href', 'target'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
  });
};

// XSS prevention for user-generated content
export const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};
```

### Step 12.3: API Security

**Update `src/services/axiosInstance.ts`:**

```typescript
import axios from 'axios';
import crypto from 'crypto-js';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add CSRF token
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }

    // Add request signature for sensitive operations
    if (config.method !== 'get' && config.data) {
      const timestamp = Date.now();
      const signature = crypto.HmacSHA256(
        JSON.stringify(config.data) + timestamp,
        import.meta.env.VITE_API_SECRET || 'secret'
      ).toString();
      
      config.headers['X-Request-Timestamp'] = timestamp;
      config.headers['X-Request-Signature'] = signature;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { token } = response.data.data;
        localStorage.setItem('authToken', token);

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
```

---

## 📱 Phase 13: Progressive Web App (PWA)

### Step 13.1: PWA Setup

**Install PWA Plugin:**
```bash
npm install -D vite-plugin-pwa
```

**Update `vite.config.ts`:**

```typescript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'GymPro - Gym Management System',
        short_name: 'GymPro',
        description: 'Complete gym management solution',
        theme_color: '#0ea5e9',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.yourdomain\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
    }),
  ],
});
```

**File: `src/hooks/usePWA.ts`**

```typescript
import { useEffect, useState } from 'react';

export const usePWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for app installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) return false;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsInstallable(false);
      return true;
    }

    return false;
  };

  return {
    isInstallable,
    isInstalled,
    promptInstall,
  };
};
```

---

## 📈 Phase 14: Analytics & Monitoring

### Step 14.1: Google Analytics Setup

**File: `src/utils/analytics.ts`**

```typescript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const initGA = () => {
  const gaId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
  if (!gaId) return;

  // Load GA script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize GA
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', gaId);
};

export const trackPageView = (path: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', import.meta.env.VITE_GOOGLE_ANALYTICS_ID, {
      page_path: path,
    });
  }
};

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Custom events
export const trackLogin = (method: string) => {
  trackEvent('login', 'authentication', method);
};

export const trackSignup = (method: string) => {
  trackEvent('sign_up', 'authentication', method);
};

export const trackSearch = (searchTerm: string) => {
  trackEvent('search', 'engagement', searchTerm);
};

export const trackError = (error: string, fatal: boolean = false) => {
  trackEvent('exception', 'error', error, fatal ? 1 : 0);
};
```

**Usage in `App.tsx`:**
```typescript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, trackPageView } from './utils/analytics';

function App() {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return (
    // Your app
  );
}
```

---

**Total Estimated Time**: 8-12 weeks for a full-featured gym management system

---

**Last Updated**: November 6, 2025  
**Version**: 0.0.0  
**Status**: Active Development  
**Architecture Guide**: Complete Blueprint for Reconstruction

---

## 🚀 QUICK START GUIDE - Build Gym Management System in 7 Days

This accelerated guide helps you build a working prototype quickly. Follow this day-by-day plan:

### **Day 1: Foundation (4-6 hours)**

```bash
# 1. Create project
npm create vite@latest gym-pro -- --template react-ts
cd gym-pro

# 2. Install ALL dependencies at once
npm install @reduxjs/toolkit react-redux @tanstack/react-query \
  react-router-dom axios @mui/material @mui/icons-material \
  @emotion/react @emotion/styled tailwindcss postcss autoprefixer \
  i18next react-i18next i18next-browser-languagedetector \
  date-fns chart.js react-chartjs-2 lucide-react \
  react-hook-form zod @hookform/resolvers

# 3. Install dev dependencies
npm install -D @types/node vitest @testing-library/react \
  @testing-library/jest-dom vite-plugin-pwa

# 4. Initialize Tailwind
npx tailwindcss init -p
```

**Create these 5 core files:**
1. `src/services/axiosInstance.ts` - Copy from Phase 3.1
2. `src/redux/store.ts` - Copy from Phase 3.2
3. `src/i18n/index.ts` - Copy from Phase 3.4
4. `src/routes.ts` - Copy from Phase 3.5
5. `src/App.tsx` - Copy from Phase 3.5

**✅ Day 1 Goal**: Project runs with `npm run dev`, routing works, Redux connected.

---

### **Day 2: Authentication (6-8 hours)**

1. **Create Auth Files** (copy these):
   - `src/services/authApis.ts` (Phase 4.1)
   - `src/hooks/useAuth.ts` (Phase 4.2)
   - `src/features/auth/pages/Login.tsx` (Phase 4.3)
   - `src/redux/slices/authSlice.ts` (Phase 3.2)

2. **Create Signup Page** (duplicate Login.tsx, modify)

3. **Test with Mock API**:
```typescript
// Temporary: Mock API responses in authApis.ts
export const loginApi = async (credentials: LoginCredentials) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock response
  return {
    success: true,
    data: {
      user: { id: '1', name: 'Test User', email: credentials.email, role: 'admin' },
      token: 'fake-jwt-token-12345',
    },
    message: 'Login successful',
  };
};
```

**✅ Day 2 Goal**: Login/Signup working, token storage, protected routes.

---

### **Day 3: Dashboard & Layout (6-8 hours)**

1. **Create Common Components**:
   - `src/commonComponents/buttons/Button.tsx` (Phase 5.1)
   - `src/commonComponents/modals/Modal.tsx` (Phase 5.2)
   - `src/commonComponents/loading-spinner/LoadingSpinner.tsx` (Phase 5.3)
   - `src/commonComponents/sidebar/Sidebar.tsx` (custom)

2. **Create Dashboard Layout**:
```typescript
// src/components/layouts/DashboardLayout.tsx
import Sidebar from '../../commonComponents/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};
```

3. **Create Simple Dashboard**:
```typescript
// src/features/dashboard/pages/Dashboard.tsx
import { useAuth } from '../../../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome, {user?.name}!</h1>
      <div className="grid grid-cols-4 gap-4 mt-6">
        <StatCard title="Total Members" value="156" />
        <StatCard title="Active Members" value="142" />
        <StatCard title="Revenue" value="$12,450" />
        <StatCard title="Classes Today" value="8" />
      </div>
    </div>
  );
};
```

**✅ Day 3 Goal**: Dashboard with stats, sidebar navigation, layout structure.

---

### **Day 4: Members Module (8-10 hours)**

1. **Create Member Types & API**:
   - `src/features/members/types/member.types.ts` (Phase 6.1)
   - `src/services/memberApis.ts` (Phase 6.1)
   - `src/features/members/hooks/useMembers.ts` (Phase 6.1)

2. **Create Members Page**:
   - `src/features/members/pages/Members.tsx` (Phase 6.1)

3. **Create Member Table Component**:
```typescript
// src/features/members/components/MemberTable.tsx
import { Table, Column } from '../../../commonComponents/table/Table';

const MemberTable = ({ members }) => {
  const columns: Column<Member>[] = [
    { key: 'firstName', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { 
      key: 'membership.status', 
      header: 'Status', 
      render: (row) => <StatusBadge status={row.membership.status} />
    },
  ];

  return <Table data={members} columns={columns} />;
};
```

4. **Create Add Member Form**:
```typescript
// Use react-hook-form + zod for validation
const schema = z.object({
  firstName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Min 10 digits'),
});
```

**✅ Day 4 Goal**: Members list, add member, view member details, basic CRUD.

---

### **Day 5: Classes & Trainers (6-8 hours)**

1. **Duplicate Members Module Structure**:
   - Copy `features/members/*` → `features/trainers/`
   - Copy `features/members/*` → `features/classes/`
   - Modify types and labels

2. **Create Class Schedule Component**:
```typescript
// src/features/classes/components/ClassSchedule.tsx
import { format } from 'date-fns';

const ClassSchedule = ({ classes }) => {
  const today = new Date();
  const todayClasses = classes.filter(c => 
    format(new Date(c.date), 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
  );

  return (
    <div className="grid gap-4">
      {todayClasses.map(cls => (
        <ClassCard key={cls.id} class={cls} />
      ))}
    </div>
  );
};
```

**✅ Day 5 Goal**: Trainers module, Classes module, schedule view.

---

### **Day 6: Billing & Reports (6-8 hours)**

1. **Create Billing Module**:
```typescript
// src/features/billing/pages/Billing.tsx
const Billing = () => {
  return (
    <div>
      <Tabs>
        <Tab label="Invoices">
          <InvoiceList />
        </Tab>
        <Tab label="Payments">
          <PaymentList />
        </Tab>
        <Tab label="Subscriptions">
          <SubscriptionList />
        </Tab>
      </Tabs>
    </div>
  );
};
```

2. **Create Simple Charts**:
```typescript
// src/features/dashboard/components/RevenueChart.tsx
import { Line } from 'react-chartjs-2';

const RevenueChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
    }],
  };

  return <Line data={data} />;
};
```

**✅ Day 6 Goal**: Billing module, revenue charts, payment tracking.

---

### **Day 7: Polish & Deploy (4-6 hours)**

1. **Add Missing Features**:
   - Toast notifications (Phase 8.3)
   - Error boundaries (Phase 8.2)
   - Loading states
   - Empty states
   - Form validations

2. **Responsive Design**:
```typescript
// Quick responsive checks
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Stats cards */}
</div>
```

3. **Deploy to Netlify**:
```bash
# Build
npm run build

# Deploy (one-time)
npx netlify-cli deploy --prod --dir=dist
```

4. **Or use GitHub + Netlify**:
   - Push to GitHub
   - Connect to Netlify
   - Auto-deploy on push

**✅ Day 7 Goal**: Working app deployed, responsive, production-ready.

---

## 📦 COMPLETE FILE CHECKLIST

Use this checklist to ensure you've created all essential files:

### **Configuration Files (Root)**
- [ ] `package.json` - Dependencies and scripts
- [ ] `vite.config.ts` - Vite configuration
- [ ] `tsconfig.json` - TypeScript configuration
- [ ] `tailwind.config.js` - Tailwind CSS configuration
- [ ] `postcss.config.js` - PostCSS configuration
- [ ] `.env.development` - Development environment variables
- [ ] `.env.production` - Production environment variables
- [ ] `.gitignore` - Git ignore rules
- [ ] `netlify.toml` - Netlify deployment config
- [ ] `README.md` - Project documentation

### **Entry Files (src/)**
- [ ] `src/main.tsx` - Application entry point
- [ ] `src/App.tsx` - Root component
- [ ] `src/App.css` - Global styles
- [ ] `src/index.css` - Tailwind imports
- [ ] `src/routes.ts` - Route definitions
- [ ] `src/vite-env.d.ts` - Vite type definitions

### **Core Infrastructure**
- [ ] `src/services/axiosInstance.ts` - HTTP client
- [ ] `src/redux/store.ts` - Redux store
- [ ] `src/redux/slices/authSlice.ts` - Auth state
- [ ] `src/redux/slices/uiSlice.ts` - UI state
- [ ] `src/i18n/index.ts` - i18n configuration
- [ ] `src/i18n/locales/en.json` - English translations
- [ ] `src/i18n/locales/hi.json` - Hindi translations

### **Authentication**
- [ ] `src/services/authApis.ts` - Auth API calls
- [ ] `src/hooks/useAuth.ts` - Auth hook
- [ ] `src/features/auth/pages/Login.tsx` - Login page
- [ ] `src/features/auth/pages/Signup.tsx` - Signup page
- [ ] `src/features/auth/pages/ForgotPassword.tsx` - Password recovery

### **Common Components**
- [ ] `src/commonComponents/buttons/Button.tsx` - Button component
- [ ] `src/commonComponents/modals/Modal.tsx` - Modal component
- [ ] `src/commonComponents/loading-spinner/LoadingSpinner.tsx` - Spinner
- [ ] `src/commonComponents/forms/Input.tsx` - Input component
- [ ] `src/commonComponents/forms/Select.tsx` - Select component
- [ ] `src/commonComponents/table/Table.tsx` - Table component
- [ ] `src/commonComponents/sidebar/Sidebar.tsx` - Sidebar component

### **Members Module**
- [ ] `src/features/members/types/member.types.ts` - Types
- [ ] `src/services/memberApis.ts` - API calls
- [ ] `src/features/members/hooks/useMembers.ts` - Hook
- [ ] `src/features/members/pages/Members.tsx` - List page
- [ ] `src/features/members/pages/MemberDetail.tsx` - Detail page
- [ ] `src/features/members/components/MemberTable.tsx` - Table
- [ ] `src/features/members/components/MemberForm.tsx` - Form

### **Utilities**
- [ ] `src/utils/dateUtils.ts` - Date utilities
- [ ] `src/utils/validators.ts` - Validation functions
- [ ] `src/utils/formatters.ts` - Formatting functions
- [ ] `src/utils/sanitize.ts` - Input sanitization
- [ ] `src/hooks/useMediaQuery.ts` - Responsive hook
- [ ] `src/hooks/useDebounce.ts` - Debounce hook
- [ ] `src/hooks/useLocalStorage.ts` - LocalStorage hook
- [ ] `src/hooks/useForm.ts` - Form hook

### **Layout & Error Handling**
- [ ] `src/components/layouts/DashboardLayout.tsx` - Dashboard layout
- [ ] `src/hocs/ErrorBoundary.tsx` - Error boundary
- [ ] `src/contexts/ToastContext.tsx` - Toast notifications

### **Testing**
- [ ] `vitest.config.ts` - Vitest configuration
- [ ] `src/tests/setup.ts` - Test setup
- [ ] `src/tests/utils/test-utils.tsx` - Test utilities

---

## 🎯 REAL-WORLD CODE PATTERNS

### Pattern 1: Data Table with Actions

```typescript
// Complete example of a data table with CRUD operations
const MembersTable = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  
  const { members, totalPages, isLoading, deleteMember } = useMembers({
    page,
    search: debouncedSearch,
  });

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const columns: Column<Member>[] = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src={row.avatar} alt="" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-medium">{row.firstName} {row.lastName}</p>
            <p className="text-sm text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'membership',
      header: 'Status',
      render: (row) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          row.membership.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {row.membership.status}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => navigate(`/members/${row.id}`)}>
            View
          </Button>
          <Button size="sm" variant="danger" onClick={() => setDeleteId(row.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        data={members}
        columns={columns}
        loading={isLoading}
        emptyMessage="No members found"
      />
      
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Confirm Delete"
      >
        <p>Are you sure you want to delete this member?</p>
        <div className="flex gap-2 mt-4">
          <Button onClick={() => setDeleteId(null)} variant="secondary">
            Cancel
          </Button>
          <Button 
            onClick={() => {
              deleteMember(deleteId!);
              setDeleteId(null);
            }} 
            variant="danger"
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};
```

### Pattern 2: Form with Validation

```typescript
// Complete form with react-hook-form + zod validation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const memberSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),
  dateOfBirth: z.string().refine((date) => {
    const age = new Date().getFullYear() - new Date(date).getFullYear();
    return age >= 16;
  }, 'Must be at least 16 years old'),
  membershipType: z.enum(['basic', 'premium', 'vip']),
});

type MemberFormData = z.infer<typeof memberSchema>;

const MemberForm = ({ member, onSubmit }: { member?: Member; onSubmit: (data: MemberFormData) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: member || {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          {...register('firstName')}
          error={errors.firstName?.message}
        />
        <Input
          label="Last Name"
          {...register('lastName')}
          error={errors.lastName?.message}
        />
      </div>

      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <Input
        label="Phone"
        {...register('phone')}
        error={errors.phone?.message}
      />

      <Input
        label="Date of Birth"
        type="date"
        {...register('dateOfBirth')}
        error={errors.dateOfBirth?.message}
      />

      <Select
        label="Membership Type"
        {...register('membershipType')}
        options={[
          { value: 'basic', label: 'Basic' },
          { value: 'premium', label: 'Premium' },
          { value: 'vip', label: 'VIP' },
        ]}
        error={errors.membershipType?.message}
      />

      <Button type="submit" fullWidth isLoading={isSubmitting}>
        {member ? 'Update Member' : 'Add Member'}
      </Button>
    </form>
  );
};
```

### Pattern 3: Protected Route with Permissions

```typescript
// Role-based access control
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'trainer' | 'member';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole && user?.role !== 'admin') {
    return <Navigate to="/access-denied" replace />;
  }

  return <>{children}</>;
};

// Usage in routes
<Route
  path="/admin/*"
  element={
    <ProtectedRoute requiredRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
```

### Pattern 4: Infinite Scroll List

```typescript
// Infinite scrolling with React Query
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

const InfiniteMembers = () => {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['members', 'infinite'],
    queryFn: ({ pageParam = 1 }) => getMembersApi({ page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.data.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      ))}
      
      <div ref={ref}>
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </div>
  );
};
```

---

## 🎓 LEARNING RESOURCES

### **Essential Reading**
1. **React Documentation**: https://react.dev/
2. **TypeScript Handbook**: https://www.typescriptlang.org/docs/
3. **Redux Toolkit**: https://redux-toolkit.js.org/
4. **TanStack Query**: https://tanstack.com/query/latest
5. **React Router**: https://reactrouter.com/
6. **Tailwind CSS**: https://tailwindcss.com/

### **Video Tutorials**
- React + TypeScript Course (YouTube)
- Redux Toolkit Tutorial (YouTube)
- Tailwind CSS Crash Course
- React Query Tutorial

### **Community**
- Stack Overflow
- React Discord
- Dev.to
- Reddit r/reactjs

---

## 📊 METRICS & SUCCESS CRITERIA

### **Performance Targets**
- [ ] Lighthouse Score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Bundle size < 500KB (gzipped)

### **Code Quality**
- [ ] Test coverage > 80%
- [ ] Zero ESLint errors
- [ ] Zero TypeScript errors
- [ ] All components documented

### **Features Checklist**
- [ ] User authentication
- [ ] Member management (CRUD)
- [ ] Trainer management (CRUD)
- [ ] Class scheduling
- [ ] Billing & payments
- [ ] Reports & analytics
- [ ] Mobile responsive
- [ ] Multi-language support
- [ ] Dark mode
- [ ] PWA support

---

**Last Updated**: November 6, 2025  
**Version**: 0.0.0  
**Status**: Active Development  
**Architecture Guide**: Complete Blueprint for Reconstruction  
**Total Sections**: 14 Comprehensive Phases + Quick Start Guide

---

## 🔗 Phase 15: API Contract & Data Flow

### Step 15.1: Complete API Request/Response Examples

**Understanding the Backend Contract:**

```typescript
// API Response Structure (Standard across all endpoints)
interface StandardApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  errors?: Record<string, string[]>;
  meta?: {
    timestamp: string;
    requestId: string;
  };
}

// Paginated Response Structure
interface PaginatedApiResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  message: string;
}
```

### **Authentication Endpoints**

```typescript
// POST /auth/login
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse extends StandardApiResponse<{
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: 'admin' | 'trainer' | 'member';
    avatar?: string;
    emailVerified: boolean;
    createdAt: string;
  };
  token: string;
  refreshToken: string;
  expiresIn: number; // seconds
}> {}

// Example API call
const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

// POST /auth/signup
interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}

// POST /auth/refresh
interface RefreshTokenRequest {
  refreshToken: string;
}

// POST /auth/forgot-password
interface ForgotPasswordRequest {
  email: string;
}

// POST /auth/reset-password
interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
```

### **Member Endpoints**

```typescript
// GET /members?page=1&limit=10&search=john&status=active
interface GetMembersQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'expired' | 'suspended';
  membershipType?: 'basic' | 'premium' | 'vip';
  sortBy?: 'firstName' | 'createdAt' | 'membershipEndDate';
  sortOrder?: 'asc' | 'desc';
}

interface MemberResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  membership: {
    id: string;
    type: 'basic' | 'premium' | 'vip';
    startDate: string;
    endDate: string;
    status: 'active' | 'expired' | 'suspended';
    autoRenew: boolean;
    paymentMethod?: string;
  };
  healthInfo: {
    weight?: number;
    height?: number;
    bloodGroup?: string;
    medicalConditions: string[];
    allergies: string[];
    injuries: string[];
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  joinDate: string;
  lastCheckIn?: string;
  totalCheckIns: number;
  createdAt: string;
  updatedAt: string;
}

// POST /members
interface CreateMemberRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  membership: {
    type: 'basic' | 'premium' | 'vip';
    startDate: string;
    duration: number; // months
    autoRenew: boolean;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

// PUT /members/:id
interface UpdateMemberRequest extends Partial<CreateMemberRequest> {
  avatar?: File | string;
}

// GET /members/:id
interface GetMemberResponse extends StandardApiResponse<MemberResponse> {}

// DELETE /members/:id
interface DeleteMemberResponse extends StandardApiResponse<{ deletedId: string }> {}

// GET /members/stats
interface MemberStatsResponse extends StandardApiResponse<{
  total: number;
  active: number;
  expired: number;
  suspended: number;
  newThisMonth: number;
  byMembershipType: {
    basic: number;
    premium: number;
    vip: number;
  };
  averageAge: number;
  genderDistribution: {
    male: number;
    female: number;
    other: number;
  };
}> {}
```

### **Class Endpoints**

```typescript
// GET /classes
interface ClassResponse {
  id: string;
  name: string;
  description: string;
  type: 'yoga' | 'cardio' | 'strength' | 'crossfit' | 'pilates' | 'other';
  trainer: {
    id: string;
    name: string;
    avatar?: string;
    specialization: string[];
  };
  schedule: {
    dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday
    startTime: string; // "09:00"
    endTime: string; // "10:00"
    duration: number; // minutes
  };
  capacity: number;
  enrolled: number;
  available: number;
  location: string;
  equipment: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  status: 'active' | 'cancelled' | 'completed';
  image?: string;
  createdAt: string;
}

// POST /classes/:classId/enroll
interface EnrollClassRequest {
  memberId: string;
  notes?: string;
}

// GET /classes/schedule?date=2025-11-06
interface ClassScheduleQuery {
  date?: string; // YYYY-MM-DD
  trainerId?: string;
  type?: string;
}
```

### **Billing Endpoints**

```typescript
// GET /billing/invoices
interface InvoiceResponse {
  id: string;
  invoiceNumber: string;
  memberId: string;
  memberName: string;
  amount: number;
  tax: number;
  total: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  dueDate: string;
  paidDate?: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  paymentMethod?: string;
  createdAt: string;
}

// POST /billing/payments
interface CreatePaymentRequest {
  invoiceId: string;
  amount: number;
  method: 'cash' | 'card' | 'upi' | 'bank_transfer';
  transactionId?: string;
  notes?: string;
}

// GET /billing/revenue?startDate=2025-01-01&endDate=2025-11-06
interface RevenueStatsResponse extends StandardApiResponse<{
  totalRevenue: number;
  paidAmount: number;
  pendingAmount: number;
  overdueAmount: number;
  revenueByMonth: {
    month: string;
    revenue: number;
  }[];
  revenueByMembershipType: {
    type: string;
    revenue: number;
  }[];
}> {}
```

---

### Step 15.2: Complete Redux State Structure

**File: `src/types/store.types.ts`**

```typescript
// Complete Redux Store Shape
export interface RootState {
  auth: AuthState;
  ui: UIState;
  members: MembersState;
  trainers: TrainersState;
  classes: ClassesState;
  billing: BillingState;
}

// Auth State
export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'admin' | 'trainer' | 'member';
  avatar?: string;
  emailVerified: boolean;
  permissions: string[];
}

// UI State
export interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  language: 'en' | 'hi' | 'ar' | 'fr';
  loading: boolean;
  toast: {
    open: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  };
  modals: {
    [key: string]: {
      open: boolean;
      data?: any;
    };
  };
}

// Members State
export interface MembersState {
  list: Member[];
  currentMember: Member | null;
  stats: MemberStats | null;
  filters: MemberFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  loading: boolean;
  error: string | null;
}

export interface MemberFilters {
  search: string;
  status: 'all' | 'active' | 'expired' | 'suspended';
  membershipType: 'all' | 'basic' | 'premium' | 'vip';
  sortBy: 'firstName' | 'createdAt' | 'membershipEndDate';
  sortOrder: 'asc' | 'desc';
}
```

**File: `src/redux/slices/memberSlice.ts`**

```typescript
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getMembersApi, getMemberByIdApi, createMemberApi } from '../../services/memberApis';

const initialState: MembersState = {
  list: [],
  currentMember: null,
  stats: null,
  filters: {
    search: '',
    status: 'all',
    membershipType: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  loading: false,
  error: null,
};

// Async Thunks
export const fetchMembers = createAsyncThunk(
  'members/fetchMembers',
  async (params: MemberFilters & { page?: number; limit?: number }, { rejectWithValue }) => {
    try {
      const response = await getMembersApi(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch members');
    }
  }
);

export const fetchMemberById = createAsyncThunk(
  'members/fetchMemberById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getMemberByIdApi(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch member');
    }
  }
);

export const createMember = createAsyncThunk(
  'members/createMember',
  async (data: CreateMemberRequest, { rejectWithValue }) => {
    try {
      const response = await createMemberApi(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create member');
    }
  }
);

// Slice
const memberSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<MemberFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    clearCurrentMember: (state) => {
      state.currentMember = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Members
    builder.addCase(fetchMembers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMembers.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(fetchMembers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch Member by ID
    builder.addCase(fetchMemberById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMemberById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentMember = action.payload.data;
    });
    builder.addCase(fetchMemberById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create Member
    builder.addCase(createMember.fulfilled, (state, action) => {
      state.list.unshift(action.payload.data);
      state.pagination.total += 1;
    });
  },
});

export const { setFilters, resetFilters, setPage, clearCurrentMember } = memberSlice.actions;
export default memberSlice.reducer;
```

---

### Step 15.3: React Query Cache Keys Pattern

**File: `src/config/queryKeys.ts`**

```typescript
// Centralized query key factory for React Query
export const queryKeys = {
  // Auth
  auth: {
    all: ['auth'] as const,
    currentUser: () => [...queryKeys.auth.all, 'currentUser'] as const,
  },
  
  // Members
  members: {
    all: ['members'] as const,
    lists: () => [...queryKeys.members.all, 'list'] as const,
    list: (filters: MemberFilters) => [...queryKeys.members.lists(), filters] as const,
    details: () => [...queryKeys.members.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.members.details(), id] as const,
    stats: () => [...queryKeys.members.all, 'stats'] as const,
  },
  
  // Trainers
  trainers: {
    all: ['trainers'] as const,
    lists: () => [...queryKeys.trainers.all, 'list'] as const,
    list: (filters: any) => [...queryKeys.trainers.lists(), filters] as const,
    detail: (id: string) => [...queryKeys.trainers.all, 'detail', id] as const,
  },
  
  // Classes
  classes: {
    all: ['classes'] as const,
    lists: () => [...queryKeys.classes.all, 'list'] as const,
    list: (filters: any) => [...queryKeys.classes.lists(), filters] as const,
    detail: (id: string) => [...queryKeys.classes.all, 'detail', id] as const,
    schedule: (date: string) => [...queryKeys.classes.all, 'schedule', date] as const,
  },
  
  // Billing
  billing: {
    all: ['billing'] as const,
    invoices: () => [...queryKeys.billing.all, 'invoices'] as const,
    payments: () => [...queryKeys.billing.all, 'payments'] as const,
    revenue: (params: any) => [...queryKeys.billing.all, 'revenue', params] as const,
  },
};

// Usage in hooks
export const useMembers = (filters: MemberFilters) => {
  return useQuery({
    queryKey: queryKeys.members.list(filters),
    queryFn: () => getMembersApi(filters),
  });
};

// Invalidate related queries after mutation
export const useCreateMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createMemberApi,
    onSuccess: () => {
      // Invalidate all member lists
      queryClient.invalidateQueries({ queryKey: queryKeys.members.lists() });
      // Invalidate stats
      queryClient.invalidateQueries({ queryKey: queryKeys.members.stats() });
    },
  });
};
```

---

### Step 15.4: Complete Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERACTION                         │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     REACT COMPONENT                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  const { members, isLoading } = useMembers(filters);    │   │
│  │  const { createMember } = useCreateMember();            │   │
│  └─────────────────────────────────────────────────────────┘   │
└──────────┬──────────────────────────────────────┬───────────────┘
           │                                      │
           │ (Read Data)                          │ (Mutate Data)
           ▼                                      ▼
┌─────────────────────────┐          ┌─────────────────────────────┐
│   REACT QUERY           │          │   REACT QUERY MUTATION      │
│   - Cache Management    │          │   - Optimistic Updates      │
│   - Background Refetch  │          │   - Error Handling          │
│   - Stale Data Logic    │          │   - Cache Invalidation      │
└──────────┬──────────────┘          └──────────┬──────────────────┘
           │                                    │
           │                                    │
           └────────────────┬───────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   SERVICE LAYER (API)                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  export const getMembersApi = async (params) => {       │   │
│  │    return axiosInstance.get('/members', { params });    │   │
│  │  };                                                      │   │
│  └─────────────────────────────────────────────────────────┘   │
└──────────┬──────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   AXIOS INSTANCE                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Request Interceptor:                                   │   │
│  │  - Add Authorization Token                              │   │
│  │  - Add CSRF Token                                       │   │
│  │  - Add Request Signature                                │   │
│  │                                                          │   │
│  │  Response Interceptor:                                  │   │
│  │  - Handle Token Refresh (401)                           │   │
│  │  - Global Error Handling                                │   │
│  │  - Transform Response Data                              │   │
│  └─────────────────────────────────────────────────────────┘   │
└──────────┬──────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   BACKEND API                                    │
│  POST   /auth/login                                              │
│  GET    /members?page=1&limit=10&search=john                    │
│  POST   /members                                                 │
│  PUT    /members/:id                                             │
│  DELETE /members/:id                                             │
└──────────┬──────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   DATABASE                                       │
│  - Members Table                                                 │
│  - Trainers Table                                                │
│  - Classes Table                                                 │
│  - Memberships Table                                             │
│  - Payments Table                                                │
└─────────────────────────────────────────────────────────────────┘
```

---

### Step 15.5: Error Handling Flow

```typescript
// Complete error handling chain

// 1. Component Level
const MembersPage = () => {
  const { members, isLoading, error } = useMembers(filters);

  if (error) {
    return <ErrorDisplay message={error.message} />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <MemberTable members={members} />;
};

// 2. Hook Level
export const useMembers = (filters: MemberFilters) => {
  return useQuery({
    queryKey: queryKeys.members.list(filters),
    queryFn: () => getMembersApi(filters),
    onError: (error: any) => {
      // Log to error tracking service
      console.error('Failed to fetch members:', error);
    },
  });
};

// 3. Service Layer
export const getMembersApi = async (params: any) => {
  try {
    const response = await axiosInstance.get('/members', { params });
    return response.data;
  } catch (error) {
    // Transform error for better UX
    if (axios.isAxiosError(error)) {
      throw new ApiError(
        error.response?.data?.message || 'Failed to fetch members',
        error.response?.status || 500,
        error.response?.data?.errors
      );
    }
    throw error;
  }
};

// 4. Axios Interceptor Level
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Try to refresh token
      try {
        const newToken = await refreshToken();
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(error.config);
      } catch {
        // Redirect to login
        store.dispatch(logout());
        window.location.href = '/login';
      }
    }

    if (error.response?.status === 403) {
      // Show permission denied message
      store.dispatch(showToast({
        message: 'You do not have permission to perform this action',
        type: 'error',
      }));
    }

    if (error.response?.status >= 500) {
      // Show server error message
      store.dispatch(showToast({
        message: 'Server error. Please try again later.',
        type: 'error',
      }));
    }

    return Promise.reject(error);
  }
);

// 5. Global Error Boundary
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log to error tracking service (e.g., Sentry)
    logErrorToService(error, errorInfo);
    
    // Show user-friendly error page
    this.setState({ hasError: true });
  }
}
```

---

### Step 15.6: Optimistic Updates Pattern

```typescript
// Example: Update member with optimistic UI
export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMemberRequest }) =>
      updateMemberApi(id, data),
    
    // Optimistic update before API call
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.members.detail(id) });

      // Snapshot previous value
      const previousMember = queryClient.getQueryData(queryKeys.members.detail(id));

      // Optimistically update cache
      queryClient.setQueryData(queryKeys.members.detail(id), (old: any) => ({
        ...old,
        data: { ...old.data, ...data },
      }));

      // Return context with previous value
      return { previousMember };
    },

    // Rollback on error
    onError: (err, { id }, context) => {
      if (context?.previousMember) {
        queryClient.setQueryData(
          queryKeys.members.detail(id),
          context.previousMember
        );
      }
    },

    // Refetch after mutation settles
    onSettled: (data, error, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.members.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.members.lists() });
    },
  });
};

// Usage in component
const MemberEditForm = ({ member }) => {
  const { mutate: updateMember, isPending } = useUpdateMember();

  const handleSubmit = (data) => {
    updateMember({ id: member.id, data });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <Button type="submit" isLoading={isPending}>
        Save Changes
      </Button>
    </form>
  );
};
```

---

## 🎯 Phase 16: Environment-Specific Configurations

### Development vs Production Differences

**File: `src/config/environment.ts`**

```typescript
export const environment = {
  // Determine environment
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
  isTest: import.meta.env.MODE === 'test',

  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    timeout: import.meta.env.VITE_API_TIMEOUT ? parseInt(import.meta.env.VITE_API_TIMEOUT) : 15000,
  },

  // Feature Flags
  features: {
    enableDevTools: import.meta.env.VITE_ENABLE_DEVTOOLS === 'true',
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enablePWA: import.meta.env.VITE_ENABLE_PWA === 'true',
    enableChat: import.meta.env.VITE_ENABLE_CHAT === 'true',
  },

  // External Services
  services: {
    googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
    sentryDsn: import.meta.env.VITE_SENTRY_DSN,
    stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
    razorpayKey: import.meta.env.VITE_RAZORPAY_KEY,
  },

  // App Configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || 'GymPro',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'support@gympro.com',
  },

  // Pagination Defaults
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
  },

  // Cache Configuration
  cache: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  },
};

// Type-safe environment variable access
export const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value || defaultValue || '';
};
```

**Usage:**
```typescript
import { environment } from './config/environment';

// Conditionally render dev tools
{environment.features.enableDevTools && <ReactQueryDevtools />}

// Use feature flags
if (environment.features.enableAnalytics) {
  initGA();
}
```

---

**Total Sections**: 14 Comprehensive Phases + Quick Start Guide
