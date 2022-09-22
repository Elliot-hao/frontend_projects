<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <!-- 使用自定义组件传递数据 -->
        <MyHeader @addTodo="addTodo" />
        <MyList :todos="todos" />
        <MyFooter :todos="todos" @checkAll="checkAll" @clearDone="clearDone" />
      </div>
    </div>
  </div>
</template>
<script>
import MyHeader from "./components/MyHeader.vue";
import MyList from "./components/MyList.vue";
import MyFooter from "./components/MyFooter.vue";
import pubsub from "pubsub-js";

export default {
  name: "App",
  components: {
    MyHeader,
    MyList,
    MyFooter,
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem("todos")) || [],
    };
  },
  methods: {
    //添加一个 todo
    addTodo(todoObj) {
      //console.log("收到了!!" + x);
      this.todos.unshift(todoObj);
    },
    //改变勾选状态
    checkTodo(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) {
          todo.done = !todo.done;
        }
      });
      //console.log('this.todos', this.todos);
    },
    //删除功能
    // delTodo(id) {
    //   let t;
    //   for (let index = 0; index < this.todos.length; index++) {
    //     if (id === this.todos[index].id) {
    //       t = index;

    //     }

    //   }
    //   this.todos.splice(t, 1);
    // }
    delTodo(_, id) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id;
      });
    },
    //全选功能
    checkAll(done) {
      this.todos.forEach((t) => {
        t.done = done;
      });
    },
    clearDone() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done;
      });
    },
    update(id, newTitle) {
      this.todos.forEach((todo) => {
        if (todo.id === id) {
          todo.title = newTitle;
        }
      });
    },
  },
  watch: {
    // 只能检测到最外面的对象,无法监视到里面的属性
    // todos(value) {
    //   //捕获到变化
    //   localStorage.setItem('todos', JSON.stringify(value));
    // }
    //使用深层监视,完整写法:
    todos: {
      deep: true,
      handler(value) {
        localStorage.setItem("todos", JSON.stringify(value));
      },
    },
  },
  mounted() {
    this.$bus.$on("checkTodo", this.checkTodo);
    //this.$bus.$on('delTodo', this.delTodo);
    //使用消息订阅完成 del 功能
    this.pid = pubsub.subscribe("delTodo", this.delTodo);
    this.$bus.$on("updateTodo", this.update);
  },
  beforeDestroy() {
    this.$bus.$off("checkTodo");
    //this.$bus.$off('delTodo');
    pubsub.unsubscribe(this.pid);
  },
};
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}
.btn-edit {
  color: #fff;
  background-color: #49da8f;
  border: 1px solid #2fbd90;
  margin-right: 5px;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
