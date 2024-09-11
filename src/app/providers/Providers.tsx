"use client"
import React from "react"
import { ReactQueryProvider } from "./ReactQueryProvider"

export function Providers(props: { children: React.ReactNode }) {
	const { children } = props
	return <ReactQueryProvider>{children}</ReactQueryProvider>
}
