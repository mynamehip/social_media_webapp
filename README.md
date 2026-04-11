# SocialMediaApp

SocialMediaApp lÃ  á»©ng dá»¥ng máº¡ng xÃ£ há»™i fullstack gá»“m frontend React vÃ  backend ASP.NET Core Web API. Há»‡ thá»‘ng há»— trá»£ xÃ¡c thá»±c ngÆ°á»i dÃ¹ng, quáº£n lÃ½ há»“ sÆ¡, bÃ i viáº¿t, theo dÃµi ngÆ°á»i dÃ¹ng, chat realtime vÃ  watch room Ä‘á»“ng bá»™ video.

## TÃ­nh nÄƒng chÃ­nh

- ÄÄƒng kÃ½ vÃ  Ä‘Äƒng nháº­p báº±ng JWT
- Xem vÃ  cáº­p nháº­t há»“ sÆ¡ ngÆ°á»i dÃ¹ng
- Äá»•i avatar vÃ  áº£nh bÃ¬a
- Táº¡o, hiá»ƒn thá»‹ vÃ  xÃ³a bÃ i viáº¿t
- BÃ¬nh luáº­n bÃ i viáº¿t vÃ  xem danh sÃ¡ch bÃ¬nh luáº­n
- Upvote vÃ  downvote bÃ i viáº¿t
- Theo dÃµi vÃ  bá» theo dÃµi ngÆ°á»i dÃ¹ng
- TÃ¬m kiáº¿m ngÆ°á»i dÃ¹ng theo tÃªn
- Chat cÃ¡ nhÃ¢n realtime báº±ng SignalR
- Watch room realtime: táº¡o phÃ²ng, tham gia phÃ²ng, chat phÃ²ng, Ä‘á»“ng bá»™ video

## CÃ´ng nghá»‡ sá»­ dá»¥ng

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

## Cáº¥u trÃºc dá»± Ã¡n

```text
SocialMediaApp/
|- social_media_app/        # Frontend React
|- social_media_be/         # Backend ASP.NET Core
|- ARCHITECTURE.md          # TÃ i liá»‡u kiáº¿n trÃºc vÃ  chá»©c nÄƒng chi tiáº¿t
|- README.md
```

## YÃªu cáº§u mÃ´i trÆ°á»ng

- Node.js 18+
- npm 9+
- .NET SDK 10.0
- SQL Server hoáº·c SQL Server Express

## CÃ i Ä‘áº·t

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

## Cáº¥u hÃ¬nh

### Frontend

CÃ³ thá»ƒ cáº¥u hÃ¬nh API qua biáº¿n mÃ´i trÆ°á»ng:

```env
REACT_APP_API_URL=https://localhost:7293
```

Náº¿u khÃ´ng cÃ³ biáº¿n mÃ´i trÆ°á»ng, frontend sáº½ dÃ¹ng:

- Development: `https://localhost:7293`
- Production: `https://scmwaAPI.somee.com`

### Backend

CÃ¡c file cáº¥u hÃ¬nh chÃ­nh:

- `social_media_be/social_media_be/appsettings.json`
- `social_media_be/social_media_be/appsettings.Development.json`

CÃ¡c key quan trá»ng:

- `ConnectionStrings:SocialMediaDb`
- `Jwt:ValidAudience`
- `Jwt:ValidIssuer`
- `Jwt:Secret`

## Cháº¡y dá»± Ã¡n

### Cháº¡y backend

```bash
cd social_media_be/social_media_be
dotnet run
```

### Cháº¡y frontend

```bash
cd social_media_app
npm start
```

## API vÃ  Realtime

### REST API

- `api/Auth`
- `api/User`
- `api/Post`
- `api/Search`
- `api/Message`

### SignalR Hub

- `/Chat`
- `/Watch`

## TÃ i liá»‡u chi tiáº¿t

PhÃ¢n tÃ­ch chi tiáº¿t toÃ n bá»™ dá»± Ã¡n náº±m trong file `ARCHITECTURE.md`.

## Scripts há»¯u Ã­ch

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

## LÆ°u Ã½

- Dá»± Ã¡n hiá»‡n cÃ²n má»™t sá»‘ pháº§n á»Ÿ má»©c prototype hoáº·c placeholder.
- Má»™t sá»‘ cáº¥u hÃ¬nh nháº¡y cáº£m Ä‘ang náº±m trá»±c tiáº¿p trong mÃ£ nguá»“n vÃ  nÃªn Ä‘Æ°á»£c Ä‘Æ°a sang biáº¿n mÃ´i trÆ°á»ng hoáº·c secret manager khi triá»ƒn khai thá»±c táº¿.

## License

ChÆ°a khai bÃ¡o.
