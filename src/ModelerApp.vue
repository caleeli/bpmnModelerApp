<template>
  <div id="modeler-app">
    <div class="navbar">
      <div>ProcessMaker Modeler</div>
      <div class="actions">
        <b-btn v-b-modal="'uploadmodal'">Upload XML</b-btn>
        <button class="button" @click="download">Download XML</button>
      </div>
    </div>
    <div class="modeler-container">
      <modeler ref="modeler" />
    </div>
    <status-bar>
      {{statusText}}
      <font-awesome-icon :style="{color: statusColor}" :icon="statusIcon" />
    </status-bar>

    <b-modal ref="uploadmodal" id="uploadmodal" title="Upload BPMN File">
      <file-upload ref="upload" @input="handleUpload">
        Upload file
      </file-upload>
    </b-modal>
  </div>
</template>

<script>
import './setup/initialLoad';
import {Modeler, StatusBar} from "@processmaker/modeler";
import FileUpload from 'vue-upload-component';
import FilerSaver from 'file-saver';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Preload the images
require("@processmaker/modeler/src/assets/toolpanel/start-event.svg");
require("@processmaker/modeler/src/assets/toolpanel/end-event.svg");
require("@processmaker/modeler/src/assets/toolpanel/task.svg");
require("@processmaker/modeler/src/assets/toolpanel/scriptTask.svg");
require("@processmaker/modeler/src/assets/toolpanel/exclusive-gateway.svg");
require("@processmaker/modeler/src/assets/toolpanel/text-annotation.svg");
require("@processmaker/modeler/src/assets/toolpanel/pool.svg");
require("@processmaker/modeler/src/assets/connect-elements.svg");
require("@processmaker/modeler/src/assets/connect-artifacts.svg");
require("@processmaker/modeler/src/assets/trash-alt-solid.svg");
require("@processmaker/modeler/src/assets/highlight-shape.svg");
require("@processmaker/modeler/src/assets/lane-below.svg");
require("@processmaker/modeler/src/assets/lane-above.svg");
require("@processmaker/modeler/src/assets/script.svg");

export default {
  name: 'ModelerApp',
  components: {
    Modeler,
    FileUpload,
    StatusBar,
    FontAwesomeIcon,
  },
  data() {
    return {
      statusText: 'No errors detected',
      statusIcon: faCheckCircle,
      statusColor: 'green',
    };
  },
  methods: {
    download() {
      this.$refs.modeler.toXML(function(err, xml) {
        if (err) {
          alert(err);
        } else {
          let file = new File([xml], 'bpmnProcess.xml', {type: 'text/xml'});
          FilerSaver.saveAs(file);
        }
      });
    },
    handleUpload(files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.$refs.modeler.loadXML(reader.result);
        this.$refs.uploadmodal.hide();
      };
      reader.readAsText(files[0].file);
    },
  },
  mounted() {
    /* Add a start event on initial load */
    this.$refs.modeler.$once('parsed', this.$refs.modeler.addStartEvent);
  },
};
</script>

<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
}

#modeler-app {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;

  .modeler-container {
    flex-grow: 1;
    overflow: hidden;
  }

  .navbar {
    font-weight: bold;
    height: 42px;
    min-height: 42px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #3397e1;
    color: white;
    border-bottom: 1px solid grey;
    padding-right: 16px;
    padding-left: 16px;

    .actions {
      button {
        border-radius: 4px;
        display: inline-block;
        padding-top: 4px;
        padding-bottom: 4px;
        padding-left: 8px;
        padding-right: 8px;
        background-color: grey;
        color: white;
        border-width: 1px;
        border-color: darkgrey;
        margin-right: 8px;
        font-weight: bold;
      }
    }
  }
}
</style>
