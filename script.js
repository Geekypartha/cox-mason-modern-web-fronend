function init(){
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
init();




//dot moves with cursor
var cursor = document.querySelector("#cursor");
var main = document.querySelector("#main");
document.addEventListener("mousemove",function(dets){
   cursor.style.left =dets.x+ 10 + "px";
   cursor.style.top =dets.y+ 10 + "px";
})

//cursor when enters in video
var videocursor = document.querySelector("#videocursor");
var video = document.querySelector("video");

video.addEventListener("mouseenter", function(dets){
  cursor.innerHTML= "Tap to open";
    Object.assign(cursor.style,{
      width:"130px",
      height:"30px",
      borderRadius:"50px",
      textAlign:"center",
      color: "white",
      backgroundColor:"#0f0d0d8f",
      border: "1px solid #dadada",
      padding:"5px "
    });

});

//cursor when leaves video
video.addEventListener("mouseleave", function(dets){
  cursor.innerHTML="";
  Object.assign(cursor.style,{
    width:"",
    height:"",
    borderRadius:"",
    textAlign:"",
    color: "",
    backgroundColor:"",
    border: "",
    padding:""
  });
});



// word by word annimation
let typeSplit = new SplitType('.page1 h1', {
  types: 'chars',
  
})
let typeSplit2 = new SplitType('.page1 h2',{
  types:'chars'
})

gsap.from('.char', {
  y: '110%',
  opacity: 1,
  rotationZ: '100',
  duration: 0.5,
  ease:'sine.out',
  stagger: 0.1,
  
})


var tl = gsap.timeline({
  scrollTrigger:{
    trigger: ".page1 h1",
    scroller: "#main",
    start: "top 30%",
    end:"top 0",
    scrub:3
  }

});
var tl2 = gsap.timeline({
  scrollTrigger:{
    trigger: ".page1 h2",
    scroller: "#main",
    start: "top -110%",
    end:"top -130%",
    scrub:3
  }

});
var tl3 = gsap.timeline({
  scrollTrigger:{
    trigger: ".page1 h1",
    scroller: "#main",
    start: "top -480%",
    end:"top -510%",
    scrub:3
  }

});
//page1 headings annimation
tl.to(".page1 h1",{
  x:-100,
  duration: 1,
},"anim");
tl.to(".page1 h2",{
  x:100,
  duration: 1,
},"anim");

//video width change
tl.to(".page1 video",{
  width:"90%"
},"anim");

//page 2 bg color change
tl2.to("#main",{
  backgroundColor:"#fff"
});
//page3 bg color change
tl3.to("#main",{
  backgroundColor:"#0f0d0d"
});

//5th page clients
var boxes = document.querySelectorAll(".box")
boxes.forEach(function(elem){
  elem.addEventListener("mouseenter",function(){
    var att = elem.getAttribute("data-image");
    cursor.style.width="480px"
    cursor.style.height="370px"
    cursor.style.backgroundColor="none"
    cursor.style.borderRadius="0"
    cursor.style.mixBlendMode ="none"
    cursor.style.zIndex ="1000"
    cursor.style.backgroundImage =`url(${att})`//template literals
  });
  elem.addEventListener("mouseleave",function(){
    var att = elem.getAttribute("data-image");
    cursor.style.width="20px"
    cursor.style.height="20px"
    cursor.style.backgroundColor="#edbfff"
    cursor.style.borderRadius="50%"
    cursor.style.mixBlendMode ="difference"
    cursor.style.zIndex ="999"
    cursor.style.backgroundImage =`none`//template literals
  });
});

//sherry js
Shery.imageEffect(".page1video", {
  style: 4,
  debug: true,
  gooey: true,
});

