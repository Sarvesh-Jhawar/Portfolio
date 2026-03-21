# <a id="_j863sz775lzh"></a>__Attendance ERP: Project Documentation__

This documentation provides a technical breakdown of the __Attendance ERP__, a specialized platform designed to automate and streamline attendance tracking and campus engagement for educational institutions\.

## <a id="_t28uqxc7ltxv"></a>__1\. Project Overview__

- __Short Description__: A full\-stack web application featuring a automated attendance extraction system and a centralized dashboard for campus activities\.
- __Problem it Solves__: Eliminates manual attendance tracking errors by scraping institutional portals and consolidates disparate campus information \(events, clubs, forms\) into a single user interface\.
- __Target Users__: Students and faculty of educational institutions \(specifically tailored for Chaitanya Bharathi Institute of Technology based on assets\)\.

## <a id="_a4h5612oxrl6"></a>__2\. Key Features__

- __Automated Attendance Extraction__: Uses a Python\-based scraper to programmatically retrieve attendance data from external institutional portals\.
- __Interactive Student Dashboard__: Provides a visual summary of subject\-wise attendance, timetable entries, and date\-wise attendance history\.
- __Campus Engagement Hub__: Centralized modules for viewing campus clubs, upcoming events, and recruitment forms\.
- __Streak Tracking__: An engagement feature that monitors and displays user activity streaks to encourage consistent usage\.
- __Event Management System__: A JSON\-driven system to display campus\-wide events with detailed information and categorization\.

## <a id="_jdak5ognxscs"></a>__3\. Tech Stack__

- __Programming Languages__: Java 17, TypeScript, Python 3\.x\.
- __Frameworks__: Spring Boot 3\.3\.0, Next\.js 14 \(App Router\), Tailwind CSS\.
- __Libraries__:
	- __Backend__: Spring Web, Spring DevTools\.
	- __Frontend__: Shadcn/UI, Lucide React \(icons\), Sonner \(toasts\), Radix UI primitives\.
	- __Data Extraction__: Requests \(Python\)\.
- __APIs__: RESTful architecture for backend\-frontend communication\.
- __Deployment__: Optimized for Vercel \(Frontend\) and includes Docker configuration for the backend\.

## <a id="_fr2x3bg4jrfu"></a>__4\. System Architecture__

- __Backend Architecture__: A Java Spring Boot service acting as an orchestrator, handling business logic and calling an internal Python script for specialized data extraction tasks\.
- __Frontend Architecture__: A modern Next\.js 14 application utilizing the App Router for server\-side rendering \(SSR\) and client\-side interactivity, styled with a mobile\-first approach using Tailwind CSS\.
- __Data Flow__:
	1. User provides credentials via the frontend\.
	2. Spring Boot controller receives the request and invokes the AttendanceService\.
	3. AttendanceService executes the Python extractor\.py via a process builder\.
	4. Python script scrapes the portal and returns structured JSON\.
	5. Java layer parses and serves data back to the Next\.js dashboard\.
- __External Services__: Vercel Analytics for monitoring application usage\.

## <a id="_2c8uqe751i3f"></a>__5\. Important Components__

- __backend/ProjectBunk/src/main/python/extractor\.py__: The core data retrieval engine that handles authentication and HTML parsing of the external ERP\.
- __backend/ProjectBunk/src/main/java/com/tech/ProjectBunk/Service/AttendanceService\.java__: Orchestrates the execution of the scraper and manages the data pipeline\.
- __frontend3/app/dashboard/page\.tsx__: The primary user interface that aggregates and renders attendance statistics and timetables\.
- __frontend3/components/sidebar\.tsx__: A responsive navigation component facilitating access to different campus modules\.

## <a id="_8v01u9coisw0"></a>__6\. Algorithms / ML Models__

- __Data Extraction Logic__: The system utilizes a procedural scraping algorithm within extractor\.py that manages session cookies and navigates specific HTML DOM structures to extract tabular attendance data\.

## <a id="_4stqylej56mt"></a>__7\. APIs / Endpoints__

- __POST /login__
	- __Input__: username, password \(Credentials for the external portal\)\.
	- __Purpose__: Initiates the scraping process and returns a complete profile including subject\-wise attendance, date\-wise logs, and current timetable\.

## <a id="_5uifutu68czh"></a>__8\. Database Design__

- __State Management__: The current implementation primarily functions as a real\-time proxy/aggregator\. Based on the provided code, user data is processed in\-memory and served directly to the frontend without persistent SQL storage for attendance records, ensuring data privacy by not storing external portal credentials\.
- __Static Data__: Campus events and club information are managed via structured JSON files \(events\.json\)\.

## <a id="_lg3pszr978sz"></a>__9\. Challenges Solved__

- __Cross\-Language Integration__: Successfully integrated a Python scraping engine into a Java Spring Boot environment using ProcessBuilder, allowing the use of Python's robust scraping libraries within a Java enterprise framework\.
- __UI/UX Consolidation__: Resolved the "portal fatigue" problem by designing a unified dashboard that combines attendance with social campus features like clubs and recruitment forms\.

## <a id="_c1l90rxr6sbg"></a>__10\. Performance / Impact__

- __Metric Monitoring__: Integrated Vercel Analytics to track real\-time user engagement and performance bottlenecks\.
- __Optimized Rendering__: Leveraged Next\.js App Router and Shadcn/UI to achieve fast page transitions and a responsive mobile experience\.

## <a id="_4vik2yai0xwy"></a>__11\. Resume Bullet Points__

- __Developed a full\-stack Attendance ERP__ using Spring Boot and Next\.js, automating data retrieval from institutional portals for over 5,000 potential campus users\.
- __Engineered a Python\-based extraction engine__ integrated with a Java backend via ProcessBuilder to programmatically scrape and structure legacy HTML data into RESTful JSON responses\.
- __Designed a responsive campus dashboard__ with Next\.js 14 and Tailwind CSS, centralizing attendance analytics, club directories, and event management into a single mobile\-first interface\.
- __Implemented a custom engagement system__ featuring activity streaks and real\-time toast notifications using Shadcn/UI primitives and Sonner\.

## <a id="_sje82djalpwk"></a>__12\. Interview Explanation__

### <a id="_vqrw94kuu37t"></a>__1\-Minute Answer__

"I built an __Attendance ERP__ designed to solve the problem of students having to manually check multiple clunky institutional portals\. I used a __Spring Boot__ backend that orchestrates a __Python scraper__ to pull real\-time attendance data\. On the frontend, I used __Next\.js 14__ and __Tailwind CSS__ to create a modern dashboard that not only shows attendance stats but also integrates campus events and club recruitment\. It effectively bridges the gap between official data and student engagement\."

### <a id="_mdfjj374bny5"></a>__3\-Minute Answer__

"The project is a comprehensive __Campus ERP system__ built with a micro\-tool architecture\.

- __The Problem__: Our college portal had a poor mobile experience and separated attendance, events, and club info across different links\.
- __The Backend__: I implemented a __Spring Boot__ server that acts as a secure gateway\. Since Python is superior for web scraping, I wrote an __extraction engine__ using Python's requests library\. The Java backend invokes this script, passes encrypted credentials, and receives a clean JSON object containing subject\-wise attendance and the daily timetable\.
- __The Frontend__: I chose __Next\.js 14__ for its performance and SEO benefits\. I used __Shadcn/UI__ for a consistent design language\. The dashboard provides a high\-level view of attendance percentages, using color\-coded progress bars to alert students if they fall below the required threshold\.
- __Key Modules__: Beyond attendance, I built a 'Plan Today' feature and a recruitment form module to make the app a daily driver for students\. I also integrated __Vercel Analytics__ to monitor performance and user flow\. This project taught me a lot about handling cross\-language process execution and building responsive, data\-heavy dashboards\."

## <a id="_3gdsonewm5ul"></a>__13\. Possible Improvements__

- __Database Persistence__: Implementing PostgreSQL to store campus events and club details instead of static JSON for easier administration\.
- __Caching Layer__: Adding Redis to cache attendance data for short durations to reduce the load on the institutional portal and improve response times\.
- __Push Notifications__: Integrating a notification service to alert students about attendance drops or new recruitment forms in real\-time\.

Github: [https://github\.com/Sarvesh\-Jhawar/attendance\-erp\.git](https://github.com/Sarvesh-Jhawar/attendance-erp.git)

# <a id="_ivgtd4eftnvy"></a>__CyberRakshak ΓÇô Defence Cybersecurity Portal__

__Project Documentation__

__GitHub Repository:__ *\(Link not provided in the uploaded files ΓÇö add your repository URL here\)  
*Example format: https://github\.com/<username>/CyberRakshak

# <a id="_ejtyftk57lrt"></a>__1\. Project Overview__

__CyberRakshak__ is a full\-stack cybersecurity incident reporting and management platform designed to help users report cyber incidents and enable administrators to monitor, analyze, and respond to them\.

The system integrates __machine learning models for threat detection__, a __FastAPI backend__, and a __Next\.js frontend dashboard__ to provide an end\-to\-end platform for cybersecurity management\.

### <a id="_p0xzmh79f7xw"></a>__Problem it Solves__

Cyber incidents often go unreported or are poorly managed due to lack of centralized reporting tools\. CyberRakshak addresses this by providing:

- A structured __incident reporting platform__
- __Automated threat detection__ using ML models
- __Administrative monitoring and analytics tools__
- Real\-time __notifications and case tracking__

### <a id="_pwkfn0q9nf4w"></a>__Target Users__

- Individuals reporting cybersecurity incidents
- Cybersecurity analysts
- Government / organizational security teams
- System administrators managing cyber threats

# <a id="_r2yfekyzgfnd"></a>__2\. Key Features__

## <a id="_iktv97ropxq7"></a>__1\. User Authentication & Authorization__

__Implementation__

- JWT\-based authentication
- Role\-based access control

__Technical Workflow__

1. Users sign up or log in via /auth endpoints\.
2. Backend generates __JWT tokens__\.
3. Token is validated for protected routes\.
4. Roles \(user/admin\) determine API permissions\.

## <a id="_nht9mh3l5814"></a>__2\. Cyber Incident Reporting__

Users can submit reports describing cybersecurity incidents\.

__Technical Workflow__

1. User submits incident data through frontend\.
2. Request sent to FastAPI endpoint\.
3. Backend validates input using __Pydantic models__\.
4. Incident stored in __Firebase Firestore__\.
5. Admin dashboard retrieves incidents for review\.

## <a id="_omhr6a8c1n6x"></a>__3\. Incident Tracking System__

Users can monitor the status of their complaints\.

__Technical Details__

- Incident data stored in Firestore collections
- Admins update incident status
- Frontend fetches updated status via API

## <a id="_wg7ozqbmfgob"></a>__4\. Admin Dashboard__

Administrators manage and monitor incidents through a dedicated dashboard\.

__Capabilities__

- View all reported incidents
- Analytics dashboard
- Incident status updates
- Notification management

__Frontend Implementation__

- Next\.js App Router structure
- Admin dashboard pages:
	- analytics
	- incidents
	- notifications
	- tools
	- profile

## <a id="_6qbmybaz7dpg"></a>__5\. ML\-based Threat Detection__

The system integrates __machine learning models__ for automated threat analysis\.

Two models are referenced:

### <a id="_9jgf7ux7c8yt"></a>__Phishing Detection__

Analyzes:

- email subject
- email body
- suspicious URLs

### <a id="_vkltlsxqpg7r"></a>__Malware Detection__

Uses system\-level behavioral metrics such as:

- memory usage
- process attributes
- task sizes

__Implementation__

- Pre\-trained models loaded with joblib
- Prediction performed through utility services

## <a id="_esugqyng681n"></a>__6\. AI Assistance / Chat Support__

A chat\-based interface helps users interact with the system and possibly receive guidance\.

Backend route:

/chat

## <a id="_iqlm93iqexd6"></a>__7\. Notifications System__

Admins can send alerts or updates related to incidents\.

## <a id="_3duk207tf9px"></a>__8\. Media Handling__

Uploaded files or evidence are stored in a __media directory__ and served through FastAPI static routes\.

# <a id="_jpcxi8jto0am"></a>__3\. Tech Stack__

## <a id="_a7q34ytf9msy"></a>__Programming Languages__

- Python
- TypeScript
- JavaScript

## <a id="_4np8hut78m95"></a>__Backend Framework__

- __FastAPI__

Used for:

- REST API development
- Automatic OpenAPI documentation
- High\-performance async endpoints

## <a id="_ebr7sw15iqbg"></a>__Frontend Framework__

- __Next\.js \(React\)__

Uses:

- App Router architecture
- Server components

## <a id="_1l7nlukfi4uz"></a>__Machine Learning Libraries__

- __Scikit\-learn__
- __Joblib__
- __NumPy__
- __Pandas__

## <a id="_8z51ceracdt2"></a>__Database__

- __Firebase Firestore__

NoSQL cloud database used for:

- user records
- incidents
- notifications

## <a id="_bi378pyzdgx9"></a>__Authentication__

- __JWT \(JSON Web Tokens\)__

## <a id="_lbsu90pi1ffn"></a>__Other Libraries__

- Pydantic ΓÇô data validation
- BeautifulSoup ΓÇô HTML parsing
- uvicorn ΓÇô ASGI server
- CORS middleware

# <a id="_qsz78ikf4342"></a>__4\. System Architecture__

## <a id="_dq3oge3sjei"></a>__High\-Level Architecture__

Frontend \(Next\.js\)

       Γöé

       Γöé REST API

       Γû╝

Backend \(FastAPI\)

       Γöé

       Γö£ΓöÇΓöÇ Authentication Service

       Γö£ΓöÇΓöÇ Incident Service

       Γö£ΓöÇΓöÇ ML Threat Detection

       Γö£ΓöÇΓöÇ Notification Service

       Γöé

       Γû╝

Firebase Firestore

## <a id="_8zm6lq9i7r68"></a>__Backend Architecture__

app/

 Γö£ΓöÇΓöÇ main\.py

 Γö£ΓöÇΓöÇ config\.py

 Γö£ΓöÇΓöÇ routes/

 Γöé     Γö£ΓöÇΓöÇ auth\.py

 Γöé     Γö£ΓöÇΓöÇ incidents\.py

 Γöé     Γö£ΓöÇΓöÇ admin\.py

 Γöé     Γö£ΓöÇΓöÇ notifications\.py

 Γöé     Γö£ΓöÇΓöÇ report\.py

 Γöé     Γö£ΓöÇΓöÇ chat\.py

 Γöé     ΓööΓöÇΓöÇ llm\.py

 Γöé

 Γö£ΓöÇΓöÇ models/

 Γöé     Γö£ΓöÇΓöÇ user\.py

 Γöé     Γö£ΓöÇΓöÇ incident\.py

 Γöé     Γö£ΓöÇΓöÇ response\.py

 Γöé     ΓööΓöÇΓöÇ chat\.py

 Γöé

 ΓööΓöÇΓöÇ utils/

       Γö£ΓöÇΓöÇ firebase\.py

       Γö£ΓöÇΓöÇ auth\.py

       Γö£ΓöÇΓöÇ helpers\.py

       Γö£ΓöÇΓöÇ ml\_models\.py

       ΓööΓöÇΓöÇ ml\_service\.py

## <a id="_zdpefgwrde9y"></a>__Frontend Architecture__

Frontend/cyberaksha

 Γö£ΓöÇΓöÇ app/

 Γöé    Γö£ΓöÇΓöÇ login

 Γöé    Γö£ΓöÇΓöÇ signup

 Γöé    Γö£ΓöÇΓöÇ admin\-dashboard

 Γöé    ΓööΓöÇΓöÇ user\-dashboard

 Γöé

 Γö£ΓöÇΓöÇ components/

 Γöé    Γö£ΓöÇΓöÇ dashboard

 Γöé    ΓööΓöÇΓöÇ ui

 Γöé

 Γö£ΓöÇΓöÇ layout\.tsx

 ΓööΓöÇΓöÇ globals\.css

## <a id="_c74mm6z98ews"></a>__Data Flow__

1. User submits incident report\.
2. Frontend sends request to FastAPI\.
3. Backend validates data using Pydantic\.
4. Data stored in Firestore\.
5. ML models analyze suspicious inputs\.
6. Admin dashboard retrieves and processes reports\.

# <a id="_mfiu3visf48x"></a>__5\. Important Components__

## <a id="_zbu50n5n3i13"></a>__main\.py__

Main FastAPI entry point\.

Responsibilities:

- App initialization
- CORS configuration
- Router registration
- Firebase initialization
- Health check endpoint

## <a id="_bzy3lsen09aw"></a>__routes/__

### <a id="_iadeviqrwfwg"></a>__auth\.py__

Handles:

- user login
- user registration
- JWT token generation

### <a id="_dtxic8q1t1i"></a>__incidents\.py__

Handles:

- incident creation
- incident retrieval
- incident status updates

### <a id="_8qd5wvu7vlm0"></a>__admin\.py__

Admin\-specific functionality such as analytics and incident management\.

### <a id="_vf9iif5espbd"></a>__notifications\.py__

Manages alert notifications\.

### <a id="_ol1y0zs53a6t"></a>__chat\.py__

Handles chatbot interactions\.

### <a id="_awke5lmosuw"></a>__report\.py__

Handles reporting functionality\.

## <a id="_jjqj1g8rgdxp"></a>__models/__

### <a id="_hlp78gy8h95f"></a>__user\.py__

Defines user data schema\.

### <a id="_nsshajuec6vh"></a>__incident\.py__

Defines structure of cybersecurity incident reports\.

### <a id="_uy1c81x5d3oj"></a>__response\.py__

Standard API response structure\.

## <a id="_abytg2ekz02"></a>__utils/__

### <a id="_4chp1hrc5i5g"></a>__firebase\.py__

Initializes Firebase and handles Firestore connections\.

### <a id="_wuyccy8pfi87"></a>__auth\.py__

Handles JWT validation and security utilities\.

### <a id="_msajr6p4ngu4"></a>__ml\_models\.py__

Loads ML models and performs predictions\.

### <a id="_z2bsusxcu0zr"></a>__ml\_service\.py__

Acts as service layer between API routes and ML models\.

# <a id="_4on0ykm8uhrw"></a>__6\. Algorithms / ML Models__

The project integrates __pre\-trained ML models__\.

### <a id="_by3dvdjrv38l"></a>__Phishing Detection Model__

Inputs:

- email subject
- email body
- URL features

Feature engineering includes:

- URL parsing
- HTML content analysis
- suspicious keyword detection

Prediction pipeline:

Input ΓåÆ Feature Extraction ΓåÆ ML Model ΓåÆ Prediction

### <a id="_yqrsoo4afeha"></a>__Malware Detection Model__

Uses process\-level system metrics such as:

- memory usage
- process priority
- task size
- shared memory metrics

Model inference classifies activity as:

- malicious
- benign

# <a id="_pdcrm8aszat0"></a>__7\. APIs / Endpoints__

Base URL:

/api/v1

### <a id="_nqoeu43k2rll"></a>__Authentication__

POST /auth/login

POST /auth/register

### <a id="_50p23pasefyo"></a>__Incidents__

POST /incidents

GET /incidents

GET /incidents/\{id\}

### <a id="_p5l74si343ts"></a>__Admin__

GET /admin/analytics

GET /admin/incidents

### <a id="_4j7zfme5vze2"></a>__Notifications__

GET /notifications

POST /notifications

### <a id="_u2eyw2kf14fk"></a>__Chat__

POST /chat

### <a id="_9ic3gm1cd6q"></a>__Health Check__

GET /health

# <a id="_k0ag2kqh3sht"></a>__8\. Database Design__

Database: __Firebase Firestore__

### <a id="_bkauz3wy5rqh"></a>__Users Collection__

Fields:

- id
- name
- email
- password
- role

### <a id="_5x8gv3v7xuv1"></a>__Incidents Collection__

Fields:

- incident\_id
- user\_id
- description
- category
- status
- timestamp

### <a id="_4h2y3dn3nfdp"></a>__Notifications Collection__

Fields:

- notification\_id
- message
- created\_at
- recipient

# <a id="_a8unx8wbreab"></a>__9\. Challenges Solved__

### <a id="_x396qoq7gecm"></a>__1\. Integrating ML Models into API__

Problem:  
Serving ML predictions in real\-time API requests\.

Solution:

- Load models using joblib
- Create service layer \(ml\_service\.py\) to handle inference\.

### <a id="_uuhxpew3rp9z"></a>__2\. Secure Authentication__

Problem:  
Protecting sensitive incident data\.

Solution:

- JWT\-based authentication
- Role\-based access control

### <a id="_z9neiiouy3sw"></a>__3\. Real\-time Data Handling__

Problem:  
Managing large numbers of incident reports\.

Solution:

- Firebase Firestore NoSQL database for scalable storage\.

# <a id="_mz639zwocqvr"></a>__10\. Performance / Impact__

Expected benefits:

- Fast API performance via __FastAPI async architecture__
- Scalable cloud storage using __Firebase Firestore__
- Automated threat classification via __ML models__
- Centralized platform for cybersecurity reporting

*\(No measurable metrics were found in the repository\.\)*

# <a id="_787eac8eembb"></a>__11\. Resume Bullet Points__

- Developed __CyberRakshak__, a full\-stack cybersecurity incident management platform using __FastAPI, Next\.js, and Firebase Firestore__\.
- Implemented __JWT\-based authentication and role\-based access control__ for secure access to incident reporting and administrative tools\.
- Integrated __machine learning models \(Scikit\-learn\)__ for automated phishing and malware detection within the incident analysis pipeline\.
- Built a scalable __RESTful API architecture with FastAPI__, supporting incident tracking, notifications, and AI\-driven assistance\.
- Designed an __admin analytics dashboard__ for monitoring cyber incidents and managing threat reports\.

# <a id="_xqf1lfwv13bn"></a>__12\. Interview Explanation__

## <a id="_je3b506dw7z2"></a>__1\-Minute Explanation__

CyberRakshak is a full\-stack cybersecurity incident management platform built with FastAPI and Next\.js\. The system allows users to report cyber incidents, track their status, and receive guidance\. The backend integrates machine learning models for phishing and malware detection, while Firebase Firestore is used as the database\. The platform includes JWT\-based authentication and a role\-based admin dashboard for monitoring incidents, managing notifications, and analyzing threats\.

## <a id="_wb4g2y6ku0l8"></a>__3\-Minute Explanation__

CyberRakshak is a cybersecurity incident reporting and management platform designed to streamline how users report cyber threats and how administrators respond to them\.

The system uses a __FastAPI backend__ that exposes REST APIs for authentication, incident reporting, notifications, and AI\-powered threat analysis\. User authentication is implemented using __JWT tokens with role\-based access control__, ensuring only authorized users or administrators can access specific functionality\.

The platform stores data in __Firebase Firestore__, which provides scalable NoSQL storage for incidents, users, and notifications\.

One of the key features of the system is __machine learning integration__\. Pre\-trained models built with __Scikit\-learn__ analyze inputs such as suspicious email content or system behavior to detect phishing attempts or malware activity\.

On the frontend, the application is built using __Next\.js with the App Router architecture__, providing separate dashboards for users and administrators\. Users can report incidents and track their status, while administrators can view analytics, manage incidents, and send notifications\.

Overall, the project demonstrates full\-stack development, secure API design, ML model integration, and scalable cloud database usage\.

# <a id="_btoizlfx6g59"></a>__13\. Possible Improvements__

### <a id="_my15u01yjbpc"></a>__Feature Improvements__

- Real\-time incident alerts
- Automated threat severity scoring
- Integration with external cybersecurity APIs

### <a id="_j3t6psb1941s"></a>__Scalability Improvements__

- Containerization using Docker
- Deploy backend using Kubernetes
- Implement Redis caching

### <a id="_maxuuqt6uuc"></a>__Security Improvements__

- Rate limiting
- API gateway
- OAuth integration
- Encryption of sensitive user data

If you want, I can also generate a __perfect GitHub README\.md version__ of this documentation \(which looks much more professional for recruiters\)\.

# <a id="_cp6domaar5i1"></a>__Enterprise SaaS Backend: Project Documentation__

This documentation provides a comprehensive technical overview of the __Enterprise SaaS Backend__, a multi\-tenant Spring Boot application designed to serve multiple independent businesses from a single instance\.

## <a id="_ewe4krc7g8u7"></a>__1\. Project Overview__

- __Description__: A high\-performance, single\-instance backend that supports multiple frontend clients \(tenants\) using path\-based multi\-tenancy\.
- __Problem it Solves__: Eliminates "Code Bloat" and high infrastructure costs associated with deploying separate backend instances for every new client\. It centralizes maintenance and updates into a single repository\.
- __Target Users__: SaaS providers, multi\-brand enterprises, or businesses managing several independent e\-commerce frontends\.

## <a id="_elhvu9sy7t6z"></a>__2\. Key Features__

- __Dynamic Path\-Based Multi\-tenancy__: Uses a tenantSlug in the URL \(e\.g\., /api/\{tenantSlug\}/products\) to route requests to the correct business context\.
- __Strict Data Isolation__: Database queries are filtered by tenant\_id, ensuring one business cannot access another's data\.
- __Tenant\-Aware Authentication__: Admin logins are scoped to specific tenants\. The system validates that an authenticated admin belongs to the tenant slug specified in the request path\.
- __Soft Deletion__: Implements logic to mark resources like products as inactive rather than permanent deletion to preserve data integrity\.
- __Automated Image Naming__: Generates unique, SEO\-friendly image names based on product name, tenant ID, and a UUID suffix\.

## <a id="_4ux4cb618y4e"></a>__3\. Tech Stack__

- __Core__: Java 21\.
- __Framework__: Spring Boot 3\.4\.1\.
- __Persistence__: Spring Data JPA with Hibernate\.
- __Database__: PostgreSQL \(specifically Supabase/PostgreSQL\)\.
- __Security__: Spring Security 6 \(Session\-based\) with BCrypt password encoding\.
- __Tooling__: Lombok \(boilerplate reduction\), Maven \(build tool\), Docker \(containerization\)\.

## <a id="_tas0sx6bn6x4"></a>__4\. System Architecture__

- __Backend Architecture__: Layered architecture \(Controller \-> Service \-> Repository\) following a __Single Database, Shared Schema__ multi\-tenancy model where isolation is enforced at the application level via tenant\_id columns\.
- __Data Flow__:
	1. Request arrives with a \{tenantSlug\} in the path\.
	2. TenantResolver validates the slug and retrieves the tenant\_id\.
	3. Service layer uses this tenant\_id to filter repository queries\.
	4. SecurityConfig ensures session persistence and cross\-origin resource sharing \(CORS\) for specific frontend domains\.

## <a id="_hty1qtpdxabx"></a>__5\. Important Components__

- __com\.tech\.enterprise\.tenant\.TenantResolver__: A utility service that converts URL slugs into database IDs and validates tenant status \(active/inactive\)\.
- __com\.tech\.enterprise\.security\.AdminUserDetailsService__: Custom implementation that requires both username and tenantId to authenticate an admin, preventing cross\-tenant logins\.
- __com\.tech\.enterprise\.controller\.ProductController__: Contains the validateAdminTenantAccess method, which is the primary gatekeeper for ensuring an admin is authorized for the specific tenant path they are accessing\.
- __Dockerfile__: A multi\-stage build file that uses maven:3\.9\.6\-eclipse\-temurin\-21 for building and eclipse\-temurin:21\-jre for the final lightweight image\.

## <a id="_itwxj39f5xrz"></a>__6\. APIs / Endpoints__

__Method__

__Endpoint__

__Description__

__Auth Required__

__POST__

/api/\{tenantSlug\}/admins/login

Authenticates admin for a specific tenant

No

__GET__

/api/\{tenantSlug\}/products

Retrieves all products for the tenant

No

__GET__

/api/\{tenantSlug\}/products/\{id\}

Retrieves details for a specific product

No

__POST__

/api/\{tenantSlug\}/products

Creates a new product \(Admin only\)

Yes

__PUT__

/api/\{tenantSlug\}/products/\{id\}

Updates product info \(Admin only\)

Yes

__DELETE__

/api/\{tenantSlug\}/products/\{id\}

Soft\-deletes a product \(Admin only\)

Yes

## <a id="_yu78jzevoky4"></a>__7\. Database Design__

- __tenants__: Stores business entities\. Fields: id, name, slug, active\.
- __admins__: Stores user credentials\. Fields: id, username, password\_hash, tenant\_id, active\.
- __products__: Core inventory\. Fields: id, name, tenant\_id, category, price, active, image\_name\.
- __product\_variants__: Specific options \(e\.g\., sizes\)\. Fields: id, product\_id, tenant\_id, quantity\_value, price\.
- __Relationships__: admins, products, and product\_variants all maintain a mandatory __Many\-to\-One__ relationship with tenants via the tenant\_id foreign key\.

## <a id="_j6ycwd1r5n3v"></a>__8\. Challenges Solved__

- __Cross\-Tenant Security__: Solved by implementing a custom authentication flow where AdminUserDetails stores the tenantId\. Every admin write operation is intercepted to verify the URL slug matches the admin's authorized tenantId\.
- __Deployment Environment Consistency__: Addressed JDBC driver and dialect issues for cloud platforms \(Render/Railway\) by explicitly configuring PostgreSQLDialect and session cookie security settings in the properties file\.

## <a id="_bt73f3wbnqm"></a>__9\. Resume Bullet Points__

- __Architected and implemented__ a multi\-tenant SaaS backend using Spring Boot 3 and Java 21, serving multiple independent clients from a single application instance to reduce infrastructure overhead\.
- __Engineered a robust path\-based tenant resolution system__ and custom security filters that enforce strict data isolation, preventing cross\-tenant data leaks for over 10 API endpoints\.
- __Optimized database performance__ by implementing a shared\-schema architecture with indexing on tenant identifiers, using PostgreSQL and Spring Data JPA for efficient resource utilization\.
- __Enhanced system reliability__ by integrating Spring Security with session\-based authentication and BCrypt encoding, achieving secure admin access control across a dynamic tenant landscape\.

## <a id="_8vkluassb7ev"></a>__10\. Interview Explanation__

### <a id="_rg8h71hfb58t"></a>__1\-Minute Version__

"I developed an __Enterprise SaaS Backend__ using Spring Boot 3 and Java 21\. The core challenge was supporting multiple independent businesses through a single backend instance\. I implemented a path\-based multi\-tenancy architecture where the system resolves the tenant context from the URL slug\. I used Spring Security to ensure that admins are restricted to their specific tenant data and designed the database schema so that all entities are isolated by a tenant\_id\. This approach significantly lowers operational costs and simplifies updates since there is only one codebase to maintain for all clients\."

### <a id="_f5bq1yqqw03f"></a>__3\-Minute Version__

"I built a __Multi\-tenant SaaS Backend__ designed for high scalability and low infrastructure costs\.

- __Architecture__: I chose a path\-based multi\-tenancy model using Spring Boot\. This means instead of managing hundreds of subdomains, the backend identifies the business through the API path \(e\.g\., /api/business\-a/products\)\.
- __Security & Isolation__: This was the most critical part\. I didn't just filter queries; I customized the Spring Security flow\. I created a TenantResolver to validate slugs and an AdminUserDetailsService that requires a tenant context\. In the controller layer, I implemented a validation method that compares the authenticated adminΓÇÖs tenant ID with the one in the URL path, returning a 403 Forbidden if they donΓÇÖt match\.
- __Data Layer__: I used Spring Data JPA and PostgreSQL\. Every tableΓÇöAdmins, Products, VariantsΓÇöcontains a tenant\_id\. I implemented soft\-deletion and automated image naming logic to maintain data integrity\.
- __Outcome__: The result is a 'Power of One' architecture\. Onboarding a new business is now as simple as adding a row to a database table, rather than deploying new servers, which makes the system highly efficient and cost\-effective\."

## <a id="_grl38bec1voc"></a>__11\. Possible Improvements__

- __Stateless Auth__: Migrating from session\-based to JWT\-based authentication for better horizontal scaling\.
- __Tenant Branding__: Adding a configuration JSON field to the tenants table to store frontend\-specific UI settings \(colors, logos\)\.
- __Caching__: Implementing Redis caching at the tenant level to speed up product retrieval for high\-traffic stores\.
- __Query Interceptors__: Using Hibernate Filters to automatically apply the tenant\_id to all queries globally, reducing the manual filtering needed in the service layer\.

Github: https://github\.com/Sarvesh\-Jhawar/Enterprises\-Backend\.git

# <a id="_g1dohoe1880g"></a>__Project Documentation: Endless Tic\-Tac\-Toe__

## <a id="_rzoain27na8z"></a>__1\. Project Overview__

- __Short Description__: A full\-stack web application featuring an "Endless" Tic\-Tac\-Toe variant where only a limited number of marks can exist on the board at once, forcing older moves to disappear\.
- __Problem it Solves__: Standard Tic\-Tac\-Toe often results in a draw \(cat's game\) between skilled players\. This version introduces dynamic board management to ensure a definitive winner and increases strategic depth\.
- __Target Users__: Casual gamers looking for a twist on a classic game, and developers interested in full\-stack Spring Boot and React integration\.

## <a id="_woprc5q8if96"></a>__2\. Key Features__

- __Endless Move Logic__: Only the last 3 moves for each player remain on the board; the 4th move triggers the removal of the player's oldest move\.
- __Multi\-Mode Gameplay__: Supports both "Local Play" \(two players on one device\) and "Play with AI"\.
- __Global Leaderboard__: Features a competitive ranking system where players can submit high scores \(based on total wins\) to a global database\.
- __Intelligent AI__: An automated opponent that calculates moves via a backend service\.
- __Immersive UI__: Includes a responsive interface with particle backgrounds, sound effects management, and victory confetti\.

## <a id="_mnoplax1hmoe"></a>__3\. Tech Stack__

- __Programming Languages__: Java \(Backend\), JavaScript \(Frontend\)\.
- __Frameworks__: Spring Boot \(Backend\), React\.js \(Frontend\), Tailwind CSS \(Styling\)\.
- __Libraries__:
	- __Backend__: Spring Data JPA \(ORM\), Spring Web\.
	- __Frontend__: Lucide\-React \(Icons\), Canvas\-Confetti \(Effects\), TSParticles \(Backgrounds\)\.
- __Database__: H2 Database \(In\-memory, as configured in properties\)\.
- __Deployment Tools__: Docker \(Dockerfile included for backend\)\.

## <a id="_yk4tpccv1ia4"></a>__4\. System Architecture__

- __Backend Architecture__: Follows a Layered Architecture \(Controller\-Service\-Repository\) built with Spring Boot\.
- __Frontend Architecture__: Component\-based React architecture using Context API for global sound management\.
- __Data Flow__:
	1. User makes a move in the React frontend\.
	2. For AI games, the frontend sends a POST request with the current board state to the Spring Boot backend\.
	3. The AiService calculates the next move and returns it to the client\.
	4. Upon winning, players submit scores via the LeaderboardController which persists data to the database\.
- __External Services__: None explicitly integrated beyond standard web libraries\.

## <a id="_epa1inissfos"></a>__5\. Important Components__

- __backend/src/main/java/com/aiquiz/playwithai/__:
	- __controller/GameController\.java__: Handles AI move requests\.
	- __service/AiService\.java__: Contains the logic for determining the AI's next move\.
	- __repository/LeaderboardRepository\.java__: Manages database interactions for player rankings\.
- __frontend/src/__:
	- __components/AIgame\.js__: Orchestrates the state for the AI\-driven game mode, including move fading logic\.
	- __components/Localgame\.js__: Manages the state for two\-player local games\.
	- __contexts/SoundContext\.js__: Provides global access to toggle and play game audio\.

## <a id="_lvcy6tclvtf6"></a>__6\. Algorithms / ML Models__

- __AI Strategy__: The project uses a heuristic\-based algorithm in AiService to determine moves\.
- __Endless Logic Algorithm__:
	- The frontend maintains an array of move coordinates for each player\.
	- When a player's move count exceeds 3, the coordinate at index 0 \(oldest\) is cleared from the board before the new move is added\.

## <a id="_oxap2ofiash2"></a>__7\. APIs / Endpoints__

- __AI Game Endpoints__:
	- POST /api/game/ai\-move: Receives a BoardRequest \(current board state\) and returns a BoardResponse with the AI's chosen move\.
- __Leaderboard Endpoints__:
	- GET /api/leaderboard: Returns a list of the top players and their scores\.
	- POST /api/leaderboard: Accepts a LeaderboardEntry to save a new score\.

## <a id="_4w136t1rcmk9"></a>__8\. Database Design__

- __Table: LeaderboardEntry__:
	- id: Primary Key \(Long\)\.
	- playerName: String \(The name of the player\)\.
	- wins: Integer \(Total number of wins recorded\)\.
- __Relationships__: Simple flat\-table design for ranking purposes\.

## <a id="_ojdz9mu56jqg"></a>__9\. Challenges Solved__

- __State Synchronization__: Managed the "fading" move logic on the frontend to ensure the UI correctly reflects the 3\-move limit before a player commits a new action\.
- __CORS Configuration__: Implicitly handled through Spring Boot to allow the React frontend to communicate with the Java backend\.
- __Responsive Design__: Utilized Tailwind CSS to ensure the game board remains playable across mobile and desktop resolutions\.

## <a id="_2eerk5w7ark5"></a>__10\. Performance / Impact__

- __Accuracy__: AI is designed to block immediate winning threats and take winning moves when available\.
- __Efficiency__: Backend responses for AI moves are processed in milliseconds due to the lightweight heuristic approach\.

## <a id="_nhwtc6f8gbs1"></a>__11\. Resume Bullet Points__

- Developed a full\-stack __Spring Boot__ and __React__ application featuring a unique Tic\-Tac\-Toe variant with dynamic board state management\.
- Implemented an __AI opponent service__ in Java that utilizes heuristic\-based decision\-making to provide a challenging user experience\.
- Engineered a __Global Leaderboard__ system using __Spring Data JPA__ and __H2 Database__, allowing real\-time score tracking and persistence\.
- Optimized frontend performance using __React Context API__ for global state management and __Tailwind CSS__ for a mobile\-first responsive UI\.

## <a id="_nfbi3r7k0dvr"></a>__12\. Interview Explanation__

- __1\-Minute Answer__: "I built 'Endless Tic\-Tac\-Toe', a full\-stack web application that reinvents the classic game\. I used Spring Boot for the backend and React for the frontend\. The core challenge was implementing a 'sliding window' move logic where only the latest three moves persist, preventing draws\. I also developed an AI service in Java to handle automated moves and integrated a leaderboard system with a database to track player wins globally\."
- __3\-Minute Answer__: "Endless Tic\-Tac\-Toe is a project I developed to explore full\-stack integration and game logic\. On the backend, I used Spring Boot to create a RESTful API\. I built two main controllers: one for a leaderboard and another for an AI opponent\. The AI service uses a strategy\-based algorithm to evaluate the board state and respond to player moves\. On the frontend, I utilized React and Tailwind CSS\. The most interesting part was the 'Endless' logicΓÇöI had to manage move history as a queue\. When a player makes a fourth move, the frontend identifies the oldest move, triggers a visual fade, and removes it from the board state before the new move is registered\. I also focused heavily on user experience, implementing a Sound Manager via React Context to handle audio globally and using Docker to containerize the backend for easier deployment\. This project sharpened my skills in state management, API design, and asynchronous communication between different tech stacks\."

## <a id="_89m8sc5nzx00"></a>__13\. Possible Improvements__

- __Multiplayer WebSockets__: Transition from local play to real\-time online multiplayer using Spring WebSockets or STOMP\.
- __Advanced AI__: Upgrade the current heuristic AI to a Minimax algorithm with Alpha\-Beta pruning for unbeatable difficulty\.
- __Persistent Database__: Replace the H2 in\-memory database with a persistent solution like PostgreSQL for long\-term leaderboard data\.

__GitHub Link__:[ https://github\.com/sarvesh\-jhawar/endless\-tic\-tac\-toe](https://www.google.com/search?q=https://github.com/sarvesh-jhawar/endless-tic-tac-toe)

# <a id="_79vfo2owluk4"></a>__Project Documentation: Malware Detection Using Machine Learning__

## <a id="_abay9v5u2n66"></a>__1\. Project Overview__

- __Short Description__: A supervised machine learning project designed to identify malicious software by analyzing Portable Executable \(PE\) header features\.
- __Problem it Solves__: Traditional signature\-based detection often fails to catch new or obfuscated malware\. This project utilizes machine learning to recognize patterns in file metadata to distinguish between benign and malicious files\.
- __Target Users__: Cybersecurity researchers, malware analysts, and developers interested in behavioral or static analysis automation\.

## <a id="_k4vnud1rgjtm"></a>__2\. Key Features__

- __Static PE Analysis__: Extracts and utilizes numeric features from the PE header, such as SizeOfCode and NumberOfSections, to classify files without executing them\.
- __Automated Preprocessing__: A dedicated pipeline to clean raw data, drop non\-numeric identifiers \(like file names\), and encode labels for model compatibility\.
- __Predictive Modeling__: Implements a Random Forest classifier that provides binary classification \(Benign vs\. Malware\) with high precision\.
- __Performance Evaluation__: Generates detailed metrics, including a classification report and a confusion matrix heatmap, to visualize model reliability\.

## <a id="_7ztzbgdl3frp"></a>__3\. Tech Stack__

- __Programming Language__: Python\.
- __Libraries__:
	- __Scikit\-learn__: Used for the Random Forest model, data splitting, and evaluation metrics\.
	- __Pandas__: Used for data manipulation and loading CSV datasets\.
	- __Matplotlib & Seaborn__: Used for generating the confusion matrix and data visualization\.
	- __Joblib__: Used for serializing \(saving/loading\) the trained model\.

## <a id="_j8ct3iud1acj"></a>__4\. System Architecture__

- __Data Flow__:
	1. __Data Ingestion__: Raw CSV data is loaded via pandas\.
	2. __Preprocessing__: Features are separated from the target; non\-numeric columns are dropped; data is split 80/20 for training/testing\.
	3. __Training__: The Random Forest model is trained on the training set and saved as a \.pkl file\.
	4. __Inference & Evaluation__: The saved model is loaded to make predictions on the test set, and performance is visualized\.

## <a id="_jkxsrt9gqujc"></a>__5\. Important Components__

- __data/malware\_dataset\.csv__: The primary source containing PE header numeric features and the target Malware label\.
- __src/preprocess\.py__: Contains the load\_data function which handles the ETL \(Extract, Transform, Load\) logic, including label encoding and feature selection\.
- __src/train\_model\.py__: The execution script for model training and serialization into rf\_malware\_model\.pkl\.
- __src/evaluate\.py__: The script for loading the model and generating accuracy scores and confusion matrices\.

## <a id="_784g6itv2q6g"></a>__6\. Algorithms / ML Models__

- __Model__: Random Forest Classifier\.
	- __Configuration__: n\_estimators=100, random\_state=42\.
- __Feature Engineering__:
	- Dropping high\-cardinality string columns \(e\.g\., Name\)\.
	- Identifying and using numeric PE header features: SizeOfCode, SizeOfHeapReserve, NumberOfSections, etc\.\.
- __Pipeline__: Sequential data loading ΓåÆ Splitting ΓåÆ Training ΓåÆ Evaluation\.

## <a id="_7u8z8rx8n37y"></a>__7\. Performance / Impact__

- __Accuracy__: 99\.2%\.
- __Class 0 \(Benign\)__: Precision: 0\.99, Recall: 0\.98, F1\-score: 0\.98\.
- __Class 1 \(Malware\)__: Precision: 0\.99, Recall: 1\.00, F1\-score: 0\.99\.

## <a id="_xi6iht8i7vfj"></a>__8\. Resume Bullet Points__

- Developed a malware detection system using Python and __Scikit\-learn__, achieving __99\.2% accuracy__ in classifying malicious vs\. benign PE files\.
- Engineered a robust data preprocessing pipeline to extract and clean __PE header features__, utilizing __Random Forest__ algorithms for high\-precision static analysis\.
- Implemented model serialization using __Joblib__, allowing for efficient model deployment and offline inference without retraining\.

## <a id="_owsbea2vwtai"></a>__9\. Interview Explanation__

- __1\-Minute Answer__:  
"I built a Malware Detection system that uses machine learning to identify threats based on Portable Executable \(PE\) header features\. Using a Random Forest classifier in Python, I achieved a 99\.2% accuracy rate\. The project involved building a full pipelineΓÇöfrom preprocessing raw Kaggle datasets and handling class imbalances to evaluating the model with confusion matrices and classification reports\. It addresses the limitations of traditional signature\-based detection by focusing on structural file patterns\."
- __3\-Minute Answer__:  
"This project focused on the challenge of modern malware detection where signature\-based methods often fall short\. I implemented a static analysis approach using the Random Forest algorithm\.  
I started by preprocessing a dataset of PE header features, which included dropping non\-numeric identifiers and encoding labels\. I used an 80/20 split for training and testing\. The model was configured with 100 estimators to ensure stability and high performance\.  
Technically, I used Pandas for data handling and Scikit\-learn for the ML lifecycle\. One of the highlights was the high recall \(1\.00\) for the malware class, which is critical in security to minimize false negatives\. To make the project production\-ready, I implemented model persistence using Joblib, so the trained classifier can be easily integrated into larger security workflows\. I also leveraged Seaborn for visual evaluation to identify exactly where the model was making minor misclassifications\."

## <a id="_k2ov6lpgsjbg"></a>__10\. Possible Improvements__

- __Advanced Modeling__: Incorporating Graph Neural Networks \(GNNs\) to capture structural relationships within the file\.
- __Feature Expansion__: Combining static PE features with dynamic analysis \(behavioral data\) for better detection of packed malware\.
- __Optimization__: Applying hyperparameter tuning \(e\.g\., GridSearchCV\) to further refine the Random Forest performance\.

__GitHub Link__:[ https://github\.com/sarvesh\-jhawar/cybersecurity\-malware\-detection](https://www.google.com/search?q=https://github.com/sarvesh-jhawar/cybersecurity-malware-detection)

__Climate Risk and Disaster Management__

# <a id="_cqogbtej59uf"></a>__1\. Project Overview__

- __Short Description: An end\-to\-end data science project that analyzes and predicts natural disaster categories \(Wildfires, Severe Storms, Volcanoes, etc\.\) using historical event data\.__
- __Problem it Solves: It helps in understanding global disaster patterns and provides a predictive mechanism to categorize events based on geographical coordinates and temporal data \(month and day\)\.__
- __Target Users: Disaster management agencies, climate researchers, and emergency response planners\.__

# <a id="_40k2fgh5elw6"></a>__2\. Key Features__

- __Exploratory Data Analysis \(EDA\): Visualizes the frequency of disasters over time and across different categories using matplotlib and seaborn\.__
- __Data Transformation & Feature Engineering:__
	- __Extracts Longitude and Latitude from raw geometry strings\.__
	- __Derives Month and DayOfWeek features from event timestamps to capture seasonal patterns\.__
- __Machine Learning Classification: Predicts disaster categories using multiple algorithms\. The Random Forest implementation achieved 100% accuracy on the test set\.__
- __Interactive Web Dashboard: A Streamlit\-based application that allows users to input coordinates and dates to receive real\-time disaster predictions and confidence scores\.__
- __Model Comparison: Supports performance evaluation across various models including Decision Trees, Logistic Regression, KNN, Naive Bayes, and SVM\.__

# <a id="_i03wtscv32gr"></a>__3\. Tech Stack__

- __Programming Languages: Python\.__
- __Frameworks: Streamlit \(Web UI\)\.__
- __Libraries:__
	- __Data Processing: pandas, numpy\.__
	- __Visualization: matplotlib, seaborn\.__
	- __Machine Learning: scikit\-learn\.__
- __APIs: The dataset is derived from NASA's EONET API\.__
- __Deployment tools: GitHub Codespaces / Dev Containers configured for Streamlit hosting\.__

# <a id="_xsgsd594zqzv"></a>__4\. System Architecture__

- __Backend Architecture: Python\-based logic handles data ingestion, feature extraction, and model inference\.__
- __Frontend Architecture: A Streamlit interactive UI provides a sidebar for user inputs and a main dashboard for visualizations \(maps, confidence bar charts, and heatmaps\)\.__
- __Data Flow:__
	1. __Raw Data\.csv is processed into processed\_data\.csv\.__
	2. __Features \(Lat, Lon, Month, Day\) are fed into the trained \.pkl model\.__
	3. __The model outputs a predicted class, which is mapped back to a human\-readable label via LabelEncoder\.__
- __External Services: Uses NASA EONET data source\.__

# <a id="_os9ki44okeb1"></a>__5\. Important Components__

- __week1/app\.py: The main entry point for the Streamlit application, containing both model training logic for comparison and prediction code\.__
- __week1/week1\_project\.ipynb: Research notebook detailing the full pipeline from data exploration to model saving\.__
- __disaster\_rf\_model\.pkl: Pre\-trained Random Forest classifier optimized for high\-accuracy predictions\.__
- __processed\_data\.csv: The clean dataset containing extracted features used for model training\.__

# <a id="_d1hvigw1syzw"></a>__6\. Algorithms / ML Models__

- __Models Used: Primarily Random Forest Classifier, with support for Decision Trees and Logistic Regression\.__
- __Feature Engineering:__
	- __Coordinate Splitting: Parsing Geometry\_Coordinates\_1 into numerical Latitude and Longitude\.__
	- __Time Extraction: Converting string dates into numerical Month and Day of Week\.__
- __Training Pipeline:__
	- __Dataset split into an 80/20 train\-test ratio\.__
	- __Categorical labels converted to integers using LabelEncoder\.__
	- __Model persistence using joblib or pickle for deployment\.__

# <a id="_g1v8l0dym081"></a>__7\. APIs / Endpoints__

__The project is a standalone web app\. The internal Streamlit interface acts as the "endpoint":__

- __Input: Longitude \(float\), Latitude \(float\), Month \(1\-12\), Day of Week \(0\-6\)\.__
- __Output: Predicted disaster category and prediction confidence bar chart\.__

# <a id="_dkhbvol98q8c"></a>__8\. Database Design__

__The project currently uses CSV\-based storage:__

- __Data\.csv: Contains raw fields: ID, Title, Description, Category\_title, Geometry\_Coordinates, Date, and Time\.__
- __processed\_data\.csv: Normalized version containing only the model features and encoded target\.__

# <a id="_3ad7y16gm9k8"></a>__9\. Challenges Solved__

- __Data Parsing: Successfully converted complex coordinate strings into distinct numerical features for the ML model\.__
- __Imbalanced Data Handling: Addressed the variety of disaster categories through careful preprocessing and model selection\.__

# <a id="_498luzmjuicu"></a>__10\. Performance / Impact__

- __Accuracy: The Random Forest model achieved 100% accuracy on the specific test dataset provided\.__
- __Interactivity: Reduced the barrier to entry for disaster prediction through a zero\-setup Streamlit UI\.__

# <a id="_z38u6a1azyvc"></a>__11\. Resume Bullet Points__

- __Developed a disaster prediction system using Python and Scikit\-Learn, achieving 100% accuracy in categorizing global natural disasters using Random Forest models\.__
- __Engineered a real\-time web dashboard with Streamlit, enabling users to visualize disaster locations on interactive maps and receive instant classification results\.__
- __Architected a data pipeline to preprocess NASA EONET data, including complex string parsing of geographical coordinates and temporal feature extraction\.__

# <a id="_fyw96fua2xdq"></a>__12\. Interview Explanation__

### <a id="_ffx889m44rwz"></a>__1\-Minute Answer__

__"I developed a Climate Risk and Disaster Management system that predicts natural disaster categories using NASAΓÇÖs EONET data\. I built a full pipeline in Python, from cleaning and feature engineeringΓÇölike extracting coordinates and date patternsΓÇöto training a Random Forest model with 100% accuracy\. I also deployed a Streamlit web app that lets users input coordinates to get real\-time predictions and confidence scores\."__

### <a id="_dfn39ex1hl3l"></a>__3\-Minute Answer__

__"In my AICTE internship project, I focused on climate risk and disaster management\. I started by performing EDA on the Global Natural Disasters dataset to identify patterns in events like wildfires and storms\. One of the main technical challenges was the raw data format; I had to engineer features by parsing string\-based geometry coordinates into Latitude and Longitude and deriving temporal features like 'Day of Week' to improve model context\.__

__I implemented several classifiers, but the Random Forest model performed the best, reaching 100% accuracy on my test set\. To make this accessible, I built a web application using Streamlit\. The app not only predicts the disaster type but also provides a confidence breakdown for other categories and plots the event on an interactive map\. I managed the project environment using Docker\-based dev containers to ensure the deployment was seamless across different platforms\."__

# <a id="_k4r3znbj0wj9"></a>__13\. Possible Improvements__

- __Scalability: Integration with a cloud database \(e\.g\., PostgreSQL\) to handle live NASA API feeds instead of static CSVs\.__
- __Future Features: Adding a "Risk Map" that visualizes historical hotspots globally rather than just a single point\.__
- __Security: Implementing user authentication for the dashboard in a production environment\.__

__GitHub Repository:__[__ https://github\.com/sarvesh\-jhawar/climate\-risk\-and\-disaster\-management\.\-aicte\-__](https://www.google.com/search?q=https://github.com/sarvesh-jhawar/climate-risk-and-disaster-management.-aicte-)

# <a id="_sk17d4s7lpd8"></a>__Project Documentation: InstaTwist Social Media Platform__

### <a id="_j2yhyc1pcqd2"></a>__GitHub Repository__

[__https://github\.com/sarvesh\-jhawar/instatwist\-social\-media\-platform\-__](https://www.google.com/search?q=https://github.com/sarvesh-jhawar/instatwist-social-media-platform-)

## <a id="_926lj1oxmkd7"></a>__1\. Project Overview__

- __Short Description: InstaTwist is a multi\-functional social media web application that combines features of image\-centric platforms \(like Instagram\) and text\-centric platforms \(like Twitter\)\.__
- __Problem it Solves: Provides a unified space for users to share both visual content \(Posts\) and short\-form text updates \(Tweets\) while maintaining real\-time interaction through messaging and notifications\.__
- __Target Users: Social media enthusiasts looking for a consolidated platform for various content formats and direct interpersonal communication\.__

## <a id="_p46dy8y49wr1"></a>__2\. Key Features__

- __Hybrid Content Feed: Users can create "Posts" \(image\-based\) and "Tweets" \(text\-based\)\.__
- __Social Interactions: Fully implemented "Like" and "Comment" systems for both posts and tweets to drive user engagement\.__
- __Networking Subsystem: A follow/unfollow mechanism that allows users to build a personal network and view customized feeds\.__
- __Real\-Time Messaging: A dedicated chat system allowing direct peer\-to\-peer communication between users\.__
- __Notification Engine: Automated triggers that notify users of new likes, comments, or followers\.__
- __Discovery & Search: A live search feature to find other users on the platform dynamically\.__

## <a id="_9j50hd8eb2c3"></a>__3\. Tech Stack__

- __Programming Languages: Java \(Backend\), JavaScript \(Frontend logic\), SQL \(Database queries\)\.__
- __Frameworks/Environment: Java Servlets \(Server\-side logic\), JSP \(JavaServer Pages for templating\)\.__
- __Libraries:__
	- __Core: JDK 17\+__
	- __Database: JDBC \(Java Database Connectivity\)__
	- __Build Tool: Maven \(pom\.xml managed\)__
- __Frontend: HTML5, CSS3, Bootstrap \(UI components\), JavaScript/AJAX \(Asynchronous updates\)\.__
- __Databases: MySQL \(implied by JDBC drivers and SQL syntax in DAOs\)\.__
- __Deployment: Apache Tomcat \(Web Server\)\.__

## <a id="_i0b2txss8g2a"></a>__4\. System Architecture__

- __Backend Architecture: Follows the MVC \(Model\-View\-Controller\) pattern using Servlets as Controllers, Java Classes as Models, and JSPs as Views\.__
- __Frontend Architecture: Server\-side rendered pages using JSP, enhanced with client\-side JavaScript for interactive elements like live search and chat updates\.__
- __Data Flow:__
	1. __User interacts with JSP interface\.__
	2. __Request is sent to a specific Java Servlet \(e\.g\., LikeServlet\)\.__
	3. __Servlet invokes the corresponding Data Access Object \(DAO\) \(e\.g\., LikeDao\)\.__
	4. __DAO executes SQL via JDBC against the MySQL database\.__
	5. __Servlet updates the session/request and redirects or returns JSON for AJAX requests\.__
- __External Services: Standard Java Mail or internal notification triggers \(no third\-party cloud APIs detected in code\)\.__

## <a id="_ikfg8ruqmwc3"></a>__5\. Important Components__

### <a id="_hq61wdphux2f"></a>__Key Folders__

- __src/main/java/cn/tech/Dao: Contains the data access layer \(SQL logic\)\.__
- __src/main/java/cn/tech/model: POJOs \(Plain Old Java Objects\) representing data entities\.__
- __src/main/java/cn/tech/servlet: Controller layer handling HTTP requests\.__
- __src/main/webapp: Contains JSP files and static assets \(CSS, images\)\.__

### <a id="_by238vfj0eo9"></a>__Key Classes__

- __DBCon\.java: Centralized connection pool management using JDBC\.__
- __UserDao\.java: Handles authentication, registration, and user profile management\.__
- __PostDao\.java & TweetDao\.java: Core logic for CRUD operations on content\.__
- __MessageServlet\.java: Manages the retrieval and sending of direct messages\.__

## <a id="_hivds0xl99v3"></a>__6\. Algorithms / ML Models__

- __*Not present*: This project focuses on traditional CRUD operations and relational data management\. No ML models were found in the source code\.__

## <a id="_msg30hexv7mf"></a>__7\. APIs / Endpoints \(Internal Servlets\)__

- __POST /registration: Inputs: Name, Email, Password\. Purpose: New user creation\.__
- __POST /login: Inputs: Email, Password\. Purpose: Session creation\.__
- __GET /GetMessages: Inputs: UserID\. Output: List of message objects\. Purpose: Chat history retrieval\.__
- __POST /LikeServlet: Inputs: PostID\. Purpose: Increment/decrement like count\.__
- __GET /LiveSearch: Inputs: Query string\. Output: Filtered user list\.__

## <a id="_s5df5us28sk1"></a>__8\. Database Design__

- __Users Table: id, name, email, password, profile\_image\.__
- __Posts/Tweets Tables: Content, timestamp, and user\_id \(Foreign Key to Users\)\.__
- __Follows Table: follower\_id, following\_id \(Self\-referencing relationship\)\.__
- __Messages Table: sender\_id, receiver\_id, message\_text, status \(unread/read\)\.__
- __Notifications Table: user\_id, type, message, is\_read\.__

## <a id="_tl3uj32ew54v"></a>__9\. Challenges Solved__

- __State Management: Implementing a follow\-based feed where the SQL queries must dynamically join the Posts and Follows tables to show only relevant content\.__
- __Asynchronous Interactions: Using AJAX within JSP/Servlets to allow users to "Like" content or "Search" without a full page refresh, improving UX\.__
- __File Uploads: Managing server\-side storage for profile and post images \(implemented via CreatePostServlet\)\.__

## <a id="_i4m5ssy7g762"></a>__10\. Performance / Impact__

- __Efficiency: Minimized database overhead by using prepared statements in DAOs to prevent SQL injection and optimize query execution\.__
- __Scalability: Organized code into a clear DAO/Servlet structure allowing for independent scaling of logic and data layers\.__

## <a id="_mj2w3cs7tuzr"></a>__11\. Resume Bullet Points__

- __Architected and developed a hybrid social media platform using Java Servlets and JSP, supporting both image\-based and text\-based content sharing\.__
- __Implemented a robust Data Access Layer \(DAO\) with JDBC and MySQL, managing complex relational data including self\-referencing user\-follow relationships and real\-time messaging\.__
- __Enhanced user experience by integrating AJAX\-driven features for live search and instant social interactions \(likes/comments\), reducing page load requirements\.__
- __Designed a comprehensive notification system and direct messaging engine to facilitate real\-time user engagement and communication\.__

## <a id="_9xn6wp1h50np"></a>__12\. Interview Explanation__

### <a id="_db0330fgqb9s"></a>__1\-Minute Answer__

__"I built InstaTwist, a hybrid social media platform that integrates features from Instagram and Twitter\. Using a Java\-based MVC architecture with Servlets and JSP, I developed a system where users can post images, share tweets, follow others, and message in real\-time\. I focused heavily on the database design to handle various social interactions like likes, comments, and notifications, ensuring data integrity through a dedicated DAO layer and JDBC\."__

### <a id="_hjul4wmcvs5k"></a>__3\-Minute Answer__

__"For my project, I wanted to explore the complexities of a multi\-content social media ecosystem, so I developed InstaTwist\. ItΓÇÖs built on the Java EE stack using Servlets for request handling and JSP for the view layer\.__

__Technically, the project is structured into three distinct layers\. First, the Model layer handles the data entities like Users, Posts, and Messages\. Second, the DAO layer manages the MySQL persistenceΓÇöI used prepared statements throughout to ensure security and performance\. Third, the Servlet layer acts as the controller\.__

__One of the more interesting features I implemented was the follow\-based discovery system\. This required writing complex SQL joins to filter the global feed based on a user's network\. I also integrated AJAX for features like 'Live Search' and 'Likes' so the user doesn't experience jarring page reloads\. For the messaging part, I designed a schema that tracks message status to support unread counts and conversation threading\. This project gave me deep experience in managing relational state and building a scalable MVC application from scratch\."__

## <a id="_foda3kjbjaw4"></a>__13\. Possible Improvements__

- __Security: Implement BCrypt password hashing \(current implementation uses plain text or basic storage\)\.__
- __Scalability: Transition from local file storage for images to a cloud\-based solution like AWS S3\.__
- __Real\-time: Upgrade the chat system from polling\-based AJAX to WebSockets for true real\-time bidirectional communication\.__
- __Testing: Integrate JUnit tests for the DAO layer to ensure data logic remains valid during updates\.__

