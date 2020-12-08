import asyncHandler from "express-async-handler";
import MLR from "ml-regression-multivariate-linear";
import Mess from "../models/messmodel.js";

function mapday(day) {
    switch (day) {
        case 'sunday': return 1;
        case 'monday': return 2;
        case 'tuesday': return 3;
        case 'wednesday': return 4;
        case 'thursday': return 5;
        case 'friday': return 6;
        case 'saturday': return 7;
    }
}

const linear_regression = asyncHandler(async (req, res) => {
    try {
        const mess = await Mess.find({}).sort({ date: -1 });

        var d = new Date();
        var day = d.getDay() + 1;
        var month = d.getMonth() + 1;

        var x = mess.map((m) => {
            var month = Number(m.date.substring(5, 7));
            var day = mapday(m.day);
            return [month, day, m.rationused];
        });

        var y = mess.map((m) => {
            return [m.foodwasted];
        });

        const mlr = new MLR(x, y);

        let data = [];
        for (let i = 20; i <= 50; i++) {
            data.push([i, mlr.predict([month, day, i])[0]]);
        }
        res.send(data);
    } catch (error) {
        res.status(400);
        throw new Error('Error');
    }
});

export { linear_regression };