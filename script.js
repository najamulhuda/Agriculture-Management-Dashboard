// Data ────────────────────────────────────────
let cropsData = [
    { id:1, name:"Wheat Field A",   type:"Wheat",      plantingDate:"2025-10-15", harvestDate:"2026-03-20", area:50, status:"growing",   yield:25.5 },
    { id:2, name:"Rice Paddy B",    type:"Rice",       plantingDate:"2025-11-01", harvestDate:"2026-04-10", area:30, status:"growing",   yield:18.2 },
    { id:3, name:"Corn Field C",    type:"Corn",       plantingDate:"2025-09-20", harvestDate:"2026-01-15", area:40, status:"harvested", yield:32.8 },
    { id:4, name:"Soybean Field D", type:"Soybean",    plantingDate:"2025-10-05", harvestDate:"2026-02-28", area:35, status:"growing",   yield:15.7 },
    { id:5, name:"Tomato Garden",   type:"Vegetables", plantingDate:"2025-12-10", harvestDate:"2026-03-05", area:5,  status:"planted",  yield:0    },
    { id:6, name:"Apple Orchard",   type:"Fruits",     plantingDate:"2025-03-15", harvestDate:"2025-10-30", area:20, status:"harvested", yield:42.3 }
];

let currentCropId = null;
let currentPage   = 'dashboard';

// ─── DOM Selection ───
const sidebar          = document.getElementById('sidebar');
const sidebarBackdrop  = document.getElementById('sidebarBackdrop');
const mainContent      = document.getElementById('mainContent');
const toggleSidebarBtn = document.getElementById('toggleSidebar');
const mobileMenuBtn    = document.getElementById('mobileMenuBtn');
const navLinks         = document.querySelectorAll('.sidebar .nav-link');
const pageTitle        = document.getElementById('pageTitle');
const pageContents     = document.querySelectorAll('.page-content');
const logoutBtn        = document.getElementById('logoutBtn');
const addCropBtn       = document.getElementById('addCropBtn');
const searchCrop       = document.getElementById('searchCrop');
const cropStatusFilter = document.getElementById('cropStatusFilter');
const searchBtn        = document.getElementById('searchBtn');
const cropsTableBody   = document.getElementById('cropsTableBody');
const cropForm         = document.getElementById('cropForm');
const saveCropBtn      = document.getElementById('saveCropBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

// Bootstrap Modal instances
const cropModal   = new bootstrap.Modal(document.getElementById('cropModal'));
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));

// Init ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function(){
    initCharts();
    loadCropsTable();
    updateStatistics();
    setupEventListeners();
});

/* CHARTS */
function initCharts(){
    const labels = ['Wheat','Rice','Corn','Soybean','Vegetables','Fruits'];
    const bg = [
        'rgba(54,162,235,0.7)','rgba(75,192,192,0.7)','rgba(255,206,86,0.7)',
        'rgba(153,102,255,0.7)','rgba(255,99,132,0.7)','rgba(50,205,50,0.7)'
    ];
    const bd = bg.map(function(c){ return c.replace('0.7','1'); });

    // Bar
    new Chart(document.getElementById('barChart').getContext('2d'),{
        type:'bar',
        data:{ labels:labels, datasets:[{ label:'Yield (tons)', data:[45,32,38,28,15,42], backgroundColor:bg, borderColor:bd, borderWidth:1 }]},
        options:{ responsive:true, maintainAspectRatio:false, scales:{ y:{ beginAtZero:true, title:{ display:true, text:'Tons' }}}}
    });

    // Pie
    new Chart(document.getElementById('pieChart').getContext('2d'),{
        type:'pie',
        data:{ labels:labels, datasets:[{ data:[25,18,22,15,8,12], backgroundColor:bg, borderColor:bd, borderWidth:1 }]},
        options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'bottom' }}}
    });

    // Line
    new Chart(document.getElementById('lineChart').getContext('2d'),{
        type:'line',
        data:{
            labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            datasets:[{ label:'Yield (tons)', data:[12,15,18,22,28,32,30,35,38,40,42,45],
                backgroundColor:'rgba(46,125,50,0.2)', borderColor:'rgba(46,125,50,1)',
                borderWidth:2, fill:true, tension:0.4 }]
        },
        options:{ responsive:true, maintainAspectRatio:false, scales:{ y:{ beginAtZero:true, title:{ display:true, text:'Tons' }}}}
    });
}

/* CROPS TABLE */
function loadCropsTable(filteredData){
    var data = filteredData || cropsData;
    cropsTableBody.innerHTML = '';

    if(data.length === 0){
        cropsTableBody.innerHTML =
            '<tr><td colspan="8" class="text-center text-muted py-5">' +
            '<i class="fas fa-seedling fa-3x text-muted mb-2 d-block"></i>' +
            'No crops found. Click "Add New Crop" to add one.</td></tr>';
        return;
    }

    data.forEach(function(crop){
        var row = document.createElement('tr');
        row.classList.add('crop-row');

        var badgeClass = 'bg-secondary';
        if(crop.status === 'planted')   badgeClass = 'bg-primary';
        if(crop.status === 'growing')   badgeClass = 'bg-success';
        if(crop.status === 'harvested') badgeClass = 'bg-warning text-dark';

        row.innerHTML =
            '<td>'+ crop.name +'</td>'+
            '<td>'+ crop.type +'</td>'+
            '<td>'+ formatDate(crop.plantingDate) +'</td>'+
            '<td>'+ (crop.harvestDate ? formatDate(crop.harvestDate) : 'N/A') +'</td>'+
            '<td>'+ crop.area +'</td>'+
            '<td><span class="badge '+ badgeClass +'">'+ capitalize(crop.status) +'</span></td>'+
            '<td>'+ (crop.yield || '0') +'</td>'+
            '<td>'+
                '<button class="btn btn-sm btn-outline-primary me-1 edit-crop" data-id="'+ crop.id +'"><i class="fas fa-edit"></i></button>'+
                '<button class="btn btn-sm btn-outline-danger delete-crop" data-id="'+ crop.id +'"><i class="fas fa-trash"></i></button>'+
            '</td>';
        cropsTableBody.appendChild(row);
    });

    // Bind buttons
    cropsTableBody.querySelectorAll('.edit-crop').forEach(function(btn){
        btn.addEventListener('click', function(){ editCrop(parseInt(this.getAttribute('data-id'))); });
    });
    cropsTableBody.querySelectorAll('.delete-crop').forEach(function(btn){
        btn.addEventListener('click', function(){ showDeleteModal(parseInt(this.getAttribute('data-id'))); });
    });
}

/* STATISTICS */
function updateStatistics(){
    document.getElementById('totalCrops').textContent   = cropsData.length;
    document.getElementById('totalFarms').textContent   = '8';
    document.getElementById('totalFarmers').textContent = '24';
    var total = cropsData.reduce(function(sum,c){ return sum + (c.yield||0); }, 0);
    document.getElementById('totalYield').textContent   = total.toFixed(1);
}

/* EVENT LISTENERS */
function setupEventListeners(){
    // Desktop sidebar toggle
    toggleSidebarBtn.addEventListener('click', function(){
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
    });

    // Mobile hamburger
    mobileMenuBtn.addEventListener('click', function(){
        sidebar.classList.add('open');
        sidebarBackdrop.classList.add('show');
    });
    sidebarBackdrop.addEventListener('click', closeMobileSidebar);

    // Nav links
    navLinks.forEach(function(link){
        link.addEventListener('click', function(e){
            e.preventDefault();
            navLinks.forEach(function(l){ l.classList.remove('active'); });
            this.classList.add('active');

            var page = this.getAttribute('data-page');
            currentPage = page;
            pageTitle.textContent = this.querySelector('.link-text').textContent;

            pageContents.forEach(function(p){ p.classList.add('d-none'); });
            document.getElementById(page+'Page').classList.remove('d-none');

            if(window.innerWidth <= 768) closeMobileSidebar();
        });
    });

    // Logout
    logoutBtn.addEventListener('click', function(){
        if(confirm('Are you sure you want to logout?')) alert('Logged out successfully!');
    });

    // Crops
    addCropBtn.addEventListener('click', function(){ showCropModal(); });
    searchBtn.addEventListener('click', filterCrops);
    searchCrop.addEventListener('keyup', filterCrops);
    cropStatusFilter.addEventListener('change', filterCrops);

    // Modal actions
    saveCropBtn.addEventListener('click', saveCrop);
    confirmDeleteBtn.addEventListener('click', deleteCrop);

    // Live validation feedback
    cropForm.querySelectorAll('input, select').forEach(function(input){
        input.addEventListener('input', function(){
            if(this.checkValidity()) this.classList.remove('is-invalid');
        });
    });
}

function closeMobileSidebar(){
    sidebar.classList.remove('open');
    sidebarBackdrop.classList.remove('show');
}

/* FILTER */
function filterCrops(){
    var term   = searchCrop.value.toLowerCase();
    var status = cropStatusFilter.value;
    var filtered = cropsData.filter(function(crop){
        var matchText   = crop.name.toLowerCase().includes(term) || crop.type.toLowerCase().includes(term);
        var matchStatus = (status === 'all') || (crop.status === status);
        return matchText && matchStatus;
    });
    loadCropsTable(filtered);
}

/* CROP MODAL  (Add / Edit) */
function showCropModal(crop){
    cropForm.reset();
    cropForm.querySelectorAll('input, select').forEach(function(el){ el.classList.remove('is-invalid'); });

    if(crop){
        document.getElementById('cropModalLabel').textContent = 'Edit Crop';
        document.getElementById('cropId').value        = crop.id;
        document.getElementById('cropName').value      = crop.name;
        document.getElementById('cropType').value      = crop.type;
        document.getElementById('plantingDate').value  = crop.plantingDate;
        document.getElementById('harvestDate').value   = crop.harvestDate || '';
        document.getElementById('area').value          = crop.area;
        document.getElementById('expectedYield').value = crop.yield || '';
        document.getElementById('status').value        = crop.status;
        currentCropId = crop.id;
    } else {
        document.getElementById('cropModalLabel').textContent = 'Add New Crop';
        currentCropId = null;
    }
    cropModal.show();
}

function editCrop(id){
    var crop = cropsData.find(function(c){ return c.id === id; });
    if(crop) showCropModal(crop);
}

/* SAVE CROP */
function saveCrop(){
    if(!cropForm.checkValidity()){
        cropForm.querySelectorAll('input, select').forEach(function(input){
            if(!input.checkValidity()) input.classList.add('is-invalid');
        });
        return;
    }

    var cropData = {
        id: currentCropId
            ? currentCropId
            : (cropsData.length > 0 ? Math.max.apply(null, cropsData.map(function(c){ return c.id; })) + 1 : 1),
        name:         document.getElementById('cropName').value,
        type:         document.getElementById('cropType').value,
        plantingDate: document.getElementById('plantingDate').value,
        harvestDate:  document.getElementById('harvestDate').value || null,
        area:         parseFloat(document.getElementById('area').value),
        status:       document.getElementById('status').value,
        yield:        document.getElementById('expectedYield').value ? parseFloat(document.getElementById('expectedYield').value) : 0
    };

    if(currentCropId){
        var index = cropsData.findIndex(function(c){ return c.id === currentCropId; });
        if(index !== -1) cropsData[index] = cropData;
    } else {
        cropsData.push(cropData);
    }

    loadCropsTable();
    updateStatistics();
    cropModal.hide();
    alert('Crop ' + (currentCropId ? 'updated' : 'added') + ' successfully!');
}

/* DELETE CROP */
function showDeleteModal(id){
    currentCropId = id;
    deleteModal.show();
}

function deleteCrop(){
    cropsData = cropsData.filter(function(c){ return c.id !== currentCropId; });
    loadCropsTable();
    updateStatistics();
    deleteModal.hide();
    alert('Crop deleted successfully!');
}

/*HELPERS */
function formatDate(dateString){
    if(!dateString) return 'N/A';
    var date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US',{ year:'numeric', month:'short', day:'numeric' });
}

function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}