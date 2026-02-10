import { useState } from "react";
import { getValidationRules } from "../validation/rules";
import { submitForm } from "../api/mockServer";

export default function Form() {
  const [values, setValues] = useState({ email: "", age: "" });
  const [clientErrors, setClientErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const [mode, setMode] = useState("normal");

  const rules = getValidationRules(mode);

  function validate() {
    const errors = {};

    if (rules.email.required && !values.email)
      errors.email = "Email is required";
    else if (!rules.email.pattern.test(values.email))
      errors.email = "Invalid email";

    if (!values.age)
      errors.age = "Age is required";
    else if (+values.age < rules.age.min)
      errors.age = `Minimum age is ${rules.age.min}`;

    setClientErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerErrors({});

    if (!validate()) return;

    try {
      await submitForm(values);
      alert("Submitted successfully");
    } catch (err) {
      setServerErrors(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Validation That Lies</h3>

      <button type="button" onClick={() =>
        setMode(mode === "normal" ? "strict" : "normal")
      }>
        Toggle Mode ({mode})
      </button>

      <div>
        <input
          placeholder="Email"
          value={values.email}
          onChange={e => setValues({ ...values, email: e.target.value })}
        />
        <div>{clientErrors.email || serverErrors.email}</div>
      </div>

      <div>
        <input
          placeholder="Age"
          value={values.age}
          onChange={e => setValues({ ...values, age: e.target.value })}
        />
        <div>{clientErrors.age || serverErrors.age}</div>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
