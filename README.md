# Thiệp mời sinh nhật Minh Tâm

Website thiệp mời sinh nhật cho Huỳnh Thị Minh Tâm, thiết kế theo phong cách luxury romantic birthday invitation: intro cinematic, phong thư mở bất ngờ, hiệu ứng confetti/trái tim và thiệp chính dạng landing page hiện đại.

## Cách chạy project

Yêu cầu máy đã cài Node.js.

```bash
npm install
npm run dev
```

Sau đó mở địa chỉ Vite hiển thị trong terminal, thường là:

```bash
http://localhost:5173
```

Build bản production:

```bash
npm run build
```

Xem thử bản production sau khi build:

```bash
npm run preview
```

## Thêm ảnh Minh Tâm

Đặt ảnh vào thư mục:

```text
public/images/
```

Tên file nên đặt chính xác là:

```text
minh-tam.jpg
```

Đường dẫn đầy đủ:

```text
public/images/minh-tam.jpg
```

Nếu chưa có ảnh, website vẫn chạy bình thường và hiển thị placeholder đẹp với khung ảnh luxury.

## Thay ảnh

Cách đơn giản nhất: thay file `public/images/minh-tam.jpg` bằng ảnh mới cùng tên.

Nếu muốn dùng tên file khác, sửa trong:

```text
src/config/invitation.ts
```

Dòng cần sửa:

```ts
imagePath: '/images/minh-tam.jpg',
```

Ví dụ:

```ts
imagePath: '/images/anh-moi.jpg',
```

## Thay lời chúc, thời gian, địa điểm

Toàn bộ nội dung chính nằm trong file:

```text
src/config/invitation.ts
```

Bạn có thể sửa các trường:

```ts
title: 'Thiệp mời sinh nhật Minh Tâm',
birthdayName: 'Huỳnh Thị Minh Tâm',
date: '2026-06-17',
displayDate: '17/06/2026',
time: '19:00',
locationName: 'Ốc Đêm Chú Kiệt',
mapsUrl: '...',
message: '...',
imagePath: '/images/minh-tam.jpg',
```

Lưu ý:

- `date` dùng định dạng `YYYY-MM-DD` để countdown và Google Calendar chạy đúng.
- `displayDate` là ngày hiển thị trên giao diện.
- `time` dùng định dạng 24 giờ, ví dụ `19:00`.
- `mapsUrl` là link Google Maps mở khi bấm vào địa điểm hoặc nút "Xem địa điểm".

## Cấu trúc chính

```text
src/
  components/
    OpeningSurprise.tsx
    BirthdayCard.tsx
    Countdown.tsx
    FloatingDecorations.tsx
    ConfettiEffect.tsx
    SaveCalendarButton.tsx
  config/
    invitation.ts
  styles/
    index.css
public/
  images/
    minh-tam.jpg
```

## Ghi chú thiết kế

- Intro dùng phong thư luxury tạo bằng CSS, có ánh sáng quét, sparkle và heart floating.
- Thiệp chính có gradient mesh, bokeh, glassmorphism, khung ảnh viền ánh kim và countdown dạng glass pill.
- Nút "Lưu lịch" mở Google Calendar với sẵn tên sự kiện, thời gian và địa điểm.
- Font chính dùng Google Fonts: Cormorant Garamond cho tiêu đề và Be Vietnam Pro cho nội dung.
