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
    // Mỗi bài có thể dùng file MP3 và mốc thời gian riêng.
    // Demo đang chia một file có sẵn thành 3 mục; hãy thay src bằng file nhạc khác khi cần.
    tracks: [
      {
        src: "assets/12345.mp3",
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
        src: "assets/moi.mp3",
        title: "Bài 2",
        artist: "Unknown artist",
        startAt: 0,
        endAt: null,
        loopSegment: false,
        lyrics: [],
      },
      {
        src: "assets/3.mp3",
        title: "Bài 3",
        artist: "Unknown artist",
        startAt: 0,
        endAt: null,
        loopSegment: false,
        lyrics: [],
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
