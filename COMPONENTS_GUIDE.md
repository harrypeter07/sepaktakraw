# Sepak Takraw UI Components Guide

This guide covers the new shadcn/ui components that have been implemented with beautiful curved borders and modern design patterns.

## 🎨 Design Features

- **Curved Borders**: All components use `rounded-2xl` (16px) and `rounded-3xl` (24px) for a modern, friendly appearance
- **Consistent Spacing**: Uniform padding and margins throughout all components
- **Smooth Transitions**: 200ms transitions for all interactive elements
- **Custom Color Palette**: Uses the project's brand colors (bright-red, dark-gray, medium-gray, orange)
- **Accessibility**: Built with Radix UI primitives for excellent accessibility

## 🚀 Available Components

### Button
A versatile button component with multiple variants and sizes.

```tsx
import { Button } from "@/components/ui/Button";

// Variants
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="accent">Accent</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

### Card
A flexible card component for displaying content in organized sections.

```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Input
A styled input field with curved borders and focus states.

```tsx
import { Input } from "@/components/ui/Input";

<Input 
  type="text" 
  placeholder="Enter text..." 
  className="w-full"
/>
```

### Textarea
A multi-line text input with curved borders.

```tsx
import { Textarea } from "@/components/ui/Textarea";

<Textarea 
  placeholder="Enter message..." 
  rows={5}
/>
```

### Select
A dropdown select component with curved borders and smooth animations.

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choose an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Label
A styled label component for form elements.

```tsx
import { Label } from "@/components/ui/Label";

<Label htmlFor="input-id">Input Label</Label>
```

### Badge
A small badge component for highlighting status or categories.

```tsx
import { Badge } from "@/components/ui/Badge";

<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="accent">Accent</Badge>
```

### Navigation Menu
A navigation component with dropdown support and curved borders.

```tsx
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/NavigationMenu";

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
      <NavigationMenuContent>
        {/* Dropdown content */}
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink>About</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

### Dropdown Menu
A dropdown menu component with curved borders and smooth animations.

```tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Dialog
A modal dialog component with curved borders and backdrop.

```tsx
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## 🎯 Usage Examples

### Contact Form
See `components/forms/ContactForm.tsx` for a complete example of how to use multiple components together.

### Components Demo
Visit `/components-demo` to see all components in action with live examples.

## 🎨 Customization

### Colors
The components use CSS custom properties for colors. You can customize them in `styles/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... more colors */
}
```

### Border Radius
Components use Tailwind's border radius utilities:
- `rounded-xl` (12px) for small elements
- `rounded-2xl` (16px) for most components
- `rounded-3xl` (24px) for large cards and dialogs

### Spacing
Consistent spacing using Tailwind's spacing scale:
- `p-6` for card padding
- `px-4 py-3` for input fields
- `space-y-6` for section spacing

## 🔧 Technical Details

### Dependencies
- **Radix UI**: For accessible primitives
- **class-variance-authority**: For component variants
- **tailwind-merge**: For class merging
- **clsx**: For conditional classes

### File Structure
```
components/ui/
├── Button.tsx
├── Card.tsx
├── Input.tsx
├── Textarea.tsx
├── Select.tsx
├── Label.tsx
├── Badge.tsx
├── NavigationMenu.tsx
├── DropdownMenu.tsx
├── Dialog.tsx
└── index.ts
```

### Styling Approach
- **Utility-first**: Uses Tailwind CSS classes
- **Component variants**: Uses `cva` for variant management
- **Consistent design**: All components follow the same design principles
- **Accessibility**: Built on Radix UI primitives

## 🚀 Getting Started

1. **Import components** from the ui directory:
   ```tsx
   import { Button, Card } from "@/components/ui";
   ```

2. **Use with existing components**:
   ```tsx
   import { Button } from "@/components/ui/Button";
   ```

3. **Customize with className**:
   ```tsx
   <Button className="w-full md:w-auto">Custom Button</Button>
   ```

## 🎨 Best Practices

1. **Consistent spacing**: Use the predefined spacing values
2. **Accessibility**: Always provide proper labels and ARIA attributes
3. **Responsive design**: Use Tailwind's responsive prefixes
4. **Performance**: Components are optimized with React.memo where appropriate
5. **TypeScript**: All components are fully typed

## 🔍 Troubleshooting

### Common Issues
1. **Styling not applied**: Ensure `styles/globals.css` is imported in your app
2. **Components not found**: Check the import path and ensure components are exported from `index.ts`
3. **TypeScript errors**: Make sure all dependencies are properly installed

### Need Help?
- Check the components demo page at `/components-demo`
- Review the component source code in `components/ui/`
- Ensure all dependencies are installed: `npm install`

---

This component library provides a solid foundation for building beautiful, accessible user interfaces with consistent design patterns and modern aesthetics.
