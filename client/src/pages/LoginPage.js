import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert('wrong credentials');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    // <div className="flex min-h-full justify-center items-center">
    //   <div className="max-w-md w-full px-6 py-10 bg-white rounded-lg shadow-xl overflow-hidden sm:rounded-lg">
    //     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    //       <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
    //       <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign In to your account</h2>
    //     </div>

    //     <form className="mt-10 space-y-6" onSubmit={login}>
    //       <div>
    //         <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
    //         <div className="mt-2">
    //           <input
    //             id="username"
    //             name="username"
    //             type="text"
    //             autoComplete="username"
    //             required
    //             className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             placeholder="Enter your username"
    //             value={username}
    //             onChange={ev => setUsername(ev.target.value)}
    //           />
    //         </div>
    //       </div>

    //       <div>
    //         <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
    //         <div className="mt-2">
    //           <input
    //             id="password"
    //             name="password"
    //             type="password"
    //             autoComplete="current-password"
    //             required
    //             className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             placeholder="Enter your password"
    //             value={password}
    //             onChange={ev => setPassword(ev.target.value)}
    //           />
    //         </div>
    //       </div>

    //       <div>
    //         <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
    //       </div>
    //     </form>
    //   </div>
    // </div>

    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-xl">
        <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
        <form class="space-y-6" onSubmit={login} method="POST">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
            <div class="mt-2">
              <input id="username" value={username} onChange={ev => setUsername(ev.target.value)}  name="username" type="text" autocomplete="username" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div class="text-sm">
                <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>
            <div class="mt-2">
              <input id="password"  onChange={ev => setPassword(ev.target.value)} name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
          Not a member? 
          <a href="/register" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Register</a>
        </p>
      </div>
    </div>
  );

}
