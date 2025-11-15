Online Store Management – Technical Test

Replay – Mentored Internship Program

This repository contains the full-stack solution for the technical test, developed using React, Spring Boot, and PostgreSQL.
The application allows managing products for an online store, including listing, filtering, creating, editing, deleting, and viewing details.

I.Tech Stack

1.Frontend

React + Vite

React Router

React Query (TanStack Query)

Axios

Custom Hooks

CSS Modules / Component-level styling

Jest + React Testing Library (unit tests)

2.Backend

Java & Spring Boot

Spring Web

Spring Data JPA

PostgreSQL (Supabase)

Bean Validation

Custom error handling (@ControllerAdvice)

3.Database

PostgreSQL

Hosted on Supabase

Auto schema creation via Hibernate

II.How to Run the Project
Backend

Navigate to backend folder:

   cd magazinOnline-backend


Configure database credentials in
src/main/resources/application.properties

Run the Spring Boot app (if maven is installed):

    mvn spring-boot:run

Otherwise start it using Inteliji.

   Backend runs on http://localhost:8080

Frontend

Navigate to frontend folder:

       cd magazin-online-frontend


Install dependencies:

      npm install


Start dev server:

       npm run dev


   Frontend runs on http://localhost:5173

III.Tests

To run unit tests (React Testing Library + Vitest):

      cd magazin-online-frontend
      npm test
