import { defineStore } from 'pinia'

export const useConstStore = defineStore('const', {
    state: () => {
        return {
            projectCardDefaultImage: 'https://www.younghouselove.com/wp-content/uploads//2007/11/new-house-plan2.jpg',
            sensorIcons : {
                group : '@src/assets/sensor.png',
                move : "src/assets/moveSensor.png",
                openDoor : "@src/assets/openDoor"
            }
        }
    }
}
)