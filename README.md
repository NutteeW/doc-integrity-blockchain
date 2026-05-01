# 📄 Document Verifier (Blockchain)

## 🇹🇭 คำอธิบายโปรเจกต์

โปรเจกต์นี้เป็นระบบตรวจสอบความถูกต้องของเอกสาร (Document Integrity Verification) โดยใช้เทคโนโลยี Blockchain บน Ethereum (Sepolia Testnet)

แนวคิดหลักคือ:

* ไม่เก็บไฟล์บน blockchain
* เก็บเฉพาะ "Hash" ของไฟล์
* ใช้ Hash เพื่อตรวจสอบว่าไฟล์ถูกแก้ไขหรือไม่

หากไฟล์ถูกแก้ไขแม้เพียงเล็กน้อย ค่า Hash จะเปลี่ยนทันที และระบบจะตรวจจับได้

---

## 🇬🇧 Project Description

This project is a **Document Integrity Verification System** built using Blockchain technology on Ethereum (Sepolia Testnet).

Core concept:

* The actual file is NOT stored on blockchain
* Only the **hash of the file** is stored
* The hash is used to verify whether the file has been modified

Even a small change in the file will result in a completely different hash.

---

# ⚙️ How It Works

## 🇹🇭 ขั้นตอนการทำงาน

1. ผู้ใช้เลือกไฟล์จากเครื่อง
2. ระบบสร้างค่า SHA-256 Hash ของไฟล์
3. ส่ง Hash ไปยัง Smart Contract
4. Blockchain บันทึก:

   * hash
   * timestamp
   * uploader address
   * file name
5. เมื่อทำการตรวจสอบ:

   * ระบบสร้าง hash ใหม่จากไฟล์
   * เปรียบเทียบกับข้อมูลบน blockchain
   * แสดงผลว่า "Verified" หรือ "Tampered"

---

## 🇬🇧 Workflow

1. User uploads a file
2. The system generates a SHA-256 hash
3. The hash is sent to the Smart Contract
4. Blockchain stores:

   * hash
   * timestamp
   * uploader address
   * file name
5. During verification:

   * A new hash is generated
   * Compared with blockchain data
   * Result: "Verified" or "Tampered"

---

# 🔐 Why Blockchain?

## 🇹🇭

Blockchain มีคุณสมบัติ:

* ไม่สามารถแก้ไขข้อมูลย้อนหลังได้ (Immutable)
* โปร่งใส (Transparent)
* ตรวจสอบได้ (Verifiable)

ทำให้เหมาะกับการใช้ตรวจสอบเอกสาร

---

## 🇬🇧

Blockchain provides:

* Immutability
* Transparency
* Verifiability

Making it ideal for document verification systems.

---

# 🧪 Demo Instructions

## 🇹🇭 วิธีทดลอง

1. Upload ไฟล์ → กด Register
2. ยืนยันใน MetaMask
3. Upload ไฟล์เดิม → กด Verify → ✅ Verified
4. แก้ไฟล์ → Upload ใหม่ → ❌ Tampered

---

## 🇬🇧 Demo Steps

1. Upload a file → Click Register
2. Confirm transaction in MetaMask
3. Upload the same file → Verify → ✅ Verified
4. Modify file → Upload again → ❌ Tampered

---

# 🛠 Tech Stack

* Solidity
* Hardhat
* React
* Ethers.js
* MetaMask
* Ethereum Sepolia Testnet

---

# 📍 Smart Contract

Network: Sepolia
Address: 0x3784D8b4ad8E5F0216bC8393626F2cA06A5F4bBA

---

# 🎯 Use Cases

## 🇹🇭

* เอกสารราชการ
* ใบรับรอง (Certificates)
* สัญญา (Contracts)
* เอกสารทางการแพทย์

## 🇬🇧

* Official documents
* Certificates
* Contracts
* Medical records

---

# 🚀 Summary

## 🇹🇭

โปรเจกต์นี้แสดงให้เห็นการนำ Blockchain มาใช้จริงในการตรวจสอบความถูกต้องของข้อมูล โดยไม่ต้องเก็บข้อมูลทั้งหมดบน chain

## 🇬🇧

This project demonstrates a real-world use case of Blockchain for verifying data integrity without storing full data on-chain.
