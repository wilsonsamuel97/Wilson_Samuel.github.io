// Theme Toggle
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

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    if (!event.target.closest('.navbar') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// Resume Button
document.getElementById('resumeBtn').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Resume download functionality would be implemented here. For now, please email wilsonsamuelnda@gmail.com for a copy.');
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            navLinks.classList.remove('active');
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Chart.js Configuration
let charts = [];

// Theme-based colors
function getChartColors() {
    const isDark = document.body.classList.contains('dark-theme');
    
    return {
        primary: isDark ? '#3b82f6' : '#2563eb',
        secondary: isDark ? '#8b5cf6' : '#7c3aed',
        success: isDark ? '#10b981' : '#10b981',
        grid: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        text: isDark ? '#f8fafc' : '#1e293b',
        bg: isDark ? '#1e293b' : '#ffffff'
    };
}

// Update chart colors when theme changes
function updateChartColors() {
    const colors = getChartColors();
    
    charts.forEach(chart => {
        if (chart) {
            // Update grid and text colors
            if (chart.options.scales) {
                if (chart.options.scales.x) {
                    chart.options.scales.x.grid.color = colors.grid;
                    if (chart.options.scales.x.ticks) {
                        chart.options.scales.x.ticks.color = colors.text;
                    }
                }
                if (chart.options.scales.y) {
                    chart.options.scales.y.grid.color = colors.grid;
                    if (chart.options.scales.y.ticks) {
                        chart.options.scales.y.ticks.color = colors.text;
                    }
                }
            }
            
            // Update dataset colors
            chart.data.datasets.forEach(dataset => {
                if (dataset.borderColor === '#2563eb' || dataset.borderColor === '#3b82f6') {
                    dataset.borderColor = colors.primary;
                    dataset.backgroundColor = colors.primary + '20';
                } else if (dataset.borderColor === '#7c3aed' || dataset.borderColor === '#8b5cf6') {
                    dataset.borderColor = colors.secondary;
                    dataset.backgroundColor = colors.secondary + '20';
                }
            });
            
            chart.update();
        }
    });
}

// Initialize Charts
function initCharts() {
    const colors = getChartColors();
    
    // Hero Chart - Forecast Accuracy
    const heroCtx = document.getElementById('heroChart');
    if (heroCtx) {
        const heroChart = new Chart(heroCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Forecast Accuracy',
                    data: [82, 85, 87, 88, 90, 92, 91, 93, 95, 96, 94, 97],
                    borderColor: colors.primary,
                    backgroundColor: colors.primary + '20',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: colors.grid
                        },
                        ticks: {
                            color: colors.text
                        }
                    },
                    y: {
                        min: 80,
                        max: 100,
                        grid: {
                            color: colors.grid
                        },
                        ticks: {
                            color: colors.text,
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
        charts.push(heroChart);
    }
    
    // Project Charts
    const projectCharts = [
        {
            id: 'projectChart1',
            data: [18, 22, 20, 17, 15, 13, 12, 11, 10, 9, 8, 7],
            label: 'AUX Reduction %',
            color: colors.primary
        },
        {
            id: 'projectChart2',
            data: [85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96],
            label: 'Forecast Accuracy %',
            color: colors.secondary
        },
        {
            id: 'projectChart3',
            data: [100, 98, 96, 95, 94, 93, 92, 91, 90, 91, 90, 91],
            label: 'AHT (seconds)',
            color: colors.primary
        },
        {
            id: 'projectChart4',
            data: [0, 0.5, 1.0, 1.2, 1.5, 1.8, 2.0, 2.1, 2.2, 2.2, 2.2, 2.2],
            label: 'Savings ($M)',
            color: colors.success
        }
    ];
    
    projectCharts.forEach(chartConfig => {
        const ctx = document.getElementById(chartConfig.id);
        if (ctx) {
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    datasets: [{
                        label: chartConfig.label,
                        data: chartConfig.data,
                        borderColor: chartConfig.color,
                        backgroundColor: chartConfig.color + '20',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: colors.grid
                            },
                            ticks: {
                                color: colors.text
                            }
                        },
                        y: {
                            grid: {
                                color: colors.grid
                            },
                            ticks: {
                                color: colors.text
                            }
                        }
                    }
                }
            });
            charts.push(chart);
        }
    });
    
    // Mini Chart for Hero (if exists)
    const miniCtx = document.getElementById('miniChart');
    if (miniCtx) {
        const miniChart = new Chart(miniCtx, {
            type: 'doughnut',
            data: {
                labels: ['Accuracy', 'Variance'],
                datasets: [{
                    data: [97, 3],
                    backgroundColor: [colors.primary, colors.grid],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
        charts.push(miniChart);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.timeline-item, .project-card, .category, .award').forEach(el => {
        observer.observe(el);
    });
});
