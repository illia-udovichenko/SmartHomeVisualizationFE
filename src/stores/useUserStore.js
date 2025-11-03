import {defineStore} from 'pinia'
import { VueCookieNext} from "vue-cookie-next";
import axios from "axios";
import router from "@/router/router";
import Swal from "sweetalert2";
import {useProjectStore} from "@/stores/useProjectStore";

export const useUserStore = defineStore('user', {
    state: () => ({
        // todo move it all to project or any other store
        constructions: ["wall", "window", "door"],
        sensors: [
            {
                category_name: "move", id: "1", models: [{
                    name: "Samsung MC1", id: "1"
                }, {
                    name: "Samsung MC2", id: "2"
                }, {
                    name: "Apple Move PRO", id: "3"
                }, {
                    name: "Xiaomi ms3", id: "4"
                }]
            }, {
                category_name: "open door", id: "2", models: [{
                    name: "TECO open door detection sensor", id: "1"
                }, {
                    name: "Sony X_OPEN", id: "2"
                }]
            }]

    }),
    actions: {
        setUserInfo (data) {
            VueCookieNext.setCookie('uuid', data.uuid);
            VueCookieNext.setCookie('username', data.username);
            VueCookieNext.setCookie('email', data.email);
        },
        setTokens(tokens) {
            VueCookieNext.setCookie('accessToken', tokens.access);
            VueCookieNext.setCookie('refreshToken', tokens.refresh);
        },
        clearData() {
            console.log("Clear data");
            // User data
            VueCookieNext.removeCookie('uuid');
            VueCookieNext.removeCookie('username');
            VueCookieNext.removeCookie('email');
            VueCookieNext.removeCookie('activeProject');

            // Tokens
            VueCookieNext.removeCookie('accessToken');
            VueCookieNext.removeCookie('refreshToken');
        },
        async handleRefreshError () {
            Swal.fire({
                icon: "error",
                title: 'Your session has expired. Please log in again or register if you are <span style="color: red"> ANONYMOUS :0 </span> user',
                showConfirmButton: true,
                confirmButtonColor: "blue",
            });

            console.log('Error with refresh token:', VueCookieNext.getCookie("refreshToken"));
            this.clearData();
            await router.push({path: '/'});
        },
        async isAuthenticated() {
            const refresh = VueCookieNext.getCookie('refreshToken');
            if (!refresh)
                await this.handleRefreshError();
            else {
                try {
                    const response = await axios.post('token/refresh/', {
                        refresh: refresh,
                    });
                    VueCookieNext.setCookie('accessToken', response.data.access);
                    console.log("successful auth");
                } catch (error) {
                    await this.handleRefreshError();
                    console.log('Error while refreshing token in authentication:', refresh);
                }
            }
        },

        //check if the roomZoneCell exists
        getCellColor(x, y) {
            for (const zone of useProjectStore().zones) {
                for (const coordinate of zone.coordinates) {
                    if (coordinate.x === x && coordinate.y === y) {
                        return zone.color;
                    }
                }
            }
            return 'black';
        },
        //remove an existing roomZoneCell
        removeRoomZoneCell(x, y){
            let zones = useProjectStore().zones
            zones.forEach(zone => {
                zone.coordinates = zone.coordinates.filter(coord => !(coord.x === x && coord.y === y));
            })
            useProjectStore().zones = useProjectStore().zones.filter(zone => zone.coordinates.length > 0);
        },
        //check if the sensor exists
        getSensor(x, y) {
            let tmp = []
            for (const sensor of useProjectStore().sensorPlaced) {
                if (sensor.coordinates.x === x && sensor.coordinates.y === y)
                    tmp.push(sensor);
            }
            return tmp;
        },
    }
})