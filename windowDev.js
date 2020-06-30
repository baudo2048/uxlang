export default function functionName() 
{
var root = document.createElement('div')
root.style.display='flex'
root.style.position='fixed'
root.style.width='500px'
root.style.height='400px'
root.style.top='100px'
root.style.left='300px'
root.style.flexDirection='column'
root.style.border='3px solid black'
root.style.overflow='none'
root.style.zIndex='100'
root.style.boxSizing='border-box'
var topBar = document.createElement('div')
topBar.style.display='flex'
topBar.style.justifyContent='space-between'
topBar.style.alignItems='center'
topBar.style.backgroundColor='#f3f3f3'
var div_17 = document.createElement('div')
div_17.style.display='flex'
var windowImgMove = document.createElement('img')
windowImgMove.src= './img/baseline_open_with_black_18dp.png'
var imgCode = document.createElement('img')

div_17.appendChild(windowImgMove)

imgCode.src= './img/baseline_code_black_18dp.png'
var imgScript = document.createElement('img')

div_17.appendChild(imgCode)

imgScript.src= './img/baseline_description_black_18dp.png'
var imgSaveAlt = document.createElement('img')

div_17.appendChild(imgScript)

imgSaveAlt.src= './img/baseline_save_black_18dp.png'
var imgPreview = document.createElement('img')

div_17.appendChild(imgSaveAlt)

imgPreview.src= './img/baseline_preview_black_18dp.png'
var div_29 = document.createElement('div')

div_17.appendChild(imgPreview)


topBar.appendChild(div_17)

div_29.style.display='flex'
div_29.style.flexGrow='1'
var fileName = document.createElement('input')
fileName.style.width='100%'
fileName.style.height='30px'
fileName.style.marginLeft='10px'
fileName.style.marginRight='10px'
fileName.style.fontSize='large'
fileName.type= 'text'
fileName.value= 'fileName.ux'
var div_40 = document.createElement('div')

div_29.appendChild(fileName)


topBar.appendChild(div_29)

div_40.style.display='flex'
var windowImgMaximize = document.createElement('img')
windowImgMaximize.src= './img/baseline_aspect_ratio_black_18dp.png'
var windowImgClose = document.createElement('img')

div_40.appendChild(windowImgMaximize)

windowImgClose.src= './img/baseline_highlight_off_black_18dp.png'
var contentArea = document.createElement('div')

div_40.appendChild(windowImgClose)


topBar.appendChild(div_40)


root.appendChild(topBar)

contentArea.style.display='none'
contentArea.style.flexGrow='1'
contentArea.style.backgroundColor='white'
var codeArea = document.createElement('div')

root.appendChild(contentArea)

codeArea.style.display='flex'
codeArea.style.flexGrow='1'
var textareaCode = document.createElement('textarea')
textareaCode.style.resize='none'
textareaCode.style.width='100%'
textareaCode.style.height='100%'
textareaCode.style.fontFamily='Consolas, "Courier New", monospace'
textareaCode.style.fontSize='14px'
textareaCode.style.backgroundColor='black'
textareaCode.style.color='white'
var textareaScript = document.createElement('textarea')

codeArea.appendChild(textareaCode)

textareaScript.style.resize='none'
textareaScript.style.width='100%'
textareaScript.style.height='100%'
textareaScript.style.fontFamily='Consolas, "Courier New", monospace'
textareaScript.style.fontSize='14px'
textareaScript.style.backgroundColor='black'
textareaScript.style.color='white'
textareaScript.style.display='none'
var resizer = document.createElement('div')

codeArea.appendChild(textareaScript)


root.appendChild(codeArea)

resizer.style.position='absolute'
resizer.style.width='3px'
resizer.style.height='3px'
resizer.style.borderRadius='50%'
resizer.style.border='3px solid #4286f4'
resizer.style.right='-5px'
resizer.style.bottom='-5px'
resizer.style.cursor='nwse-resize'

root.appendChild(resizer)

textareaCode.onkeydown = ev => {
    if(ev.keyCode == 9){
        ev.preventDefault()
        //prendo il caret e aggiungo quattro spazi
        const caretPos = textareaCode.selectionStart
        const startCode1 = 0
        const strFirstLen = (textareaCode.value.substr(0, caretPos)).lenght
        const strLen = (textareaCode.value).lenght
        const strSecondLen = strLen-strFirstLen
        textareaCode.value = textareaCode.value.substr(0, caretPos) + "    " + textareaCode.value.substr(caretPos, strSecondLen)
        textareaCode.selectionStart = textareaCode.selectionStart + 4
    } 
}

windowImgClose.onmouseover = ev => {
    windowImgClose.style.filter = 'saturate(8)';
}

windowImgClose.onclick = ev => {
    root.style.display = 'none';
}

windowImgMaximize.onclick = ev => {
    root.style.left = '0px';
    root.style.top = '0px';
    root.style.width = document.body.clientWidth + 'px';
    root.style.height = document.body.clientHeight + 'px';
}

imgCode.onclick = ev => {
    codeArea.style.display = 'flex'
    textareaCode.style.display = 'block'
    textareaScript.style.display = 'none'
    contentArea.style.display = 'none'
}

imgScript.onclick = ev => {
    codeArea.style.display = 'flex'
    textareaCode.style.display = 'none'
    textareaScript.style.display = 'block'
    contentArea.style.display = 'none'
}

var count = 0
imgPreview.onclick = ev => {
    count++
    codeArea.style.display = 'none'
    
    var code =document.parser('functionName', textareaCode.value, textareaScript.value)
/*     var script = document.createElement('script')
    script.append(document.createTextNode(code)) */

    // DA OTTIMIZZARE ATTACCA UNO SCRIPT PER OGNI COMPILAZIONE
    //document.body.appendChild(script)

    fetch('/saveGenScript', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        mode: 'same-origin', 
        cache: 'no-cache', 
        body: JSON.stringify({fileName: fileName.value, code: code})
    }).then(res => {
        console.log('saved.')
        //scriptArea.innerHTML = ''
        //scriptArea.append(document.createTextNode(code))
        
        var fileToImport = fileName.value.substr(0,fileName.value.length-3)
        import('./'+fileToImport+'.js?'+count).then(module => {
            var dom = module.default()
            contentArea.style.display = 'flex'
            contentArea.innerHTML = ''
            contentArea.append(dom)
        })
    })




    //document.eventManager('windowDev.imgPreviewClicked', {fileName: "test.ux", code: textareaCode.value})
}

imgSaveAlt.onhover = ev => {
    
}

imgSaveAlt.onclick = ev => {
    imgSaveAlt.style.backgroundColor = 'red'
    fetch('/saveAs', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        mode: 'same-origin', 
        cache: 'no-cache', 
        body: JSON.stringify({fileName: fileName.value, code: textareaCode.value, scriptCode: textareaScript.value})
    }).then(res => {
        console.log('saved.')
    })
}

function makeResizableDiv(div, resizer) {
    const element = div;
    const currentResizer = resizer;

    currentResizer.addEventListener('mousedown', function(e) {
        e.preventDefault();
        document.body.addEventListener('mousemove', resize);
        document.body.addEventListener('mouseup', stopResize);
    });
    
    function resize(e) {
        element.style.width = e.pageX - element.getBoundingClientRect().left + 'px';
        element.style.height = e.pageY - element.getBoundingClientRect().top + 'px';
    }
    
    function stopResize() {
        document.body.removeEventListener('mousemove', resize);
    }
    
}
  
makeResizableDiv(root, resizer);

function makeMovableDiv(div, resizer){

    var prevX = 0;
    var prevY = 0;
    var initX = 0;
    var initY = 0;

    const element = div;
    const currentResizer = resizer;

    currentResizer.addEventListener('mousedown', function(e){
        e.preventDefault();

        prevX = e.clientX;
        prevY = e.clientY;
    
        var rect = root.getBoundingClientRect();
    
        initX = rect.x;
        initY = rect.y;

        document.body.addEventListener('mousemove', move);
        document.body.addEventListener('mouseup', stopMove);
    });

    function move(e) {
        let newX = prevX - e.clientX;
        let newY = prevY - e.clientY;

        root.style.left = initX - newX +'px';
        root.style.top = initY - newY +'px';
    }
    
    function stopMove() {
        document.body.removeEventListener('mousemove', move);
    }
}

makeMovableDiv(root, windowImgMove);

  
root.contentArea = contentArea

var v = 0
function updateContent (ev){

/*     (async () => {
        const myModule = await import('./test_0.js');

        contentArea.innerHTML = ''
        contentArea.append(myModule.default())
        contentArea.style.display = 'block'

    })(); */
    console.log('importing...')
    import('./test.js?query='+v).then(module => {
        contentArea.innerHTML = ''
        contentArea.append(module.default())
        contentArea.style.display = 'block'
    }).catch((err)=>{
        console.log('catch - ' + err)
    })

    v++

}

document.registerDefault(updateContent)

document.register('showFile', ev=>{
    count++
    fetch('/file', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({fileName: ev.detail.fileName})
      }).then(res=>{
        return res.json()
    }).then(data=>{
        textareaCode.value = data.code
        textareaScript.value = data.scriptCode
        fileName.value = ev.detail.fileName
        
        var fileToImport = fileName.value.substr(0,fileName.value.length-3)
        import('./'+fileToImport+'.js?'+count).then(module => {
            var dom = module.default()
            contentArea.innerHTML = ''
            contentArea.append(dom)
        })
        
    })
})
return root
}
