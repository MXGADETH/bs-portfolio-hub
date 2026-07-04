// js/auth.js
import { setUser } from './data.js';

export async function login(email, password) {
    const USERS_API = "https://script.google.com/macros/s/AKfycbwc72AX9SInQsV6OSX1H65yLU1z607oqBap5fBhX-3ATBHFXEIF05Wml_yqTbnKIQAqLA/exec";
    
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
// js/auth.js
export function logout() {
    // 🎯 เคลียร์ข้อมูล LocalStorage ออกให้หมดเกลี้ยงตู้ (ล้างค้าง username, userRole) 
    // เพื่อป้องกันปัญหาประวัติไอดีคนเก่าค้างในหน่วยความจำเบราว์เซอร์ครับนาย
    localStorage.clear(); 
    
    // รีเฟรชหน้าจอความเร็วแสงเพื่อเคลียร์ตัวแปรใน state และสับสวิตช์ UI เด้งกลับหน้า Login
    window.location.reload(); 
}

// js/auth.js
export async function register(username, email, password) {
    const USERS_API = "https://script.google.com/macros/s/AKfycbwc72AX9SInQsV6OSX1H65yLU1z607oqBap5fBhX-3ATBHFXEIF05Wml_yqTbnKIQAqLA/exec";
    
    try {
        const url = `${USERS_API}?action=register&username=${username}&email=${email}&password=${password}`;
        const response = await fetch(url);
        const result = await response.json();

        return result.status === "success" ? { success: true } : { success: false, message: result.message };
    } catch (error) {
        return { success: false, message: "สมัครสมาชิกไม่สำเร็จ" };
    }
}