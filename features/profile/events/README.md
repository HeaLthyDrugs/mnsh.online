# Events Bento Grid - Customization Guide

## Overview
The Events section features a responsive bento grid layout with **2/4/6 column system** (mobile/tablet/desktop) and 7 different size options for creating complex, professional layouts.

## Grid System

### Responsive Columns
- **Mobile**: 2 columns
- **Tablet (md)**: 4 columns  
- **Desktop (lg)**: 6 columns

This allows for much more complex and interesting layouts compared to traditional 1/2/3 column grids.

## Size Options

### 1. **xs** - Extra Small
- **Mobile**: 1 col × 1 row
- **Tablet**: 1 col × 1 row
- **Desktop**: 1 col × 1 row
- **Min Height**: 140px / 160px / 180px
- **Perfect for**: Quick tips, small announcements, compact info

### 2. **small** - Small
- **Mobile**: 1 col × 1 row
- **Tablet**: 1 col × 1 row
- **Desktop**: 2 cols × 1 row
- **Min Height**: 160px / 180px / 200px
- **Perfect for**: Short events, meetups, workshops

### 3. **medium** - Medium (Default)
- **Mobile**: 1 col × 1 row
- **Tablet**: 2 cols × 1 row
- **Desktop**: 2 cols × 1 row
- **Min Height**: 180px / 220px / 240px
- **Perfect for**: Standard events, conferences

### 4. **large** - Large
- **Mobile**: 2 cols × 1 row (full width on mobile)
- **Tablet**: 2 cols × 1 row
- **Desktop**: 3 cols × 1 row
- **Min Height**: 200px / 240px / 260px
- **Perfect for**: Featured events, important announcements

### 5. **wide** - Wide Banner
- **Mobile**: 2 cols × 1 row (full width)
- **Tablet**: 4 cols × 1 row (full width)
- **Desktop**: 6 cols × 1 row (full width)
- **Min Height**: 180px / 200px / 220px
- **Perfect for**: Banner-style announcements, full-width showcases

### 6. **tall** - Tall
- **Mobile**: 1 col × 2 rows
- **Tablet**: 2 cols × 2 rows
- **Desktop**: 2 cols × 2 rows
- **Min Height**: 320px / 360px / 400px
- **Perfect for**: Detailed event descriptions, rich content

### 7. **xl** - Extra Large Hero
- **Mobile**: 2 cols × 2 rows (full width, double height)
- **Tablet**: 3 cols × 2 rows
- **Desktop**: 4 cols × 2 rows
- **Min Height**: 320px / 380px / 420px
- **Perfect for**: Hero events, major announcements, featured content

## Customization Options

### Background Styling

#### Background Image with Gradient Overlay
```typescript
{
    backgroundImage: "https://images.unsplash.com/photo-xxx",
    gradientOverlay: "from-blue-900/90 via-purple-900/85 to-pink-900/90",
    textColor: "text-white",
    showImage: false, // Hide inline image, use only background
}
```

#### Solid Background Color
```typescript
{
    backgroundColor: "bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-950 dark:to-blue-950",
}
```

### Text Customization
- **textColor**: Custom text color (e.g., `"text-white"`, `"text-gray-900"`)
- Automatically adjusts for readability with background images
- Responsive font sizes: smaller on mobile, larger on desktop

### Image Options
- **image**: Inline image shown at top of card
- **backgroundImage**: Full background image
- **showImage**: Set to `false` to hide inline image when using background image

## Layout Strategy

### Creating Complex Layouts

The 2/4/6 column system allows for intricate patterns:

```
Mobile (2 cols):
[XL    ][Tall ]
[XL    ][Tall ]
[Large      ]
[Med  ][Small]

Tablet (4 cols):
[XL        ][Tall    ]
[XL        ][Tall    ]
[Large    ][Medium  ]
[Small][Small][xs][xs]

Desktop (6 cols):
[XL            ][Tall    ][xs][xs]
[XL            ][Tall    ][xs][xs]
[Large          ][Medium  ][Small    ]
[Wide Banner                        ]
```

### Best Practices

1. **Start with a Hero**: Use `xl` or `wide` for your most important event
2. **Mix Sizes**: Combine different sizes for visual interest
3. **Balance**: Distribute large cards evenly across the grid
4. **Fill Gaps**: Use `xs` and `small` cards to fill spaces
5. **Mobile First**: On mobile, small cards (xs, small) take less space than large ones

## Example Configurations

### Hero Event (Extra Large)
```typescript
{
    id: "hero-event",
    title: "Tech Summit 2025",
    date: "15.03.2025",
    location: "San Francisco, CA",
    category: "Conference",
    description: "Annual technology summit featuring the latest innovations.",
    backgroundImage: "https://images.unsplash.com/photo-xxx",
    gradientOverlay: "from-blue-900/90 to-purple-900/90",
    textColor: "text-white",
    size: "xl", // 2/3/4 cols, 2 rows
    showImage: false,
    tags: ["AI", "Web3", "Cloud"],
}
```

### Quick Tip (Extra Small)
```typescript
{
    id: "quick-tip",
    title: "Design Tip #1",
    date: "01.02.2025",
    category: "Tip",
    description: "Master color theory basics.",
    backgroundColor: "bg-gradient-to-br from-rose-50 to-orange-100 dark:from-rose-950 dark:to-orange-950",
    size: "xs", // 1/1/1 cols
    tags: ["Design"],
}
```

### Full Width Banner
```typescript
{
    id: "banner",
    title: "Annual Showcase",
    date: "20.05.2025",
    category: "Exhibition",
    backgroundImage: "https://images.unsplash.com/photo-xxx",
    gradientOverlay: "from-indigo-900/90 to-cyan-900/90",
    textColor: "text-white",
    size: "wide", // Full width on all screens
    showImage: false,
}
```

## Responsive Features

### Text Sizing
- **Titles**: `text-sm` → `text-base` → `text-lg`
- **Body**: `text-xs` → `text-sm`
- **Tags**: `text-[10px]` → `text-xs`

### Spacing
- **Padding**: `p-3` → `p-4`
- **Gaps**: `gap-2` → `gap-3`
- **Icons**: `size-3` → `size-3.5`

### Mobile Optimization
Small cards (xs, small) take only 1 column on mobile, preventing wasted space while large cards span the full width for impact.

## File Locations

- **Types**: `features/profile/types/events.ts`
- **Data**: `features/profile/data/events.ts`
- **Layout**: `features/profile/events/index.tsx`
- **Card Component**: `features/profile/events/event-item.tsx`

## Tips for Best Results

1. **Visual Hierarchy**: Use `xl` for most important content
2. **Color Harmony**: Use complementary gradients
3. **Contrast**: Ensure text is readable against backgrounds
4. **Balance**: Mix sizes for dynamic layouts
5. **Test Responsive**: Check on mobile, tablet, and desktop
6. **Strategic Placement**: Place important events in top-left positions
