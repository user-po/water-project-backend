const getMeta = ()=>{
    return {
    
            createTime:{
                type:Number,
                default:(new Date()).getTime(),
            },
            updatedTime:{
                type:Number,
                default:(new Date()).getTime(),
            },
        
    }
}

const preSave = function(next){
    
    if(this.isNew){
        const ts = Date.now();

        this['meta'].createTime = ts;
        this['meta'].updatedTime = ts;
    }else{
        this['meta'].updatedTime = Date.now();
    }
    next();
}

module.exports = {
    getMeta,
    preSave
}