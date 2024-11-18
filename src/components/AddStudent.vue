<template>
  <div class="add-student">
    <h2>Add Student</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input v-model="firstName" id="firstName" type="text" placeholder="Enter student first name" required />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input v-model="lastName" id="lastName" type="text" placeholder="Enter student last name" required />
      </div>
      <div class="form-group">
        <label for="age">Age</label>
        <input v-model="age" id="age" type="number" placeholder="Enter student age" required />
      </div>
      <button type="submit">Add Student</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddStudent",
  data() {
    return {
      firstName: "",
      lastName: "",
      age: "",
    };
  },
  methods: {
    handleSubmit() {
      // Emit the new student data to the parent
      if (this.firstName.trim() && this.lastName.trim() && this.age) {
        this.$emit("add-student", { firstName: this.firstName, lastName: this.lastName, age: parseInt(this.age, 10) });
        this.firstName = "";
        this.lastName = "";
        this.age = "";
      }
    },
  },
};
</script>

<style scoped>
.add-student {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.add-student h2 {
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}
</style>