(function () {
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');
  const videoPlayer = document.getElementById('video-player');
  const videoThumbs = document.querySelectorAll('.video-thumb');

  function loadVideo(src) {
    if (!videoPlayer || !src) return;

    videoPlayer.innerHTML = '';

    const isYouTube =
      src.includes('youtube.com') || src.includes('youtu.be');
    const isGoogleDrive = src.includes('drive.google.com');

    if (isYouTube) {
      const videoId = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?#]+)/)?.[1];
      if (videoId) {
        const iframe = document.createElement('iframe');
        iframe.src =
          'https://www.youtube.com/embed/' +
          videoId +
          '?autoplay=1';
        iframe.allow =
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        videoPlayer.appendChild(iframe);
      }
    } else if (isGoogleDrive) {
      const fileId = src.match(/\/d\/([^/]+)/)?.[1];
      if (fileId) {
        const iframe = document.createElement('iframe');
        iframe.src = 'https://drive.google.com/file/d/' + fileId + '/preview?autoplay=1';
        iframe.allow = 'autoplay';
        videoPlayer.appendChild(iframe);
      }
    } else {
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      videoPlayer.appendChild(video);
    }
  }

  // 초기화: 첫 번째 영상 플레이어에 로드
  const firstThumb = videoThumbs[0];
  if (firstThumb) {
    firstThumb.classList.add('active');
    loadVideo(firstThumb.getAttribute('data-src'));
  }

  videoThumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      const src = this.getAttribute('data-src');
      videoThumbs.forEach(function (t) {
        t.classList.remove('active');
      });
      this.classList.add('active');
      loadVideo(src);
    });
  });

  // 프로필 썸네일 클릭 시 미리보기 업데이트
  const profilePreview = document.getElementById('profile-preview');
  const profileThumbs = document.querySelectorAll('.profile-thumb');
  if (profilePreview && profileThumbs.length) {
    const previewImg = profilePreview.querySelector('img');
    profileThumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        const src = this.getAttribute('data-src');
        if (previewImg && src) {
          previewImg.src = src;
          previewImg.alt = this.querySelector('img')?.alt || '황영선 프로필';
        }
        profileThumbs.forEach(function (t) {
          t.classList.remove('active');
        });
        this.classList.add('active');
      });
    });
  }

  // 사진 썸네일 클릭 시 미리보기 업데이트
  const photoPreview = document.getElementById('photo-preview');
  const photoThumbs = document.querySelectorAll('.photo-thumb');
  if (photoPreview && photoThumbs.length) {
    const previewImg = photoPreview.querySelector('img');
    photoThumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        const src = this.getAttribute('data-src');
        if (previewImg && src) {
          previewImg.src = src;
          previewImg.alt = this.querySelector('img')?.alt || '포트폴리오 사진';
        }
        photoThumbs.forEach(function (t) {
          t.classList.remove('active');
        });
        this.classList.add('active');
      });
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const targetId = this.getAttribute('data-tab');

      tabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');

      contents.forEach(function (content) {
        if (content.id === targetId) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });
})();
