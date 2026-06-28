// js/api.js

// เปลี่ยนเป็น URL ของ Google Apps Script ของคุณ
const PORTFOLIO_API = "https://script.google.com/macros/s/AKfycbyPrLfqEifGPkrdvn0qu474rgqRqqktMpRwM87hudqhSbL2DXT-1RH3EN20ebtfXSN31A/exec";

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

export async function managePortfolioStatus(fullname, title, isApprove) {
  try {
    const response = await fetch(PORTFOLIO_API, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "text/plain", // เลี่ยง CORS preflight กับ GAS
      },
      body: JSON.stringify({
        action: isApprove ? "approve" : "reject",
        fullname: fullname,
        title: title
      })
    });
    
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error in managePortfolioStatus:", error);
    throw error;
  }
}