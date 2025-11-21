# Map Tracker – Mock Tracking System

A lightweight demo system that simulates real‑time movement of objects on a map using **React**, **MobX**, **Leaflet**, and a **Node.js + WebSocket mock server**.

The project demonstrates:
- Real‑time WebSocket streaming  
- Smooth object movement with realistic steering behavior  
- Object lifecycle (active → lost → removed)  
- UI components (object list, map legend, auth panel)  
- Cookie‑based authentication  
- Clean and modular architecture  

---

## 🔧 Tech Stack

### **Frontend**
- React + TypeScript + Vite  
- MobX (state management)  
- React‑Leaflet (map rendering)  
- Material UI (UI components)  
- WebSocket client  
- Cookie‑based auth flow  

### **Backend**
- Node.js + Express  
- WebSocket (ws)  
- Cookie‑based authentication  
- Procedural movement simulation  

---

## 🚀 Features

### ✔ Real‑time Tracking  
Objects move smoothly across the map using a steering‑based movement algorithm (wander + boundary avoidance).  
Each update is streamed to the client via WebSocket.

### ✔ Object Lifecycle  
Objects have three states:
- **active** (green) — receiving updates  
- **lost** (grey) — no updates for 3 seconds  
- **removed** — deleted after 10 seconds  

Lost objects fade visually and move to the bottom of the list.

### ✔ Selection Mode  
Clicking an object in the sidebar highlights its marker on the map.

### ✔ Authentication  
The app requires entering an access code.  
Backend validates it and sets an **HttpOnly authToken cookie**.  
WebSocket rejects unauthorized connections.

### ✔ UI Panels  
- **Object list panel**  
- **Map legend**  
- **Authorization panel**  
All styled with Material UI and positioned on top of the map.

---

## 🔑 Authentication Flow

1. User enters a 6‑digit access code in the Auth Panel.  
2. Frontend sends it to `/auth/login`.  
3. Backend verifies the code and sends back an **HttpOnly cookie**.  
4. WebSocket connects automatically and includes that cookie.  
5. If cookie is missing/invalid → server closes WS with code `4001 Unauthorized`.

Logout clears the cookie and resets the app state.

---

## 🗺 Movement Algorithm

Object motion uses a steering behavior approach:

- **Wander** — small random direction changes  
- **Avoidance** — push away from boundaries  
- **Velocity‑based bearing** — ensures correct azimuth  
- Constant speed  

These rules avoid jitter, teleportation, and unnatural angles.

---

## 📂 Project Structure

```
map-tracker/
  src/
    components/
      MapView.tsx
      ObjectList.tsx
      MapLegend.tsx
      AuthPanel.tsx
    stores/
      objectsStore.ts
      authStore.ts
    ws/
      WebSocketManager.ts
  server/
    server.js
    movement.js
```

---

## ▶ Running the Project

### 1. Backend
```bash
cd tracker-mock-server
npm install
npm start
```

### 2. Frontend
```bash
cd map-tracker
npm install
npm run dev
```

---

## 🧪 Testing the System

Try:
- entering correct/incorrect codes  
- watching objects fade out when lost  
- selecting objects  
- restarting backend (WS auto‑reconnect)  

---

## 📌 Notes

- Cookies are `HttpOnly` and work cross‑origin.  
- WebSocket is closed server‑side if no valid cookie is provided.  
- The system is purely for demonstration — not for production tracking.

---

## 📜 License

MIT