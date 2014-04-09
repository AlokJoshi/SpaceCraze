var plusSpeedCounter = 15;
function velocityUpgrade() {
    plusSpeedCounter += 40;
    starfield.minVelocity = Math.random()*15+plusSpeedCounter;
    starfield.maxVelocity = Math.random()*45 + starfield.minVelocity + plusSpeedCounter;
}
function velocityDowngrade() {

    plusSpeedCounter -= 40;
    if(plusSpeedCounter <= 15 ){
        plusSpeedCounter = 15;
    }
    starfield.minVelocity = Math.random()*15+plusSpeedCounter;
    starfield.maxVelocity = Math.random()*45 + starfield.minVelocity + plusSpeedCounter;

}/**
 * Created by erikmagnusson on 09/04/14.
 */
