# 📤 Export — Budibase Component Plugin

> Plugin สำหรับส่งออกข้อมูลจาก Budibase อย่างเป็นระบบ พร้อม Visual Column Designer การจัดรูปแบบภาษาไทย และการล็อกดีไซน์ไว้ใน Component Settings

**Version:** `1.4.2`  
**Compatibility:** Budibase `v3.4.1`  
**Runtime:** Svelte `3`  
**License:** MIT

---

## 📌 ภาพรวม

`Export` เป็น Custom Component Plugin สำหรับ Budibase ที่ช่วยส่งออกข้อมูลจาก **Table, View, Query และ Data Provider** ไปยังไฟล์หลายรูปแบบ โดยผู้พัฒนาสามารถกำหนดชื่อ ลำดับ สี ความกว้าง การจัดตำแหน่ง และรูปแบบข้อมูลของแต่ละคอลัมน์ผ่าน Visual Designer ได้

การตั้งค่าคอลัมน์จะถูกจัดเก็บในช่อง `Column design (JSON)` ของ Component โดยตรง จึงติดไปกับ App Definition และไม่สูญหายเมื่อเปลี่ยนเครื่องหรือเปลี่ยนเบราว์เซอร์

> Plugin ไม่ใช้ `localStorage` และไม่ต้องสร้าง Config Table เพิ่มเติม

---

## ✨ คุณสมบัติเด่น

### 🔌 การเชื่อมต่อข้อมูล

- รองรับ Table และ View
- รองรับ Budibase Query
- รองรับ Data Provider
- ตั้งค่า Sort column และ Sort order ได้
- กำหนด Page size และจำนวนแถวสูงสุดสำหรับการส่งออกได้

### 📁 รูปแบบไฟล์

- CSV (`.csv`)
- Excel Workbook (`.xlsx`)
- Excel XML (`.xls`)
- HTML (`.html`)
- PDF (`.pdf`)
- JSON (`.json`)

### 🎨 Column Designer

- เปิดหรือปิดแต่ละคอลัมน์
- เปลี่ยนชื่อหัวคอลัมน์
- เลือก Field ต้นทาง
- กำหนดชนิดข้อมูลอัตโนมัติ ข้อความ ตัวเลข หรือวันที่
- กำหนดรูปแบบวันที่และ Time zone รายคอลัมน์
- กำหนดจำนวนตำแหน่งทศนิยม
- จัดตำแหน่งข้อความซ้าย กึ่งกลาง หรือขวา
- กำหนดความกว้างคอลัมน์
- กำหนดสีพื้นหลังและสีข้อความของหัวตารางหรือข้อมูล
- เรียงลำดับ ทำสำเนา และลบคอลัมน์

### 🇹🇭 ภาษาและวันที่

- รองรับภาษาไทยและภาษาอังกฤษ
- รองรับ UTF-8 BOM สำหรับ CSV ภาษาไทย
- รองรับเวลา Thailand UTC+07:00 และ UTC
- รองรับปีพุทธศักราช (พ.ศ.)
- รองรับชื่อเดือนภาษาไทย
- ตรวจจับค่า ISO Date และ Date field อัตโนมัติ

### 🖼️ รูปแบบเอกสาร

- ตั้งค่าสีหัวตารางและสีข้อความ
- กำหนดตัวอักษรและขนาดตัวอักษร
- เปิดใช้แถวสลับสีได้
- กำหนดเส้นขอบตาราง
- รองรับลายน้ำจาก URL หรือ Base64 Data URI
- รองรับส่วนท้ายเอกสาร วันที่เริ่มใช้งาน และรหัสเอกสาร
- ตั้งชื่อไฟล์และเพิ่มวันเวลาต่อท้ายชื่อไฟล์ได้

> **หมายเหตุ:** CSV และ JSON เป็นรูปแบบข้อมูลที่ไม่รองรับสีหรือรูปแบบเซลล์ ควรใช้ XLSX, XLS, HTML หรือ PDF เมื่อต้องการเก็บรูปแบบตาราง

---

## 🧩 ความต้องการของระบบ

| รายการ | เวอร์ชันที่แนะนำ |
|---|---:|
| Budibase | `3.4.1` |
| Node.js | `18` ขึ้นไป |
| npm | `9` ขึ้นไป |
| Svelte Runtime | `3` |

---

## 🚀 การติดตั้ง Plugin ใน Budibase

1. เปิดโฟลเดอร์ `release`
2. เลือกไฟล์ `export-1.4.2.tar.gz`
3. เปิด Budibase Portal
4. ไปที่ **Settings → Plugins**
5. เลือก **Add plugin → File Upload**
6. อัปโหลดไฟล์ Plugin
7. Refresh หน้า App Builder
8. เพิ่ม Component ชื่อ `Export` ลงในหน้าจอ

---

## ⚙️ การใช้งานเบื้องต้น

1. เลือก Component `Export`
2. ที่หัวข้อ `DATA SOURCE` เลือก Source type
3. เลือก Table, View, Query หรือ Data Provider
4. ตั้งชื่อไฟล์และรูปแบบไฟล์ที่หัวข้อ `FILE`
5. กำหนดภาษา วันที่ สี และรูปแบบตารางตามต้องการ
6. Preview ข้อมูลก่อนส่งออก
7. กดปุ่ม `ส่งออกไฟล์`

---

## 🔒 การล็อก Column Design

Budibase v3.4.1 ไม่อนุญาตให้ Runtime Plugin แก้ไข Component Settings ของตัวเองโดยตรง ขั้นตอนการบันทึกดีไซน์จึงออกแบบให้ชัดเจนและปลอดภัยดังนี้

1. เปิด Visual Column Designer
2. ปรับแต่งคอลัมน์ให้เรียบร้อย
3. กด `คัดลอกเพื่อล็อกดีไซน์`
4. กลับไปที่ Component Settings
5. เปิดหัวข้อ `COLUMNS`
6. วาง JSON ลงในช่อง `Column design (JSON)`
7. กด `Publish`

หลัง Publish ดีไซน์จะถูกเก็บกับ Component และใช้งานได้เหมือนกันทุกเบราว์เซอร์

---

## 🛠️ การพัฒนา

ติดตั้ง Dependencies:

```bash
npm install
```

สร้าง Production Bundle:

```bash
npm run build
```

ตรวจสอบชื่อ รุ่น Schema และการลงทะเบียน Component:

```bash
npm run verify
```

สร้างไฟล์ติดตั้งสำหรับ Budibase:

```bash
npm run package
```

ไฟล์ที่ได้จะอยู่ที่:

```text
release/export-1.4.2.tar.gz
```

---

## 🗂️ โครงสร้างโครงการ

```text
export-v1.4.2-open-source/
├── src/
│   └── plugin.js          # Source bundle ที่จัดรูปแบบให้อ่านและแก้ไขได้
├── dist/
│   ├── plugin.min.js      # Production bundle
│   ├── schema.json
│   └── package.json
├── release/
│   └── export-1.4.2.tar.gz
├── scripts/
│   ├── build.mjs          # Build และอัปเดต Schema hash
│   ├── verify.mjs         # ตรวจสอบความถูกต้องของ Plugin
│   └── package.mjs        # สร้าง Budibase package
├── schema.json            # Component settings schema
├── package.json
├── SOURCE-NOTES.md
├── LICENSE
└── README.md
```

---

## 🧪 คำสั่งที่เกี่ยวข้อง

| คำสั่ง | รายละเอียด |
|---|---|
| `npm run build` | Minify source และอัปเดต SHA-1 ใน `schema.json` |
| `npm run verify` | ตรวจชื่อ Component, Version, Schema และ Persistence code |
| `npm run package` | Build, Verify และสร้างไฟล์ `.tar.gz` |

---

## 📝 การแก้ชื่อหรือเวอร์ชัน

ข้อมูลชื่อและเวอร์ชันปรากฏในหลายส่วนของโครงการ ได้แก่:

- `package.json`
- `schema.json`
- ส่วน Registration ท้ายไฟล์ `src/plugin.js`

เมื่อแก้ไขแล้วให้รัน:

```bash
npm run build
npm run verify
```

เพื่อสร้าง Bundle และ Schema hash ใหม่ให้ตรงกัน

---

## 🔍 หมายเหตุเกี่ยวกับ Source Code

ไฟล์ต้นทางที่ได้รับสำหรับ v1.4.2 เป็น Distribution Bundle ที่ Compile ด้วย Svelte 3 แล้ว โดยไม่มีไฟล์ `.svelte` หรือ Source Map แนบมาด้วย

ไฟล์ `src/plugin.js` ในโครงการนี้จึงเป็น Bundle ตัวจริงของ v1.4.2 ที่ผ่านการ Beautify เพื่อให้สามารถอ่าน ค้นหา แก้ไข และ Build กลับเป็น `plugin.min.js` ได้ รายละเอียดเพิ่มเติมอยู่ใน [`SOURCE-NOTES.md`](SOURCE-NOTES.md)

---

## 🤝 การมีส่วนร่วม

สามารถ Fork โครงการเพื่อแก้ไขหรือเพิ่มความสามารถได้ โดยแนะนำให้:

1. แยก Branch สำหรับแต่ละ Feature หรือ Bug fix
2. รัน `npm run verify` ก่อนส่งการเปลี่ยนแปลง
3. ไม่เพิ่ม `localStorage` สำหรับการเก็บ Column Design
4. รักษาความเข้ากันได้กับ Budibase v3.4.1
5. อัปเดต Version และเอกสารเมื่อมี Breaking change

---

## 🔐 ความปลอดภัย

- ตรวจสอบข้อมูลก่อนส่งออกทุกครั้ง
- หลีกเลี่ยงการส่งออก Field ที่มีรหัสผ่าน Token หรือข้อมูลส่วนบุคคล
- ตรวจสอบ Binding ของชื่อไฟล์และข้อมูลจากผู้ใช้งาน
- ทดสอบไฟล์ CSV กับโปรแกรมปลายทางเพื่อป้องกัน CSV Formula Injection

---

## 📄 License

โครงการนี้เผยแพร่ภายใต้ [MIT License](LICENSE) สามารถใช้งาน แก้ไข รวม แจกจ่าย และนำไปใช้เชิงพาณิชย์ได้ โดยต้องเก็บข้อความลิขสิทธิ์และ License ไว้ในสำเนาของ Software

---

## 👨‍💻 ผู้พัฒนา

**Thanakrit Yaemsuk** <br>
**Thiwat Khanphachai**

สร้างขึ้นเพื่อช่วยให้การส่งออกข้อมูลจาก Budibase มีความยืดหยุ่น เป็นมาตรฐาน และรองรับการใช้งานภาษาไทยอย่างสมบูรณ์

