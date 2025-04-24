function builder(mode, content){
    let curContent = '';
    switch(mode){
        case 'modal':
            curContent = content;
            return curContent;
        case 'feedback':
            
            return;
        default:
            break;        

    }
}

export default builder;