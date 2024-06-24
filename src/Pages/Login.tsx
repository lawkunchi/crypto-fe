import Checkbox from '../components/Checkbox';
import InputError from '../components/InputError';
import InputLabel from '../components/InputLabel';
import PrimaryButton from '../components/PrimaryButton';
import TextInput from '../components/TextInput';
import { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { authService } from '../services/AuthServices';
export default function Login() {

    const [error, setError] = useState(''); 
    const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm({
        initialValues: {
          email: '',
          password: '',
          remember: false,
        },
        validations: {
          email: { required: true, pattern: /^\S+@\S+\.\S+$/ },
          password: { required: true },
        },
        onSubmit: async () => {
            try {
              await authService.login(values.email, values.password);
            } catch (error) {
              if (error instanceof Error) { 
                console.log(error, 'login error');
                setError(error.message);
              } else {
                setError('An unexpected error occurred.');
              }
            }
          },
      });

    return (
        <>

            {/* {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>} */}

            <form  onSubmit={handleSubmit} >
            <InputError message={error} className="mt-2" />
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={values.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={handleChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={values.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={values.remember}
                            onChange={handleChange}
                        />
                        <span className="ms-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                        <a
                            href="/password"
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </a>

                    <PrimaryButton className="ms-4" disabled={isSubmitting}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </>
    );
}
