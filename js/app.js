// js/app.js
import { state, setPortfolios, setUser } from './data.js'; 
import { fetchPortfolios, submitPortfolio, managePortfolioStatus } from './api.js';
import { 
    renderPortfolios, 
    renderNavbar, 
    renderLoginForm, 
    renderRegisterForm, 
    renderPortfolioForm, 
    convertFileToBase64, 
    renderAdminDashboard, 
    renderMyPortfolios,
    renderPortfolioModal,
    closePortfolioModal,
    updatePortfolioListUI,
    renderLogsPage
} from './ui.js';
import { login, logout, register } from './auth.js';  

// 📍 ฟังก์ชันเริ่มต้นระบบกู้คืนและผูกสถานะแอปกลาง
async function initApp() {
    window.state = state; 
    
    renderNavbar(state.user);
    bindNavbarEvents();
    
    if (!state.user.username) {
        renderLoginForm();
        initLoginFormEvents();
    } else {
        loadHomePage();
    }
}

// 🎯 ดักฟังคิวเมื่อหน้าจอหลักเรนเดอร์เสร็จ เพื่อผูกหน้าต่าง Modal และปุ่มดูรายละเอียด
window.addEventListener('portfolioUIUpdated', () => {
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.onclick = (e) => {
            const fullname = e.currentTarget.getAttribute('data-fullname');
            const title = e.currentTarget.getAttribute('data-title');
            
            const allPortfolios = window.state?.portfolios || [];
            const matchedPort = allPortfolios.find(p => p.fullname === fullname && p.title === title);
            
            if (matchedPort) {
                renderPortfolioModal(matchedPort);
                document.getElementById('closeModalBtn')?.addEventListener('click', closePortfolioModal);
                document.getElementById('modalOverlay')?.addEventListener('click', (ev) => {
                    if (ev.target.id === 'modalOverlay') closePortfolioModal();
                });
            }
        };
    });
});

// 🎯 ผูกเหตุการณ์คลิกบนแถบ Navbar เมนูหลัก
// js/app.js - ฟังก์ชัน bindNavbarEvents ที่อัปเดตใหม่
// =================================================================
// ⚙️ ฟังก์ชันผูก Event ให้เมนู Navbar และจัดการสิทธิ์ (อัปเดตใหม่)
// =================================================================
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

    document.getElementById('uploadPortLink')?.addEventListener('click', () => {
        initPortfolioFormRoute();
    });

    // ⚙️ ผูก Event ปุ่มแอดมิน
    document.getElementById('adminLink')?.addEventListener('click', () => {
        initAdminDashboardRoute();
    });

    // 📜 🎯 ผูก Event ปุ่มดู Logs (ฟังก์ชันใหม่)
    document.getElementById('viewLogsBtn')?.addEventListener('click', async () => {
        try {
            // ดึงข้อมูลจาก API ของนาย ซึ่งใน doGet จะส่งพอร์ตและ logs กลับมาพร้อมกัน
            const data = await fetchPortfolios(); 
            if (data && data.logs) {
                renderLogsPage(data.logs);
            } else {
                alert("ไม่พบข้อมูลประวัติกิจกรรม (Logs)");
            }
        } catch (err) {
            console.error("Error loading logs:", err);
            alert("เกิดข้อผิดพลาดในการโหลด Logs");
        }
    });

    document.getElementById('myPortfoliosLink')?.addEventListener('click', () => {
        if (state.user && state.user.username) {
            renderMyPortfolios(state.portfolios, state.user.username);
        } else {
            alert("กรุณาเข้าสู่ระบบก่อนตรวจเช็คผลงานส่วนตัวครับนาย");
        }
    });
}

// 🏡 หน้าแรกหลัก คลังพอร์ตโฟลิโอ และระบบสรุปสถิติต้นทาง
async function loadHomePage() {
    const data = await fetchPortfolios();
    const portfoliosArray = (data && data.portfolios) ? data.portfolios : [];
    if (data && data.announcement) state.announcement = data.announcement;
    
    setPortfolios(portfoliosArray);
    
    const initialFilters = {
        keyword: "",
        university: "ทั้งหมด",
        faculty: "ทั้งหมด",
        round: "ทั้งหมด"
    };
    
    renderPortfolios(portfoliosArray, initialFilters);
}

// 🔑 ผูกการทำงานปุ่มหน้าเข้าสู่ระบบ
function initLoginFormEvents() {
    document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;
        const res = await login(email, pass);
        if (res.success) {
            localStorage.setItem('username', email.split('@')[0]); 
            window.location.reload();
        } else {
            const msgEl = document.getElementById('loginMessage');
            if (msgEl) msgEl.innerText = res.message;
        }
    });
}

// 📝 ผูกการทำงานแบบฟอร์มสมัครสมาชิก
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

// 📤 เส้นทางฟอร์มยื่นส่งพอร์ตโฟลิโอและบันทึกแก้ไข
export function initPortfolioFormRoute() {
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
                if (imageFile) base64Image = await convertFileToBase64(imageFile);

                const uniSelect = document.getElementById('port-university-select');
                const uniOtherInput = document.getElementById('port-university-other');
                const facSelect = document.getElementById('port-faculty-select');
                const facOtherInput = document.getElementById('port-faculty-other');

                const finalUniversity = uniSelect && uniSelect.value === 'อื่นๆ' ? uniOtherInput.value.trim() : (uniSelect ? uniSelect.value : "");
                const finalFaculty = facSelect && facSelect.value === 'อื่นๆ' ? facOtherInput.value.trim() : (facSelect ? facSelect.value : "");

                const isEditMode = !!window.oldPortfolioTitleForUpdate;
                let originalImageUrl = "";
                if (isEditMode && Array.isArray(state.portfolios)) {
                    const oldPort = state.portfolios.find(p => p.title === window.oldPortfolioTitleForUpdate && p.sender === state.user.username);
                    if (oldPort) originalImageUrl = oldPort.image_url || "";
                }

                const portfolioData = {
                    action: isEditMode ? "update" : "create",
                    title_old: window.oldPortfolioTitleForUpdate || "",
                    fullname: document.getElementById('port-fullname').value,
                    nickname: document.getElementById('port-nickname').value,
                    major: document.getElementById('port-major').value,
                    gpax: document.getElementById('port-gpax').value,
                    round: document.getElementById('port-round').value,
                    title: document.getElementById('port-title').value,
                    intro: document.getElementById('port-intro').value,
                    port_link: document.getElementById('port-link').value,
                    sender: document.getElementById('port-sender').value,
                    university: finalUniversity,
                    faculty: finalFaculty,
                    image_base64: base64Image,
                    image_url_old: originalImageUrl
                };

                const result = await submitPortfolio(portfolioData);
                if (result.status === "success") {
                    alert("🎉 อัปโหลดและบันทึกพอร์ตเรียบร้อย!");
                    window.oldPortfolioTitleForUpdate = null;
                    form.reset();
                    loadHomePage(); 
                } else {
                    alert("เกิดข้อผิดพลาดจากระบบ: " + result.message);
                    submitBtn.disabled = false;
                    submitBtn.innerText = "🚀 ส่งพอร์ตโฟลิโอเข้าระบบ";
                }
            } catch (error) {
                alert("ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
                submitBtn.disabled = false;
                submitBtn.innerText = "🚀 ส่งพอร์ตโฟลิโอเข้าระบบ";
            }
        });
    }
}
// =================================================================
// 🛡️ ฟังก์ชันคุมเส้นทางระบบแอดมิน (รวมหน้าต่างลบพอร์ต และสิทธิ์)
// =================================================================
async function initAdminDashboardRoute() {
    const userRole = state.user.role;
    if (userRole !== 'admin' && userRole !== 'superadmin') {
        alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้!");
        loadHomePage();
        return;
    }

    const data = await fetchPortfolios();
    setPortfolios(data && data.portfolios ? data.portfolios : []);
    
    // 1. เรนเดอร์หน้าจอ
    renderAdminDashboard(state.portfolios, userRole);

    // 2. ใช้ Event Delegation ผูก Event ที่ appContainer จุดเดียวเท่านั้น
    const appContainer = document.getElementById('app');
    
    // เคลียร์ onclick เก่าทิ้งก่อน เพื่อไม่ให้ทำงานซ้ำ
    appContainer.onclick = null; 
    
    appContainer.onclick = async (e) => {
        const target = e.target;
        
        // ดึงค่า fullname และ title จากปุ่มที่คลิก
        const fullname = target.getAttribute('data-fullname');
        const title = target.getAttribute('data-title');

        // ถ้าคลิกโดนปุ่มอนุมัติ
        if (target.classList.contains('approve-btn')) {
            if (!confirm(`ยืนยันการอนุมัติพอร์ตของ ${fullname}?`)) return;
            const res = await managePortfolioStatus(fullname, title, true); // true = อนุมัติ
            if(res && res.status === "success") { 
                alert("อนุมัติสำเร็จ!"); 
                initAdminDashboardRoute(); 
            }
        }

        // ถ้าคลิกโดนปุ่มปฏิเสธ/ลบ
        else if (target.classList.contains('reject-btn')) {
            if (confirm(`ยืนยันการลบ/ปฏิเสธผลงาน "${title}"?`)) {
                const res = await managePortfolioStatus(fullname, title, false); // false = ลบ/ปฏิเสธ
                if(res && res.status === "success") { 
                    alert("ดำเนินการสำเร็จ!"); 
                    initAdminDashboardRoute(); 
                }
            }
        }
        
        // ถ้าคลิกโดนปุ่มดูรายละเอียด
        else if (target.classList.contains('view-details-btn')) {
            const port = state.portfolios.find(p => p.fullname === fullname && p.title === title);
            if(port) renderPortfolioModal(port);
        }
    };
}

// ⚡ ระบบดักจับการกรอกข้อมูลและค้นหาแบบ Multi-Filter จากหน้าจอ
// ========================================================================================
// 🛡️ ระบบศูนย์รวมการดักฟังคลิก (Event Delegation) ครอบคลุมทุกฟีเจอร์ (วางไว้ท้ายสุดของ js/app.js)
// ========================================================================================
// ========================================================================================
// 🛡️ ระบบศูนย์รวมการดักฟังคลิก (Event Delegation) ครอบคลุมทุกฟีเจอร์ (วางไว้ท้ายสุดของ js/app.js)
// ========================================================================================
document.addEventListener('click', async (e) => {
    const target = e.target;
    
    // 💡 ป้องกันคลิกโดน Emoji/ไอคอน ด้านในปุ่มแล้วค่า Attribute กลายเป็น null
    const viewBtn = target.closest('.view-details-btn');
    const approveBtn = target.closest('.approve-btn');
    const rejectBtn = target.closest('.reject-btn');
    const editBtn = target.closest('.edit-my-port-btn');
    const closeBtn = target.closest('.close-modal-btn'); // 🎯 ดักจับปุ่มกากบาทหรือปุ่มปิด Modal

    // ----------------------------------------------------------------
    // 🚪 ฟีเจอร์: ปุ่มกดปิดหน้าต่างป๊อปอัป Modal (กากบาทขวาบน หรือปุ่มปิดด้านล่าง)
    // ----------------------------------------------------------------
    if (closeBtn) {
        console.log("🚪 User กดปิดหน้าต่างรายละเอียดผลงาน");
        
        // ถ้าระบบใช้ ES Modules และเรียกใช้ตรงๆ ไม่ได้ ให้สั่งทำลาย/ซ่อน Element ผ่าน DOM
        const modalElement = document.getElementById('portfolio-modal') || document.getElementById('port-modal');
        if (modalElement) {
            // ถ้าระบบใช้การสลับ Class hidden ของ Tailwind
            modalElement.classList.add('hidden');
            
            // หรือถ้าระบบใช้การพ่น Element ใหม่ตลอดเวลา ให้ลบออกไปเลย
            // modalElement.remove(); 
        } else if (typeof closePortfolioModal === 'function') {
            closePortfolioModal();
        }
        return; // ทำงานเสร็จสิ้นให้หยุดทันที
    }

    // ----------------------------------------------------------------
    // 🔍 1. ฟีเจอร์: ปุ่มเปิดดูรายละเอียดพอร์ตรุ่นพี่ (Admin Dashboard / Main Page)
    // ----------------------------------------------------------------
    if (viewBtn) {
        const fullname = viewBtn.getAttribute('data-fullname');
        const title = viewBtn.getAttribute('data-title');
        
        console.log("⚡ กำลังเรียกดูรายละเอียดแฟ้มผลงานของ:", fullname, "| หัวข้อ:", title);
        
        const port = state.portfolios.find(p => p.fullname === fullname && p.title === title);
        if (port) {
            renderPortfolioModal(port);

            // 🚀 ยิง API ไปบอก Google Sheets ให้นับยอดวิวเพิ่มทันทีเมื่อเปิดดูพอร์ตสำเร็จ!
            fetch(window.state?.PORTFOLIO_API || "https://script.google.com/macros/s/AKfycbwTsIcprOjOEL9yRG3lWyjG4WcP-AVsql_pdzxWGcbCARTeYIx-QRZcrPGHkPfn1u2siw/exec", {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "text/plain" },
                body: JSON.stringify({
                    action: "incrementView", 
                    fullname: fullname,
                    title: title
                })
            }).then(res => res.json())
              .then(data => console.log("📊 บันทึกยอดวิวสำเร็จ:", data))
              .catch(err => console.error("⚠️ ไม่สามารถเพิ่มยอดวิวได้:", err));

        } else {
            alert("❌ ไม่พบข้อมูลพอร์ตโฟลิโอนี้ในระบบ");
        }
    }

    // ----------------------------------------------------------------
    // ✅ 2. ฟีเจอร์: ปุ่มอนุมัติผลงาน (pending -> approved)
    // ----------------------------------------------------------------
    else if (approveBtn) {
        const fullname = approveBtn.getAttribute('data-fullname');
        const title = approveBtn.getAttribute('data-title');
        
        if (!confirm(`❓ ยืนยันการ "อนุมัติ" ผลงานของ: ${fullname}\nหัวข้อ: "${title}" ให้แสดงผลบนหน้าหลัก?`)) return;
        
        const res = await managePortfolioStatus(fullname, title, true); 
        if (res && res.status === "success") {
            alert("✅ อนุมัติสำเร็จ! สถานะใน Google Sheet จะเปลี่ยนเป็น approved");
            location.reload(); 
        } else {
            alert("⚠️ ดำเนินการไม่สำเร็จ: " + (res?.message || "ติดต่อฐานข้อมูลไม่ได้"));
        }
    }

    // ----------------------------------------------------------------
    // ❌ 3. ฟีเจอร์: ปุ่มปฏิเสธพอร์ต / ลบพอร์ต
    // ----------------------------------------------------------------
    else if (rejectBtn) {
        const fullname = rejectBtn.getAttribute('data-fullname');
        const title = rejectBtn.getAttribute('data-title');
        
        if (!confirm(`🚨 คุณต้องการ "ปฏิเสธ/ลบ" ผลงานของ: ${fullname}\nหัวข้อ: "${title}" ใช่หรือไม่? (แถวข้อมูลจะถูกลบถาวร)`)) return;
        
        const res = await managePortfolioStatus(fullname, title, false); 
        if (res && res.status === "success") {
            alert("❌ ปฏิเสธและลบข้อมูลสำเร็จแล้ว");
            location.reload();
        } else {
            alert("⚠️ ดำเนินการไม่สำเร็จ: " + (res?.message || "ติดต่อฐานข้อมูลไม่ได้"));
        }
    }

    // ----------------------------------------------------------------
    // 🛠️ 4. ฟีเจอร์: ปุ่มแก้ไขผลงานชิ้นนี้ของผู้ใช้งานทั่วไป (Edit Profile Port)
    // ----------------------------------------------------------------
    else if (editBtn) {
        const btn = editBtn;
        initPortfolioFormRoute();
        
        setTimeout(() => {
            const nameInput = document.getElementById('port-fullname');
            if (nameInput) {
                nameInput.value = btn.dataset.fullname || "";
                document.getElementById('port-nickname').value = btn.dataset.nickname || "";
                document.getElementById('port-title').value = btn.dataset.title || "";
                document.getElementById('port-major').value = btn.dataset.major || "";
                document.getElementById('port-gpax').value = btn.dataset.gpax || "";
                document.getElementById('port-round').value = btn.dataset.round || "รอบ 1 Portfolio";
                document.getElementById('port-intro').value = btn.dataset.intro || "";
                document.getElementById('port-link').value = btn.dataset.link || "";
                
                window.oldPortfolioTitleForUpdate = btn.dataset.title;
                
                const submitBtn = document.getElementById('submit-portfolio-btn');
                if (submitBtn) {
                    submitBtn.innerText = "💾 ยืนยันการบันทึกข้อมูลแก้ไข";
                    submitBtn.classList.remove('bg-[#7A1C1C]');
                    submitBtn.classList.add('bg-amber-600');
                }
            }
        }, 300);
    }
});

// ----------------------------------------------------------------
// 📊 5. ฟีเจอร์: ระบบดักฟังคิวตัวกรองคัดกรองพอร์ตหน้าแรก (เหลือฟังก์ชันชุดเดียวจบ ไม่มีตัวซ้ำ)
// ----------------------------------------------------------------
document.body.addEventListener('input', (e) => {
    if (e.target.id === 'search-keyword') runFilter();
});

document.body.addEventListener('change', (e) => {
    const filterIds = ['search-university', 'search-faculty', 'search-round'];
    if (filterIds.includes(e.target.id)) {
        runFilter();
    }
});

function runFilter() {
    const filters = {
        keyword: document.getElementById('search-keyword')?.value || "",
        university: document.getElementById('search-university')?.value || "ทั้งหมด",
        faculty: document.getElementById('search-faculty')?.value || "ทั้งหมด",
        round: document.getElementById('search-round')?.value || "ทั้งหมด"
    };
    
    if (window.state && window.state.portfolios) {
        const filtered = window.state.portfolios.filter(p => {
            if (p.status !== 'approved') return false;
            
            const matchKeyword = !filters.keyword || 
                p.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
                p.fullname.toLowerCase().includes(filters.keyword.toLowerCase()) ||
                p.major.toLowerCase().includes(filters.keyword.toLowerCase()) ||
                p.intro.toLowerCase().includes(filters.keyword.toLowerCase());
                
            const matchUni = filters.university === "ทั้งหมด" || p.university === filters.university;
            const matchFaculty = filters.faculty === "ทั้งหมด" || p.faculty === filters.faculty;
            const matchRound = filters.round === "ทั้งหมด" || p.round === filters.round;
            
            return matchKeyword && matchUni && matchFaculty && matchRound;
        });
        
        updatePortfolioListUI(filtered);
    }
}

// 📍 ตัวปิดท้ายไฟล์ ผูกให้แอปเริ่มทำงาน
document.addEventListener('DOMContentLoaded', initApp);