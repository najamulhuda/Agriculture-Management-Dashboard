# 🌾 Agriculture Management Dashboard

A modern, responsive web application for managing agricultural operations, crops, and farm data. Built with vanilla JavaScript, Bootstrap 5, and Chart.js.

## Live Preview
https://najamulhuda.github.io/Agriculture-Management-Dashboard/


## ✨ Features

- **📊 Interactive Dashboard**: Real-time statistics with animated stat cards
- **🌱 Crop Management**: Full CRUD operations (Create, Read, Update, Delete)
- **📈 Data Visualization**: Beautiful charts using Chart.js (Bar, Pie, Line)
- **🔍 Advanced Filtering**: Search and filter crops by name, type, and status
- **📱 Responsive Design**: Mobile-first design that works on all devices
- **🎨 Modern UI**: Clean interface with Bootstrap 5 and Font Awesome icons
- **🔔 Notifications**: Real-time notification system
- **⚙️ Settings Panel**: Customizable application settings
- **🎯 Form Validation**: Client-side validation for data integrity
- **🌐 Collapsible Sidebar**: Space-saving navigation with toggle functionality

## 🎯 Demo

The application includes:
- Dashboard with 4 stat cards (Total Crops, Total Farms, Total Farmers, Total Yield)
- 3 interactive charts (Bar, Pie, Line)
- Crops management page with full CRUD functionality
- Farmers and Reports pages (placeholders)
- Settings page with configuration options

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom styles with CSS variables
- **JavaScript (ES5/ES6)**: Vanilla JavaScript for functionality
- **Bootstrap 5.3.2**: Responsive framework
- **Chart.js 4.4.0**: Data visualization
- **Font Awesome 6.4.0**: Icon library

## 📁 Project Structure

```
agriculture-dashboard/
│
├── index.html          # Main HTML file
├── style.css           # Custom CSS styles
├── script.js           # JavaScript functionality
├── images/
│   └── myAvatar.avif   # User avatar image
└── README.md           # Project documentation
```

## 🚀 Installation

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs locally!

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/najamulhuda/agriculture-dashboard.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd agriculture-dashboard
   ```

3. **Add user avatar image**
   - Create an `images` folder in the project root
   - Add your avatar image as `myAvatar.avif` (or update the path in `index.html` line 34)

4. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local development server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Python 2
     python -m SimpleHTTPServer 8000
     
     # Using Node.js (with http-server)
     npx http-server -p 8000
     ```
   - Then visit `http://localhost:8000` in your browser

## 💻 Usage

### Dashboard Navigation

The sidebar provides navigation to different sections:
- **Dashboard**: Overview with statistics and charts
- **Crops**: Manage all crop data
- **Farmers**: Manage farmer information (placeholder)
- **Reports**: View reports and analytics (placeholder)
- **Settings**: Configure application settings

### Managing Crops

1. **Add a New Crop**
   - Navigate to the Crops page
   - Click "Add New Crop" button
   - Fill in the required fields:
     - Crop Name (required)
     - Crop Type (required)
     - Planting Date (required)
     - Harvest Date (optional)
     - Area in acres (required)
     - Expected Yield in tons (optional)
     - Status (required)
   - Click "Save Crop"

2. **Edit an Existing Crop**
   - Click the edit icon (pencil) on any crop row
   - Modify the fields as needed
   - Click "Save Crop"

3. **Delete a Crop**
   - Click the delete icon (trash) on any crop row
   - Confirm the deletion in the modal
   - Click "Delete"

4. **Search and Filter**
   - Use the search box to find crops by name or type
   - Use the status dropdown to filter by crop status (All, Planted, Growing, Harvested)

### Sidebar Controls

- **Desktop**: Click the hamburger icon to collapse/expand the sidebar
- **Mobile**: Click the top-left menu button to open the sidebar

## 🎨 Features Overview

### 1. Dashboard Statistics

Four main statistics displayed:
- **Total Crops**: Dynamic count of all crops
- **Total Farms**: Number of farms (currently static: 8)
- **Total Farmers**: Number of registered farmers (currently static: 24)
- **Total Yield**: Sum of all crop yields in tons

### 2. Charts

Three chart types for data visualization:

- **Bar Chart**: Yield by crop type
- **Pie Chart**: Distribution of crop areas
- **Line Chart**: Yearly yield trends

### 3. Responsive Design

- **Mobile** (< 768px): Sidebar becomes an overlay with backdrop
- **Tablet** (768px - 1024px): Optimized layout
- **Desktop** (> 1024px): Full sidebar with collapsible option

### 4. Form Validation

Real-time validation for:
- Required fields
- Date formats
- Numeric inputs (area, yield)
- Dropdown selections

## 📱 Browser Support

| Browser | Supported Versions |
|---------|-------------------|
| Chrome  | Last 2 versions   |
| Firefox | Last 2 versions   |
| Safari  | Last 2 versions   |
| Edge    | Last 2 versions   |

## 🔧 Customization

### Changing Colors

Edit CSS variables in `style.css`:
```css
:root {
    --sidebar-width: 250px;
    --sidebar-collapsed: 70px;
    --green-dark: #2e7d32;
    --green-mid:  #4caf50;
}
```

### Modifying Initial Data

Edit the `cropsData` array in `script.js`:
```javascript
let cropsData = [
    { id:1, name:"Your Crop", type:"Wheat", ... },
    // Add more crops here
];
```

### Adding New Pages

1. Add a navigation link in `index.html` sidebar
2. Create a new page content section with class `page-content`
3. Add corresponding event listener in `script.js`

## 🐛 Known Issues

- Avatar image path needs to be updated based on your local setup
- Static data for Total Farms and Total Farmers
- Farmers and Reports pages are placeholders

## 🔮 Future Enhancements

- [ ] Backend integration with REST API
- [ ] Database storage (MongoDB/PostgreSQL)
- [ ] User authentication and authorization
- [ ] Weather API integration
- [ ] PDF report generation
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Export data to CSV/Excel
- [ ] Advanced analytics and predictions

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Najam ul Huda**
- Role: Farm Manager
- GitHub: [@najamulhuda](https://github.com/najamulhuda)
- Email: najamulhuda791@gmail.com

## 🙏 Acknowledgments

- Bootstrap team for the amazing framework
- Chart.js for beautiful data visualizations
- Font Awesome for comprehensive icon library
- All contributors who help improve this project

## 📞 Contact

For questions, suggestions, or issues:
- Open an issue on GitHub
- Email: najamulhuda791@gmail.com


---

<div align="center">

Made with ❤️ for Agriculture

**[⬆ back to top](#-agriculture-management-dashboard)**

</div>
