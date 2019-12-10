(function (){
    function TurnPage(options,wrap){
        this.wrap = wrap;
        this.nowPage = options.nowPage || 1;
        this.allPage = options.allPage || 1;
        this.callback = options.callback || function(){}

        this.init = function(){
            this.fillHTML();
            this.initCss();
            this.bindEvent();
        }
    }
    TurnPage.prototype.fillHTML = function(){
        $(this.wrap).empty()
        //
        var oUl = $('<ul class="my-turn-page"></ul>');
        //插入上一页
        if(this.nowPage > 1){
            $('<li class="prev">上一页</li>').appendTo(oUl);
        }
        //插入第一页
        $('<li class="num">1</li>').appendTo(oUl).addClass(this.nowPage == 1 ? 'current-page':'');
        if(this.nowPage - 2 > 2){
            $('<span>...</span>').appendTo(oUl);
        }
        //渲染中间五页
        for(var i =this.nowPage - 2 ; i <= this.nowPage + 2 ; i++){
            if(i > 1 && i <this.allPage){
                $('<li class="num"</li>').text(i).addClass(this.nowPage == i ? 'current-page':'').appendTo(oUl);
            }
        }
        if(this.nowPage + 2 < this.allPage - 1){
            $('<span>...</span>').appendTo(oUl);
        }
        if(this.allPage > 1){
            $('<li class="num"></li>').text(this.allPage).addClass(this.nowPage == this.allPage ? 'current-page':'').appendTo(oUl);
        }
        

        //插入下一页
        if(this.nowPage < this.allPage){
            $('<li class="prev">下一页</li>').appendTo(oUl)
        }
        $(this.wrap).append(oUl)

    }
    TurnPage.prototype.initCss = function(){
        $('*',this.wrap).css({
            listStyle:'none',
            margin:0,
            padding:0,
        });
        $('.my-turn-page',this.wrap).css({
            overflow:"hidden"
        }).find('li').css({
            float:'left',
            padding:'5px 10px',
            border:'1px solid #ddd',
            margin:5,
            cursor:'pointer'
        }).end().find('span').css({
            float:'left'
        }).end().find('.current-page').css({
            backgroundColor:'rgb(66,139,202)',
            color:'#fff'
        })
    }
    TurnPage.prototype.bindEvent = function(){
        var self = this;
        $('.my-turn-page' , this.wrap).on('click' , '.num' , function(){
            var page = Number($(this).text());
            self.nowPage = page;
            self.init();
            self.callback(self.nowPage);
        }).on('click' , '.prev' , function(){
            self.nowPage --;
            self.init();
            self.callback(self.nowPage)
        }).on('click' , '.next' , function(){
            self.nowPage ++;
            self.init();
            self.callback(self.nowPage)
        })
    }
    $.fn.extend({
        turnpage:function(options){
            var page = new TurnPage(options,this);
            page.init();
        }
    })
}())

