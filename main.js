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
        }
    }
});
