# 🔗 URL Shortener – ElysianNxt Bonus Challenge

A simple **URL Shortener Web Application** built with **React** using the **Ogli API**.  
This project was created as part of the *Front-end Developer Bonus Points Challenge* ✨

---

## 📘 API Reference — Ogli Shortener API

**Endpoint:**  


---

### 🧾 Request

**Headers:**
```http
Authorization: Bearer <YOUR_API_KEY>
Content-Type: application/json

{
  "targetUrl": "https://example.com/page",
  "useOriginalMeta": true
}
```

### 🧾 Response
```http
{
  "url": "https://ogli.sh/8Uff9Cda",
  "qrCodeUrl": "https://ogli.sh/qr/8Uff9Cda",
  "id": "7d97ea87-f52e-48e8-b397-667d39e4adf8",
  "slug": "8Uff9Cda",
  "alias": null,
  "existing": true
}
```
