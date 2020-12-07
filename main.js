const audioDb = 'https://www.theaudiodb.com/api/v1/json/1/';
const searchAlbums = audioDb + 'searchalbum.php';
const albumTracks = audioDb + 'track.php';
const defaultCover = 'img/cover_not_available.png'

var app = new Vue({
    el : '#root',

    data : {
        searched : '',
        albumsFound : [],
        currentAlbum : {
            index : undefined,
            tracks : []
        }
    },

    methods : {
        startSearch() {
            if (this.searched != '') {
                let searched = this.searched;
                this.searched = '';
                axios
                    .get(searchAlbums, {
                        params : {
                            s : searched
                        }
                    })
                    .then((response) => {
                        this.albumsFound = response.data.album;
                        this.currentAlbum.index = undefined;
                        this.currentAlbum.tracks = [];
                    });
            }
        },

        getCover(album) {
            return album.strAlbumThumb ? album.strAlbumThumb : defaultCover;
        },

        getTracks(index) {
            this.currentAlbum.index = index;
            let albumId = this.albumsFound[index].idAlbum;
            axios
                .get(albumTracks, {
                    params : {
                        m : albumId
                    }
                })
                .then((response) => {
                    this.currentAlbum.tracks = response.data.track;
                });
        },

        millisToMinutesAndSeconds(millis) {
            let minutes = Math.floor(parseInt(millis) / 60000);
            let seconds = ((parseInt(millis) % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        },

        isDurationAvailable(time) {
            return parseInt(time) != 0;
        }

    }
});
