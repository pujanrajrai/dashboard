// Sidebar functionality and interactive features
class SidebarManager {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.sidebarOverlay = document.getElementById('sidebarOverlay');
        this.hamburgerBtn = document.getElementById('hamburgerBtn');
        this.closeSidebarBtn = document.getElementById('closeSidebarBtn');
        this.isOpen = false;
        this.isExpanded = false;
        this.isDesktop = window.innerWidth >= 1024;

        this.init();
    }

    init() {
        // Bind event listeners
        this.hamburgerBtn?.addEventListener('click', () => this.toggleSidebar());
        this.closeSidebarBtn?.addEventListener('click', () => this.closeSidebar());
        this.sidebarOverlay?.addEventListener('click', () => this.closeSidebar());

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeSidebar();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());

        // Desktop hover functionality
        if (this.isDesktop) {
            this.sidebar?.addEventListener('mouseenter', () => this.expandSidebar());
            this.sidebar?.addEventListener('mouseleave', () => this.collapseSidebar());
        }

        // Initialize sidebar state
        this.handleResize();

        // Add click handlers for navigation items
        this.initNavigation();

        // Initialize dropdown functionality
        this.initDropdowns();

        // Initialize user interactions
        this.initUserInteractions();

        // Add tooltips for collapsed sidebar
        this.initTooltips();
    }

    toggleSidebar() {
        if (this.isDesktop) {
            // On desktop, toggle expanded state
            this.toggleExpanded();
        } else {
            // On mobile, toggle open/close
            if (this.isOpen) {
                this.closeSidebar();
            } else {
                this.openSidebar();
            }
        }
    }

    toggleExpanded() {
        if (this.isExpanded) {
            this.collapseSidebar();
        } else {
            this.expandSidebar();
        }
    }

    expandSidebar() {
        if (!this.isDesktop) return;

        this.sidebar?.classList.add('sidebar-expanded');
        this.sidebar?.classList.remove('sidebar-collapsed');
        this.isExpanded = true;
    }

    collapseSidebar() {
        if (!this.isDesktop) return;

        this.sidebar?.classList.remove('sidebar-expanded');
        this.sidebar?.classList.add('sidebar-collapsed');
        this.isExpanded = false;

        // Close all dropdowns when collapsing
        this.closeAllDropdowns();
    }

    openSidebar() {
        this.sidebar?.classList.add('sidebar-open');
        this.sidebarOverlay?.classList.remove('hidden');
        this.sidebarOverlay?.classList.add('sidebar-overlay-visible');
        this.isOpen = true;

        // Prevent body scroll on mobile when sidebar is open
        if (window.innerWidth < 1024) {
            document.body.style.overflow = 'hidden';
        }

        // Focus on first navigation item for accessibility
        const firstNavItem = this.sidebar?.querySelector('nav a');
        firstNavItem?.focus();
    }

    closeSidebar() {
        this.sidebar?.classList.remove('sidebar-open');
        this.sidebarOverlay?.classList.add('hidden');
        this.sidebarOverlay?.classList.remove('sidebar-overlay-visible');
        this.isOpen = false;

        // Restore body scroll
        document.body.style.overflow = '';

        // Return focus to hamburger button
        this.hamburgerBtn?.focus();

        // Close all dropdowns
        this.closeAllDropdowns();
    }

    handleResize() {
        const wasDesktop = this.isDesktop;
        this.isDesktop = window.innerWidth >= 1024;

        if (this.isDesktop !== wasDesktop) {
            // Device type changed, reset sidebar state
            if (this.isDesktop) {
                // Switching to desktop
                this.closeSidebar();
                this.collapseSidebar();
                document.body.style.overflow = '';

                // Add hover listeners
                this.sidebar?.addEventListener('mouseenter', () => this.expandSidebar());
                this.sidebar?.addEventListener('mouseleave', () => this.collapseSidebar());
            } else {
                // Switching to mobile
                this.sidebar?.removeEventListener('mouseenter', () => this.expandSidebar());
                this.sidebar?.removeEventListener('mouseleave', () => this.collapseSidebar());
                this.sidebar?.classList.remove('sidebar-expanded', 'sidebar-collapsed');
            }
        }
    }

    initNavigation() {
        const navItems = document.querySelectorAll('#sidebar nav a');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove active class from all items
                navItems.forEach(nav => nav.classList.remove('active', 'bg-purple-600', 'text-white'));
                navItems.forEach(nav => nav.classList.add('text-gray-300', 'hover:text-white', 'hover:bg-gray-800'));

                // Add active class to clicked item
                item.classList.remove('text-gray-300', 'hover:text-white', 'hover:bg-gray-800');
                item.classList.add('active', 'bg-purple-600', 'text-white');

                // Add ripple effect
                this.createRippleEffect(item, e);

                // Close sidebar on mobile after navigation
                if (window.innerWidth < 1024) {
                    setTimeout(() => this.closeSidebar(), 300);
                }

                // Simulate page navigation
                console.log(`Navigating to: ${item.textContent.trim()}`);
            });

            // Add hover effects
            item.addEventListener('mouseenter', () => {
                if (!item.classList.contains('active')) {
                    item.style.transform = 'translateX(4px)';
                }
            });

            item.addEventListener('mouseleave', () => {
                if (!item.classList.contains('active')) {
                    item.style.transform = 'translateX(0)';
                }
            });
        });
    }

    initDropdowns() {
        const navItems = document.querySelectorAll('.nav-item');

        navItems.forEach(navItem => {
            const link = navItem.querySelector('a');
            const dropdown = navItem.querySelector('.dropdown-menu');
            const arrow = navItem.querySelector('.dropdown-arrow');

            if (dropdown && arrow) {
                link?.addEventListener('click', (e) => {
                    e.preventDefault();

                    // Only allow dropdowns when sidebar is expanded or on mobile
                    if (this.isDesktop && !this.isExpanded && !this.sidebar?.matches(':hover')) {
                        return;
                    }

                    // Toggle this dropdown
                    const isCurrentlyOpen = dropdown.classList.contains('show');

                    // Close all other dropdowns
                    this.closeAllDropdowns();

                    // Toggle current dropdown
                    if (!isCurrentlyOpen) {
                        dropdown.classList.add('show');
                        navItem.classList.add('active');
                    }
                });
            }
        });
    }

    closeAllDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown-menu');
        const navItems = document.querySelectorAll('.nav-item');

        dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
        navItems.forEach(navItem => navItem.classList.remove('active'));
    }

    initTooltips() {
        const navItems = document.querySelectorAll('#sidebar nav li');

        navItems.forEach(item => {
            const link = item.querySelector('a');
            const text = link?.querySelector('.sidebar-text')?.textContent?.trim();

            if (text && !item.querySelector('.sidebar-tooltip')) {
                const tooltip = document.createElement('div');
                tooltip.className = 'sidebar-tooltip';
                tooltip.textContent = text;
                link?.appendChild(tooltip);
            }
        });
    }

    initUserInteractions() {
        // Add loading states for navigation
        this.setupLoadingStates();

        // Add search functionality if needed
        this.setupSearch();
    }

    setupLoadingStates() {
        const navItems = document.querySelectorAll('#sidebar nav a');

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                // Add loading state
                item.classList.add('sidebar-loading');

                // Remove loading state after simulation
                setTimeout(() => {
                    item.classList.remove('sidebar-loading');
                }, 1000);
            });
        });
    }

    setupSearch() {
        // This could be expanded to add search functionality within the sidebar
        console.log('Search functionality can be added here');
    }

    createRippleEffect(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        // Add ripple animation keyframes if not already present
        if (!document.querySelector('#ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Table functionality for the users page
class TableManager {
    constructor() {
        this.tableBody = document.getElementById('usersTableBody');
        this.init();
    }

    init() {
        this.loadSampleData();
        this.setupTableInteractions();
    }

    loadSampleData() {
        const sampleUsers = [
            { id: 1, email: 'john.doe@example.com', fullName: 'John Doe', role: 'Admin', phone: '+1 234 567 8900', blocked: false },
            { id: 2, email: 'jane.smith@example.com', fullName: 'Jane Smith', role: 'User', phone: '+1 234 567 8901', blocked: false },
            { id: 3, email: 'mike.johnson@example.com', fullName: 'Mike Johnson', role: 'Moderator', phone: '+1 234 567 8902', blocked: true },
            { id: 4, email: 'sarah.wilson@example.com', fullName: 'Sarah Wilson', role: 'User', phone: '+1 234 567 8903', blocked: false },
            { id: 5, email: 'david.brown@example.com', fullName: 'David Brown', role: 'Admin', phone: '+1 234 567 8904', blocked: false },
            { id: 6, email: 'lisa.davis@example.com', fullName: 'Lisa Davis', role: 'User', phone: '+1 234 567 8905', blocked: false },
            { id: 7, email: 'tom.miller@example.com', fullName: 'Tom Miller', role: 'User', phone: '+1 234 567 8906', blocked: true },
            { id: 8, email: 'anna.garcia@example.com', fullName: 'Anna Garcia', role: 'Moderator', phone: '+1 234 567 8907', blocked: false },
            { id: 9, email: 'chris.martinez@example.com', fullName: 'Chris Martinez', role: 'User', phone: '+1 234 567 8908', blocked: false },
            { id: 10, email: 'emma.taylor@example.com', fullName: 'Emma Taylor', role: 'Admin', phone: '+1 234 567 8909', blocked: false }
        ];

        this.renderUsers(sampleUsers);
    }

    renderUsers(users) {
        if (!this.tableBody) return;

        this.tableBody.innerHTML = users.map(user => `
            <tr class="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td class="px-2 lg:px-4 py-3 text-sm text-gray-800">${user.id}</td>
                <td class="px-2 lg:px-4 py-3 text-sm text-gray-800">${user.email}</td>
                <td class="px-2 lg:px-4 py-3 text-sm text-gray-800">${user.fullName}</td>
                <td class="px-2 lg:px-4 py-3">
                    <span class="px-2 py-1 text-xs rounded-full ${this.getRoleBadgeClass(user.role)}">
                        ${user.role}
                    </span>
                </td>
                <td class="px-2 lg:px-4 py-3 text-sm text-gray-800">${user.phone}</td>
                <td class="px-2 lg:px-4 py-3">
                    <span class="px-2 py-1 text-xs rounded-full ${user.blocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
                        ${user.blocked ? 'Yes' : 'No'}
                    </span>
                </td>
                <td class="px-2 lg:px-4 py-3">
                    <div class="flex space-x-2">
                        <button class="text-blue-600 hover:text-blue-800 transition-colors" onclick="editUser(${user.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="text-red-600 hover:text-red-800 transition-colors" onclick="deleteUser(${user.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="text-gray-600 hover:text-gray-800 transition-colors" onclick="viewUser(${user.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    getRoleBadgeClass(role) {
        switch (role) {
            case 'Admin': return 'bg-purple-100 text-purple-800';
            case 'Moderator': return 'bg-blue-100 text-blue-800';
            case 'User': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    setupTableInteractions() {
        // Add search functionality
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                console.log('Searching for:', e.target.value);
                // Implement search logic here
            });
        }
    }
}

// Global functions for table actions
window.editUser = function (id) {
    console.log('Edit user:', id);
    // Implement edit user functionality
};

window.deleteUser = function (id) {
    console.log('Delete user:', id);
    // Implement delete user functionality
};

window.viewUser = function (id) {
    console.log('View user:', id);
    // Implement view user functionality
};

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('Dashboard application initializing...');

    // Initialize sidebar
    const sidebarManager = new SidebarManager();

    // Initialize table
    const tableManager = new TableManager();

    // Add some visual feedback for the logo
    const logo = document.querySelector('#sidebar img');
    if (logo) {
        logo.addEventListener('click', () => {
            logo.classList.add('logo-bounce');
            setTimeout(() => logo.classList.remove('logo-bounce'), 2000);
        });
    }

    console.log('Dashboard application initialized successfully!');
});

// Add some utility functions
const utils = {
    // Debounce function for search inputs
    debounce: function (func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Format phone numbers
    formatPhone: function (phone) {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    },

    // Show toast notifications
    showToast: function (message, type = 'info') {
        console.log(`${type.toUpperCase()}: ${message}`);
        // Could implement actual toast notifications here
    }
};
