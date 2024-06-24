import Checkbox from '../components/Checkbox';
import InputError from '../components/InputError';
import InputLabel from '../components/InputLabel';
import PrimaryButton from '../components/PrimaryButton';
import TextInput from '../components/TextInput';
import { useState } from 'react';
export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(0);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        password: '',
        email: '',
    });

    return (
        <>

            {/* {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>} */}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setPassword( e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
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

                    <PrimaryButton className="ms-4" disabled={loading}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </>
    );
}
