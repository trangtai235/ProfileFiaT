# Demo nhiều bài

Nhánh `demo/multi-track` giữ nguyên trang công khai chỉ để nghe nhạc và xem lyric. Người xem có thể chuyển bài trước/sau nhưng không thể sửa nguồn nhạc, thời gian bắt đầu hoặc kết thúc.

## Thêm một bài SoundCloud

Mở `config.js` và thêm một phần tử vào `audio.tracks`:

```js
{
  provider: "soundcloud",
  url: "https://soundcloud.com/ten-nguoi-dang/ten-bai",
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

`startAt`, `endAt` và `lyrics[].time` đều tính bằng giây trên toàn bộ bài SoundCloud. Đặt `endAt: null` nếu muốn phát đến hết bài.

Player vẫn hỗ trợ file MP3: bỏ `provider` và `url`, sau đó dùng `src: "assets/ten-bai.mp3"`.

## Cài đặt playlist

- `defaultTrack`: bài mở đầu, bắt đầu từ `0`.
- `autoAdvance`: tự chuyển bài khi phát hết đoạn.
- `loopPlaylist`: từ bài cuối quay lại bài đầu.
- `loopSegment`: lặp riêng một bài và không chuyển sang bài kế tiếp.

Chỉ người có quyền ghi repository `ProfileFiaT` mới có thể thay đổi cấu hình đang hiển thị trên website.
