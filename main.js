const searchArtist = 'https://www.theaudiodb.com/api/v1/json/1/searchalbum.php';
const defaultCover = 'img/cover_not_available.png'

var app = new Vue({
    el : '#root',

    data : {
        searched : '',
        albumsFound : []
    },

    methods : {
        startSearch() {
            if (this.searched != '') {
                let searched = this.searched;
                this.searched = '';
                axios
                    .get(searchArtist, {
                        params : {
                            s : searched
                        }
                    })
                    .then((response) => {
                        this.albumsFound = response.data.album;
                    });
            }
        },

        getCover(album) {
            return album.strAlbumThumb ? album.strAlbumThumb : defaultCover;
        }
    }
});
