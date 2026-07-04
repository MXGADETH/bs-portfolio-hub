// js/api.js

// เปลี่ยนเป็น URL ของ Google Apps Script ของคุณ
const PORTFOLIO_API = "https://script.google.com/macros/s/AKfycby2Da9xYJnQFQT8ULn9aFraqrP2pHCy0tGDRLcAI2I8htBiIOHxVMQ4enKD21Ge5Z-5Vw/exec";

export async function fetchPortfolios() {
    try {
        const response = await fetch(PORTFOLIO_API);
        
        if (!response.ok) {
            throw new Error('การเชื่อมต่อกับ Google Sheets มีปัญหา');
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("API Error:", error);
        return []; 
    }
}

export async function submitPortfolio(portfolioData) {
  try {
    // 🛠️ แก้จาก API_URL เป็น PORTFOLIO_API ให้ตรงกับด้านบน
    const response = await fetch(PORTFOLIO_API, {
      method: "POST",
      mode: "cors", 
      headers: {
        "Content-Type": "text/plain", 
      },
      body: JSON.stringify({
        action: "create",
        ...portfolioData
      })
    });
    
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error in submitPortfolio:", error);
    throw error;
  }
}

// js/api.js -> เพิ่มฟังก์ชันนี้ต่อท้ายแล้วอย่าลืมเช็คชื่อการ export

// js/api.js
// ใน api.js
// เปลี่ยนฟังก์ชันนี้ใน js/api.js แบบเต็มฟังก์ชัน
export async function managePortfolioStatus(fullname, title, isApprove) {
  try {
    const response = await fetch(PORTFOLIO_API, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "text/plain", // หลีกเลี่ยง CORS preflight บั๊กกับ Google Apps Script
      },
      body: JSON.stringify({
        action: "approve", // ให้วิ่งเข้า else if(action === "approve") ใน GAS
        fullname: fullname,
        title: title,
        isApprove: isApprove // ส่ง Boolean true หรือ false ไปให้เซิร์ฟเวอร์เช็คเงื่อนไข
      })
    });
    
    if (!response.ok) throw new Error("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ Google Sheets ได้");
    return await response.json();
  } catch (error) {
    console.error("Error in managePortfolioStatus:", error);
    return { status: "error", message: error.toString() };
  }
}