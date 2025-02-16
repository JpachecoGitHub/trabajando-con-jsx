import { useState } from "react";

const LoginPage = () => {
  const [users, setUsers] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = users;
    if (!email.trim() || !password.trim()) {
      alert("Todos los campos deben estar llenos");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener un minimo de 6 caracteres");
      return;
    }

    alert("Registro Exitoso");
    setUsers({ email: "", password: "" });
  };

  return (
    <main className="container-fluid vh-100 alien-items-center justify-content-center">
      {/*<div className="row justify-content-center">
        <div className="col-12 col-md-6">*/}
          <section className="card mx-auto shadow-sm mt-5" style={{ maxWidth: "400px" }}>
            <div className="card-body">
              <h2 className="card-title text-center fw-bold justify-content-center"> Login </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={users.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={users.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 mt-3 fw-bold fs-5"
                  disabled=""
                >
                  Enviar
                </button>
              </form>
            </div>
          </section>
        {/*</div>
      </div>*/}
    </main>
  );
};

export default LoginPage;
