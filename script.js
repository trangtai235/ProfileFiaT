(() => {
  "use strict";

  const config = window.PROFILE_CONFIG || {};
  const $ = (selector) => document.querySelector(selector);
  const root = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let musicController = null;

  const elements = {
    entry: $("#entryScreen"),
    sceneImage: $("#sceneImage"),
    card: $("#profileCard"),
    name: $("#displayName"),
    handle: $("#handle"),
    bio: $("#bio"),
    avatarBox: $("#avatarBox"),
    avatarImage: $("#avatarImage"),
    avatarMonogram: $("#avatarMonogram"),
    location: $("#location"),
    socialLinks: $("#socialLinks"),
    viewCount: $("#viewCount"),
    localTime: $("#localTime"),
    soundToggle: $("#soundToggle"),
    shareButton: $("#shareButton"),
    playButton: $("#playButton"),
    audio: $("#audio"),
    progress: $("#progress"),
    currentTime: $("#currentTime"),
    duration: $("#duration"),
    trackTitle: $("#trackTitle"),
    trackArtist: $("#trackArtist"),
    soundcloudPlayer: $("#soundcloudPlayer"),
    soundcloudSource: $("#soundcloudSource"),
    previousTrack: $("#previousTrack"),
    nextTrack: $("#nextTrack"),
    trackPosition: $("#trackPosition"),
    currentLyric: $("#currentLyric"),
    toast: $("#toast"),
    presenceDot: $("#presenceDot"),
    statusPill: $("#statusPill"),
    discordStatusDot: $("#discordStatusDot"),
    discordName: $("#discordName"),
    discordActivity: $("#discordActivity"),
    discordLink: $("#discordLink"),
    discordAvatar: $("#discordAvatar"),
    discordMonogram: $("#discordMonogram"),
    cursorDot: $("#cursorDot"),
    cursorRing: $("#cursorRing"),
    particles: $("#particles")
  };

  const safeText = (value, fallback = "") =>
    typeof value === "string" && value.trim() ? value.trim() : fallback;

  const safeUrl = (value) => {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value, window.location.href);
      return ["http:", "https:", "mailto:", "file:"].includes(url.protocol) ? url.href : null;
    } catch {
      return null;
    }
  };

  const showToast = (message) => {
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      elements.toast.classList.remove("is-visible");
    }, 2400);
  };

  const showImage = (image, fallback, src, alt) => {
    if (!image || !src) return;

    image.onload = () => {
      image.hidden = false;
      if (fallback) fallback.hidden = true;
    };
    image.onerror = () => {
      image.hidden = true;
      if (fallback) fallback.hidden = false;
    };
    image.alt = alt;
    image.src = src;
  };

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const rest = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${rest}`;
  };

  function applyConfig() {
    const theme = config.theme || {};
    const name = safeText(config.name, "YOUR NAME");
    const monogram = safeText(config.monogram, name.slice(0, 2).toUpperCase());

    root.style.setProperty("--accent", safeText(theme.accent, "#75efff"));
    root.style.setProperty("--accent-2", safeText(theme.accent2, "#b792ff"));
    document.title = `${name} — Profile`;
    elements.name.textContent = name;
    elements.handle.textContent = safeText(config.handle, "@yourname");
    elements.location.textContent = safeText(config.location, "Việt Nam");
    elements.avatarMonogram.textContent = monogram;
    elements.discordMonogram.textContent = monogram;

    const background = safeUrl(theme.background);
    if (background) elements.sceneImage.style.backgroundImage = `url("${background}")`;

    const avatar = safeUrl(config.avatar);
    if (avatar) {
      showImage(elements.avatarImage, elements.avatarMonogram, avatar, `Avatar của ${name}`);
      showImage(elements.discordAvatar, elements.discordMonogram, avatar, `Avatar Discord của ${name}`);
    }

    renderSocials();
    setupAudio();
    applyDiscordFallback();
  }

  function renderSocials() {
    elements.socialLinks.replaceChildren();
    const links = Array.isArray(config.socials) ? config.socials : [];

    links.forEach((item) => {
      const url = safeUrl(item.url);
      if (!url || /YOUR_/i.test(item.url)) return;

      const anchor = document.createElement("a");
      anchor.className = "social-link";
      anchor.href = url;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.setAttribute("aria-label", `${safeText(item.label, "Liên kết")} — mở tab mới`);

      const icon = document.createElement("span");
      icon.className = "social-link__icon";
      icon.textContent = safeText(item.short, safeText(item.label, "LK").slice(0, 2).toUpperCase());

      const label = document.createElement("span");
      label.className = "social-link__label";
      label.textContent = safeText(item.label, "Liên kết");

      anchor.append(icon, label);
      elements.socialLinks.append(anchor);
    });

    if (!elements.socialLinks.children.length) {
      const hint = document.createElement("span");
      hint.className = "eyebrow";
      hint.textContent = "Thêm link trong config.js";
      elements.socialLinks.append(hint);
    }
  }

  function startTypewriter() {
    const lines = Array.isArray(config.bios) && config.bios.length
      ? config.bios.map((line) => safeText(line)).filter(Boolean)
      : ["Welcome to my digital space."];

    if (reduceMotion) {
      elements.bio.textContent = lines[0];
      return;
    }

    let lineIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const line = lines[lineIndex];
      charIndex += deleting ? -1 : 1;
      elements.bio.textContent = line.slice(0, Math.max(0, charIndex));

      let delay = deleting ? 34 : 58;
      if (!deleting && charIndex >= line.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && charIndex <= 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
        delay = 420;
      }

      window.setTimeout(tick, delay);
    };

    tick();
  }

  function setupAudio() {
    const audioConfig = config.audio || {};
    const legacyTrack = {
      src: audioConfig.src,
      title: audioConfig.title,
      artist: audioConfig.artist,
      startAt: audioConfig.startAt,
      endAt: audioConfig.endAt,
      loopSegment: audioConfig.loopSegment,
      lyrics: audioConfig.lyrics
    };
    const configuredTracks = Array.isArray(audioConfig.tracks) && audioConfig.tracks.length
      ? audioConfig.tracks
      : [legacyTrack];
    const isSoundCloudUrl = (value) => {
      try {
        const hostname = new URL(value).hostname.toLowerCase();
        return hostname === "soundcloud.com" || hostname.endsWith(".soundcloud.com");
      } catch {
        return false;
      }
    };
    const tracks = configuredTracks
      .map((track, index) => {
        const source = safeUrl(track?.url || track?.src);
        if (!source) return null;

        const startAt = Number(track?.startAt);
        const endAt = track?.endAt === null || track?.endAt === "" || track?.endAt === undefined
          ? null
          : Number(track.endAt);
        const provider = track?.provider === "soundcloud" || isSoundCloudUrl(source)
          ? "soundcloud"
          : "audio";

        return {
          source,
          provider,
          title: safeText(track?.title, `Bài hát ${index + 1}`),
          artist: safeText(track?.artist, "Unknown artist"),
          startAt: Number.isFinite(startAt) && startAt >= 0 ? startAt : 0,
          endAt: Number.isFinite(endAt) ? endAt : null,
          loopSegment: typeof track?.loopSegment === "boolean"
            ? track.loopSegment
            : Boolean(audioConfig.loopSegment),
          lyrics: Array.isArray(track?.lyrics)
            ? track.lyrics
              .map((line) => ({
                time: Number(line?.time),
                text: safeText(line?.text)
              }))
              .filter((line) => Number.isFinite(line.time) && line.time >= 0 && line.text)
              .sort((a, b) => a.time - b.time)
            : []
        };
      })
      .filter(Boolean);

    const hasAudio = tracks.length > 0;
    const volume = Number(audioConfig.volume);
    const autoAdvance = audioConfig.autoAdvance !== false;
    const loopPlaylist = audioConfig.loopPlaylist !== false;
    let activeTrackIndex = Math.min(
      tracks.length - 1,
      Math.max(0, Number.isInteger(audioConfig.defaultTrack) ? audioConfig.defaultTrack : 0)
    );
    let activeTrack = null;
    let activeLyrics = [];
    let activeLyricIndex = -1;
    let segmentStart = 0;
    let segmentEnd = Infinity;
    let playbackPosition = 0;
    let playAfterLoad = false;
    let isChangingTrack = false;
    let isPlaying = false;
    let soundCloudWidget = null;

    elements.playButton.disabled = !hasAudio;
    elements.previousTrack.disabled = tracks.length <= 1;
    elements.nextTrack.disabled = tracks.length <= 1;
    elements.soundToggle.classList.toggle("is-muted", !hasAudio);

    if (!hasAudio) {
      elements.trackTitle.textContent = "Thêm nhạc trong config.js";
      elements.trackArtist.textContent = "Mở config.js để kích hoạt";
      elements.trackPosition.textContent = "0 / 0";
      elements.currentLyric.textContent = "Chưa có lời bài hát.";
      musicController = { available: false };
      return;
    }

    elements.audio.volume = Number.isFinite(volume) ? Math.min(1, Math.max(0, volume)) : 0.55;

    const setPlaying = (playing) => {
      isPlaying = Boolean(playing);
      syncAudioButtons(isPlaying);
    };

    const updateProgress = (position = playbackPosition) => {
      const segmentDuration = segmentEnd - segmentStart;
      const ratio = Number.isFinite(segmentDuration) && segmentDuration > 0
        ? ((position - segmentStart) / segmentDuration) * 100
        : 0;
      const safeRatio = Math.min(100, Math.max(0, ratio));
      elements.progress.setAttribute("aria-valuenow", String(Math.round(safeRatio)));
      elements.progress.style.setProperty("--progress", `${safeRatio}%`);
      elements.currentTime.textContent = formatTime(position);
    };

    const updateLyrics = (position = playbackPosition) => {
      let nextIndex = -1;
      for (let index = 0; index < activeLyrics.length; index += 1) {
        if (activeLyrics[index].time > position) break;
        nextIndex = index;
      }
      if (nextIndex === activeLyricIndex) return;

      activeLyricIndex = nextIndex;
      elements.currentLyric.textContent = activeLyricIndex >= 0
        ? activeLyrics[activeLyricIndex].text
        : "♪";

      if (!reduceMotion) {
        elements.currentLyric.animate(
          [
            { opacity: 0, transform: "translateY(5px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          { duration: 260, easing: "ease-out" }
        );
      }
    };

    const configureSegment = (duration) => {
      segmentStart = Math.min(activeTrack.startAt, Math.max(0, duration - 0.01));
      segmentEnd = activeTrack.endAt !== null && activeTrack.endAt > segmentStart
        ? Math.min(activeTrack.endAt, duration)
        : duration;
      playbackPosition = segmentStart;
      elements.currentTime.textContent = formatTime(segmentStart);
      elements.duration.textContent = formatTime(segmentEnd);
      updateProgress();
      updateLyrics();
    };

    const pausePlayers = () => {
      elements.audio.pause();
      if (soundCloudWidget) soundCloudWidget.pause();
      setPlaying(false);
    };

    let loadTrack;

    const finishTrack = () => {
      if (isChangingTrack || !activeTrack) return;

      if (activeTrack.loopSegment) {
        playbackPosition = segmentStart;
        if (activeTrack.provider === "soundcloud") {
          soundCloudWidget.seekTo(segmentStart * 1000);
          soundCloudWidget.play();
        } else {
          elements.audio.currentTime = segmentStart;
          elements.audio.play().catch(() => setPlaying(false));
        }
        setPlaying(true);
        return;
      }

      const hasNextTrack = activeTrackIndex < tracks.length - 1;
      if (autoAdvance && (hasNextTrack || loopPlaylist)) {
        loadTrack(activeTrackIndex + 1, true);
        return;
      }

      pausePlayers();
      playbackPosition = segmentEnd;
      if (activeTrack.provider === "soundcloud") {
        soundCloudWidget.seekTo(segmentEnd * 1000);
      } else {
        elements.audio.currentTime = segmentEnd;
      }
      updateProgress();
    };

    const handleSoundCloudReady = () => {
      if (!soundCloudWidget || activeTrack?.provider !== "soundcloud") return;

      soundCloudWidget.getDuration((durationMs) => {
        if (activeTrack?.provider !== "soundcloud") return;
        const duration = Number(durationMs) / 1000;
        if (!Number.isFinite(duration) || duration <= 0) {
          isChangingTrack = false;
          showToast("Không đọc được thời lượng bài SoundCloud.");
          return;
        }

        configureSegment(duration);
        soundCloudWidget.seekTo(segmentStart * 1000);
        isChangingTrack = false;

        if (playAfterLoad) {
          playAfterLoad = false;
          soundCloudWidget.play();
        }
      });
    };

    const initializeSoundCloud = () => {
      if (!window.SC?.Widget) {
        isChangingTrack = false;
        playAfterLoad = false;
        elements.playButton.disabled = true;
        showToast("Không tải được trình phát SoundCloud.");
        return;
      }

      const widgetOptions = {
        auto_play: false,
        buying: false,
        sharing: false,
        download: false,
        show_artwork: false,
        show_playcount: false,
        show_user: false,
        callback: handleSoundCloudReady
      };

      if (!soundCloudWidget) {
        const query = new URLSearchParams({
          url: activeTrack.source,
          auto_play: "false",
          buying: "false",
          sharing: "false",
          download: "false",
          show_artwork: "false",
          show_playcount: "false",
          show_user: "false"
        });
        elements.soundcloudPlayer.src = `https://w.soundcloud.com/player/?${query}`;
        soundCloudWidget = window.SC.Widget(elements.soundcloudPlayer);
        const events = window.SC.Widget.Events;

        soundCloudWidget.bind(events.READY, handleSoundCloudReady);
        soundCloudWidget.bind(events.PLAY_PROGRESS, (event) => {
          if (activeTrack?.provider !== "soundcloud" || isChangingTrack) return;
          playbackPosition = Number(event?.currentPosition) / 1000;
          if (!Number.isFinite(playbackPosition)) return;
          if (playbackPosition + 0.25 < segmentStart) {
            soundCloudWidget.seekTo(segmentStart * 1000);
            return;
          }
          if (playbackPosition >= segmentEnd) {
            finishTrack();
            return;
          }
          updateProgress();
          updateLyrics();
        });
        soundCloudWidget.bind(events.PLAY, () => {
          if (activeTrack?.provider !== "soundcloud") return;
          if (playbackPosition + 0.25 < segmentStart || playbackPosition >= segmentEnd) {
            soundCloudWidget.seekTo(segmentStart * 1000);
          }
          setPlaying(true);
        });
        soundCloudWidget.bind(events.PAUSE, () => {
          if (activeTrack?.provider === "soundcloud" && !isChangingTrack) setPlaying(false);
        });
        soundCloudWidget.bind(events.FINISH, finishTrack);
        if (events.ERROR) {
          soundCloudWidget.bind(events.ERROR, () => {
            if (activeTrack?.provider !== "soundcloud") return;
            isChangingTrack = false;
            playAfterLoad = false;
            setPlaying(false);
            showToast(`Không phát được ${activeTrack.title}.`);
          });
        }
        return;
      }

      soundCloudWidget.load(activeTrack.source, widgetOptions);
    };

    loadTrack = (index, shouldPlay = false) => {
      const normalizedIndex = (index + tracks.length) % tracks.length;
      pausePlayers();
      activeTrackIndex = normalizedIndex;
      activeTrack = tracks[activeTrackIndex];
      activeLyrics = activeTrack.lyrics;
      activeLyricIndex = -1;
      segmentStart = activeTrack.startAt;
      segmentEnd = Infinity;
      playbackPosition = segmentStart;
      playAfterLoad = shouldPlay;
      isChangingTrack = true;

      elements.trackTitle.textContent = activeTrack.title;
      elements.trackArtist.textContent = activeTrack.artist;
      elements.trackPosition.textContent = `${activeTrackIndex + 1} / ${tracks.length}`;
      elements.currentTime.textContent = formatTime(segmentStart);
      elements.duration.textContent = activeTrack.endAt === null ? "0:00" : formatTime(activeTrack.endAt);
      elements.currentLyric.textContent = activeLyrics.length ? "♪" : "Chưa có lời bài hát.";
      elements.playButton.disabled = false;
      elements.soundcloudSource.hidden = activeTrack.provider !== "soundcloud";
      elements.soundcloudSource.href = activeTrack.provider === "soundcloud" ? activeTrack.source : "#";
      elements.progress.setAttribute("aria-valuenow", "0");
      elements.progress.style.setProperty("--progress", "0%");

      if (activeTrack.provider === "soundcloud") {
        elements.audio.removeAttribute("src");
        elements.audio.load();
        initializeSoundCloud();
      } else {
        elements.audio.src = activeTrack.source;
        elements.audio.load();
      }
    };

    elements.audio.addEventListener("loadedmetadata", () => {
      if (activeTrack?.provider !== "audio") return;
      configureSegment(elements.audio.duration);
      elements.audio.currentTime = segmentStart;
      isChangingTrack = false;

      if (playAfterLoad) {
        playAfterLoad = false;
        elements.audio.play().catch(() => setPlaying(false));
      }
    });

    elements.audio.addEventListener("timeupdate", () => {
      if (activeTrack?.provider !== "audio" || isChangingTrack) return;
      playbackPosition = elements.audio.currentTime;
      if (elements.audio.currentTime + 0.25 < segmentStart) {
        elements.audio.currentTime = segmentStart;
        return;
      }
      if (elements.audio.currentTime >= segmentEnd) {
        finishTrack();
        return;
      }
      updateProgress();
      updateLyrics();
    });

    elements.audio.addEventListener("play", () => {
      if (activeTrack?.provider !== "audio") return;
      if (elements.audio.currentTime < segmentStart || elements.audio.currentTime >= segmentEnd) {
        elements.audio.currentTime = segmentStart;
      }
      setPlaying(true);
    });
    elements.audio.addEventListener("pause", () => {
      if (activeTrack?.provider === "audio" && !isChangingTrack) setPlaying(false);
    });
    elements.audio.addEventListener("ended", () => {
      if (activeTrack?.provider === "audio") finishTrack();
    });
    elements.audio.addEventListener("error", () => {
      if (activeTrack?.provider !== "audio") return;
      isChangingTrack = false;
      playAfterLoad = false;
      elements.playButton.disabled = true;
      setPlaying(false);
      showToast(`Không đọc được ${activeTrack?.title || "file nhạc"}.`);
    });

    elements.previousTrack.addEventListener("click", () => {
      loadTrack(activeTrackIndex - 1, isPlaying);
    });
    elements.nextTrack.addEventListener("click", () => {
      loadTrack(activeTrackIndex + 1, isPlaying);
    });

    musicController = {
      available: true,
      async play() {
        if (isChangingTrack) {
          playAfterLoad = true;
          return;
        }
        if (activeTrack.provider === "soundcloud") {
          if (playbackPosition + 0.25 < segmentStart || playbackPosition >= segmentEnd) {
            soundCloudWidget.seekTo(segmentStart * 1000);
          }
          soundCloudWidget.play();
          return;
        }
        if (elements.audio.currentTime < segmentStart || elements.audio.currentTime >= segmentEnd) {
          elements.audio.currentTime = segmentStart;
        }
        await elements.audio.play();
      },
      pause() {
        pausePlayers();
      },
      async toggle() {
        if (isPlaying) this.pause();
        else await this.play();
      }
    };

    loadTrack(activeTrackIndex);
  }

  async function toggleAudio() {
    if (!musicController?.available || elements.playButton.disabled) {
      showToast("Hãy thêm link SoundCloud hoặc file nhạc trong config.js.");
      return;
    }

    try {
      await musicController.toggle();
    } catch {
      showToast("Trình duyệt chưa cho phép phát âm thanh.");
    }
  }

  function syncAudioButtons(playingOverride) {
    const playing = typeof playingOverride === "boolean" ? playingOverride : !elements.audio.paused;
    elements.playButton.classList.toggle("is-playing", playing);
    elements.playButton.setAttribute("aria-label", playing ? "Tạm dừng nhạc" : "Phát nhạc");
    elements.soundToggle.classList.toggle("is-muted", !playing);
    elements.soundToggle.setAttribute("aria-label", playing ? "Tắt âm thanh" : "Bật âm thanh");
  }

  function applyDiscordFallback() {
    const discord = config.discord || {};
    const name = safeText(discord.fallbackName, safeText(config.handle, "yourname").replace(/^@/, ""));
    const activity = safeText(discord.fallbackActivity, "Đang thư giãn trong thế giới riêng.");
    const validId = /^\d{15,22}$/.test(String(discord.id || ""));

    elements.discordName.textContent = name;
    elements.discordActivity.textContent = activity;
    elements.discordLink.href = validId ? `https://discord.com/users/${discord.id}` : "https://discord.com/";
    setDiscordStatus("online");

    if (discord.useLanyard && validId) loadDiscordPresence(String(discord.id));
  }

  async function loadDiscordPresence(id) {
    try {
      const response = await fetch(`https://api.lanyard.rest/v1/users/${id}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Presence request failed");
      const payload = await response.json();
      if (!payload.success || !payload.data) throw new Error("Presence unavailable");

      const data = payload.data;
      const user = data.discord_user || {};
      const name = user.global_name || user.username || config.discord.fallbackName;
      elements.discordName.textContent = safeText(name, "Discord user");
      setDiscordStatus(data.discord_status || "offline");

      if (user.id && user.avatar) {
        const extension = user.avatar.startsWith("a_") ? "gif" : "png";
        const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${extension}?size=256`;
        showImage(elements.discordAvatar, elements.discordMonogram, avatarUrl, `Avatar Discord của ${name}`);

        if (config.discord.useAvatar) {
          showImage(elements.avatarImage, elements.avatarMonogram, avatarUrl, `Avatar của ${name}`);
        }
      }

      if (data.listening_to_spotify && data.spotify) {
        elements.discordActivity.textContent = `Đang nghe ${data.spotify.song} — ${data.spotify.artist}`;
      } else {
        const custom = (data.activities || []).find((activity) => activity.type === 4);
        const game = (data.activities || []).find((activity) => activity.type === 0);
        elements.discordActivity.textContent = safeText(
          custom?.state || game?.details || game?.name,
          config.discord.fallbackActivity
        );
      }
    } catch {
      elements.discordActivity.textContent = safeText(
        config.discord?.fallbackActivity,
        "Không lấy được trạng thái Discord lúc này."
      );
    }
  }

  function setDiscordStatus(status) {
    const allowed = ["online", "idle", "dnd", "offline"];
    const value = allowed.includes(status) ? status : "offline";
    const labels = { online: "ONLINE", idle: "IDLE", dnd: "DND", offline: "OFFLINE" };

    elements.presenceDot.dataset.status = value;
    elements.discordStatusDot.dataset.status = value;
    elements.statusPill.textContent = labels[value];
    elements.statusPill.style.opacity = value === "offline" ? "0.68" : "1";
  }

  function setupVisitsAndClock() {
    const key = "neon-profile-local-views";
    let views = 1;
    try {
      views = Number(localStorage.getItem(key) || 0) + 1;
      localStorage.setItem(key, String(views));
    } catch {
      views = 1;
    }
    elements.viewCount.textContent = String(views).padStart(3, "0");

    const updateClock = () => {
      elements.localTime.textContent = new Intl.DateTimeFormat("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }).format(new Date());
    };
    updateClock();
    window.setInterval(updateClock, 30_000);
  }

  function setupCardTilt() {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    elements.card.addEventListener("pointermove", (event) => {
      const rect = elements.card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      elements.card.style.setProperty("--rotate-y", `${(x - 0.5) * 4.5}deg`);
      elements.card.style.setProperty("--rotate-x", `${(0.5 - y) * 4.5}deg`);
      elements.card.style.setProperty("--shine-x", `${x * 100}%`);
      elements.card.style.setProperty("--shine-y", `${y * 100}%`);
    });

    elements.card.addEventListener("pointerleave", () => {
      elements.card.style.setProperty("--rotate-y", "0deg");
      elements.card.style.setProperty("--rotate-x", "0deg");
      elements.card.style.setProperty("--shine-x", "50%");
      elements.card.style.setProperty("--shine-y", "12%");
    });
  }

  function setupCursor() {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    body.classList.add("has-pointer");

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let targetX = ringX;
    let targetY = ringY;

    window.addEventListener("pointermove", (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      elements.cursorDot.style.left = `${targetX}px`;
      elements.cursorDot.style.top = `${targetY}px`;
    });

    document.querySelectorAll("a, button, input").forEach((target) => {
      target.addEventListener("pointerenter", () => elements.cursorRing.classList.add("is-hovering"));
      target.addEventListener("pointerleave", () => elements.cursorRing.classList.remove("is-hovering"));
    });

    const animate = () => {
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      elements.cursorRing.style.left = `${ringX}px`;
      elements.cursorRing.style.top = `${ringY}px`;
      window.requestAnimationFrame(animate);
    };
    animate();
  }

  function setupParticles() {
    if (reduceMotion || !elements.particles.getContext) return;
    const context = elements.particles.getContext("2d");
    let width = 0;
    let height = 0;
    let particles = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      elements.particles.width = width * dpr;
      elements.particles.height = height * dpr;
      elements.particles.style.width = `${width}px`;
      elements.particles.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(58, Math.max(24, Math.floor((width * height) / 30_000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.35,
        speed: Math.random() * 0.18 + 0.08,
        drift: (Math.random() - 0.5) * 0.12,
        alpha: Math.random() * 0.55 + 0.2
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.y -= particle.speed;
        particle.x += particle.drift;
        if (particle.y < -4) particle.y = height + 4;
        if (particle.x < -4) particle.x = width + 4;
        if (particle.x > width + 4) particle.x = -4;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(155, 239, 255, ${particle.alpha})`;
        context.shadowColor = "rgba(117, 239, 255, 0.8)";
        context.shadowBlur = 9;
        context.fill();
      });
      window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    draw();
  }

  async function copyProfileLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Đã sao chép liên kết profile.");
    } catch {
      showToast("Không thể sao chép tự động. Hãy chép đường dẫn trên thanh địa chỉ.");
    }
  }

  elements.entry.addEventListener("click", async () => {
    body.classList.add("has-entered");
    body.classList.remove("is-locked");
    if (musicController?.available && !elements.playButton.disabled) {
      try {
        await musicController.play();
      } catch {
        syncAudioButtons(false);
      }
    }
  });

  elements.playButton.addEventListener("click", toggleAudio);
  elements.soundToggle.addEventListener("click", toggleAudio);
  elements.shareButton.addEventListener("click", copyProfileLink);

  applyConfig();
  startTypewriter();
  setupVisitsAndClock();
  setupCardTilt();
  setupCursor();
  setupParticles();
})();
