### Phase 1: Core Essentials (v1.0.0)

- [x] Typography – Elastic component for text handling. Handles responsive sizing, font families, and semantic HTML tags (h1-h6, p, strong, muted, italic, underlined).
- [x] Button – Various variants: Primary, Secondary, Danger, Confirm, Info, Ghost and Animate.
  - [x] Change Button scaling on hover (or remove it)
  - [ ] Popup explanation for disabled Button (when defined)
  - [x] Loading state of Button (disable + Spinner)
  - [x] Rain drop animation on clicking variant
  - [x] Change variant styles and names
  - [ ] Fix ripple animation
- [x] Input – Text input with support for prefix/suffix icons (startAdornment / endAdornment).
- [x] Card – Content wrapper, ideally with sub-components like CardHeader, CardBody, and CardFooter.
- [x] Modal (Dialog) – Overlay for critical actions. Includes triggers, header, content, buttons, close action, footer and sizing (center/drawer).
  - [ ] Improve Dialog visuals?
- [x] Sidebar - Collapsible side menu for navigation with hamburger menu for mobile.
  - [ ] Allow Tooltip on `SidebarItem` hover after creating `Tooltip` Component.
  - [x] Make groups expendable + add animations upon clicking.
- [x] Spinner – Loading indicators: Orbital, Classic, Dots and Page Loader.
- [x] Alert – Static feedback messages: Error, Warning, Info, Success, No Data.
- [x] Layout primitives - A simple system to constrain width (Container) or handle flexbox layouts (Group or Stack).\
  - [ ] Add Grid layout support

### Phase 2: Form & Navigation Expansion

- [x] Checkbox – Standard boolean selection.
- [x] Switch – Toggle switch (alternative to checkbox).
- [x] Label - Simple label for form elements.
- [x] Radio Group – Single selection from a set.
- [x] Textarea – Multi-line text input.
- [x] Select – Dropdown selection, ideally with Multi-select support.
  - [x] `SelectGroup` - Component for grouping items inside `SelectContent`.
  - [x] Improve hover styling
- [x] Tabs – Switching between views with animation. Support for horizontal/vertical alignment.
  - [x] Change to Activity component
  - [x] Add support for navigation between tabs with arrows + style focus mode
- [x] Breadcrumbs – For navigation hierarchy and URL destructurization.
- [x] Dropdown Menu – Action menu lists (often used inside buttons).
- [x] Divider (Separator) – Visual separation of content.
- [ ] Icon Wrapper – A standardized component to render icons (SVG) with consistent sizing and coloring props.

### Phase 3: Feedback & Data Display

- [x] Skeleton – Loading placeholder with shine/pulse animation and color customization.
- [x] Badge – Small count/status indicator, possibly with icon support.
- [x] Tag (Chip) – Similar to Badge but interactive (clickable, deletable). Often used for filters.
- [x] Tooltip – Text hint on hover.
  - [x] Keep the Tooltip visible while hovering TooltipContent
- [x] Popover – Like a tooltip, but rich content (HTML) that appears on click/hover.
- [x] Toast (Notification) – Temporary status messages (snackbars) appearing at the edge of the screen.
- [x] Status Indicator – Pulsing dot/circle with customizable status colors (Online, Busy, Offline).
- [x] Accordion – Collapsible content panels. Support for Single (one open at a time) or Multi mode.
- [x] Progress Bar – Linear indicator (dynamic for loading or static for capacity).
- [x] Table – Data grid with styling and "copy value" functionality.
- [ ] Empty State – A component to display when data is missing (e.g., "No items found") with an illustration and a CTA button.
- [x] Callout - Provides presentation of content in a visually distinct manner.
- [x] KBD - A simple component for displaying keyboard shortcuts.

### Phase 4: Advanced Components (Complex Logic)

- [ ] Autocomplete (Whisper Input) – Input with suggestions based on regex or string matching.
- [ ] Datepicker – Calendar input for date selection.
- [ ] Calendar View – Static or interactive calendar for displaying events/dates.
- [ ] Range Slider – Number slider with two handles (min/max) or single handle, with stepping and custom labels.
- [ ] Stepper (Multi-step progress) – Steps connected by lines, dynamically updating based on state.
- [ ] Sortable List – List with Drag & Drop reordering capabilities.
- [ ] Pagination (Pager) – Logic and UI for navigating large datasets.
- [ ] Code Block – Syntax highlighting and formatting for code snippets.
- [ ] Avatar – Profile picture component with fallbacks (initials or generic icon) if the image fails to load.
- [ ] ImageDialog - Dialog component for displaying images with toolbar options (zoom, save, copy, etc.)
- [ ] ToolPanel - For selectiong tools/funcitons on hover with stacking ability.
- [ ] Carousel - Component for dispalying items with auto-scroll or manual scroll.

### Other: TODO and overall improvements

- [x] asChild - Create asChild property for some elements to be more flexible for developers.
  - With use of new Slot Component
- [ ] Keyboard Accessibility - Add support for ~~arrows navigation~~, keyboard loop, etc...
- [x] Change hover/select color of inputs based on new CSS variable.
- [x] Create and use hooks for closing popovers on Clicking Outside/Escape.
- [x] Add custom animations to the Tailwind config.
- [x] Change CSS color variables to RGB/HSL format
  - [ ] Apply new HSL values to Components with bad contrast and ugly hover states like: ~~Badge~~, _?Button?_, _?Tabs?_
- [x] Change the structure of the Storybook folders
