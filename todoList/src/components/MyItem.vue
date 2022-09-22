<template>
  <transition name="animate__animated animate__bounce" appear
  enter-active-class="animate__fadeInDownBig"
  leave-active-class="animate__rotateOut">
    <li>
      <label>
        <input type="checkbox" :checked="todo.done" @change="change(todo)" />
        <span v-show="!todo.isEdit">{{ todo.title }}</span>
        <input
          v-show="todo.isEdit"
          type="text"
          :value="todo.title"
          @blur="Blur(todo, $event)"
          ref="inputTitle"
        />
      </label>

      <button class="btn btn-danger" @click="d(todo)">删除</button>
      <button v-show="!todo.isEdit" class="btn btn-edit" @click="edit(todo)">
        编辑
      </button>
    </li>
  </transition>
</template>

<script>
import "animate.css";
import pubsub from "pubsub-js";
export default {
  name: "MyItem",
  //接受 todo 对象
  props: ["todo"],
  // mounted() {
  //   console.log('this.todo',this.todo)
  // },
  methods: {
    change(todo) {
      //this.checkTodo(todo.id);
      //触发
      this.$bus.$emit("checkTodo", todo.id);
    },
    d(todo) {
      //this.delTodo(todo.id);
      //this.$bus.$emit('delTodo',todo.id)
      pubsub.publish("delTodo", todo.id);
    },
    edit(todo) {
      // eslint-disable-next-line no-prototype-builtins
      if (todo.hasOwnProperty("isEdit")) {
        todo.isEdit = true;
      } else {
        this.$set(todo, "isEdit", true);
      }
      this.$nextTick(function () {
        this.$refs.inputTitle.focus();
      });
    },
    Blur(todo, e) {
      todo.isEdit = false;
      //console.log('e.target.value',e.target.value)
      if (e.target.value.trim() == "") return alert("不能为空!!!");
      this.$bus.$emit("updateTodo", todo.id, e.target.value);
    },
  },
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
li:hover {
  background-color: antiquewhite;
}

li:hover button {
  display: block;
}
</style>
