// src/components/ui/SignUpForm.tsx

import React from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define the form schema using Zod
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
});

const SignUpForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle account creation logic here (e.g., API call to your backend)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white">
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-lg shadow-lg border border-blue-200/30">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Create Your Cosmic Account</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-700">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      {...field}
                      className="bg-white/10 border-blue-300 text-blue-900 placeholder-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-blue-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-700">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="bg-white/10 border-blue-300 text-blue-900 placeholder-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-blue-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-700">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className="bg-white/10 border-blue-300 text-blue-900 placeholder-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-blue-600" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-300 glow-effect"
            >
              Create Account
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;