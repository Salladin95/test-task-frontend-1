"use client"
import { useProfile } from "~/shared/hooks/useProfile"

export default function MainPage() {
	const { loading, data, error } = useProfile()
	if (loading) {
		return <main>Loading...</main>
	}
	if (error) {
		return <main>{JSON.stringify(error)}</main>
	}
	return <main className={""}>{JSON.stringify(data)}</main>
}
