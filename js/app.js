// js/app.js
import { state, setPortfolios, setUser } from './data.js'; 
import { fetchPortfolios, submitPortfolio, managePortfolioStatus, PORTFOLIO_API } from './api.js';
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
    renderLogsPage,
    togglePortfolioReaction
} from './ui.js';
import { login, logout, register, requestPasswordReset } from './auth.js';  

// 📍 ฟังก์ชันเริ่มต้นระบบกู้คืนและผูกสถานะแอปกลาง
// js/app.js
async function initApp() {
    window.state = state; 
    
    // ตั้งค่า API URL ให้เป็นมาตรฐานเดียวทั้งแอป (ดึงมาจาก api.js จุดเดียว ไม่ hardcode ซ้ำ)
    window.state.PORTFOLIO_API = PORTFOLIO_API;
    
    renderNavbar(state.user);
    bindNavbarEvents();
    
    if (!state.user.username) {
        renderLoginForm();
        initLoginFormEvents();
    } else {
        loadHomePage();
    }
}

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
    bindPortfolioFilterEvents();
}

function bindPortfolioFilterEvents() {
    const keywordInput = document.getElementById('search-keyword');
    const otherControls = [
        document.getElementById('search-university'),
        document.getElementById('search-faculty'),
        document.getElementById('search-round'),
        document.getElementById('search-sort')
    ].filter(Boolean);
    let debounceTimer;
    const updateResults = () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(runFilter, 120);
    };
    keywordInput?.addEventListener('input', updateResults);
    otherControls.forEach(control => control.addEventListener('change', updateResults));
}

// 🔑 ผูกการทำงานปุ่มหน้าเข้าสู่ระบบ
// js/app.js
function initLoginFormEvents() {
    const loginForm = document.getElementById('loginForm');
    document.getElementById('forgotPasswordBtn')?.addEventListener('click', async () => {
        const identifier = document.getElementById('loginIdentifier')?.value.trim();
        const msgEl = document.getElementById('loginMessage');
        if (!identifier) {
            if (msgEl) msgEl.innerText = "กรอกอีเมลที่ใช้สมัครก่อน แล้วกดลืมรหัสผ่านอีกครั้ง";
            return;
        }
        if (!identifier.includes('@')) {
            if (msgEl) msgEl.innerText = "การรีเซ็ตรหัสผ่านต้องใช้อีเมลที่ลงทะเบียนไว้";
            return;
        }
        const result = await requestPasswordReset(identifier);
        if (msgEl) msgEl.innerText = result.message;
        if (result.success) msgEl.className = "text-xs text-green-700 font-bold text-center";
    });
    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const identifier = document.getElementById('loginIdentifier').value.trim();
        const pass = document.getElementById('password').value;
        
        const res = await login(identifier, pass);
        if (res.success) {
            // 🎯 ไม่ต้องใช้ localStorage.setItem('username', ...) 
            // เพราะฟังก์ชัน setUser() ใน data.js จัดการให้เรียบร้อยแล้ว
            
            // ใช้ loadHomePage แทน location.reload() เพื่อไม่ให้เว็บขาวจากการโหลดใหม่
            loadHomePage(); 
            // อัปเดต Navbar ให้เป็นสถานะ Login แล้ว
            import('./ui.js').then(m => m.renderNavbar(window.state.user));
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
            const fullName = document.getElementById('regFullname').value.trim();
            const studentId = document.getElementById('regStudentId').value.trim();
            
            const res = await register(u, eVal, p, { fullName, studentId });
            if (res.success) {
                const loginResult = await login(eVal, p);

                if (loginResult.success) {
                    renderNavbar(state.user);
                    bindNavbarEvents();
                    await loadHomePage();
                } else {
                    const msgEl = document.getElementById('regMessage');
                    if (msgEl) msgEl.innerText = "สมัครสมาชิกสำเร็จ แต่ไม่สามารถเข้าสู่ระบบอัตโนมัติได้";
                    submitBtn.disabled = false;
                    submitBtn.innerText = "สมัครสมาชิก";
                }
            } else {
                document.getElementById('regMessage').innerText = res.message;
                submitBtn.disabled = false;
                submitBtn.innerText = "สมัครสมาชิก";
            }
        };
    }
}

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
            
            // 1. ดักจับไฟล์ PDF
            const pdfFile = document.getElementById('port-pdf') ? document.getElementById('port-pdf').files[0] : null;
            if (pdfFile && pdfFile.size > 2 * 1024 * 1024) { 
                alert("⚠️ ไฟล์ PDF ของคุณใหญ่เกิน 2 MB ครับ! กรุณาบีบอัดไฟล์ก่อนอัปโหลดครับ");
                return;
            }

            // 🎯 เพิ่มการเช็คขนาดรูปหน้าปกด้วย (เดิมเช็คแต่ PDF ทำให้รูปใหญ่เกินไปหลุดผ่านและทำให้ส่งข้อมูลไม่สำเร็จ)
            const imageFileCheck = document.getElementById('port-image') ? document.getElementById('port-image').files[0] : null;
            if (imageFileCheck && imageFileCheck.size > 2 * 1024 * 1024) {
                alert("⚠️ ไฟล์รูปหน้าปกของคุณใหญ่เกิน 2 MB ครับ! กรุณาบีบอัดไฟล์ก่อนอัปโหลดครับ");
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerText = "🔄 กำลังเริ่มต้นเตรียมข้อมูล...";

            try {
                // 2. แปลงรูปภาพหน้าปก
                const imageFile = document.getElementById('port-image').files[0];
                let base64Image = "";
                if (imageFile) {
                    submitBtn.innerText = "🖼️ กำลังประมวลผลรูปหน้าปก...";
                    await new Promise(r => setTimeout(r, 200));
                    base64Image = await convertFileToBase64(imageFile);
                }

                // 3. แปลงไฟล์ PDF พร้อมแสดงสถานะ
                let base64Pdf = "";
                if (pdfFile) {
                    submitBtn.innerText = "📄 กำลังแปลงไฟล์ PDF (อาจใช้เวลาสักครู่)...";
                    await new Promise(r => setTimeout(r, 500)); 
                    base64Pdf = await convertFileToBase64(pdfFile);
                    
                    if (!base64Pdf) throw new Error("ไม่สามารถอ่านข้อมูลไฟล์ PDF ได้");
                    console.log("แปลงไฟล์ PDF สำเร็จ ขนาด String:", base64Pdf.length);
                }

                submitBtn.innerText = "📡 กำลังส่งข้อมูลไปยังเซิร์ฟเวอร์...";

                const uniSelect = document.getElementById('port-university-select');
                const uniOtherInput = document.getElementById('port-university-other');
                const facSelect = document.getElementById('port-faculty-select');
                const facOtherInput = document.getElementById('port-faculty-other');

                const finalUniversity = uniSelect && uniSelect.value === 'อื่นๆ' ? uniOtherInput.value.trim() : (uniSelect ? uniSelect.value : "");
                const finalFaculty = facSelect && facSelect.value === 'อื่นๆ' ? facOtherInput.value.trim() : (facSelect ? facSelect.value : "");

                const isEditMode = !!window.oldPortfolioTitleForUpdate;
                let originalImageUrl = "";
                let originalPdfUrl = "";
                
                if (isEditMode && Array.isArray(state.portfolios)) {
                    const oldPort = state.portfolios.find(p => p.title === window.oldPortfolioTitleForUpdate && p.sender === state.user.username);
                    if (oldPort) {
                        originalImageUrl = oldPort.image_url || "";
                        originalPdfUrl = oldPort.port_link || "";
                    }
                }

                const portfolioData = {
                    action: isEditMode ? "update" : "create",
                    title_old: window.oldPortfolioTitleForUpdate || "",
                    fullname: document.getElementById('port-fullname')?.value || "",
                    nickname: document.getElementById('port-nickname')?.value || "",
                    major: document.getElementById('port-major')?.value || "",
                    gpax: document.getElementById('port-gpax')?.value || "",
                    round: document.getElementById('port-round')?.value || document.getElementById('port-round-select')?.value || "",
                    title: document.getElementById('port-title')?.value || "",
                    intro: document.getElementById('port-intro')?.value || "",
                    port_link: document.getElementById('port-link')?.value || "",
                    sender: document.getElementById('port-sender')?.value || "",
                    university: finalUniversity,
                    faculty: finalFaculty,
                    image_base64: base64Image,
                    image_url_old: originalImageUrl,
                    pdf_base64: base64Pdf,
                    port_link_old: originalPdfUrl
                };

                const result = await submitPortfolio(portfolioData);
                if (result.status === "success") {
                    alert("🎉 อัปโหลดและบันทึกพอร์ตเรียบร้อย!");
                    window.oldPortfolioTitleForUpdate = null;
                    form.reset();
                    loadHomePage(); 
                } else {
                    throw new Error(result.message || "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์");
                }
            } catch (error) {
                console.error("DEBUG ERROR:", error);
                alert("❌ ไม่สามารถส่งข้อมูลได้: " + error.message);
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
    const editBtn = target.closest('.edit-my-port-btn');
    const closeBtn = target.closest('.close-modal-btn'); // 🎯 ดักจับปุ่มกากบาทหรือปุ่มปิด Modal

    // 🧹 ฟีเจอร์: ล้างตัวกรองทั้งหมดให้กลับเป็นค่าเริ่มต้น
    if (target.id === 'clear-filters-btn') {
        const kw = document.getElementById('search-keyword') || document.getElementById('search-input');
        if (kw) kw.value = "";
        
        const uni = document.getElementById('search-university');
        if (uni) uni.value = "ทั้งหมด";
        
        const fac = document.getElementById('search-faculty');
        if (fac) fac.value = "ทั้งหมด";
        
        const rnd = document.getElementById('search-round');
        if (rnd) rnd.value = "ทั้งหมด";

        const sort = document.getElementById('search-sort');
        if (sort) sort.value = "newest";
        
        runFilter();
        return;
    }

    const reactionBtn = target.closest('.like-btn, .favorite-btn');
    if (reactionBtn) {
        togglePortfolioReaction(reactionBtn.dataset.portfolioKey, reactionBtn.classList.contains('favorite-btn') ? 'favorite' : 'like');
        if (document.getElementById('portfolio-cards-container')) runFilter();
        else renderMyPortfolios(state.portfolios, state.user.username);
        return;
    }

    // ----------------------------------------------------------------
    // 🚪 ฟีเจอร์: ปุ่มกดปิดหน้าต่างป๊อปอัป Modal (กากบาทขวาบน หรือปุ่มปิดด้านล่าง)
    // ----------------------------------------------------------------
    if (closeBtn) {
        console.log("🚪 User กดปิดหน้าต่างรายละเอียดผลงาน");
        
        const modalElement = document.getElementById('portfolio-modal') || document.getElementById('port-modal') || document.getElementById('modalOverlay');
        if (modalElement) {
            // ซ่อนหรือสลับคลาสตามโครงสร้างแอนิเมชัน
            modalElement.classList.remove('opacity-100');
            modalElement.classList.add('opacity-0', 'pointer-events-none');
            const innerContainer = document.getElementById('modalContainer');
            if (innerContainer) innerContainer.classList.add('scale-95');
        } else if (typeof closePortfolioModal === 'function') {
            closePortfolioModal();
        }
        return; // ทำงานเสร็จสิ้นให้หยุดทันที
    }

    // ----------------------------------------------------------------
    // 🔍 1. ฟีเจอร์: ปุ่มเปิดดูรายละเอียดพอร์ตรุ่นพี่ (Admin Dashboard / Main Page)
    // ----------------------------------------------------------------
// 🔍 1. ฟีเจอร์: ปุ่มเปิดดูรายละเอียดพอร์ตรุ่นพี่ (ปรับปรุงความแม่นยำในการค้นหา)
    if (viewBtn) {
        // ดึงค่ามาแล้วทำ .trim() ทันทีเพื่อป้องกันปัญหาช่องว่างเกิน
        const fullname = viewBtn.getAttribute('data-fullname').trim();
        const title = viewBtn.getAttribute('data-title').trim();
        
        console.log("⚡ กำลังเรียกดูรายละเอียดแฟ้มผลงานของ:", fullname, "| หัวข้อ:", title);
        
        const allPortfolios = state.portfolios || window.state?.portfolios || [];
        
        // 🎯 ใช้การเปรียบเทียบแบบ .trim().toLowerCase() เพื่อความชัวร์ 100%
        const port = allPortfolios.find(p => 
            String(p.fullname).trim().toLowerCase() === fullname.toLowerCase() && 
            String(p.title).trim().toLowerCase() === title.toLowerCase()
        );

        if (port) {
            renderPortfolioModal(port);

            // 🚀 เรียกใช้ API ตัวหลักตัวเดียวกันทั้งแอปพลิเคชัน
            const targetApi = window.state?.PORTFOLIO_API || "https://script.google.com/macros/s/AKfycby2Da9xYJnQFQT8ULn9aFraqrP2pHCy0tGDRLcAI2I8htBiIOHxVMQ4enKD21Ge5Z-5Vw/exec";
            fetch(targetApi, {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "text/plain" },
                body: JSON.stringify({
                    action: "incrementView", 
                    fullname: fullname, // ส่งค่าเดิมที่สะอาดแล้วไป
                    title: title
                })
            }).then(res => res.json())
              .then(data => console.log("📊 บันทึกยอดวิวสำเร็จ:", data))
              .catch(err => console.error("⚠️ ไม่สามารถเพิ่มยอดวิวได้:", err));

        } else {
            // โค้ดส่วนนี้จะทำงานเฉพาะเมื่อหาไม่เจอจริงๆ เท่านั้น
            console.error("❌ หาพอร์ตไม่เจอในฐานข้อมูล:", { fullname, title });
            alert("❌ ไม่พบข้อมูลพอร์ตโฟลิโอนี้ในระบบ");
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
                document.getElementById('port-intro').value = btn.dataset.intro || "";
                document.getElementById('port-link').value = btn.dataset.link || "";
                
                // 🎯 ตรวจสอบข้อมูล "รุ่น บ.ส." และจัดการหยอดค่าลงฟอร์ม
                const roundVal = btn.dataset.round || "บ.ส. 42";
                const selectRound = document.getElementById('port-round-select');
                const otherRound = document.getElementById('port-round-other');
                const hiddenRound = document.getElementById('port-round');

                if (selectRound) {
                    const hasOption = Array.from(selectRound.options).some(opt => opt.value === roundVal);
                    
                    if (hasOption) {
                        selectRound.value = roundVal;
                        if (otherRound) {
                            otherRound.classList.add('hidden');
                            otherRound.value = "";
                        }
                    } else {
                        selectRound.value = "อื่นๆ";
                        if (otherRound) {
                            otherRound.classList.remove('hidden');
                            otherRound.value = roundVal;
                        }
                    }
                    
                    if (hiddenRound) {
                        hiddenRound.value = roundVal;
                    }
                }

                // 🎯 ตรวจสอบและหยอดข้อมูลระบบ "สถาบัน/มหาวิทยาลัย"
                const uniVal = btn.dataset.university || "";
                const selectUni = document.getElementById('port-university-select');
                const otherUni = document.getElementById('port-university-other');
                if (selectUni) {
                    const hasUniOption = Array.from(selectUni.options).some(opt => opt.value === uniVal);
                    if (hasUniOption) {
                        selectUni.value = uniVal;
                        if (otherUni) otherUni.classList.add('hidden');
                    } else {
                        selectUni.value = "อื่นๆ";
                        if (otherUni) {
                            otherUni.classList.remove('hidden');
                            otherUni.value = uniVal;
                        }
                    }
                }

                // 🎯 ตรวจสอบและหยอดข้อมูลระบบ "คณะ"
                const facVal = btn.dataset.faculty || "";
                const selectFac = document.getElementById('port-faculty-select');
                const otherFac = document.getElementById('port-faculty-other');
                if (selectFac) {
                    const hasFacOption = Array.from(selectFac.options).some(opt => opt.value === facVal);
                    if (hasFacOption) {
                        selectFac.value = facVal;
                        if (otherFac) otherFac.classList.add('hidden');
                    } else {
                        selectFac.value = "อื่นๆ";
                        if (otherFac) {
                            otherFac.classList.remove('hidden');
                            otherFac.value = facVal;
                        }
                    }
                }
                
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
}); // 🎯 ซ่อมจุดพัง: ปิดด้วยวงเล็บและเซมิโคลอนให้สมบูรณ์เรียบร้อยครับ

// ----------------------------------------------------------------
// 📊 5. ฟีเจอร์: ระบบดักฟังคิวตัวกรองคัดกรองพอร์ตหน้าแรก (เหลือฟังก์ชันชุดเดียวจบ ไม่มีตัวซ้ำ)
// ----------------------------------------------------------------
// 📊 5. ฟีเจอร์: ระบบดักฟังคิวตัวกรองคัดกรองพอร์ตหน้าแรก (เวอร์ชันแก้ไขบั๊ก ID และค่าเริ่มต้น Dropdown)
document.body.addEventListener('input', (e) => {
    // 🎯 ดักจับทั้ง ID 'search-keyword' และ 'search-input' เผื่อหน้าบ้านใช้ตัวใดตัวหนึ่ง
    if (e.target.id === 'search-keyword' || e.target.id === 'search-input') {
        runFilter();
    }
});

document.body.addEventListener('change', (e) => {
    const filterIds = ['search-university', 'search-faculty', 'search-round', 'search-sort'];
    if (filterIds.includes(e.target.id)) {
        runFilter();
    }
});

function runFilter() {
    // 🎯 ดึงค่าคีย์เวิร์ดรองรับช่องกรอกค้นหาทั้งสองรูปแบบ ID
    const keywordInput = document.getElementById('search-keyword') || document.getElementById('search-input');
    const keywordValue = keywordInput ? keywordInput.value.trim() : "";

    const filters = {
        keyword: keywordValue,
        university: document.getElementById('search-university')?.value || "ทั้งหมด",
        faculty: document.getElementById('search-faculty')?.value || "ทั้งหมด",
        round: document.getElementById('search-round')?.value || "ทั้งหมด"
    };
    
    if (window.state && window.state.portfolios) {
        const filtered = window.state.portfolios.filter(p => {
            // คัดกรองเฉพาะตัวที่อนุมัติแล้วเท่านั้น
            if (p.status && p.status !== 'approved') return false;
            
            // 1. ตรวจสอบการจับคู่คีย์เวิร์ด (เช็คค่า null/undefined ของข้อมูลก่อนทำ lowercase)
            const matchKeyword = !filters.keyword || 
                (p.title && p.title.toLowerCase().includes(filters.keyword.toLowerCase())) ||
                (p.fullname && p.fullname.toLowerCase().includes(filters.keyword.toLowerCase())) ||
                (p.nickname && p.nickname.toLowerCase().includes(filters.keyword.toLowerCase())) ||
                (p.university && p.university.toLowerCase().includes(filters.keyword.toLowerCase())) ||
                (p.faculty && p.faculty.toLowerCase().includes(filters.keyword.toLowerCase())) ||
                (p.major && p.major.toLowerCase().includes(filters.keyword.toLowerCase())) ||
                (p.intro && p.intro.toLowerCase().includes(filters.keyword.toLowerCase()));
                
            // 2. ตรวจสอบการเลือก Dropdown (รองรับทั้งคำว่า "ทั้งหมด", ค่าว่าง และตัวเลือกเริ่มต้น "-- แสดงทั้งหมด --")
            const isUniAll = filters.university === "ทั้งหมด" || filters.university === "" || filters.university.includes("ทั้งหมด");
            const matchUni = isUniAll || p.university === filters.university;

            const isFacultyAll = filters.faculty === "ทั้งหมด" || filters.faculty === "" || filters.faculty.includes("ทั้งหมด");
            const matchFaculty = isFacultyAll || p.faculty === filters.faculty;

            const isRoundAll = filters.round === "ทั้งหมด" || filters.round === "" || filters.round.includes("ทั้งหมด");
            const matchRound = isRoundAll || p.round === filters.round;
            
            return matchKeyword && matchUni && matchFaculty && matchRound;
        });
        
        // 🚀 อัปเดตข้อมูลที่กรองเสร็จเรียบร้อยแล้วพ่นลงหน้าจอ UI ทันที
        updatePortfolioListUI(state.portfolios, filters);
    }
}

// 📍 ตัวปิดท้ายไฟล์ ผูกให้แอปเริ่มทำงาน
document.addEventListener('DOMContentLoaded', initApp);
