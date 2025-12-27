// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme or prefer-color-scheme
const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply saved theme
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

// Theme toggle event
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
    
    // Update all charts with new theme colors
    updateChartColors();
});

// Resume Button
document.getElementById('resumeBtn').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Resume download functionality would be implemented here. For now, please email wilsonsamuelnda@gmail.com for a copy.');
});

// Chart.js Configuration
let charts = [];

// Theme-based colors
function getChartColors() {
    const isDark = document.body.classList.contains('dark-theme');
    
    return {
        primary: isDark ? '#3b82f6' : '#2563eb',
        secondary: isDark ? '#8b5cf6' : '#7c3aed',
        grid: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        text: isDark ? '#f9fafb' : '#1f2937',
        bg: isDark ? '#1f2937' : '#ffffff'
    };
}

// Update chart colors when theme changes
function updateChartColors() {
    const colors = getChartColors();
    
    charts.forEach(chart => {
        if (chart) {
            chart.options.scales.x.grid.color = colors.grid;
            chart.options.scales.y.grid.color = colors.grid;
            chart.options.scales.x.ticks.color = colors.text;
            chart.options.scales.y.ticks.color = colors.text;
            chart.update();
        }
    });
}

// Hero Chart - Forecast Accuracy Over Time
function createHeroChart() {
    const ctx = document.getElementById('heroChart').getContext('2d');
    const colors = getChartColors();
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Forecast Accuracy',
                    data: [82, 85, 87, 88, 90, 92, 91, 93, 95, 96, 94, 97],
                    borderColor: colors.primary,
                    backgroundColor: colors.primary + '20',
                    borderWidth: 
