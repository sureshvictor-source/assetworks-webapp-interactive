/**
 * AssetWorks Design System - Cursor Tokens
 *
 * Cursor styles for interactive states and user feedback.
 * Provides consistent cursor behavior across all AssetWorks products.
 *
 * @module design-system/cursors
 */

// ============================================================================
// CURSOR STYLES
// ============================================================================

/**
 * All available cursor styles
 */
export const cursor = {
  // Default cursors
  auto: 'auto',
  default: 'default',
  pointer: 'pointer',
  wait: 'wait',
  text: 'text',
  move: 'move',
  help: 'help',
  notAllowed: 'not-allowed',

  // Resize cursors
  nResize: 'n-resize',
  eResize: 'e-resize',
  sResize: 's-resize',
  wResize: 'w-resize',
  neResize: 'ne-resize',
  nwResize: 'nw-resize',
  seResize: 'se-resize',
  swResize: 'sw-resize',
  ewResize: 'ew-resize',
  nsResize: 'ns-resize',
  neswResize: 'nesw-resize',
  nwseResize: 'nwse-resize',
  colResize: 'col-resize',
  rowResize: 'row-resize',
  allScroll: 'all-scroll',

  // Zoom cursors
  zoomIn: 'zoom-in',
  zoomOut: 'zoom-out',

  // Grab cursors
  grab: 'grab',
  grabbing: 'grabbing',

  // Other cursors
  crosshair: 'crosshair',
  copy: 'copy',
  alias: 'alias',
  contextMenu: 'context-menu',
  cell: 'cell',
  verticalText: 'vertical-text',
  noDrop: 'no-drop',
  progress: 'progress',

  // None
  none: 'none',
} as const;

export type Cursor = keyof typeof cursor;

// ============================================================================
// SEMANTIC CURSORS
// ============================================================================

/**
 * Semantic cursor values for common UI patterns
 */
export const semanticCursors = {
  // Interactive elements
  clickable: cursor.pointer, // Buttons, links, clickable elements
  draggable: cursor.grab, // Draggable items
  dragging: cursor.grabbing, // While dragging
  disabled: cursor.notAllowed, // Disabled elements
  loading: cursor.wait, // Loading states

  // Text elements
  textInput: cursor.text, // Text inputs, textareas
  textSelection: cursor.text, // Selectable text

  // Resize operations
  resizeHorizontal: cursor.ewResize, // Horizontal resize
  resizeVertical: cursor.nsResize, // Vertical resize
  resizeDiagonal: cursor.nwseResize, // Diagonal resize
  resizeColumn: cursor.colResize, // Column resize (tables)
  resizeRow: cursor.rowResize, // Row resize (tables)

  // Media elements
  zoomableIn: cursor.zoomIn, // Zoomable images (zoom in)
  zoomableOut: cursor.zoomOut, // Zoomable images (zoom out)

  // Special actions
  copyable: cursor.copy, // Copy operation
  moveable: cursor.move, // Move operation
  contextMenuTrigger: cursor.contextMenu, // Context menu trigger

  // Help
  helpTrigger: cursor.help, // Help tooltips

  // Default
  default: cursor.default, // Default cursor
  auto: cursor.auto, // Auto cursor
} as const;

export type SemanticCursor = keyof typeof semanticCursors;

// ============================================================================
// CURSOR UTILITIES (Tailwind classes)
// ============================================================================

/**
 * Tailwind CSS classes for cursors
 */
export const cursorClasses = {
  // Common cursors
  default: 'cursor-default',
  pointer: 'cursor-pointer',
  wait: 'cursor-wait',
  text: 'cursor-text',
  move: 'cursor-move',
  help: 'cursor-help',
  notAllowed: 'cursor-not-allowed',
  none: 'cursor-none',
  auto: 'cursor-auto',

  // Interactive states
  clickable: 'cursor-pointer',
  disabled: 'cursor-not-allowed',
  loading: 'cursor-wait',

  // Resize
  resizeH: 'cursor-ew-resize',
  resizeV: 'cursor-ns-resize',
  resizeNE: 'cursor-nesw-resize',
  resizeNW: 'cursor-nwse-resize',

  // Grab
  grab: 'cursor-grab',
  grabbing: 'cursor-grabbing',

  // Zoom
  zoomIn: 'cursor-zoom-in',
  zoomOut: 'cursor-zoom-out',

  // Other
  crosshair: 'cursor-crosshair',
  copy: 'cursor-copy',
  alias: 'cursor-alias',
  contextMenu: 'cursor-context-menu',
  cell: 'cursor-cell',
  verticalText: 'cursor-vertical-text',
  noDrop: 'cursor-no-drop',
  progress: 'cursor-progress',
} as const;

export type CursorClass = keyof typeof cursorClasses;

// ============================================================================
// CURSOR STATE PATTERNS
// ============================================================================

/**
 * Cursor patterns for different UI element states
 */
export const cursorStatePatterns = {
  // Button states
  button: {
    default: cursor.pointer,
    disabled: cursor.notAllowed,
    loading: cursor.wait,
  },

  // Link states
  link: {
    default: cursor.pointer,
    disabled: cursor.notAllowed,
    external: cursor.alias,
  },

  // Input states
  input: {
    default: cursor.text,
    disabled: cursor.notAllowed,
    readonly: cursor.default,
  },

  // Drag & drop states
  dragAndDrop: {
    idle: cursor.grab,
    dragging: cursor.grabbing,
    canDrop: cursor.copy,
    cannotDrop: cursor.noDrop,
  },

  // Resize states
  resize: {
    horizontal: cursor.ewResize,
    vertical: cursor.nsResize,
    diagonal: cursor.nwseResize,
    both: cursor.move,
  },

  // Media states
  media: {
    zoomable: cursor.zoomIn,
    zoomed: cursor.zoomOut,
    draggable: cursor.grab,
    dragging: cursor.grabbing,
  },

  // Table states
  table: {
    cell: cursor.cell,
    resizeColumn: cursor.colResize,
    resizeRow: cursor.rowResize,
    sortable: cursor.pointer,
  },

  // Loading states
  loading: {
    default: cursor.wait,
    progress: cursor.progress,
  },
} as const;

export type CursorStatePattern = keyof typeof cursorStatePatterns;

// ============================================================================
// COMBINED CURSOR CLASSES
// ============================================================================

/**
 * Combined cursor classes with pointer-events for common patterns
 */
export const cursorWithPointerEvents = {
  // Disabled state (no interaction)
  disabled: 'cursor-not-allowed pointer-events-none',
  disabledVisible: 'cursor-not-allowed', // Disabled but shows cursor

  // Interactive (clickable)
  interactive: 'cursor-pointer',
  interactiveDisabled: 'cursor-not-allowed',

  // Loading state
  loading: 'cursor-wait pointer-events-none',
  loadingVisible: 'cursor-wait',

  // Draggable
  draggable: 'cursor-grab active:cursor-grabbing',

  // Resizable
  resizableH: 'cursor-ew-resize',
  resizableV: 'cursor-ns-resize',

  // Hidden cursor
  hidden: 'cursor-none',

  // No interaction
  noInteraction: 'pointer-events-none',
} as const;

export type CursorWithPointerEvents = keyof typeof cursorWithPointerEvents;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get cursor value
 */
export function getCursor(key: Cursor | SemanticCursor): string {
  if (key in cursor) {
    return cursor[key as Cursor];
  }
  return semanticCursors[key as SemanticCursor];
}

/**
 * Get cursor class
 */
export function getCursorClass(key: CursorClass): string {
  return cursorClasses[key];
}

/**
 * Get cursor state pattern
 */
export function getCursorStatePattern(
  pattern: CursorStatePattern,
  state: string
): string {
  const statePattern = cursorStatePatterns[pattern];
  return statePattern[state as keyof typeof statePattern] || cursor.default;
}

/**
 * Get cursor with pointer events class
 */
export function getCursorWithPointerEvents(key: CursorWithPointerEvents): string {
  return cursorWithPointerEvents[key];
}

/**
 * Create conditional cursor class
 * @param condition - Condition to check
 * @param trueCursor - Cursor when condition is true
 * @param falseCursor - Cursor when condition is false
 */
export function conditionalCursor(
  condition: boolean,
  trueCursor: CursorClass,
  falseCursor: CursorClass = 'default'
): string {
  return condition ? cursorClasses[trueCursor] : cursorClasses[falseCursor];
}

// ============================================================================
// EXPORTS
// ============================================================================

export const cursors = {
  base: cursor,
  semantic: semanticCursors,
  classes: cursorClasses,
  states: cursorStatePatterns,
  withPointerEvents: cursorWithPointerEvents,
} as const;
