"use client"
import React from "react"
import { useLoginMutation } from "./useLogin"
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Input,
	Label,
} from "~/shared/ui"

export const description = "A simple login form with email and password. The submit button says 'Sign in'."

export function LoginForm() {
	const { login } = useLoginMutation()

	const handleSubmit = async () => {
		try {
			const { data: res } = await login({ variables: { email: "john@mail.com", password: "changeme" } })

			console.log("Access Token:", res?.login.access_token)
			console.log("Refresh Token:", res?.login.refresh_token)
		} catch (err) {
			console.error("Login error:", err)
		}
	}

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>Enter your email below to login to your account.</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input id="email" type="email" placeholder="m@example.com" required />
				</div>
				<div className="grid gap-2">
					<Label htmlFor="password">Password</Label>
					<Input id="password" type="password" required />
				</div>
			</CardContent>
			<CardFooter>
				<Button onClick={handleSubmit} className="w-full">
					Sign in
				</Button>
			</CardFooter>
		</Card>
	)
}
