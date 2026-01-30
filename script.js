  // Sample data for crops
        let cropsData = [
            { id: 1, name: "Wheat Field A", type: "Wheat", plantingDate: "2025-10-15", harvestDate: "2026-03-20", area: 50, status: "growing", yield: 25.5 },
            { id: 2, name: "Rice Paddy B", type: "Rice", plantingDate: "2025-11-01", harvestDate: "2026-04-10", area: 30, status: "growing", yield: 18.2 },
            { id: 3, name: "Corn Field C", type: "Corn", plantingDate: "2025-09-20", harvestDate: "2026-01-15", area: 40, status: "harvested", yield: 32.8 },
            { id: 4, name: "Soybean Field D", type: "Soybean", plantingDate: "2025-10-05", harvestDate: "2026-02-28", area: 35, status: "growing", yield: 15.7 },
            { id: 5, name: "Tomato Garden", type: "Vegetables", plantingDate: "2025-12-10", harvestDate: "2026-03-05", area: 5, status: "planted", yield: 0 },
            { id: 6, name: "Apple Orchard", type: "Fruits", plantingDate: "2025-03-15", harvestDate: "2025-10-30", area: 20, status: "harvested", yield: 42.3 }
        ];
        
        // Variables for current operation
        let currentCropId = null;
        let currentPage = 'dashboard';
        
        // DOM Elements
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        const toggleSidebarBtn = document.getElementById('toggleSidebar');
        const navLinks = document.querySelectorAll('.nav-link');
        const pageTitle = document.getElementById('pageTitle');
        const pageContents = document.querySelectorAll('.page-content');
        const logoutBtn = document.getElementById('logoutBtn');
        const addCropBtn = document.getElementById('addCropBtn');
        const searchCrop = document.getElementById('searchCrop');
        const cropStatusFilter = document.getElementById('cropStatusFilter');
        const searchBtn = document.getElementById('searchBtn');
        const cropsTableBody = document.getElementById('cropsTableBody');
        const cropModal = new bootstrap.Modal(document.getElementById('cropModal'));
        const cropForm = document.getElementById('cropForm');
        const saveCropBtn = document.getElementById('saveCropBtn');
        const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
        const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
        
        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize charts
            initCharts();
            
            // Load crops table
            loadCropsTable();
            
            // Update statistics
            updateStatistics();
            
            // Setup event listeners
            setupEventListeners();
        });
        
        // Initialize charts using Chart.js
        function initCharts() {
            // Bar Chart - Yield by Crop Type
            const barCtx = document.getElementById('barChart').getContext('2d');
            new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: ['Wheat', 'Rice', 'Corn', 'Soybean', 'Vegetables', 'Fruits'],
                    datasets: [{
                        label: 'Yield (tons)',
                        data: [45, 32, 38, 28, 15, 42],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(153, 102, 255, 0.7)',
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(50, 205, 50, 0.7)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(50, 205, 50, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Tons'
                            }
                        }
                    }
                }
            });
            
            // Pie Chart - Crop Distribution
            const pieCtx = document.getElementById('pieChart').getContext('2d');
            new Chart(pieCtx, {
                type: 'pie',
                data: {
                    labels: ['Wheat', 'Rice', 'Corn', 'Soybean', 'Vegetables', 'Fruits'],
                    datasets: [{
                        data: [25, 18, 22, 15, 8, 12],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(153, 102, 255, 0.7)',
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(50, 205, 50, 0.7)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(50, 205, 50, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
            
            // Line Chart - Monthly Yield Trends
            const lineCtx = document.getElementById('lineChart').getContext('2d');
            new Chart(lineCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Yield (tons)',
                        data: [12, 15, 18, 22, 28, 32, 30, 35, 38, 40, 42, 45],
                        backgroundColor: 'rgba(46, 125, 50, 0.2)',
                        borderColor: 'rgba(46, 125, 50, 1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Tons'
                            }
                        }
                    }
                }
            });
        }
        
        // Load crops into table
        function loadCropsTable(filteredData = null) {
            const data = filteredData || cropsData;
            cropsTableBody.innerHTML = '';
            
            if (data.length === 0) {
                cropsTableBody.innerHTML = `
                    <tr>
                        <td colspan="8" class="text-center text-muted py-4">
                            No crops found. Click "Add New Crop" to add one.
                        </td>
                    </tr>
                `;
                return;
            }
            
            data.forEach(crop => {
                const row = document.createElement('tr');
                row.className = 'crop-item';
                
                // Status badge color
                let statusBadgeClass = 'bg-secondary';
                if (crop.status === 'planted') statusBadgeClass = 'bg-primary';
                if (crop.status === 'growing') statusBadgeClass = 'bg-success';
                if (crop.status === 'harvested') statusBadgeClass = 'bg-warning';
                
                row.innerHTML = `
                    <td>${crop.name}</td>
                    <td>${crop.type}</td>
                    <td>${formatDate(crop.plantingDate)}</td>
                    <td>${crop.harvestDate ? formatDate(crop.harvestDate) : 'N/A'}</td>
                    <td>${crop.area}</td>
                    <td><span class="badge ${statusBadgeClass}">${crop.status.charAt(0).toUpperCase() + crop.status.slice(1)}</span></td>
                    <td>${crop.yield || '0'}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary me-1 edit-crop" data-id="${crop.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger delete-crop" data-id="${crop.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                
                cropsTableBody.appendChild(row);
            });
            
            // Add event listeners to action buttons
            document.querySelectorAll('.edit-crop').forEach(btn => {
                btn.addEventListener('click', function() {
                    const cropId = parseInt(this.getAttribute('data-id'));
                    editCrop(cropId);
                });
            });
            
            document.querySelectorAll('.delete-crop').forEach(btn => {
                btn.addEventListener('click', function() {
                    const cropId = parseInt(this.getAttribute('data-id'));
                    showDeleteModal(cropId);
                });
            });
        }
        
        // Update statistics
        function updateStatistics() {
            document.getElementById('totalCrops').textContent = cropsData.length;
            document.getElementById('totalFarms').textContent = '8';
            document.getElementById('totalFarmers').textContent = '24';
            
            // Calculate total yield
            const totalYield = cropsData.reduce((sum, crop) => sum + (crop.yield || 0), 0);
            document.getElementById('totalYield').textContent = totalYield.toFixed(1);
        }
        
        // Setup event listeners
        function setupEventListeners() {
            // Toggle sidebar
            toggleSidebarBtn.addEventListener('click', function() {
                sidebar.classList.toggle('collapsed');
                mainContent.classList.toggle('expanded');
            });
            
            // Navigation links
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Remove active class from all links
                    navLinks.forEach(l => l.classList.remove('active'));
                    
                    // Add active class to clicked link
                    this.classList.add('active');
                    
                    // Get page to show
                    const page = this.getAttribute('data-page');
                    currentPage = page;
                    
                    // Update page title
                    pageTitle.textContent = this.querySelector('span').textContent;
                    
                    // Hide all pages
                    pageContents.forEach(p => p.classList.add('d-none'));
                    
                    // Show selected page
                    document.getElementById(`${page}Page`).classList.remove('d-none');
                });
            });
            
            // Logout button
            logoutBtn.addEventListener('click', function() {
                if (confirm('Are you sure you want to logout?')) {
                    alert('Logged out successfully!');
                    // In a real app, this would redirect to login page
                }
            });
            
            // Add crop button
            addCropBtn.addEventListener('click', function() {
                showCropModal();
            });
            
            // Search crop
            searchBtn.addEventListener('click', filterCrops);
            searchCrop.addEventListener('keyup', filterCrops);
            cropStatusFilter.addEventListener('change', filterCrops);
            
            // Save crop
            saveCropBtn.addEventListener('click', saveCrop);
            
            // Confirm delete
            confirmDeleteBtn.addEventListener('click', deleteCrop);
            
            // Form validation
            const formInputs = cropForm.querySelectorAll('input, select');
            formInputs.forEach(input => {
                input.addEventListener('input', function() {
                    if (this.checkValidity()) {
                        this.classList.remove('is-invalid');
                    }
                });
            });
        }
        
        // Filter crops based on search and filter
        function filterCrops() {
            const searchTerm = searchCrop.value.toLowerCase();
            const statusFilter = cropStatusFilter.value;
            
            let filtered = cropsData.filter(crop => {
                const matchesSearch = crop.name.toLowerCase().includes(searchTerm) || 
                                     crop.type.toLowerCase().includes(searchTerm);
                const matchesStatus = statusFilter === 'all' || crop.status === statusFilter;
                
                return matchesSearch && matchesStatus;
            });
            
            loadCropsTable(filtered);
        }
        
        // Show crop modal for adding/editing
        function showCropModal(crop = null) {
            // Reset form
            cropForm.reset();
            
            // Remove validation classes
            const formInputs = cropForm.querySelectorAll('input, select');
            formInputs.forEach(input => {
                input.classList.remove('is-invalid');
            });
            
            if (crop) {
                // Edit mode
                document.getElementById('cropModalLabel').textContent = 'Edit Crop';
                document.getElementById('cropId').value = crop.id;
                document.getElementById('cropName').value = crop.name;
                document.getElementById('cropType').value = crop.type;
                document.getElementById('plantingDate').value = crop.plantingDate;
                document.getElementById('harvestDate').value = crop.harvestDate || '';
                document.getElementById('area').value = crop.area;
                document.getElementById('expectedYield').value = crop.yield || '';
                document.getElementById('status').value = crop.status;
                
                currentCropId = crop.id;
            } else {
                // Add mode
                document.getElementById('cropModalLabel').textContent = 'Add New Crop';
                document.getElementById('cropId').value = '';
                currentCropId = null;
            }
            
            cropModal.show();
        }
        
        // Edit crop
        function editCrop(id) {
            const crop = cropsData.find(c => c.id === id);
            if (crop) {
                showCropModal(crop);
            }
        }
        
        // Save crop (add or update)
        function saveCrop() {
            // Validate form
            if (!cropForm.checkValidity()) {
                // Add validation classes to invalid fields
                const formInputs = cropForm.querySelectorAll('input, select');
                formInputs.forEach(input => {
                    if (!input.checkValidity()) {
                        input.classList.add('is-invalid');
                    }
                });
                return;
            }
            
            const cropData = {
                id: currentCropId || cropsData.length > 0 ? Math.max(...cropsData.map(c => c.id)) + 1 : 1,
                name: document.getElementById('cropName').value,
                type: document.getElementById('cropType').value,
                plantingDate: document.getElementById('plantingDate').value,
                harvestDate: document.getElementById('harvestDate').value || null,
                area: parseFloat(document.getElementById('area').value),
                status: document.getElementById('status').value,
                yield: document.getElementById('expectedYield').value ? parseFloat(document.getElementById('expectedYield').value) : 0
            };
            
            if (currentCropId) {
                // Update existing crop
                const index = cropsData.findIndex(c => c.id === currentCropId);
                if (index !== -1) {
                    cropsData[index] = cropData;
                }
            } else {
                // Add new crop
                cropsData.push(cropData);
            }
            
            // Update UI
            loadCropsTable();
            updateStatistics();
            
            // Close modal
            cropModal.hide();
            
            // Show success message
            alert(`Crop ${currentCropId ? 'updated' : 'added'} successfully!`);
        }
        
        // Show delete confirmation modal
        function showDeleteModal(id) {
            currentCropId = id;
            deleteModal.show();
        }
        
        // Delete crop
        function deleteCrop() {
            cropsData = cropsData.filter(crop => crop.id !== currentCropId);
            
            // Update UI
            loadCropsTable();
            updateStatistics();
            
            // Close modal
            deleteModal.hide();
            
            // Show success message
            alert('Crop deleted successfully!');
        }
        
        // Format date for display
        function formatDate(dateString) {
            if (!dateString) return 'N/A';
            
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }