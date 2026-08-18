# Export — Budibase Component Plugin

Open-source release ของ Plugin `Export` v1.4.2 สำหรับ Budibase v3.4.1 ใช้สำหรับส่งออกข้อมูลจาก Table, View, Query หรือ Data Provider และตั้งค่ารูปแบบคอลัมน์ผ่าน Visual Designer

## ความสามารถ

- ส่งออก CSV, XLSX, XLS, HTML, PDF และ JSON
- รองรับภาษาไทย, UTF-8 BOM, พ.ศ. และเวลา Thailand UTC+07:00
- กำหนดชื่อหัวคอลัมน์ ลำดับ สี ความกว้าง การจัดตำแหน่ง และรูปแบบวันที่
- รองรับลายน้ำและส่วนท้ายเอกสาร
- ล็อกดีไซน์ไว้ใน `Column design (JSON)` ของ Component
- ไม่ใช้ `localStorage` และไม่ต้องสร้าง Config Table
- รองรับ Budibase v3.4.1 และ Svelte 3 runtime

## โครงสร้าง

```text
export-v1.4.2-open-source/
├── src/plugin.js          # bundle ที่คลายรูปแบบแล้ว อ่านและแก้ไขได้
├── dist/plugin.min.js     # build ที่พร้อมใช้งาน
├── scripts/build.mjs      # minify และอัปเดต SHA-1 ใน schema
├── scripts/verify.mjs     # ตรวจชื่อ รุ่น schema และการลงทะเบียน
├── scripts/package.mjs    # สร้างไฟล์ติดตั้ง .tar.gz
├── schema.json
├── package.json
├── SOURCE-NOTES.md
└── LICENSE
```

## เริ่มพัฒนา

ต้องใช้ Node.js 18 ขึ้นไป

```bash
npm install
npm run build
npm run verify
```

สร้างแพ็กเกจสำหรับอัปโหลดเข้า Budibase:

```bash
npm run package
```

ไฟล์จะถูกสร้างที่ `release/export-1.4.2.tar.gz`

## การแก้ชื่อหรือเวอร์ชัน

ชื่อและเวอร์ชันอยู่ทั้งใน `package.json`, `schema.json` และท้ายไฟล์ `src/plugin.js` ควรแก้ให้ตรงกัน แล้วรัน `npm run build` และ `npm run verify`

## วิธีล็อก Column Design

1. เปิด Visual Designer ของ Component
2. ออกแบบคอลัมน์ตามต้องการ
3. กด `คัดลอกเพื่อล็อกดีไซน์`
4. วาง JSON ลงใน `Column design (JSON)` ที่หัวข้อ `COLUMNS`
5. กด Publish

## License

เผยแพร่ภายใต้ MIT License สามารถนำไปใช้ แก้ไข และแจกจ่ายต่อได้ โดยต้องเก็บข้อความลิขสิทธิ์และ License ไว้

