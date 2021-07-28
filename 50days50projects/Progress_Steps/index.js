const progress = document.getElementById('progress'),
      pre = document.getElementById('pre'),
      next = document.getElementById('next'),
      circles = [].slice.call(document.getElementsByClassName('circle'));

// 标记当前节点
let currentActive = 1;

next.addEventListener('click', () => {
    currentActive++;
    if(currentActive > circles.length){
        currentActive = circles.length;
    }
    update();
})

pre.addEventListener('click', () => {
    currentActive--;
    if(currentActive < 1){
        currentActive = 1;
    }
    update();
})

function update(){
    circles.forEach((item, idx) => {
        if(idx < currentActive){
            item.classList.add('active');
        }else{
            item.classList.remove('active');
        }
    })
    
    progress.style.width = (currentActive - 1) / (circles.length - 1) * 100 + '%';

    if(currentActive === 1){
        pre.disabled = true;
    }else if(currentActive === circles.length){
        next.disabled = true;
    }else{
        pre.disabled = false;
        next.disabled = false;
    }
}