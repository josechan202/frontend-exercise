<template>
  <div class="student-table">
    <h2>Student List</h2>
    <table>
      <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
        <th>Sexuality</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="student in students" :key="student.id">
        <template v-if="editedStudentId === student.id">
          <!-- Inline Edit Form -->
          <td>
            <input v-model="editedFirstName" type="text" />
          </td>
          <td>
            <input v-model="editedLastName" type="text" />
          </td>
          <td>
            <input v-model="editedAge" type="number" />
          </td>
          <td>
            <input v-model="editedSexuality" type="text" />
          </td>
          <td>
            <button @click="saveEdit(student.id)">Save</button>
            <button @click="cancelEdit">Cancel</button>
          </td>
        </template>
        <template v-else>
          <td>{{ student.firstName }}</td>
          <td>{{ student.lastName }}</td>
          <td>{{ student.age }}</td>
          <td>{{ student.sexuality }}</td>
          <td>
            <button @click="startEdit(student)">Edit</button>
            <button @click="$emit('delete-student', student.id)">Delete</button>
          </td>
        </template>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "StudentTable",
  props: {
    students: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      editedStudentId: null,
      editedFirstName: "",
      editedLastName: "",
      editedAge: "",
      editedSexuality: null,
    };
  },
  methods: {
    startEdit(student) {
      this.editedStudentId = student.id;
      this.editedFirstName = student.firstName;
      this.editedLastName = student.lastName;
      this.editedAge = student.age;
      this.editedSexuality = student.sexuality;
    },
    saveEdit(studentId) {
      const updatedStudent = {
        id: studentId,
        firstName: this.editedFirstName,
        lastName: this.editedLastName,
        age: this.editedAge,
        sexuality: this.editedSexuality,
      };
      this.$emit("edit-student", updatedStudent);
      this.cancelEdit();
    },
    cancelEdit() {
      this.editedStudentId = null;
      this.editedFirstName = "";
      this.editedLastName = "";
      this.editedAge = "";
      this.editedSexuality = "";
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

button {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>