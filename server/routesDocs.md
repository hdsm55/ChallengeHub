# 📘 ChallengeHub API Routes Documentation

| الفئة         | النوع  | المسار          | يتطلب توكن؟   | البيانات المطلوبة                                                                                            |
| ------------- | ------ | --------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
| ✅ Auth       | POST   | /auth/login     | ❌ لا         | `{ "email": "example@example.com", "password": "123456" }`                                                   |
| 👤 Users      | POST   | /users          | ❌ لا         | `{ "username": "yourname", "email": "your@email.com", "password": "123456" }`                                |
| 🧠 Challenges | GET    | /challenges     | ❌ لا         | — (لا يحتاج بيانات)                                                                                          |
| 🧠 Challenges | POST   | /challenges     | ✅ نعم        | `{ "title": "عنوان", "description": "تفاصيل التحدي", "start_date": "2025-04-22", "end_date": "2025-05-22" }` |
| 🧠 Challenges | GET    | /challenges/:id | ❌ لا         | — (لا يحتاج بيانات)                                                                                          |
| 🧠 Challenges | PUT    | /challenges/:id | ✅ نعم + مالك | `{ "title": "تعديل العنوان", "description": "تعديل الوصف", "start_date": "...", "end_date": "..." }`         |
| 🧠 Challenges | DELETE | /challenges/:id | ✅ نعم + مالك | — (فقط التوكن في Header)                                                                                     |

## 🔐 ملاحظات مهمة:

- أضف دائمًا Header بهذا الشكل عندما يتطلب الراوت توكن:

```
Authorization: Bearer <JWT>
```

- تأكد أن التواريخ بصيغة صحيحة: `YYYY-MM-DD`
