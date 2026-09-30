import fs from 'fs';
import path from 'path';

function createSimplePDF() {
  const content = [
    'BT',
    '/F1 18 Tf',
    '50 770 Td',
    '(S MANOJ PRABHU) Tj',
    '/F1 11 Tf',
    '0 -22 Td',
    '(Frontend Developer | UI/UX Designer | Java Developer) Tj',
    '/F1 9 Tf',
    '0 -17 Td',
    '(Email: manojprabhu0707@gmail.com  |  Phone: +91 9677518268  |  Location: Polur, Tamil Nadu, India) Tj',
    '0 -13 Td',
    '(GitHub: github.com/manojprabhu07  |  LinkedIn: linkedin.com/in/manojprabhu07) Tj',
    '/F1 12 Tf',
    '0 -26 Td',
    '(EDUCATION & ACADEMICS) Tj',
    '/F1 9.5 Tf',
    '0 -15 Td',
    '(Saveetha School of Engineering, SIMATS - B.E. Computer Science and Engineering (2022 - 2026)) Tj',
    '/F1 12 Tf',
    '0 -24 Td',
    '(TECHNICAL SKILLS) Tj',
    '/F1 9 Tf',
    '0 -14 Td',
    '(Languages: Java, JavaScript, Python, SQL) Tj',
    '0 -13 Td',
    '(Frontend & UI/UX: React, TypeScript, HTML5, CSS3, Tailwind CSS, Figma, Wireframing, Prototyping) Tj',
    '0 -13 Td',
    '(Backend & Cloud: Spring Boot, REST APIs, MySQL, Firebase, Oracle APEX, Git, Docker) Tj',
    '0 -13 Td',
    '(Applied ML & Analytics: XGBoost, SVM, Logistic Regression, Scikit-learn, Data Analysis) Tj',
    '/F1 12 Tf',
    '0 -24 Td',
    '(EXPERIENCE & INTERNSHIPS) Tj',
    '/F1 9.5 Tf',
    '0 -15 Td',
    '(Infosys Springboard - Project Intern (09/2025 - 11/2025)) Tj',
    '/F1 9 Tf',
    '0 -13 Td',
    '(- Built full-stack Ride Sharing & Carpooling Platform with Java, Spring Boot, and MySQL.) Tj',
    '0 -13 Td',
    '(- Shipped 8+ RESTful APIs for user registration, trip matching, booking, and route tracking.) Tj',
    '/F1 9.5 Tf',
    '0 -16 Td',
    '(Fluezen Technology - UI/UX Design Intern (01/2024 - 03/2024)) Tj',
    '/F1 9 Tf',
    '0 -13 Td',
    '(- Delivered 10+ mobile and web UI screens in Figma; reduced handoff time by 25%.) Tj',
    '/F1 9.5 Tf',
    '0 -16 Td',
    '(Kaashiv Infotech - UI/UX Design Intern (06/2023 - 08/2023)) Tj',
    '/F1 9 Tf',
    '0 -13 Td',
    '(- Developed Figma component library of 20+ UI elements; designed Material Design mobile screens.) Tj',
    '/F1 12 Tf',
    '0 -24 Td',
    '(FEATURED PROJECTS) Tj',
    '/F1 9.5 Tf',
    '0 -15 Td',
    '(1. Network Intrusion Detection System - 85% Accuracy ML model using XGBoost, SVM, and Python.) Tj',
    '0 -15 Td',
    '(2. Autonomous AI Content Studio - Cloud video pipeline with Groq LLaMA, Gemini, and FFmpeg.) Tj',
    '0 -15 Td',
    '(3. Polur Charm Civic & Tourism Platform - Bilingual React 19 web hub with live transit scheduling.) Tj',
    '0 -15 Td',
    '(4. Courier Delivery App - 15+ screen mobile Figma prototype with interactive parcel dispatch.) Tj',
    '/F1 12 Tf',
    '0 -24 Td',
    '(CERTIFICATIONS) Tj',
    '/F1 9 Tf',
    '0 -14 Td',
    '(Oracle: APEX Cloud Developer Professional | IBM: AI Fundamentals | NPTEL: IoT) Tj',
    'ET'
  ].join('\n');

  const streamLength = Buffer.byteLength(content);
  
  let objects = [];
  objects[1] = '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj';
  objects[2] = '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj';
  objects[3] = '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj';
  objects[4] = '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj';
  objects[5] = `5 0 obj\n<< /Length ${streamLength} >>\nstream\n${content}\nendstream\nendobj`;

  let pdf = '%PDF-1.4\n';
  let offsets = [];
  offsets[0] = '0000000000 65535 f \n';

  for (let i = 1; i <= 5; i++) {
    const offset = Buffer.byteLength(pdf);
    offsets[i] = String(offset).padStart(10, '0') + ' 00000 n \n';
    pdf += objects[i] + '\n';
  }

  const startxref = Buffer.byteLength(pdf);
  pdf += 'xref\n0 6\n' + offsets.join('') + '\n';
  pdf += `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;

  const targetPath = path.resolve(process.cwd(), 'client/public/S_Manoj_Prabhu_Resume.pdf');
  fs.writeFileSync(targetPath, pdf);
  console.log('Successfully generated resume PDF at:', targetPath, 'Size:', Buffer.byteLength(pdf));
}

createSimplePDF();
