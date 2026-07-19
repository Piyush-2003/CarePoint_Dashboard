# CarePoint365 — Care Home Management Dashboard

A comprehensive care home management dashboard built with 
React, designed to mirror the core modules of CarePoint365 
care management software.

## 🔗 Live Demo
[View Care Home Dashboard](https://care-point-dashboard-dnrn.vercel.app/)

## Pages
- **Overview** — KPIs, occupancy trend, compliance summary 
  and staff on duty today
- **Residents** — full resident list with care levels, 
  key workers and status
- **Incidents** — today's incidents with severity levels 
  and resolve functionality
- **Compliance** — DBS, care plans, risk assessments and 
  training completion tracker

## Features
- **Live incident resolution** — click Mark Resolved to 
  update incident status in real time
- **Occupancy trend** — 6-month line chart with capacity line
- **Compliance progress bars** — green = complete, 
  amber = incomplete
- **Staff cards** — colour coded by shift status
- **Resident table** — care level badges, key worker 
  assignment and alert notes
- **Open incident counter** — header alert badge updates 
  as incidents are resolved

## React Concepts Used
- **useState** — tab navigation and incident resolution state
- **Derived data** — KPI counts calculated from data arrays
- **Conditional rendering** — 4 pages shown/hidden by tab
- **Immutable state updates** — resolved incidents tracked 
  in a separate array without mutating original data
- **Component composition** — KPICard, StatusDot reused 
  across multiple pages

## Built For
This project was built as a demonstration for CarePoint365
(carepoint365.co.uk) — a UK care management and workforce
automation platform built on Microsoft 365.

## Tech Stack
React · Recharts · Lucide React · JavaScript · CSS-in-JS

## Full CarePoint365 Demo Portfolio
| Project | Link |
|---|---|
| Time & Attendance | [view](https://care-point-attendance.vercel.app/) |
| Recruitment Pipeline | [view](https://your-recruitment-link.vercel.app/) |
| Care Home Dashboard | [view](https://care-point-dashboard-dnrn.vercel.app/) |

GitHub: [github.com/Piyush-2003](https://github.com/Piyush-2003)
