import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { User, Mail, Lock, UserPlus, LogIn } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const AuthPage = ({ setIsAuthenticated }: { setIsAuthenticated: (val: boolean) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const full_name = formData.get("name") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!isLogin && password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure both password fields match.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const endpoint = isLogin ? "/api/login" : "/api/signup";
      const payload = isLogin
        ? { email, password }
        : { email, password, full_name, role: "user" };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast({
        title: isLogin ? "Login successful" : "Account created",
        description: isLogin
          ? "Welcome back!"
          : "You can now log in with your new account.",
      });

      if (isLogin) {
        // Store token if your backend returns one
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }
        setIsAuthenticated(true);
      } else {
        setIsLogin(true); // Switch to login after signup
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <Card className="max-w-4xl w-full shadow-xl grid md:grid-cols-2 overflow-hidden">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-b from-blue-600 to-blue-700 text-white p-8 space-y-6">
          {isLogin ? <LogIn size={48} /> : <UserPlus size={48} />}
          <h2 className="text-3xl font-bold font-poppins">
            {isLogin ? "Welcome Back!" : "Join Us Today"}
          </h2>
          <p className="text-blue-100 text-center max-w-sm">
            {isLogin
              ? "Log in to access your personalized dashboard and continue your journey."
              : "Create your account to unlock exclusive features and start your journey with us."}
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 bg-white">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-2xl font-semibold text-blue-800 flex items-center gap-2">
              {isLogin ? "Login" : "Sign Up"}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? "Enter your credentials to continue"
                : "Fill in the details to create your account"}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-blue-700 font-medium">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-blue-400" size={18} />
                    <Input
                      id="name"
                      name="name"
                      placeholder="Jane Doe"
                      className="pl-10 border-blue-200 focus:border-blue-500 h-11"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <Label htmlFor="email" className="text-blue-700 font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-blue-400" size={18} />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 border-blue-200 focus:border-blue-500 h-11"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="password" className="text-blue-700 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-blue-400" size={18} />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 border-blue-200 focus:border-blue-500 h-11"
                    required
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-1">
                  <Label htmlFor="confirmPassword" className="text-blue-700 font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-blue-400" size={18} />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 border-blue-200 focus:border-blue-500 h-11"
                      required
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium transition-all duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? isLogin
                    ? "Logging in..."
                    : "Signing up..."
                  : isLogin
                  ? "Log In"
                  : "Sign Up"}
              </Button>

              <p className="text-center text-sm text-blue-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-800 font-medium hover:underline"
                >
                  {isLogin ? "Sign up" : "Log in"}
                </button>
              </p>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;
