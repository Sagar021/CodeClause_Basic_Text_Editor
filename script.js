function formatDoc(cmd, value=null){
    if(value){
        document.execCommand(cmd, false, value);
    }
    else{
        document.execCommand(cmd);
    }
}

function addLink(){
    const URL = prompt("Enter the URL");
    document.execCommand('createLink',false, URL);
}


const content = document.getElementById('content');

content.addEventListener('mouseenter',function(){
    const a = content.querySelectorAll('a'); 
    a.forEach(item=>{
        item.addEventListener('mouseenter',function(){
            content.setAttribute('contenteditable',false);
            item.target = '_blank';
        })
        item.addEventListener('mouseleave',function(){
            content.setAttribute('contenteditable',true);
        })
    })
})

const filename = document.getElementById('filename');
var opt =  {
    margin : 1,
};


function fileHandle(value){
    if(value === 'new'){
        content.innerHTML = '';
        filename.value = 'untitled';
    }
    else if(value === 'open'){

    }
    else if(value === 'txt'){
        const blob = new Blob([content.innerText]);
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename.value}.txt`;
        link.click();
    }
    else if(value === 'pdf'){
        html2pdf().set(opt).from(content).save(filename.value);
    }
}