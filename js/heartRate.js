(function () {
    //build pages
    document.getElementById("heartRate").innerHTML=document.getElementById("heartRateTemp").innerHTML;
    //draw chart

    var tips=document.getElementById("tips");
    var chart=document.getElementById("chart");
    chart.onclick= function (e) {
        e=e||window.event;
        var x= e.offsetX;
        var y= e.offsetY;
        tips.style.left=x+"px";
        tips.style.top=y+"px";
        tips.className="tips show";
        tips.style.margin="-22px 0 0 -45px";
        e.cancelBubble=true;
    };
    document.onclick= function () {
        tips.className="tips hide";
    };
    drawHeartRate();
})();

//chart心率图
function drawHeartRate(){
    var cvs = document.getElementById("cvs");
    var ctx = cvs.getContext("2d");
    var W = 0.94 * window.innerWidth;
    var w =9.05/ 100 *W ;

    //heart data
    var data = [];
    for(var a=0;a<12;a++){
        var b=parseInt(Math.random()*25+75);
        data.push(b)
    }

    ctx.clearRect(0, 0, W, 120);
    ctx.fillStyle = "#fff";
    ctx.fill();

    //linearGradient
    ctx.beginPath();
    ctx.strokeStyle = "transparent";
    var Y0 = (120 - data[0]) / 80;
    ctx.moveTo(0, Y0 * 120);
    for (i = 0; i < data.length; i++) {
        Y = (120 - data[i]) / 80;
        nextY = (120 - data[i + 1]) / 80;
        ctx.lineTo((i + 1) * w, nextY * 120);
    }
    ctx.lineTo(12 * w, 120);
    ctx.lineTo(0, 120);
    ctx.closePath();
    var grd = ctx.createLinearGradient(0, 0, 0, 120);
    grd.addColorStop(0, "#abe2f1");
    grd.addColorStop(1, "#fff");
    ctx.fillStyle = grd;
    ctx.fill();

    //table
    for (var y = 0; y < 4; y++) {
        for (var x = 0; x < 12; x++) {
            //console.log(x);
            ctx.beginPath();
            ctx.rect(x * w, y * 30, w, 30);
            ctx.strokeStyle = "#d4d2d1";
            ctx.stroke();
        }
    }

    //dot
    ctx.strokeStyle = "#01CCE7";
    for (var i = 0; i < data.length; i++) {
        var Y = (120 - data[i]) / 80;
        var nextY = (120 - data[i + 1]) / 80;
        ctx.beginPath();
        ctx.arc(i * w, Y * 120, 2.5, 0, Math.PI * 2);
        ctx.lineTo((i + 1) * w, nextY * 120);
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }

}
