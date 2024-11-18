<template>
  <div class="dashboard">
    <Sidebar :menuItems="menuItems" :isVisible="isSidebarVisible" />
    <div :class="['dashboard-content', { 'expanded': !isSidebarVisible }]">
      <header class="dashboard-header">
        <h1>Student Management Dashboard</h1>
      </header>
      <main class="dashboard-main">
        <AddStudent @add-student="addStudent" />
        <StudentTable :students="students" @delete-student="deleteStudent" @edit-student="editStudent" />
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import StudentTable from '@/components/StudentTable.vue';
import AddStudent from '@/components/AddStudent.vue';
import {fetchStudents, deleteStudent, addStudent, updateStudent} from '@/api/students';

export default {
  name: 'StudentsDashboard',
  components: {
    Sidebar,
    StudentTable,
    AddStudent,
  },
  data() {
    return {
      students: [],
      menuItems: [
        { name: 'Students', link: '#students' },
        { name: 'Add Student', link: '#add-student' },
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
    async deleteStudent(id) {
      try {
        await deleteStudent(id);
        this.students = this.students.filter((student) => student.id !== id);
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    },
    async addStudent(newStudent) {
      try {
        const response = await addStudent(newStudent);
        this.students.push(response.data);
      } catch (error) {
        console.error('Error adding students:', error);
      }
    },
    async editStudent(updatedStudent) {
      try {
        const response = await updateStudent(updatedStudent);
        const index = this.students.findIndex((student) => student.id === updatedStudent.id);
        if (index !== -1) {
          // Merge existing student data with the updated data from the backend
          this.students[index] = { ...this.students[index], ...response.data };
        } else {
          console.error('Student not found for editing:', updatedStudent.id);
        }
      } catch (error) {
        console.error('Error editing students:', error);
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