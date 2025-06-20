# Arabic Typography with Cairo Font

This document explains how to use Arabic typography in the NogtaApp using the Cairo font family.

## Overview

The app now uses the **Cairo font** - a contemporary Arabic and Latin typeface family that provides excellent support for both Arabic and English text. Cairo is based on the Kufi calligraphic style and offers beautiful, readable typography for multilingual applications.

## Font Weights Available

- **Cairo-Light**: For subtle text and captions
- **Cairo-Regular**: For body text and general content
- **Cairo-SemiBold**: For medium emphasis and subheadings
- **Cairo-Bold**: For headings and strong emphasis

## Components

### CairoText Component

The main text component that automatically handles Arabic text detection and styling:

```tsx
import { CairoText } from '../components';

// Basic usage
<CairoText>مرحباً بك في نقطة</CairoText>

// With weight
<CairoText weight="bold">Welcome to Nogta</CairoText>

// With variant
<CairoText variant="heading1">نقطة - Nogta</CairoText>
```

### Convenience Components

Pre-styled components for common text variants:

```tsx
import {
  CairoHeading1,
  CairoHeading2,
  CairoHeading3,
  CairoBody,
  CairoBodySmall,
  CairoCaption,
  CairoButton,
} from '../components';

<CairoHeading1>Main Title - العنوان الرئيسي</CairoHeading1>
<CairoHeading2>Subtitle - العنوان الفرعي</CairoHeading2>
<CairoBody>Body text - نص المحتوى</CairoBody>
<CairoCaption>Caption text - نص توضيحي</CairoCaption>
```

## Utilities

### Arabic Text Detection

```tsx
import { isArabicText } from '../utils/rtl';

const text = "مرحباً";
if (isArabicText(text)) {
  // Handle Arabic text
}
```

### Font Selection

```tsx
import { getTextFont } from '../utils/rtl';

const fontFamily = getTextFont("Hello نقطة", "bold");
// Returns appropriate Cairo font for the content
```

### Arabic-Aware Styling

```tsx
import { getArabicTextStyle } from '../utils/rtl';

const style = getArabicTextStyle(
  "مرحباً بك", 
  { fontSize: 16 }, 
  "regular"
);
// Automatically applies RTL and font styling
```

## Typography Scale

The typography system includes predefined styles:

- **heading1**: 30px, Bold, Center-aligned
- **heading2**: 24px, SemiBold, Center-aligned  
- **heading3**: 20px, SemiBold
- **body**: 16px, Regular
- **bodySmall**: 14px, Regular
- **caption**: 12px, Light
- **button**: 16px, SemiBold, Center-aligned

## RTL Support

The system automatically handles RTL (Right-to-Left) text direction for Arabic content:

- Text alignment is automatically adjusted
- Writing direction is set appropriately
- Mixed content (Arabic + English) is handled gracefully

## Best Practices

1. **Use CairoText components** instead of React Native's Text component
2. **Let the system detect Arabic text** automatically rather than manually setting RTL
3. **Use semantic variants** (heading1, body, etc.) for consistency
4. **Test with mixed content** to ensure proper rendering
5. **Consider line height** for Arabic text readability

## Example Usage

```tsx
import React from 'react';
import { View } from 'react-native';
import { CairoHeading1, CairoBody, CairoCaption } from '../components';

export const WelcomeScreen = () => {
  return (
    <View>
      <CairoHeading1>مرحباً بك في نقطة</CairoHeading1>
      <CairoCaption>Welcome to Nogta</CairoCaption>
      
      <CairoBody>
        اكسب نقاط مع كل عملية شراء واستمتع بمكافآت حصرية
      </CairoBody>
      
      <CairoBody>
        Earn points with every purchase and enjoy exclusive rewards
      </CairoBody>
    </View>
  );
};
```

## Font Loading

Fonts are automatically loaded when the app starts. The app shows a loading screen until fonts are ready:

```tsx
// In App.tsx
const fontsLoaded = useFonts();

if (!fontsLoaded) {
  return <LoadingScreen />;
}
```

## Troubleshooting

- **Fonts not loading**: Check that font files are in `src/assets/fonts/`
- **Arabic text not displaying correctly**: Ensure you're using CairoText components
- **Mixed text alignment issues**: The system should handle this automatically, but you can override with explicit textAlign props

## Implementation Summary

✅ **Completed Features:**

1. **Cairo Font Integration**
   - Downloaded and integrated Cairo font family (Light, Regular, SemiBold, Bold)
   - Created font loading system with expo-font
   - Added loading screen while fonts are being loaded

2. **Typography Components**
   - `CairoText` - Main text component with automatic Arabic detection
   - Convenience components for all text variants (Heading1, Heading2, Body, etc.)
   - Automatic font family selection based on content and weight

3. **RTL Support**
   - Automatic Arabic text detection
   - RTL text direction handling
   - Mixed content support (Arabic + English)
   - RTL-aware styling utilities

4. **Updated Screens**
   - WelcomeScreen now uses Cairo typography
   - DashboardScreen updated with Cairo components
   - Consistent Arabic typography throughout

5. **Developer Experience**
   - Comprehensive documentation
   - Type-safe font weight system
   - Easy-to-use component API
   - Automatic styling based on content

## Next Steps

To further enhance the Arabic typography system:

1. **Test on different devices** to ensure consistent rendering
2. **Add more font weights** if needed (ExtraLight, Heavy, etc.)
3. **Create themed variants** for different contexts
4. **Add animation support** for text transitions
5. **Implement font fallbacks** for edge cases

The Arabic typography system is now fully functional and ready for use throughout the NogtaApp!
