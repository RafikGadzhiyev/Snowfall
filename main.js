const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const CONFIG = {
    SNOW_INITIAL_SPEED: 8,
    SNOW_Y_SPEED_COEFFICIENT: 14,
    SNOW_X_MIN_SPEED: -1,
    SNOW_X_MAX_SPEED: 0.5,
    SNOW_HEIGHT_OFFSET: 50,
    SNOW_AMOUNT: 400,
    SNOW_MIN_RADIUS: 5,
    SNOW_MAX_RADIUS: 20,
    SNOW_COLOR: "#fff",
    BACKGROUND_COLOR: "#055573",
    LIGHTNING_ENABLED: false,
    RAIN_ENABLED: false,
    CANVAS_WIDTH: canvas.width,
    CANVAS_HEIGHT: canvas.height
}
Object.freeze(CONFIG);

const getRandomItemFromRange = (from, to) => Math.floor(Math.random() * (to - from) + from) + 1;
let generatedSnows = [];

const checkIfGenerationEnough = (snows, limit) => snows.length === limit;
const generateSnow = (snows) => {
    let snowRadius = getRandomItemFromRange(CONFIG.SNOW_MIN_RADIUS, CONFIG.SNOW_MAX_RADIUS),
        x = getRandomItemFromRange(0, CONFIG.CANVAS_WIDTH - snowRadius),
        y = getRandomItemFromRange(-snowRadius * 2, CONFIG.SNOW_HEIGHT_OFFSET),
        ySpeed = CONFIG.SNOW_INITIAL_SPEED * snowRadius / CONFIG.SNOW_Y_SPEED_COEFFICIENT,
        xSpeed = getRandomItemFromRange(CONFIG.SNOW_X_MIN_SPEED, CONFIG.SNOW_X_MAX_SPEED);
    snows.push({ x, y, snowRadius, ySpeed, xSpeed });
}

function init() {
    ctx.fillStyle = CONFIG.BACKGROUND_COLOR;
    ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
    if (!checkIfGenerationEnough(generatedSnows, CONFIG.SNOW_AMOUNT)) {
        generateSnow(generatedSnows);
    };
    draw();
    requestAnimationFrame(init);
}

function draw() {
    for (let snowId in generatedSnows) {
        const snow = generatedSnows[snowId];
        ctx.fillStyle = CONFIG.SNOW_COLOR;
        ctx.beginPath();
        ctx.arc(snow.x, snow.y, snow.snowRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        if (snow.y > CONFIG.CANVAS_HEIGHT || snow.x > CONFIG.CANVAS_WIDTH) {
            snow.y = -snow.snowRadius;
            snow.x = getRandomItemFromRange(0, CONFIG.CANVAS_WIDTH);
            snow.snowRadius = getRandomItemFromRange(CONFIG.SNOW_MIN_RADIUS, CONFIG.SNOW_MAX_RADIUS);
            snow.ySpeed = CONFIG.SNOW_INITIAL_SPEED * snow.snowRadius / CONFIG.SNOW_Y_SPEED_COEFFICIENT;
            snow.xSpeed = getRandomItemFromRange(CONFIG.SNOW_X_MIN_SPEED, CONFIG.SNOW_X_MAX_SPEED);
        }
        snow.y += snow.ySpeed;
        snow.x += snow.xSpeed;
    }

}

init();

