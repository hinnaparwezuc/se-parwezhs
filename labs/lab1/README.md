# EECE/CS 3093C – Software Engineering
<img src="headshot.jpeg" alt="Headshot" width="120" align="right">

## Instructor

Dr. Phu Phung

## Student

**Hinna Parwez**
**Email:** [parwezhs@mail.uc.edu](mailto:parwezhs@mail.uc.edu)

## GitHub Repository

https://github.com/hinnaparwezc/se-parwezhs

## Azure App Service

**URL:** https://YOUR-AZURE-APP.azurewebsites.net

---

# Overview

This lab focused on developing and deploying a real-time messenger application using Node.js, Express, Socket.io, GitHub Actions, and Microsoft Azure App Service. The application was extended by implementing the Send Message and Receive Message use cases, including timestamps and connection status notifications. Finally, secure software development practices were applied by implementing DOMPurify output sanitization and a Content Security Policy (CSP) to defend against Cross-Site Scripting (XSS) attacks.

---

# Task 1 – Git Branch, Node.js Web Application Setup and Testing

## 1a. Local Application Running

![Task 1a](YOUR_TASK1_SCREENSHOT.png)

**Figure 1.** The messenger application running locally in Google Cloud Shell after executing `npm start`.

## 1b. GitHub Commit

Commit URL:

---

# Task 2 – CI/CD Pipeline and Azure Deployment

## 2a. Azure App Service

![Task 2a](YOUR_TASK2A_SCREENSHOT.png)

**Figure 2a.** Azure App Service showing the deployed messenger application.

## 2b. GitHub Actions

![Task 2b](YOUR_TASK2B_SCREENSHOT.png)

**Figure 2b.** Successful GitHub Actions workflow deploying the application.

## 2c. Live Azure Application

![Task 2c](YOUR_TASK2C_SCREENSHOT.png)

**Figure 2c.** Messenger application successfully running on Azure.

---

# Task 3 – Use Case 01: Send Message

## 3a. Client Implementation

![Task 3a](YOUR_TASK3A_SCREENSHOT.png)

**Figure 3a.** Implementation of the `sendMessage()` function in `client.js`.

## 3b. Server Implementation

![Task 3b](YOUR_TASK3B_SCREENSHOT.png)

**Figure 3b.** Server-side implementation of the message broadcast handler.

## 3c. Application Demonstration

![Task 3c](YOUR_TASK3C_SCREENSHOT.png)

**Figure 3c.** Two browser windows demonstrating successful message broadcasting between connected users.

## 3d. GitHub Commit

Commit URL:

---

# Task 4 – Use Case 02: Receive Message

## 4a. Client Implementation

![Task 4a](YOUR_TASK4A_SCREENSHOT.png)

**Figure 4a.** Client-side implementation of chat message and status event handling.

## 4b. Server Implementation

![Task 4b](YOUR_TASK4B_SCREENSHOT.png)

**Figure 4b.** Server implementation of user connection and disconnection notifications.

## 4c. Application Demonstration

![Task 4c](YOUR_TASK4C_SCREENSHOT.png)

**Figure 4c.** Chat messages with timestamps and join/leave notifications displayed in the messenger interface.

## 4d. GitHub Commit

Commit URL:

---

# Task 5 – SSDLC and Defense-in-Depth

## 5a. GitHub Issue Update

![Task 5a](YOUR_TASK5A_SCREENSHOT.png)

**Figure 5a.** GitHub Issue updated with the new security user story and security acceptance criteria before implementing the security fixes.

## 5b. XSS Demonstration Before the Fix

![Task 5b](YOUR_TASK5B_SCREENSHOT.png)

**Figure 5b.** Before implementing the security protetions, the injected XSS payload successfully executed in the victim browser.

## 5c. XSS Demonstration After the Fix

![Task 5c](picture1.png)

**Figure 5c.** After implementing DOMPurify output sanitization, the injected XSS payload no longer executes. The malicious HTML is sanitized and no JavaScript alert appears in either browser tab.

## 5d. Content Security Policy

![Task 5d](picture2.png)

**Figure 5d.** Browser DevTools showing the `Content-Security-Policy` response header returned by the server.

## 5e. GitHub Commit

Commit URL:
