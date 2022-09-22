<!-- eslint-disable vue/valid-template-root -->
<template>
  <div class="todo-footer" v-show="all">
    <label>
      <input type="checkbox" :checked="isAll"  @click="changeAll"/>
    </label>
    <span>
      <span>已完成{{ doneTotal }}</span> / 全部{{ all }}
    </span>
    <button class="btn btn-danger" @click="clear">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props: ["todos"],
  computed: {
    doneTotal() {
      // let d = 0;
      // this.todos.forEach(t => {
      //   if (t.done === true) {
      //     d++
      //   }
      // })
      // return d;
      return this.todos.reduce((prev, cur) => prev + (cur.done ? 1 : 0), 0);
    },
    all() {
      return this.todos.length;
    },
    isAll() {
      return this.doneTotal === this.all;
    }
  },
  methods: {
    changeAll(e) {
      //console.log('e.target.checked', e.target.checked)
      //this.checkAll(e.target.checked)
      this.$emit('checkAll',e.target.checked)
    },
    clear() {
      //this.clearDone();
      this.$emit('clearDone');
    }
  }
  
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
