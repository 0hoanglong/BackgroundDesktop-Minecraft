document.addEventListener('DOMContentLoaded', () => {
    const videoSources = [
        'media/the-beacon.mp4',
        'media/the-conduit.mp4',
        'media/the-end-crystal.mp4',
        'media/the-respawn-anchor.mp4',
    ];

    const players = document.querySelectorAll('.video-player');
    if (players.length < 2) {
        console.error("This script requires at least two <video> elements for cross-fading.");
        return;
    }

    let currentVideoIndex = 0;
    // Giả sử player[0] đang hoạt động ban đầu (dựa trên class 'active' trong HTML)
    let activePlayer = players[0];
    let inactivePlayer = players[1];

    // Hàm được gọi khi video hiện tại kết thúc
    function onVideoEnded() {
        // Tăng chỉ số video và quay vòng lại nếu cần
        currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;

        // Đặt nguồn cho player không hoạt động và tải nó
        inactivePlayer.src = videoSources[currentVideoIndex];
        inactivePlayer.load();
    }

    // Hàm được gọi khi video tiếp theo đã sẵn sàng để phát
    function onNextVideoReady() {
        // Thực hiện chuyển cảnh mờ dần (cross-fade)
        activePlayer.classList.remove('active');
        inactivePlayer.classList.add('active');
        inactivePlayer.play();

        // Hoán đổi vai trò của các player
        [activePlayer, inactivePlayer] = [inactivePlayer, activePlayer];
    }

    // Gắn các trình lắng nghe sự kiện
    players.forEach(player => {
        player.addEventListener('ended', () => {
            if (player === activePlayer) onVideoEnded();
        });
        player.addEventListener('canplay', () => {
            if (player === inactivePlayer) onNextVideoReady();
        });
    });

    // Thiết lập ban đầu: đặt nguồn cho video đầu tiên (nó sẽ tự phát do thuộc tính 'autoplay')
    players[0].src = videoSources[currentVideoIndex];
});