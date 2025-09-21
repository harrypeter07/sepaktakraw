# 🖼️ Hero Images Setup Guide

To complete the hero section setup, you need to add hero images to your `public` folder.

## 📁 Required Images

Add these images to your `public` folder:

```
public/
├── hero-sepaktakraw-1.jpg    # Championship action shot
├── hero-sepaktakraw-2.jpg    # Youth training session
├── hero-sepaktakraw-3.jpg    # Women's team
├── hero-sepaktakraw-4.jpg    # International tournament
└── mskt-logo.svg            # Association logo (if not already present)
```

## 🎯 Image Specifications

### Recommended Dimensions
- **Width**: 1200px minimum
- **Height**: 600px minimum
- **Aspect Ratio**: 2:1 (landscape)
- **Format**: JPG or PNG
- **File Size**: Under 500KB each for optimal loading

### Image Content Suggestions

1. **hero-sepaktakraw-1.jpg**
   - Action shot of sepaktakraw players during a match
   - Championship or tournament setting
   - High energy, competitive atmosphere

2. **hero-sepaktakraw-2.jpg**
   - Youth players training or learning
   - Coach instructing young players
   - Development and growth theme

3. **hero-sepaktakraw-3.jpg**
   - Women's sepaktakraw team
   - Female players in action
   - Diversity and inclusion theme

4. **hero-sepaktakraw-4.jpg**
   - International tournament or competition
   - Maharashtra players representing India
   - Global recognition theme

## 🔄 Alternative: Use Placeholder Images

If you don't have actual images yet, the hero section will display placeholder content with:
- Icon placeholders
- Sample titles and descriptions
- Functional carousel navigation

## 🎨 Customization

You can customize the hero images by editing `components/sections/HeroSection.tsx`:

```typescript
const heroImages: HeroImage[] = [
  {
    id: 1,
    src: "/your-custom-image.jpg",  // Change this path
    alt: "Your custom description",
    title: "Your custom title",
    description: "Your custom description"
  },
  // ... more images
];
```

## 🚀 After Adding Images

1. **Restart your development server**:
   ```bash
   npm run dev
   ```

2. **Visit the homepage** to see the hero section with your images

3. **Test the carousel**:
   - Images should auto-rotate every 3 seconds
   - Navigation arrows should work
   - Dots should indicate current image

## 📱 Responsive Design

The hero section is fully responsive and will:
- ✅ Adapt to different screen sizes
- ✅ Maintain proper aspect ratios
- ✅ Show appropriate content on mobile devices
- ✅ Include touch-friendly navigation

## 🎉 Features Included

- ✅ **Auto-rotating carousel** (3-second intervals)
- ✅ **Manual navigation** (arrows and dots)
- ✅ **Responsive design** for all devices
- ✅ **News sidebar** with latest updates
- ✅ **Smooth transitions** and animations
- ✅ **Accessibility features** (alt text, keyboard navigation)

---

**🎯 Ready to go!** Once you add the images, your hero section will be fully functional with a professional carousel and integrated news feed.
