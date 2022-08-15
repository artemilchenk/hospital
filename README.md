1. Запустіть проект командою <npm run start:dev>
2. Створіть базу даних(users/doctors) командою <npm run mongo:up>
3. Відкрийте Postman/Insomnia та введіть Get запит з ендпоінтом <http://localhost:3000/doctor/all> щоб отримати всіх
   лікарів
4. Скопіюйте id вибраного вами лікаря
5. Скопіюйте потрібну вам дату з переліку запропонованих в об`єкті лікаря
6. Введіть Get запит з ендпоінтом <http://localhost:3000/user/all> щоб отримати всіх пацієнтів
7. Скопіюйте id вибраного вами пацієнта
8. Щоб створити картку введіть Post запит з ендпоінтом <http://localhost:3000/card/create> та тіло запиту(body) в json
   форматі: {
   "user_id": "62f7f7d9f4ca550fae25c2cf",
   "doctor_id": "62f7f7d9f4ca550fae25c2c8",
   "slot": "2022-08-17T12:00:00+03:00"
   }
9. Логи сповіщення будуть записуватись в файл('./hospital.txt') в корневому папці проекту
10. Щоб отримати список карток введіть Get запит з ендпоінтом <http://localhost:3000/card/all>
11. Щоб видалити картку введіть Delete запит з ендпоінтом <http://localhost:3000/card/id>
    наприклад: <http://localhost:3000/card/62f8f0f1c31d7e188f08b6d6>
12. Після закінчення роботи видалиіть базу даних командою <npm run mongo:down>