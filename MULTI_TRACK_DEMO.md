# Playlist nhiều bài

Nhánh `fix/playlist-auto-loop` được tạo từ `main`. Trang công khai chỉ dùng để nghe nhạc và xem lyric; người xem có thể chuyển bài trước/sau nhưng không thể sửa nguồn nhạc, thời gian bắt đầu hoặc kết thúc.

## Thêm một bài

1. Chép file nhạc vào thư mục `assets/`.
2. Mở `config.js` và thêm một phần tử vào `audio.tracks`:

```js
{
  src: "assets/ten-bai.mp3",
  title: "Tên bài",
  artist: "Tên ca sĩ",
  startAt: 30,
  endAt: 90,
  loopSegment: false,
  lyrics: [
    { time: 30.5, text: "Dòng lời đầu tiên" },
    { time: 34.2, text: "Dòng lời tiếp theo" },
  ],
}
```

`startAt`, `endAt` và `lyrics[].time` đều tính bằng giây trên file nhạc gốc. Đặt `endAt: null` nếu muốn phát đến hết file.

## Cài đặt playlist

- `defaultTrack`: bài mở đầu, bắt đầu từ `0`.
- `autoAdvance`: tự chuyển bài khi phát hết đoạn.
- `loopPlaylist`: từ bài cuối quay lại bài đầu.
- `loopSegment`: lặp riêng một bài và không chuyển sang bài kế tiếp.

Chỉ người có quyền ghi repository `ProfileFiaT` mới có thể thay đổi cấu hình đang hiển thị trên website.
