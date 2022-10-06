new Vue({
    el: '#mo-co',
    data:{
        newTitle:'',
        newCategory:'',
        newMemo:'',
        uniqueKey:0,
        Movies:JSON.parse(localStorage.getItem('Movies')) || []
    },
    mounted(){
        this.getUniqueKey()
    },
    computed: {
        filterByCategory: function(){
            return this.Movies.filter(
                (movie) => !movie.category.indexOf(this.newCategory)
            );
        }
    },
    methods:{
        getUniqueKey: function(){
            if(this.Movies.length === 0){
                return
            }

            let maxUniqueKey = 0
            this.Movies.forEach(function(movie){
                if(maxUniqueKey < movie.id){
                    maxUniqueKey = movie.id
                }
            });
            this.uniqueKey = maxUniqueKey
        },
        addMovie: function(){
            if (this.newTitle === '')return;
            this.Movies.push(
                {
                    title: this.newTitle,
                    category: this.newCategory,
                    memo: this.newMemo,
                    id: ++this.uniqueKey
                }
            );
            this.initTitle();
            this.initMemo();
            this.setMovies();
        },
        initTitle: function(){
            this.newTitle = '';
        },
        initMemo: function(){
            this.newMemo = '';
        },
        DeleteMovies: function(movie){
            var index = this.Movies.indexOf(movie)
            this.Movies.splice(index,1)
            this.setMovies();
        },
        setMovies: function(){
            localStorage.setItem('Movies', JSON.stringify(this.Movies));
        }
    }
})