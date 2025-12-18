# Component Documentation

## Available Components

### Layout
Основная обертка для страниц с навигацией и контейнером.

**Usage:**
```tsx
import Layout from '@/components/Layout';

function MyPage() {
  return (
    <Layout>
      <h1>Page Content</h1>
    </Layout>
  );
}
```

**Features:**
- Включает навигацию автоматически
- Responsive container (max-width: lg)
- Padding для контента

---

### Navigation
Навигационное меню в AppBar.

**Usage:**
```tsx
import Navigation from '@/components/Navigation';

function MyPage() {
  return (
    <>
      <Navigation />
      {/* content */}
    </>
  );
}
```

**Features:**
- Type-safe routing с TanStack Router
- Автоматическая подсветка активной страницы
- Responsive design

---

### FeatureCard
Карточка для отображения возможностей/фич.

**Usage:**
```tsx
import FeatureCard from '@/components/FeatureCard';

<FeatureCard
  icon="⚡"
  title="Fast Performance"
  description="Lightning fast with Vite"
/>
```

**Props:**
- `icon: string` - Emoji или иконка
- `title: string` - Заголовок
- `description: string` - Описание

**Features:**
- Hover эффект
- Responsive layout
- Полная высота в grid

---

### UserCard
Карточка пользователя с аватаром.

**Usage:**
```tsx
import UserCard from '@/components/UserCard';

const user = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://...'
};

<UserCard user={user} />
```

**Props:**
- `user: User` - Объект пользователя

**Features:**
- Аватар с автоматическими инициалами
- Hover эффект
- Responsive layout

---

## Styling Approach

### MUI + Tailwind
Проект использует комбинацию MUI компонентов и Tailwind утилит:

```tsx
import { Box, Typography } from '@mui/material';

// MUI components with Tailwind classes
<Box className="flex items-center gap-4">
  <Typography variant="h1" className="mb-4">
    Title
  </Typography>
</Box>
```

### MUI sx prop
Для кастомных стилей используйте sx:

```tsx
<Box
  sx={{
    backgroundColor: 'primary.main',
    '&:hover': {
      backgroundColor: 'primary.dark',
    }
  }}
/>
```

### Tailwind utilities
Для quick styling:

```tsx
<div className="flex flex-col gap-4 p-6 rounded-lg shadow-md">
  {/* content */}
</div>
```

---

## Responsive Design

### Tailwind Breakpoints
```tsx
<Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid */}
</Box>
```

### MUI Breakpoints
```tsx
<Box
  sx={{
    display: { xs: 'block', md: 'flex' }
  }}
/>
```

---

## Accessibility Checklist

- [ ] Semantic HTML elements
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Alt text for images
- [ ] ARIA labels where needed
- [ ] Keyboard navigation support
- [ ] Focus visible states
- [ ] Color contrast (WCAG AA minimum)

---

## Performance Tips

1. **Use React.memo for expensive components**
```tsx
export default React.memo(MyComponent);
```

2. **Lazy load routes**
```tsx
const AboutPage = lazy(() => import('@/pages/AboutPage'));
```

3. **Optimize images**
- Use modern formats (WebP)
- Proper sizing
- Lazy loading

4. **Code splitting**
- TanStack Router handles this automatically

---

## Type Safety

All components are fully typed with TypeScript:

```tsx
interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  // ...
}
```

Use defined types from `@/types`:
```tsx
import type { User } from '@/types';
```
