<template>
  <div>
    <Feedback v-if="this.feedback.message !== ''" :feedback="feedback" />
    <vue2Dropzone
      id="dropzone"
      ref="dropzone"
      :options="options"
      useCustomSlot
      @vdropzone-sending="addHeaderBeforeSending"
      @vdropzone-success="handleSuccess"
      @vdropzone-error="handleError"
      @vdropzone-removed-file="handleRemoved"
      class="UploadArea d-flex justify-content-center"
    >
      <div class="align-self-center">
        <img alt="upload" :src="image('upload.svg')" />
        <p class="mb-0 mt-3">
          <strong>Slepen en neerzetten voor upload</strong>
          <br />
          <span>
            of
            <span>bladeren</span>
            om een bestand te kiezen
          </span>
        </p>
      </div>
    </vue2Dropzone>
  </div>
</template>

<script>
import { image } from '@/helpers/assets'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import Feedback from './Feedback'
import SvgIcon from '@/components/common/SvgIcon.vue'


// TODO: Auth Header...
// import { authHeader } from '@/services/auth';

export default {
  components: {
    vue2Dropzone, Feedback,
  },
  data() {
    return {
      feedback: {
        message: '',
        variant: ''
      },
      options: {
        paramName: 'input',
        addRemoveLinks: true,
        maxFilesize: 100,
        acceptedFiles: 'application/pdf, image/png, image/jpeg, image/gif, image/bmp, image/tiff, image/webp, text/plain',
        url: `${process.env.VUE_APP_API_BASE_URL}/api/incident-portal/upload-document`.replace(/([^:]\/)\/+/g, "$1") // TODO: Move to API
      }
    }
  },
  methods: {
    image,
    /**
     * Add the Authorization header when the upload process starts
     */
    addHeaderBeforeSending(file, xhr) {
      this.feedback = {
        message: '',
        variant: ''
      }
      if (xhr.setRequestHeader) {
        // let header = authHeader() // TODO: Auth Header
        // const header = {}
        // xhr.setRequestHeader('Authorization', header.Authorization);
      }
      this.$refs.dropzone
      this.$emit('handleUploadProgress', 'starting')
    },
    /**
     * Start the creation of a new report once the upload has finished with success
     */
    handleSuccess(file, response) {
      this.feedback = {
        message: '',
        variant: ''
      }
      this.$emit('handleFileAdded', file, response)
      this.$emit('handleUploadProgress', 'finished')
    },
    handleError(file, message, xhr) { // error
      if (file && this.$refs.dropzone) {
        this.$refs.dropzone.removeFile(file)
      }

      this.feedback = {
        message: message,
        variant: 'danger'
      }
      this.$emit('handleUploadProgress', 'finished')
    },
    handleRemoved(file, error, xhr) {
      this.$emit('handleFileRemoved', file, error, xhr)
    }
  }
}
</script>

<style lang="scss">
.UploadArea {
  width: 100%;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.7);
  border: 3px dashed #9ea9b8;
  user-select: none;
  cursor: pointer;
  p {
    text-align: center;
    font-size: 14px;
    color: #354052;
    font-weight: 300;
    line-height: 17px;
    strong {
      font-size: 18px;
      color: #373c41;
      font-weight: 600;
    }
    span span {
      color: #1991eb;
      font-weight: 600;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  // DropZone styling
  .dz-message {
    align-self: center;
  }
  &.vue-dropzone:hover {
    background-color: white;
  }
  &.vue-dropzone > .dz-preview .dz-details {
    background: #17a4ea;
  }
}
</style>