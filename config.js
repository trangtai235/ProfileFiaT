/**
 * CHỈNH THÔNG TIN TRANG CỦA BẠN TẠI ĐÂY.
 * Lưu file, sau đó tải lại trình duyệt để xem thay đổi.
 */
window.PROFILE_CONFIG = {
  name: "FiaT",
  handle: "tktai_235",
  monogram: "FiaT",
  // Hỗ trợ .gif, .png, .webp... và được dùng dự phòng khi Discord chưa sẵn sàng.
  avatar: "assets/avatar.gif",
  location: "Việt Nam",

  bios: [
    "Không cần ồn ào để nổi bật.",
    "Đang xây thế giới của riêng mình.",
    "Welcome to my digital space.",
  ],

  theme: {
    accent: "#75efff",
    accent2: "#b792ff",
    background: "assets/background.webp",
  },

  audio: {
    volume: 0.55,
    defaultTrack: 0, // Vị trí bài mở đầu, tính từ 0
    autoAdvance: true, // Tự chuyển sang bài tiếp theo khi hết đoạn
    loopPlaylist: true, // Hết bài cuối sẽ quay lại bài đầu

    // Chỉ tài khoản có quyền ghi repository mới chỉnh được danh sách này.
    // Dán link dạng https://soundcloud.com/ten-nguoi-dang/ten-bai vào url.
    // Demo đang chia một bài SoundCloud thành 3 mục để thử chuyển đoạn/bài.
    tracks: [
      {
        provider: "soundcloud",
        url: "https://soundcloud.com/tr-ng-giang-nh/12345timem",
        title: "12345 — Phần 1",
        artist: "GAZ",
        startAt: 80,
        endAt: 119.8,
        loopSegment: false,
        lyrics: [
          { time: 80.84, text: "Anh lại đếm từng nhịp là 1, 2, 3, 4, 5." },
          { time: 83.4, text: "Anh lại đếm là 1, 2, 3, 4, 5." },
          { time: 86.24, text: "Chẳng thể buồn hơn khi muốn thăm." },
          { time: 87.88, text: "Nhưng mà em lại không chờ." },
          { time: 89.52, text: "Cứ ngân." },
          { time: 90.88, text: "Chẳng phải mùa đông nhưng rét căm." },
          { time: 92.96, text: "Cũng chẳng phải bị gì nhưng như vết đâm." },
          { time: 96.04, text: "1, 2, 3, 4, 5." },
          { time: 97.76, text: "Anh lại đếm là 1, 2, 3, 4." },
          { time: 99.52, text: "Okay, okay, okay." },
          { time: 101.72, text: "Bóng ai vụt qua tay người." },
          { time: 104.08, text: "Nỗi đau cứ âm thầm rơi." },
          { time: 105.88, text: "Bởi vì anh có em, có em đây rồi." },
          { time: 108.96, text: "Hóa ra giấc mơ quay lại." },
          { time: 111.24, text: "Nhớ em, anh bước qua đêm tàn." },
          { time: 113.64, text: "Trái tim hiến dâng lên trời." },
          { time: 115.44, text: "Bởi vì anh biết em đã quên anh rồi." },
        ],
      },
      {
        provider: "soundcloud",
        url: "https://soundcloud.com/tr-ng-giang-nh/12345timem",
        title: "12345 — Phần 2",
        artist: "GAZ",
        startAt: 120,
        endAt: 159.4,
        loopSegment: false,
        lyrics: [
          { time: 120.16, text: "Okay." },
          { time: 121.12, text: "Đốt lên." },
          { time: 123.12, text: "Don't know." },
          { time: 124.08, text: "Ai biết?" },
          { time: 125.08, text: "Baby." },
          { time: 126.16, text: "Vang xa xa." },
          { time: 127.76, text: "Quan tâm." },
          { time: 128.88, text: "Đêm nay gió về." },
          { time: 130.08, text: "Ừ thì em đang say." },
          { time: 131.08, text: "Anh chỉ nhớ giọng em." },
          { time: 132.28, text: "Khi thì thào đâu đây." },
          { time: 133.84, text: "Kiếm tiền to về cho nàng tiêu ở đây." },
          { time: 135.92, text: "Nàng ơi ở đâu đây, chỉ nghe là okay." },
          { time: 137.92, text: "Okay, okay." },
          { time: 140.52, text: "Bóng ai vụt qua tay người." },
          { time: 142.48, text: "Nỗi đau cứ âm thầm rơi." },
          { time: 144.28, text: "Bởi vì anh có em, có em đây rồi." },
          { time: 147.32, text: "Hóa ra giấc mơ quay lại." },
          { time: 149.76, text: "Nhớ em, anh bước qua đêm tàn." },
          { time: 152.08, text: "Trái tim hiến dâng lên trời." },
          { time: 153.88, text: "Bởi vì anh biết em đã quên anh rồi." },
        ],
      },
      {
        provider: "soundcloud",
        url: "https://soundcloud.com/tr-ng-giang-nh/12345timem",
        title: "12345 — Phần 3",
        artist: "GAZ",
        startAt: 159.5,
        endAt: 198,
        loopSegment: false,
        lyrics: [
          { time: 159.96, text: "Anh lại đếm từng nhịp là 1, 2, 3, 4, 5." },
          { time: 162.6, text: "Anh lại đếm là 1, 2, 3, 4, 5." },
          { time: 165.2, text: "Chẳng thể buồn hơn khi muốn thăm." },
          { time: 167.6, text: "Nhưng mà em lại không chờ." },
          { time: 168.72, text: "Cứ ngân." },
          { time: 170.44, text: "Chẳng phải mùa đông nhưng rét căm." },
          { time: 172.12, text: "Cũng chẳng phải bị gì nhưng như vết đâm." },
          { time: 175.24, text: "1, 2, 3, 4, 5." },
          { time: 176.96, text: "Anh lại đếm là 1, 2, 3, 4." },
          { time: 178.76, text: "Okay, okay, okay." },
          { time: 181.28, text: "Bóng ai vụt qua tay người." },
          { time: 183.28, text: "Nỗi đau cứ âm thầm rơi." },
          { time: 185.04, text: "Bởi vì anh có em, có em đây rồi." },
          { time: 188.08, text: "Hóa ra giấc mơ quay lại." },
          { time: 190.44, text: "Nhớ em, anh bước qua đêm tàn." },
          { time: 194.24, text: "Vì chỉ có em thôi." },
          { time: 195.68, text: "Có em thôi." },
          { time: 197.16, text: "Mah bad." },
        ],
      },
    ],
  },

  discord: {
    id: "538914065662083072", // Discord User ID, chỉ gồm số
    useLanyard: true,
    useAvatar: true, // Dùng avatar Discord (kể cả GIF) làm avatar chính
    fallbackName: "FiaT",
    fallbackActivity: "Đang thư giãn trong thế giới riêng.",
  },

  socials: [
    {
      label: "Discord",
      short: "DC",
      url: "https://discord.com/users/538914065662083072",
    },
    {
      label: "Spotify",
      short: "SP",
      url: "https://open.spotify.com/user/31l7unkcfijdq42z6jmrsyo4l4zm",
    },
    { label: "Youtube", short: "YT", url: "https://www.youtube.com/@FiaT_235" },
    { label: "TikTok", short: "TT", url: "https://www.tiktok.com/@tktai235" },
  ],
};
