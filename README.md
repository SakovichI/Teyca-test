# Teyca

## Технологии

- **Angular 20** - основной фреймворк
- **Taiga UI** - UI-библиотека компонентов
- **OAuth2/OIDC** - аутентификация
- **TypeScript** - язык разработки
- **SCSS** - стилизация
- **RxJS** - реактивное программирование

## Команды

```bash
npm install              # Установка зависимостей
npm start                # Запуск dev-сервера (localhost:4200)
npm run build            # Сборка для production
npm run build:gh-pages   # Сборка для GitHub Pages
npm run watch            # Сборка в режиме отслеживания
npm test                 # Запуск тестов
```

## Структура проекта

```
src/
├── app/
│   ├── api/                    # API сервисы
│   │   ├── client/            # Работа с клиентами
│   │   └── push-message/      # Push-уведомления
│   ├── components/
│   │   ├── login/             # Авторизация
│   │   └── clients/           # Управление клиентами
│   │       ├── components/
│   │       │   ├── clients-table/              # Таблица клиентов
│   │       │   ├── clients-filter/             # Фильтры
│   │       │   ├── clients-table-bar/          # Панель действий
│   │       │   ├── clients-upsert-dialog/      # Создание/редактирование
│   │       │   └── clients-push-upsert-dialog/ # Push-уведомления
│   │       └── services/       # Бизнес-логика клиентов
│   ├── app.routes.ts          # Роутинг приложения
│   └── app.config.ts          # Конфигурация приложения
├── auth/                       # Модуль аутентификации
│   ├── guards/                # Guards для защиты роутов
│   ├── services/              # Сервисы авторизации
│   ├── interceptors/          # HTTP interceptors
│   └── models/                # Модели токенов
├── core/                       # Общие модули
│   ├── classes/               # Базовые классы
│   │   ├── table/                    # Базовый класс таблиц
│   │   ├── selectable-table/         # Таблица с выбором строк
│   │   ├── list-data-source/         # Источник данных для списков
│   │   ├── custom-control/           # Базовый класс для форм
│   │   └── close-confirmation-dialog-handler/ # Подтверждение закрытия
│   ├── services/              # Базовые сервисы
│   │   ├── base-from/                # Работа с формами
│   │   ├── notifications/            # Уведомления
│   │   ├── selection/                # Выбор элементов
│   │   ├── table-bar/                # Панель действий таблиц
│   │   └── environment/              # Настройки окружения
│   ├── helpers/               # Вспомогательные функции
│   │   ├── map-instance-to-plain/    # Преобразование объектов
│   │   ├── transform-keys/           # Трансформация ключей
│   │   ├── to-result/                # Извлечение результатов
│   │   ├── combine-latest-into-object/ # RxJS утилиты
│   │   └── is-internal-api-url/      # Проверка API URL
│   ├── decorators/            # Декораторы
│   │   ├── map-to/                   # Маппинг одиночных объектов
│   │   ├── map-list-to/              # Маппинг списков
│   │   └── transform-date/           # Преобразование дат
│   ├── directives/            # Директивы
│   │   ├── bind-query-params/        # Синхронизация с URL параметрами
│   │   └── native-date-transformer/  # Трансформация дат в формах
│   ├── components/            # Переиспользуемые компоненты
│   │   └── routable-dialog/          # Диалоги через роутинг
│   ├── interceptors/          # HTTP перехватчики
│   │   └── transform-properties/     # Трансформация свойств
│   ├── providers/             # Провайдеры
│   │   ├── validation-errors/        # Ошибки валидации
│   │   └── initializer/              # Инициализация приложения
│   ├── models/                # Общие модели
│   ├── types/                 # TypeScript типы
│   └── constants/             # Константы
├── environments/              # Конфигурация окружений
└── theme/                     # Темы оформления
```

## Основные модули

### Аутентификация

- Вход по логину/паролю
- JWT токены
- Защита роутов через guards

### Управление клиентами

- Просмотр списка клиентов
- Создание/редактирование клиентов
- Фильтрация и поиск
- Массовые операции
- Отправка push-уведомлений

### API

- `ClientApiService` - CRUD операции с клиентами
- `PushMessageApiService` - Отправка уведомлений
- `AuthService` - Аутентификация
