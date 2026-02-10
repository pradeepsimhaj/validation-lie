export function getValidationRules(mode) {
  return {
    email: {
      required: true,
      pattern: /\S+@\S+\.\S+/
    },
    age: {
      required: true,
      min: mode === "strict" ? 21 : 18
    }
  };
}
