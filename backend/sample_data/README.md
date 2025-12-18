# Sample Data for University Catalog

Этот набор данных содержит тестовые университеты и специальности для импорта в MongoDB.

## Содержимое

- **specialties.json** - 10 специальностей (Computer Science, Engineering, Business, etc.)
- **universities.json** - 15 университетов из разных стран мира

## Импорт через Mongo Express

### Способ 1: Через Web UI

1. Откройте Mongo Express в браузере (обычно http://localhost:8081)
2. Выберите базу данных `university_catalog` (или создайте новую)
3. Для импорта специальностей:
   - Нажмите "New Collection"
   - Имя коллекции: `specialties`
   - Откройте коллекцию
   - Нажмите "Import"
   - Выберите файл `specialties.json`
   - Нажмите "Import"

4. Для импорта университетов:
   - Нажмите "New Collection"
   - Имя коллекции: `universities`
   - Откройте коллекцию
   - Нажмите "Import"
   - Выберите файл `universities.json`
   - Нажмите "Import"

### Способ 2: Через MongoDB Compass

1. Откройте MongoDB Compass
2. Подключитесь к `mongodb://localhost:27017`
3. Создайте базу данных `university_catalog`
4. Для каждой коллекции:
   - Создайте коллекцию (specialties / universities)
   - Нажмите "Add Data" → "Import JSON or CSV file"
   - Выберите соответствующий JSON файл
   - Нажмите "Import"

### Способ 3: Через mongoimport (CLI)

```bash
# Импорт специальностей
mongoimport --db university_catalog --collection specialties --file specialties.json --jsonArray

# Импорт университетов
mongoimport --db university_catalog --collection universities --file universities.json --jsonArray
```

### Способ 4: Через Python скрипт

```python
import json
from pymongo import MongoClient

# Подключение к MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['university_catalog']

# Импорт специальностей
with open('specialties.json', 'r', encoding='utf-8') as f:
    specialties = json.load(f)
    db.specialties.insert_many(specialties)
    print(f"Импортировано {len(specialties)} специальностей")

# Импорт университетов
with open('universities.json', 'r', encoding='utf-8') as f:
    universities = json.load(f)
    db.universities.insert_many(universities)
    print(f"Импортировано {len(universities)} университетов")

print("Импорт завершен!")
```

## Структура данных

### Specialty

```json
{
  "name": "Computer Science",
  "description": "Study of computation...",
  "category": "Engineering"
}
```

### University

```json
{
  "name": "MIT",
  "country": "USA",
  "city": "Cambridge",
  "description": "...",
  "website": "https://...",
  "ranking": 1,
  "specialties": [],
  "specialty_names": ["Computer Science", "..."],
  "requirements": [
    {
      "specialty_id": "cs_001",
      "specialty_name": "Computer Science",
      "minimum_score": 1500,
      "exams": ["SAT", "..."],
      "additional_requirements": "..."
    }
  ],
  "tuition_fee_usd": 53790,
  "student_count": 11520,
  "acceptance_rate": 3.2
}
```

## Университеты в датасете

1. **MIT** (USA) - Rank 1
2. **Stanford** (USA) - Rank 2
3. **Harvard** (USA) - Rank 3
4. **Oxford** (UK) - Rank 4
5. **ETH Zurich** (Switzerland) - Rank 7
6. **NUS** (Singapore) - Rank 11
7. **University of Toronto** (Canada) - Rank 18
8. **TU Munich** (Germany) - Rank 37
9. **University of Melbourne** (Australia) - Rank 33
10. **Seoul National University** (South Korea) - Rank 29
11. **University of Tokyo** (Japan) - Rank 23
12. **Moscow State University** (Russia) - Rank 74
13. **Tsinghua University** (China) - Rank 14
14. **IIT Bombay** (India) - Rank 149
15. **University of São Paulo** (Brazil) - Rank 85

## Проверка импорта

После импорта проверьте через FastAPI:

```bash
# Получить все специальности
curl http://localhost:8000/api/specialties

# Получить все университеты
curl http://localhost:8000/api/universities

# Фильтр по стране
curl "http://localhost:8000/api/universities?country=USA"

# Фильтр по специальности
curl "http://localhost:8000/api/universities?specialty=Computer%20Science"
```

## Запуск MongoDB для теста

Если у вас еще нет MongoDB:

### Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
docker run -d -p 8081:8081 --link mongodb:mongo -e ME_CONFIG_MONGODB_URL="mongodb://mongo:27017/" mongo-express
```

### Windows
1. Скачайте MongoDB Community: https://www.mongodb.com/try/download/community
2. Установите как службу Windows
3. MongoDB будет доступен на localhost:27017

## Тестирование AI Agent

После импорта данных можете протестировать AI рекомендации:

```bash
curl -X POST http://localhost:8000/api/ai/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "test_user",
    "query": "I want to study Computer Science in USA",
    "user_score": 1450,
    "preferred_country": "USA",
    "preferred_specialty": "Computer Science"
  }'
```

**Примечание**: Для AI функций требуется настроить `ANTHROPIC_API_KEY` в `.env` файле.
