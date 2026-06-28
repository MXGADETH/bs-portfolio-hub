// js/data.js
export const state = {
    portfolios: [],
    // เพิ่มข้อมูล user ตรงนี้
    user: {
        username: localStorage.getItem('username') || null,
        role: localStorage.getItem('userRole') || 'guest' // guest, user, admin, superadmin
    }
};

export function setPortfolios(data) {
    state.portfolios = data;
}

// ฟังก์ชันอัปเดต user state
export function setUser(userData) {
    state.user.username = userData.username;
    state.user.role = userData.role;
    localStorage.setItem('username', userData.username);
    localStorage.setItem('userRole', userData.role);
}

export function clearUser() {
    state.user.username = null;
    state.user.role = 'guest';
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
}