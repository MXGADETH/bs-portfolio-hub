// js/auth.js
import { setUser } from './data.js';

export async function login(email, password) {
    const USERS_API = "https://script.google.com/macros/s/AKfycbw6ADT4nvhuJ8vee4U9DJX3iwBtP6SjNkSLEYKa0xvqxGwv6PZnEMuGO2vgfDx77CzJFQ/exec";
    
    try {
        // GAS ของคุณรับ action, email, password
        const url = `${USERS_API}?action=login&email=${email}&password=${password}`;
        const response = await fetch(url);
        const result = await response.json();

        if (result.status === "success") {
            // เก็บข้อมูลที่ได้กลับมา
            setUser({ username: result.user, role: result.role });
            return { success: true };
        } else {
            return { success: false, message: result.message || "Email หรือ รหัสผ่านไม่ถูกต้อง" };
        }
    } catch (error) {
        console.error("Login Error:", error);
        return { success: false, message: "เกิดข้อผิดพลาดในการเชื่อมต่อ" };
    }
}

// js/auth.js
export function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    window.location.reload(); // รีเฟรชเพื่อเปลี่ยน UI กลับเป็นหน้า Login
}

// js/auth.js
export async function register(username, email, password) {
    const USERS_API = "https://script.google.com/macros/s/AKfycbw6ADT4nvhuJ8vee4U9DJX3iwBtP6SjNkSLEYKa0xvqxGwv6PZnEMuGO2vgfDx77CzJFQ/exec";
    
    try {
        const url = `${USERS_API}?action=register&username=${username}&email=${email}&password=${password}`;
        const response = await fetch(url);
        const result = await response.json();

        return result.status === "success" ? { success: true } : { success: false, message: result.message };
    } catch (error) {
        return { success: false, message: "สมัครสมาชิกไม่สำเร็จ" };
    }
}