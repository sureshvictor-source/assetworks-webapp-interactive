'use client';

/**
 * AssetWorks Design System - Complete Interactive Demo
 *
 * Comprehensive showcase of ALL design system elements with full interactivity
 */

import { useState } from 'react';
import { buttonVariants, badgeVariants, cardVariants, cardHeaderVariants } from '@/lib/component-variants';

export default function DesignSystemDemo() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  const [accordionOpen, setAccordionOpen] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(45);
  const [switchValue, setSwitchValue] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">🎨 AssetWorks Design System</h1>
              <p className="text-sm text-muted-foreground mt-1">Complete Interactive Demo</p>
            </div>
            <div className="flex gap-2">
              <span className={badgeVariants({ variant: 'success', size: 'lg' })}>v1.0.0</span>
              <span className={badgeVariants({ variant: 'outline', size: 'lg' })}>Production Ready</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">

        {/* ============================================ */}
        {/* SECTION: Colors - Complete Palette */}
        {/* ============================================ */}
        <section id="colors">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold">Colors</h2>
            <span className={badgeVariants({ variant: 'secondary' })}>100+ tokens</span>
          </div>

          {/* Primary Brand Colors */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Brand Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={cardVariants({ variant: 'default' })}>
                <div className="p-4">
                  <div className="h-24 rounded-lg bg-primary mb-3 flex items-center justify-center text-primary-foreground font-semibold">
                    Primary
                  </div>
                  <p className="text-sm font-mono">#1B2951</p>
                </div>
              </div>
              <div className={cardVariants({ variant: 'default' })}>
                <div className="p-4">
                  <div className="h-24 rounded-lg bg-secondary mb-3 flex items-center justify-center text-secondary-foreground font-semibold">
                    Secondary
                  </div>
                  <p className="text-sm font-mono">#6C7B95</p>
                </div>
              </div>
              <div className={cardVariants({ variant: 'default' })}>
                <div className="p-4">
                  <div className="h-24 rounded-lg bg-accent mb-3 flex items-center justify-center text-accent-foreground font-semibold">
                    Accent
                  </div>
                  <p className="text-sm font-mono">#405D80</p>
                </div>
              </div>
              <div className={cardVariants({ variant: 'default' })}>
                <div className="p-4">
                  <div className="h-24 rounded-lg bg-muted mb-3 flex items-center justify-center text-muted-foreground font-semibold">
                    Muted
                  </div>
                  <p className="text-sm font-mono">#F8F9FA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Semantic Status Colors */}
          <div>
            <h3 className="text-xl font-medium mb-4">Status Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={cardVariants({ variant: 'success' })}>
                <div className="p-4">
                  <div className="h-24 rounded-lg bg-success mb-3 flex items-center justify-center text-white font-semibold">
                    Success
                  </div>
                  <p className="text-sm font-mono">#10B981</p>
                </div>
              </div>
              <div className={cardVariants({ variant: 'warning' })}>
                <div className="p-4">
                  <div className="h-24 rounded-lg bg-warning mb-3 flex items-center justify-center text-white font-semibold">
                    Warning
                  </div>
                  <p className="text-sm font-mono">#F59E0B</p>
                </div>
              </div>
              <div className={cardVariants({ variant: 'error' })}>
                <div className="p-4">
                  <div className="h-24 rounded-lg bg-error mb-3 flex items-center justify-center text-white font-semibold">
                    Error
                  </div>
                  <p className="text-sm font-mono">#EF4444</p>
                </div>
              </div>
              <div className={cardVariants({ variant: 'info' })}>
                <div className="p-4">
                  <div className="h-24 rounded-lg bg-info mb-3 flex items-center justify-center text-white font-semibold">
                    Info
                  </div>
                  <p className="text-sm font-mono">#3B82F6</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: Buttons - All Variants & States */}
        {/* ============================================ */}
        <section id="buttons">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold">Buttons</h2>
            <span className={badgeVariants({ variant: 'secondary' })}>9 variants × 7 sizes</span>
          </div>

          <div className={cardVariants({ variant: 'default', padding: 'lg' })}>
            <div className="space-y-8">
              {/* Sizes */}
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  Button Sizes
                  <span className={badgeVariants({ variant: 'outline', size: 'sm' })}>Responsive</span>
                </h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <button className={buttonVariants({ size: 'sm' })}>Small</button>
                  <button className={buttonVariants({ size: 'default' })}>Default</button>
                  <button className={buttonVariants({ size: 'lg' })}>Large</button>
                  <button className={buttonVariants({ size: 'xl' })}>Extra Large</button>
                  <button className={buttonVariants({ size: 'icon' })}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* All Variants */}
              <div>
                <h3 className="text-lg font-medium mb-4">Button Variants</h3>
                <div className="flex flex-wrap gap-3">
                  <button className={buttonVariants({ variant: 'default' })}>Primary</button>
                  <button className={buttonVariants({ variant: 'secondary' })}>Secondary</button>
                  <button className={buttonVariants({ variant: 'outline' })}>Outline</button>
                  <button className={buttonVariants({ variant: 'ghost' })}>Ghost</button>
                  <button className={buttonVariants({ variant: 'link' })}>Link</button>
                  <button className={buttonVariants({ variant: 'destructive' })}>Destructive</button>
                  <button className={buttonVariants({ variant: 'success' })}>Success</button>
                  <button className={buttonVariants({ variant: 'warning' })}>Warning</button>
                  <button className={buttonVariants({ variant: 'info' })}>Info</button>
                </div>
              </div>

              {/* Button States */}
              <div>
                <h3 className="text-lg font-medium mb-4">Button States</h3>
                <div className="flex flex-wrap gap-3">
                  <button className={buttonVariants({ variant: 'default' })}>Default</button>
                  <button className={buttonVariants({ variant: 'default' })} disabled>Disabled</button>
                  <button className={buttonVariants({ variant: 'default', loading: true })} onClick={handleLoadingDemo}>
                    {isLoading && (
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {isLoading ? 'Loading...' : 'Click to Load'}
                  </button>
                </div>
              </div>

              {/* Full Width */}
              <div>
                <h3 className="text-lg font-medium mb-4">Full Width</h3>
                <button className={buttonVariants({ variant: 'default', fullWidth: true })}>
                  Full Width Button
                </button>
              </div>

              {/* Buttons with Icons */}
              <div>
                <h3 className="text-lg font-medium mb-4">Buttons with Icons</h3>
                <div className="flex flex-wrap gap-3">
                  <button className={buttonVariants({ variant: 'default' })}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Item
                  </button>
                  <button className={buttonVariants({ variant: 'destructive' })}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                  <button className={buttonVariants({ variant: 'success' })}>
                    Save
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: Badges - All Variants */}
        {/* ============================================ */}
        <section id="badges">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold">Badges</h2>
            <span className={badgeVariants({ variant: 'secondary' })}>9 variants × 3 sizes</span>
          </div>

          <div className={cardVariants({ variant: 'default', padding: 'lg' })}>
            <div className="space-y-6">
              {/* All Variants */}
              <div>
                <h3 className="text-lg font-medium mb-4">Badge Variants</h3>
                <div className="flex flex-wrap gap-3">
                  <span className={badgeVariants({ variant: 'default' })}>Default</span>
                  <span className={badgeVariants({ variant: 'secondary' })}>Secondary</span>
                  <span className={badgeVariants({ variant: 'outline' })}>Outline</span>
                  <span className={badgeVariants({ variant: 'ghost' })}>Ghost</span>
                  <span className={badgeVariants({ variant: 'destructive' })}>Destructive</span>
                  <span className={badgeVariants({ variant: 'success' })}>Success</span>
                  <span className={badgeVariants({ variant: 'warning' })}>Warning</span>
                  <span className={badgeVariants({ variant: 'info' })}>Info</span>
                  <span className={badgeVariants({ variant: 'idle' })}>Idle</span>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="text-lg font-medium mb-4">Badge Sizes</h3>
                <div className="flex flex-wrap gap-3 items-center">
                  <span className={badgeVariants({ variant: 'default', size: 'sm' })}>Small</span>
                  <span className={badgeVariants({ variant: 'default', size: 'default' })}>Default</span>
                  <span className={badgeVariants({ variant: 'default', size: 'lg' })}>Large</span>
                </div>
              </div>

              {/* Status Use Cases */}
              <div>
                <h3 className="text-lg font-medium mb-4">Status Examples</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">User Status:</span>
                    <span className={badgeVariants({ variant: 'success' })}>Active</span>
                    <span className={badgeVariants({ variant: 'idle' })}>Inactive</span>
                    <span className={badgeVariants({ variant: 'warning' })}>Pending</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Order Status:</span>
                    <span className={badgeVariants({ variant: 'info' })}>Processing</span>
                    <span className={badgeVariants({ variant: 'warning' })}>Shipped</span>
                    <span className={badgeVariants({ variant: 'success' })}>Delivered</span>
                    <span className={badgeVariants({ variant: 'destructive' })}>Cancelled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Priority:</span>
                    <span className={badgeVariants({ variant: 'destructive' })}>High</span>
                    <span className={badgeVariants({ variant: 'warning' })}>Medium</span>
                    <span className={badgeVariants({ variant: 'secondary' })}>Low</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: Cards - All Variants */}
        {/* ============================================ */}
        <section id="cards">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold">Cards</h2>
            <span className={badgeVariants({ variant: 'secondary' })}>8 variants</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Default Card */}
            <div className={cardVariants({ variant: 'default' })}>
              <div className={cardHeaderVariants({ border: true })}>
                <h3 className="text-lg font-semibold">Default Card</h3>
                <p className="text-sm text-muted-foreground">Standard card style</p>
              </div>
              <div className="p-6 pt-0">
                <p className="text-sm">This is a default card with bordered header.</p>
                <div className="flex gap-2 mt-4">
                  <button className={buttonVariants({ variant: 'default', size: 'sm' })}>Action</button>
                  <button className={buttonVariants({ variant: 'outline', size: 'sm' })}>Cancel</button>
                </div>
              </div>
            </div>

            {/* Outlined Card */}
            <div className={cardVariants({ variant: 'outlined' })}>
              <div className={cardHeaderVariants()}>
                <h3 className="text-lg font-semibold">Outlined Card</h3>
                <p className="text-sm text-muted-foreground">Thicker border</p>
              </div>
              <div className="p-6 pt-0">
                <p className="text-sm">Card with a 2px border for emphasis.</p>
              </div>
            </div>

            {/* Elevated Card */}
            <div className={cardVariants({ variant: 'elevated' })}>
              <div className={cardHeaderVariants()}>
                <h3 className="text-lg font-semibold">Elevated Card</h3>
                <p className="text-sm text-muted-foreground">Larger shadow</p>
              </div>
              <div className="p-6 pt-0">
                <p className="text-sm">Card with enhanced shadow for depth.</p>
              </div>
            </div>

            {/* Hoverable Card */}
            <div className={cardVariants({ variant: 'default', hoverable: true, clickable: true })}>
              <div className={cardHeaderVariants()}>
                <h3 className="text-lg font-semibold">Interactive Card</h3>
                <p className="text-sm text-muted-foreground">Hover & click me!</p>
              </div>
              <div className="p-6 pt-0">
                <p className="text-sm">This card responds to hover and click interactions.</p>
              </div>
            </div>

            {/* Ghost Card */}
            <div className={cardVariants({ variant: 'ghost' })}>
              <div className={cardHeaderVariants()}>
                <h3 className="text-lg font-semibold">Ghost Card</h3>
                <p className="text-sm text-muted-foreground">Minimal styling</p>
              </div>
              <div className="p-6 pt-0">
                <p className="text-sm">Transparent card for subtle layouts.</p>
              </div>
            </div>

            {/* Primary Accent Card */}
            <div className={cardVariants({ variant: 'primary' })}>
              <div className={cardHeaderVariants()}>
                <h3 className="text-lg font-semibold">Primary Card</h3>
                <p className="text-sm text-muted-foreground">Brand accent</p>
              </div>
              <div className="p-6 pt-0">
                <p className="text-sm">Card with primary color accent.</p>
              </div>
            </div>

            {/* Success Card */}
            <div className={cardVariants({ variant: 'success' })}>
              <div className={cardHeaderVariants()}>
                <h3 className="text-lg font-semibold">Success Card</h3>
                <p className="text-sm text-muted-foreground">Positive message</p>
              </div>
              <div className="p-6 pt-0">
                <p className="text-sm">✅ Operation completed successfully!</p>
              </div>
            </div>

            {/* Warning Card */}
            <div className={cardVariants({ variant: 'warning' })}>
              <div className={cardHeaderVariants()}>
                <h3 className="text-lg font-semibold">Warning Card</h3>
                <p className="text-sm text-muted-foreground">Caution notice</p>
              </div>
              <div className="p-6 pt-0">
                <p className="text-sm">⚠️ Please review before proceeding.</p>
              </div>
            </div>

            {/* Error Card */}
            <div className={cardVariants({ variant: 'error' })}>
              <div className={cardHeaderVariants()}>
                <h3 className="text-lg font-semibold">Error Card</h3>
                <p className="text-sm text-muted-foreground">Error message</p>
              </div>
              <div className="p-6 pt-0">
                <p className="text-sm">❌ An error occurred. Please try again.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: Form Elements */}
        {/* ============================================ */}
        <section id="forms">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold">Form Elements</h2>
            <span className={badgeVariants({ variant: 'secondary' })}>Interactive</span>
          </div>

          <div className={cardVariants({ variant: 'default', padding: 'lg' })}>
            <div className="space-y-6">
              {/* Text Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Text Input</label>
                  <input
                    type="text"
                    placeholder="Enter text..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Input</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password Input</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Number Input</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
              </div>

              {/* Textarea */}
              <div>
                <label className="block text-sm font-medium mb-2">Textarea</label>
                <textarea
                  placeholder="Enter your message..."
                  rows={4}
                  className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              {/* Select */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Select</label>
                  <select className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option>Choose an option</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Disabled Input</label>
                  <input
                    type="text"
                    placeholder="Disabled field"
                    disabled
                    className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Checkbox & Radio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-3">Checkboxes</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-ring" />
                      <span className="text-sm">Option 1</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-ring" defaultChecked />
                      <span className="text-sm">Option 2 (checked)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer opacity-50">
                      <input type="checkbox" className="w-4 h-4 rounded border-border" disabled />
                      <span className="text-sm">Option 3 (disabled)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Radio Buttons</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="radio" className="w-4 h-4 border-border text-primary focus:ring-2 focus:ring-ring" />
                      <span className="text-sm">Choice A</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="radio" className="w-4 h-4 border-border text-primary focus:ring-2 focus:ring-ring" defaultChecked />
                      <span className="text-sm">Choice B (selected)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer opacity-50">
                      <input type="radio" name="radio" className="w-4 h-4 border-border" disabled />
                      <span className="text-sm">Choice C (disabled)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Switch Toggle */}
              <div>
                <label className="block text-sm font-medium mb-3">Toggle Switch</label>
                <button
                  onClick={() => setSwitchValue(!switchValue)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    switchValue ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      switchValue ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="ml-3 text-sm">{switchValue ? 'Enabled' : 'Disabled'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: Loading States */}
        {/* ============================================ */}
        <section id="loading">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold">Loading States</h2>
            <span className={badgeVariants({ variant: 'secondary' })}>Animated</span>
          </div>

          <div className={cardVariants({ variant: 'default', padding: 'lg' })}>
            <div className="space-y-8">
              {/* Spinners */}
              <div>
                <h3 className="text-lg font-medium mb-4">Spinners</h3>
                <div className="flex items-center gap-6">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
                  <div className="animate-spin h-8 w-8 border-4 border-success border-t-transparent rounded-full" />
                  <div className="animate-spin h-8 w-8 border-4 border-warning border-t-transparent rounded-full" />
                  <div className="animate-spin h-8 w-8 border-4 border-error border-t-transparent rounded-full" />
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium">Progress Bar</h3>
                  <span className="text-sm text-muted-foreground">{progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    className={buttonVariants({ variant: 'outline', size: 'sm' })}
                    onClick={() => setProgress(Math.max(0, progress - 10))}
                  >
                    -10%
                  </button>
                  <button
                    className={buttonVariants({ variant: 'outline', size: 'sm' })}
                    onClick={() => setProgress(Math.min(100, progress + 10))}
                  >
                    +10%
                  </button>
                </div>
              </div>

              {/* Skeleton Loaders */}
              <div>
                <h3 className="text-lg font-medium mb-4">Skeleton Loaders</h3>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
                  <div className="h-4 bg-muted rounded animate-pulse w-4/6" />
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="h-20 bg-muted rounded animate-pulse" />
                    <div className="h-20 bg-muted rounded animate-pulse" />
                    <div className="h-20 bg-muted rounded animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Pulse Animation */}
              <div>
                <h3 className="text-lg font-medium mb-4">Pulse Animation</h3>
                <div className="flex gap-4">
                  <div className="h-16 w-16 bg-primary rounded-full animate-pulse" />
                  <div className="h-16 w-16 bg-success rounded-lg animate-pulse" />
                  <div className="h-16 w-16 bg-warning rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: Animations */}
        {/* ============================================ */}
        <section id="animations">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold">Animations</h2>
            <span className={badgeVariants({ variant: 'secondary' })}>CSS & Tailwind</span>
          </div>

          <div className={cardVariants({ variant: 'default', padding: 'lg' })}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Fade In */}
              <div className="text-center">
                <div className="h-32 bg-primary/10 rounded-lg flex items-center justify-center mb-3 animate-fade-in">
                  <span className="text-lg font-medium">Fade In</span>
                </div>
                <code className="text-xs bg-muted px-2 py-1 rounded">animate-fade-in</code>
              </div>

              {/* Slide In Right */}
              <div className="text-center">
                <div className="h-32 bg-success/10 rounded-lg flex items-center justify-center mb-3 animate-slide-in-right">
                  <span className="text-lg font-medium">Slide Right</span>
                </div>
                <code className="text-xs bg-muted px-2 py-1 rounded">animate-slide-in-right</code>
              </div>

              {/* Scale In */}
              <div className="text-center">
                <div className="h-32 bg-warning/10 rounded-lg flex items-center justify-center mb-3 animate-scale-in">
                  <span className="text-lg font-medium">Scale In</span>
                </div>
                <code className="text-xs bg-muted px-2 py-1 rounded">animate-scale-in</code>
              </div>

              {/* Bounce */}
              <div className="text-center">
                <div className="h-32 bg-info/10 rounded-lg flex items-center justify-center mb-3">
                  <div className="h-12 w-12 bg-info rounded-full animate-bounce" />
                </div>
                <code className="text-xs bg-muted px-2 py-1 rounded">animate-bounce</code>
              </div>

              {/* Spin */}
              <div className="text-center">
                <div className="h-32 bg-error/10 rounded-lg flex items-center justify-center mb-3">
                  <div className="h-12 w-12 border-4 border-error border-t-transparent rounded-full animate-spin" />
                </div>
                <code className="text-xs bg-muted px-2 py-1 rounded">animate-spin</code>
              </div>

              {/* Ping */}
              <div className="text-center">
                <div className="h-32 bg-secondary/10 rounded-lg flex items-center justify-center mb-3">
                  <div className="relative">
                    <div className="h-12 w-12 bg-secondary rounded-full" />
                    <div className="absolute inset-0 h-12 w-12 bg-secondary rounded-full animate-ping opacity-75" />
                  </div>
                </div>
                <code className="text-xs bg-muted px-2 py-1 rounded">animate-ping</code>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: Typography */}
        {/* ============================================ */}
        <section id="typography">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold">Typography</h2>
            <span className={badgeVariants({ variant: 'secondary' })}>Euclid Circular A</span>
          </div>

          <div className={cardVariants({ variant: 'default', padding: 'lg' })}>
            <div className="space-y-6">
              <div>
                <h1>Heading 1 - 48px / 700 weight</h1>
                <code className="text-xs text-muted-foreground">font-size: 48px; line-height: 56px;</code>
              </div>
              <div>
                <h2>Heading 2 - 36px / 600 weight</h2>
                <code className="text-xs text-muted-foreground">font-size: 36px; line-height: 44px;</code>
              </div>
              <div>
                <h3>Heading 3 - 28px / 500 weight</h3>
                <code className="text-xs text-muted-foreground">font-size: 28px; line-height: 36px;</code>
              </div>
              <div>
                <h4>Heading 4 - 24px / 500 weight</h4>
                <code className="text-xs text-muted-foreground">font-size: 24px; line-height: 32px;</code>
              </div>
              <div>
                <h5>Heading 5 - 18px / 600 weight</h5>
                <code className="text-xs text-muted-foreground">font-size: 18px; line-height: 24px;</code>
              </div>
              <div>
                <h6>Heading 6 - 16px / 500 weight</h6>
                <code className="text-xs text-muted-foreground">font-size: 16px; line-height: 22px;</code>
              </div>
              <div>
                <p className="text-base">Body text - 16px / 400 weight / 24px line-height. This is the default body text style used throughout the application for readable paragraphs and content.</p>
                <code className="text-xs text-muted-foreground">font-size: 16px; line-height: 24px;</code>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Small muted text - 14px / 400 weight. Used for secondary information, captions, and helper text.</p>
                <code className="text-xs text-muted-foreground">font-size: 14px; line-height: 20px;</code>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: Tabs */}
        {/* ============================================ */}
        <section id="tabs">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold">Tabs</h2>
            <span className={badgeVariants({ variant: 'secondary' })}>Interactive</span>
          </div>

          <div className={cardVariants({ variant: 'default', padding: 'lg' })}>
            <div className="border-b border-border mb-6">
              <div className="flex gap-4">
                {['tab1', 'tab2', 'tab3'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    {tab === 'tab1' && 'Overview'}
                    {tab === 'tab2' && 'Details'}
                    {tab === 'tab3' && 'Settings'}
                  </button>
                ))}
              </div>
            </div>

            <div className="py-4">
              {activeTab === 'tab1' && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-lg font-medium">Overview Content</h3>
                  <p className="text-muted-foreground">This is the content for the Overview tab. Tabs provide a clean way to organize content into separate views.</p>
                  <div className="flex gap-2">
                    <span className={badgeVariants({ variant: 'success' })}>Feature 1</span>
                    <span className={badgeVariants({ variant: 'info' })}>Feature 2</span>
                    <span className={badgeVariants({ variant: 'warning' })}>Beta</span>
                  </div>
                </div>
              )}
              {activeTab === 'tab2' && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-lg font-medium">Details Content</h3>
                  <p className="text-muted-foreground">Detailed information appears in this tab. Each tab can contain any type of content including forms, tables, or other components.</p>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Detail item 1</li>
                    <li>Detail item 2</li>
                    <li>Detail item 3</li>
                  </ul>
                </div>
              )}
              {activeTab === 'tab3' && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-lg font-medium">Settings Content</h3>
                  <p className="text-muted-foreground">Configuration options and settings can be placed in dedicated tabs for better organization.</p>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 rounded border-border text-primary" defaultChecked />
                      <span className="text-sm">Enable notifications</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 rounded border-border text-primary" />
                      <span className="text-sm">Auto-save changes</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: Accordion */}
        {/* ============================================ */}
        <section id="accordion">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold">Accordion</h2>
            <span className={badgeVariants({ variant: 'secondary' })}>Collapsible</span>
          </div>

          <div className={cardVariants({ variant: 'default', padding: 'none' })}>
            {['item1', 'item2', 'item3'].map((item, index) => (
              <div key={item} className={index !== 0 ? 'border-t border-border' : ''}>
                <button
                  onClick={() => setAccordionOpen(accordionOpen === item ? null : item)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium">Accordion Item {index + 1}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${accordionOpen === item ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {accordionOpen === item && (
                  <div className="px-6 pb-4 text-sm text-muted-foreground animate-fade-in">
                    This is the content for accordion item {index + 1}. Accordions are great for organizing content that doesn't need to be visible all at once. Users can expand and collapse sections as needed.
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: Modal */}
        {/* ============================================ */}
        <section id="modal">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold">Modal Dialog</h2>
            <span className={badgeVariants({ variant: 'secondary' })}>Overlay</span>
          </div>

          <div className={cardVariants({ variant: 'default', padding: 'lg' })}>
            <p className="text-muted-foreground mb-4">Click the button below to open a modal dialog.</p>
            <button
              onClick={() => setShowModal(true)}
              className={buttonVariants({ variant: 'default' })}
            >
              Open Modal
            </button>
          </div>

          {/* Modal Overlay */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                onClick={() => setShowModal(false)}
              />

              {/* Modal Content */}
              <div className="relative z-10 w-full max-w-lg mx-4 animate-scale-in">
                <div className={cardVariants({ variant: 'elevated', padding: 'lg' })}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">Modal Title</h3>
                      <p className="text-sm text-muted-foreground mt-1">This is a modal dialog example</p>
                    </div>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground">
                      This is the modal content. Modals are great for focused interactions that require user attention. They overlay the main content and prevent interaction with the page until dismissed.
                    </p>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => setShowModal(false)}
                      className={buttonVariants({ variant: 'outline' })}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className={buttonVariants({ variant: 'default' })}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ============================================ */}
        {/* SECTION: Tables */}
        {/* ============================================ */}
        <section id="tables">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold">Tables</h2>
            <span className={badgeVariants({ variant: 'secondary' })}>Data Display</span>
          </div>

          <div className={cardVariants({ variant: 'default', padding: 'none' })}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">John Doe</div>
                      <div className="text-sm text-muted-foreground">john@example.com</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={badgeVariants({ variant: 'success' })}>Active</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">Admin</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className={buttonVariants({ variant: 'ghost', size: 'sm' })}>Edit</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">Jane Smith</div>
                      <div className="text-sm text-muted-foreground">jane@example.com</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={badgeVariants({ variant: 'warning' })}>Pending</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">User</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className={buttonVariants({ variant: 'ghost', size: 'sm' })}>Edit</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">Bob Johnson</div>
                      <div className="text-sm text-muted-foreground">bob@example.com</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={badgeVariants({ variant: 'idle' })}>Inactive</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">User</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className={buttonVariants({ variant: 'ghost', size: 'sm' })}>Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: Code Example & Implementation */}
        {/* ============================================ */}
        <section id="usage">
          <h2 className="text-3xl font-semibold mb-6">✅ Usage Example</h2>

          <div className={cardVariants({ variant: 'success', padding: 'lg' })}>
            <h3 className="text-xl font-semibold mb-4">How to Use This Design System</h3>
            <pre className="bg-muted p-6 rounded-lg overflow-x-auto text-sm mb-4">
              <code>{`import { buttonVariants, badgeVariants, cardVariants } from '@/lib/component-variants';

function MyComponent() {
  return (
    <div className={cardVariants({ variant: 'elevated', hoverable: true })}>
      <h2 className="text-primary text-2xl font-bold mb-4">
        Welcome to AssetWorks
      </h2>

      <div className="flex gap-2 mb-4">
        <span className={badgeVariants({ variant: 'success' })}>Active</span>
        <span className={badgeVariants({ variant: 'info' })}>New</span>
      </div>

      <button className={buttonVariants({ variant: 'default', size: 'lg' })}>
        Get Started
      </button>
    </div>
  );
}`}</code>
            </pre>

            <div className="flex gap-2 flex-wrap">
              <span className={badgeVariants({ variant: 'success' })}>Type-Safe</span>
              <span className={badgeVariants({ variant: 'info' })}>Tailwind Integrated</span>
              <span className={badgeVariants({ variant: 'warning' })}>Customizable</span>
              <span className={badgeVariants({ variant: 'outline' })}>Production Ready</span>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3">AssetWorks Design System</h3>
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
              <p className="text-sm text-muted-foreground mt-1">Production Ready ✅</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Documentation</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>→ /lib/design-system/README.md</li>
                <li>→ DESIGN_SYSTEM_QUICKSTART.md</li>
                <li>→ DESIGN_SYSTEM_COMPLETE.md</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ 200+ Design Tokens</li>
                <li>✓ Type-Safe Components</li>
                <li>✓ Full Accessibility</li>
                <li>✓ Dark Mode Ready</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>Built with ❤️ for consistent, accessible, beautiful user interfaces</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
