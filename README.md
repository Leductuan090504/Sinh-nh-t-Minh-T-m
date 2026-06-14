# Thiệp mời sinh nhật Minh Tâm

Website thiệp mời sinh nhật cho Huỳnh Thị Minh Tâm, thiết kế như trải nghiệm mở một lá thư/tin nhắn trên điện thoại: cinematic, lãng mạn, có nhạc nền, countdown, bản đồ và file lịch `.ics`.

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

Nếu chưa có ảnh, website sẽ hiển thị placeholder: `Đặt ảnh tại public/images/minh-tam.jpg`.

Nếu muốn đổi tên file ảnh, sửa trường `imagePath` trong:

```text
src/config/invitation.ts
```

## Thêm nhạc nền

Website phát file:

```text
public/audio/background.mp3
```

Bạn hãy đặt một bài nhạc nước ngoài du dương, trầm ấm, không bản quyền vào `public/audio/background.mp3`.

Nhạc chỉ phát sau khi người dùng bấm/chạm để mở thiệp, vì trình duyệt thường chặn autoplay. Có nút bật/tắt nhạc ở góc màn hình.

Gợi ý nguồn nhạc không bản quyền:

- Pixabay Music
- YouTube Audio Library
- Free Music Archive

Từ khóa nên tìm:

- `warm romantic piano instrumental`
- `soft birthday background music`
- `cinematic romantic piano no copyright`

## Sửa nội dung thiệp

Toàn bộ nội dung chính nằm trong:

```text
src/config/invitation.ts
```

Các thông tin hiện tại:

- Sinh nhật: Huỳnh Thị Minh Tâm
- Ngày: 17/06/2026
- Giờ: 19:00
- Địa điểm: Ốc Đêm Chú Kiệt
- Ảnh: `public/images/minh-tam.jpg`
- Nhạc: `public/audio/background.mp3`

## Deploy Vercel

Project dùng React + Vite + TypeScript.

Vercel config đã đặt trong `vercel.json`:

```json
{
  "framework": "vite",
  "installCommand": "npm install",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

Script build trong `package.json` giữ là:

```json
"build": "vite build"
```

Khi push lên GitHub branch `main`, Vercel có thể tự build và deploy.
