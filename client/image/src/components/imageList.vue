

<template>
  <div >
    <h1>{{title}}</h1>
    <ul>
      <li>名称</li>
      <li>图片</li>
      <li>地址</li>
      <li>大小</li>
      <li>尺寸</li>
    </ul>
    <tr v-for="item in images ">
      <td><a href="item.url"> <img v-bind:src="item.url"></a>{{item.url}}</td>
    </tr>
  </div>
</template>
<script>
export default {
  mounted () {
    console.log('fetchImageList')
    this.fetchImageList()
  },
  data () {
    return {
      title: '图片列表',
      images: [{
        name: '',
        url: 'http://images3.c-ctrip.com/tieyou/201610/pc3.png'
      }]
    }
  },
  methods: {
    fetchImageList () {
      console.log('fetchImageList')
      // var options = {
      //   jsonp: 'c'
      // }
      this.$http.jsonp('http://199.15.112.103:3000/image')
      .then(function (res) {
        // body...
        console.log(res.body)
       // this.$set('images', res.data.images)
      },
      function (res) {
        console.log(res)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
