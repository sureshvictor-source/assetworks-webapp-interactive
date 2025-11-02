/**
 * Component Variants System
 *
 * Centralized component variant definitions using class-variance-authority (cva).
 * Provides type-safe, consistent styling across all AssetWorks products.
 *
 * @module component-variants
 * @version 1.0.0
 *
 * ## Usage
 *
 * ```tsx
 * import { buttonVariants, badgeVariants } from '@/lib/component-variants';
 *
 * // Use in your components
 * <button className={buttonVariants({ variant: 'primary', size: 'lg' })}>
 *   Click me
 * </button>
 *
 * <span className={badgeVariants({ variant: 'success' })}>
 *   Active
 * </span>
 * ```
 *
 * ## Available Component Variants
 *
 * - **Button**: Primary, secondary, outline, ghost, destructive, link variants
 * - **Badge**: Status badges with colors and sizes
 * - **Card**: Dashboard cards, feature cards, pricing cards
 *
 * @see {@link ./button.ts} for button variants
 * @see {@link ./badge.ts} for badge variants
 * @see {@link ./card.ts} for card variants
 */

// ============================================================================
// BUTTON VARIANTS
// ============================================================================

export {
  buttonVariants,
  buttonIconVariants,
  buttonGroupVariants,
  type ButtonVariants,
} from './button';

// ============================================================================
// BADGE VARIANTS
// ============================================================================

export {
  badgeVariants,
  badgeDotVariants,
  badgeIconVariants,
  statusBadgePresets,
  type BadgeVariants,
} from './badge';

// ============================================================================
// CARD VARIANTS
// ============================================================================

export {
  cardVariants,
  cardHeaderVariants,
  cardTitleVariants,
  cardDescriptionVariants,
  cardContentVariants,
  cardFooterVariants,
  cardLayoutPresets,
  type CardVariants,
  type CardHeaderVariants,
  type CardTitleVariants,
  type CardDescriptionVariants,
  type CardContentVariants,
  type CardFooterVariants,
} from './card';

// ============================================================================
// FORM COMPONENT VARIANTS
// ============================================================================

// Input variants
export {
  inputVariants,
  inputLabelVariants,
  inputHelperTextVariants,
  inputIconVariants,
  inputAddonVariants,
  inputGroupVariants,
  inputWrapperVariants,
  searchInputVariants,
  numberInputVariants,
  passwordInputVariants,
  otpInputVariants,
  currencyInputVariants,
  inputPresets,
  type InputVariants,
  type InputLabelVariants,
  type InputHelperTextVariants,
  type InputIconVariants,
  type InputAddonVariants,
  type InputGroupVariants,
  type InputWrapperVariants,
  type InputPreset,
} from './input';

// Textarea variants
export {
  textareaVariants,
  textareaWrapperVariants,
  textareaCharCountVariants,
  textareaPresets,
  type TextareaVariants,
  type TextareaWrapperVariants,
  type TextareaCharCountVariants,
  type TextareaPreset,
} from './textarea';

// Select variants
export {
  selectVariants,
  selectTriggerIconVariants,
  selectContentVariants,
  selectItemVariants,
  selectItemIndicatorVariants,
  selectGroupVariants,
  selectLabelVariants,
  selectSeparatorVariants,
  selectPresets,
  type SelectVariants,
  type SelectTriggerIconVariants,
  type SelectContentVariants,
  type SelectItemVariants,
  type SelectItemIndicatorVariants,
  type SelectGroupVariants,
  type SelectLabelVariants,
  type SelectSeparatorVariants,
  type SelectPreset,
} from './select';

// Checkbox variants
export {
  checkboxVariants,
  checkboxIndicatorVariants,
  checkboxLabelVariants,
  checkboxGroupVariants,
  checkboxItemVariants,
  checkboxCardVariants,
  checkboxPresets,
  type CheckboxVariants,
  type CheckboxIndicatorVariants,
  type CheckboxLabelVariants,
  type CheckboxGroupVariants,
  type CheckboxItemVariants,
  type CheckboxCardVariants,
  type CheckboxPreset,
} from './checkbox';

// Switch variants
export {
  switchVariants,
  switchThumbVariants,
  switchLabelVariants,
  switchContainerVariants,
  switchGroupVariants,
  switchCardVariants,
  switchPresets,
  type SwitchVariants,
  type SwitchThumbVariants,
  type SwitchLabelVariants,
  type SwitchContainerVariants,
  type SwitchGroupVariants,
  type SwitchCardVariants,
  type SwitchPreset,
} from './switch';

// Radio variants
export {
  radioVariants,
  radioIndicatorVariants,
  radioLabelVariants,
  radioGroupVariants,
  radioItemVariants,
  radioCardVariants,
  radioPresets,
  type RadioVariants,
  type RadioIndicatorVariants,
  type RadioLabelVariants,
  type RadioGroupVariants,
  type RadioItemVariants,
  type RadioCardVariants,
  type RadioPreset,
} from './radio';

// Slider variants
export {
  sliderVariants,
  sliderTrackVariants,
  sliderRangeVariants,
  sliderThumbVariants,
  sliderLabelVariants,
  sliderValueVariants,
  sliderMarkVariants,
  sliderMarkLabelVariants,
  sliderTooltipVariants,
  sliderPresets,
  type SliderVariants,
  type SliderTrackVariants,
  type SliderRangeVariants,
  type SliderThumbVariants,
  type SliderLabelVariants,
  type SliderValueVariants,
  type SliderMarkVariants,
  type SliderMarkLabelVariants,
  type SliderTooltipVariants,
  type SliderPreset,
} from './slider';

// ============================================================================
// NAVIGATION COMPONENT VARIANTS
// ============================================================================

export {
  navbarVariants,
  breadcrumbsVariants,
  breadcrumbItemVariants,
  paginationVariants,
  paginationItemVariants,
  tabsListVariants,
  tabsTriggerVariants,
  tabsContentVariants,
  menuVariants,
  menuItemVariants,
  menuSeparatorVariants,
  menuLabelVariants,
  stepperVariants,
  stepVariants,
  stepIndicatorVariants,
  stepConnectorVariants,
  navigationPresets,
  type NavbarVariants,
  type BreadcrumbsVariants,
  type BreadcrumbItemVariants,
  type PaginationVariants,
  type PaginationItemVariants,
  type TabsListVariants,
  type TabsTriggerVariants,
  type TabsContentVariants,
  type MenuVariants,
  type MenuItemVariants,
  type MenuSeparatorVariants,
  type MenuLabelVariants,
  type StepperVariants,
  type StepVariants,
  type StepIndicatorVariants,
  type StepConnectorVariants,
} from './navigation';

// ============================================================================
// DATA DISPLAY COMPONENT VARIANTS
// ============================================================================

export {
  accordionItemVariants,
  accordionTriggerVariants,
  accordionContentVariants,
  tableVariants,
  tableHeaderVariants,
  tableRowVariants,
  tableHeadVariants,
  tableCellVariants,
  listVariants,
  listItemVariants,
  statVariants,
  statLabelVariants,
  statValueVariants,
  statDeltaVariants,
  timelineVariants,
  timelineItemVariants,
  timelineIndicatorVariants,
  timelineConnectorVariants,
  codeBlockVariants,
  inlineCodeVariants,
  dataDisplayPresets,
  type AccordionItemVariants,
  type AccordionTriggerVariants,
  type AccordionContentVariants,
  type TableVariants,
  type TableHeaderVariants,
  type TableRowVariants,
  type TableHeadVariants,
  type TableCellVariants,
  type ListVariants,
  type ListItemVariants,
  type StatVariants,
  type StatLabelVariants,
  type StatValueVariants,
  type StatDeltaVariants,
  type TimelineVariants,
  type TimelineItemVariants,
  type TimelineIndicatorVariants,
  type TimelineConnectorVariants,
  type CodeBlockVariants,
  type InlineCodeVariants,
} from './data-display';

// ============================================================================
// OVERLAY COMPONENT VARIANTS
// ============================================================================

export {
  modalOverlayVariants,
  modalContentVariants,
  modalHeaderVariants,
  modalTitleVariants,
  modalDescriptionVariants,
  modalFooterVariants,
  drawerVariants,
  popoverContentVariants,
  tooltipContentVariants,
  sheetVariants,
  dropdownMenuContentVariants,
  overlayPresets,
  type ModalOverlayVariants,
  type ModalContentVariants,
  type DrawerVariants,
  type PopoverContentVariants,
  type TooltipContentVariants,
  type SheetVariants,
  type DropdownMenuContentVariants,
} from './overlays';

// ============================================================================
// FEEDBACK COMPONENT VARIANTS
// ============================================================================

export {
  alertVariants,
  alertTitleVariants,
  alertDescriptionVariants,
  toastVariants,
  toastActionVariants,
  progressVariants,
  progressIndicatorVariants,
  spinnerVariants,
  skeletonVariants,
  emptyStateVariants,
  emptyStateIconVariants,
  emptyStateTitleVariants,
  emptyStateDescriptionVariants,
  notificationBadgeVariants,
  feedbackPresets,
  type AlertVariants,
  type AlertTitleVariants,
  type AlertDescriptionVariants,
  type ToastVariants,
  type ToastActionVariants,
  type ProgressVariants,
  type ProgressIndicatorVariants,
  type SpinnerVariants,
  type SkeletonVariants,
  type EmptyStateVariants,
  type EmptyStateIconVariants,
  type EmptyStateTitleVariants,
  type EmptyStateDescriptionVariants,
  type NotificationBadgeVariants,
} from './feedback';

// ============================================================================
// MEDIA COMPONENT VARIANTS
// ============================================================================

export {
  avatarVariants,
  avatarImageVariants,
  avatarFallbackVariants,
  avatarGroupVariants,
  imageVariants,
  imageOverlayVariants,
  imagePlaceholderVariants,
  iconVariants,
  iconButtonVariants,
  mediaPresets,
  type AvatarVariants,
  type AvatarImageVariants,
  type AvatarFallbackVariants,
  type AvatarGroupVariants,
  type ImageVariants,
  type ImageOverlayVariants,
  type ImagePlaceholderVariants,
  type IconVariants,
  type IconButtonVariants,
} from './media';

// ============================================================================
// LAYOUT COMPONENT VARIANTS
// ============================================================================

export {
  dividerVariants,
  dividerWithTextVariants,
  spacerVariants,
  stackVariants,
  sectionVariants,
  centerVariants,
  aspectRatioContainerVariants,
  layoutPresets,
  type DividerVariants,
  type DividerWithTextVariants,
  type SpacerVariants,
  type StackVariants,
  type SectionVariants,
  type CenterVariants,
  type AspectRatioContainerVariants,
} from './layout';

// ============================================================================
// VARIANT UTILITIES
// ============================================================================

/**
 * Metadata about the component variants system
 */
export const componentVariantsSystem = {
  version: '1.0.0',
  name: 'AssetWorks Component Variants',
  description: 'Type-safe component styling system using class-variance-authority',
  lastUpdated: '2025-11-02',
} as const;

/**
 * List of all available component variant modules
 */
export const availableVariants = [
  // Original
  'button',
  'badge',
  'card',
  // Form components
  'input',
  'textarea',
  'select',
  'checkbox',
  'switch',
  'radio',
  'slider',
  // Navigation
  'navigation',
  // Data display
  'data-display',
  // Overlays
  'overlays',
  // Feedback
  'feedback',
  // Media
  'media',
  // Layout
  'layout',
] as const;

export type AvailableVariant = typeof availableVariants[number];

/**
 * Note: Import variants directly using named imports
 *
 * Example:
 * ```ts
 * import { buttonVariants, cardVariants } from '@/lib/component-variants';
 * ```
 */
