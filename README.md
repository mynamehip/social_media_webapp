# SocialMediaApp

SocialMediaApp là ứng dụng mạng xã hội fullstack gồm frontend React và backend ASP.NET Core Web API. Hệ thống hỗ trợ xác thực người dùng, quản lý hồ sơ, bài viết, theo dõi người dùng, chat realtime và watch room đồng bộ video.

## Tính năng chính

- Đăng ký và đăng nhập bằng JWT
- Xem và cập nhật hồ sơ người dùng
- Đổi avatar và ảnh bìa
- Tạo, hiển thị và xóa bài viết
- Bình luận bài viết và xem danh sách bình luận
- Upvote và downvote bài viết
- Theo dõi và bỏ theo dõi người dùng
- Tìm kiếm người dùng theo tên
- Chat cá nhân realtime bằng SignalR
- Watch room realtime: tạo phòng, tham gia phòng, chat phòng, đồng bộ video

## Công nghệ sử dụng

### Frontend

- React 18
- React Router DOM
- Redux + Redux Thunk
- Axios
- TailwindCSS
- React Toastify
- Microsoft SignalR client
- React Player

### Backend

- ASP.NET Core Web API
- Entity Framework Core
- ASP.NET Identity
- JWT Bearer Authentication
- SignalR
- AutoMapper
- SQL Server

## Cấu trúc dự án

```text
SocialMediaApp/
|- social_media_app/        # Frontend React
|- social_media_be/         # Backend ASP.NET Core
|- ARCHITECTURE.md          # Tài liệu kiến trúc và chức năng chi tiết
|- README.md
```

## Yêu cầu môi trường

- Node.js 18+
- npm 9+
- .NET SDK 10.0
- SQL Server hoặc SQL Server Express

## Cài đặt

### Frontend

```bash
cd social_media_app
npm install
```

### Backend

```bash
cd social_media_be/social_media_be
dotnet restore
```

## Cấu hình

### Frontend

Có thể cấu hình API qua biến môi trường:

```env
REACT_APP_API_URL=https://localhost:7293
```

Nếu không có biến môi trường, frontend sẽ dùng:

- Development: `https://localhost:7293`
- Production: `https://scmwaAPI.somee.com`

### Backend

Các file cấu hình chính:

- `social_media_be/social_media_be/appsettings.json`
- `social_media_be/social_media_be/appsettings.Development.json`

Các key quan trọng:

- `ConnectionStrings:SocialMediaDb`
- `Jwt:ValidAudience`
- `Jwt:ValidIssuer`
- `Jwt:Secret`

## Chạy dự án

### Chạy backend

```bash
cd social_media_be/social_media_be
dotnet run
```

### Chạy frontend

```bash
cd social_media_app
npm start
```

## API và Realtime

### REST API

- `api/Auth`
- `api/User`
- `api/Post`
- `api/Search`
- `api/Message`

### SignalR Hub

- `/Chat`
- `/Watch`

## Tài liệu chi tiết

Phân tích chi tiết toàn bộ dự án nằm trong file `ARCHITECTURE.md`.

## Scripts hữu ích

### Frontend

```bash
npm start
npm test
npm run build
```

### Backend

```bash
dotnet restore
dotnet build
dotnet run
```

## Lưu ý

- Dự án hiện còn một số phần ở mức prototype hoặc placeholder.
- Một số cấu hình nhạy cảm đang nằm trực tiếp trong mã nguồn và nên được đưa sang biến môi trường hoặc secret manager khi triển khai thực tế.

## License

Chưa khai báo.
