'use client';
import View from "../../components/default/View";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { loginUser } from "../../lib/auth";
import { useRouter } from "next/navigation";
import { useToast } from "../../context/ToastContext";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [router, isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await loginUser(username, password);
      if (res.data && res.data.access_token) {
        login(res.data.access_token, res.data.user);
        showToast("Login successful!", "success");
        router.replace("/"); // Redirect after login
      } else {
        setError("Invalid response from server");
        showToast("Invalid response from server", "error");
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || "Login failed. Please check your credentials.";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {/* Stunning animated background with layered gradients */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Main animated gradient (x-axis) */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-300 via-accent-200 via-primary-400 to-primary-500 dark:from-primary-800 dark:via-accent-700 dark:via-primary-800 dark:to-primary-900 animate-gradient-x bg-[length:200%_200%]" style={{ filter: 'blur(12px)' }} />
        {/* Secondary animated gradient (y-axis) for extra depth */}
        <div className="absolute inset-0 bg-gradient-to-tl from-accent-100 via-primary-200 to-accent-300 dark:from-accent-800 dark:via-primary-900 dark:to-accent-900 opacity-60 animate-gradient-y bg-[length:200%_200%]" style={{ filter: 'blur(24px)' }} />
        {/* Pulsing blurred circles for energy */}
        <div className="absolute left-1/4 top-1/4 w-[420px] h-[420px] bg-accent-300 dark:bg-accent-700 opacity-30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute right-1/4 bottom-1/4 w-[320px] h-[320px] bg-primary-200 dark:bg-primary-700 opacity-20 rounded-full blur-2xl animate-pulse" />
      </div>
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="w-full max-w-md bg-white/90 dark:bg-secondary-900/90 rounded-2xl shadow-2xl p-8 border border-primary-200 dark:border-primary-700 backdrop-blur-md">
          <h2 className="text-3xl font-extrabold text-center text-primary-700 dark:text-primary-100 mb-2 tracking-wider font-mono flex items-center justify-center gap-2 drop-shadow-[0_2px_8px_rgba(37,99,235,0.3)]">
            <span className="inline-block text-accent-500 animate-pulse">🎮</span> Login to GameStore
          </h2>
          <p className="text-center text-secondary-700 dark:text-secondary-200 mb-6">Enter your credentials to unlock the adventure!</p>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-secondary-800 dark:text-secondary-100 font-semibold mb-1">Username</label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                className="w-full px-4 py-2 rounded-lg bg-primary-50 dark:bg-primary-800 border border-primary-200 dark:border-primary-700 text-primary-900 dark:text-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-300 dark:focus:ring-primary-500 font-mono"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                placeholder="e.g. gamer123"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-secondary-800 dark:text-secondary-100 font-semibold mb-1">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="w-full px-4 py-2 rounded-lg bg-primary-50 dark:bg-primary-800 border border-primary-200 dark:border-primary-700 text-primary-900 dark:text-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-300 dark:focus:ring-primary-500 font-mono"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            {error && <div className="text-error text-center font-semibold">{error}</div>}
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-bold text-lg shadow-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-300 dark:focus:ring-primary-500 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? <span className="animate-spin">🎮</span> : <span>Login</span>}
            </button>
          </form>
        </div>
      </div>
    </View>
  );
}

// Add keyframes for gradient animation in tailwind.config.js if not present:
// theme: { extend: { animation: { 'gradient-x': 'gradient-x 8s ease infinite' }, keyframes: { 'gradient-x': { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } } } } }
