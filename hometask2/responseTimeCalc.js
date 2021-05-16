
const responseTimeCalc = (req, res, next) => {
    const startHrTime = process.hrtime.bigint();
    res.on('finish', () => {
        const elapsedHrTime = process.hrtime.bigint() - startHrTime;
        console.log("request to path %s took %fms", (req.baseUrl + req.path), Number(elapsedHrTime) / 1e6);
    });
    next();
}

module.exports = responseTimeCalc;