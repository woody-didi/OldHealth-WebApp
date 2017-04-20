(function () {
    //build pages
    document.getElementById("stepNumber").innerHTML = document.getElementById("stepNumberTemp").innerHTML;

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

    drawStepNumber1();
    drawStepNumber2();
})();

//chart心率图
function drawStepNumber1() {
    var cvs = document.getElementById("cvs");
    var ctx = cvs.getContext("2d");
    var winW = window.innerWidth;
    var w = cvs.width;
    var h = cvs.height;

    function drawCircle(step) {
        ctx.clearRect(0, 0, w, h);

        ctx.beginPath();
        ctx.arc(winW / 2, h / 2, 89, 0, Math.PI * 2 * step / 50);
        ctx.strokeStyle = "#01cce7";
        ctx.lineWidth = 1;
        ctx.stroke();


        ctx.beginPath();
        ctx.arc(winW / 2, h / 2, 80, 0, Math.PI * 2 * step / 50);
        ctx.strokeStyle = "#01cce7";
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.beginPath();
        text = parseInt(Math.random() * 4000 + 4000);
        ctx.font = "30px Arial";
        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, winW / 2, h / 2);
    }

    function drawRest() {
        ctx.beginPath();
        var text = "步";
        ctx.font = "10px Arial";
        ctx.fillStyle = "#999";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, winW / 2 + 40, h / 2 + 4);

        ctx.beginPath();
        text = "完成目标";
        ctx.font = "13px Arial";
        ctx.fillStyle = "#54E60C";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, winW / 2, h / 2 + 30);
    }

    var step = 0;
    var timer = setInterval(function () {
        step++;
        drawCircle(step);
        if (step > 50) {
            clearInterval(timer);
            drawRest()
        }
    }, 20);


}
function drawStepNumber2() {
    var cvs = document.getElementById("cvs2");
    var ctx = cvs.getContext("2d");
    var winW = window.innerWidth;
    var w = cvs.width;
    var h = cvs.height;

    function drawRest() {
        ctx.beginPath();//y
        ctx.moveTo(30, 76);
        ctx.lineTo(w, 76);
        ctx.strokeStyle = "#cfcccc";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();//x
        ctx.moveTo(76, 0);
        ctx.lineTo(76, h);
        ctx.stroke();

        ctx.beginPath();//dot
        for (var i = 1; i < 8; i++) {
            ctx.moveTo(76 + i * 30, 76);
            ctx.lineTo(76 + i * 30, 72);
            ctx.stroke();
        }

        ctx.beginPath();//dot
        for (var j = 1; j < 3; j++) {
            ctx.moveTo(76, 76 - j * 30);
            ctx.lineTo(80, 76 - j * 30);
            ctx.stroke();
        }

        ctx.beginPath();//dotted
        ctx.strokeStyle = "#efefef";
        var num = parseInt(210 / 6);
        for (var k = 0; k < num; k++) {
            ctx.moveTo(82 + k * 6, 46);
            ctx.lineTo(86 + k * 6, 46);
            ctx.stroke();
        }

    }

    drawRest();
    var data = [3000, 5000, 4500, 6000, 4800];
    var step = 0;
    var timer1 = setInterval(function () {
        drawLine(step);
        step++;
        if (step >= data.length) {
            clearInterval(timer1)
        }
    }, 500);

    function drawLine(step) {
        ctx.strokeStyle = "#efefef";
        ctx.beginPath();
        var x = 76 + 30 * (step + 1);
        var y = 76 - data[step] / 4000 * 30;
        var x1 = 76 + 30 * (step + 2);
        var y1 = 76 - data[step + 1] / 4000 * 30;
        ctx.moveTo(x, y);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = "#01cce7";
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}
