// js/ui.js
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
                        <span class="text-[10px] font-extrabold text-[#D4AF37] uppercase tracking-widest drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">คลังรวมพอร์ตโฟลิโอรุ่นพี่ เบญจมราชานุสรณ์</span>
                    </div>
                </div>

                <div class="flex items-center flex-wrap justify-center gap-4 text-xs font-bold">
                    
                    <button id="uploadPortLink" class="relative group px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-100 hover:text-amber-300 transition duration-200 cursor-pointer overflow-hidden shadow-sm border border-white/5">
                        <span class="relative z-10 flex items-center gap-1">📝 ส่งพอร์ตโฟลิโอ</span>
                        <span class="absolute bottom-0 left-0 w-full h-1 bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </button>
                    
                    ${hasAdminAccess ? `
                        <button id="adminLink" class="bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-black px-4 py-2.5 rounded-xl hover:from-amber-400 hover:to-yellow-400 hover:scale-102 active:scale-98 transition duration-200 shadow-md cursor-pointer flex items-center gap-1">
                            ⚙️ แผงควบคุมแอดมิน
                        </button>
                    ` : ''}

                    <div class="h-6 w-[1px] bg-white/15 mx-1 hidden sm:block"></div>

                    ${user && user.username ? `
                        <div class="flex items-center space-x-3 bg-black/20 px-4 py-2.5 rounded-xl border border-white/10 shadow-inner">
                            
                            <span class="text-white font-black text-sm drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] tracking-wide">
                                ${user.username}
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
                            <button id="loginLink" class="bg-white/5 hover:bg-white/15 text-gray-100 px-4 py-2.5 rounded-xl transition duration-150 cursor-pointer border border-white/5">เข้าสู่ระบบ</button>
                            <button id="registerLink" class="bg-[#D4AF37] hover:bg-yellow-500 text-gray-900 font-black px-4 py-2.5 rounded-xl transition shadow-md hover:scale-102 duration-150 cursor-pointer">สมัครสมาชิก</button>
                        </div>
                    `}
                </div>

            </div>
        </nav>
    `;
}
// =================================================================
// 📊 2. ฟังก์ชันวาดโครงสร้างหน้าตาหลัก (สถิติ + แผงค้นหา 4 มิติ) -> วาดแค่ครั้งเดียว
// =================================================================
// =================================================================
// 📊 2. ฟังก์ชันวาดโครงสร้างหน้าตาหลัก (สถิติ + แผงค้นหา 4 มิติ + เครดิตแผนการเรียนท้ายเว็บ)
// =================================================================
// =================================================================
// 📊 2. ฟังก์ชันวาดโครงสร้างหน้าตาหลัก (เวอร์ชันความเร็วแสง รันสถิติต้นทางรอบเดียว)
// =================================================================
export function renderPortfolios(portfolios, filters = { keyword: "", university: "ทั้งหมด", faculty: "ทั้งหมด", round: "ทั้งหมด" }) {
    const appContainer = document.getElementById('app');
    if (!appContainer) return;
    
    // คัดเฉพาะพอร์ตที่ผ่านการอนุมัติ (approved) เพื่อนำมาคำนวณสถิติภาพรวมระบบ
    const approvedList = portfolios.filter(p => p.status === 'approved' || !p.status);
    const totalCount = approvedList.length;

    // --- 🧮 ตรรกะประมวลผลสรุปสถิติหาอันดับ 1 (TOP 1) และ 10 อันดับแรก ---
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

    // --- 🏛️ กลุ่มรายชื่อสถาบันและคณะยอดนิยมสำหรับ Dropdown ---
    const famousUniversities = [
        "จุฬาลงกรณ์มหาวิทยาลัย", "มหาวิทยาลัยธรรมศาสตร์", "มหาวิทยาลัยเกษตรศาสตร์",
        "มหาวิทยาลัยมหิดล", "มหาวิทยาลัยเชียงใหม่", "มหาวิทยาลัยขอนแก่น",
        "มหาวิทยาลัยสงขลานครินทร์", "มหาวิทยาลัยศรีนครินทรวิโรฒ",
        "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง", "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",
        "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ", "มหาวิทยาลัยศิลปากร"
    ];

    const famousFaculties = [
        "วิศวกรรมศาสตร์", "แพทยศาสตร์", "วิทยาศาสตร์",
        "พาณิชยศาสตร์และการบัญชี / บริหารธุรกิจ", "มนุษยศาสตร์ / อักษรศาสตร์ / ศิลปศาสตร์",
        "นิติศาสตร์", "รัฐศาสตร์", "นิเทศศาสตร์ / วารสารศาสตร์",
        "สถาปัตยกรรมศาสตร์", "ครุศาสตร์ / ศึกษาศาสตร์",
        "เทคโนโลยีสารสนเทศ / นวัตกรรมดิจิทัล", "พยาบาลศาสตร์"
    ];

    const sheetUniversities = approvedList.map(p => p.university).filter(Boolean);
    const otherUniversities = [...new Set(sheetUniversities.filter(uni => !famousUniversities.includes(uni)))].sort();

    const sheetFaculties = approvedList.map(p => p.faculty).filter(Boolean);
    const otherFaculties = [...new Set(sheetFaculties.filter(fac => !famousFaculties.includes(fac)))].sort();

    // 🏗️ พ่นโครงสร้างแบบคงที่ (Static Layout) ลงหน้าต่างระบบรอบเดียว
    appContainer.innerHTML = `
        <div class="my-6">
            
            <div class="relative my-8 p-6 md:p-8 rounded-3xl overflow-hidden shadow-xl border border-[#7A1C1C]/10 bg-gradient-to-br from-[#7A1C1C]/5 via-white to-amber-500/[0.03]">
                <div class="absolute inset-0 opacity-[0.03] pointer-events-none select-none" style="background-image: linear-gradient(#7A1C1C 1px, transparent 1px), linear-gradient(90deg, #7A1C1C 1px, transparent 1px); background-size: 20px 20px;"></div>
                <div class="absolute -right-10 -top-10 w-40 h-40 bg-[#7A1C1C]/10 rounded-full blur-3xl pointer-events-none"></div>
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
                        ✨ แหล่งรวมข้อมูล <strong class="text-[#7A1C1C] font-extrabold bg-[#7A1C1C]/5 px-2 py-0.5 rounded-md">สถิติเชิงลึก</strong> และ <strong class="text-amber-700 font-extrabold bg-amber-500/5 px-2 py-0.5 rounded-md">แรงบันดาลใจชั้นยอด</strong> ในการทำพอร์ตโฟลิโอจากพี่สู่น้องอย่างเป็นทางการของ <span class="border-b-2 border-[#D4AF37]/60 pb-0.5 font-bold text-gray-900">โรงเรียนเบญจมราชานุสรณ์</span>
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                <div class="bg-[#7A1C1C] text-white p-5 rounded-2xl shadow-lg border-b-4 border-[#D4AF37] relative overflow-hidden flex flex-col justify-center min-h-[110px]">
                    <div class="absolute right-4 bottom-2 text-6xl opacity-10 select-none">📁</div>
                    <span class="text-xs uppercase tracking-wider text-[#D4AF37] font-bold">พอร์ตโฟลิโอทั้งหมด</span>
                    <h2 class="text-4xl font-extrabold mt-1">${totalCount} <span class="text-lg font-normal text-gray-200">ผลงาน</span></h2>
                </div>
                <div class="bg-white p-5 rounded-2xl shadow-md border-l-4 border-[#D4AF37] relative overflow-hidden flex flex-col justify-center min-h-[110px]">
                    <div class="absolute right-4 bottom-2 text-6xl text-gray-100 opacity-60 select-none">🏛️</div>
                    <span class="text-xs uppercase tracking-wider text-[#7A1C1C] font-bold">🏆 สถาบันติดสูงสุดอันดับ 1</span>
                    <h2 class="text-xl font-bold text-gray-800 mt-1 truncate pr-12" title="${top1University}">${top1University}</h2>
                    <p class="text-xs text-gray-500 mt-0.5">จำนวนรวม: <strong class="text-[#7A1C1C]">${top1UniversityCount} ชิ้น</strong></p>
                </div>
                <div class="bg-white p-5 rounded-2xl shadow-md border-l-4 border-[#7A1C1C] relative overflow-hidden flex flex-col justify-center min-h-[110px]">
                    <div class="absolute right-4 bottom-2 text-6xl text-gray-100 opacity-60 select-none">🎓</div>
                    <span class="text-xs uppercase tracking-wider text-purple-800 font-bold">🏆 คณะยอดนิยมอันดับ 1</span>
                    <h2 class="text-xl font-bold text-gray-800 mt-1 truncate pr-12" title="${top1Faculty}">${top1Faculty}</h2>
                    <p class="text-xs text-gray-500 mt-0.5">จำนวนรวม: <strong class="text-[#7A1C1C]">${top1FacultyCount} ชิ้น</strong></p>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl border-2 border-[#7A1C1C]/20 shadow-lg mb-8">
                <div class="flex items-center space-x-2.5 text-[#7A1C1C] border-b-2 border-gray-100 pb-3 mb-5">
                    <span class="text-lg">🔍</span>
                    <h3 class="text-base font-extrabold tracking-wide">ระบบเจาะจงค้นหาและคัดกรองข้อมูลพอร์ตโฟลิโอ</h3>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div class="bg-gray-50/60 p-3 rounded-xl border border-gray-200 flex flex-col justify-between">
                        <label class="block text-xs font-extrabold text-[#7A1C1C] uppercase tracking-wider mb-2">📝 1. ค้นหาคีย์เวิร์ด / ชื่อ</label>
                        <input type="text" id="search-keyword" value="${filters.keyword}" placeholder="พิมพ์คำค้นหา..." class="w-full p-2.5 text-xs font-bold text-gray-800 border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#7A1C1C] bg-white transition shadow-sm">
                    </div>
                    <div class="bg-gray-50/60 p-3 rounded-xl border border-gray-200 flex flex-col justify-between">
                        <label class="block text-xs font-extrabold text-[#7A1C1C] uppercase tracking-wider mb-2">🏛️ 2. เลือกมหาวิทยาลัย</label>
                        <select id="search-university" class="w-full p-2.5 text-xs font-bold text-gray-800 border-2 border-gray-300 rounded-lg bg-white shadow-sm cursor-pointer focus:ring-2 focus:ring-[#7A1C1C] outline-none">
                            <option value="ทั้งหมด">-- แสดงทั้งหมด --</option>
                            <optgroup label="🌟 สถาบันยอดนิยมระดับประเทศ">
                                ${famousUniversities.map(uni => `<option value="${uni}" ${filters.university === uni ? 'selected' : ''}>${uni}</option>`).join('')}
                            </optgroup>
                            ${otherUniversities.length > 0 ? `<optgroup label="📝 สถาบันอื่น ๆ ที่ตรวจเจอ">${otherUniversities.map(uni => `<option value="${uni}" ${filters.university === uni ? 'selected' : ''}>${uni}</option>`).join('')}</optgroup>` : ''}
                        </select>
                    </div>
                    <div class="bg-gray-50/60 p-3 rounded-xl border border-gray-200 flex flex-col justify-between">
                        <label class="block text-xs font-extrabold text-[#7A1C1C] uppercase tracking-wider mb-2">🎓 3. เลือกคณะ</label>
                        <select id="search-faculty" class="w-full p-2.5 text-xs font-bold text-gray-800 border-2 border-gray-300 rounded-lg bg-white shadow-sm cursor-pointer focus:ring-2 focus:ring-[#7A1C1C] outline-none">
                            <option value="ทั้งหมด">-- แสดงทั้งหมด --</option>
                            <optgroup label="🎓 คณะยอดนิยมคนสมัครเยอะ">
                                ${famousFaculties.map(fac => `<option value="${fac}" ${filters.faculty === fac ? 'selected' : ''}>${fac}</option>`).join('')}
                            </optgroup>
                            ${otherFaculties.length > 0 ? `<optgroup label="📝 คณะอื่น ๆ ที่ตรวจเจอ">${otherFaculties.map(fac => `<option value="${fac}" ${filters.faculty === fac ? 'selected' : ''}>${fac}</option>`).join('')}</optgroup>` : ''}
                        </select>
                    </div>
                    <div class="bg-gray-50/60 p-3 rounded-xl border border-gray-200 flex flex-col justify-between">
                        <label class="block text-xs font-extrabold text-[#7A1C1C] uppercase tracking-wider mb-2">🎯 4. เลือกรอบการสมัคร</label>
                        <select id="search-round" class="w-full p-2.5 text-xs font-bold text-gray-800 border-2 border-gray-300 rounded-lg bg-white shadow-sm cursor-pointer focus:ring-2 focus:ring-[#7A1C1C] outline-none">
                            <option value="ทั้งหมด" ${filters.round === "ทั้งหมด" ? 'selected' : ''}>-- แสดงทั้งหมด --</option>
                            <option value="รอบ 1 Portfolio" ${filters.round === "รอบ 1 Portfolio" ? 'selected' : ''}>รอบ 1 Portfolio</option>
                            <option value="รอบ 2 Quota" ${filters.round === "รอบ 2 Quota" ? 'selected' : ''}>รอบ 2 Quota</option>
                            <option value="รอบ 3 Admission" ${filters.round === "รอบ 3 Admission" ? 'selected' : ''}>รอบ 3 Admission</option>
                            <option value="รอบ 4 Direct Admission" ${filters.round === "รอบ 4 Direct Admission" ? 'selected' : ''}>รอบ 4 Direct Admission</option>
                        </select>
                    </div>
                </div>
                <div class="mt-5 pt-3 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
                    <div class="text-gray-700 font-extrabold text-sm">
                        📊 ผลลัพธ์การคัดเลือกตรงเงื่อนไข: <span id="filtered-count" class="text-white bg-[#7A1C1C] px-3 py-1 rounded-full text-xs font-black shadow-sm">0 รายการ</span>
                    </div>
                    <button id="clear-filters-btn" class="text-xs text-[#7A1C1C] hover:text-red-700 font-black bg-amber-50/60 border border-[#D4AF37]/40 px-4 py-2 rounded-xl shadow-sm cursor-pointer">🧹 ล้างค่าค้นหาและตัวกรองทั้งหมด</button>
                </div>
            </div>

            <div id="portfolio-cards-container"></div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-gray-200 mb-12">
                <div class="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                    <h3 class="text-base font-bold text-[#7A1C1C] mb-4 flex items-center gap-2"><span>🏛️</span> 10 อันดับสถาบันยอดนิยมสูงสุด</h3>
                    <div class="space-y-3">
                        ${top10Universities.length === 0 ? '<p class="text-xs text-gray-400 text-center py-4">ยังไม่มีข้อมูลในระบบ</p>' : top10Universities.map((uni, idx) => {
                            const percent = totalCount > 0 ? (uni[1] / totalCount) * 100 : 0;
                            return `
                                <div class="space-y-1">
                                    <div class="flex justify-between text-xs font-semibold text-gray-700"><span>อันดับ ${idx + 1}: ${uni[0]}</span><span class="text-[#7A1C1C] font-bold">${uni[1]} พอร์ต</span></div>
                                    <div class="w-full bg-gray-100 rounded-full h-2"><div class="bg-[#D4AF37] h-2 rounded-full" style="width: ${percent}%"></div></div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                <div class="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                    <h3 class="text-base font-bold text-[#7A1C1C] mb-4 flex items-center gap-2"><span>🎓</span> 10 อันดับคณะที่มีสถิติสอบติดสูงสุด</h3>
                    <div class="space-y-3">
                        ${top10Faculties.length === 0 ? '<p class="text-xs text-gray-400 text-center py-4">ยังไม่มีข้อมูลในระบบ</p>' : top10Faculties.map((fac, idx) => {
                            const percent = totalCount > 0 ? (fac[1] / totalCount) * 100 : 0;
                            return `
                                <div class="space-y-1">
                                    <div class="flex justify-between text-xs font-semibold text-gray-700"><span>อันดับ ${idx + 1}: ${fac[0]}</span><span class="text-[#7A1C1C] font-bold">${fac[1]} พอร์ต</span></div>
                                    <div class="w-full bg-gray-100 rounded-full h-2"><div class="bg-[#7A1C1C] h-2 rounded-full" style="width: ${percent}%"></div></div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>

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

    // ⚡ จุดไม้ตายความเร็วแสง: สั่งวาดเฉพาะลิสต์การ์ดลงในตะกร้าซับเซตทันทีโดยไม่ล้างหน้าจอหลัก
    updatePortfolioListUI(portfolios, filters);
}

// =================================================================
// 📁 3. ฟังก์ชันอัปเดตข้อมูลการ์ดผลงานชิ้นย่อย (ป้องกันคอร์เซอร์หลุดเด้ง)
// =================================================================
export function updatePortfolioListUI(portfolios, filters) {
    const cardsContainer = document.getElementById('portfolio-cards-container');
    const countBadge = document.getElementById('filtered-count');
    if (!cardsContainer) return;

    const displayedList = portfolios.filter(p => {
        if (p.status && p.status !== 'approved') return false;

        const kw = filters.keyword.toLowerCase().trim();
        const matchKeyword = !kw || 
            (p.title || "").toLowerCase().includes(kw) ||
            (p.fullname || "").toLowerCase().includes(kw) ||
            (p.nickname || "").toLowerCase().includes(kw) ||
            (p.intro || "").toLowerCase().includes(kw) ||
            (p.major || "").toLowerCase().includes(kw);

        const matchUni = filters.university === "ทั้งหมด" || p.university === filters.university;
        const matchFac = filters.faculty === "ทั้งหมด" || p.faculty === filters.faculty;
        const matchRound = filters.round === "ทั้งหมด" || p.round === filters.round;

        return matchKeyword && matchUni && matchFac && matchRound;
    });

    if (countBadge) countBadge.innerText = `${displayedList.length} รายการ`;

    if (displayedList.length === 0) {
        cardsContainer.innerHTML = `
            <div class="bg-white p-12 rounded-2xl shadow border text-center text-gray-500 font-medium mb-12">
                ❌ ไม่พบผลงานรุ่นพี่ที่ตรงกับเงื่อนไขการค้นหาของคุณ ลองเปลี่ยนตัวกรองดูใหม่ครับ
            </div>
        `;
        return;
    }

    cardsContainer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            ${displayedList.map((p) => {
                const imageSrc = p.image_url ? (p.image_url.startsWith('data:') ? p.image_url : `data:image/jpeg;base64,${p.image_url}`) : 'https://placehold.co/600x400/7A1C1C/FFFFFF?text=BS+Portfolio';
                
                return `
                <div class="bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between">
                    <div>
                        <div class="relative h-72 bg-gray-100 border-b overflow-hidden">
                            <img src="${imageSrc}" alt="หน้าปกพอร์ต" class="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105">
                            <span class="absolute top-3 right-3 bg-[#7A1C1C] text-white text-xs px-2.5 py-1 rounded-full font-black border border-[#D4AF37] shadow">
                                ${p.round || 'ไม่ระบุรอบ'}
                            </span>
                        </div>

                        <div class="p-5 space-y-3">
                            <h2 class="font-black text-lg text-[#7A1C1C] line-clamp-2 leading-tight min-h-[48px]" title="${p.title}">
                                ${p.title}
                            </h2>
                            
                            <p class="text-xs font-black text-gray-800 bg-amber-50 border border-[#D4AF37]/20 px-2 py-1 rounded-md inline-block">
                                🎓 ${p.faculty} ${p.major ? `- ${p.major}` : ''}
                            </p>
                            
                            <div class="text-xs text-gray-700 space-y-1.5 bg-[#7A1C1C]/5 p-3 rounded-xl border border-[#7A1C1C]/10 shadow-inner">
                                <p>👤 <strong>เจ้าของผลงาน:</strong> <span class="text-gray-900 font-bold">พี่${p.nickname || ''} (${p.fullname})</span></p>
                                <p>🏛️ <strong>สถาบัน:</strong> <span class="text-gray-900 font-bold">${p.university}</span></p>
                                <p>📊 <strong>GPAX สะสม:</strong> <span class="bg-green-600 text-white font-black px-1.5 py-0.5 rounded text-[10px]">${p.gpax || '-'}</span></p>
                            </div>

                            <div class="bg-gray-50 border-l-4 border-[#7A1C1C] p-2 rounded-r-lg">
                                <p class="text-xs font-medium text-gray-600 leading-relaxed line-clamp-2">
                                    💡 "${p.intro || 'ไม่มีคำแนะนำเพิ่มเติม'}"
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="p-5 pt-0 mt-auto">
                        <button class="view-details-btn block w-full text-center bg-[#7A1C1C] hover:bg-[#631212] text-white font-black py-2.5 px-4 rounded-xl text-xs border-b-4 border-[#D4AF37] active:border-b-0 transition-all duration-150 shadow-sm"
                                data-fullname="${p.fullname}" data-title="${p.title}">
                            🔍 ดูรายละเอียดและเทคนิคผลงาน
                        </button>
                    </div>
                </div>
                `;
            }).join('')}
        </div>
    `;

    attachModalClickEvents();
}

function attachModalClickEvents() {
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const fullname = e.currentTarget.getAttribute('data-fullname');
            const title = e.currentTarget.getAttribute('data-title');
            
            import('./data.js').then(({ state }) => {
                const matchedPort = state.portfolios.find(p => p.fullname === fullname && p.title === title);
                if (matchedPort) {
                    import('./ui.js').then(({ renderPortfolioModal, closePortfolioModal }) => {
                        renderPortfolioModal(matchedPort);
                        document.getElementById('closeModalBtn')?.addEventListener('click', closePortfolioModal);
                        document.getElementById('modalOverlay')?.addEventListener('click', (event) => {
                            if (event.target.id === 'modalOverlay') closePortfolioModal();
                        });
                    });
                }
            });
        });
    });
}

// =================================================================
// 🔑 4. ฟังก์ชันสำหรับวาดหน้าแบบฟอร์มเข้าสู่ระบบ (Login Form)
// =================================================================
export function renderLoginForm() {
    const appContainer = document.getElementById('app');
    if (!appContainer) return;

    appContainer.innerHTML = `
        <div class="flex items-center justify-center min-h-[70vh]">
            <div class="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 w-full max-w-md">
                <h2 class="text-2xl font-black text-center text-[#7A1C1C] mb-2">เข้าสู่ระบบสมาชิกรุ่นพี่</h2>
                <p class="text-xs text-center text-gray-500 mb-6">กรอกข้อมูลบัญชีเพื่อส่งไฟล์พอร์ตโฟลิโอแนะแนวรุ่นน้อง</p>
                
                <form id="loginForm" class="space-y-4">
                    <div>
                        <label class="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">Username / Email</label>
                        <input type="text" id="email" required placeholder="กรอกไอดีผู้ใช้งาน..." class="mt-1 block w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C] focus:border-[#7A1C1C]">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">Password</label>
                        <input type="password" id="password" required autocomplete="current-password" placeholder="••••••••" class="mt-1 block w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C] focus:border-[#7A1C1C]">
                    </div>
                    
                    <div id="loginMessage" class="text-xs text-red-600 font-bold text-center"></div>

                    <button type="submit" class="w-full bg-[#7A1C1C] hover:bg-[#631212] text-white font-black py-3 px-4 rounded-xl text-xs border-b-4 border-[#D4AF37] transition duration-150 cursor-pointer shadow-md">
                        🔓 ยืนยันเข้าสู่ระบบคลังพอร์ต
                    </button>
                </form>
            </div>
        </div>
    `;
}

// =================================================================
// 👤 5. ฟังก์ชันสำหรับวาดหน้าแบบฟอร์มสมัครสมาชิก (Register Form)
// =================================================================
export function renderRegisterForm() {
    const appContainer = document.getElementById('app');
    if (!appContainer) return;

    appContainer.innerHTML = `
        <div class="flex items-center justify-center min-h-[70vh]">
            <div class="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 w-full max-w-md">
                <h2 class="text-2xl font-black text-center text-[#7A1C1C] mb-2">สมัครสมาชิกระบบใหม่</h2>
                <p class="text-xs text-center text-gray-500 mb-6">สร้างบัญชีรุ่นพี่โรงเรียนเบญจมราชานุสรณ์เพื่อร่วมแบ่งปันผลงาน</p>
                
                <form id="registerForm" class="space-y-4">
                    <div>
                        <label class="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">Username (ชื่อไอดีตั้งเอง)</label>
                        <input type="text" id="regUsername" required placeholder="ตั้งชื่อไอดีภาษาอังกฤษ..." class="mt-1 block w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">Email (อีเมลติดต่อ)</label>
                        <input type="email" id="regEmail" required placeholder="name@example.com" class="mt-1 block w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">Password (รหัสผ่าน)</label>
                        <input type="password" id="regPassword" required placeholder="ตั้งรหัสผ่านอย่างน้อย 6 ตัว..." class="mt-1 block w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                    </div>
                    
                    <div id="regMessage" class="text-xs text-red-600 font-bold text-center"></div>

                    <button type="submit" class="w-full bg-[#7A1C1C] hover:bg-[#631212] text-white font-black py-3 px-4 rounded-xl text-xs border-b-4 border-[#D4AF37] transition duration-150 cursor-pointer shadow-md">
                        ✨ ยืนยันลงทะเบียนสมาชิกใหม่
                    </button>
                </form>
            </div>
        </div>
    `;
}

// =================================================================
// 📝 6. ฟังก์ชันสำหรับวาดหน้าส่งแบบฟอร์มพอร์ตโฟลิโอ (Portfolio Form)
// =================================================================
export function renderPortfolioForm(containerId, username) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="max-w-3xl mx-auto my-6 bg-white p-8 rounded-2xl border border-gray-200 shadow-xl">
            <div class="border-b-2 border-[#7A1C1C] pb-3 mb-6">
                <h2 class="text-2xl font-black text-[#7A1C1C] flex items-center gap-2">📝 ส่งผลงานพอร์ตโฟลิโอเข้าระบบ</h2>
                <p class="text-gray-500 text-xs mt-1">กรอกข้อมูลการติดมหาลัยและอัปโหลดภาพหน้าปกเพื่อแนะแนวแนวทางให้รุ่นน้อง BS</p>
            </div>

            <form id="portfolio-form" class="space-y-6">
                <input type="hidden" id="port-sender" value="${username}">

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label class="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">👤 ชื่อ-นามสกุลจริง</label>
                        <input type="text" id="port-fullname" required placeholder="เช่น นายสมชาย รักเรียน" class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">💬 ชื่อเล่น (สำหรับแสดงการ์ด)</label>
                        <input type="text" id="port-nickname" required placeholder="เช่น พี่ก้อง" class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div class="sm:col-span-2">
                        <label class="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">🏛️ มหาวิทยาลัย / สถาบัน</label>
                        <input type="text" id="port-university" required placeholder="เช่น มหาวิทยาลัยเกษตรศาสตร์" class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">📊 GPAX (เกรดเฉลี่ยสะสม)</label>
                        <input type="number" step="0.01" min="0.00" max="4.00" id="port-gpax" required placeholder="เช่น 3.75" class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label class="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">🎓 คณะที่สอบติด</label>
                        <input type="text" id="port-faculty" required placeholder="เช่น วิศวกรรมศาสตร์" class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                    </div>
                    <div>
                        <label class="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">🧬 สาขาวิชา / ภาควิชา</label>
                        <input type="text" id="port-major" required placeholder="เช่น สาขาวิชาคอมพิวเตอร์" class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label class="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">🎯 ผ่านการคัดเลือกในรอบ</label>
                        <select id="port-round" class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold bg-white outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                            <option value="รอบ 1 Portfolio">รอบ 1 Portfolio</option>
                            <option value="รอบ 2 Quota">รอบ 2 Quota</option>
                            <option value="รอบ 3 Admission">รอบ 3 Admission</option>
                            <option value="รอบ 4 Direct Admission">รอบ 4 Direct Admission</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">🖼️ รูปภาพหน้าปกพอร์ตโฟลิโอ</label>
                        <input type="file" id="port-image" required accept="image/*" class="w-full rounded-xl border-2 border-gray-300 p-1.5 text-xs font-bold bg-white outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">🏷️ หัวข้อ / ชื่อผลงานพอร์ต</label>
                    <input type="text" id="port-title" required placeholder="เช่น พอร์ตยื่นวิศวะคอม ติด มก. บางเขน รอบ 1 ช้างเผือก" class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                </div>

                <div>
                    <label class="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">💡 เทคนิคแนะนำ / ประสบการณ์ย่อถึงรุ่นน้อง</label>
                    <textarea id="port-intro" rows="3" required placeholder="เช่น แนะนำให้เก็บเกียรติบัตรค่ายโอลิมปิกวิชาการ และทำหน้าปกโทนสีประจำมหาลัย..." class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]"></textarea>
                </div>

                <div>
                    <label class="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">🚀 ลิงก์อ่านไฟล์ฉบับเต็ม (Google Drive / Canva)</label>
                    <input type="url" id="port-link" required placeholder="https://drive.google.com/... หรือ https://canva.com/..." class="w-full rounded-xl border-2 border-gray-300 p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#7A1C1C]">
                </div>

                <button type="submit" id="submit-portfolio-btn" class="w-full bg-[#7A1C1C] hover:bg-[#631212] text-white font-black py-3.5 px-4 rounded-xl text-xs border-b-4 border-[#D4AF37] active:border-b-0 transition-all duration-150 shadow-md cursor-pointer">
                    🚀 ส่งข้อมูลขึ้นระบบพอร์ตโฟลิโอเบญนนท์
                </button>
            </form>
        </div>
    `;
}

// =================================================================
// 🔍 7. ฟังก์ชันวาดโครงแผงควบคุมหน้าต่าง Modal รายละเอียดเจาะลึก
// =================================================================
export function renderPortfolioModal(portfolio) {
    let modalOverlay = document.getElementById('modalOverlay');
    
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'modalOverlay';
        modalOverlay.className = "fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300";
        document.body.appendChild(modalOverlay);
    }

    const imageSrc = portfolio.image_url ? (portfolio.image_url.startsWith('data:') ? portfolio.image_url : `data:image/jpeg;base64,${portfolio.image_url}`) : 'https://placehold.co/600x400/7A1C1C/FFFFFF?text=BS+Portfolio';

    modalOverlay.innerHTML = `
        <div class="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] shadow-2xl overflow-hidden transform scale-95 transition-transform duration-300 flex flex-col border border-gray-100">
            
            <div class="p-5 bg-[#7A1C1C] border-b-4 border-[#D4AF37] text-white flex justify-between items-center shrink-0">
                <div>
                    <span class="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-md font-black border border-white/10 uppercase tracking-widest">${portfolio.round || 'ไม่ระบุรอบ'}</span>
                    <h3 class="text-base font-black truncate max-w-xl mt-1 leading-tight">${portfolio.title}</h3>
                </div>
                <button id="closeModalBtn" class="bg-black/20 hover:bg-black/40 text-white text-xs w-8 h-8 rounded-full flex items-center justify-center font-bold transition shadow-inner cursor-pointer">✕</button>
            </div>

            <div class="p-6 overflow-y-auto space-y-6 flex-1">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div class="bg-gray-50 rounded-2xl border overflow-hidden shadow-inner flex items-center justify-center max-h-[400px]">
                        <img src="${imageSrc}" alt="หน้าปกพอร์ตแบบขยาย" class="w-full h-full object-contain">
                    </div>

                    <div class="space-y-4 flex flex-col justify-between">
                        <div class="bg-[#7A1C1C]/5 p-4 rounded-2xl border border-[#7A1C1C]/10 space-y-3 shadow-inner text-xs">
                            <p class="text-sm font-bold text-[#7A1C1C] border-b pb-1.5 flex items-center gap-1.5">🎓 ข้อมูลการสอบติดรุ่นพี่</p>
                            <p class="text-gray-700">👤 <strong>เจ้าของผลงาน:</strong> <span class="text-gray-900 font-extrabold text-sm pl-1">พี่${portfolio.nickname || ''} (${portfolio.fullname})</span></p>
                            <p class="text-gray-700">🏛️ <strong>สถาบัน/มหาวิทยาลัย:</strong> <span class="text-gray-900 font-bold pl-1">${portfolio.university}</span></p>
                            <p class="text-gray-700">🎓 <strong>คณะผู้รับเข้าศึกษา:</strong> <span class="text-gray-900 font-bold pl-1">${portfolio.faculty}</span></p>
                            <p class="text-gray-700">🧬 <strong>สาขาวิชาเอกหลัก:</strong> <span class="text-gray-900 font-bold pl-1">${portfolio.major || '-'}</span></p>
                            <p class="text-gray-700">📊 <strong>เกรดเฉลี่ยสะสม (GPAX):</strong> <span class="bg-green-600 text-white font-black px-2 py-0.5 rounded text-xs ml-1 shadow-sm">${portfolio.gpax || '-'}</span></p>
                        </div>

                        <div class="bg-amber-50/60 p-4 rounded-2xl border border-[#D4AF37]/30">
                            <p class="text-xs font-black text-amber-800 flex items-center gap-1.5 mb-1.5">💡 เทคนิคแนะนำและการเตรียมตัวย่อ:</p>
                            <p class="text-xs text-gray-700 font-medium leading-relaxed italic">
                                "${portfolio.intro || 'รุ่นพี่ไม่ได้ฝากเทคนิคเพิ่มเติมเอาไว้ครับ'}"
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <div class="p-4 bg-gray-50 border-t flex justify-end shrink-0">
                <a href="${portfolio.port_link}" target="_blank" class="w-full text-center bg-[#7A1C1C] hover:bg-[#631212] text-white font-black py-3 px-6 rounded-xl text-xs border-b-4 border-[#D4AF37] active:border-b-0 transition duration-150 shadow-md flex items-center justify-center gap-2">
                    🚀 เปิดอ่านไฟล์พอร์ตฉบับเต็มของรุ่นพี่ (Google Drive / Canva)
                </a>
            </div>

        </div>
    `;

    setTimeout(() => {
        modalOverlay.classList.remove('pointer-events-none', 'opacity-0');
        modalOverlay.classList.add('opacity-100');
        modalOverlay.firstElementChild.classList.remove('scale-95');
        modalOverlay.firstElementChild.classList.add('scale-100');
    }, 50);
}

export function closePortfolioModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
        overlay.classList.remove('opacity-100');
        overlay.classList.add('opacity-0', 'pointer-events-none');
        overlay.firstElementChild.classList.remove('scale-100');
        overlay.firstElementChild.classList.add('scale-95');
    }
}

// =================================================================
// 👑 8. ฟังก์ชันแผงควบคุมแดชบอร์ดแอดมิน (Admin Dashboard)
// =================================================================
// =================================================================
// 👑 8. ฟังก์ชันแผงควบคุมแดชบอร์ดแอดมิน (Admin Dashboard) - ซ่อมชื่อตัวแปรแล้ว
// =================================================================
export function renderAdminDashboard(portfolios, userRole) {
    const appContainer = document.getElementById('app');
    if (!appContainer) return;

    // แก้ไขตรรกะคัดกรองข้อมูลให้ดึงจาก portfolios ที่ส่งเข้ามาโดยตรง
    const pendingList = portfolios.filter(p => p.status === 'pending');
    const approvedList = portfolios.filter(p => p.status === 'approved' || !p.status);

    appContainer.innerHTML = `
        <div class="my-6 space-y-6">
            <div class="border-b-2 border-[#7A1C1C] pb-3">
                <h2 class="text-2xl font-black text-[#7A1C1C]">🛡️ แผงควบคุมทีมงานแอดมิน (สิทธิ์: ${userRole ? userRole.toUpperCase() : 'ADMIN'})</h2>
                <p class="text-gray-500 text-xs mt-1">คัดกรองข้อมูลผลงาน ตรวจสอบความถูกต้องก่อนอนุมัติพอร์ตขึ้นสู่หน้าแรกหลัก</p>
            </div>

            <div class="bg-white p-6 rounded-2xl border shadow-md">
                <h3 class="text-base font-black text-amber-600 mb-4 flex items-center gap-2">⏳ รายการพอร์ตที่รอดำเนินการอนุมัติ (${pendingList.length})</h3>
                
                ${pendingList.length === 0 ? `
                    <p class="text-xs text-gray-400 font-bold py-4 text-center">🎉 สบายใจได้! ไม่มีข้อมูลพอร์ตค้างในคิวระบบในเวลานี้</p>
                ` : `
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs font-bold border-collapse">
                            <thead>
                                <tr class="bg-gray-100 text-gray-700 uppercase border-b">
                                    <th class="p-3">ชื่อผลงาน</th>
                                    <th class="p-3">เจ้าของ</th>
                                    <th class="p-3">มหาวิทยาลัย / คณะ</th>
                                    <th class="p-3 text-center">การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y">
                                ${pendingList.map(p => `
                                    <tr class="hover:bg-gray-50">
                                        <td class="p-3 font-black text-gray-800">${p.title}</td>
                                        <td class="p-3 text-gray-600">${p.fullname} (พี่${p.nickname})</td>
                                        <td class="p-3 text-gray-600">${p.university}<br><span class="text-[10px] text-purple-700">${p.faculty}</span></td>
                                        <td class="p-3 text-center flex items-center justify-center gap-2">
                                            <button class="approve-btn bg-green-600 hover:bg-green-500 text-white font-black px-3 py-1.5 rounded-md cursor-pointer" data-fullname="${p.fullname}" data-title="${p.title}">อนุมัติ</button>
                                            ${userRole === 'superadmin' ? `
                                                <button class="reject-btn bg-red-600 hover:bg-red-500 text-white font-black px-3 py-1.5 rounded-md cursor-pointer" data-fullname="${p.fullname}" data-title="${p.title}">ปฏิเสธ/ลบ</button>
                                            ` : ''}
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `}
            </div>

            <div class="bg-white p-6 rounded-2xl border shadow-md">
                <h3 class="text-base font-black text-green-700 mb-4 flex items-center gap-2">✅ ผลงานที่ออนไลน์อยู่บนหน้าแรกปัจจุบัน (${approvedList.length})</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs font-bold border-collapse">
                        <thead>
                            <tr class="bg-gray-100 text-gray-700 border-b">
                                <th class="p-3">ชื่อผลงาน</th>
                                <th class="p-3">เจ้าของ</th>
                                <th class="p-3">สถาบันปลายทาง</th>
                                ${userRole === 'superadmin' ? `<th class="p-3 text-center">ลบถาวร</th>` : ''}
                            </tr>
                        </thead>
                        <tbody class="divide-y">
                            ${approvedList.map(p => `
                                <tr class="hover:bg-gray-50">
                                    <td class="p-3 text-gray-800">${p.title}</td>
                                    <td class="p-3 text-gray-600">${p.fullname}</td>
                                    <td class="p-3 text-gray-600">${p.university}</td>
                                    ${userRole === 'superadmin' ? `
                                        <td class="p-3 text-center">
                                            <button class="reject-btn bg-red-600 hover:bg-red-500 text-white font-black px-2.5 py-1 rounded-md cursor-pointer" data-fullname="${p.fullname}" data-title="${p.title}">ลบออกจากระบบ</button>
                                        </td>
                                    ` : ''}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// =================================================================
// 🖼️ 9. ฟังก์ชันย่อยสำหรับแปลงไฟล์รูปภาพที่อัปโหลด ให้เป็นรหัส Base64 (ซ่อมขีดแดง)
// =================================================================
export function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
