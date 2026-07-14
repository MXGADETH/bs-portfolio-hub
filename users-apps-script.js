/**
 * Users API for B.S. Portfolio Hub
 *
 * Spreadsheet columns (row 1):
 * timestamp | username | password | email | role | fullName | identifier | studentId | requestPasswordReset
 *
 * Deploy this file as a Web app from the Google Apps Script attached to the Users spreadsheet.
 */

const USERS_SHEET_NAME = 'users';
const USER_COLUMNS = {
  timestamp: 1,
  username: 2,
  password: 3,
  email: 4,
  role: 5,
  fullName: 6,
  identifier: 7,
  studentId: 8,
  resetRequestedAt: 9
};

function doGet() {
  return jsonResponse({ status: 'success', message: 'Users API is running' });
}

function doPost(e) {
  try {
    const payload = JSON.parse(e && e.postData && e.postData.contents ? e.postData.contents : '{}');
    switch (payload.action) {
      case 'login':
        return loginUser(payload);
      case 'register':
        return registerUser(payload);
      case 'requestPasswordReset':
        return resetPassword(payload);
      default:
        return jsonResponse({ status: 'error', message: 'ไม่รู้จักคำสั่งที่ร้องขอ' });
    }
  } catch (error) {
    console.error(error);
    return jsonResponse({ status: 'error', message: 'ระบบสมาชิกขัดข้อง กรุณาลองใหม่อีกครั้ง' });
  }
}

function loginUser({ identifier, password }) {
  const loginValue = String(identifier || '').trim().toLowerCase();
  const users = getUsersSheet().getDataRange().getValues();

  for (let i = 1; i < users.length; i += 1) {
    const row = users[i];
    const username = String(row[USER_COLUMNS.username - 1] || '').trim().toLowerCase();
    const email = String(row[USER_COLUMNS.email - 1] || '').trim().toLowerCase();
    const savedPassword = String(row[USER_COLUMNS.password - 1] || '');
    if ((loginValue === username || loginValue === email) && password === savedPassword) {
      return jsonResponse({
        status: 'success',
        user: row[USER_COLUMNS.username - 1],
        username: row[USER_COLUMNS.username - 1],
        role: row[USER_COLUMNS.role - 1] || 'user'
      });
    }
  }
  return jsonResponse({ status: 'error', message: 'Username/อีเมล หรือรหัสผ่านไม่ถูกต้อง' });
}

function registerUser({ username, email, password, fullName, studentId }) {
  username = String(username || '').trim();
  email = String(email || '').trim().toLowerCase();
  password = String(password || '');
  fullName = String(fullName || '').trim();
  studentId = String(studentId || '').trim();

  if (!username || !email || !password || !fullName || !studentId) {
    return jsonResponse({ status: 'error', message: 'กรุณากรอกข้อมูลให้ครบทุกช่อง' });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return jsonResponse({ status: 'error', message: 'รูปแบบอีเมลไม่ถูกต้อง' });
  }
  if (!/^\d+$/.test(studentId)) {
    return jsonResponse({ status: 'error', message: 'เลขประจำตัวนักเรียนต้องเป็นตัวเลขเท่านั้น' });
  }
  if (password.length < 6) {
    return jsonResponse({ status: 'error', message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' });
  }

  const sheet = getUsersSheet();
  const users = sheet.getDataRange().getValues();
  const usernameKey = username.toLowerCase();
  const exists = users.slice(1).some(row =>
    String(row[USER_COLUMNS.username - 1] || '').trim().toLowerCase() === usernameKey ||
    String(row[USER_COLUMNS.email - 1] || '').trim().toLowerCase() === email ||
    String(row[USER_COLUMNS.studentId - 1] || '').trim() === studentId
  );
  if (exists) {
    return jsonResponse({ status: 'error', message: 'Username, อีเมล หรือเลขประจำตัวนักเรียนนี้ถูกใช้แล้ว' });
  }

  // Always write a new record on the row after the current last record.
  // This preserves the header and every existing member.
  const nextRow = Math.max(2, sheet.getLastRow() + 1);
  sheet.getRange(nextRow, 1, 1, 9).setValues([
    [new Date(), username, password, email, 'user', fullName, username, studentId, '']
  ]);
  return jsonResponse({ status: 'success', message: 'สมัครสมาชิกสำเร็จ' });
}

function resetPassword({ email }) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const sheet = getUsersSheet();
  const users = sheet.getDataRange().getValues();
  const rowIndex = users.findIndex((row, index) => index > 0 && String(row[USER_COLUMNS.email - 1] || '').trim().toLowerCase() === normalizedEmail);

  // Do not reveal whether an email is registered.
  const genericMessage = 'หากอีเมลนี้อยู่ในระบบ เราได้ส่งรหัสผ่านชั่วคราวไปให้แล้ว';
  if (rowIndex < 1) return jsonResponse({ status: 'success', message: genericMessage });

  const temporaryPassword = createTemporaryPassword();
  const sheetRow = rowIndex + 1;
  sheet.getRange(sheetRow, USER_COLUMNS.password).setValue(temporaryPassword);
  sheet.getRange(sheetRow, USER_COLUMNS.resetRequestedAt).setValue(new Date());

  MailApp.sendEmail({
    to: normalizedEmail,
    subject: 'รหัสผ่านชั่วคราว — B.S. Portfolio Hub',
    htmlBody: `<p>มีการร้องขอรีเซ็ตรหัสผ่านสำหรับบัญชีของคุณ</p>
      <p>รหัสผ่านชั่วคราว: <strong style="font-size:18px">${temporaryPassword}</strong></p>
      <p>กรุณาเข้าสู่ระบบด้วยรหัสนี้ และติดต่อผู้ดูแลระบบหากคุณไม่ได้เป็นผู้ร้องขอ</p>`
  });
  return jsonResponse({ status: 'success', message: genericMessage });
}

function getUsersSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(USERS_SHEET_NAME) || spreadsheet.getSheetByName('Users');
  const headers = ['timestamp', 'username', 'password', 'email', 'role', 'fullName', 'identifier', 'studentId', 'requestPasswordReset'];
  if (!sheet) {
    sheet = spreadsheet.insertSheet(USERS_SHEET_NAME);
    sheet.appendRow(headers);
  } else {
    const firstCell = String(sheet.getRange(1, 1).getValue() || '').trim().toLowerCase();
    if (firstCell !== 'timestamp') {
      // Keep any registration that was written into row 1, then restore the headers above it.
      sheet.insertRowBefore(1);
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.setFrozenRows(1);
    }
  }
  return sheet;
}

function createTemporaryPassword() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  let password = '';
  for (let i = 0; i < 12; i += 1) password += alphabet[Math.floor(Math.random() * alphabet.length)];
  return password;
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
