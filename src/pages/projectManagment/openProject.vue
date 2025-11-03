<script>
import MyHeader from "@/components/UI/myHeader.vue";
import ProjectCard from "@/components/mainMenu/projectCard.vue";
import {useUserStore} from "@/stores/useUserStore";
import {useProjectStore} from "@/stores/useProjectStore";
import {VueCookieNext} from "vue-cookie-next";
import axios from "axios";
import {Plus} from "@element-plus/icons-vue";

// Set default project image
const defaultImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbrbbP0nlABOhQeR2MSvIrVK8evHzFHSHT9w&s'
//'https://5.imimg.com/data5/SELLER/Default/2023/10/357084620/ZR/XM/SQ/22750450/institutional-architect-500x500.jpg'

// Define a class or an object template for a project
class Project {
  constructor(uuid, name, description, x, y) {
    this.uuid = uuid;
    this.name = name;
    this.description = description;
    this.x = x;
    this.y = y;
    // use default image
    this.src = defaultImg;
  }
}

export default {
  components: {
    Plus,
    ProjectCard,
    MyHeader
  },
  data() {
    return {
      user : useUserStore(),
      project : useProjectStore(),
      projects: [],
    }
  },
  created() {
    this.user.isAuthenticated();
    this.getAllProjects();
  },
  methods: {
    async getAllProjects() {
      const url = `get-all-projects/${VueCookieNext.getCookie("uuid")}/`;
      console.log("Get all projects from", url);
      try {
        const response = await axios.get(url);
        console.log("Successful get all projects:", response.data);
        this.projects = response.data.map(projectData => {
          return new Project(
              projectData.uuid,
              projectData.name,
              projectData.description,
              projectData.x,
              projectData.y,

            )
        });
        console.log("Projects saved to local store:", this.projects);
      } catch (error) {
        console.log("Error while getting all projects:", error);
      }
    },
    async deleteProject(projectId) {
      try {
        console.log('Deleting project with UUID: ', projectId);
        await axios.delete(`/project/${projectId}/`);
        await this.getAllProjects();
      } catch (error) {
        console.log('Error while deleting project:', error?.response);
      }
    },
    noProjects(){
      return this.projects.length === 0
    }
  }
}
</script>

<template>
  <div class="background">
    <my-header/>
    <!-- no projects -->
    <el-space class="center" v-if="noProjects()" direction="vertical">
      <el-text size="large">No projects yet</el-text>
      <el-button @click="$router.push('/newProject')">
        <el-text>Create new project</el-text>
        <el-icon class="el-icon--right"/>
        <Plus/>
      </el-button>
    </el-space>
    <!-- show project card gallery -->
    <el-space class="center" wrap v-else>
      <project-card v-for="i in projects" :projectInfo=i :key="i.uuid" @deleteProject="deleteProject"/>
    </el-space>
    <!-- components with fixed position -->

    <el-backtop :right="10" :bottom="10" />
  </div>
</template>

<style scoped>
.background {
  padding-top: 10vh;
  padding-bottom: 4vh;
}

.center {
  margin-top: 0;
}
</style>