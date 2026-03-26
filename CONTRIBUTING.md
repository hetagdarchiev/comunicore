# 🛠 Регламент разработки

Для поддержания чистоты кода и стабильности проекта в нашей команде действуют следующие правила:

## 🚀 Правила работы с ветками

*   **Перед тем как приступать работать над проектом всегда делайте `git pull`
*   **Запрещено пушить в `main` напрямую.** Все изменения попадают в основную ветку только через проверку.
*   **Создание ветки:** Для каждой задачи создается отдельная ветка.
    ```bash
    git checkout -b тип/название-задачи
    ```
*   **Завершение работы:**
    1. Отправьте ветку в репозиторий: `git push origin тип/название-задачи`.
    2. Создайте **Pull Request (PR)** на сайте GitHub.
    3. Дождитесь проверки (Code Review) от другого участника и нажмите **Rebase and merge**, если
        Pull request состоит из одного коммита или **Merge**, если в нем серия коммитов. Таким образом
        история коммитов будет линейной, а фичи, состоящие из серии коммитов, будут идти блоком.

---

## 📝 Методология именования (Conventional Commits)

Название ветки и коммита должно начинаться с префикса, который объясняет суть изменений без открытия кода.

### Основные типы:

| Тип | Описание |
| :--- | :--- |
| `feat/` | Новая функциональность (Feature) |
| `fix/` | Исправление багов или ошибок |
| `refactor/` | Переписывание кода без изменения логики |
| `chore/` | Переписывание кода с изменением логики |

---

## 💡 Примеры
### ✨ Features
* `feat/page-form`
* `feat/cart-calculation`
* `feat/profile-avatar-upload`
* `feat/notifications-socket`

### 🐛 Bug Fixes
* `fix/header-overflow`
* `fix/payment-validation`
* `fix/mobile-scroll`
* `fix/crash-on-empty-list`

### ⚙️ Refactoring
* `refactor/api-client`
* `refactor/useAuth-composable`
* `refactor/store-structure`

### 🛠 Chore
* `chore/eslint-config`
* `chore/update-deps`
* `chore/docker-config`
* `chore/ci-cache`

---
*Пример создания ветки:* `git checkout -b feat/cart-service`
