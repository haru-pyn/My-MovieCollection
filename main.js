new Vue({
    el: '#mo-co',
    data:{
        newTitle:'',
        newCategory:'',
        newMemo:'',
        uniqueKey:0,
        Movies:[]
    },
    mounted(){
        this.getUniqueKey()
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
            this.initTitle;
            this.initMemo;
        },
        initTitle: function(){
            this.newTitle = '';
        },
        initMemo: function(){
            this.newMemo = '';
        },
        
    }
})