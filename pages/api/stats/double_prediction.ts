export    function doubleExponentialSmoothing(day:any, periods:number){
    let alpha = 0.5;
    let S = [];
    let t = 0;
    S[t] = day[t];//St

    let forecast = 0;
    //double exp smooth
    let beta = 0.5;
    let B = [];
    B[t] = day[t-1];
    //day by hour
    for(t=1; t<Object.keys(day).length; t++){

        S[t] = (alpha*day[t]) + (1-alpha)*(S[t-1] + B[t-1]?B[t-1]:0)
        B[t] = beta*(S[t]-S[t-1]) + (1-beta)*(B[t-1]?B[t-1]:0)
        // console.log(B[t]);
        let tempFore = (S[t] + periods * B[t]);
        if(!isNaN(tempFore)){
            forecast = tempFore;
        }

    }
    return forecast;
}
