const controls = document.querySelectorAll(".controls")

const leftBtns = document.querySelectorAll(".btn.left");

const rightBtns = document.querySelectorAll(".btn.right");

const imagesContainers = document.querySelectorAll(".images");

let images;

let slides;

let slidesObj={};

let slideFloader;

function init(){
  controls.forEach(control => {
    control.addEventListener("click", (e) => {
        if(!slidesObj.hasOwnProperty("control")||slidesObj.control != control){
        images = control.closest(".slider").querySelector(".images")
        slides = document.querySelectorAll(".slide")
        slideFloader = images.children[0].src.split("/");
        slideFloader = slideFloader[slideFloader.length-2]
        slidesObj = {
          current:images.children[1],
          leftItem: images.children[0],
          rightItem: images.children[2],
          control: control,
          move: "none",
          slideFloader: slideFloader
        }
        e.target.click()
      }
    })
  })
}

init()

let isReady = true;

function getIndex(path,moving){
  let index = path.split("/")
  let slideFloader = index[index.length-2]
  index = index[index.length-1].split(".")[0].replace("paint","")
  if(index == 0 && moving=="left" && slideFloader=="slider1"){
    index = 42
  }
  else if(index == 0 && moving=="left" && slideFloader=="slider2"){

    index = 10
  }
  else if(index>40 && moving == "right" && slideFloader=="slider1"){
    index = -1
  }
  else if(index>8 && moving == "right" && slideFloader=="slider2"){
    index = -1
  }
  return +index
}

function hideImages(){
  images.classList.add("hide")
}

function leftSwipe(e){
  if(isReady && slidesObj.control == e.target.closest(".controls")){
    slidesObj.current = images.children[1]
    slidesObj.leftItem = images.children[0];
    slidesObj.rightItem = images.children[2];
    slidesObj.move = "left"
    hideImages()
    isReady = false
  }
}

function rightSwipe(e){
  if(isReady && slidesObj.control == e.target.closest(".controls")){
    slidesObj.current = images.children[1]
    slidesObj.leftItem = images.children[0];
    slidesObj.rightItem = images.children[2];
    slidesObj.move = "right"
    hideImages()
    isReady = false
  }
}

leftBtns.forEach(leftBtn => {
  leftBtn.addEventListener("click", leftSwipe);
})

rightBtns.forEach(rightBtn => {
  rightBtn.addEventListener("click", rightSwipe);
})

imagesContainers.forEach(images => {
  images.addEventListener("animationstart", async function(){
    setTimeout(()=>{
      let cur = slidesObj.current.src;
      const img = new Image();
      if(slidesObj.move=="left"){
        slidesObj.current.src = slidesObj.leftItem.src
        slidesObj.rightItem.src = cur
        img.src = `https://raw.githubusercontent.com/lamp4kad/shoolproject/master/assets/img/main/inter/${slidesObj.slideFloader}/paint${getIndex(slidesObj.current.src, "left")-1}.webp`
        img.onload =() => {
          slidesObj.leftItem.src = img.src   
        }
      }
      else if(slidesObj.move=="right"){
        slidesObj.current.src = slidesObj.rightItem.src
        slidesObj.leftItem.src = cur
        img.src = `https://raw.githubusercontent.com/lamp4kad/shoolproject/master/assets/img/main/inter/${slidesObj.slideFloader}/paint${getIndex(slidesObj.current.src, "right")+1}.webp`
        img.onload =() => {
          slidesObj.rightItem.src = img.src   
        }
      }
    },200)
  })
  images.addEventListener("animationend", function(){
    images.classList.remove("hide")
    isReady = true
  })
})



