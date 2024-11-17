<template>
  <div class="dashboard">
    <Sidebar :menuItems="menuItems" :isVisible="isSidebarVisible" />
    <div :class="['dashboard-content', { 'expanded': !isSidebarVisible }]">
      <header class="dashboard-header">
        <button @click="toggleSidebar" class="sidebar-toggle">
          {{ isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}}
        </button>
        <h1>Student Management Dashboard</h1>
      </header>
      <main class="dashboard-main">
        <StudentTable :students="students" @delete="deleteStudent" />
      </main>
    </div>
  </div>
</template>

<script>
import {fetchStudents, addStudent, deleteStudent} from '@/api/students';
import StudentTable from '@/components/StudentTable.vue';
import Sidebar from "@/components/Sidebar.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Students',
  components: {
    Sidebar,
    StudentTable,
  },
  data() {
    return {
      students: [],
      menuItems: [
        {name: 'Students', link: '#students'},
        {name: 'Add Student', link: '#add-student'},
        {name: 'Reports', link: '#reports'},
      ],
      isSidebarVisible: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    async loadStudents() {
      try {
        const response = await fetchStudents();
        this.students = response.data;
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    },
    async addStudent(newStudent) {
      try {
        const response = await addStudent(newStudent);
        this.students.push(response.data);
      } catch (error) {
        console.error('Error adding student:', error);
      }
    },
    async deleteStudent(id) {
      try {
        await deleteStudent(id);
        this.students = this.students.filter(student => student.id !== id);
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    },
  },
  mounted() {
    this.loadStudents();
  },
};
</script>

<style>
.dashboard {
  display: flex;
  height: 100vh;
}

.dashboard-content {
  margin-left: 250px; /* Default margin when sidebar is visible */
  width: calc(100% - 250px); /* Adjust width when sidebar is visible */
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s, width 0.3s;
}

.dashboard-content.expanded {
  margin-left: 0; /* No margin when sidebar is hidden */
  width: 100%; /* Full width when sidebar is hidden */
}

.dashboard-header {
  text-align: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
}

.sidebar-toggle {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
}

.sidebar-toggle:hover {
  background-color: #0056b3;
}

.dashboard-main {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>