// เก็บข้อมูลที่ทุกไฟล์ต้องใช้ร่วมกัน
export const state = {
    portfolios: [],      // รายการพอร์ตทั้งหมด
    user: {
        username: localStorage.getItem('username') || null,
        role: localStorage.getItem('userRole') || 'guest'
    },
    isLoading: false
};