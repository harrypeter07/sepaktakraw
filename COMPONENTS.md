# MSKT Component System & Design Guide

## 🎨 Color Palette

The website uses a carefully selected 5-color palette for consistent branding:

- **Dark Gray** `#2C2A2B` - Primary text, headers, borders
- **Bright Red** `#F83008` - Primary actions, highlights, CTAs
- **Medium Gray** `#929292` - Secondary text, captions, borders
- **Off-White** `#F5F5F5` - Background, hover states, subtle elements
- **Orange** `#F0641B` - Secondary actions, accents, highlights

## 🧩 Reusable Components

### Button Component
```tsx
import { Button } from "@/components/ui";

// Primary button (bright red)
<Button variant="primary" size="lg" href="/results">
  View Results
</Button>

// Secondary button (outline with bright red)
<Button variant="secondary" size="lg" href="/districts">
  Explore Districts
</Button>

// Accent button (orange)
<Button variant="accent" size="lg" href="/events">
  Upcoming Events
</Button>

// Outline button (dark gray)
<Button variant="outline" size="sm" href="/contact">
  Contact Us
</Button>
```

**Variants**: `primary`, `secondary`, `outline`, `accent`
**Sizes**: `sm`, `md`, `lg`
**Props**: `href`, `onClick`, `disabled`, `className`, `type`

### Card Component
```tsx
import { Card } from "@/components/ui";

// Default card
<Card>
  <h2>Card Title</h2>
  <p>Card content...</p>
</Card>

// Hover effect card
<Card variant="hover">
  <h2>Hover Card</h2>
  <p>This card has hover effects...</p>
</Card>

// Elevated card
<Card variant="elevated">
  <h2>Elevated Card</h2>
  <p>This card has more shadow...</p>
</Card>
```

**Variants**: `default`, `hover`, `elevated`
**Padding**: `sm`, `md`, `lg`

### Badge Component
```tsx
import { Badge } from "@/components/ui";

// Primary badge (bright red)
<Badge variant="primary" size="sm">
  NEWS
</Badge>

// Secondary badge (orange)
<Badge variant="secondary" size="md">
  TOURNAMENT
</Badge>

// Neutral badge (medium gray)
<Badge variant="neutral" size="lg">
  NOTICE
</Badge>
```

**Variants**: `primary`, `secondary`, `neutral`
**Sizes**: `sm`, `md`, `lg`

### Grid Component
```tsx
import { Grid } from "@/components/ui";

// 3-column responsive grid
<Grid cols={3} gap="lg">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</Grid>

// 12-column sidebar layout
<Grid cols={12} gap="lg">
  <div className="lg:col-span-3">Sidebar</div>
  <div className="lg:col-span-6">Main Content</div>
  <div className="lg:col-span-3">Sidebar</div>
</Grid>
```

**Columns**: `1`, `2`, `3`, `4`, `6`, `12`
**Gaps**: `sm`, `md`, `lg`, `xl`

### Form Components
```tsx
import { FormInput, FormSelect, FormTextarea } from "@/components/ui";

// Input field
<FormInput
  label="Email Address"
  type="email"
  required
  placeholder="Enter your email"
  error="Please enter a valid email"
/>

// Select dropdown
<FormSelect
  label="Subject"
  required
  options={[
    { value: "general", label: "General Inquiry" },
    { value: "tournament", label: "Tournament Information" }
  ]}
/>

// Textarea
<FormTextarea
  label="Message"
  required
  rows={5}
  placeholder="Enter your message..."
/>
```

## 🎯 Utility Classes

### Layout Utilities
- `.container-main` - Max width 7xl with padding
- `.container-content` - Max width 6xl with padding
- `.sidebar` - White background with shadow and padding
- `.sidebar-sticky` - Sticky sidebar with top positioning

### Text Utilities
- `.text-hero` - Large hero text (4xl-6xl)
- `.text-subtitle` - Subtitle text (xl-2xl, medium gray)
- `.text-body` - Body text (dark gray, leading relaxed)
- `.text-caption` - Caption text (sm, medium gray)

### Interactive Utilities
- `.link-primary` - Primary link (bright red, hover orange)
- `.link-secondary` - Secondary link (dark gray, hover bright red)
- `.nav-link` - Navigation link (dark gray, hover bright red)
- `.nav-link-active` - Active navigation link (bright red, semibold)

### Status Utilities
- `.status-success` - Success message styling
- `.status-warning` - Warning message styling
- `.status-error` - Error message styling

## 🚀 Usage Examples

### Creating a Page Section
```tsx
import { Section, Card, Grid, Button } from "@/components/ui";

export default function MyPage() {
  return (
    <Section title="My Section" subtitle="Optional subtitle">
      <Grid cols={3} gap="lg">
        <Card>
          <h3>Card 1</h3>
          <p>Content...</p>
          <Button variant="primary" href="/link">
            Action
          </Button>
        </Card>
        {/* More cards... */}
      </Grid>
    </Section>
  );
}
```

### Creating a Form
```tsx
import { Card, FormInput, FormSelect, FormTextarea, Button } from "@/components/ui";

export default function ContactForm() {
  return (
    <Card>
      <h2>Contact Form</h2>
      <form className="space-y-6">
        <FormInput
          label="Name"
          required
          placeholder="Enter your name"
        />
        <FormSelect
          label="Subject"
          required
          options={[
            { value: "general", label: "General Inquiry" }
          ]}
        />
        <FormTextarea
          label="Message"
          required
          rows={5}
        />
        <Button type="submit" variant="primary">
          Send Message
        </Button>
      </form>
    </Card>
  );
}
```

## 📱 Responsive Design

All components are built with responsive design in mind:
- Mobile-first approach
- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Grid components automatically adjust columns
- Text sizes scale appropriately

## 🎨 Customization

### Adding New Colors
To add new colors, update `app/globals.css`:
```css
:root {
  --color-new-color: #HEXCODE;
}

/* Add utility classes */
.bg-new-color { background-color: var(--color-new-color); }
.text-new-color { color: var(--color-new-color); }
```

### Creating New Components
1. Create component in `components/ui/`
2. Add to `components/ui/index.ts`
3. Follow existing naming conventions
4. Use the established color palette
5. Include proper TypeScript interfaces

### Modifying Existing Components
- Update the component file
- Maintain backward compatibility
- Update documentation if needed
- Test across different use cases

## 🔧 Best Practices

1. **Always use components** instead of custom CSS when possible
2. **Follow the color palette** strictly for consistency
3. **Use semantic HTML** with proper accessibility attributes
4. **Maintain responsive design** across all components
5. **Keep components focused** on single responsibilities
6. **Use TypeScript interfaces** for all component props
7. **Test components** in different contexts and screen sizes

## 📚 Component Library

The complete component library is available at:
- `components/ui/Button.tsx` - Button variants and sizes
- `components/ui/Card.tsx` - Card layouts and variants
- `components/ui/Badge.tsx` - Status and category badges
- `components/ui/Section.tsx` - Page section containers
- `components/ui/Grid.tsx` - Responsive grid layouts
- `components/ui/FormInput.tsx` - Form input fields
- `components/ui/FormSelect.tsx` - Form select dropdowns
- `components/ui/FormTextarea.tsx` - Form text areas

Import all components from `@/components/ui` for convenience.
