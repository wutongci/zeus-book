<template>
  <div id="wrapper">
      <a-row>
          <a-col :span="24">
            <a-input-search
                    placeholder="输入网址"
                    @search="onDown"
                    enterButton="下载"
                    size="large"
            />
          </a-col>
      </a-row>
      <div class="example">
          <down-log id="log" :cache="cache" :status="status" :capacity="50"/>
      </div>
  </div>
</template>

<script>
  import DownLog from './DownLog.vue'
  import {ipcRenderer} from 'electron'
  export default {
    name: 'landing-page',
    components: {
      'down-log': DownLog
    },
    data () {
      return {
        cache: [],
        status: 'idle'
      }
    },
    computed: {
      isRunning () {
        return this.status === 'running'
      }
    },
    mounted () {
      this.$electron.ipcRenderer.on('download-success', (e, data) => {
        let { content } = data
        let logs = []
        logs.push(content);
        [].push.apply(this.cache, logs)
      })
    },
    methods: {
      async onDown (url) {
        this.status = 'running'
        ipcRenderer.send('download-start', {
          url: url
        })
      },
      stop () {
        this.status = 'idle'
      }
    }
  }
</script>



<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body { font-family: 'Source Sans Pro', sans-serif; }
  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }
   .example {
       text-align: center;
       background: rgba(0, 0, 0, 0.05);
       border-radius: 4px;
       margin-bottom: 20px;
       padding: 30px 50px;
       margin: 20px 0;
   }
</style>
