<template>
  <div class="dashboard">
    <Sidebar :menuItems="menuItems" :isVisible="isSidebarVisible" @menu-click="handleMenuClick" />
    <div :class="['dashboard-content', { 'expanded': !isSidebarVisible }]">
      <header class="dashboard-header">
        <h1>Student Management Dashboard</h1>
      </header>
      <main class="dashboard-main">
        <AddStudent v-if="isAddStudentVisible" @add-student="addStudent" />
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
      isSidebarVisible: true,
      isAddStudentVisible: false,
      menuItems: [
        { name: "Students", link: "#students", id: "students" },
        { name: "Add Student", link: "#add-student", id: "addStudent" },
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    handleMenuClick(menuId) {
      if (menuId === "addStudent") {
        this.isAddStudentVisible = true;
      } else {
        this.isAddStudentVisible = false;
      }
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

.dashboard-header {
  text-align: center;
  padding: 20px;
}

.dashboard-content {
  margin-left: 250px;
  flex: 1;
  padding: 20px;
}

.dashboard-content.expanded {
  margin-left: 0;
}
</style>