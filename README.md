# Admin Dashboard

A modern, responsive admin dashboard built with HTML, Tailwind CSS, SCSS, and JavaScript. This dashboard provides a clean interface for managing users and other administrative tasks.

## Features

### 🎨 **Modern Design**
- Clean, professional interface with a dark sidebar
- Purple gradient header with search functionality
- Responsive design that works on all devices
- Smooth animations and hover effects

### 🧭 **Navigation**
- Left sidebar with navigation icons
- Active state highlighting
- Dynamic page title updates
- Icon-based navigation system

### 👥 **User Management**
- User table with sorting capabilities
- Search and filter functionality
- Pagination with configurable entries per page
- Action buttons for each user:
  - Edit user information
  - Change password
  - Block/Unblock user
  - Refresh user data

### 🔍 **Search & Filter**
- Real-time search in the users table
- AWB search functionality in the header
- Filter users by email, name, role, or phone number

### 📱 **Responsive Design**
- Mobile-friendly layout
- Adaptive sidebar for smaller screens
- Responsive table controls
- Touch-friendly interface

## File Structure

```
dashboard2/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   ├── style.scss      # SCSS source file
│   │   └── style.css       # Compiled CSS file
│   └── js/
│       └── main.js         # JavaScript functionality
└── README.md               # This file
```

## Technologies Used

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework
- **SCSS** - CSS preprocessor with variables and mixins
- **JavaScript (ES6+)** - Modern JavaScript with classes
- **Font Awesome** - Icon library

## Getting Started

1. **Open the dashboard**
   - Simply open `index.html` in your web browser
   - No build process required - uses CDN for Tailwind CSS

2. **Navigate the interface**
   - Use the left sidebar to switch between different sections
   - The Users section is currently active (orange highlight)
   - Click on navigation icons to see page titles change

3. **Manage users**
   - View user information in the table
   - Use the search bar to filter users
   - Change the number of entries displayed per page
   - Use action buttons to perform operations on users

## Customization

### Colors
The dashboard uses CSS custom properties for easy color customization:

```css
:root {
  --primary-color: #7c3aed;    /* Purple */
  --secondary-color: #ea580c;  /* Orange */
  --danger-color: #dc2626;     /* Red */
  --success-color: #16a34a;    /* Green */
}
```

### Adding New Sections
To add new sections to the navigation:

1. Add a new icon link in the sidebar navigation
2. Update the `handleNavigation` method in `main.js`
3. Add corresponding content sections

### Styling
- Modify `style.scss` for custom styles
- Compile to `style.css` for production use
- Use Tailwind utility classes for quick styling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Features to Implement

- [ ] User edit modal/form
- [ ] Password change functionality
- [ ] Add new user form
- [ ] Data persistence (localStorage/API)
- [ ] Export functionality
- [ ] Advanced filtering options
- [ ] User role management
- [ ] Activity logging

## Contributing

Feel free to enhance this dashboard by:
- Adding new features
- Improving the UI/UX
- Optimizing performance
- Adding more interactive elements

## License

This project is open source and available under the MIT License. # dashboard
