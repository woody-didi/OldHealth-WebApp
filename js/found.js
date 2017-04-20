(function () {
    //build pages
    document.getElementById("share").innerHTML=document.getElementById("foundTmp").innerHTML;

})();

function foundAnimate(index){
    var items = document.getElementById("found_items");
    var aItem = items.getElementsByTagName("div");
    items.style.transform ='translateX('+-72 * index+'vw) ';
    addClass(aItem, index);
}


