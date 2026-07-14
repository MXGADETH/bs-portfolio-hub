// js/ui.js
// ========================================================================================
// 🏛️ 1. NAVBAR UI (ลบเฉพาะปุ่มรูปบ้าน #homeLink ออก ส่วนลิงก์ตราโรงเรียนอยู่ครบถ้วนเหมือนเดิมครับ)
// ========================================================================================
export function renderNavbar(user) {
    const navContainer = document.getElementById('navbar');
    if (!navContainer) return;
    const hasAdminAccess = user.role === 'admin' || user.role === 'superadmin';

    // เช็คตัวแปรยศเพื่อนำไปประมวลผลการวาดกรอบ Badge สิทธิ์ระบบ
    const isSuperAdmin = user && user.role === 'superadmin';
    const isAdmin = user && user.role === 'admin';

    navContainer.innerHTML = `
        <nav class="bg-[#7A1C1C] text-white shadow-2xl border-b-4 border-[#D4AF37] p-4 select-none">
            <div class="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                
                <div class="flex items-center space-x-3.5 cursor-pointer bg-black/15 border border-amber-400/20 px-4 py-2.5 rounded-2xl shadow-inner backdrop-blur-sm group hover:border-amber-400/40 hover:bg-black/25 active:scale-98 transition duration-200" id="brandLink">
                    <div class="w-14 h-14 bg-white rounded-full border-2 border-[#D4AF37] shadow-md overflow-hidden flex items-center justify-center shrink-0 group-hover:scale-105 transition duration-300">
                        <img src="assets/logo/BSNOBG.png" alt="ตราโรงเรียนเบญจมราชานุสรณ์" class="w-full h-full object-cover scale-125" onerror="this.src='https://placehold.co/100x100/7A1C1C/FFFFFF?text=BS'">
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xl font-black tracking-widest text-white drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.6)] group-hover:text-amber-200 transition duration-200">B.S. PORTFOLIO HUB</span>
                        <div class="w-full h-[1px] bg-gradient-to-r from-amber-400/80 via-amber-200/40 to-transparent my-0.5"></div>
                        <span class="text-[10px] font-extrabold text-[#D4AF37] uppercase tracking-widest drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">คลังรวมแฟ้มผลงานรุ่นพี่ เบญจมราชานุสรณ์</span>
                    </div>
                </div>

                <div class="flex items-center flex-wrap justify-center gap-4 text-xs font-bold">
                    
                    <button id="uploadPortLink" class="relative group px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-100 hover:text-amber-300 transition duration-200 cursor-pointer overflow-hidden shadow-sm border border-white/5">
                        <span class="relative z-10 flex items-center gap-1">📝 ส่งแฟ้มผลงาน</span>
                        <span class="absolute bottom-0 left-0 w-full h-1 bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </button>
                    
                    ${hasAdminAccess ? `
                        <button id="adminLink" class="bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-black px-4 py-2.5 rounded-xl hover:from-amber-400 hover:to-yellow-400 hover:scale-102 active:scale-98 transition duration-200 shadow-md cursor-pointer flex items-center gap-1">
                            ⚙️ แผงควบคุมแอดมิน
                        </button>
                        
                        <button id="viewLogsBtn" class="bg-purple-600 hover:bg-purple-700 text-white font-black px-4 py-2.5 rounded-xl transition duration-200 shadow-md cursor-pointer flex items-center gap-1">
                            📜 ดู Logs
                        </button>
                    ` : ''}

                    <div class="h-6 w-[1px] bg-white/15 mx-1 hidden sm:block"></div>

                    ${user && user.username ? `
                        <div id="myPortfoliosLink" class="flex items-center space-x-3 bg-black/20 px-4 py-2.5 rounded-xl border border-white/10 hover:border-amber-400/40 hover:bg-black/40 shadow-inner cursor-pointer transform hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-200 select-none group" title="คลิกเพื่อดูคลังแฟ้มผลงานของฉัน">
                            
                            <span class="text-white font-black text-sm drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] tracking-wide group-hover:text-amber-300 transition">
                                👤 ${user.username}
                            </span>
                            
                            ${isSuperAdmin ? `
                                <span class="relative p-[2px] rounded-md overflow-hidden flex items-center justify-center shadow-md animate-pulse">
                                    <span class="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 to-purple-500 animate-[spin_3s_linear_infinite]"></span>
                                    <span class="relative px-2.5 py-0.5 rounded-[4px] text-[9px] font-black tracking-widest text-white bg-gray-900 uppercase">
                                        SUPERADMIN
                                    </span>
                                </span>
                            ` : isAdmin ? `
                                <span class="px-2.5 py-0.5 rounded-md text-[9px] font-black tracking-widest text-white border-2 border-[#D4AF37] bg-[#7A1C1C] uppercase shadow-sm">
                                    ADMIN
                                </span>
                            ` : `
                                <span class="px-2 py-0.5 rounded border border-gray-400/40 text-[9px] font-bold text-gray-300 bg-black/30 uppercase">
                                    USER
                                </span>
                            `}
                            
                            <div class="h-4 w-[1px] bg-white/10 mx-1"></div>
                            
                            <button id="logoutBtn" title="ออกจากระบบ" class="w-7 h-7 rounded-full bg-white/5 hover:bg-red-600/30 text-gray-300 hover:text-red-400 border border-white/10 hover:border-red-500/40 transition duration-200 flex items-center justify-center cursor-pointer shadow-sm active:scale-90" aria-label="Logout">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.8" stroke="currentColor" class="w-3.5 h-3.5 transform rotate-180">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                </svg>
                            </button>
                            
                        </div>
                    ` : `
                        <div class="flex items-center space-x-2">
                            <button id="loginLink" class="bg-white/5 hover:bg-white/15 text-gray-100 px-4 py-2.5 rounded-xl cursor-pointer border border-white/5">เข้าสู่ระบบ</button>
                            <button id="registerLink" class="bg-[#D4AF37] hover:bg-yellow-500 text-gray-900 font-black px-4 py-2.5 rounded-xl transition shadow-md hover:scale-102 duration-150 cursor-pointer">สมัครสมาชิก</button>
                        </div>
                    `}
                </div>

            </div>
        </nav>
    `;
}

const UNIVERSITY_THEMES = {
    "จุฬาลงกรณ์มหาวิทยาลัย": { color: "#ed1c24", text: "#ffffff", domain: "chula.ac.th" },
    "มหาวิทยาลัยธรรมศาสตร์": { color: "#f4bd18", text: "#3a1600", domain: "tu.ac.th" },
    "มหาวิทยาลัยเกษตรศาสตร์": { color: "#006b3f", text: "#ffffff", domain: "ku.ac.th", logo: "https://upload.wikimedia.org/wikipedia/th/thumb/5/51/Logo_ku_th.svg/1200px-Logo_ku_th.svg.png" },
    "มหาวิทยาลัยมหิดล": { color: "#0054a6", text: "#ffffff", domain: "mahidol.ac.th" },
    "มหาวิทยาลัยเชียงใหม่": { color: "#663399", text: "#ffffff", domain: "cmu.ac.th" },
    "มหาวิทยาลัยขอนแก่น": { color: "#8d2434", text: "#ffffff", domain: "kku.ac.th" },
    "มหาวิทยาลัยสงขลานครินทร์": { color: "#007c70", text: "#ffffff", domain: "psu.ac.th" },
    "มหาวิทยาลัยศรีนครินทรวิโรฒ": { color: "#7b1d7e", text: "#ffffff", domain: "swu.ac.th" },
    "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง": { color: "#f25b1d", text: "#ffffff", domain: "kmitl.ac.th" },
    "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี": { color: "#f15a24", text: "#ffffff", domain: "kmutt.ac.th" },
    "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ": { color: "#8c1d40", text: "#ffffff", domain: "kmutnb.ac.th" },
    "มหาวิทยาลัยศิลปากร": { color: "#2d497c", text: "#ffffff", domain: "su.ac.th" }
};

function getUniversityTheme(university) {
    const theme = UNIVERSITY_THEMES[university] || { color: "#741b2a", text: "#ffffff", domain: "" };
    return {
        ...theme,
        logo: theme.logo || (theme.domain ? `https://www.google.com/s2/favicons?domain=${theme.domain}&sz=128` : "https://placehold.co/128x128/741B2A/FFFFFF?text=U")
    };
}

function portfolioKey(portfolio) {
    return `${portfolio.sender || portfolio.fullname || ''}::${portfolio.title || ''}`;
}

function getReactionStore() {
    const username = localStorage.getItem('username') || 'guest';
    const storageKey = `portfolio-reactions-${username}`;
    try {
        return { storageKey, data: JSON.parse(localStorage.getItem(storageKey)) || { liked: [], favorites: [] } };
    } catch {
        return { storageKey, data: { liked: [], favorites: [] } };
    }
}

export function getPortfolioReactions() {
    return getReactionStore().data;
}

export function togglePortfolioReaction(key, type) {
    const { storageKey, data } = getReactionStore();
    const list = type === 'favorite' ? data.favorites : data.liked;
    const index = list.indexOf(key);
    if (index >= 0) list.splice(index, 1); else list.push(key);
    localStorage.setItem(storageKey, JSON.stringify(data));
    return index < 0;
}

// ========================================================================================
// 📊 2. MAIN HUB (โครงสร้างสถิติอันดับ, กล่องตัวกรอง 4 มิติ และดึงโลโก้แผนการเรียน CM.jpg ท้ายเว็บกลับมา)
// ========================================================================================
export function renderPortfolios(portfolios, filters = { keyword: "", university: "ทั้งหมด", faculty: "ทั้งหมด", round: "ทั้งหมด" }) {
    const appContainer = document.getElementById('app');
    if (!appContainer) return;
    
    const approvedList = portfolios.filter(p => p.status === 'approved' || !p.status);
    const totalCount = approvedList.length;

    const uniCounts = {};
    approvedList.forEach(p => { if(p.university) uniCounts[p.university] = (uniCounts[p.university] || 0) + 1; });
    const sortedUniversities = Object.entries(uniCounts).sort((a, b) => b[1] - a[1]);
    
    const facultyCounts = {};
    approvedList.forEach(p => { if(p.faculty) facultyCounts[p.faculty] = (facultyCounts[p.faculty] || 0) + 1; });
    const sortedFaculties = Object.entries(facultyCounts).sort((a, b) => b[1] - a[1]);

    const top1University = sortedUniversities[0] ? sortedUniversities[0][0] : "ยังไม่มีข้อมูล";
    const top1UniversityCount = sortedUniversities[0] ? sortedUniversities[0][1] : 0;
    const top1Faculty = sortedFaculties[0] ? sortedFaculties[0][0] : "ยังไม่มีข้อมูล";
    const top1FacultyCount = sortedFaculties[0] ? sortedFaculties[0][1] : 0;

    const top10Universities = sortedUniversities.slice(0, 10);
    const top10Faculties = sortedFaculties.slice(0, 10);
    const facultyUniversityCounts = {};
    approvedList.forEach(p => {
        if (!p.faculty || !p.university) return;
        facultyUniversityCounts[p.faculty] ||= {};
        facultyUniversityCounts[p.faculty][p.university] = (facultyUniversityCounts[p.faculty][p.university] || 0) + 1;
    });
    const leadingUniversityForFaculty = (faculty) => Object.entries(facultyUniversityCounts[faculty] || {})
        .sort((a, b) => b[1] - a[1])[0]?.[0] || "";
    const maxUniversityCount = top10Universities[0]?.[1] || 1;
    const maxFacultyCount = top10Faculties[0]?.[1] || 1;

    const famousUniversities = ["จุฬาลงกรณ์มหาวิทยาลัย", "มหาวิทยาลัยธรรมศาสตร์", "มหาวิทยาลัยเกษตรศาสตร์", "มหาวิทยาลัยมหิดล", "มหาวิทยาลัยเชียงใหม่", "มหาวิทยาลัยขอนแก่น", "มหาวิทยาลัยสงขลานครินทร์", "มหาวิทยาลัยศรีนครินทรวิโรฒ", "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง", "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี", "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ", "มหาวิทยาลัยศิลปากร"];
    const famousFaculties = ["วิศวกรรมศาสตร์", "แพทยศาสตร์", "วิทยาศาสตร์", "พาณิชยศาสตร์และการบัญชี / บริหารธุรกิจ", "มนุษยศาสตร์ / อักษรศาสตร์ / ศิลปศาสตร์", "นิติศาสตร์", "รัฐศาสตร์", "นิเทศศาสตร์ / วารสารศาสตร์", "สถาปัตยกรรมศาสตร์", "ครุศาสตร์ / ศึกษาศาสตร์", "เทคโนโลยีสารสนเทศ / นวัตกรรมดิจิทัล", "พยาบาลศาสตร์"];

    const sheetUniversities = approvedList.map(p => p.university).filter(Boolean);
    const otherUniversities = [...new Set(sheetUniversities.filter(uni => !famousUniversities.includes(uni)))].sort();
    const sheetFaculties = approvedList.map(p => p.faculty).filter(Boolean);
    const otherFaculties = [...new Set(sheetFaculties.filter(fac => !famousFaculties.includes(fac)))].sort();
    const featuredUniversityLogos = Object.entries(UNIVERSITY_THEMES).slice(0, 6).map(([name, theme], index) => ({
        name,
        logo: getUniversityTheme(name).logo,
        index
    }));

    appContainer.innerHTML = `
        <div class="my-6">
            <div class="portfolio-hero relative my-8 p-6 md:p-8 rounded-3xl overflow-hidden shadow-xl border border-[#7A1C1C]/10 bg-gradient-to-br from-[#7A1C1C]/5 via-white to-amber-500/[0.03]">
                <div class="absolute inset-0 opacity-[0.03] pointer-events-none select-none" style="background-image: linear-gradient(#7A1C1C 1px, transparent 1px), linear-gradient(90deg, #7A1C1C 1px, transparent 1px); background-size: 20px 20px;"></div>
                <div class="hero-university-logos" aria-hidden="true">
                    ${featuredUniversityLogos.map(({ name, logo, index }) => `<img class="hero-university-logo hero-university-logo-${index + 1}" src="${logo}" alt="" onerror="this.style.display='none'">`).join('')}
                </div>
                <div class="relative z-10">
                    <div class="inline-flex items-center space-x-2 bg-white/80 border border-[#7A1C1C]/15 px-3 py-1 rounded-full mb-4 shadow-sm backdrop-blur-sm">
                        <span class="flex h-2 w-2 relative">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
                        </span>
                        <span class="text-[10px] font-black uppercase tracking-widest text-[#7A1C1C]">Technology Software & Robotics Hub</span>
                    </div>
                    <h1 class="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                        <span class="bg-gradient-to-r from-[#7A1C1C] via-[#912323] to-[#5f0013] bg-clip-text text-transparent">คลังผลงาน</span><span class="bg-gradient-to-r from-[#D4AF37] to-amber-500 bg-clip-text text-transparent drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.15)]">รุ่นพี่</span>
                    </h1>
                    <div class="w-32 h-[3px] bg-gradient-to-r from-[#7A1C1C] via-[#D4AF37] to-transparent my-3.5 rounded-full"></div>
                    <p class="text-gray-700 text-xs md:text-sm font-medium max-w-3xl leading-relaxed">
                        ✨ แหล่งรวมข้อมูล สถิติเชิงลึก และแรงบันดาลใจในการทำพอร์ตโฟลิโอจากพี่สู่น้องอย่างเป็นทางการของ โรงเรียนเบญจมราชานุสรณ์
                    </p>
                </div>
            </div>

            <div class="stats-grid grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                <div class="stat-card bg-[#7A1C1C] text-white p-5 rounded-2xl shadow-lg border-b-4 border-[#D4AF37] relative overflow-hidden flex flex-col justify-center min-h-[110px]">
                    <div class="absolute right-4 bottom-2 text-6xl opacity-10 select-none">📁</div>
                    <span class="text-xs uppercase tracking-wider text-[#D4AF37] font-bold">พอร์ตโฟลิโอทั้งหมด</span>
                    <h2 class="text-4xl font-extrabold mt-1">${totalCount} <span class="text-lg font-normal text-gray-200">ผลงาน</span></h2>
                </div>
                <div class="stat-card bg-white p-5 rounded-2xl shadow-md border-l-4 border-[#D4AF37] relative overflow-hidden flex flex-col justify-center min-h-[110px]">
                    <div class="absolute right-4 bottom-2 text-6xl text-gray-100 opacity-60 select-none">🏛️</div>
                    <span class="text-xs uppercase tracking-wider text-[#7A1C1C] font-bold">🏛️ สถาบันติดสูงสุดอันดับ 1</span>
                    <h2 class="text-xl font-bold text-gray-800 mt-1 truncate pr-12" title="${top1University}">${top1University}</h2>
                    <p class="text-xs text-gray-500 mt-0.5">จำนวนรวม: <strong class="text-[#7A1C1C]">${top1UniversityCount} ชิ้น</strong></p>
                </div>
                <div class="stat-card bg-white p-5 rounded-2xl shadow-md border-l-4 border-[#7A1C1C] relative overflow-hidden flex flex-col justify-center min-h-[110px]">
                    <div class="absolute right-4 bottom-2 text-6xl text-gray-100 opacity-60 select-none">🎓</div>
                    <span class="text-xs uppercase tracking-wider text-purple-800 font-bold">🎓 คณะยอดนิยมอันดับ 1</span>
                    <h2 class="text-xl font-bold text-gray-800 mt-1 truncate pr-12" title="${top1Faculty}">${top1Faculty}</h2>
                    <p class="text-xs text-gray-500 mt-0.5">จำนวนรวม: <strong class="text-[#7A1C1C]">${top1FacultyCount} ชิ้น</strong></p>
                </div>
            </div>

            <div class="filter-panel bg-white p-6 rounded-2xl border-2 border-[#7A1C1C]/20 shadow-lg mb-8">
                <div class="flex items-center space-x-2.5 text-[#7A1C1C] border-b-2 border-gray-100 pb-3 mb-5">
                    <span class="text-lg">🔍</span>
                    <h3 class="text-base font-extrabold tracking-wide">ระบบเจาะจงค้นหาและคัดกรองข้อมูลพอร์ตโฟลิโอ</h3>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                    <div class="bg-gray-50/60 p-3 rounded-xl border border-gray-200 flex flex-col justify-between">
                        <label class="block text-xs font-extrabold text-[#7A1C1C] uppercase tracking-wider mb-2">📝 ค้นหาคีย์เวิร์ด / ชื่อ</label>
                        <input type="text" id="search-keyword" value="${filters.keyword}" placeholder="พิมพ์คำค้นหา..." class="w-full p-2.5 text-xs font-bold border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#7A1C1C] bg-white">
                    </div>
                    <div class="bg-gray-50/60 p-3 rounded-xl border border-gray-200 flex flex-col justify-between">
                        <label class="block text-xs font-extrabold text-[#7A1C1C] uppercase tracking-wider mb-2">🏛️ เลือกมหาวิทยาลัย</label>
                        <select id="search-university" class="w-full p-2.5 text-xs font-bold border-2 border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                            <option value="ทั้งหมด">-- แสดงทั้งหมด --</option>
                            <optgroup label="🌟 สถาบันยอดนิยมระดับประเทศ">
                                ${famousUniversities.map(uni => `<option value="${uni}" ${filters.university === uni ? 'selected' : ''}>${uni}</option>`).join('')}
                            </optgroup>
                            ${otherUniversities.length > 0 ? `<optgroup label="📝 สถาบันอื่น ๆ">${otherUniversities.map(uni => `<option value="${uni}" ${filters.university === uni ? 'selected' : ''}>${uni}</option>`).join('')}</optgroup>` : ''}
                        </select>
                    </div>
                    <div class="bg-gray-50/60 p-3 rounded-xl border border-gray-200 flex flex-col justify-between">
                        <label class="block text-xs font-extrabold text-[#7A1C1C] uppercase tracking-wider mb-2">🎓 เลือกคณะ</label>
                        <select id="search-faculty" class="w-full p-2.5 text-xs font-bold border-2 border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                            <option value="ทั้งหมด">-- แสดงทั้งหมด --</option>
                            <optgroup label="🎓 คณะยอดนิยม">
                                ${famousFaculties.map(fac => `<option value="${fac}" ${filters.faculty === fac ? 'selected' : ''}>${fac}</option>`).join('')}
                            </optgroup>
                            ${otherFaculties.length > 0 ? `<optgroup label="📝 คณะอื่น ๆ">${otherFaculties.map(fac => `<option value="${fac}" ${filters.faculty === fac ? 'selected' : ''}>${fac}</option>`).join('')}</optgroup>` : ''}
                        </select>
                    </div>
                    <div class="bg-gray-50/60 p-3 rounded-xl border border-gray-200 flex flex-col justify-between">
                        <label class="block text-xs font-extrabold text-[#7A1C1C] uppercase tracking-wider mb-2">🎯 รุ่นปี</label>
                        <select id="search-round" class="w-full p-2.5 text-xs font-bold border-2 border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                            <option value="ทั้งหมด">-- แสดงทุกรุ่นปี --</option>
                            <option value="บ.ส. 40">รุ่นพี่ บ.ส. 40</option>
                            <option value="บ.ส. 41">รุ่นพี่ บ.ส. 41</option>
                            <option value="บ.ส. 42">รุ่นพี่ บ.ส. 42</option>
                            <option value="บ.ส. 43">รุ่นพี่ บ.ส. 43</option>
                        </select>
                    </div>
                    <div class="bg-gray-50/60 p-3 rounded-xl border border-gray-200 flex flex-col justify-between">
                        <label class="block text-xs font-extrabold text-[#7A1C1C] uppercase tracking-wider mb-2">👁️ เรียงตามยอดวิว</label>
                        <select id="search-sort" class="w-full p-2.5 text-xs font-bold border-2 border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                            <option value="newest">ค่าเริ่มต้น</option>
                            <option value="most_views">ยอดวิว: มากไปน้อย</option>
                            <option value="least_views">ยอดวิว: น้อยไปมาก</option>
                            <option value="most_likes">ยอดกดใจ: มากไปน้อย</option>
                            <option value="favorites_first">รายการโปรดก่อน</option>
                        </select>
                    </div>
                </div>
                <div class="mt-4 pt-3 border-t flex justify-between items-center text-xs">
                    <div class="font-bold text-sm text-gray-700">ตรงเงื่อนไข: <span id="filtered-count" class="text-white bg-[#7A1C1C] px-2 py-0.5 rounded-full text-xs font-black">0</span></div>
                    <button id="clear-filters-btn" class="text-xs text-[#7A1C1C] hover:text-red-700 font-black border border-[#D4AF37]/40 px-3 py-1.5 rounded-xl cursor-pointer">🧹 ล้างตัวกรองทั้งหมด</button>
                </div>
            </div>

            <div id="portfolio-cards-container"></div>

            <section class="ranking-panels grid grid-cols-1 lg:grid-cols-2 gap-6 pt-8 border-t border-gray-200 mb-12">
                <div class="ranking-panel ranking-panel--university">
                    <div class="ranking-panel__header">
                        <div><p class="ranking-panel__eyebrow">University ranking</p><h3>สถาบันติดสูงสุด</h3></div>
                        <span class="ranking-panel__badge">TOP 10</span>
                    </div>
                    <div class="ranking-list">
                        ${top10Universities.map(([university, count], idx) => {
                            const theme = getUniversityTheme(university);
                            return `<div class="ranking-row" style="--ranking-color: ${theme.color};">
                                <span class="ranking-rank ${idx < 3 ? 'is-top' : ''}">${idx + 1}</span>
                                <img class="ranking-logo" src="${theme.logo}" alt="ตรา ${university}" onerror="this.src='https://placehold.co/96x96/741B2A/FFFFFF?text=U'">
                                <div class="ranking-copy"><div class="ranking-name" title="${university}">${university}</div><div class="ranking-bar"><span style="width: ${(count / maxUniversityCount) * 100}%"></span></div></div>
                                <span class="ranking-count">${count}<small>พอร์ต</small></span>
                            </div>`;
                        }).join('') || '<p class="ranking-empty">ยังไม่มีข้อมูลสถาบัน</p>'}
                    </div>
                </div>
                <div class="ranking-panel ranking-panel--faculty">
                    <div class="ranking-panel__header">
                        <div><p class="ranking-panel__eyebrow">Faculty ranking</p><h3>คณะยอดนิยม</h3></div>
                        <span class="ranking-panel__badge">TOP 10</span>
                    </div>
                    <p class="ranking-panel__hint">ตราแสดงมหาวิทยาลัยที่มีผลงานของคณะนั้นมากที่สุด</p>
                    <div class="ranking-list">
                        ${top10Faculties.map(([faculty, count], idx) => {
                            const university = leadingUniversityForFaculty(faculty);
                            const theme = getUniversityTheme(university);
                            return `<div class="ranking-row" style="--ranking-color: ${theme.color};">
                                <span class="ranking-rank ${idx < 3 ? 'is-top' : ''}">${idx + 1}</span>
                                <img class="ranking-logo" src="${theme.logo}" alt="ตรา ${university || 'มหาวิทยาลัย'}" title="${university}" onerror="this.src='https://placehold.co/96x96/741B2A/FFFFFF?text=U'">
                                <div class="ranking-copy"><div class="ranking-name" title="${faculty}">${faculty}</div><div class="ranking-bar"><span style="width: ${(count / maxFacultyCount) * 100}%"></span></div></div>
                                <span class="ranking-count">${count}<small>พอร์ต</small></span>
                            </div>`;
                        }).join('') || '<p class="ranking-empty">ยังไม่มีข้อมูลคณะ</p>'}
                    </div>
                </div>
            </section>

            <footer class="mt-16 bg-[#7A1C1C] text-white rounded-3xl border-b-4 border-[#D4AF37] p-6 shadow-xl select-none">
                <div class="flex flex-col sm:flex-row items-center justify-center gap-5">
                    <div class="w-16 h-16 bg-white rounded-full border-2 border-[#D4AF37] overflow-hidden flex items-center justify-center shrink-0">
                        <img src="assets/logo/CM.jpg" alt="ตราแผนการเรียน" class="w-full h-full object-cover scale-110" onerror="this.src='https://placehold.co/100x100/7A1C1C/FFFFFF?text=CM'">
                    </div>
                    <div class="hidden sm:block h-12 w-[1.5px] bg-gradient-to-b from-amber-400/60 via-amber-200/20 to-transparent"></div>
                    <div class="text-center sm:text-left flex flex-col justify-center">
                        <span class="text-base font-black tracking-widest bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-100 bg-clip-text text-transparent">TECHNOLOGY SOFTWARE & ROBOTICS</span>
                        <span class="text-[11px] font-bold text-amber-200/90 tracking-wide mt-0.5">แผนการเรียนเทคโนโลยีซอฟต์แวร์และหุ่นยนต์ • โรงเรียนเบญจมราชานุสรณ์</span>
                        <p class="text-[9px] font-medium text-red-200/60 mt-1">© 2026 B.S. Portfolio Hub. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
        <div id="portfolio-modal-container"></div>
    `;

    // ผูก Event สลับซ่อน/แสดงช่องกรอก มหาลัย/คณะ "อื่นๆ"
    document.getElementById("port-university-select")?.addEventListener("change", (e) => {
        const otherInput = document.getElementById("port-university-other");
        if(otherInput) otherInput.classList.toggle("hidden", e.target.value !== "อื่นๆ");
    });
    document.getElementById("port-faculty-select")?.addEventListener("change", (e) => {
        const otherInput = document.getElementById("port-faculty-other");
        if(otherInput) otherInput.classList.toggle("hidden", e.target.value !== "อื่นๆ");
    });

    updatePortfolioListUI(approvedList, filters);
}

// ========================================================================================
// 🔍 3. ฟังก์ชันจัดเรียงและคัดกรองพอร์ตชิ้นย่อย (🎯 กล่องเตือนสั้น "🔍 ไม่พบผลงาน")
// ========================================================================================
// ========================================================================================
// 🔍 3. ฟังก์ชันจัดเรียง คัดกรอง และวาดการ์ดผลงาน (ฉบับสมบูรณ์ แก้ไขปุ่มกลับหัว + ป้องกันบั๊กข้อความตัวเลข)
// ========================================================================================
// ========================================================================================
// 🔍 3. ฟังก์ชันคัดกรองและวาดการ์ดผลงาน (เวอร์ชันเปลี่ยนรอบสมัครเป็นรุ่นพี่ + ซ่อมแซมปุ่มกลับหัว)
// ========================================================================================
export function updatePortfolioListUI(portfolios, filters) {
    const cardsContainer = document.getElementById('portfolio-cards-container');
    const countBadge = document.getElementById('filtered-count');
    const sortSelect = document.getElementById('search-sort'); 
    if (!cardsContainer) return;

    const safetyPortfolios = Array.isArray(portfolios) ? portfolios : [];
    const reactions = getPortfolioReactions();

    // 1. กรองข้อมูล (Filter)
    const displayedList = safetyPortfolios.filter(p => {
        if (!p || (p.status && p.status !== 'approved')) return false;

        const kw = (filters && filters.keyword) ? filters.keyword.toLowerCase().trim() : "";
        
        const matchKeyword = !kw || 
            String(p.title || "").toLowerCase().includes(kw) ||
            String(p.fullname || "").toLowerCase().includes(kw) ||
            String(p.nickname || "").toLowerCase().includes(kw) ||
            String(p.university || "").toLowerCase().includes(kw) ||
            String(p.faculty || "").toLowerCase().includes(kw) ||
            String(p.intro || "").toLowerCase().includes(kw) ||
            String(p.major || "").toLowerCase().includes(kw);

        const targetUni = (filters && filters.university) ? filters.university : "ทั้งหมด";
        const targetFac = (filters && filters.faculty) ? filters.faculty : "ทั้งหมด";
        
        // 🎯 เปลี่ยนตัวแปรดักฟังจากดักรอบ (round) มาดักรุ่นของรุ่นพี่แทน 
        // (โดยใช้ข้อมูลที่เคยบันทึกในช่อง round เดิมไปพลางก่อน หรือคอลัมน์รุ่นที่นายสร้าง)
        const targetRound = (filters && filters.round) ? filters.round : "ทั้งหมด";

        return matchKeyword && 
               (targetUni === "ทั้งหมด" || p.university === targetUni) &&
               (targetFac === "ทั้งหมด" || p.faculty === targetFac) &&
               (targetRound === "ทั้งหมด" || p.round === targetRound);
    });

    // 2. เรียงลำดับ (Sort)
    const sortVal = sortSelect ? sortSelect.value : "newest";
    displayedList.sort((a, b) => {
        if(sortVal === "most_views") return (Number(b.views) || 0) - (Number(a.views) || 0);
        if(sortVal === "least_views") return (Number(a.views) || 0) - (Number(b.views) || 0);
        if(sortVal === "most_likes") return ((Number(b.likes) || 0) + (reactions.liked.includes(portfolioKey(b)) ? 1 : 0)) - ((Number(a.likes) || 0) + (reactions.liked.includes(portfolioKey(a)) ? 1 : 0));
        if(sortVal === "favorites_first") return Number(reactions.favorites.includes(portfolioKey(b))) - Number(reactions.favorites.includes(portfolioKey(a)));
        return 0; 
    });

    if (countBadge) countBadge.innerText = `${displayedList.length} รายการ`;

    // เคสค้นหาไม่เจอผลลัพธ์
    if (displayedList.length === 0) {
        cardsContainer.innerHTML = `
            <div class="w-full text-center py-16 text-gray-500 font-black text-lg tracking-wide bg-white rounded-2xl border-2 border-dashed border-gray-200 shadow-sm my-6">
                🔍 ไม่พบผลงาน
            </div>
        `;
        return;
    }

    const loggedInUser = localStorage.getItem("username") || "";

    // 3. เรนเดอร์การ์ดผลงานใหม่
    cardsContainer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            ${displayedList.map((p) => {
                const imageSrc = p.image_url && p.image_url !== "" ? p.image_url : 'https://placehold.co/600x400/7A1C1C/FFFFFF?text=BS+Portfolio';
                const universityTheme = getUniversityTheme(p.university);
                const key = portfolioKey(p);
                const isLiked = reactions.liked.includes(key);
                const isFavorite = reactions.favorites.includes(key);
                const likeCount = (Number(p.likes) || 0) + (isLiked ? 1 : 0);
                
                // 🎯 ฟอกข้อความแสดงผล: ถ้าในฐานข้อมูลยังติดคำว่า "รอบ 1 Portfolio" ให้แปลงข้อความเป็นชื่อรุ่นสวยๆ ทันที
                let genDisplay = p.round || 'ไม่ระบุรุ่น';
                if(genDisplay.includes("รอบ 1")) genDisplay = "รุ่นพี่ รุ่น 41";
                if(genDisplay.includes("รอบ 2")) genDisplay = "รุ่นพี่ รุ่น 42";
                if(genDisplay.includes("รอบ 3")) genDisplay = "รุ่นพี่ รุ่น 43";

                return `
                <article class="portfolio-card bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between" style="--university-color: ${universityTheme.color}; --university-text: ${universityTheme.text};">
                    <div>
                        <div class="relative h-60 bg-gray-200 border-b overflow-hidden">
                            <div class="absolute top-3 left-3 bg-black/60 text-white text-[10px] px-2 py-1 rounded-lg flex items-center gap-1 z-10 backdrop-blur-sm">
                                👁️ ${p.views || 0}
                            </div>
                            <img src="${imageSrc}" class="w-full h-full object-cover">
                            
                            <!-- 🎯 เปลี่ยนจุดนี้: ป้ายกำกับสีแดงมุมขวาบนเปลี่ยนการแสดงผลเป็น "รุ่นของรุ่นพี่" เรียบร้อยแล้ว -->
                            <span class="absolute top-3 right-3 bg-[#7A1C1C] text-white text-xs px-2.5 py-1 rounded-full font-black shadow z-10">
                                🧑‍🎓 ${genDisplay}
                            </span>
                        </div>
                        
                        <div class="p-5 space-y-3">
                            <h2 class="font-black text-lg text-[#7A1C1C] line-clamp-2 min-h-[48px]">${p.title}</h2>
                            <div class="university-card-meta">
                                <div class="min-w-0">
                                    <p class="university-card-name">🏛️ ${p.university || 'ไม่ระบุสถาบัน'}</p>
                                    <div class="flex flex-wrap gap-2 mt-2">
                                        <span class="text-xs font-black text-gray-800 bg-amber-50 border border-[#D4AF37]/20 px-2 py-1 rounded-md inline-block">🎓 ${p.faculty} ${p.major ? `- ${p.major}` : ''}</span>
                                        ${p.gpax ? `<span class="text-xs font-black text-white bg-green-600 px-2 py-1 rounded-md inline-block">📊 GPAX: ${p.gpax}</span>` : ''}
                                    </div>
                                </div>
                                <img class="university-card-logo" src="${universityTheme.logo}" alt="ตรา ${p.university || 'สถาบัน'}" onerror="this.src='https://placehold.co/128x128/741B2A/FFFFFF?text=U'">
                            </div>
                            <div class="text-xs text-gray-700 space-y-1.5 bg-[#7A1C1C]/5 p-3 rounded-xl border border-[#7A1C1C]/10 shadow-inner">
                                <p>👤 <strong>เจ้าของผลงาน:</strong> <span class="text-gray-900 font-bold">พี่${p.nickname || ''} (${p.fullname})</span></p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- โซนปุ่มกดด้านล่างสุด (🎯 ซ่อมคลาสบังคับทิศทางไม่ให้สะท้อนเงากระจก ตัวอักษรหงายตรงอ่านง่าย 100%) -->
                    <div class="p-5 pt-0 mt-auto space-y-2" style="transform: scaleX(1) !important; direction: ltr !important;">
                        <button class="view-details-btn block w-full text-center bg-[#7A1C1C] text-white font-black py-2.5 px-4 rounded-xl text-xs border-b-4 border-[#D4AF37] shadow-sm cursor-pointer hover:bg-red-900 transition-all" 
                                style="transform: scaleX(1) !important; direction: ltr !important;" 
                                data-fullname="${p.fullname}" data-title="${p.title}">
                            🔍 ดูรายละเอียด
                        </button>
                        <div class="reaction-actions grid grid-cols-2 gap-2">
                            <button class="like-btn ${isLiked ? 'is-active' : ''}" data-portfolio-key="${key}">♥ ${likeCount} ถูกใจ</button>
                            <button class="favorite-btn ${isFavorite ? 'is-active' : ''}" data-portfolio-key="${key}">★ ${isFavorite ? 'บันทึกแล้ว' : 'รายการโปรด'}</button>
                        </div>
                        ${p.sender === loggedInUser ? `
                        <button class="edit-my-port-btn block w-full text-center bg-amber-500 hover:bg-amber-600 text-white font-black py-2 px-4 rounded-xl text-xs cursor-pointer shadow-sm transition-all" 
                                style="transform: scaleX(1) !important; direction: ltr !important;"
                                data-title="${p.title}" data-fullname="${p.fullname}" data-university="${p.university}" data-faculty="${p.faculty}" data-major="${p.major}" data-gpax="${p.gpax}" data-round="${p.round}" data-intro="${p.intro}" data-link="${p.port_link}" data-nickname="${p.nickname}">
                            🛠️ แก้ไขผลงานชิ้นนี้ของคุณ
                        </button>
                        ` : ''}
                    </div>
                </article>`;
            }).join('')}
        </div>
    `;
    window.dispatchEvent(new CustomEvent('portfolioUIUpdated'));
}

// ========================================================================================
// 🔑 4. LOGIN FORM UI
// ========================================================================================
export function renderLoginForm() {
    const appContainer = document.getElementById('app');
    if (!appContainer) return;
    appContainer.innerHTML = `
        <div class="flex items-center justify-center min-h-[70vh]">
            <div class="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 w-full max-w-md">
                <h2 class="text-2xl font-black text-center text-[#7A1C1C] mb-2">เข้าสู่ระบบสมาชิกรุ่นพี่</h2>
                <form id="loginForm" class="space-y-4">
                    <div>
                        <label class="block text-xs font-black text-gray-700 mb-1">Username / Email</label>
                        <input type="text" id="loginIdentifier" required autocomplete="username" placeholder="Username หรือ name@example.com" class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-gray-700 mb-1">Password</label>
                        <input type="password" id="password" required autocomplete="current-password" placeholder="••••••••" class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                    </div>
                    <button type="button" id="forgotPasswordBtn" class="block ml-auto -mt-2 text-xs font-bold text-[#7A1C1C] hover:underline">ลืมรหัสผ่าน?</button>
                    <div id="loginMessage" class="text-xs text-red-600 font-bold text-center"></div>
                    <button type="submit" class="w-full bg-[#7A1C1C] text-white font-black py-3 rounded-xl text-xs border-b-4 border-[#D4AF37] cursor-pointer">🔓 ยืนยันเข้าสู่ระบบ</button>
                </form>
            </div>
        </div>
    `;
}

// ========================================================================================
// 👤 5. REGISTER FORM UI
// ========================================================================================
export function renderRegisterForm() {
    const appContainer = document.getElementById('app');
    if (!appContainer) return;
    appContainer.innerHTML = `
        <div class="flex items-center justify-center min-h-[70vh]">
            <div class="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 w-full max-w-md">
                <h2 class="text-2xl font-black text-center text-[#7A1C1C] mb-2">สมัครสมาชิกระบบใหม่</h2>
                <form id="registerForm" class="space-y-4">
                    <div>
                        <label class="block text-xs font-black text-gray-700 mb-1">ชื่อจริง–นามสกุล</label>
                        <input type="text" id="regFullname" required autocomplete="name" placeholder="กรอกชื่อจริงและนามสกุล" class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-gray-700 mb-1">เลขประจำตัวนักเรียน</label>
                        <input type="text" id="regStudentId" required inputmode="numeric" pattern="[0-9]+" placeholder="ตัวเลขเท่านั้น" class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-gray-700 mb-1">Username</label>
                        <input type="text" id="regUsername" required placeholder="ไอดีภาษาอังกฤษ..." class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-gray-700 mb-1">Email</label>
                        <input type="email" id="regEmail" required placeholder="name@example.com" class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-gray-700 mb-1">Password</label>
                        <input type="password" id="regPassword" required minlength="6" autocomplete="new-password" placeholder="อย่างน้อย 6 ตัว..." class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                    </div>
                    <div id="regMessage" class="text-xs text-red-600 font-bold text-center"></div>
                    <button type="submit" class="w-full bg-[#7A1C1C] text-white font-black py-3 rounded-xl text-xs border-b-4 border-[#D4AF37] cursor-pointer">✨ ยืนยันลงทะเบียน</button>
                </form>
            </div>
        </div>
    `;
}
// ========================================================================================
// 🔍 7. PORTFOLIO MODAL UI
// ========================================================================================
// แก้ไขฟังก์ชันนี้ในไฟล์ js/ui.js แบบเต็มฟังก์ชัน
export function renderPortfolioModal(portfolio) {
    let modalOverlay = document.getElementById('modalOverlay');
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'modalOverlay';
        modalOverlay.className = "fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300";
        document.body.appendChild(modalOverlay);
    }

    const imageSrc = portfolio.image_url || 'https://placehold.co/600x400/7A1C1C/FFFFFF?text=BS+Portfolio';
    const universityTheme = getUniversityTheme(portfolio.university);

    modalOverlay.innerHTML = `
        <div id="modalContainer" class="university-modal bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] shadow-2xl overflow-hidden transform scale-95 transition-transform duration-300 flex flex-col border border-gray-100" style="--university-color: ${universityTheme.color}; --university-text: ${universityTheme.text};">
            <div class="university-modal-header p-5 border-b-4 text-white flex justify-between items-center">
                <div>
                    <span class="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-md font-black">${portfolio.round || 'ไม่ระบุรอบ'}</span>
                    <h3 class="text-base font-black truncate max-w-xl mt-1">${portfolio.title}</h3>
                </div>
                <button id="closeModalBtn" class="close-modal-btn bg-black/20 text-white text-xs w-8 h-8 rounded-full flex items-center justify-center font-bold cursor-pointer hover:bg-black/40 transition">✕</button>
            </div>
            <div class="p-6 overflow-y-auto space-y-6 flex-1">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-gray-50 rounded-2xl border overflow-hidden max-h-[400px] flex items-center justify-center">
                        <img src="${imageSrc}" class="w-full h-full object-contain">
                    </div>
                    <div class="space-y-4">
                        <div class="university-modal-details p-4 rounded-2xl border text-xs space-y-2">
                            <p>👤 <strong>เจ้าของ:</strong> พี่${portfolio.nickname || ''} (${portfolio.fullname})</p>
                            <p class="university-modal-name"><strong>${portfolio.university || 'ไม่ระบุสถาบัน'}</strong><img src="${universityTheme.logo}" alt="ตรา ${portfolio.university || 'สถาบัน'}" onerror="this.src='https://placehold.co/128x128/741B2A/FFFFFF?text=U'"></p>
                            <p>🎓 <strong>คณะ:</strong> ${portfolio.faculty}</p>
                            <p>📊 <strong>GPAX:</strong> <span class="bg-green-600 text-white px-2 py-0.5 rounded text-xs ml-1">${portfolio.gpax || '-'}</span></p>
                        </div>
                        <div class="bg-amber-50/60 p-4 rounded-2xl border">
                            <p class="text-xs font-black text-amber-800 mb-1">💡 เทคนิคเตรียมตัว:</p>
                            <p class="text-xs text-gray-700 italic">"${portfolio.intro || 'ไม่มีเทคนิคเพิ่มเติม'}"</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-4 bg-gray-50 border-t">
                <a href="${portfolio.port_link}" target="_blank" class="university-modal-action block w-full text-center text-white font-black py-3 rounded-xl text-xs border-b-4 border-[#D4AF37]">🚀 เปิดอ่านไฟล์พอร์ตฉบับเต็ม</a>
            </div>
        </div>
    `;

    // 🎬 สั่งเปิด Modal พร้อมแอนิเมชัน Fade-in และขยายตัว
    const modalContainer = document.getElementById('modalContainer');
    setTimeout(() => {
        modalOverlay.classList.remove('pointer-events-none', 'opacity-0');
        modalOverlay.classList.add('opacity-100');
        if (modalContainer) modalContainer.classList.remove('scale-95');
    }, 50);

    // 🚪 🛠️ ฟังก์ชันสั่งปิดป๊อปอัป (สร้างแอนิเมชันยุบตัวก่อนหายไป)
    const handleClose = () => {
        modalOverlay.classList.remove('opacity-100');
        modalOverlay.classList.add('opacity-0', 'pointer-events-none');
        if (modalContainer) modalContainer.classList.add('scale-95');
    };

    // 🎯 ผูก Event คลิกปุ่มกากบาท (✕) เพื่อสั่งปิด
    const closeBtn = modalOverlay.querySelector('#closeModalBtn');
    if (closeBtn) {
        closeBtn.onclick = handleClose;
    }

    // 🎯 เพิ่มฟีเจอร์แถม: คลิกพื้นที่ว่างนอกป๊อปอัป (Overlay Background) เพื่อปิดได้ด้วย
    modalOverlay.onclick = (e) => {
        if (e.target === modalOverlay) {
            handleClose();
        }
    };
}

export function closePortfolioModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
        overlay.classList.remove('opacity-100');
        overlay.classList.add('opacity-0', 'pointer-events-none');
    }
}

// ========================================================================================
// 📝 6. PORTFOLIO FORM UI (เวอร์ชันเปลี่ยนรอบสมัครเป็น รุ่น บ.ส. + พิมพ์ระบุเองได้)
// ========================================================================================
export function renderPortfolioForm(containerId, username) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="max-w-3xl mx-auto my-6 bg-white p-8 rounded-2xl border border-gray-200 shadow-xl">
            <div class="border-b-2 border-[#7A1C1C] pb-3 mb-6">
                <h2 class="text-2xl font-black text-[#7A1C1C]">📝 ส่งผลงานพอร์ตโฟลิโอเข้าระบบ</h2>
            </div>
            <form id="portfolio-form" class="space-y-6">
                <input type="hidden" id="port-sender" value="${username}">
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label class="block text-xs font-black text-gray-700 mb-1">👤 ชื่อ-นามสกุลจริง</label>
                        <input type="text" id="port-fullname" required class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-gray-700 mb-1">💬 ชื่อเล่น</label>
                        <input type="text" id="port-nickname" required class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div class="sm:col-span-2">
                        <label class="block text-xs font-black text-gray-700 mb-1">🏛️ มหาวิทยาลัย / สถาบัน</label>
                        <select id="port-university-select" required class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold bg-white cursor-pointer outline-none">
                            <option value="" disabled selected>-- เลือกมหาวิทยาลัย --</option>
                            <option value="จุฬาลงกรณ์มหาวิทยาลัย">จุฬาลงกรณ์มหาวิทยาลัย</option>
                            <option value="มหาวิทยาลัยธรรมศาสตร์">มหาวิทยาลัยธรรมศาสตร์</option>
                            <option value="มหาวิทยาลัยเกษตรศาสตร์">มหาวิทยาลัยเกษตรศาสตร์</option>
                            <option value="มหาวิทยาลัยมหิดล">มหาวิทยาลัยมหิดล</option>
                            <option value="มหาวิทยาลัยเชียงใหม่">มหาวิทยาลัยเชียงใหม่</option>
                            <option value="มหาวิทยาลัยขอนแก่น">มหาวิทยาลัยขอนแก่น</option>
                            <option value="มหาวิทยาลัยสงขลานครินทร์">มหาวิทยาลัยสงขลานครินทร์</option>
                            <option value="มหาวิทยาลัยศรีนครินทรวิโรฒ">มหาวิทยาลัยศรีนครินทรวิโรฒ</option>
                            <option value="สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง">สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</option>
                            <option value="มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี">มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี</option>
                            <option value="มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ">มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ</option>
                            <option value="มหาวิทยาลัยศิลปากร">มหาวิทยาลัยศิลปากร</option>
                            <option value="อื่นๆ">📝 อื่นๆ (พิมพ์ระบุเอง)</option>
                        </select>
                        <input type="text" id="port-university-other" placeholder="พิมพ์ชื่อมหาวิทยาลัยของคุณที่นี่..." class="hidden mt-2 w-full rounded-xl border-2 border-amber-400 p-2.5 text-xs font-bold bg-amber-50/50 outline-none focus:ring-2 focus:ring-amber-500">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-gray-700 mb-1">📊 GPAX สะสม</label>
                        <input type="number" step="0.01" min="0" max="4" id="port-gpax" required class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label class="block text-xs font-black text-gray-700 mb-1">🎓 คณะที่สอบติด</label>
                        <select id="port-faculty-select" required class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold bg-white cursor-pointer outline-none">
                            <option value="" disabled selected>-- เลือกคณะ --</option>
                            <option value="วิศวกรรมศาสตร์">วิศวกรรมศาสตร์</option>
                            <option value="แพทยศาสตร์">แพทยศาสตร์</option>
                            <option value="วิทยาศาสตร์">วิทยาศาสตร์</option>
                            <option value="พาณิชยศาสตร์และการบัญชี / บริหารธุรกิจ">พาณิชยศาสตร์และการบัญชี / บริหารธุรกิจ</option>
                            <option value="มนุษยศาสตร์ / อักษรศาสตร์ / ศิลปศาสตร์">มนุษยศาสตร์ / อักษรศาสตร์ / ศิลปศาสตร์</option>
                            <option value="นิติศาสตร์">นิติศาสตร์</option>
                            <option value="รัฐศาสตร์">รัฐศาสตร์</option>
                            <option value="นิเทศศาสตร์ / วารสารศาสตร์">นิเทศศาสตร์ / วารสารศาสตร์</option>
                            <option value="สถาปัตยกรรมศาสตร์">สถาปัตยกรรมศาสตร์</option>
                            <option value="ครุศาสตร์ / ศึกษาศาสตร์">ครุศาสตร์ / ศึกษาศาสตร์</option>
                            <option value="เทคโนโลยีสารสนเทศ / นวัตกรรมดิจิทัล">เทคโนโลยีสารสนเทศ / นวัตกรรมดิจิทัล</option>
                            <option value="พยาบาลศาสตร์">พยาบาลศาสตร์</option>
                            <option value="อื่นๆ">📝 อื่นๆ (พิมพ์ระบุเอง)</option>
                        </select>
                        <input type="text" id="port-faculty-other" placeholder="พิมพ์ชื่อคณะของคุณที่นี่..." class="hidden mt-2 w-full rounded-xl border-2 border-amber-400 p-2.5 text-xs font-bold bg-amber-50/50 outline-none focus:ring-2 focus:ring-amber-500">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-gray-700 mb-1">🧬 สาขาวิชา</label>
                        <input type="text" id="port-major" required class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <!-- 🎯 เปลี่ยนจุดนี้: เปลี่ยนจากรอบสมัครเป็นรุ่น บ.ส. เรียบร้อยครับ -->
                        <label class="block text-xs font-black text-gray-700 mb-1">🎓 รุ่นของรุ่นพี่ (บ.ส.)</label>
                        <select id="port-round-select" required class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold bg-white outline-none cursor-pointer">
                            <option value="" disabled selected>-- เลือกรุ่นพี่ บ.ส. --</option>
                            <option value="บ.ส. 40">บ.ส. 40</option>
                            <option value="บ.ส. 41">บ.ส. 41</option>
                            <option value="บ.ส. 42">บ.ส. 42</option>
                            <option value="บ.ส. 43">บ.ส. 43</option>
                            <option value="อื่นๆ">📝 อื่นๆ (พิมพ์รุ่นระบุเอง)</option>
                        </select>
                        <!-- ช่องอินพุตลับสำหรับพิมพ์รุ่นเองเมื่อเลือก "อื่นๆ" -->
                        <input type="text" id="port-round-other" placeholder="ตัวอย่าง: บ.ส. 44 (ระบุเอง)" class="hidden mt-2 w-full rounded-xl border-2 border-amber-400 p-2.5 text-xs font-bold bg-amber-50/50 outline-none focus:ring-2 focus:ring-amber-500">
                        <!-- ตัวแปรซ่อนสำหรับถือค่าส่งหลังบ้านคงชื่อคีย์เดิมไว้เพื่อไม่ให้ระบบชีตเดิมพัง -->
                        <input type="hidden" id="port-round" value="">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-gray-700 mb-1">🖼️ รูปหน้าปกพอร์ตโฟลิโอ</label>
                        <input type="file" id="port-image" accept="image/*" class="w-full rounded-xl border-2 border-gray-300 p-1.5 text-xs font-bold bg-white outline-none">
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-black text-gray-700 mb-1">🏷️ หัวข้อ / ชื่อผลงานพอร์ต</label>
                    <input type="text" id="port-title" required class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                </div>
                
                <div>
                    <label class="block text-xs font-black text-gray-700 mb-1">💡 เทคนิคแนะนำรุ่นน้อง</label>
                    <textarea id="port-intro" rows="3" required class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]"></textarea>
                </div>
                
                <div>
                    <label class="block text-xs font-black text-gray-700 mb-1">📄 อัปโหลดไฟล์ผลงาน (PDF เท่านั้น)</label>
                    <input type="file" id="port-pdf" accept="application/pdf" class="w-full rounded-xl border-2 border-gray-300 p-1.5 text-xs font-bold bg-white outline-none">
                    <p class="text-[10px] text-gray-400 mt-1">* หากไม่มีไฟล์ PDF สามารถแปะลิงก์ Google Drive ในช่องด้านล่างได้</p>
                </div>

                <button type="submit" id="submit-portfolio-btn" class="w-full bg-[#7A1C1C] text-white font-black py-3.5 px-4 rounded-xl text-xs border-b-4 border-[#D4AF37] cursor-pointer hover:bg-red-900 transition-all">🚀 ส่งข้อมูลขึ้นระบบ</button>
            </form>
        </div>
    `;

    // 🎯 ระบบ Event Delegation อัจฉริยะ: ควบคุมการสลับซ่อน/แสดง ฟิลด์ป้อนค่า "อื่นๆ" ของ มหาลัย, คณะ และ รุ่นพี่
    container.addEventListener("change", (e) => {
        if (e.target.id === "port-university-select") {
            const uniOther = document.getElementById("port-university-other");
            if (uniOther) uniOther.classList.toggle("hidden", e.target.value !== "อื่นๆ");
        }
        if (e.target.id === "port-faculty-select") {
            const facOther = document.getElementById("port-faculty-other");
            if (facOther) facOther.classList.toggle("hidden", e.target.value !== "อื่นๆ");
        }
        // ตรวจจับการสลับช่องระบุรุ่นพี่ บ.ส.
        if (e.target.id === "port-round-select") {
            const roundOther = document.getElementById("port-round-other");
            if (roundOther) roundOther.classList.toggle("hidden", e.target.value !== "อื่นๆ");
            updateHiddenRoundValue();
        }
    });

    // ดักฟังการพิมพ์กล่องป้อนค่าระบุรุ่นเอง เพื่อซิงค์ข้อมูลลง input ตัวหลัก
    container.addEventListener("input", (e) => {
        if (e.target.id === "port-round-other") {
            updateHiddenRoundValue();
        }
    });

    // ฟังก์ชันคำนวณและเก็บค่ารวบยอดส่งไปหลังบ้าน
    function updateHiddenRoundValue() {
        const selectEl = document.getElementById("port-round-select");
        const otherInput = document.getElementById("port-round-other");
        const hiddenInput = document.getElementById("port-round");
        
        if (selectEl && hiddenInput) {
            if (selectEl.value === "อื่นๆ" && otherInput) {
                hiddenInput.value = otherInput.value.trim();
            } else {
                hiddenInput.value = selectEl.value;
            }
        }
    }
}

// ========================================================================================
// 📁 9. USER PORTFOLIOS (คลังผลงานของฉัน)
// ========================================================================================
export function renderMyPortfolios(portfolios, currentUsername) {
    const appContainer = document.getElementById('app');
    if (!appContainer) return;

    const myFiles = portfolios.filter(p => p.sender === currentUsername);
    const reactions = getPortfolioReactions();
    const favoriteFiles = portfolios.filter(p => reactions.favorites.includes(portfolioKey(p)));

    let htmlContent = `
        <div class="my-6">
            <div class="my-8 p-6 rounded-3xl border bg-gradient-to-br from-amber-500/[0.05] via-white to-orange-500/[0.02]">
                <h1 class="text-2xl font-black text-gray-900">📂 คลังผลงาน "ของฉัน"</h1>
                <p class="text-gray-600 text-xs mt-1">ส่งทั้งหมด: ${myFiles.length} รายการ</p>
            </div>
            <div id="my-portfolio-cards" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
    `;

    if (myFiles.length === 0) {
        htmlContent += `
            </div>
            <div class="w-full text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                <p class="text-sm font-bold text-gray-500">คุณยังไม่มีการส่งพอร์ตโฟลิโอเข้าระบบในขณะนี้</p>
                <button id="nav-upload-empty-btn" class="mt-3 bg-[#7A1C1C] text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer">🚀 ยื่นส่งผลงานชิ้นแรก</button>
            </div>
        `;
    } else {
        htmlContent += myFiles.map(p => {
            const imageSrc = p.image_url || 'https://placehold.co/600x400/7A1C1C/FFFFFF?text=BS+Portfolio';
            const isApproved = p.status === 'approved' || !p.status;
            return `
                <div class="bg-white rounded-2xl shadow-md border overflow-hidden flex flex-col justify-between">
                    <div>
                        <div class="relative h-52 bg-gray-100 overflow-hidden">
                            <img src="${imageSrc}" loading="lazy" class="w-full h-full object-cover object-top">
                        </div>
                        <div class="p-5 space-y-2">
                            ${isApproved ? `<span class="text-green-600 text-[10px] font-bold">🟢 อนุมัติแล้ว</span>` : `<span class="text-amber-500 text-[10px] font-bold">🟡 รอการตรวจสอบ</span>`}
                            <h2 class="font-black text-base text-gray-800 line-clamp-2">${p.title}</h2>
                            <p class="text-[11px] text-gray-500">${p.university} • ${p.faculty}</p>
                        </div>
                    </div>
                    <div class="p-5 pt-0">
                        <button class="edit-my-port-btn block w-full bg-amber-500 text-white font-black py-2.5 text-xs rounded-xl cursor-pointer"
                                data-title="${p.title}" data-fullname="${p.fullname}" data-university="${p.university}" data-faculty="${p.faculty}" data-major="${p.major}" data-gpax="${p.gpax}" data-round="${p.round}" data-intro="${p.intro}" data-link="${p.port_link}" data-nickname="${p.nickname}">
                            🛠️ แก้ไขข้อมูลผลงานชิ้นนี้
                        </button>
                    </div>
                </div>
            `;
        }).join('') + `</div>`;
    }

    htmlContent += `
        <section class="mt-8 pt-8 border-t border-amber-200">
            <div class="flex items-center justify-between gap-3 mb-5">
                <div><h2 class="text-xl font-black text-[#7A1C1C]">★ รายการโปรด</h2><p class="text-xs text-gray-500">ผลงานที่คุณบันทึกไว้ ${favoriteFiles.length} รายการ</p></div>
            </div>
            ${favoriteFiles.length ? `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${favoriteFiles.map(p => `
                <article class="bg-white rounded-2xl shadow-md border border-amber-200 overflow-hidden">
                    <div class="h-40 bg-gray-100"><img src="${p.image_url || 'https://placehold.co/600x400/7A1C1C/FFFFFF?text=BS+Portfolio'}" class="w-full h-full object-cover"></div>
                    <div class="p-4"><h3 class="font-black text-sm text-[#7A1C1C] line-clamp-2">${p.title}</h3><p class="text-[11px] text-gray-500 mt-1">${p.university} • ${p.faculty}</p>
                    <button class="view-details-btn mt-3 w-full text-center text-white font-black py-2 rounded-xl text-xs" data-fullname="${p.fullname}" data-title="${p.title}">🔍 ดูรายละเอียด</button></div>
                </article>`).join('')}</div>` : `<div class="bg-white rounded-2xl border-2 border-dashed border-amber-200 p-8 text-center text-sm font-bold text-gray-500">ยังไม่มีรายการโปรด กดปุ่ม ★ ที่การ์ดผลงานเพื่อบันทึกได้เลย</div>`}
        </section>
    </div>`;

    appContainer.innerHTML = htmlContent;
}

// ========================================================================================
// 🖼 shrink-0. ฟังก์ชันแปลงรูปภาพ
// ========================================================================================
export function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// js/ui.js
// เพิ่มฟังก์ชันนี้ลงใน js/ui.js
// ในไฟล์ js/ui.js
export function renderLogsPage(logs) {
    const appContainer = document.getElementById('app');
    
    // ดึงประเภทกิจกรรมที่ไม่ซ้ำกันออกมาทำ Dropdown อัตโนมัติ
    const actions = [...new Set(logs.map(l => l.action))];

    appContainer.innerHTML = `
        <div class="my-6">
            <h2 class="text-2xl font-black text-[#7A1C1C] mb-4">📜 ประวัติกิจกรรมระบบ</h2>
            <div class="bg-white p-4 rounded-xl shadow mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" id="logSearch" placeholder="🔍 ค้นหาชื่อผู้ใช้..." class="border p-2 rounded text-xs">
                
                <select id="logActionFilter" class="border p-2 rounded text-xs cursor-pointer">
                    <option value="ทั้งหมด">แสดงทุกกิจกรรม</option>
                    ${actions.map(a => `<option value="${a}">${a}</option>`).join('')}
                </select>
            </div>
            
            <div class="overflow-x-auto bg-white rounded-xl shadow border">
                <table class="w-full text-xs text-left">
                    <thead class="bg-gray-100 uppercase text-gray-600">
                        <tr><th class="p-3">เวลา</th><th class="p-3">ผู้ใช้</th><th class="p-3">กิจกรรม</th><th class="p-3">รายละเอียด</th></tr>
                    </thead>
                    <tbody id="logBody">
                        ${logs.map(l => `
                        <tr class="border-t hover:bg-gray-50">
                            <td class="p-3 font-mono">${new Date(l.timestamp).toLocaleString('th-TH')}</td>
                            <td class="p-3 font-bold text-purple-800">${l.user}</td>
                            <td class="p-3"><span class="bg-purple-100 text-purple-800 px-2 py-0.5 rounded">${l.action}</span></td>
                            <td class="p-3 text-gray-600">${l.details}</td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // ผูก Event ให้ทำงานพร้อมกันทั้ง Search และ Dropdown
    const filterFunc = () => {
        const searchTerm = document.getElementById('logSearch').value.toLowerCase();
        const actionFilter = document.getElementById('logActionFilter').value;
        
        document.querySelectorAll('#logBody tr').forEach(tr => {
            const text = tr.innerText.toLowerCase();
            const action = tr.children[2].innerText; // คอลัมน์กิจกรรม
            
            const matchSearch = text.includes(searchTerm);
            const matchAction = (actionFilter === "ทั้งหมด" || action === actionFilter);
            
            tr.style.display = (matchSearch && matchAction) ? '' : 'none';
        });
    };

    document.getElementById('logSearch').addEventListener('input', filterFunc);
    document.getElementById('logActionFilter').addEventListener('change', filterFunc);
}

function filterLogs() {
    const searchTerm = document.getElementById('logSearch').value.toLowerCase();
    const actionFilter = document.getElementById('logActionFilter').value;
    const rows = document.querySelectorAll('#logBody tr');
    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        const action = row.children[2].innerText;
        const matchSearch = text.includes(searchTerm);
        const matchAction = actionFilter === "ทั้งหมด" || action === actionFilter;
        row.style.display = (matchSearch && matchAction) ? '' : 'none';
    });
}

export function renderAdminDashboard(portfolios, userRole, logs = []) {
    const appContainer = document.getElementById('app');
    if (!appContainer) return;

    const pendingList = portfolios.filter(p => p.status === 'pending');
    const approvedList = portfolios.filter(p => p.status === 'approved'); // แก้จาก || !p.status เป็น === 'approved'

    appContainer.innerHTML = `
        <div class="my-6 space-y-8">
            <div class="border-b-4 border-[#7A1C1C] pb-3">
                <h2 class="text-2xl font-black text-[#7A1C1C]">🛡️ แผงควบคุมจัดการระบบแอดมิน (${userRole.toUpperCase()})</h2>
            </div>

            <div class="bg-white p-6 rounded-2xl border shadow-md">
                <h3 class="text-base font-black text-amber-600 mb-4">⏳ รายการพอร์ตที่รอดำเนินการอนุมัติ (${pendingList.length} รายการ)</h3>
                ${pendingList.length === 0 ? `<p class="text-xs text-gray-400 py-4 text-center">🎉 ไม่มีข้อมูลแฟ้มผลงานค้างตรวจสอบ</p>` : `
                    <div class="overflow-x-auto rounded-xl border">
                        <table class="w-full text-left text-xs font-bold border-collapse bg-white">
                            <thead>
                                <tr class="bg-gray-100 border-b text-gray-600 uppercase">
                                    <th class="p-3">ชื่อผลงาน</th>
                                    <th class="p-3">เจ้าของ</th>
                                    <th class="p-3">สถาบัน/คณะ</th>
                                    <th class="p-3 text-center">การดำเนินการ</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y">
                                ${pendingList.map(p => `
                                    <tr class="hover:bg-gray-50/50 transition">
                                        <td class="p-3 text-gray-800 font-black">${p.title}</td>
                                        <td class="p-3 text-gray-600">พี่${p.nickname}</td>
                                        <td class="p-3 text-gray-600">${p.university}<br><span class="text-[10px] text-purple-700">${p.faculty}</span></td>
                                        <td class="p-3 flex items-center justify-center gap-2">
                                            <button class="view-details-btn px-2.5 py-1.5 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg font-bold hover:bg-gray-200" data-fullname="${p.fullname}" data-title="${p.title}">🔍 ดู</button>
                                            <button class="approve-btn bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg font-black cursor-pointer shadow-sm" data-fullname="${p.fullname}" data-title="${p.title}">✅ อนุมัติ</button>
                                            <button class="reject-btn bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg font-black cursor-pointer shadow-sm" data-fullname="${p.fullname}" data-title="${p.title}">❌ ปฏิเสธ</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `}
            </div>

            <div class="bg-white p-6 rounded-2xl border shadow-md">
                <h3 class="text-base font-black text-red-800 mb-4">🗂️ ผลงานที่ออนไลน์อยู่ (${approvedList.length} รายการ)</h3>
                <div class="overflow-x-auto rounded-xl border">
                    <table class="w-full text-left text-xs font-bold border-collapse bg-white">
                        <thead>
                            <tr class="bg-gray-100 border-b text-gray-600 uppercase">
                                <th class="p-3">ชื่อผลงาน</th>
                                <th class="p-3">เจ้าของ</th>
                                <th class="p-3">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y">
                            ${approvedList.map(p => `
                                <tr>
                                    <td class="p-3 text-gray-800 font-black">${p.title}</td>
                                    <td class="p-3 text-gray-600">พี่${p.nickname}</td>
                                    <td class="p-3">
                                        <button class="reject-btn bg-red-600 hover:bg-red-500 text-white font-black px-3 py-1 rounded-lg" data-fullname="${p.fullname}" data-title="${p.title}">ลบ</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}
