
**SevaSaathi**

## 📌 Description

**SevaSaathi** is a citizen-centric digital companion designed to help Indian citizens—especially senior citizens—access government services with confidence.

India has hundreds of government schemes, certificates, and online forms, but many people struggle to understand:

* Which schemes they are eligible for
* How to fill government forms
* Which websites and links are safe

This confusion leads to missed benefits, dependency on agents, and increasing scams targeting elders.

SevaSaathi solves this by providing:

* Step-by-step form guidance
* Verified government PDFs and links
* Voice-based explanations
* AI Notice explainer
* Kannada and Easy Kannada language support
* SMS scam alerts for extra safety

SevaSaathi does not replace government portals — it acts as a **trusted guide** that helps citizens navigate them safely and independently.


# 🎥 Demo Video

**Demo Video Link:**  
https://drive.google.com/file/d/1IounZF_lt2bvlKAp8jf0EDc8fWCFJqj-/view?usp=sharing

---


## ✨ Features

* 🧾 **Form Filling Guidance**
  Step-by-step instructions for filling government forms like Pension, Aadhaar Update, Income Certificate, etc.

* 📄 **Official Form Preview & Download**
  Users can view and download only verified government PDFs.

* 🧭 **Scheme Explorer**
  Helps users understand which government schemes they qualify for.

* 🔊 **Read-Aloud Support**
  Instructions are read aloud for elderly and low-literacy users.

* 🌐 **Multi-Language Support**
  English, Kannada, and Easy Kannada.

* 📱 **SMS Scam Alerts**
  Elders receive warnings about fraud and fake government messages.

* 🔐 **Optional Login for SMS Alerts**
  Users can use Google or Email login to receive scam alerts.

---

## 🛠 Tech Stack

* **Frontend:**
  HTML, CSS, JavaScript

* **Backend & Authentication:**
  Firebase Authentication

* **Database:**
  Firebase Firestore

* **Hosting:**
  Google Cloud

* **Other Tools:**
  Google Firebase SDK, Speech Synthesis API

---

 ⚠️ Google products are mandatory for this hackathon.  
 We used the following Google technologies:

 * **Firebase Authentication**  
   Used for Google and Email-Password login so users can securely register for SMS scam alerts.

 * **Firebase Firestore**  
   Used to store user phone numbers, location data, and alert preferences linked to their Firebase User ID.

 * **Firebase Hosting / SDK**  
   Used to securely host the web app and connect it with Google services.

 * **Google Maps API**  
  Used to detect and visualize user location, enabling region-specific scam alerts and localized scheme recommendations.

 * **Google Places API**  
   Used to identify user city and locality, improving personalization and accuracy of alerts and scheme information.

 * **Google Gemini API**  
   Used as the AI engine to explain government schemes in simple language, summarize scam messages, and provide personalized assistance to users.

 These Google technologies were chosen because they are:

 * Secure  
 * Scalable  
 * Easy to integrate  
* Trusted for citizen-facing applications

 ---


## ⚙️ Setup Instructions

To run SevaSaathi locally:

1. **Clone the repository**

```
git clone <your-repo-link>
cd seva-saathi
```

2. **Open the project**
   Open the folder in VS Code or any code editor.

3. **Create Firebase Project**(optional)

* Go to [https://console.firebase.google.com](https://console.firebase.google.com)
* Create a new project
* Enable:

  * Authentication (Google + Email/Password)
  * Firestore Database

4. **Add Firebase Config**(optional)
   Replace the Firebase config inside:

```
login.js  
phone.js  
script.js
```

with your own Firebase project keys.

5. **Run the app**
   Open `index.html` using Live Server or any local web server.

---

## 👥 Team Members

* **Member 1:** Wilson Rodrigues
* **Member 2:** Rashmitha P
* **Member 3:** Vineeth Monis
* **Member 4:** Miranda Stephen Marcel

**Team Name:** PhantomX
**Hackathon:** GDG Winter Hackathon

---

