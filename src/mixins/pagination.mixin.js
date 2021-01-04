import _ from 'lodash'

export default {
    data(){
        return{
            page:+this.$route.query.page ||1,
            pageSize:5,
            pageCount:0,
            allitems:[],
            items:[]
        }
    },

    methods:{
        pagechangehandler(page){
            this.$router.push(`${this.$route.path}?page=${page}`)
            this.items=this.allitems[page-1] || this.allitems[0]
          
        },
            setupPagination(allitems){
                this.allitems=_.chunk(allitems,this.pageSize)
                this.pageCount=_.size(this.allitems)
                this.items=this.allitems[this.page-1] || this.allitems[0]
            }

    }
}