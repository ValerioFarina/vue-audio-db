const searchArtist = 'https://www.theaudiodb.com/api/v1/json/1/searchalbum.php';

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
        }
    }
});
