<template>
    <div >

       
        {{$route.path}}
    </div>
</template> 
<script>
import { XHeader, Tab, TabItem } from "vux";
export default {
  name: "find",
  data() {
    return {
      getBarWidth: function(index) {
        return 50 + "px";
      }
    };
  },
  components: {
    XHeader,
    Tab,
    TabItem
  },
  computed: {}
};
</script>
<style scoped>

</style>
