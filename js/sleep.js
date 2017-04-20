(function () {
    //build pages
    document.getElementById("sleep").innerHTML = document.getElementById("sleepTemp").innerHTML;

    drawSleep1();
    drawSleep2();

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

})();

//chart心率图
function drawSleep1() {
    var cvs = document.getElementById("cvs");
    var ctx = cvs.getContext("2d");
    var winW = window.innerWidth;
    var w = cvs.width;
    var h = cvs.height;

    function drawRest() {
        ctx.beginPath();
        ctx.font = "12px Arial";
        ctx.fillStyle = "#999";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("10h", 9, 15);
        ctx.fillText("8h", 9, 71);

        ctx.strokeStyle = "#dfdfdf";
        ctx.lineWidth = 1;
        for (var i = 0; i < 5; i++) {
            ctx.beginPath();//y
            ctx.moveTo(20, 15 + i * 28);
            ctx.lineTo(w * 0.95, 15 + i * 28);
            ctx.stroke();
        }
    }

    var data = [7.5, 8.2, 7, 8.1, 6.8, 9, 7.5];

    var step = 0;
    var speed = 30;

    function drawLine() {
        ctx.clearRect(0, 0, w, h);
        for (var j = 0; j < data.length; j++) {
            ctx.beginPath();
            ctx.moveTo(55 + 40 * j, 127);
            ctx.lineTo(55 + 40 * j, 127 - (data[j] - 6) / 4 * 127 * step / speed);
            ctx.strokeStyle = "#35d6ec";
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = "#35d6ec";
            ctx.arc(55 + 40 * j, 127 - (data[j] - 6) / 4 * 127 * step / speed, 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    var timer = setInterval(function () {
        step++;
        drawLine();
        drawRest();
        if (step > speed) {
            clearInterval(timer);
        }
    }, speed);


}
function drawSleep2() {
    var cvs = document.getElementById("cvs2");
    var ctx = cvs.getContext("2d");
    var winW = window.innerWidth;
    var w = cvs.width;
    var h = cvs.height;

    //circle
    var data = [5, 2];
    var color = ["#84bd2e", "#dd8c54"];
    var sum = 0;
    var x = -Math.PI / 2;
    var y = -Math.PI / 2;
    for (var j = 0; j < data.length; j++) {
        sum += data[j];
    }
    var step = 0;
    var speed = 30;
    var i = 0;
    var rate = data[0] / sum * step / speed;
    var timer = setInterval(function () {
        step++;
        if (step > 30) {
            i++;
            step = 0;
        }
        rate = data[i] / sum * step / speed;
        switch (i) {
            case 0:
                ctx.clearRect(0, 0, w, h);
                ctx.beginPath();
                x = -Math.PI / 2;
                y = x + Math.PI * 2 * rate;
                ctx.strokeStyle = "#84bd2e";
                ctx.arc(w / 2, h / 2, 50, x, y);
                ctx.lineWidth = 30;
                ctx.stroke();

                break;
            case 1:
                ctx.clearRect(0, 0, w, h);
                ctx.beginPath();
                x = -Math.PI / 2;
                y = x + Math.PI * 2 * data[0] / sum;
                ctx.strokeStyle = "#84bd2e";
                ctx.arc(w / 2, h / 2, 50, x, y);
                ctx.lineWidth = 30;
                ctx.stroke();

                ctx.beginPath();
                x = -Math.PI / 2 + Math.PI * 2 * data[0] / sum + 15 / 360;
                y = x + Math.PI * 2 * rate * 0.95;
                ctx.strokeStyle = "#dd8c54";
                ctx.arc(w / 2, h / 2, 50, x, y);
                ctx.lineWidth = 30;
                ctx.stroke();

                break;
        }
        if (i == 2) {
            clearInterval(timer);
            drawRest();
        }
    }, 30);

    function drawRest() {
        ////////////////
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(230, 30);
        ctx.lineTo(235, 22);
        ctx.lineTo(255, 22);
        ctx.strokeStyle = "#84bd2e";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(255, 22, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#84bd2e";
        ctx.fill();

        ctx.beginPath();
        ctx.font = "14px Arial";
        ctx.fillStyle = "#84bd2e";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("5", 275, 18);
        ctx.fillText("达标", 275, 33);

        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(118, 60);
        ctx.lineTo(110, 68);
        ctx.lineTo(90, 68);
        ctx.strokeStyle = "#dd8c54";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(90, 68, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#dd8c54";
        ctx.fill();

        ctx.beginPath();
        ctx.font = "14px Arial";
        ctx.fillStyle = "#dd8c54";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("2", 70, 63);
        ctx.fillText("不足", 70, 78);
    }
}



