"use client"
import React from "react"
import { ApolloClient, ApolloProvider as Provider, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
	uri: "https://api.escuelajs.co/graphql",
	cache: new InMemoryCache(),
})

export function ApolloProvider({ children }: { children: React.ReactNode }) {
	return <Provider client={client}>{children}</Provider>
}
