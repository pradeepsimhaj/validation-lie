export function submitForm(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === "test@blocked.com") {
        reject({ email: "Email is blocked by server" });
      } else if (data.age > 60) {
        reject({ age: "Age limit exceeded (server rule)" });
      } else {
        resolve({ success: true });
      }
    }, 800);
  });
}
