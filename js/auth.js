// js/auth.js
// js/auth.js
import { setUser } from './data.js';

const USERS_API = "https://script.google.com/macros/s/AKfycbzGXlEP_mMOHLizU0ty5fzd_LxezlJH8MMBDvvDqlPvGsIIuklfaJlQURf6eyyB8IMbsw/exec";

async function sendAuthRequest(payload) {
    const response = await fetch(USERS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
    });
    return response.json();
}

export async function login(identifier, password) {
    try {
        // ใช้ encodeURIComponent ป้องกันบั๊กจากอักขระพิเศษในรหัสผ่าน
        const result = await sendAuthRequest({
            action: 'login',
            identifier,
            password
        });

        if (result.status === "success") {
            // เก็บข้อมูล username และ role ที่ได้จาก backend (ซึ่งถูกต้องกว่าการตัดอีเมล)
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
export async function register(username, email, password, { fullName = '', studentId = '' } = {}) {
    try {
        const result = await sendAuthRequest({ action: 'register', username, email, password, fullName, studentId });

        return result.status === "success" ? { success: true } : { success: false, message: result.message };
    } catch (error) {
        return { success: false, message: "สมัครสมาชิกไม่สำเร็จ" };
    }
}

export async function requestPasswordReset(email) {
    try {
        const result = await sendAuthRequest({ action: 'requestPasswordReset', email });
        return {
            success: result.status === 'success',
            message: result.message || (result.status === 'success' ? 'ส่งคำแนะนำการรีเซ็ตรหัสผ่านไปยังอีเมลแล้ว' : 'ไม่สามารถส่งคำขอรีเซ็ตรหัสผ่านได้')
        };
    } catch (error) {
        console.error('Password reset error:', error);
        return { success: false, message: 'ไม่สามารถเชื่อมต่อระบบรีเซ็ตรหัสผ่านได้' };
    }
}
