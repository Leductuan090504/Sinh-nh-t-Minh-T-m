# Thiệp mời sinh nhật Minh Tâm

Website thiệp mời sinh nhật cho Huỳnh Thị Minh Tâm, thiết kế như một lá thư riêng tư: mở phong thư, lá thư trượt lên, lật từ mặt sau sang mặt chính, nội dung tiếng Anh hiện dần rồi chuyển sang phần thông tin sinh nhật.

## Cách chạy project

Yêu cầu máy đã cài Node.js.

```bash
npm install
npm run dev
```

Mở địa chỉ Vite hiển thị trong terminal, thường là:

```bash
http://localhost:5173
```

Build production:

```bash
npm run build
```

Preview bản production:

```bash
npm run preview
```

## Thêm ảnh Minh Tâm

Đặt ảnh tại:

```text
public/images/minh-tam.jpg
```

Nếu chưa có ảnh, website sẽ hiển thị placeholder trong khung ảnh.

## Thêm nhạc nền

Đặt file nhạc nước ngoài du dương, trầm ấm, không bản quyền tại `public/audio/background.mp3`.

Website có thẻ audio `preload="auto"` và `loop`. App sẽ cố gắng phát nhạc khi mở link. Nếu trình duyệt chặn autoplay có âm thanh, nhạc sẽ phát ngay khi người dùng chạm lần đầu để mở thư. Có nút bật/tắt nhạc nhỏ ở góc màn hình.

Gợi ý nguồn nhạc:

- Pixabay Music
- YouTube Audio Library
- Free Music Archive

Từ khóa:

- `warm romantic piano instrumental`
- `soft romantic birthday background`
- `cinematic piano love no copyright`

## Sửa nội dung thiệp

Toàn bộ nội dung chính nằm trong:

```text
src/config/invitation.ts
```

Thông tin hiện tại:

- Sinh nhật: Huỳnh Thị Minh Tâm
- Ngày: 17/06/2026
- Giờ: 19:00
- Địa điểm: Ốc Đêm Chú Kiệt
- Ảnh: `public/images/minh-tam.jpg`
- Nhạc: `public/audio/background.mp3`

## Deploy Vercel

Project dùng React + Vite + TypeScript.

Vercel config nằm trong `vercel.json`:

```json
{
  "framework": "vite",
  "installCommand": "npm install",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

Script build trong `package.json` phải giữ là:

```json
"build": "vite build"
```
