<template>
  <div class="UMLView">
    <iframe src="http://tu.github5.com/" id="mobsf"></iframe>
  </div>
</template>

<script>

export default {
  name: "UMLView",
  data() {
    return {

    }
  },
  watch: {
    $route(to, from) {
      if (to.query.tab !== from.query.tab) {
        if (to.query.tab == 'uml') {
          const el = document.getElementById('mobsf')
          const tmpUrl = el.src
          el.src = tmpUrl
        }
      }
    }
  },
  mounted() {
    /**
    * iframe-宽高自适应显示 
    */
    function changeMobsfIframe() {
      const mobsf = document.getElementById('mobsf');
      const deviceWidth = document.body.clientWidth;
      const deviceHeight = document.body.clientHeight;
      mobsf.style.width = (Number(deviceWidth) - 160) + 'px'; //数字是页面布局宽度差值
      mobsf.style.height = (Number(deviceHeight) - 140) + 'px'; //数字是页面布局高度差
    }

    changeMobsfIframe()

    window.onresize = function () {
      changeMobsfIframe()
    }
  }
}
</script>
