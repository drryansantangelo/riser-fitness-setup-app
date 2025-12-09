# Riser Fitness Music Setup Wizard

A single-page, responsive setup wizard that helps Riser Fitness locations quickly configure their music system with Soundtrack.

## Overview

This wizard guides location managers through a 3-step process:
1. **Identify Current Setup** - How they currently play music (Sonos, Mobile, Computer, Hardware Box)
2. **Follow-up Details** - Specific device/platform information
3. **Setup Instructions** - Tailored step-by-step guide with video tutorials

## Features

- 🎯 **Path-based Instructions** - Different setup flows for Sonos, Mobile, Computer, and Hardware users
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎨 **Riser Fitness Branding** - Custom styling with brand colors
- ♿ **Accessible** - Keyboard navigation and ARIA support
- 📹 **Video Placeholders** - Ready for embedded tutorial videos
- 📞 **Support Integration** - Contact options in footer

## Files

```
├── index.html      # Main HTML structure
├── styles.css      # All CSS styling (scoped to .riser-music-setup)
├── wizard.js       # JavaScript logic and state management
└── README.md       # This file
```

## Setup Paths

### Sonos System
- Mobile App → Instructions for adding Soundtrack to Sonos via mobile
- Desktop App → Instructions for adding Soundtrack to Sonos via desktop

### Mobile Device
- iPhone/iPad (iOS) → App Store download + setup
- Android Phone/Tablet → Google Play download + setup
- Amazon Fire Tablet → Amazon Appstore download + setup

### Computer
- Windows PC → Desktop app or web player setup
- Mac → Desktop app or web player setup

### Hardware Streaming Box
- PlayerOne Device → Order and setup instructions

## Placeholders to Replace

Before deploying, replace these placeholders with actual values:

### Support Contact
- `{RISER_SUPPORT_PHONE}` - Support phone number
- `{RISER_SUPPORT_EMAIL}` - Support email address

### URLs
- `{SOUNDTRACK_LOGIN_URL}` - Link to credentials/login info
- `{REMOTE_APP_IOS_URL}` - Soundtrack Remote iOS App Store link
- `{REMOTE_APP_ANDROID_URL}` - Soundtrack Remote Google Play link

### Video URLs
- `{SONOS_MOBILE_VIDEO_URL}` - Sonos mobile setup video
- `{SONOS_DESKTOP_VIDEO_URL}` - Sonos desktop setup video
- `{MOBILE_PLAYER_VIDEO_URL}` - Mobile player setup video
- `{DESKTOP_PLAYER_VIDEO_URL}` - Desktop player setup video
- `{PLAYERONE_VIDEO_URL}` - PlayerOne setup video

## WordPress Integration

The wizard is scoped using the `.riser-music-setup` class to avoid CSS conflicts:

1. Copy all three files to your WordPress theme or uploads directory
2. Enqueue the CSS and JS files, or embed them directly
3. Add the HTML content to a page template or use a shortcode

### Example Shortcode Implementation

```php
function riser_music_wizard_shortcode() {
    ob_start();
    include get_template_directory() . '/riser-wizard/index.html';
    return ob_get_clean();
}
add_shortcode('riser_music_wizard', 'riser_music_wizard_shortcode');
```

### Embedding Directly

```html
<link rel="stylesheet" href="/path/to/styles.css">
<div class="riser-music-setup">
    <!-- Copy contents from index.html -->
</div>
<script src="/path/to/wizard.js"></script>
```

## Customization

### Colors
Edit CSS variables in `styles.css`:

```css
.riser-music-setup {
    --riser-red: #E63946;
    --riser-red-dark: #C62B38;
    --riser-black: #1A1A1A;
    /* ... more variables */
}
```

### Fonts
The wizard uses:
- **Bebas Neue** - Display headings
- **Montserrat** - Body text

These are loaded from Google Fonts in `index.html`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 8+)

## Development

To test locally:

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx http-server -p 8080

# Using PHP
php -S localhost:8080
```

Then open `http://localhost:8080` in your browser.

## License

Proprietary - Riser Fitness / Dynamic Media Music




