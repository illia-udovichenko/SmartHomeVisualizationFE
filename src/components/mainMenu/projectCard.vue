<script>
import {Delete, EditPen} from "@element-plus/icons-vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {VueCookieNext} from "vue-cookie-next";
import router from "@/router/router";
import {truncate} from "lodash";

export default {
  props : {
    projectInfo : {
      type: Object,
      default: () => ({
        uuid: '',
        name: '',
        description: '',
        x: 0,
        y: 0,
        src: ''
      })
    }
  },
  computed: {
    EditPen() {
      return EditPen
    },
    Delete() {
      return Delete
    }
  },
  mounted() {
    console.log('Card created: ', this.projectInfo.uuid);
  },
  data() {
    return {
      // todo projectInfo: useProjectStore().allProjects[projectNum]
      projectExists : true,
      dialogFormVisible: false
    }
  },
  methods : {
    truncate,
    deleteWarning(){
      ElMessageBox.confirm('Are you sure you want to delete this project?', 'Delete Confirmation', {
        confirmButtonText: 'Continue',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
        // Call deleteProject function if user clicks Continue
        this.deleteProject();
        ElMessage({
          type: 'success',
          message: 'Project deleted successfully'
        });
      }).catch(() => {
        // Do nothing if user cancels
      });
    },
    async deleteProject() {
      this.$emit('deleteProject', this.projectInfo.uuid)
    },
    async openProject(){
      // Set active project and go to editor
      VueCookieNext.setCookie("activeProject", this.projectInfo.uuid);
      await router.push('/editor');
    },
    editProjectInfoStart(){
      //show window and project data
      this.dialogFormVisible = true
      this.projectDescriptionTmp = this.projectInfo.description
      this.projectNameTmp = this.projectInfo.name
    },
    editProjectInfoFinish(){
      //hide window and reset vars
      this.dialogFormVisible = false
      //todo: update data on server
      this.projectNameTmp = ''
      this.projectDescriptionTmp = ''
    }
  }
}
</script>

<template>
  <el-card v-show="projectExists">
    <template #header>
      <el-text class="title">{{ truncate( projectInfo.name, {length: 25, omission: '...'}) }}</el-text>
    </template>
    <el-space direction="vertical">
      <el-image :src="projectInfo.src" class="image-size" :fit="'contain'" loading="lazy"/>
      <el-text class="description" style="max-lines: 2">{{ truncate( projectInfo.description, {length: 80, omission: '...'}) }}</el-text>
      <el-text class="size-info">{{projectInfo.x}}m x {{projectInfo.y}}m</el-text>
    </el-space>
    <template #footer>
      <div class="footer-buttons">
        <el-button @click="openProject" size="large" round type="primary" class="open-project">
          Open project
        </el-button>
        <div class="right-buttons">
          <el-button @click="editProjectInfoStart" :icon="EditPen" circle size="large" class="edit-button"/>
          <el-button  @click="deleteWarning" plain type="danger" :icon="Delete" circle size="large"/>
        </div>
      </div>
    </template>

    <el-dialog v-model="dialogFormVisible" title="Edit data" width="500" :show-close="false">
      <el-form>
        <el-form-item label="Project name">
          <el-input v-model.lazy="this.projectNameTmp" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model.lazy="this.projectDescriptionTmp" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div>
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="editProjectInfoFinish">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </el-card>
</template>

<style scoped>
.el-card {
  margin: 2vh 1vh;
  border-radius: 20px;
  width: 350px;
  height: 460px;
}

.title {
  font-size: 1.7rem;
  color: #4facfe;
}

.image-size {
  width: 300px;
  height: 170px;
}

.description {
  font-size: 1rem;
  color: #4facfe;
  margin-top: 1vh;

  width: 300px;
  height: 50px;
  max-width: 100%;
  max-height: 100%;
}

.size-info {
  margin-top: 10px;
  font-size: 1rem;
}

.footer-buttons {
  display: flex;
  justify-content: space-between;
}

.open-project {
  margin-left: 13vh;
  background-color: rgb(180, 150, 255);
  border: 0;
}

.open-project:hover {
  background-color: rgb(180, 120, 255);
}

.edit-button {
  color: #4facfe;
}
</style>