<template>
  <aside v-if="isVisible" class="sidebar">
    <nav>
      <ul>
        <li v-for="item in menuItems" :key="item.name">
          <a :href="item.link">{{ item.name }}</a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Sidebar',
  props: {
    menuItems: {
      type: Array,
      required: true,
    }
  },
  isVisible: {
    type: Boolean,
    required: true,
  },
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #f4f4f4;
  padding: 20px;
  border-right: 1px solid #ddd;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}

.sidebar nav ul {
  list-style-type: none;
  padding: 0;
}

.sidebar nav ul li {
  margin: 10px 0;
}

.sidebar nav ul li a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.sidebar nav ul li a:hover {
  color: #007bff;
}
</style>