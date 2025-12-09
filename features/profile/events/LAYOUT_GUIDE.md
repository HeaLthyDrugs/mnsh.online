# Events Bento Grid Layout Guide

## Layout Structure

### Desktop (lg - 3 columns)

```
┌─────────────┬─────┬─────┐
│             │     │  b  │  Row 0-1
│      a      │     │     │  (a: 2x2, b: 1x2)
│   (2x2)     │     ├─────┤
│             │     │  e  │  Row 2
├─────┬─────┬─┴─────┴─────┤
│  c  │  d  │      f      │  Row 2-3
├─────┴─────┴─────────────┤  (c,d,e: 1x1, f: 2x1, g: 1x1)
│           h             │  Row 4
│        (3x1)            │  (h: full width)
├─────┬─────────────┬─────┤
│  i  │      j      │     │  Row 5
│     │    (2x1)    │     │  (i: 1x1, j: 2x1)
├─────┼─────────────┤  l  │  Row 6-7
│  k  │             │     │
│     │      l      │(2x2)│  (k: 1x1, l: 2x2)
│     │    (2x2)    │     │
└─────┴─────────────┴─────┘
```

### Tablet (md - 2 columns)

```
┌─────────────────────┐
│          a          │  Row 0-1
│        (2x2)        │  (a: full width, 2 rows)
├─────────┬───────────┤
│    b    │     c     │  Row 2
│  (1x2)  ├───────────┤  (b: tall, c,d: 1x1)
│         │     d     │  Row 3
├─────────┴───────────┤
│          e          │  Row 4
│      (full width)   │  (e: full width)
├─────────┬───────────┤
│    f    │     g     │  Row 5
├─────────┴───────────┤  (f,g: 1x1)
│          h          │  Row 6
│      (full width)   │  (h: full width)
├─────────┬───────────┤
│    i    │     j     │  Row 7
├─────────┴───────────┤  (i,j: 1x1)
│          k          │  Row 8
│      (full width)   │  (k: full width)
├─────────────────────┤
│          l          │  Row 9-10
│        (2x2)        │  (l: full width, 2 rows)
└─────────────────────┘
```

### Mobile (sm - 1 column)

```
┌─────────┐
│    a    │  Row 0-1 (tall)
│  (1x2)  │
├─────────┤
│    b    │  Row 2-3 (tall)
│  (1x2)  │
├─────────┤
│    c    │  Row 4 (small)
├─────────┤
│    d    │  Row 5 (small)
├─────────┤
│    e    │  Row 6 (small)
├─────────┤
│    f    │  Row 7 (small)
├─────────┤
│    g    │  Row 8 (small)
├─────────┤
│    h    │  Row 9 (small)
├─────────┤
│    i    │  Row 10 (small)
├─────────┤
│    j    │  Row 11 (small)
├─────────┤
│    k    │  Row 12 (small)
├─────────┤
│    l    │  Row 13-14 (tall)
│  (1x2)  │
└─────────┘
```

## Grid Configuration

### Breakpoints
- **lg**: ≥1024px (3 columns)
- **md**: ≥768px (2 columns)
- **sm**: ≥640px (1 column)

### Row Height
- **200px** per row unit

### Card Sizes

#### Desktop (3 columns)
- **a**: 2×2 (400px × 400px) - XL Hero
- **b**: 1×2 (200px × 400px) - Tall
- **c, d, e, g, i, k**: 1×1 (200px × 200px) - Small
- **f, j**: 2×1 (400px × 200px) - Large
- **h**: 3×1 (600px × 200px) - Wide Banner
- **l**: 2×2 (400px × 400px) - XL

#### Tablet (2 columns)
- **a, l**: 2×2 (full width × 400px) - XL
- **b**: 1×2 (half width × 400px) - Tall
- **e, h, k**: 2×1 (full width × 200px) - Wide
- **c, d, f, g, i, j**: 1×1 (half width × 200px) - Small

#### Mobile (1 column)
- **a, b, l**: 1×2 (full width × 400px) - Tall
- **c-k**: 1×1 (full width × 200px) - Small

## Event Mapping

The 12 keys (a-l) are mapped to your events in order:

```typescript
keys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"]
```

If you have more than 12 events, they will cycle through the positions.

## Customization

### To modify the layout:

1. **Edit** `utils/layout.helper.ts`
2. **Adjust** the `EventsLayouts` object
3. **Change** `x`, `y`, `w` (width), `h` (height) values

### Layout Properties:
- `i`: key identifier (a-l)
- `x`: column position (0-based)
- `y`: row position (0-based)
- `w`: width in columns
- `h`: height in rows
- `isResizable`: false (cards maintain size)

### Example - Make card 'c' larger:
```typescript
{ i: "c", x: 0, y: 2, w: 2, h: 1, isResizable: false } // Now spans 2 columns
```

## Features

✅ **Draggable**: Grab and move any card
✅ **Responsive**: Adapts to screen size
✅ **Complex Layout**: Varied sizes create visual interest
✅ **Smooth Animations**: 300ms transitions
✅ **No Resizing**: Cards maintain their defined sizes
✅ **Vertical Compacting**: Cards stack efficiently

## Tips

1. **Visual Hierarchy**: Larger cards (2×2) draw more attention
2. **Balance**: Mix sizes for dynamic layouts
3. **Mobile First**: On mobile, use tall cards (1×2) for important content
4. **Full Width**: Use 3×1 (lg) or 2×1 (md) for banners
5. **Symmetry**: Consider visual balance when arranging cards
