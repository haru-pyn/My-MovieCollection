const StarRating = window['VueStarRating'].default;

new Vue({
    el: '#mo-co',
    components:{
        'star-rating':StarRating
    },
    data:{
        home: true,
        chart: false,
        list: false,
        newDate:'',
        newTitle:'',
        newCategory:'',
        newMemo:'',
        rating:0,
        uniqueKey:0,
        Movies:JSON.parse(localStorage.getItem('Movies')) || [],
        newItem:'',
        randomItem:'',
        Items:JSON.parse(localStorage.getItem('Items')) || [],
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
                    date: this.newDate,
                    title: this.newTitle,
                    category: this.newCategory,
                    memo: this.newMemo,
                    id: ++this.uniqueKey,
                    star: this.rating
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
        },
        titleSort: function(){
            this.Movies.sort(function(a,b){
                if(a.title > b.title) {
                    return 1;
                } else {
                    return -1;
                }
            });
        },
        newAddSort: function(){
            this.Movies.sort(function(a,b){
                if(a.id > b.id) {
                    return -1;
                } else {
                    return 1;
                }
            });
        },
        oldAddSort: function(){
            this.Movies.sort(function(a,b){
                if(a.id > b.id) {
                    return 1;
                } else {
                    return -1;
                }
            });
        },
        watchHome: function () {
            this.home = true;
            this.chart = false;
            this.list = false;
        },
        watchChart: function () {
            this.home = false;
            this.chart = true;
            this.list = false;

            this.renderBarChart();
        },
        watchList: function () {
            this.home = false;
            this.chart = false;
            this.list = true;
        },
        //グラフ↓
        renderBarChart: function(){
            var categorys = [];

            let countAction = 0;
            this.Movies.filter((movie)=>{if (movie.category === 'action'){countAction += 1;}});
            categorys.push(countAction);

            let countHS =0;
            this.Movies.filter((movie)=>{if (movie.category === 'horrorSuspence'){countHS += 1;}});
            categorys.push(countHS);

            let countlove =0;
            this.Movies.filter((movie)=>{if (movie.category === 'loveromance'){countlove += 1;}});
            categorys.push(countlove);

            let countSF =0;
            this.Movies.filter((movie)=>{if (movie.category === 'sfFantasy'){countSF += 1;}});
            categorys.push(countSF);

            let countAnime =0;
            this.Movies.filter((movie)=>{if (movie.category === 'anime'){countAnime += 1;}});
            categorys.push(countAnime);

            Vue.component('bar-chart', {
                extends: VueChartJs.Bar,
                mounted () {
                  this.renderChart({
                    labels: ['action','horrorSuspence','loveromance','sfFantasy','anime'],
                    datasets: [
                      {
                        label: 'Movies',
                        backgroundColor: '#82cddd',
                        data: categorys
                      }
                    ]
                  }, {responsive: true, maintainAspectRatio: false})
                }
            })
        },
        addItem: function(){
            if (this.newItem === '')return;
            this.Items.push(
                {
                    Item: this.newItem,
                }
            );
            this.initItems();
            this.setItems();
        },
        initItems: function(){
            this.newItem = '';
        },
        setItems: function(){
            localStorage.setItem('Items', JSON.stringify(this.Items));
        },
        ranItem: function(){
            this.randomItem = this.Items[Math.floor(Math.random() * this.Items.length)];
        },
        DeleteItems: function(item){
            var index = this.Items.indexOf(item)
            this.Items.splice(index,1)
            this.setItems();
        },
        deleteAlert: function(){
            var result = window.confirm('本当に削除してもよろしいですか');
            if(result){
                this.DeleteMovies();  
            } else {
                ;
            }
        },
        deleteItemAlert: function(){
            var result = window.confirm('本当に削除してもよろしいですか');
            if(result){
                this.DeleteItems();  
            } else {
                ;
            }
        }
    }
})

