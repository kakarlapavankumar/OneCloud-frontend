export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function validateEmployee(employee: {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  phone: string;
  joiningDate: string;
}): string[] {
  const errors: string[] = [];

  if (!isRequired(employee.id)) {
    errors.push("Employee ID is required.");
  }

  if (!isRequired(employee.name)) {
    errors.push("Employee name is required.");
  }

  if (!isValidEmail(employee.email)) {
    errors.push("Valid email is required.");
  }

  if (!isRequired(employee.department)) {
    errors.push("Department is required.");
  }

  if (!isRequired(employee.designation)) {
    errors.push("Designation is required.");
  }

  if (!isRequired(employee.phone)) {
    errors.push("Phone number is required.");
  }

  if (!isRequired(employee.joiningDate)) {
    errors.push("Joining date is required.");
  }

  return errors;
}
