# EECE/CS 3093C – Software Engineering

## Instructor

Dr. Phu Phung

## Student

**Hinna Parwez**
**Email:** [parwezhs@mail.uc.edu](mailto:parwezhs@mail.uc.edu)

## GitHub Repository

https://github.com/hinnaparwezc/se-parwezhs

## Azure App Service

*(Paste your Azure URL here.)*

---

# Overview

In this lab, I implemented and deployed a real-time messenger application using Node.js, Express, and Socket.io. The project was deployed to Microsoft Azure through GitHub Actions. I completed the implementation of the Send Message and Receive Message use cases, added connection status notifications, and applied secure software development practices by implementing DOMPurify output sanitization and a Content Security Policy (CSP) to defend against Cross-Site Scripting (XSS) attacks.

---

# Task 1 – Git Branch, Node.js Web Application Setup and Testing

## 1a. Local Application

*Insert screenshot.*

**Caption:** The messenger application successfully running locally in Google Cloud Shell using `npm start`.

## 1b. GitHub Commit

Commit URL:

---

# Task 2 – CI/CD Pipeline and Azure Deployment

## 2a. Azure App Service

*Insert screenshot.*

**Caption:** Azure App Service showing the running messenger application.

## 2b. GitHub Actions

*Insert screenshot.*

**Caption:** Successful GitHub Actions workflow deploying the application.

## 2c. Live Azure Application

*Insert screenshot.*

**Caption:** Messenger application successfully running on Azure App Service.

---

# Task 3 – Use Case 01: Send Message

## 3a. Client Implementation

*Insert screenshot.*

**Caption:** `client.js` implementation of the `sendMessage()` function with acceptance criteria comments.

## 3b. Server Implementation

*Insert screenshot.*

**Caption:** `server.js` implementation of the message broadcast handler.

## 3c. Application Demonstration

*Insert screenshot.*

**Caption:** Two browser windows demonstrating successful message broadcasting.

## 3d. Commit URL

Commit:

---

# Task 4 – Use Case 02: Receive Message

## 4a. Client Implementation

*Insert screenshot.*

**Caption:** Client-side implementation of receiving chat messages and status notifications.

## 4b. Server Implementation

*Insert screenshot.*

**Caption:** Server implementation of connection and disconnection status events.

## 4c. Application Demonstration

*Insert screenshot.*

**Caption:** Chat messages displaying timestamps together with join and leave notifications.

## 4d. Commit URL

Commit:

---

# Task 5 – SSDLC and Defense-in-Depth

## 5a. Updated GitHub Issue

*Insert screenshot.*

**Caption:** GitHub Issue updated with the new security user story and security acceptance criteria before implementation.

## 5b. XSS Demonstration Before the Fix

*Insert screenshot.*

**Caption:** The attacker successfully executed an XSS payload in the victim browser before security protections were implemented.

## 5c. XSS Demonstration After the Fix

*Insert screenshot.*

**Caption:** After implementing DOMPurify output sanitization, the injected XSS payload no longer executes. The malicious HTML is sanitized and no JavaScript alert appears in either browser tab.

## 5d. Content Security Policy

*Insert screenshot.*

**Caption:** Browser Network tab showing the Content-Security-Policy response header returned by the server.

## 5e. Commit URL

Commit:
