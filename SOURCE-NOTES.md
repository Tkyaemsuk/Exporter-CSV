# Source provenance

ไฟล์ฐานที่ใช้สร้างชุดนี้คือ Budibase distribution bundle ของ `Export` v1.4.2 ซึ่ง Compile ด้วย Svelte 3 แล้ว จากนั้นเพิ่ม Visual Document Header Designer และ Unified Locked Design ก่อนตัดระบบรูปภาพออกจาก Document Header ใน v1.8.0 ใช้ชื่อ Plugin ว่า `XLSX-EXPORT` ใน v1.9.0 เพิ่ม Conditional Formatting ใน v1.10.0 และปรับให้กฎใหม่เริ่มว่างเพื่อให้ผู้ใช้กำหนดเองทั้งหมดใน v1.10.1

`src/plugin.js` คือ recovered bundle ที่ผ่านการ beautify เพื่อให้อ่าน ค้นหา และแก้ไขได้ ไม่ใช่ไฟล์ authoring source เดิมในรูปแบบ `Component.svelte` เนื่องจากไฟล์ต้นฉบับที่ได้รับไม่มี source map หรือโครงการ Svelte รุ่น v1.4.2 แนบมาด้วย

ข้อดีของรูปแบบนี้คือยังคงฟังก์ชันเดิม พร้อม Document Header Rows, Visual Designer และ Conditional Formatting ของ v1.10.1 และสามารถ Build กลับเป็น `plugin.min.js` ได้ ส่วนข้อจำกัดคือโครงสร้างยังเป็นผลลัพธ์หลัง Svelte compiler จึงอ่านยากกว่าไฟล์ `.svelte` ต้นฉบับ

หากมี authoring source หรือ source map ของ v1.4.2 ในอนาคต ควรใช้ไฟล์เหล่านั้นแทน recovered bundle นี้
