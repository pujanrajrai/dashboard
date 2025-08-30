// Admin Dashboard JavaScript

class AdminDashboard {
    constructor() {
        this.users = [
            { id: 1, email: 'admin@example.com', fullName: 'John Doe', role: 'Super Admin', phone: '+1234567890', blocked: 'No' },
            { id: 2, email: 'manager@example.com', fullName: 'Jane Smith', role: 'Manager', phone: '+1234567891', blocked: 'No' },
            { id: 3, email: 'user@example.com', fullName: 'Bob Johnson', role: 'User', phone: '+1234567892', blocked: 'Yes' },
            { id: 4, email: 'support@example.com', fullName: 'Alice Brown', role: 'Support', phone: '+1234567893', blocked: 'No' },
            { id: 5, email: 'editor@example.com', fullName: 'Charlie Wilson', role: 'Editor', phone: '+1234567894', blocked: 'No' },
            { id: 6, email: 'moderator@example.com', fullName: 'Diana Davis', role: 'Moderator', phone: '+1234567895', blocked: 'No' },
            { id: 7, email: 'analyst@example.com', fullName: 'Eve Miller', role: 'Analyst', phone: '+1234567896', blocked: 'No' },
            { id: 8, email: 'developer@example.com', fullName: 'Frank Garcia', role: 'Developer', phone: '+1234567897', blocked: 'No' },
            { id: 9, email: 'designer@example.com', fullName: 'Grace Lee', role: 'Designer', phone: '+1234567898', blocked: 'No' },
            { id: 10, email: 'tester@example.com', fullName: 'Henry Taylor', role: 'Tester', phone: '+1234567899', blocked: 'No' }
        ];

        this.currentPage = 1;
        this.entriesPerPage = 10;
        this.isSidebarOpen = false;
        this.isSidebarExpanded = false;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupMobileSidebar();
        this.setupDesktopSidebar();
        this.setupDropdowns();
        this.renderUsers();
        this.handleResize();

        // Add touch event listeners for mobile
        if ('ontouchstart' in window) {
            this.setupTouchEvents();
        }
    }

    setupEventListeners() {
        // Entries per page selector
        const entriesSelect = document.querySelector('select');
        if (entriesSelect) {
            entriesSelect.addEventListener('change', (e) => {
                this.entriesPerPage = parseInt(e.target.value);
                this.currentPage = 1;
                this.renderUsers();
            });
        }

        // Add Admin button
        const addAdminBtn = document.querySelector('.add-admin-btn');
        if (addAdminBtn) {
            addAdminBtn.addEventListener('click', () => {
                alert('Add Admin functionality would go here');
            });
        }

        // Search functionality
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterUsers(e.target.value);
            });
        }
    }

    setupMobileSidebar() {
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        if (hamburgerBtn) {
            hamburgerBtn.addEventListener('click', () => {
                if (window.innerWidth < 1024) {
                    this.toggleSidebar();
                } else {
                    this.toggleDesktopSidebar();
                }
            });
        }
    }

    setupDesktopSidebar() {
        // Set initial collapsed state on desktop
        if (window.innerWidth >= 1024) {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.classList.add('collapsed');
                this.isSidebarExpanded = false;
            }
        }
    }

    setupDropdowns() {
        const dropdowns = document.querySelectorAll('.nav-dropdown');

        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.nav-item');
            const menu = dropdown.querySelector('.dropdown-menu');

            if (trigger && menu) {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();

                    // Close other dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('open');
                        }
                    });

                    // Toggle current dropdown
                    dropdown.classList.toggle('open');
                });
            }
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('open');
                });
            }
        });
    }

    toggleSidebar() {
        if (this.isSidebarOpen) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }

    toggleDesktopSidebar() {
        if (this.isSidebarExpanded) {
            this.collapseSidebar();
        } else {
            this.expandSidebar();
        }
    }

    openSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobileOverlay');

        if (sidebar && overlay) {
            sidebar.classList.add('open');
            overlay.classList.remove('hidden');
            this.isSidebarOpen = true;
        }
    }

    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobileOverlay');

        if (sidebar && overlay) {
            sidebar.classList.remove('open');
            overlay.classList.add('hidden');
            this.isSidebarOpen = false;
        }
    }

    expandSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.remove('collapsed');
            sidebar.classList.add('expanded');
            this.isSidebarExpanded = true;

            // Update hamburger icon
            const hamburgerIcon = document.querySelector('#hamburgerBtn i');
            if (hamburgerIcon) {
                hamburgerIcon.className = 'fas fa-chevron-left text-xl';
            }
        }
    }

    collapseSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.remove('expanded');
            sidebar.classList.add('collapsed');
            this.isSidebarExpanded = false;

            // Update hamburger icon
            const hamburgerIcon = document.querySelector('#hamburgerBtn i');
            if (hamburgerIcon) {
                hamburgerIcon.className = 'fas fa-bars text-xl';
            }
        }
    }

    handleResize() {
        if (window.innerWidth >= 1024) {
            // Desktop mode
            this.closeSidebar();
            if (!this.isSidebarExpanded) {
                this.collapseSidebar();
            }
        } else {
            // Mobile mode
            this.closeSidebar();
        }
    }

    setupTouchEvents() {
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;
        let isSwiping = false;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isSwiping = true;
        });

        document.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;

            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;

            const diffX = startX - currentX;
            const diffY = startY - currentY;

            // Only handle horizontal swipes
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0 && this.isSidebarOpen) {
                    // Swipe left - close sidebar
                    this.closeSidebar();
                } else if (diffX < 0 && !this.isSidebarOpen) {
                    // Swipe right - open sidebar
                    this.openSidebar();
                }
                isSwiping = false;
            }
        });

        document.addEventListener('touchend', () => {
            isSwiping = false;
        });
    }

    handleNavigation(link) {
        // Handle navigation logic here
        console.log('Navigating to:', link.getAttribute('href'));
    }

    filterUsers(searchTerm) {
        const filteredUsers = this.users.filter(user =>
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.renderUsers(filteredUsers);
    }

    renderUsers(usersToRender = this.users) {
        const tbody = document.getElementById('usersTableBody');
        if (!tbody) return;

        const startIndex = (this.currentPage - 1) * this.entriesPerPage;
        const endIndex = startIndex + this.entriesPerPage;
        const paginatedUsers = usersToRender.slice(startIndex, endIndex);

        tbody.innerHTML = paginatedUsers.map(user => `
            <tr class="hover:bg-gray-50">
                <td class="px-2 lg:px-4 py-3 text-sm lg:text-base">${user.id}</td>
                <td class="px-2 lg:px-4 py-3 text-sm lg:text-base">${user.email}</td>
                <td class="px-2 lg:px-4 py-3 text-sm lg:text-base">${user.fullName}</td>
                <td class="px-2 lg:px-4 py-3 text-sm lg:text-base">${user.role}</td>
                <td class="px-2 lg:px-4 py-3 text-sm lg:text-base">${user.phone}</td>
                <td class="px-2 lg:px-4 py-3 text-sm lg:text-base">
                    <span class="px-2 py-1 rounded-full text-xs ${user.blocked === 'Yes' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
                        ${user.blocked}
                    </span>
                </td>
                <td class="px-2 lg:px-4 py-3 text-sm lg:text-base">
                    <div class="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                        <button class="action-btn edit-btn px-3 py-1 text-white rounded text-xs">Edit</button>
                        <button class="action-btn password-btn px-3 py-1 text-white rounded text-xs">Password</button>
                        <button class="action-btn block-btn px-3 py-1 text-white rounded text-xs">Block</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdminDashboard();
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.dashboard) {
        window.dashboard.handleResize();
    }
});

// Global function for mobile sidebar toggle
window.toggleSidebar = function () {
    if (window.dashboard) {
        if (window.innerWidth < 1024) {
            window.dashboard.toggleSidebar();
        } else {
            window.dashboard.toggleDesktopSidebar();
        }
    }
};

// Initialize dashboard globally
window.dashboard = new AdminDashboard();
