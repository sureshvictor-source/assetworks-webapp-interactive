/**
 * AssetWorks Design System - Color Tokens
 *
 * Centralized color palette for consistent theming across all products.
 * All colors are extracted from the existing AssetWorks brand identity.
 *
 * @module design-system/colors
 */

// ============================================================================
// PRIMARY BRAND COLORS
// ============================================================================

export const colors = {
  // Primary Navy - Main brand color
  primary: {
    DEFAULT: '#1B2951',
    50: '#E8EAF0',
    100: '#D1D5E1',
    200: '#A3ABC3',
    300: '#7581A5',
    400: '#475787',
    500: '#1B2951', // Base
    600: '#162141',
    700: '#101931',
    800: '#0B1121',
    900: '#050810',
    foreground: '#FFFFFF',
  },

  // Secondary Blue-Gray
  secondary: {
    DEFAULT: '#6C7B95',
    50: '#F2F4F7',
    100: '#E5E8EF',
    200: '#CBD1DF',
    300: '#B1BACF',
    400: '#97A3BF',
    500: '#6C7B95', // Base
    600: '#566277',
    700: '#414A59',
    800: '#2B313C',
    900: '#16191E',
    foreground: '#FFFFFF',
  },

  // Accent Deep Blue
  accent: {
    DEFAULT: '#405D80',
    50: '#EDF2F7',
    100: '#DBE5EF',
    200: '#B7CBDF',
    300: '#93B1CF',
    400: '#6F97BF',
    500: '#405D80', // Base
    600: '#334A66',
    700: '#26384D',
    800: '#1A2533',
    900: '#0D131A',
    foreground: '#FFFFFF',
  },

  // Neutral Grays
  gray: {
    50: '#F8F9FA',
    100: '#F1F3F5',
    200: '#E9ECEF',
    300: '#DEE2E6',
    400: '#CED4DA',
    500: '#ADB5BD',
    600: '#6C757D',
    700: '#495057',
    800: '#343A40',
    900: '#212529',
  },

  // ============================================================================
  // SEMANTIC STATUS COLORS
  // ============================================================================

  success: {
    DEFAULT: '#10B981',
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981', // Base
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
    foreground: '#FFFFFF',
  },

  warning: {
    DEFAULT: '#F59E0B',
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B', // Base
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
    foreground: '#FFFFFF',
  },

  error: {
    DEFAULT: '#EF4444',
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444', // Base
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    foreground: '#FFFFFF',
  },

  danger: {
    DEFAULT: '#DC3545',
    50: '#FEF2F3',
    100: '#FDE5E7',
    200: '#FBC9CE',
    300: '#F9ADB5',
    400: '#F7919C',
    500: '#DC3545', // Base
    600: '#B02A37',
    700: '#841F29',
    800: '#58151C',
    900: '#2C0A0E',
    foreground: '#FFFFFF',
  },

  info: {
    DEFAULT: '#3B82F6',
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6', // Base
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
    foreground: '#FFFFFF',
  },

  idle: {
    DEFAULT: '#6B7280',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280', // Base
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    foreground: '#FFFFFF',
  },

  // ============================================================================
  // UI BACKGROUNDS & SURFACES
  // ============================================================================

  background: {
    DEFAULT: '#FFFFFF',
    secondary: '#F8F9FA',
    tertiary: '#F1F3F5',
    muted: '#E9ECEF',
    dark: '#1B2951',
  },

  // ============================================================================
  // TEXT & FOREGROUND
  // ============================================================================

  foreground: {
    DEFAULT: '#2C3E50',
    secondary: '#6C757D',
    muted: '#ADB5BD',
    inverse: '#FFFFFF',
  },

  // ============================================================================
  // BORDERS
  // ============================================================================

  border: {
    DEFAULT: '#E9ECEF',
    light: '#F1F3F5',
    medium: '#DEE2E6',
    dark: '#CED4DA',
  },

  // ============================================================================
  // SPECIAL COLORS
  // ============================================================================

  destructive: {
    DEFAULT: '#DC3545',
    foreground: '#FFFFFF',
  },

  muted: {
    DEFAULT: '#F8F9FA',
    foreground: '#6C757D',
  },

  card: {
    DEFAULT: '#FFFFFF',
    foreground: '#2C3E50',
  },

  popover: {
    DEFAULT: '#FFFFFF',
    foreground: '#2C3E50',
  },

  // ============================================================================
  // INTERACTIVE STATES
  // ============================================================================

  hover: {
    primary: '#162141',
    secondary: '#566277',
    accent: '#334A66',
    muted: '#F1F3F5',
  },

  active: {
    primary: '#101931',
    secondary: '#414A59',
    accent: '#26384D',
  },

  disabled: {
    background: '#F1F3F5',
    foreground: '#ADB5BD',
  },

  // ============================================================================
  // FOCUS & RING
  // ============================================================================

  ring: {
    DEFAULT: '#1B2951',
    offset: '#FFFFFF',
  },
} as const;

// ============================================================================
// COLOR UTILITY TYPES
// ============================================================================

export type ColorKey = keyof typeof colors;
export type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

// ============================================================================
// CSS VARIABLE MAPPINGS
// ============================================================================

/**
 * Maps color tokens to CSS variable names for use in globals.css
 */
export const cssVariables = {
  '--primary': '222 47% 19%',              // #1B2951
  '--primary-foreground': '0 0% 100%',     // #FFFFFF
  '--secondary': '220 17% 51%',            // #6C7B95
  '--secondary-foreground': '0 0% 100%',   // #FFFFFF
  '--accent': '209 33% 37%',               // #405D80
  '--accent-foreground': '0 0% 100%',      // #FFFFFF
  '--destructive': '354 70% 54%',          // #DC3545
  '--destructive-foreground': '0 0% 100%', // #FFFFFF
  '--success': '160 84% 39%',              // #10B981
  '--warning': '38 92% 50%',               // #F59E0B
  '--error': '0 84% 60%',                  // #EF4444
  '--info': '217 91% 60%',                 // #3B82F6
  '--background': '0 0% 100%',             // #FFFFFF
  '--foreground': '222 47% 19%',           // #2C3E50
  '--card': '0 0% 100%',                   // #FFFFFF
  '--card-foreground': '222 47% 19%',      // #2C3E50
  '--popover': '0 0% 100%',                // #FFFFFF
  '--popover-foreground': '222 47% 19%',   // #2C3E50
  '--muted': '210 17% 98%',                // #F8F9FA
  '--muted-foreground': '220 9% 46%',      // #6C757D
  '--border': '210 16% 93%',               // #E9ECEF
  '--input': '210 16% 93%',                // #E9ECEF
  '--ring': '222 47% 19%',                 // #1B2951
  '--radius': '0.5rem',                    // 8px
} as const;

// ============================================================================
// DARK MODE COLORS
// ============================================================================

export const darkModeColors = {
  '--primary': '222 47% 19%',
  '--primary-foreground': '0 0% 100%',
  '--background': '222 47% 11%',           // Darker navy
  '--foreground': '210 17% 98%',           // Light text
  '--card': '222 47% 14%',
  '--card-foreground': '210 17% 98%',
  '--muted': '222 47% 17%',
  '--muted-foreground': '220 17% 65%',
  '--border': '222 47% 20%',
  '--input': '222 47% 20%',
} as const;

// ============================================================================
// EXPORT HELPERS
// ============================================================================

/**
 * Get a color value by key and optional shade
 * @example getColor('primary') // '#1B2951'
 * @example getColor('primary', 600) // '#162141'
 */
export function getColor(
  key: ColorKey,
  shade?: keyof typeof colors[typeof key]
): string {
  const color = colors[key];
  if (typeof color === 'string') return color;
  if (shade && shade in color) return color[shade as keyof typeof color] as string;
  if ('DEFAULT' in color) return color.DEFAULT;
  return color[500] as string;
}

/**
 * Get all shades of a color
 * @example getColorShades('primary')
 */
export function getColorShades(key: ColorKey) {
  const color = colors[key];
  if (typeof color === 'string') return { DEFAULT: color };
  return color;
}
