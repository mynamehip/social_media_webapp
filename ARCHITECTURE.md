# ARCHITECTURE

## 1. Tổng quan dự án

Dự án gồm 2 phần:

- Frontend: `social_media_app` dùng React, Redux, React Router, Axios, TailwindCSS, SignalR client.
- Backend: `social_media_be/social_media_be` dùng ASP.NET Core Web API, Entity Framework Core, ASP.NET Identity, JWT, SignalR.

Các nhóm chức năng chính:

- Xác thực: đăng ký, đăng nhập, đăng xuất.
- Mạng xã hội: hồ sơ cá nhân, đổi ảnh hồ sơ, tạo bài viết, xóa bài viết, vote bài viết, theo dõi người dùng, tìm kiếm người dùng.
- Chat realtime: chat 1-1, lịch sử chat, tin nhắn chưa đọc.
- Watch room realtime: tạo phòng, tham gia phòng, chat phòng, đồng bộ video.

## 2. Kiến trúc thư mục

```text
SocialMediaApp/
|- social_media_app/
|  |- src/
|  |  |- actions/        # Tầng gọi nghiệp vụ frontend
|  |  |- api/            # Axios request tới backend
|  |  |- components/     # Base/UI/Form component
|  |  |- layouts/        # Layout và màn hình chính
|  |  |- reducer/        # Redux reducers
|  |  |- store/          # Redux store
|  |  |- utils/          # Hàm tiện ích
|
|- social_media_be/
|  |- social_media_be/
|  |  |- Controllers/    # REST API controllers
|  |  |- Entities/       # Entity EF Core
|  |  |- Models/         # DTO / request model / response model
|  |  |- Repositories/   # Nghiệp vụ thao tác dữ liệu
|  |  |- Hubs/           # SignalR hubs
|  |  |- Helper/         # Mapping, enum, role
|  |  |- Program.cs      # Bootstrap backend
```

## 3. Kiến trúc tổng thể

### Frontend

- `src/index.js` khởi tạo ứng dụng.
- `Provider` bọc Redux store.
- `SignalRProvider` bọc context chat.
- `BrowserRouter` quản lý route.
- `src/App.js` định nghĩa route và layout.

### Backend

- `Program.cs` cấu hình dịch vụ, DI, JWT, CORS, Swagger, DbContext, SignalR.
- `Controllers` nhận request HTTP.
- `Repositories` xử lý logic nghiệp vụ.
- `Entities` ánh xạ database.
- `Models` dùng cho input/output.
- `Hubs` xử lý realtime.

### Realtime

- Hub chat: `/Chat`
- Hub watch: `/Watch`

## 4. Danh sách model, entity, enum, context backend

### `Entities/User.cs`

#### `class User : IdentityUser`

Thuộc tính:

- `avatar`
- `coverImage`
- `connectionId`
- `created_at`
- `Posts`
- `Comments`
- `Votes`
- `Followers`
- `Followings`

#### `class Follow`

Thuộc tính:

- `FollowerId`
- `Follower`
- `FollowingId`
- `Following`
- `FollowedAt`

### `Entities/Post.cs`

#### `class Post`

Thuộc tính:

- `PostId`
- `Content`
- `Image`
- `CreatedAt`
- `UserId`
- `User`
- `Comments`
- `Votes`

#### `class Comment`

Thuộc tính:

- `CommentId`
- `Content`
- `CreatedAt`
- `PostId`
- `Post`
- `UserId`
- `User`

#### `class Vote`

Thuộc tính:

- `VoteId`
- `Value`
- `PostId`
- `Post`
- `UserId`
- `User`

### `Entities/Message.cs`

#### `class Message`

Thuộc tính:

- `Id`
- `SenderId`
- `ReceiverId`
- `MessageText`
- `Timestamp`
- `isReaded`

### `Entities/AppDbContext.cs`

DbSet:

- `Posts`
- `Comments`
- `Votes`
- `Follows`
- `Messages`

Quan hệ chính:

- User 1-n Post
- User 1-n Comment
- Post 1-n Comment
- Post 1-n Vote
- Follow dùng composite key `{FollowerId, FollowingId}`

### Models backend

#### Auth

- `SignInModel`
  - `Email`
  - `Password`
- `SignUpModel`
  - `UserName`
  - `Email`
  - `Password`

#### User

- `UserModel`
  - `Id`
  - `UserName`
  - `Email`
  - `Avatar`
  - `Cover`
- `UserImage`
  - `userId`
  - `type`
  - `image`
  - `oldImage`
- `UserInfo`
  - class rỗng, chưa dùng

#### Post

- `PostModel`
  - `PostId`
  - `Content`
  - `CreatedAt`
  - `UserId`
  - `UserName`
  - `avatar`
  - `Image`
  - `imagePath`
- `CommentModel`
  - `CommentId`
  - `Content`
  - `CreatedAt`
  - `PostId`
  - `Post`
  - `UserId`
  - `User`
- `VoteModel`
  - `Value`
  - `PostId`
  - `UserId`

#### Chat

- `UserConnection`
  - `userName`
  - `chatRoom`

### Helper

- `Mapper.cs`
  - map `User <-> UserModel`
  - map `Post <-> PostModel`
  - map `Comment <-> CommentModel`
  - map `Vote <-> VoteModel`
- `Enum.cs`
  - `Voted.Up = 1`
  - `Voted.Down = -1`
  - `Voted.None = 0`
- `AppRoles.cs`
  - `Admin`
  - `User`
## 5. Danh sách controller, repository, route, API, hub

### Backend repositories

#### `IAccountRepository` / `AccountRepository`

Biến thành viên:

- `userManager`
- `signInManager`
- `configuration`
- `roleManager`
- `_clientFactory`
- `ZeroBounceApiKey`

Hàm:

- `SignUpAsync(SignUpModel model)`
- `SignInAsync(SignInModel model)`
- `CreateToken(User user, List<Claim> authClaims)`
- `CheckEmailExist(string email)`

#### `IUserRepository` / `UserRepository`

Biến thành viên:

- `userManager`
- `signInManager`
- `roleManager`
- `mapper`
- `_context`

Hàm:

- `ChangeUserImage(string userId, string type, string imagePath)`
- `GetByEmailAsync(string email)`
- `GetByIdAsync(string id)`
- `GetNewUsersAsync(int count)`
- `GetFollowersAsync(string id)`
- `GetFollowingAsync(string id)`
- `FollowUserAsync(string followerId, string followingId)`
- `UnfollowUserAsync(string followerId, string followingId)`

#### `IPostRepository` / `PostRepository`

Biến thành viên:

- `_context`
- `_mapper`
- `_userRepo`

Hàm:

- `AddPostAsync(PostModel model)`
- `GetAllPostsAsync(int pageNumber, int pageSize)`
- `GetPostByIdAsync(string id)`
- `GetPostByUserAsync(string userId, int pageNumber, int pageSize)`
- `DeletePostAsync(string postId)`
- `VotePostAsync(VoteModel model)`
- `UpdateVotePostAsync(VoteModel model)`
- `DeleteVotePostAsync(string userId, string postId)`
- `GetAllVoteAsync(string postId)`
- `GetVoteByIdAsync(string userId, string postId)`

### Controllers và route

#### `AuthController`

Base route: `api/Auth`

Hàm:

- `POST /api/Auth/SignUp`
- `POST /api/Auth/SignIn`

#### `UserController`

Base route: `api/User`

Hàm:

- `GET /api/User/GetUser?userId=...`
- `PUT /api/User/ChangeUserImage`
- `GET /api/User/GetNewUsers?count=...`
- `GET /api/User/GetAllFollower?userId=...`
- `GET /api/User/GetAllFollowing?userId=...`
- `POST /api/User/FollowUser?followerId=...&followingId=...`
- `DELETE /api/User/UnfollowUser?followerId=...&followingId=...`
- `GET /api/User/GetUserActivities?userId=...`

#### `PostController`

Base route: `api/Post`

Hàm:

- `POST /api/Post/CreatePost`
- `GET /api/Post/GetAllPost?pageNumber=...&pageSize=...`
- `GET /api/Post/GetPostByUser?userId=...&pageNumber=...&pageSize=...`
- `DELETE /api/Post/DeletePost?postId=...`
- `POST /api/Post/VotePost`
- `PUT /api/Post/UpdateVote`
- `DELETE /api/Post/DeleteVote?userId=...&postId=...`
- `GET /api/Post/GetAllVote?postId=...`
- `GET /api/Post/GetVoteById?userId=...&postId=...`

#### `MessageController`

Base route: `api/Message`

Hàm:

- `GET /api/Message/GetMessage?userId=...&friendId=...`
- `GET /api/Message/UnReadMessage?userId=...`
- `GET /api/Message/ChatHistory?userId=...`

#### `SearchController`

Base route: `api/Search`

Hàm:

- `GET /api/Search/SearchUser?userName=...`

### SignalR Hubs

#### `ChatHub`

Hàm:

- `SendMessage(string senderId, string receiverId, string messageText)`
- `ReadedMessage(string senderId, string receiverId)`
- `OnConnectedAsync()`
- `OnDisconnectedAsync(Exception? exception)`

Event gửi xuống frontend:

- `ReceiveMessage`

#### `WatchHub`

Class lồng nhau:

- `VideoInfo`
- `UserInfo`
- `RoomInfo`

Biến tĩnh:

- `ConcurrentDictionary<string, RoomInfo> connection`

Hàm:

- `OnConnectedAsync()`
- `CreateRoom(...)`
- `JoinWatchRoom(...)`
- `LeaveWatchRoom(...)`
- `KickUser(...)`
- `SendRoomMessage(...)`
- `SendVideoState(...)`
- `SendURL(...)`
- `PlayVideo(...)`
- `SeekVideo(...)`
- `OnDisconnectedAsync(...)`

Event gửi xuống frontend:

- `ReceiveRoomList`
- `ReceiveRoomMessage`
- `ReceiveRoomUser`
- `ReceiveRoomVideo`
- `ReceiveVideoURL`
- `ReceiveVideoPlay`
- `ReceiveVideoSeek`
- `ReceiveKickMessage`

## 6. Danh sách route, màn hình, component frontend

### Route trong `App.js`

- `/sign-in` -> `SignInForm`
- `/sign-up` -> `SignUpForm`
- `/` -> `Home`
- `/profile/:userId` -> `Profile`
- `/chat` -> `Chat`
- `/watch` -> `Watch`
- `/watch/:roomName` -> `Room`

### Layout / màn hình

- `Auth`
- `Home`
- `Profile`
- `Chat`
- `Watch`

### Base components

- `Button`
- `Input`
- `Avatar`
- `SearchBar`

### Form components

- `SignInForm`
- `SignUpForm`

### User/Profile/Option components

- `TopList`
- `ListUserBox`
- `FriendList`
- `ProfileBox`
- `ChangeImageBox`
- `UserInforBox`
- `NavBar`
- `SettingBar`
- `MiniSideMenu`
- `ConfrimDialog`

### Post components

- `NewPostBox`
- `CreatePostBox`
- `PostBox`
- `VoteBox`

### Chat components

- `ChatContext`
- `ChatBox`
- `ChatHistories`
- `FollowingList`
- `MiniChatMenu`

### Watch components

- `WatchContext`
- `Index`
- `ListRoom`
- `JoinRoomDialog`
- `CreateRoomDialog`
- `Room`
- `UserList`
- `VideoBox`
- `watch/ChatBox`
- `WatchOption`
## 7. Danh sách state, biến và hàm quan trọng ở frontend

### Auth

#### `SignInForm`

Biến/state:

- `navigate`
- `dispatch`
- `loading`
- `formData = { email, password }`
- `formError = { email, password }`
- `errorList`

Hàm:

- `switchForm`
- `handleInputChange`
- `handleValidate`
- `checkError`
- `handleSubmit`

#### `SignUpForm`

Biến/state:

- `navigate`
- `dispatch`
- `loading`
- `formData = { username, email, password }`
- `formError = { username, email, password }`
- `errorList`

Hàm:

- `switchForm`
- `handleInputChange`
- `handleValidate`
- `checkError`
- `handleSubmit`

### Home/Profile/Post

#### `Home`

Biến/state:

- `user`
- `openSideMenu`
- `UserContext`

#### `Profile`

Biến/state:

- `userContext`
- `mainUser`
- `scrollDiv`
- `user`
- `isChangeImage`
- `isCreatePost`
- `type`
- `userActivities = { follower, following, postNumber }`

Hàm:

- `handleOpenForm`
- `loadUser`
- `loadUserActivities`

#### `TopList`

Biến/state:

- `newUsers`
- `numberUser`
- `loadAble`
- `loadRef`
- `user`

Hàm:

- `load`
- `handleLoad`

#### `ListUserBox`

Biến/state:

- `navigate`
- `user`
- `following`
- `dispatch`

Hàm:

- `handleUserClick`
- `isFollowing`
- `handleFollow`

#### `ProfileBox`

Biến/state:

- `user`
- `userActivities`
- `isOpenNewPost`

Hàm:

- `loadUserActivities`
- `handleClick`
- `handleOpenNewPost`

#### `ChangeImageBox`

Biến/state:

- `descRef`
- `imageRef`
- `textRow`
- `image`
- `isCreatePost`
- `user`
- `dispatch`

Hàm:

- `onUploadImage`
- `onRemoveImage`
- `handleSubmit`

#### `NewPostBox`

Biến/state:

- `scroll`
- `posts`
- `pageNumber`
- `isLoading`
- `loadAble`

Hàm:

- `load(pageNumber)`
- `reload()`

#### `CreatePostBox`

Biến/state:

- `descRef`
- `imageRef`
- `image`
- `isLoading`
- `user`

Hàm:

- `onUploadImage`
- `onRemoveImage`
- `handleSubmit`

#### `PostBox`

Biến/state:

- `user`
- `isOpenDialog`

Hàm:

- `handleContent`
- `handleOpenDialog`
- `handleDeletePost`

#### `VoteBox`

Biến/state:

- `voteValue`
- `votedNumber = { up, down }`
- `user`

Hàm:

- `getVote`
- `handleVoteAction`
- `handleVote`
- `updateVotedNumber`

### Chat

#### `ChatContext`

Biến/state:

- `user`
- `connection`
- `hasNewMessages`
- `messages`
- `unread`
- `chats`

Hàm:

- `useChatContext`
- `connect`
- `changeUnreadList`
- `changeChatList`

#### `Chat`

Biến/state:

- `friend`
- `navigate`
- `user`
- `setHasNewMessages`
- `connection`
- `setUnread`
- `setChats`

Hàm:

- `handleReturn`
- `handleClickUser`

#### `chat/ChatBox`

Biến/state:

- `newMessage`
- `inputRef`
- `messagesEndRef`
- `messages`
- `setMessages`
- `connection`

Hàm:

- `scrollToBottom`
- `changeMessageList`
- `sendMessage`

#### `ChatHistories`

Biến:

- `unread`
- `chats`

#### `FollowingList`

Biến:

- `following`

#### `MiniChatMenu`

Biến/state:

- `smallChat`
- `smallFollowing`

### Watch

#### `WatchContext`

Biến/state:

- `user`
- `connection`
- `roomName`
- `roomList`
- `roomMessages`
- `userList`
- `admin`
- `videoURL`
- `videoPlaying`
- `videocurrenntTime`

Hàm:

- `useWatchContext`
- `setVideo(url, playing, currentTime)`
- `connect`

#### `watch/Index`

Biến/state:

- `openCreateRoom`
- `openJoinRoom`
- `joinRoomName`
- `connection`
- `roomName`
- `setRoomName`
- `setVideo`
- `roomList`

Hàm:

- `leaveAnyRoom`
#### `CreateRoomDialog`

Biến/state:

- `roomInfo = { roomName, password, userConnection, userName, avatar, roomType }`
- `connection`
- `setRoomMessages`
- `setRoomName`
- `user`

Hàm:

- `handleCreateRoom`

#### `JoinRoomDialog`

Biến/state:

- `roomInfo = { roomName, password, userConnection, userName, avatar }`
- `connection`
- `setRoomMessages`
- `setRoomName`
- `user`

Hàm:

- `handleJoinRoom`
- `handleClose`

#### `Room`

Biến/state:

- `roomMessages`
- `connection`
- `roomName`
- `setRoomName`
- `userList`
- `admin`
- `setVideo`
- `navigate`

Hàm:

- `handleLeave`
- `leaveAnyRoom`
- `handleKickUser`

#### `VideoBox`

Biến/state:

- `inputRef`
- `videoRef`
- `oldTime`
- `oldUserList`
- `trigger`
- `connection`
- `roomName`
- `userList`
- `admin`
- `videoURL`
- `videoPlaying`
- `videocurrenntTime`
- `setVideoPlaying`

Hàm:

- `normalizeVideoUrl`
- `handleChangeVideo`
- `handlePlay`
- `handlePause`
- `handleSeek`
- `sendVideoState`

#### `watch/ChatBox`

Biến/state:

- `newMessage`
- `inputRef`
- `messagesEndRef`
- `user`

Hàm:

- `scrollToBottom`
- `sendMessage`

## 8. Danh sách chức năng theo màn hình và luồng xử lý chi tiết

### 8.1 Chức năng đăng nhập

Màn hình:

- `/sign-in`
- Component chính: `SignInForm`

Biến sử dụng:

- `formData.email`
- `formData.password`
- `formError.email`
- `formError.password`
- `loading`
- `navigate`
- `dispatch`

Hàm frontend sử dụng:

- `handleInputChange`
- `handleValidate`
- `checkError`
- `handleSubmit`
- `authAction.signIn`
- `api/authRequest.signIn`

Hàm backend sử dụng:

- `AuthController.SignIn`
- `AccountRepository.SignInAsync`
- `AccountRepository.CreateToken`
- `UserRepository.GetByEmailAsync`

Luồng xử lý:

1. Người dùng nhập email và password vào `Input`.
2. `handleInputChange` cập nhật `formData`.
3. Khi blur khỏi input, `handleValidate` kiểm tra regex và ghi lỗi vào `formError`.
4. Khi bấm submit, `handleSubmit` kiểm tra dữ liệu rỗng và `checkError(formError)`.
5. Nếu hợp lệ, dispatch `signIn(formData, navigate)`.
6. Action gọi `AuthAPI.signIn(formData)`.
7. Axios gửi `POST /api/Auth/SignIn`.
8. `AuthController.SignIn` nhận model.
9. Controller gọi `AccountRepository.SignInAsync(model)`.
10. Repository tìm user theo email, kiểm tra password, lấy role, tạo JWT bằng `CreateToken`.
11. Controller lấy thêm user bằng `userRepo.GetByEmailAsync(model.Email)`.
12. Backend trả `{ result, user }`.
13. Frontend dispatch `AUTH_SUCCESS`, lưu vào Redux và `localStorage.userData`.
14. `navigate('/')` điều hướng về trang chủ.

### 8.2 Chức năng đăng ký

Màn hình:

- `/sign-up`
- Component chính: `SignUpForm`

Biến sử dụng:

- `formData.username`
- `formData.email`
- `formData.password`
- `formError.username`
- `formError.email`
- `formError.password`
- `loading`

Hàm frontend sử dụng:

- `handleInputChange`
- `handleValidate`
- `checkError`
- `handleSubmit`
- `authAction.signUp`
- `api/authRequest.signUp`

Hàm backend sử dụng:

- `AuthController.SignUp`
- `AccountRepository.SignUpAsync`
- `AccountRepository.CheckEmailExist`
- `AccountRepository.CreateToken`
- `UserRepository.GetByEmailAsync`

Luồng xử lý:

1. Người dùng nhập username, email, password.
2. `handleInputChange` cập nhật `formData`.
3. `handleValidate` kiểm tra regex từng trường.
4. `handleSubmit` kiểm tra dữ liệu bắt buộc và lỗi validation.
5. Dispatch `signUp(formData, navigate)`.
6. Action gọi `POST /api/Auth/SignUp`.
7. `AuthController.SignUp` gọi `AccountRepository.SignUpAsync`.
8. Repository kiểm tra email đã tồn tại chưa.
9. Repository gọi `CheckEmailExist(email)` qua ZeroBounce.
10. Nếu hợp lệ thì tạo user Identity, tạo role `User` nếu chưa có, gán role, tạo JWT.
11. Controller lấy user vừa tạo bằng email.
12. Trả về `{ result, user }`.
13. Frontend dispatch `AUTH_SUCCESS` và điều hướng về `/`.
### 8.3 Chức năng tìm kiếm người dùng

Màn hình:

- `/`
- Component chính: `SearchBar`

Biến sử dụng:

- `userName`
- `userList`

Hàm frontend sử dụng:

- `setUserName`
- `handleSearch`
- `searchAction.searchUser`
- `searchRequest.searchUser`
- `setUserList`

Hàm backend sử dụng:

- `SearchController.SearchUserByName`

Luồng xử lý:

1. Người dùng nhập từ khóa vào input tìm kiếm.
2. `setUserName` cập nhật state `userName`.
3. Khi bấm icon search, `handleSearch` chạy.
4. Nếu `userName` rỗng, hiển thị toast lỗi.
5. Nếu có dữ liệu, gọi `searchUser(userName)`.
6. Axios gửi `GET /api/Search/SearchUser?userName=...`.
7. `SearchController` truy vấn `UserManager.Users.Where(p => p.UserName.Contains(userName))`.
8. Nếu có kết quả, backend map sang `UserModel` rồi trả về.
9. Frontend `setUserList(res.data)`.
10. `ListUserBox` render danh sách user tìm được.

### 8.4 Chức năng xem danh sách user mới

Màn hình:

- `/`
- Component chính: `TopList`

Biến sử dụng:

- `newUsers`
- `numberUser`
- `loadAble`
- `loadRef`
- `user`

Hàm frontend sử dụng:

- `load`
- `handleLoad`
- `userAction.getNewUsers`
- `userRequest.getNewUsers`
- `setNewUsers`
- `setNumberUser`
- `setLoadAble`

Hàm backend sử dụng:

- `UserController.GetNewUsers`
- `UserRepository.GetNewUsersAsync`

Luồng xử lý:

1. `TopList` mount hoặc `numberUser` đổi.
2. `load` gọi `getNewUsers(numberUser)`.
3. Frontend gửi `GET /api/User/GetNewUsers?count=...`.
4. Backend lấy user mới nhất theo `created_at`.
5. Frontend lọc bỏ user hiện tại `item.id !== user?.id`.
6. `setNewUsers` cập nhật danh sách.
7. Nếu backend trả ít hơn số đang yêu cầu, `setLoadAble(false)`.
8. Khi bấm `Show more people`, `handleLoad` tăng `numberUser` thêm 5.

### 8.5 Chức năng follow / unfollow người dùng

Màn hình:

- `/`
- component dùng chung: `ListUserBox`, `FriendList`, `FollowingList`

Biến sử dụng:

- `user`
- `following`
- `dispatch`

Hàm frontend sử dụng:

- `getAllFollowing`
- `followUser`
- `unfollowUser`
- `isFollowing`
- `handleFollow`
- reducer actions: `SET_FOLLOWING`, `ADD_FOLLOWING`, `REMOVE_FOLLOWING`

Hàm backend sử dụng:

- `UserController.GetFollowing`
- `UserController.FollowUser`
- `UserController.Unfollow`
- `UserRepository.GetFollowingAsync`
- `UserRepository.FollowUserAsync`
- `UserRepository.UnfollowUserAsync`

Luồng xử lý:

1. `ListUserBox` mount, nếu user đang đăng nhập thì dispatch `getAllFollowing(user.id)`.
2. Action gọi `GET /api/User/GetAllFollowing?userId=...`.
3. Backend trả danh sách user đang follow.
4. Reducer lưu vào `followingReducer`.
5. `isFollowing(userId)` kiểm tra một user có nằm trong danh sách follow hay không.
6. Khi bấm nút Follow/Unfollow, `handleFollow(item)` chạy.
7. Nếu đang follow thì dispatch `unfollowUser(user.id, item)`.
8. Nếu chưa follow thì dispatch `followUser(user.id, item)`.
9. Action tương ứng gọi `POST /api/User/FollowUser` hoặc `DELETE /api/User/UnfollowUser`.
10. Backend thêm hoặc xóa bản ghi `Follow`.
11. Reducer cập nhật state following để UI đổi nút ngay.

### 8.6 Chức năng xem feed bài viết

Màn hình:

- `/`
- `/profile/:userId`
- Component chính: `NewPostBox`

Biến sử dụng:

- `posts`
- `pageNumber`
- `isLoading`
- `loadAble`
- `scroll`
- prop `userId`

Hàm frontend sử dụng:

- `load(pageNumber)`
- `reload()`
- `postAction.getAllPost`
- `postAction.getPostByUser`
- `postRequest.getAllPost`
- `postRequest.getPostByUser`

Hàm backend sử dụng:

- `PostController.GetAllPost`
- `PostController.GetPostByUser`
- `PostRepository.GetAllPostsAsync`
- `PostRepository.GetPostByUserAsync`

Luồng xử lý:

1. `NewPostBox` mount hoặc `pageNumber` đổi.
2. `load(pageNumber)` kiểm tra `isLoading` để tránh gọi trùng.
3. Nếu không có `userId`, gọi `getAllPost(pageNumber)`.
4. Nếu có `userId`, gọi `getPostByUser(userId, pageNumber)`.
5. Backend join bảng `Posts` với `Users`, sắp xếp `CreatedAt desc`, phân trang.
6. Frontend nối thêm dữ liệu vào `posts` bằng `setPosts((prePosts) => [...prePosts, ...response.data])`.
7. Nếu ít hơn 10 bài, `setLoadAble(false)`.
8. Khi scroll gần cuối, handler tăng `pageNumber` để load tiếp.

### 8.7 Chức năng tạo bài viết

Màn hình:

- `/` qua `ProfileBox`
- `/profile/:userId` qua `CreatePostBox`
- Component chính: `CreatePostBox`

Biến sử dụng:

- `descRef`
- `imageRef`
- `image`
- `isLoading`
- `user`

Hàm frontend sử dụng:

- `onUploadImage`
- `onRemoveImage`
- `handleSubmit`
- `postAction.createPost`
- `postRequest.createPost`
- `props.handleOpenNewPost`
- `props.onCreatePost`

Hàm backend sử dụng:

- `PostController.CreatePost`
- `PostRepository.AddPostAsync`
Luồng xử lý:

1. Người dùng mở popup `CreatePostBox`.
2. Nhập nội dung vào `descRef`.
3. Chọn ảnh qua `imageRef`, `onUploadImage` lưu file vào state `image`.
4. `handleSubmit` tạo `FormData` gồm `userId`, `content`, `createdAt`, `image`.
5. Gọi `createPost(formData)`.
6. Axios gửi `POST /api/Post/CreatePost` với JWT và `multipart/form-data`.
7. Backend `PostController.CreatePost` nhận `PostModel`.
8. `PostRepository.AddPostAsync` sinh `PostId`, lưu file ảnh vào `wwwroot/Images/Post`, map entity và lưu DB.
9. Nếu thành công trả status `201`.
10. Frontend đóng popup, gọi callback reload và hiện toast success.

### 8.8 Chức năng xóa bài viết

Màn hình:

- `/`
- `/profile/:userId`
- Component chính: `PostBox`, `ConfrimDialog`

Biến sử dụng:

- `user`
- `isOpenDialog`
- `post.postId`

Hàm frontend sử dụng:

- `handleOpenDialog`
- `handleDeletePost`
- `postAction.deletePost`
- `postRequest.deletePost`
- `loadMethod`

Hàm backend sử dụng:

- `PostController.DeletePostById`
- `PostRepository.DeletePostAsync`

Luồng xử lý:

1. `PostBox` kiểm tra `user?.id === post.userId` để hiện nút xóa.
2. Khi bấm nút xóa, `handleOpenDialog` mở `ConfrimDialog`.
3. Khi xác nhận, `handleDeletePost` gọi `deletePost(post.postId)`.
4. Frontend gửi `DELETE /api/Post/DeletePost?postId=...` kèm JWT.
5. Backend tìm post theo id.
6. Nếu post có ảnh thì xóa file vật lý trong `wwwroot/Images`.
7. Xóa record post khỏi DB.
8. Frontend đóng dialog, gọi `loadMethod()` để reload feed và hiện toast.

### 8.9 Chức năng vote bài viết

Màn hình:

- `/`
- `/profile/:userId`
- Component chính: `VoteBox`

Biến sử dụng:

- `voteValue`
- `votedNumber.up`
- `votedNumber.down`
- `user`
- `post.postId`

Hàm frontend sử dụng:

- `getVote`
- `handleVoteAction`
- `handleVote`
- `updateVotedNumber`
- `postAction.getAllVote`
- `postAction.getVoteById`
- `postAction.votePost`
- `postAction.updateVote`
- `postAction.deleteVote`

Hàm backend sử dụng:

- `PostController.GetAllVote`
- `PostController.GetVoteById`
- `PostController.VoteThePost`
- `PostController.UpdateVote`
- `PostController.DeletaVote`
- `PostRepository.GetAllVoteAsync`
- `PostRepository.GetVoteByIdAsync`
- `PostRepository.VotePostAsync`
- `PostRepository.UpdateVotePostAsync`
- `PostRepository.DeleteVotePostAsync`

Luồng xử lý:

1. `VoteBox` mount.
2. `getVote()` gọi `getAllVote(post.postId)` để lấy tổng up/down.
3. Nếu user đã đăng nhập, `getVote()` gọi tiếp `getVoteById(user.id, post.postId)` để biết user đã vote gì.
4. Khi người dùng bấm up hoặc down, `handleVote(value)` chạy.
5. Nếu `prevVoteValue === value`, nghĩa là click lại cùng lựa chọn, action là `delete`.
6. Nếu `prevVoteValue === 0`, action là `vote`.
7. Nếu `prevVoteValue` khác 0 và khác value mới, action là `update`.
8. `handleVoteAction` gọi API tương ứng.
9. Backend thêm, sửa hoặc xóa bản ghi `Vote`.
10. UI cập nhật số đếm local bằng `updateVotedNumber`.

### 8.10 Chức năng xem hồ sơ người dùng

Màn hình:

- `/profile/:userId`
- Component chính: `Profile`

Biến sử dụng:

- `userId` từ route
- `mainUser`
- `user`
- `userActivities.follower`
- `userActivities.following`
- `userActivities.postNumber`

Hàm frontend sử dụng:

- `loadUser`
- `loadUserActivities`
- `userAction.getUser`
- `userAction.getUserActivities`

Hàm backend sử dụng:

- `UserController.GetUserById`
- `UserController.GetUserActivities`
- `UserRepository.GetByIdAsync`
- `UserRepository.GetFollowersAsync`
- `UserRepository.GetFollowingAsync`
- `PostRepository.GetPostByUserAsync`

Luồng xử lý:

1. `Profile` lấy `userId` từ URL.
2. Nếu `userId !== mainUser.id` thì gọi `getUser(userId)` để load hồ sơ của người khác.
3. Nếu là user hiện tại thì dùng trực tiếp `mainUser` từ context.
4. Gọi `getUserActivities(userId)` để lấy follower, following, postNumber.
5. Hiển thị cover, avatar, userName và thống kê.
6. `NewPostBox userId={userId}` tải bài viết của user đó.

### 8.11 Chức năng đổi avatar / ảnh bìa

Màn hình:

- `/profile/:userId`
- Component chính: `ChangeImageBox`

Biến sử dụng:

- `type`
- `image`
- `isCreatePost`
- `user.id`
- `user.avatar`
- `user.cover`
- `descRef`

Hàm frontend sử dụng:

- `handleOpenForm`
- `onUploadImage`
- `onRemoveImage`
- `handleSubmit`
- `userAction.changeImage`
- `userRequest.changeImage`
- tùy chọn thêm: `postAction.createPost`

Hàm backend sử dụng:

- `UserController.ChangeUserImage`
- `UserRepository.ChangeUserImage`
Luồng xử lý:

1. Từ `Profile`, user bấm icon bút tại avatar hoặc cover.
2. `handleOpenForm('avatar')` hoặc `handleOpenForm('cover')` mở popup.
3. `ChangeImageBox` cho phép chọn ảnh mới.
4. `onUploadImage` lưu file vào state `image`.
5. `handleSubmit` tạo `FormData` gồm `userId`, `type`, `oldImage`, `image` và tùy chọn `content` nếu `isCreatePost = true`.
6. Nếu `isCreatePost`, frontend gọi thêm `createPost(formData)`.
7. Sau đó dispatch `changeImage(formData)`.
8. Backend `UserController.ChangeUserImage` lưu file mới vào `wwwroot/Images/Profile`.
9. Nếu có `oldImage`, backend xóa file cũ.
10. Repository cập nhật `avatar` hoặc `coverImage` của user.
11. Frontend dispatch `UPDATE_USER` để cập nhật store.

### 8.12 Chức năng đăng xuất

Màn hình:

- `/`
- Component chính: `SettingBar`

Biến sử dụng:

- `user`
- `dispatch`
- `navigate`

Hàm frontend sử dụng:

- `handleLogout`
- `authAction.signOut`

Luồng xử lý:

1. User bấm `Logout` trong `SettingBar`.
2. `handleLogout` dispatch `signOut(navigate)`.
3. Reducer xử lý `SIGN_OUT`, reset `authReducer`, `followingReducer`, `userReducer`.
4. `localStorage.userData` được set về `null`.
5. Điều hướng về `/`.

### 8.13 Chức năng chat 1-1 realtime

Màn hình:

- `/chat`
- Component chính: `Chat`, `ChatContext`, `chat/ChatBox`

Biến sử dụng:

- `friend`
- `connection`
- `messages`
- `unread`
- `chats`
- `hasNewMessages`
- `newMessage`
- `user.id`
- `friend.id`

Hàm frontend sử dụng:

- `ChatContext.connect`
- `changeUnreadList`
- `changeChatList`
- `getUnReaded`
- `getChatHistory`
- `getMessage`
- `handleClickUser`
- `sendMessage`
- `connection.invoke('SendMessage', ...)`
- `connection.invoke('ReadedMessage', ...)`

Hàm backend sử dụng:

- `MessageController.GetUnReadMessage`
- `MessageController.GetChatHistory`
- `MessageController.GetMessages`
- `ChatHub.OnConnectedAsync`
- `ChatHub.SendMessage`
- `ChatHub.ReadedMessage`
- `ChatHub.OnDisconnectedAsync`

Luồng xử lý:

1. Sau khi user đăng nhập, `SignalRProvider` lấy `user` từ Redux.
2. Provider gọi `getUnReaded(user.id)` để lấy danh sách tin chưa đọc.
3. Provider tạo kết nối hub `/Chat?userId=...`.
4. Backend `OnConnectedAsync` gán `connectionId` vào user trong DB.
5. Provider lắng nghe event `ReceiveMessage`.
6. `Chat` mount gọi `getChatHistory(user.id)` để lấy danh sách cuộc trò chuyện.
7. Khi người dùng chọn một bạn bè trong `ChatHistories` hoặc `FollowingList`, `handleClickUser(id)` chạy.
8. Frontend gọi `getUser(id)` để lấy hồ sơ người nhận.
9. Frontend gọi `connection.invoke('ReadedMessage', id, user.id)` để đánh dấu tin đã đọc.
10. `chat/ChatBox` gọi `getMessage(user.id, friend.id)` để tải lịch sử chi tiết.
11. Khi gửi tin, `sendMessage` gọi `connection.invoke('SendMessage', user.id, friend.id, newMessage)`.
12. Backend lưu `Message` vào DB.
13. Nếu người nhận online, hub gửi `ReceiveMessage` tới connection của người nhận.
14. Nếu frontend đang ở trang chat thì `changeChatList` cập nhật danh sách và message.
15. Nếu frontend không ở trang chat thì `hasNewMessages = true`, `unread` được cập nhật để hiện badge đỏ.

### 8.14 Chức năng hiển thị lịch sử chat và unread

Màn hình:

- `/chat`
- component: `ChatHistories`
- component phụ báo badge: `NavBar`

Biến sử dụng:

- `unread`
- `chats`
- `hasNewMessages`

Hàm frontend sử dụng:

- `changeUnreadList`
- `changeChatList`
- `setHasNewMessages`
- `setUnread`
- `setChats`

Luồng xử lý:

1. `ChatContext` duy trì state `unread` và `chats`.
2. `ChatHistories` render danh sách `chats`.
3. Mỗi item kiểm tra `unread.some((e) => e.senderId === item.id)`.
4. Nếu đúng thì hiển thị trạng thái có tin nhắn mới.
5. `NavBar` đọc `hasNewMessages` từ context để hiển thị chấm đỏ ở icon chat.

### 8.15 Chức năng tạo phòng watch

Màn hình:

- `/watch`
- component: `watch/Index`, `CreateRoomDialog`, `WatchContext`

Biến sử dụng:

- `openCreateRoom`
- `roomInfo.roomName`
- `roomInfo.password`
- `roomInfo.userConnection`
- `roomInfo.userName`
- `roomInfo.avatar`
- `roomInfo.roomType`
- `connection`
- `roomName`

Hàm frontend sử dụng:

- `setCreateRoom`
- `handleCreateRoom`
- `setRoomMessages([])`
- `setRoomName(roomInfo.roomName)`
- `connection.invoke('CreateRoom', ...)`

Hàm backend sử dụng:

- `WatchHub.CreateRoom`
Luồng xử lý:

1. Tại `/watch`, user bấm `Create Room` trong `WatchOption`.
2. `openCreateRoom` chuyển sang `true`, mở `CreateRoomDialog`.
3. User nhập `roomName`, chọn public/private và password nếu cần.
4. `handleCreateRoom` lấy dữ liệu từ `roomInfo`.
5. Frontend reset `roomMessages` thành mảng rỗng và gán `roomName` vào context.
6. Frontend gọi `connection.invoke('CreateRoom', roomName, password, userConnection, userName, avatar)`.
7. Backend kiểm tra phòng đã tồn tại chưa.
8. Nếu chưa tồn tại, backend tạo `RoomInfo`, set `admin = userConnection`, set `password`, thêm user đầu tiên vào `userList`.
9. Backend add connection vào SignalR group theo `roomName`.
10. Backend broadcast `ReceiveRoomMessage`, `ReceiveRoomUser`, `ReceiveRoomList`.
11. Frontend `navigate('/watch/' + roomInfo.roomName)`.

### 8.16 Chức năng tham gia phòng watch

Màn hình:

- `/watch`
- component: `ListRoom`, `JoinRoomDialog`, `WatchContext`

Biến sử dụng:

- `openJoinRoom`
- `joinRoomName`
- `roomInfo.roomName`
- `roomInfo.password`
- `roomInfo.userConnection`
- `roomInfo.userName`
- `roomInfo.avatar`
- `connection`

Hàm frontend sử dụng:

- `handleClick`
- `setJoinRoomName`
- `handleJoinRoom`
- `connection.invoke('JoinWatchRoom', ...)`
- `setRoomMessages([])`
- `setRoomName(roomInfo.roomName)`

Hàm backend sử dụng:

- `WatchHub.JoinWatchRoom`

Luồng xử lý:

1. `ListRoom` render danh sách từ `roomList`.
2. Khi user click vào card phòng, `handleClick` set `joinRoomName` và mở `JoinRoomDialog`.
3. `JoinRoomDialog` khởi tạo `roomInfo.roomName` từ `joinRoomName`.
4. User nhập password nếu có.
5. `handleJoinRoom` reset `roomMessages`, set `roomName` trong context.
6. Gọi `connection.invoke('JoinWatchRoom', roomName, password, userConnection, userName, avatar)`.
7. Backend kiểm tra phòng có tồn tại không.
8. Backend kiểm tra password có đúng không.
9. Backend thêm user vào `userList`, add SignalR group, broadcast user list và system message.
10. Frontend điều hướng sang `/watch/:roomName`.

### 8.17 Chức năng xem room list realtime

Màn hình:

- `/watch`
- component: `WatchContext`, `Index`, `ListRoom`

Biến sử dụng:

- `connection`
- `roomList`

Hàm frontend sử dụng:

- `WatchContext.connect`
- event handler `conn.on('ReceiveRoomList', ...)`
- `setRoomList`

Hàm backend sử dụng:

- `WatchHub.OnConnectedAsync`
- `WatchHub.CreateRoom`
- `WatchHub.LeaveWatchRoom`

Luồng xử lý:

1. Khi connect hub `/Watch`, backend gọi `ReceiveRoomList` cho client mới.
2. Frontend lưu danh sách vào `roomList`.
3. `ListRoom` render các card phòng.
4. Khi có phòng mới hoặc ai rời phòng làm room thay đổi, backend broadcast lại `ReceiveRoomList`.
5. UI tự cập nhật theo state context.

### 8.18 Chức năng chat trong watch room

Màn hình:

- `/watch/:roomName`
- component: `watch/ChatBox`

Biến sử dụng:

- `newMessage`
- `messages`
- `connection`
- `roomName`
- `user.userName`

Hàm frontend sử dụng:

- `sendMessage`
- `scrollToBottom`
- `connection.invoke('SendRoomMessage', user.userName, newMessage, roomName)`

Hàm backend sử dụng:

- `WatchHub.SendRoomMessage`

Luồng xử lý:

1. User nhập nội dung vào input chat room.
2. `setNewMessage` cập nhật state.
3. Khi bấm send, `sendMessage` kiểm tra nội dung không rỗng.
4. Frontend gọi `SendRoomMessage(user.userName, newMessage, roomName)`.
5. Backend phát event `ReceiveRoomMessage` tới cả group.
6. `WatchContext` nhận event và append vào `roomMessages`.
7. `watch/ChatBox` render tin nhắn mới và scroll xuống cuối.

### 8.19 Chức năng đồng bộ video trong watch room

Màn hình:

- `/watch/:roomName`
- component: `VideoBox`

Biến sử dụng:

- `inputRef`
- `videoRef`
- `oldTime`
- `oldUserList`
- `trigger`
- `videoURL`
- `videoPlaying`
- `videocurrenntTime`
- `userList`
- `admin`
- `connection`
- `roomName`

Hàm frontend sử dụng:

- `normalizeVideoUrl`
- `handleChangeVideo`
- `handlePlay`
- `handlePause`
- `handleSeek`
- `sendVideoState`
- event handlers:
  - `ReceiveRoomVideo`
  - `ReceiveVideoURL`
  - `ReceiveVideoPlay`
  - `ReceiveVideoSeek`

Hàm backend sử dụng:

- `WatchHub.SendURL`
- `WatchHub.PlayVideo`
- `WatchHub.SeekVideo`
- `WatchHub.SendVideoState`
Luồng xử lý đổi URL:

1. User nhập link video vào input.
2. `handleChangeVideo` gọi `normalizeVideoUrl`.
3. Nếu URL hợp lệ và `ReactPlayer.canPlay(nextUrl)` trả true, frontend gọi `SendURL(roomName, nextUrl)`.
4. Backend cập nhật `RoomInfo.video.videoURL` và broadcast `ReceiveVideoURL`.
5. Tất cả client cập nhật `videoURL` và phát source mới.

Luồng xử lý play/pause:

1. Khi player phát, `handlePlay` gọi `PlayVideo(connectionId, roomName, true)`.
2. Backend broadcast `ReceiveVideoPlay(true)` cho group trừ sender.
3. Client khác set `videoPlaying = true`.
4. Khi pause, `handlePause` gọi `PlayVideo(..., false)`.
5. Client khác set `videoPlaying = false`.

Luồng xử lý seek:

1. `onProgress` gọi `handleSeek(e)`.
2. Nếu chênh lệch thời gian đủ lớn so với `oldTime.current`, frontend gọi `SeekVideo(connectionId, roomName, currentVideoTime)`.
3. Backend broadcast `ReceiveVideoSeek(currentTime)`.
4. Client khác `seekTo(currentTime)`.

Luồng xử lý đồng bộ cho người mới vào:

1. `VideoBox` so sánh `userList` hiện tại với `oldUserList.current`.
2. Nếu có user mới và current connection là admin, frontend lấy current video time từ `videoRef`.
3. Admin gọi `SendVideoState(user.userConnection, roomName, { videoURL, playing, currentTime })`.
4. Backend gửi `ReceiveRoomVideo` cho đúng user vừa vào.
5. User mới set `videoURL`, `videoPlaying`, `videocurrenntTime` để vào đúng trạng thái hiện tại.

### 8.20 Chức năng rời phòng và kick user trong watch room

Màn hình:

- `/watch/:roomName`
- component: `Room`, `UserList`

Biến sử dụng:

- `roomName`
- `connection.connectionId`
- `userList`
- `admin`
- `setRoomName`
- `setVideo`

Hàm frontend sử dụng:

- `handleLeave`
- `leaveAnyRoom`
- `handleKickUser`
- `connection.invoke('LeaveWatchRoom', ...)`
- `connection.invoke('KickUser', ...)`

Hàm backend sử dụng:

- `WatchHub.LeaveWatchRoom`
- `WatchHub.KickUser`
- `WatchHub.OnDisconnectedAsync`

Luồng rời phòng:

1. User bấm nút back hoặc rời trang.
2. `leaveAnyRoom` gọi `LeaveWatchRoom(connection.connectionId, roomName)`.
3. Backend xóa user khỏi `userList` của room.
4. Nếu room hết user, backend xóa room khỏi `connection` dictionary.
5. Nếu admin rời phòng nhưng room còn user, backend chuyển admin cho user đầu tiên còn lại.
6. Backend broadcast lại `ReceiveRoomUser` và `ReceiveRoomList`.
7. Frontend reset video state bằng `setVideo('', false, 0)` và `setRoomName('')`.

Luồng kick user:

1. Admin click một user trong `UserList`.
2. `handleKickUser(value)` kiểm tra current connection có phải admin không.
3. Nếu không phải chính mình, gọi `KickUser(value.userConnection, roomName)`.
4. Backend gọi `LeaveWatchRoom` cho user đó.
5. Backend gửi `ReceiveKickMessage` cho client bị kick.
6. Client bị kick `navigate('/watch')` và reset `roomName`.

## 9. Các API frontend đang gọi trực tiếp

### Auth

- `signIn(formData)` -> `POST /api/Auth/SignIn`
- `signUp(formData)` -> `POST /api/Auth/SignUp`

### User

- `getUser(id)` -> `GET /api/User/GetUser`
- `getNewUsers(number)` -> `GET /api/User/GetNewUsers`
- `getUserActivities(userId)` -> `GET /api/User/GetUserActivities`
- `getAllFollower(userId)` -> `GET /api/User/GetAllFollower`
- `getAllFollowing(userId)` -> `GET /api/User/GetAllFollowing`
- `followUser(followerId, followingId)` -> `POST /api/User/FollowUser`
- `unfollowUser(followerId, followingId)` -> `DELETE /api/User/UnfollowUser`
- `changeImage(formData)` -> `PUT /api/User/ChangeUserImage`

### Post

- `createPost(formData)` -> `POST /api/Post/CreatePost`
- `getAllPost(pageNumber)` -> `GET /api/Post/GetAllPost`
- `getPostByUser(userId, pageNumber)` -> `GET /api/Post/GetPostByUser`
- `deletePost(postId)` -> `DELETE /api/Post/DeletePost`
- `votePost(data)` -> `POST /api/Post/VotePost`
- `updateVote(data)` -> `PUT /api/Post/UpdateVote`
- `deleteVote(userId, postId)` -> `DELETE /api/Post/DeleteVote`
- `getAllVote(postId)` -> `GET /api/Post/GetAllVote`
- `getVoteById(userId, postId)` -> `GET /api/Post/GetVoteById`

### Search

- `searchUser(userName)` -> `GET /api/Search/SearchUser`

### Message

- `getMessage(userId, friendId)` -> `GET /api/Message/GetMessage`
- `getUnReaded(userId)` -> `GET /api/Message/UnReadMessage`
- `getChatHistory(userId)` -> `GET /api/Message/ChatHistory`

## 10. Ghi chú kỹ thuật cần lưu ý

- `Comment` đã có entity/model nhưng chưa có flow chức năng đầy đủ ở frontend.
- `PostRepository.GetPostByIdAsync` chưa được triển khai.
- `UserInfo.cs` là class rỗng.
- `fakeFriend.js` rỗng.
- `CommentModel` hiện không đồng nhất kiểu dữ liệu với entity `Comment`.
- `ChangeImageBox` đang dùng chung `FormData` cho cả đổi ảnh người dùng và tạo bài viết nếu bật checkbox `Create new post`.
- `AccountRepository` đang hard-code `ZeroBounceApiKey`.
- File cấu hình backend đang chứa connection string và JWT secret thật, cần chuyển sang biến môi trường khi triển khai thực tế.
- `WatchHub.OnDisconnectedAsync` đang gọi `LeaveWatchRoom(roomName, Context.ConnectionId)` trong khi chữ ký hàm hiện là `(userConecction, roomName)`, thứ tự tham số không khớp.
- `WatchContext` khởi tạo `roomMessages` là `undefined`, sau đó nhiều nơi giả định là mảng.

## 11. Cập nhật chức năng bình luận bài viết

Phiên bản hiện tại đã triển khai đầy đủ chức năng bình luận cho bài viết.

### Backend

- Thêm các API mới trong `PostController`:
  - `GET /api/Post/GetAllComment?postId=...`
  - `POST /api/Post/CreateComment`
  - `DELETE /api/Post/DeleteComment?commentId=...&userId=...`
- `CommentModel` được chuẩn hóa lại theo kiểu dữ liệu thực tế của entity:
  - `CommentId: string`
  - `PostId: string`
  - `UserId: string`
  - `UserName`
  - `Avatar`
- `PostRepository` bổ sung:
  - `GetAllCommentsAsync(postId)`
  - `AddCommentAsync(model)`
  - `DeleteCommentAsync(commentId, userId)`
- `PostModel` bổ sung `CommentCount` để feed trả sẵn số lượng bình luận.
- `GetAllPostsAsync` và `GetPostByUserAsync` đã trả thêm `CommentCount` cho từng bài viết.

### Frontend

- `postRequest.js` và `postAction.js` bổ sung:
  - `getAllComment(postId)`
  - `createComment(data)`
  - `deleteComment(commentId, userId)`
- Thêm component mới `PostCommentBox.jsx`.
- `PostBox.jsx` đã gắn `PostCommentBox` ngay bên dưới `VoteBox`.

### Luồng hoạt động mới

1. Feed bài viết trả sẵn `commentCount` trong từng `post`.
2. `PostCommentBox` nhận `initialCommentCount` từ `post.commentCount`.
3. Component không tải comment ngay khi render feed, chỉ tải khi người dùng mở khu vực bình luận.
4. Khi mở bình luận lần đầu, frontend gọi `GET /api/Post/GetAllComment`.
5. Người dùng đăng nhập có thể gửi bình luận mới qua `POST /api/Post/CreateComment`.
6. Chủ bình luận có thể xóa bình luận của mình qua `DELETE /api/Post/DeleteComment`.
7. Danh sách bình luận hiện theo kiểu phân trang hiển thị cục bộ, mặc định 3 bình luận đầu tiên, sau đó dùng nút `Xem thêm bình luận`.

### Component và biến mới liên quan

#### `PostModel`

- `CommentCount`

#### `PostCommentBox`

Biến/state:

- `comments`
- `content`
- `isOpen`
- `isLoading`
- `isLoaded`
- `visibleCount`
- `commentCount`

Hàm:

- `loadComments`
- `handleToggle`
- `handleSubmit`
- `handleDelete`
- `handleLoadMore`

### Mục đích tối ưu

- Feed không phải gọi API comment cho mọi post ngay khi hiển thị.
- Số lượng bình luận hiển thị ngay từ feed nhờ `CommentCount`.
- Chỉ tải chi tiết comment khi người dùng thật sự mở phần bình luận.
- Danh sách bình luận dài được chia nhỏ để giảm render ban đầu.
