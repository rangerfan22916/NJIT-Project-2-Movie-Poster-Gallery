const vue_app = Vue.createApp({
    data() {
        return {
            title: "Drew's Top 8 Movies",
            owner: "Drew",
            github: "https://github.com/rangerfan22916",
            movies: []
        };
    },
    created() {
        fetch('movies.json')
        .then(response => response.json())
        .then(json => {
            
            this.movies = json.map(movie => ({
                ...movie,
                showCast: false,
                posterindex: 0 
            }));
        })
        .catch(err => console.error("Error loading JSON:", err));
    },
    methods: {
        getMonthText(dateArray) {
            const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            return `${months[dateArray[1]-1]} ${dateArray[2]}, ${dateArray[0]}`;
        },
        timeText(minutes) {
            const h = Math.floor(minutes / 60);
            const m = minutes % 60;
            return `${h}h ${m}m`;
        },
        like(index) {
            this.movies[index].likes++;
        },
        dislike(index) {
            this.movies[index].dislikes++;
        },
        posterClick(index) {
            const movie = this.movies[index];
            movie.posterindex = (movie.posterindex + 1) % movie.posters.length;
        },
        toggleCast(index) {
            this.movies[index].showCast = !this.movies[index].showCast;
        }
    }
});

vue_app.mount("#vue_app");
