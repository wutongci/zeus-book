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
        <a-row>
            <a-col :span="24">
            <div v-if = 'suggests==null'>
                <a-spin size="large"/>
            </div>
            <div v-else>
                {{ suggests }}
            </div>

            </a-col>
        </a-row>
      </div>
  </div>
</template>

<script>
  import { books } from '@/api/downbook'
  export default {
    name: 'landing-page',
    data () {
      return {
        suggests: null
      }
    },

    methods: {
      async onDown (value) {
        console.log(value)
        let { result } = await books(value)
        this.suggests = result
        // this.$router.push({ path: '/search', query: { value } })
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
