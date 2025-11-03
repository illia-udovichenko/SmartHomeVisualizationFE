import { defineStore } from 'pinia'
import {ref} from "vue";
import {useProjectStore} from "@/stores/useProjectStore";

export const useEditorStore = defineStore('editor', {
    state: () => {
        return {
            constructions : ["wall", "window", "door"],
            sensors : [
                {
                    category_name: "move",
                    id: "1",
                    models: [
                        {
                            name: "Samsung MC1",
                            id: "1"
                        },
                        {
                            name: "Samsung MC2",
                            id: "2"
                        },
                        {
                            name: "Apple Move PRO",
                            id: "3"
                        },
                        {
                            name: "Xiaomi ms3",
                            id: "4"
                        }]
                },
                {
                    category_name: "open door",
                    id: "2",
                    models: [
                        {
                            name: "TECO open door detection sensor",
                            id: "1"
                        },
                        {
                            name: "Sony X_OPEN",
                            id: "2"
                        }
                    ]
                }
            ],
            floor : {
                actualFloor : 0
            },
            //global state of editor, can be changed anywhere in programme
            mode: {
                construction : {
                    //visibility manager
                    show : true,
                    collision : false,
                    //functionality
                    constructionMode : '' //wall, window or door
                },
                roomZone : {
                    //visibility manager
                    show : ref(true),
                    collision : ref(false),
                    //functionality
                    color: ref(''),
                    zoneName : ref('')
                    //todo: move tmp from roomZoneCanvas here
                },
                sensor : {
                    //visibility manager
                    show : true,
                    collision : false,
                    activeSensor : '',

                },
                //todo: redo sensorZone to attach to a single sensor
                sensorZone : {
                    sensorID : '',
                    show : true,
                    collision : false,
                }
            },
            sideBarState : 'zoneList'
        }
    },
    actions : {
        placeConstruction(constructionMode = String){
            // visibility
            this.finishPlacing()
            this.mode.construction.collision = true
            this.mode.construction.show = true
            //vars
            this.mode.construction.constructionMode =constructionMode
            this.switchSideBar('')
        },
        //actions with zones
        deleteRoomZone(zoneName) {
            const zones = useProjectStore().zones
            const indexToDelete = zones.findIndex(zone => zone.name === zoneName);
            // If the zone with the specified name exists
            if (indexToDelete !== -1) {
                // Remove the zone from the array
                zones.splice(indexToDelete, 1);
            }
        },
        placeRoomZone(){
            //visibility
            this.finishPlacing()
            this.mode.roomZone.collision = true
            this.mode.roomZone.show = true
            this.switchSideBar('zoneEditor')
        },
        //actions with sensors
        placeSensor(activeSensor){
            //visibility
            this.finishPlacing()
            this.mode.roomZone.collision = true
            this.mode.roomZone.show = true
            //vars
            this.mode.sensor.activeSensor = activeSensor
            this.switchSideBar('')
        },
        //todo: placeSensorZone
        //return editor to an initial state
        finishPlacing(){
            this.switchSideBar('zoneList')
            //always show
            this.mode.construction.collision = false
            this.mode.sensor.collision = false
            //conditional show
            this.mode.roomZone.collision = false
            this.mode.roomZone.show = false
            this.mode.sensorZone.collision = false
            this.mode.sensorZone.show = false
            //vars to initial state
            this.mode.roomZone.zoneName = ''
            this.mode.construction.constructionMode = ''
        },
        switchSideBar(newMode){
            this.sideBarState = newMode
        },
    }
})