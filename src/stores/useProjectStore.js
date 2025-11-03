import {defineStore} from "pinia";
import axios from "axios";
import {useConstStore} from "@/stores/useConstStore";
import {VueCookieNext} from "vue-cookie-next";

export const useProjectStore = defineStore('project', {
    state: () => ({
        uuid: '',
        name: '',
        description: '',
        x: 0,
        y: 0,
        floors: [],
        constructions : {
            walls : [
                { x: 0, y: 50},
                { x: 250, y: 50},
            ],
            sensorPlaced : [
                {
                    name: 'test1',
                    img: useConstStore().sensorIcons.move,
                    coordinates: {x: 0, y: 0}
                }
            ]
        },
        zones : [
            {
                name : 'bedroom',
                color: 'red',
                coordinates : [
                    {
                        x: 0,
                        y: 0
                    },
                    {
                        x: 1,
                        y: 0
                    },
                    {
                        x: 1,
                        y: 1
                    }
                ]
            },
            {
                name : 'bedroom2',
                color: 'blue',
                coordinates : [
                    {
                        x: 9,
                        y: 9
                    },
                    {
                        x: 9,
                        y: 3
                    },
                    {
                        x: 4,
                        y: 6
                    }
                ]
            },
        ],
        sensorPlaced : [
            {
                name: 'test1',
                img: 'https://static.vecteezy.com/system/resources/previews/020/296/261/non_2x/sensor-icon-isolated-flat-design-illustration-vector.jpg',
                coordinates: {x: 0, y: 0}
            }
        ]
    }),
    actions: {
        async getProjectInfo() {
            try {
                const uuid = VueCookieNext.getCookie('activeProject')
                const response = await axios.get(`project/${uuid}/`);

                // Set data locally
                this.uuid = response.data.uuid
                this.name = response.data.name
                this.description = response.data.description
                this.x = response.data.x
                this.y = response.data.y
                console.log('Project data updated')

                // Map floors from response data
                this.floors = response.data.floors.map(floor => ({
                    floor_uuid: floor.floor_uuid,
                    number: floor.number,
                    walls: floor.walls.map(wall => ({
                        idWall: wall.idWall,
                        wall_type: wall.wall_type,
                        start_x: wall.start_x,
                        start_y: wall.start_y,
                        end_x: wall.end_x,
                        end_y: wall.end_y
                    })),
                    rooms: floor.rooms.map(room => ({
                        idRoom: room.idRoom,
                        name: room.name,
                        color: room.color
                    }))
                }));

                //console.log("floors from response =", response.data.floors)
                console.log("floors locally =", this.floors)
            } catch (error) {
                console.log("Error while getting project info:", error.response);
            }
        },
        async addFloor(newFloor) {
            try {
                const uuid = VueCookieNext.getCookie('activeProject')
                await axios.post(`project/${uuid}/floor/`, {
                    number: newFloor,
                });
                // Update project info
                await this.getProjectInfo();
            } catch (error) {
                console.log("Error while adding new floor:", error.response);
            }
        },
        async deleteFloor(floorIndex) {
            this.floors.splice(floorIndex, 1);
            // todo
        }
    }
})