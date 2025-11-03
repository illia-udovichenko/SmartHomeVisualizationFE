# Smart Home Visualization Frontend

A web application for managing and visualizing data from a smart home system.
The frontend provides interactive tools for displaying rooms, zones, and sensors, and allows users to manage projects and configurations through an intuitive graphical interface.

---

## Overview

This application serves as the **frontend interface** for a smart home monitoring platform.
It allows users to:

* Create and manage smart home projects
* Visualize rooms, floors, and sensor layouts
* Interact with zones and devices via an editable floor plan
* Log in and manage user accounts

The interface is built to communicate with a backend API that aggregates data from home automation devices (e.g., sensors, doors, motion detectors).

---

## Tech Stack

* **Framework:** Vue 3
* **Routing:** Vue Router
* **State Management:** Pinia
* **Build Tooling:** Vite / Vue CLI
* **Styling:** SCSS / CSS Modules
* **Containerization:** Docker & Docker Compose
* **CI/CD:** GitLab CI
* **Language:** JavaScript (ES2020+)

---

## Setup & Run

### Prerequisites

* Node.js ≥ 18
* npm or yarn
* Docker & Docker Compose

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run serve
```

The app will be available at [http://localhost:8080](http://localhost:8080).

### Build for production

```bash
npm run build
```

### Run with Docker

```bash
docker-compose up --build
```