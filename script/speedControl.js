var plusSpeedCounter = 15;

function velocityUpgrade() {

    if(plusSpeedCounter > 100){
        plusSpeedCounter=100
    }
    console.log(plusSpeedCounter);
    starfield.minVelocity = Math.random()*15+plusSpeedCounter;
    starfield.maxVelocity = Math.random()*45 + starfield.minVelocity + plusSpeedCounter;
    console.log(plusSpeedCounter);

}
function velocityDowngrade() {
    if(plusSpeedCounter <= 15 ){
        plusSpeedCounter = 15;
    }
    starfield.minVelocity = Math.random()*15+plusSpeedCounter;
    starfield.maxVelocity = Math.random()*45 + starfield.minVelocity + plusSpeedCounter;


}/**
 * Created by erikmagnusson on 09/04/14.
 */
