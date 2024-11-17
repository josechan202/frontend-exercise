<template>
  <div>
    <h2>Student List</h2>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="student in students" :key="student.id">
        <td>{{ student.firstName }}</td>
        <td>{{ student.age }}</td>
        <td>
          <button @click="$emit('delete', student.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'StudentTable',
  props: {
    students: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
}
button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
button:hover {
  background-color: #d32f2f;
}
</style>