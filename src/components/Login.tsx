import { useState } from 'react';
import { Car, Lock, User, Shield, Users, UserCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (role: 'admin' | 'guard' | 'customer', username: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'guard' | 'customer'>('customer');
  const [error, setError] = useState('');

  // Mock credentials untuk demo
  const credentials = {
    admin: [
      { username: 'admin', password: 'admin123', nama: 'Super Admin' },
      { username: 'admin2', password: 'admin123', nama: 'Admin Parkir' },
    ],
    guard: [
      { username: 'budi', password: 'guard123', nama: 'Budi Hartono' },
      { username: 'siti', password: 'guard123', nama: 'Siti Rahayu' },
      { username: 'ahmad', password: 'guard123', nama: 'Ahmad Yani' },
    ],
    customer: [
      { username: 'ahmad.pratama', password: 'customer123', nama: 'Ahmad Pratama' },
      { username: 'siti.nur', password: 'customer123', nama: 'Siti Nurhaliza' },
      { username: 'budi.santoso', password: 'customer123', nama: 'Budi Santoso' },
      { username: 'dewi', password: 'customer123', nama: 'Dewi Lestari' },
      { username: 'eko', password: 'customer123', nama: 'Eko Prasetyo' },
      { username: 'fitri', password: 'customer123', nama: 'Fitri Handayani' },
    ],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validasi credentials
    const roleCredentials = credentials[selectedRole];
    const user = roleCredentials.find(
      (cred) => cred.username === username && cred.password === password
    );

    if (user) {
      onLogin(selectedRole, user.nama);
    } else {
      setError('Username atau password salah!');
    }
  };

  const handleQuickLogin = (role: 'admin' | 'guard' | 'customer', index: number = 0) => {
    const cred = credentials[role][index];
    setUsername(cred.username);
    setPassword(cred.password);
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-teal-600 p-4 rounded-2xl shadow-lg">
              <Car className="text-white" size={48} />
            </div>
          </div>
          <h1 className="text-teal-900 mb-2">Smart Parkir.id</h1>
          <p className="text-gray-600">Sistem Parkir Pintar Kos-Kosan</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-teal-900 mb-6 text-center">Login ke Akun Anda</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-gray-700 mb-2">Pilih Role</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('customer')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                    selectedRole === 'customer'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <UserCircle
                    size={24}
                    className={selectedRole === 'customer' ? 'text-green-600' : 'text-gray-400'}
                  />
                  <span className="text-sm">Customer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('guard')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                    selectedRole === 'guard'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <Users
                    size={24}
                    className={selectedRole === 'guard' ? 'text-blue-600' : 'text-gray-400'}
                  />
                  <span className="text-sm">Penjaga</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                    selectedRole === 'admin'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <Shield
                    size={24}
                    className={selectedRole === 'admin' ? 'text-red-600' : 'text-gray-400'}
                  />
                  <span className="text-sm">Admin</span>
                </button>
              </div>
            </div>

            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Login
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t-2 border-gray-100">
            <p className="text-sm text-gray-600 mb-3">Demo Login Cepat:</p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="w-full px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm"
              >
                Login sebagai Admin (admin / admin123)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('guard')}
                className="w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
              >
                Login sebagai Penjaga (budi / guard123)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('customer')}
                className="w-full px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm"
              >
                Login sebagai Customer (ahmad.pratama / customer123)
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          © 2025 Smart Parkir.id - Sistem Parkir Kos-Kosan
        </p>
      </div>
    </div>
  );
}