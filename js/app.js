// js/app.js

import { state, setPortfolios, setUser } from './data.js'; 
import { fetchPortfolios, submitPortfolio, managePortfolioStatus } from './api.js';
import { renderPortfolios, renderNavbar, renderLoginForm, renderRegisterForm, renderPortfolioForm, convertFileToBase64, renderAdminDashboard } from './ui.js';
import { login, logout, register } from './auth.js';  
import { renderPortfolioModal, closePortfolioModal } from './ui.js';

async function initApp() {
    renderNavbar(state.user);
    bindNavbarEvents();

    if (!state.user.username) {
        renderLoginForm();
        initLoginFormEvents();
    } else {
        loadHomePage();
    }
}

function bindNavbarEvents() {
    document.getElementById('logoutBtn')?.addEventListener('click', logout);
    
    document.getElementById('loginLink')?.addEventListener('click', () => {
        renderLoginForm();
        initLoginFormEvents();
    });

    document.getElementById('registerLink')?.addEventListener('click', () => {
        renderRegisterForm();
        initRegisterFormEvents();
    });

    const goHome = async () => {
        if (!state.user.username) {
            renderLoginForm();
            initLoginFormEvents();
        } else {
            loadHomePage();
        }
    };
    document.getElementById('brandLink')?.addEventListener('click', goHome);
    document.getElementById('homeLink')?.addEventListener('click', goHome);

    document.getElementById('uploadPortLink')?.addEventListener('click', () => {
        initPortfolioFormRoute();
    });

    document.getElementById('adminLink')?.addEventListener('click', () => {
        initAdminDashboardRoute();
    });
}

// js/app.js -> ค้นหาและแก้ไขฟังก์ชัน loadHomePage เดิม และเพิ่มฟังก์ชันดักจับปุ่มกรอกข้อมูลครับ

// js/app.js -> ค้นหาและแก้ไขฟังก์ชันระบบดักจับและคัดกรองข้อมูลเวอร์ชัน 4 รูปแบบผสม

// js/app.js -> แทนที่ฟังก์ชัน loadHomePage เดิม เพื่อควบคุม Multi-Filter 4 ทิศทาง

// 🏡 หมวดหมู่: หน้าแรกหลัก คลังพอร์ตโฟลิโอ และระบบจัดการตัวกรอง 4 มิติ
async function loadHomePage() {
    // 1. ดึงข้อมูลพอร์ตโฟลิโอสด ๆ จากหลังบ้าน Google Sheets
    const data = await fetchPortfolios();
    setPortfolios(data);
    
    // 2. กำหนดค่าเริ่มต้นให้กับอ็อบเจกต์ตัวกรองทั้ง 4 มิติ
    const initialFilters = {
        keyword: "",
        university: "ทั้งหมด",
        faculty: "ทั้งหมด",
        round: "ทั้งหมด"
    };
    
    // 3. 📌 สั่งวาดโครงสร้างหน้าจอ แผงสถิติ และช่องป้อนข้อมูลขึ้นมาก่อน (วาดแค่ครั้งเดียวและครั้งแรกพอ)
    renderPortfolios(state.portfolios, initialFilters);
    
    // 4. เสียบปลั๊กเปิดระบบดักจับการพิมพ์และการเปลี่ยนค่า Dropdown ทันทีหลังหน้าจอพร้อม
    initFilterEvents();
}

// ฟังก์ชันควบคุมกระบวนการดักจับค่าการพิมพ์และการกด Dropdown ทุกกล่องบนหน้าแรก
function renderFilteredHome(currentFilters) {
    // 1. สั่งให้ UI วาดการ์ดและสถิติตามฟิลเตอร์
    renderPortfolios(state.portfolios, currentFilters);

    // --- 🛠️ ส่วนผูกระบบ Event คีย์เวิร์ดและดรอปดาวน์เหมือนเดิม ---
    const getValuesFromScreen = () => {
        return {
            keyword: document.getElementById('search-keyword')?.value || "",
            university: document.getElementById('search-university')?.value || "ทั้งหมด",
            faculty: document.getElementById('search-faculty')?.value || "ทั้งหมด",
            round: document.getElementById('search-round')?.value || "ทั้งหมด"
        };
    };
    const update = () => renderFilteredHome(getValuesFromScreen());

    document.getElementById('search-keyword')?.addEventListener('input', update);
    document.getElementById('search-university')?.addEventListener('change', update);
    document.getElementById('search-faculty')?.addEventListener('change', update);
    document.getElementById('search-round')?.addEventListener('change', update);
    document.getElementById('clear-filters-btn')?.addEventListener('click', () => {
        const resetObj = { keyword: "", university: "ทั้งหมด", faculty: "ทั้งหมด", round: "ทั้งหมด" };
        renderFilteredHome(resetObj);
    });
    // -----------------------------------------------------------

    // ⚡ 🛠️ ผูกเหตุการณ์คลิกเปิด Modal ให้กลุ่มปุ่มบนการ์ดผลงานทั้งหมด
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const fullname = e.currentTarget.getAttribute('data-fullname');
            const title = e.currentTarget.getAttribute('data-title');
            
            // ค้นหาข้อมูลรุ่นพี่ชิ้นนี้จากหน่วยความจำรัฐกลาง (state.portfolios)
            const matchedPortfolio = state.portfolios.find(p => p.fullname === fullname && p.title === title);
            
            if (matchedPortfolio) {
                // เรียกใช้วาดหน้าต่าง Modal สรุปข้อมูลขึ้นจอทันที
                renderPortfolioModal(matchedPortfolio);
                
                // ผูกสัญญากดกากบาทปิดหน้าต่าง
                document.getElementById('closeModalBtn')?.addEventListener('click', closePortfolioModal);
                
                // ผูกสัญญากดบริเวณพื้นหลังสีดำว่าง ๆ ข้างนอก ให้ปิดหน้าต่างได้เช่นกัน เพื่อ UX ที่ดีสากล
                document.getElementById('modalOverlay')?.addEventListener('click', (event) => {
                    if (event.target.id === 'modalOverlay') closePortfolioModal();
                });
            }
        });
    });
}

function initLoginFormEvents() {
    document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;
        const res = await login(email, pass);
        if (res.success) {
            localStorage.setItem('username', email.split('@')[0]); 
            window.location.reload();
        }
        else document.getElementById('loginMessage').innerText = res.message;
    });
}

// ฟังก์ชันผูก Event หน้า Register
function initRegisterFormEvents() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.onsubmit = async (e) => {
            e.preventDefault();
            
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true; 
            submitBtn.innerText = "กำลังสมัคร...";

            const u = document.getElementById('regUsername').value;
            const eVal = document.getElementById('regEmail').value;
            const p = document.getElementById('regPassword').value;
            
            const res = await register(u, eVal, p);
            
            if (res.success) {
                alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบด้วยบัญชีของคุณ");
                renderLoginForm();
                initLoginFormEvents();
            } else {
                document.getElementById('regMessage').innerText = res.message;
                submitBtn.disabled = false;
                submitBtn.innerText = "สมัครสมาชิก";
            }
        };
    }
}

function initPortfolioFormRoute() {
  if (!state.user.username) {
    alert("กรุณาเข้าสู่ระบบก่อนทำการส่งพอร์ตโฟลิโอครับ");
    renderLoginForm();
    initLoginFormEvents();
    return;
  }

  renderPortfolioForm('app', state.user.username);

  const form = document.getElementById('portfolio-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById('submit-portfolio-btn');
      submitBtn.disabled = true;
      submitBtn.innerText = "กำลังอัปโหลดพอร์ตและรูปภาพ...";

      try {
        const imageFile = document.getElementById('port-image').files[0];
        let base64Image = "";
        
        if (imageFile) {
          base64Image = await convertFileToBase64(imageFile);
        }

        const portfolioData = {
          fullname: document.getElementById('port-fullname').value,
          nickname: document.getElementById('port-nickname').value,
          faculty: document.getElementById('port-faculty').value,
          major: document.getElementById('port-major').value,
          university: document.getElementById('port-university').value,
          gpax: document.getElementById('port-gpax').value,
          round: document.getElementById('port-round').value,
          title: document.getElementById('port-title').value,
          intro: document.getElementById('port-intro').value,
          port_link: document.getElementById('port-link').value,
          sender: document.getElementById('port-sender').value,
          image_base64: base64Image
        };

        const result = await submitPortfolio(portfolioData);

        if (result.status === "success") {
          alert("🎉 อัปโหลดพอร์ตสำเร็จ! พอร์ตของคุณอยู่ระหว่างการรออนุมัติจากระบบ");
          form.reset();
          loadHomePage(); 
        } else {
          alert("เกิดข้อผิดพลาดจากระบบ: " + result.message);
          submitBtn.disabled = false;
          submitBtn.innerText = "🚀 ส่งพอร์ตโฟลิโอเข้าระบบ";
        }

      } catch (error) {
        alert("ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
        console.error(error);
        submitBtn.disabled = false;
        submitBtn.innerText = "🚀 ส่งพอร์ตโฟลิโอเข้าระบบ";
      }
    });
  }
}

// 🛠️ ปรับปรุงระบบควบคุม Dashboard แอดมินแยกตาม 3 ระดับสิทธิ์
async function initAdminDashboardRoute() {
    const userRole = state.user.role;

    // 1. กั้นสิทธิ์ระดับที่ 1: user ทั่วไปจะหลุดออกไปทันที
    if (userRole !== 'admin' && userRole !== 'superadmin') {
        alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้ เฉพาะทีมงานเท่านั้น!");
        loadHomePage();
        return;
    }

    const data = await fetchPortfolios();
    setPortfolios(data);

    // ส่งค่า state.user.role เข้าไปเรนเดอร์เพื่อให้ระบุปุ่มได้ถูกต้องตามเงื่อนไขสิทธิ์
    renderAdminDashboard(state.portfolios, userRole);

    // ผูก Event ปุ่มอนุมัติ (สามารถกดได้ทั้งคู่)
    document.querySelectorAll('.approve-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const fullname = e.target.getAttribute('data-fullname');
            const title = e.target.getAttribute('data-title');
            
            e.target.disabled = true;
            e.target.innerText = "กำลังอนุมัติ...";

            try {
                const res = await managePortfolioStatus(fullname, title, true); 
                if (res.status === "success") {
                    alert("อนุมัติพอร์ตโฟลิโอเรียบร้อย!");
                    initAdminDashboardRoute(); 
                } else {
                    alert("เกิดข้อผิดพลาด: " + res.message);
                    e.target.disabled = false;
                    e.target.innerText = "อนุมัติ";
                }
            } catch (err) {
                alert("ระบบขัดข้องกรุณาลองใหม่");
                e.target.disabled = false;
                e.target.innerText = "อนุมัติ";
            }
        });
    });

    // ผูก Event ปุ่มปฏิเสธ/ลบ (จะมีเฉพาะ superadmin เท่านั้นที่จะเข้าเงื่อนไขกดตรงนี้ได้)
    document.querySelectorAll('.reject-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            // บังคับชั้นความปลอดภัยเพิ่มเติม เผื่อมีใครมาฝืนเจาะสิทธิ์หน้าบ้าน
            if (userRole !== 'superadmin') {
                alert("สิทธิ์ของคุณไม่เพียงพอในการลบข้อมูล!");
                return;
            }

            const fullname = e.target.getAttribute('data-fullname');
            const title = e.target.getAttribute('data-title');

            if (!confirm(`[SUPERADMIN] แน่ใจหรือไม่ที่จะลบพอร์ต "${title}" ของคุณ ${fullname} ออกจากระบบ?`)) {
                return;
            }

            e.target.disabled = true;
            e.target.innerText = "กำลังลบ...";

            try {
                const res = await managePortfolioStatus(fullname, title, false); 
                if (res.status === "success") {
                    alert("ลบพอร์ตโฟลิโอออกจากระบบเรียบร้อยแล้ว");
                    initAdminDashboardRoute(); 
                } else {
                    alert("เกิดข้อผิดพลาด: " + res.message);
                    e.target.disabled = false;
                    e.target.innerText = "ปฏิเสธ/ลบ";
                }
            } catch (err) {
                alert("ระบบขัดข้องกรุณาลองใหม่");
                e.target.disabled = false;
                e.target.innerText = "ปฏิเสธ/ลบ";
            }
        });
    });
}

function initFilterEvents() {
    // ฟังก์ชันย่อยสำหรับรวบรวมค่าปัจจุบันที่อยู่บนหน้าจอ ณ วินาทีนั้น
    const getScreenFilters = () => {
        return {
            keyword: document.getElementById('search-keyword')?.value || "",
            university: document.getElementById('search-university')?.value || "ทั้งหมด",
            faculty: document.getElementById('search-faculty')?.value || "ทั้งหมด",
            round: document.getElementById('search-round')?.value || "ทั้งหมด"
        };
    };

    // ⚡ ตัวประมวลผลหลัก: ทำงานทันทีเมื่อมีการพิมพ์หรือคลิกตัวเลือก
    const handleFiltering = () => {
        const currentFilters = getScreenFilters();
        
        // 📌 หัวใจสำคัญ: เรียกฟังก์ชันย่อยใน ui.js เพื่อสั่งล้างและวาดใหม่เฉพาะ "โซนการ์ดพอร์ต" เท่านั้น
        // กล่องป้อนข้อมูลด้านบนจะไม่โดนทำลาย คอร์เซอร์การพิมพ์ของนายเลยจะไม่หลุดเด้งแน่นอนครับ!
        updatePortfolioListUI(state.portfolios, currentFilters);
    };

    // ผูก Event สัญญาณการพิมพ์และการคลิก Dropdown ทุกกล่องเข้ากับตัวประมวลผล
    document.getElementById('search-keyword')?.addEventListener('input', handleFiltering);
    document.getElementById('search-university')?.addEventListener('change', handleFiltering);
    document.getElementById('search-faculty')?.addEventListener('change', handleFiltering);
    document.getElementById('search-round')?.addEventListener('change', handleFiltering);

    // ผูกสัญญากับปุ่ม "ล้างค่าทั้งหมด" เพื่อรีเซ็ตหน้าจอหลักกลับมาเริ่มต้นใหม่
    document.getElementById('clear-filters-btn')?.addEventListener('click', () => {
        loadHomePage();
    });
}

document.addEventListener('DOMContentLoaded', initApp);