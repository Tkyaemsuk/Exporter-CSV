# Source provenance

ไฟล์ต้นทางที่ใช้สร้างชุดนี้คือ Budibase distribution bundle ของ `Export` v1.4.2 ซึ่ง Compile ด้วย Svelte 3 แล้ว

`src/plugin.js` คือ bundle ตัวเดียวกันที่ผ่านการ beautify เพื่อให้อ่าน ค้นหา และแก้ไขได้ ไม่ใช่ไฟล์ authoring source เดิมในรูปแบบ `Component.svelte` เนื่องจากไฟล์ต้นฉบับที่ได้รับไม่มี source map หรือโครงการ Svelte รุ่น v1.4.2 แนบมาด้วย

ข้อดีของรูปแบบนี้คือฟังก์ชันทั้งหมดตรงกับ Plugin v1.4.2 ที่ใช้งานจริง และสามารถ Build กลับเป็น `plugin.min.js` ได้ ส่วนข้อจำกัดคือโครงสร้างยังเป็นผลลัพธ์หลัง Svelte compiler จึงอ่านยากกว่าไฟล์ `.svelte` ต้นฉบับ

หากมี authoring source หรือ source map ของ v1.4.2 ในอนาคต ควรใช้ไฟล์เหล่านั้นแทน recovered bundle นี้

