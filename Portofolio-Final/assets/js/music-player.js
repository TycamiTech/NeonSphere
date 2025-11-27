// Music Player Functionality

class MusicPlayer {
    constructor() {
        this.audio = new Audio();
        this.currentSongIndex = 0;
        this.isPlaying = false;
        this.playlist = [];
        this.init();
    }

    init() {
        // Wait for DOM to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Get all song cards and build playlist
        this.buildPlaylist();

        // Create player UI
        this.createPlayerUI();

        // Add event listeners to song cards
        this.attachSongCardListeners();

        // Add audio event listeners
        this.attachAudioListeners();
    }

    buildPlaylist() {
        const songCards = document.querySelectorAll('.song-card');
        this.playlist = Array.from(songCards).map(card => ({
            audio: card.dataset.audio,
            title: card.dataset.title,
            artist: card.dataset.artist,
            cover: card.dataset.cover
        }));
    }

    createPlayerUI() {
        const playerHTML = `
            <div class="music-player-overlay" id="musicPlayerOverlay">
                <div class="music-player">
                    <button class="close-player" id="closePlayer">×</button>
                    
                    <img src="" alt="Album Art" class="player-album-art" id="playerAlbumArt">
                    
                    <div class="player-song-info">
                        <div class="player-song-title" id="playerSongTitle">Song Title</div>
                        <div class="player-song-artist" id="playerSongArtist">Artist Name</div>
                        <div class="player-song-album" id="playerSongAlbum">Album Name</div>
                    </div>
                    
                    <div class="player-progress">
                        <div class="progress-bar" id="progressBar">
                            <div class="progress-fill" id="progressFill"></div>
                        </div>
                        <div class="progress-time">
                            <span id="currentTime">0:00</span>
                            <span id="totalTime">0:00</span>
                        </div>
                    </div>
                    
                    <div class="player-controls">
                        <button class="control-btn" id="prevBtn">⏮</button>
                        <button class="control-btn play-pause-btn" id="playPauseBtn">▶</button>
                        <button class="control-btn" id="nextBtn">⏭</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', playerHTML);

        // Get player elements
        this.overlay = document.getElementById('musicPlayerOverlay');
        this.closeBtn = document.getElementById('closePlayer');
        this.albumArt = document.getElementById('playerAlbumArt');
        this.songTitle = document.getElementById('playerSongTitle');
        this.songArtist = document.getElementById('playerSongArtist');
        this.songAlbum = document.getElementById('playerSongAlbum');
        this.progressBar = document.getElementById('progressBar');
        this.progressFill = document.getElementById('progressFill');
        this.currentTimeEl = document.getElementById('currentTime');
        this.totalTimeEl = document.getElementById('totalTime');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');

        // Add event listeners
        this.closeBtn.addEventListener('click', () => this.closePlayer());
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.prevBtn.addEventListener('click', () => this.playPrevious());
        this.nextBtn.addEventListener('click', () => this.playNext());
        this.progressBar.addEventListener('click', (e) => this.seek(e));

        // Close on overlay click
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.closePlayer();
            }
        });

        // Set initial volume
        this.audio.volume = 0.7;
    }

    attachSongCardListeners() {
        const songCards = document.querySelectorAll('.song-card');
        songCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                this.playSong(index);
            });
        });
    }

    attachAudioListeners() {
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('ended', () => this.playNext());
    }

    playSong(index) {
        this.currentSongIndex = index;
        const song = this.playlist[index];

        // Update UI
        this.albumArt.src = song.cover;
        this.songTitle.textContent = song.title;
        this.songArtist.textContent = song.artist;

        // Get album name from the song card
        const songCard = document.querySelectorAll('.song-card')[index];
        const albumName = songCard.querySelector('.album-name')?.textContent || '';
        this.songAlbum.textContent = albumName;

        // Load and play audio
        this.audio.src = song.audio;
        this.audio.play();
        this.isPlaying = true;
        this.playPauseBtn.textContent = '⏸';

        // Open player
        this.openPlayer();
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.audio.pause();
            this.playPauseBtn.textContent = '▶';
        } else {
            this.audio.play();
            this.playPauseBtn.textContent = '⏸';
        }
        this.isPlaying = !this.isPlaying;
    }

    playNext() {
        this.currentSongIndex = (this.currentSongIndex + 1) % this.playlist.length;
        this.playSong(this.currentSongIndex);
    }

    playPrevious() {
        this.currentSongIndex = (this.currentSongIndex - 1 + this.playlist.length) % this.playlist.length;
        this.playSong(this.currentSongIndex);
    }

    updateProgress() {
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        this.progressFill.style.width = `${progress}%`;
        this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
    }

    updateDuration() {
        this.totalTimeEl.textContent = this.formatTime(this.audio.duration);
    }

    seek(e) {
        const rect = this.progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        this.audio.currentTime = percent * this.audio.duration;
    }

    setVolume(value) {
        this.audio.volume = value / 100;
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    openPlayer() {
        this.overlay.classList.add('active');
    }

    closePlayer() {
        this.overlay.classList.remove('active');
        this.audio.pause();
        this.isPlaying = false;
        this.playPauseBtn.textContent = '▶';
    }
}

// Initialize music player
const musicPlayer = new MusicPlayer();
