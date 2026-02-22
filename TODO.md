### Phase 1: Core Essentials (v1.0.0)

- [x] Typography – Elastic component for text handling. Handles responsive sizing, font families, and semantic HTML tags (h1-h6, p, strong, muted, italic, underlined).
- [x] Button – Various variants: Primary, Secondary, Danger, Confirm, Info, Ghost and Animate.
- [x] Input – Text input with support for prefix/suffix icons (startAdornment / endAdornment).
- [x] Card – Content wrapper, ideally with sub-components like CardHeader, CardBody, and CardFooter.
- [x] Modal (Dialog) – Overlay for critical actions. Includes triggers, header, content, buttons, close action, footer and sizing (center/drawer).
- [x] Sidebar - Collapsible side menu for navigation with hamburger menu for mobile.
  - [ ] Allow Tooltip on `SidebarItem` hover after creating `Tooltip` Component
- [x] Spinner – Loading indicators: Orbital, Classic, Dots and Page Loader.
- [x] Alert – Static feedback messages: Error, Warning, Info, Success, No Data.
- [ ] ~Container / Grid – Layout primitives. A simple system to constrain width (Container) or handle flexbox/grid layouts (Row/Col or Stack).~

### Phase 2: Form & Navigation Expansion

- [x] Checkbox – Standard boolean selection.
- [x] Switch – Toggle switch (alternative to checkbox).
- [x] Label - Simple label for form elements.
- [x] Radio Group – Single selection from a set.
- [x] Textarea – Multi-line text input.
- [x] Select – Dropdown selection, ideally with Multi-select support.
  - [] SelectGroup - Component for grouping items inside SelectContent.
- [x] Tabs – Switching between views with animation. Support for horizontal/vertical alignment.
- [x] Breadcrumbs – For navigation hierarchy and URL destructurization.
- [ ] Dropdown Menu – Action menu lists (often used inside buttons).
- [x] Divider (Separator) – Visual separation of content.
- [ ] Icon Wrapper – A standardized component to render icons (SVG) with consistent sizing and coloring props.

### Phase 3: Feedback & Data Display

- [ ] Skeleton – Loading placeholder with shine/pulse animation and color customization.
- [ ] Badge – Small count/status indicator, possibly with icon support.
- [ ] Tag (Chip) – Similar to Badge but interactive (clickable, deletable). Often used for filters.
- [ ] Tooltip – Text hint on hover.
- [ ] Popover – Like a tooltip, but rich content (HTML) that appears on click/hover.
- [ ] Toast (Notification) – Temporary status messages (snackbars) appearing at the edge of the screen.
- [ ] Status Indicator – Pulsing dot/circle with customizable status colors (Online, Busy, Offline).
- [ ] Accordion – Collapsible content panels. Support for Single (one open at a time) or Multi mode.
- [ ] Progress Bar – Linear indicator (dynamic for loading or static for capacity).
- [ ] Table – Data grid with styling and "copy value" functionality.
- [ ] Empty State – A component to display when data is missing (e.g., "No items found") with an illustration and a CTA button.
- [ ] KBD - A simple component for displaying keyboard shortcuts

### Phase 4: Advanced Components (Complex Logic)

- [ ] Autocomplete (Whisper Input) – Input with suggestions based on regex or string matching.
- [ ] Datepicker – Calendar input for date selection.
- [ ] Calendar View – Static or interactive calendar for displaying events/dates.
- [ ] Range Slider – Number slider with two handles (min/max) or single handle, with stepping and custom labels.
- [ ] Stepper (Multi-step progress) – Steps connected by lines, dynamically updating based on state.
- [ ] Sortable List – List with Drag & Drop reordering capabilities.
- [ ] Pagination (Pager) – Logic and UI for navigating large datasets.
- [ ] Code Block – Syntax highlighting and formatting for code snippets.
- [ ] Drawer – A sidebar panel that slides in from the left or right (often used instead of Modals on mobile).
- [ ] Avatar – Profile picture component with fallbacks (initials or generic icon) if the image fails to load.
- [ ] ImageDialog - Dialog component for displaying images with toolbar options (zoom, save, copy, etc.)
- [ ] ToolPanel - For selectiong tools/funcitons on hover with stacking ability.
- [ ] Carousel - Component for dispalying items with auto-scroll or manual scroll.

### Other: TODO and overall improvements

- [ ] asChild - Create asChild property for some elements to be more flexible for developers
- [ ] Keyboard Accessibility - Add support for arrows navigation, keyboard loop, etc...
- [ ] Change hover/select color of inputs based on new CSS variable.
