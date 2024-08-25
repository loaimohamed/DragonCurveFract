const canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

const _width = (canvas.width = innerWidth * 0.99),
    _height = (canvas.height = innerHeight * 0.99);

class Shapes {
    static border = false;
    static color = "Blue";
    static rect(x, y, w, h = w) {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        if (this.border) { ctx.strokeStyle = this.color; ctx.stroke(); }
        else { ctx.fillStyle = this.color; ctx.fill(); }
        ctx.closePath();
    }
    static circle(x, y, rr = 10) {
        ctx.beginPath();
        //ctx.globalAlpha = 1;
        ctx.arc(x, y, rr, 0, Math.PI * 2);
        if (this.border) { ctx.strokeStyle = this.color; ctx.stroke(); }
        else { ctx.fillStyle = this.color; ctx.fill(); }
        ctx.closePath();
    }
    static LineBetween(bx, by, ex, ey, strokeWeight = 5) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = strokeWeight;
        ctx.lineCap = "round";
        ctx.moveTo(bx, by);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        ctx.closePath();
    }
}


const length = 2;
const beginPoint = {
    x: _width / 4,
    y: 200
};


linesList = [];
linesList.push(beginPoint);

const AngleD = 90
const angleR = AngleD * Math.PI / 180;

function CopyToAngle(list) {
    const tempList = [];

    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const itemR = list[list.length - i - 1];
        const last = list[list.length - 1];

        let tx = (last.x - itemR.x);
        let ty = (last.y - itemR.y);

        // console.log(`Last: ${last.x}, ${last.y} | Item: ${itemR.x}, ${itemR.y}`);


        let nx = tx * Math.cos(angleR) - ty * Math.sin(angleR) + last.x;
        let ny = tx * Math.sin(angleR) + ty * Math.cos(angleR) + last.y;

        tempList.push({ x: nx, y: ny });
    }
    return tempList;
}

function PlotLines() {

    //new point
    let nx = length * Math.cos(angleR) + beginPoint.x;
    let ny = length * Math.sin(angleR) + beginPoint.y;

    linesList.push({
        x: nx,
        y: ny
    });

    for (let i = 0; i < 15; i++)
        linesList.push(...CopyToAngle(linesList));

}
PlotLines();

function DrawPoints() {
    let preIndex;
    let colorD = 0;
    // console.log(linesList);

    for (let i = 0; i < linesList.length; i++) {
        const item = linesList[i];
        if (preIndex == undefined) {
            preIndex = item;
            continue;
        }
        // console.log(colorD);

        //(colorD * Math.PI / 180) / (Math.PI * 2) * 100
        Shapes.color = `hsl(${Math.sin(colorD * Math.PI / 180) * 360}deg, 100%, ${(colorD * Math.PI / 180) / (Math.PI * 2) * 100}%)`;
        Shapes.LineBetween(preIndex.x, preIndex.y, item.x, item.y, 1.5);
        console.log((colorD * Math.PI / 180) / (Math.PI * 2) * 100);

        colorD <= 360 ? colorD++ : colorD = 0;
        preIndex = item;
    }
}

DrawPoints();