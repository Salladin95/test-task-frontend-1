"use client"
import React from "react"
import { ApolloProvider } from "~/app/providers/Apollo"

export function Providers({ children }: { children: React.ReactNode }) {
	return <ApolloProvider>{children}</ApolloProvider>
}
