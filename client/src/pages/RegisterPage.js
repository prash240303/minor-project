import { useState } from "react";
import "../styles/RegisterPage.css";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 200) {
      alert('registration successful');
    } else {
      alert('user already exist');
    }
  }
  return (
    // <div className="flex min-h-full justify-center items-center">
    // <div className="max-w-md w-full px-6 py-10 bg-white rounded-lg shadow-xl overflow-hidden sm:rounded-lg">
    //   <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    //         <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
    //         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register</h2>
    //       </div>

    //       <form className="mt-10 space-y-6" onSubmit={register}>
    //         <div>
    //           <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
    //           <div className="mt-2">
    //             <input
    //               id="username"
    //               name="username"
    //               type="text"
    //               autoComplete="username"
    //               required
    //               className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //               placeholder="Enter your username"
    //               value={username}
    //               onChange={ev => setUsername(ev.target.value)}
    //             />
    //           </div>
    //         </div>

    //         <div>
    //           <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
    //           <div className="mt-2">
    //             <input
    //               id="password"
    //               name="password"
    //               type="password"
    //               autoComplete="current-password"
    //               required
    //               className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //               placeholder="Enter your password"
    //               value={password}
    //               onChange={ev => setPassword(ev.target.value)}
    //             />
    //           </div>
    //         </div>

    //         <div>
    //           <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>

    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register your account</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" onSubmit={register} method="POST">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
            <div class="mt-2">
              <input id="email" name="email"  value={username}  onChange={ev => setUsername(ev.target.value)} type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            </div>
            <div class="mt-2">
              <input id="password" value={password}  onChange={ev => setPassword(ev.target.value)} name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
          Already a member?
          <a href="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Login</a>
        </p>
      </div>
    </div>
  );
}