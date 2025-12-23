import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Scissors } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            if (formData.email === 'test@gmail.com' && formData.password === 'test') {
                localStorage.setItem('isLoggedIn', 'true');
                navigate('/');
            } else {
                setError('Invalid email or password');
                setIsLoading(false);
            }
        }, 800);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 px-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            <div className="w-full max-w-md relative z-10">
                <div className="flex flex-col gap-6">
                    {/* Branding Header */}
                    <div className="text-center mb-4">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="flex aspect-square size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/25">
                                <Scissors className="size-7" />
                            </div>
                            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                                Saloonies
                            </h1>
                        </div>
                        <p className="text-base text-gray-300">Salon Management System</p>
                    </div>

                    <Card className="backdrop-blur-md bg-card/95 border-border/50 shadow-2xl shadow-black/20">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl text-card-foreground">Login</CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Enter your credentials to access your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-6">
                                    {error && (
                                        <div className="bg-destructive/15 border border-destructive/30 text-destructive text-sm p-3 rounded-lg backdrop-blur-sm">
                                            {error}
                                        </div>
                                    )}
                                    
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className="text-card-foreground">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="test@gmail.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isLoading}
                                            className="bg-input border-border text-card-foreground placeholder:text-muted-foreground"
                                        />
                                    </div>
                                    
                                    <div className="grid gap-2">
                                        <Label htmlFor="password" className="text-card-foreground">Password</Label>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Enter password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isLoading}
                                            className="bg-input border-border text-card-foreground placeholder:text-muted-foreground"
                                        />
                                    </div>
                                    
                                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-foreground hover:from-primary/90 hover:to-primary-foreground/90 text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]" disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Signing in...
                                            </>
                                        ) : (
                                            'Sign in'
                                        )}
                                    </Button>
                                </div>
                                
                                <div className="mt-6 text-center text-sm text-muted-foreground bg-muted/30 rounded-lg p-3 backdrop-blur-sm">
                                    <strong className="text-card-foreground">Demo credentials:</strong> test@gmail.com / test
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Login;
